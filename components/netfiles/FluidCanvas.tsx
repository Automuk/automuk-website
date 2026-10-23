"use client";

import React, { useEffect, useRef } from "react";

/**
 * FluidCanvas — real-time GPU fluid simulation (stable-fluids / Navier–Stokes)
 * rendered with WebGL2. Drop it inside a `relative` card; it listens to the
 * parent element's pointer events, exactly like the previous version.
 *
 * Pipeline per frame:
 *   curl → vorticity confinement → divergence → pressure solve (Jacobi)
 *   → gradient subtract → advect velocity → advect dye → shaded display
 */

// ---------- Tunables ----------
const CONFIG = {
  SIM_RESOLUTION: 128,
  DYE_RESOLUTION: 640,
  PRESSURE: 0.8,
  PRESSURE_ITERATIONS: 22,
  CURL: 12, // vorticity confinement strength → lower = smoother, calmer swirls
  VELOCITY_DISSIPATION: 0.6,
  DENSITY_DISSIPATION: 1.7,
  SPLAT_RADIUS: 0.4,
  SPLAT_FORCE: 3200,
  OPACITY: 0.5, // overall strength of the effect (0–1), tuned for dark backgrounds
  INTENSITY: 0.55, // dye brightness multiplier
  AMBIENT: true, // gentle idle currents when the cursor isn't over the card
};

const PALETTE: [number, number, number][] = [
  [49, 104, 250], // Electric Blue (#3168FA)
  [206, 119, 251], // Neon Violet/Pink (#CE77FB)
  [56, 189, 248], // Cyan (#38BDF8)
  [99, 102, 241], // Indigo (#6366F1)
  [147, 197, 253], // Ice Blue (#93C5FD)
].map(([r, g, b]) => [r / 255, g / 255, b / 255]) as [number, number, number][];

// ---------- Shaders ----------
const VERT = `#version 300 es
precision highp float;
in vec2 aPosition;
out vec2 vUv; out vec2 vL; out vec2 vR; out vec2 vT; out vec2 vB;
uniform vec2 texelSize;
void main () {
  vUv = aPosition * 0.5 + 0.5;
  vL = vUv - vec2(texelSize.x, 0.0);
  vR = vUv + vec2(texelSize.x, 0.0);
  vT = vUv + vec2(0.0, texelSize.y);
  vB = vUv - vec2(0.0, texelSize.y);
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`;

const HEAD = `#version 300 es
precision highp float;
precision highp sampler2D;
in vec2 vUv; in vec2 vL; in vec2 vR; in vec2 vT; in vec2 vB;
out vec4 fragColor;
`;

const SPLAT_FS =
  HEAD +
  `
uniform sampler2D uTarget;
uniform float aspectRatio;
uniform vec3 color;
uniform vec2 point;
uniform float radius;
void main () {
  vec2 p = vUv - point;
  p.x *= aspectRatio;
  vec3 splat = exp(-dot(p, p) / radius) * color;
  vec3 base = texture(uTarget, vUv).xyz;
  fragColor = vec4(base + splat, 1.0);
}`;

const ADVECTION_FS =
  HEAD +
  `
uniform sampler2D uVelocity;
uniform sampler2D uSource;
uniform vec2 texelSize;
uniform float dt;
uniform float dissipation;
void main () {
  vec2 coord = vUv - dt * texture(uVelocity, vUv).xy * texelSize;
  vec4 result = texture(uSource, coord);
  float decay = 1.0 + dissipation * dt;
  fragColor = result / decay;
}`;

const DIVERGENCE_FS =
  HEAD +
  `
uniform sampler2D uVelocity;
void main () {
  float L = texture(uVelocity, vL).x;
  float R = texture(uVelocity, vR).x;
  float T = texture(uVelocity, vT).y;
  float B = texture(uVelocity, vB).y;
  vec2 C = texture(uVelocity, vUv).xy;
  if (vL.x < 0.0) L = -C.x;
  if (vR.x > 1.0) R = -C.x;
  if (vT.y > 1.0) T = -C.y;
  if (vB.y < 0.0) B = -C.y;
  fragColor = vec4(0.5 * (R - L + T - B), 0.0, 0.0, 1.0);
}`;

const CURL_FS =
  HEAD +
  `
uniform sampler2D uVelocity;
void main () {
  float L = texture(uVelocity, vL).y;
  float R = texture(uVelocity, vR).y;
  float T = texture(uVelocity, vT).x;
  float B = texture(uVelocity, vB).x;
  fragColor = vec4(0.5 * (R - L - T + B), 0.0, 0.0, 1.0);
}`;

const VORTICITY_FS =
  HEAD +
  `
uniform sampler2D uVelocity;
uniform sampler2D uCurl;
uniform float curl;
uniform float dt;
void main () {
  float L = texture(uCurl, vL).x;
  float R = texture(uCurl, vR).x;
  float T = texture(uCurl, vT).x;
  float B = texture(uCurl, vB).x;
  float C = texture(uCurl, vUv).x;
  vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
  force /= length(force) + 0.0001;
  force *= curl * C;
  force.y *= -1.0;
  vec2 vel = texture(uVelocity, vUv).xy;
  vel += force * dt;
  vel = min(max(vel, -1000.0), 1000.0);
  fragColor = vec4(vel, 0.0, 1.0);
}`;

const PRESSURE_FS =
  HEAD +
  `
uniform sampler2D uPressure;
uniform sampler2D uDivergence;
void main () {
  float L = texture(uPressure, vL).x;
  float R = texture(uPressure, vR).x;
  float T = texture(uPressure, vT).x;
  float B = texture(uPressure, vB).x;
  float div = texture(uDivergence, vUv).x;
  fragColor = vec4((L + R + B + T - div) * 0.25, 0.0, 0.0, 1.0);
}`;

const GRADIENT_FS =
  HEAD +
  `
uniform sampler2D uPressure;
uniform sampler2D uVelocity;
void main () {
  float L = texture(uPressure, vL).x;
  float R = texture(uPressure, vR).x;
  float T = texture(uPressure, vT).x;
  float B = texture(uPressure, vB).x;
  vec2 vel = texture(uVelocity, vUv).xy;
  vel -= vec2(R - L, T - B);
  fragColor = vec4(vel, 0.0, 1.0);
}`;

const CLEAR_FS =
  HEAD +
  `
uniform sampler2D uTexture;
uniform float value;
void main () { fragColor = value * texture(uTexture, vUv); }`;

// Output is premultiplied-alpha so the fluid composites over the card.
// Dye gradients are used as a height field → soft glassy shading + rim light.
const DISPLAY_FS =
  HEAD +
  `
uniform sampler2D uTexture;
uniform vec2 texelSize;
uniform float opacity;
uniform float intensity;
float h (vec2 uv) { return dot(texture(uTexture, uv).rgb, vec3(0.333)); }
void main () {
  vec3 c = texture(uTexture, vUv).rgb * intensity;

  // very soft shading: just enough depth, no glare
  float dx = h(vR) - h(vL);
  float dy = h(vT) - h(vB);
  vec3 n = normalize(vec3(-dx * 1.5, -dy * 1.5, 1.0));
  vec3 light = normalize(vec3(-0.45, 0.65, 0.9));
  float diffuse = clamp(dot(n, light), 0.0, 1.0);

  // gentle tone map, then slightly desaturate for a calmer look
  c = 1.0 - exp(-c * 1.1);
  c *= 0.88 + 0.16 * diffuse;
  float lum = dot(c, vec3(0.299, 0.587, 0.114));
  c = mix(vec3(lum), c, 0.82);

  // premultiplied output, capped by global opacity
  float a = clamp(max(c.r, max(c.g, c.b)), 0.0, 1.0) * opacity;
  c *= opacity;
  fragColor = vec4(min(c, vec3(a)), a);
}`;

// ---------- Types ----------
type Uniforms = Record<string, WebGLUniformLocation | null>;
interface Program {
  program: WebGLProgram;
  u: Uniforms;
}
interface FBO {
  texture: WebGLTexture;
  fbo: WebGLFramebuffer;
  width: number;
  height: number;
  texelX: number;
  texelY: number;
}
interface DoubleFBO {
  read: FBO;
  write: FBO;
  swap: () => void;
  width: number;
  height: number;
  texelX: number;
  texelY: number;
}
interface Splat {
  x: number;
  y: number;
  dx: number;
  dy: number;
  color: [number, number, number];
}

export default function FluidCanvas() {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const root = rootRef.current;
    const container = root?.parentElement;
    if (!canvas || !root || !container) return;

    const gl = canvas.getContext("webgl2", {
      alpha: true,
      premultipliedAlpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      preserveDrawingBuffer: false,
    });
    if (!gl) return; // graceful: spotlight glows still render

    gl.getExtension("EXT_color_buffer_float");
    gl.getExtension("EXT_color_buffer_half_float");

    // ---------- GL helpers ----------
    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(s));
      }
      return s;
    };
    const vertShader = compile(gl.VERTEX_SHADER, VERT);

    const makeProgram = (fsSrc: string): Program => {
      const program = gl.createProgram()!;
      gl.attachShader(program, vertShader);
      gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fsSrc));
      gl.bindAttribLocation(program, 0, "aPosition");
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error(gl.getProgramInfoLog(program));
      }
      const u: Uniforms = {};
      const n = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
      for (let i = 0; i < n; i++) {
        const info = gl.getActiveUniform(program, i)!;
        u[info.name] = gl.getUniformLocation(program, info.name);
      }
      return { program, u };
    };

    const splatP = makeProgram(SPLAT_FS);
    const advectP = makeProgram(ADVECTION_FS);
    const divergenceP = makeProgram(DIVERGENCE_FS);
    const curlP = makeProgram(CURL_FS);
    const vorticityP = makeProgram(VORTICITY_FS);
    const pressureP = makeProgram(PRESSURE_FS);
    const gradientP = makeProgram(GRADIENT_FS);
    const clearP = makeProgram(CLEAR_FS);
    const displayP = makeProgram(DISPLAY_FS);

    // Fullscreen triangle
    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    const vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 3, 3, -1]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    const createFBO = (w: number, h: number): FBO => {
      gl.activeTexture(gl.TEXTURE0);
      const texture = gl.createTexture()!;
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA16F, w, h, 0, gl.RGBA, gl.HALF_FLOAT, null);
      const fbo = gl.createFramebuffer()!;
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
      gl.viewport(0, 0, w, h);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      return { texture, fbo, width: w, height: h, texelX: 1 / w, texelY: 1 / h };
    };

    const createDouble = (w: number, h: number): DoubleFBO => {
      let a = createFBO(w, h);
      let b = createFBO(w, h);
      return {
        width: w,
        height: h,
        texelX: 1 / w,
        texelY: 1 / h,
        get read() {
          return a;
        },
        get write() {
          return b;
        },
        swap() {
          const t = a;
          a = b;
          b = t;
        },
      };
    };

    const destroyFBO = (f: FBO) => {
      gl.deleteTexture(f.texture);
      gl.deleteFramebuffer(f.fbo);
    };

    const getResolution = (res: number) => {
      let aspect = gl.drawingBufferWidth / gl.drawingBufferHeight;
      if (aspect < 1) aspect = 1 / aspect;
      const min = Math.round(res);
      const max = Math.round(res * aspect);
      return gl.drawingBufferWidth > gl.drawingBufferHeight
        ? { width: max, height: min }
        : { width: min, height: max };
    };

    let velocity: DoubleFBO | null = null;
    let dye: DoubleFBO | null = null;
    let pressure: DoubleFBO | null = null;
    let divergence: FBO | null = null;
    let curl: FBO | null = null;

    const initFramebuffers = () => {
      [velocity?.read, velocity?.write, dye?.read, dye?.write, pressure?.read, pressure?.write, divergence, curl].forEach(
        (f) => f && destroyFBO(f)
      );
      const sim = getResolution(CONFIG.SIM_RESOLUTION);
      const dyeRes = getResolution(CONFIG.DYE_RESOLUTION);
      velocity = createDouble(sim.width, sim.height);
      dye = createDouble(dyeRes.width, dyeRes.height);
      pressure = createDouble(sim.width, sim.height);
      divergence = createFBO(sim.width, sim.height);
      curl = createFBO(sim.width, sim.height);
    };

    const blit = (target: FBO | null) => {
      if (target) {
        gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
        gl.viewport(0, 0, target.width, target.height);
      } else {
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
      }
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const bindTex = (tex: WebGLTexture, unit: number) => {
      gl.activeTexture(gl.TEXTURE0 + unit);
      gl.bindTexture(gl.TEXTURE_2D, tex);
      return unit;
    };

    // ---------- Sizing ----------
    let resizeRaf = 0;
    const updateSize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(Math.floor(rect.width * dpr), 2);
      const h = Math.max(Math.floor(rect.height * dpr), 2);
      if (canvas.width === w && canvas.height === h && velocity) return;
      canvas.width = w;
      canvas.height = h;
      initFramebuffers();
    };
    updateSize();
    const resizeObserver = new ResizeObserver(() => {
      cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(updateSize);
    });
    resizeObserver.observe(container);

    // ---------- Colors ----------
    const sampleColor = (t: number, intensity: number): [number, number, number] => {
      const n = PALETTE.length;
      const f = ((t % n) + n) % n;
      const i = Math.floor(f);
      const k = f - i;
      const s = k * k * (3 - 2 * k); // smoothstep blend
      const a = PALETTE[i];
      const b = PALETTE[(i + 1) % n];
      return [
        (a[0] + (b[0] - a[0]) * s) * intensity,
        (a[1] + (b[1] - a[1]) * s) * intensity,
        (a[2] + (b[2] - a[2]) * s) * intensity,
      ];
    };

    // ---------- Splats ----------
    const aspect = () => gl.drawingBufferWidth / gl.drawingBufferHeight;

    const splat = (x: number, y: number, dx: number, dy: number, color: [number, number, number]) => {
      if (!velocity || !dye) return;
      gl.useProgram(splatP.program);
      gl.uniform1f(splatP.u.aspectRatio, aspect());
      gl.uniform2f(splatP.u.point, x, y);
      let r = CONFIG.SPLAT_RADIUS / 100;
      if (aspect() > 1) r *= aspect();
      gl.uniform1f(splatP.u.radius, r);

      gl.uniform1i(splatP.u.uTarget, bindTex(velocity.read.texture, 0));
      gl.uniform3f(splatP.u.color, dx, dy, 0);
      blit(velocity.write);
      velocity.swap();

      gl.uniform1i(splatP.u.uTarget, bindTex(dye.read.texture, 0));
      gl.uniform3f(splatP.u.color, color[0], color[1], color[2]);
      blit(dye.write);
      dye.swap();
    };

    // ---------- Pointer ----------
    const queue: Splat[] = [];
    const pointer = { x: 0, y: 0, has: false };
    let colorT = Math.random() * PALETTE.length;
    let hovered = false;

    const setGlow = (px: number, py: number) => {
      if (glowRef.current) {
        glowRef.current.style.background = `radial-gradient(550px circle at ${px}px ${py}px, rgba(49,104,250,0.12), rgba(206,119,251,0.06), transparent 70%)`;
      }
      if (borderRef.current) {
        borderRef.current.style.background = `radial-gradient(350px circle at ${px}px ${py}px, rgba(49,104,250,0.4), rgba(206,119,251,0.28), transparent 75%)`;
      }
    };
    const setHover = (on: boolean) => {
      if (glowRef.current) glowRef.current.style.opacity = on ? "0.8" : "0";
      if (borderRef.current) borderRef.current.style.opacity = on ? "1" : "0";
    };

    const pushPointerSplat = (clientX: number, clientY: number, burst = false) => {
      const rect = container.getBoundingClientRect();
      const px = clientX - rect.left;
      const py = clientY - rect.top;
      setGlow(px, py);

      const x = px / rect.width;
      const y = 1 - py / rect.height;
      if (pointer.has) {
        let dx = x - pointer.x;
        let dy = y - pointer.y;
        const a = rect.width / rect.height;
        if (a < 1) dx *= a;
        if (a > 1) dy /= a;
        const speed = Math.hypot(dx, dy);
        if (speed > 0 && queue.length < 48) {
          colorT += 0.035 + speed * 2;
          const intensity = Math.min(0.1 + speed * 10, 0.3);
          queue.push({
            x,
            y,
            dx: dx * CONFIG.SPLAT_FORCE,
            dy: dy * CONFIG.SPLAT_FORCE,
            color: sampleColor(colorT, intensity),
          });
        }
      }
      if (burst) {
        for (let i = 0; i < 6; i++) {
          const ang = (i / 6) * Math.PI * 2 + Math.random();
          colorT += 0.4;
          queue.push({
            x,
            y,
            dx: Math.cos(ang) * 450,
            dy: Math.sin(ang) * 450,
            color: sampleColor(colorT, 0.2),
          });
        }
      }
      pointer.x = x;
      pointer.y = y;
      pointer.has = true;
    };

    const onMove = (e: MouseEvent) => pushPointerSplat(e.clientX, e.clientY);
    const onEnter = (e: MouseEvent) => {
      hovered = true;
      setHover(true);
      pointer.has = false;
      pushPointerSplat(e.clientX, e.clientY, true);
    };
    const onLeave = () => {
      hovered = false;
      setHover(false);
      pointer.has = false;
    };
    const onDown = (e: MouseEvent) => pushPointerSplat(e.clientX, e.clientY, true);
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) pushPointerSplat(t.clientX, t.clientY);
    };
    const onTouchEnd = () => {
      pointer.has = false;
    };

    container.addEventListener("mousemove", onMove, { passive: true });
    container.addEventListener("mouseenter", onEnter);
    container.addEventListener("mouseleave", onLeave);
    container.addEventListener("mousedown", onDown);
    container.addEventListener("touchstart", onTouch, { passive: true });
    container.addEventListener("touchmove", onTouch, { passive: true });
    container.addEventListener("touchend", onTouchEnd);

    // ---------- Simulation step ----------
    const step = (dt: number) => {
      if (!velocity || !dye || !pressure || !divergence || !curl) return;
      gl.disable(gl.BLEND);

      gl.useProgram(curlP.program);
      gl.uniform2f(curlP.u.texelSize, velocity.texelX, velocity.texelY);
      gl.uniform1i(curlP.u.uVelocity, bindTex(velocity.read.texture, 0));
      blit(curl);

      gl.useProgram(vorticityP.program);
      gl.uniform2f(vorticityP.u.texelSize, velocity.texelX, velocity.texelY);
      gl.uniform1i(vorticityP.u.uVelocity, bindTex(velocity.read.texture, 0));
      gl.uniform1i(vorticityP.u.uCurl, bindTex(curl.texture, 1));
      gl.uniform1f(vorticityP.u.curl, CONFIG.CURL);
      gl.uniform1f(vorticityP.u.dt, dt);
      blit(velocity.write);
      velocity.swap();

      gl.useProgram(divergenceP.program);
      gl.uniform2f(divergenceP.u.texelSize, velocity.texelX, velocity.texelY);
      gl.uniform1i(divergenceP.u.uVelocity, bindTex(velocity.read.texture, 0));
      blit(divergence);

      gl.useProgram(clearP.program);
      gl.uniform1i(clearP.u.uTexture, bindTex(pressure.read.texture, 0));
      gl.uniform1f(clearP.u.value, CONFIG.PRESSURE);
      blit(pressure.write);
      pressure.swap();

      gl.useProgram(pressureP.program);
      gl.uniform2f(pressureP.u.texelSize, velocity.texelX, velocity.texelY);
      gl.uniform1i(pressureP.u.uDivergence, bindTex(divergence.texture, 0));
      for (let i = 0; i < CONFIG.PRESSURE_ITERATIONS; i++) {
        gl.uniform1i(pressureP.u.uPressure, bindTex(pressure.read.texture, 1));
        blit(pressure.write);
        pressure.swap();
      }

      gl.useProgram(gradientP.program);
      gl.uniform2f(gradientP.u.texelSize, velocity.texelX, velocity.texelY);
      gl.uniform1i(gradientP.u.uPressure, bindTex(pressure.read.texture, 0));
      gl.uniform1i(gradientP.u.uVelocity, bindTex(velocity.read.texture, 1));
      blit(velocity.write);
      velocity.swap();

      gl.useProgram(advectP.program);
      gl.uniform2f(advectP.u.texelSize, velocity.texelX, velocity.texelY);
      gl.uniform1i(advectP.u.uVelocity, bindTex(velocity.read.texture, 0));
      gl.uniform1i(advectP.u.uSource, bindTex(velocity.read.texture, 0));
      gl.uniform1f(advectP.u.dt, dt);
      gl.uniform1f(advectP.u.dissipation, CONFIG.VELOCITY_DISSIPATION);
      blit(velocity.write);
      velocity.swap();

      gl.uniform1i(advectP.u.uVelocity, bindTex(velocity.read.texture, 0));
      gl.uniform1i(advectP.u.uSource, bindTex(dye.read.texture, 1));
      gl.uniform1f(advectP.u.dissipation, CONFIG.DENSITY_DISSIPATION);
      blit(dye.write);
      dye.swap();
    };

    const render = () => {
      if (!dye) return;
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(displayP.program);
      gl.uniform2f(displayP.u.texelSize, dye.texelX, dye.texelY);
      gl.uniform1f(displayP.u.opacity, CONFIG.OPACITY);
      gl.uniform1f(displayP.u.intensity, CONFIG.INTENSITY);
      gl.uniform1i(displayP.u.uTexture, bindTex(dye.read.texture, 0));
      blit(null);
    };

    // ---------- Ambient currents (idle life) ----------
    let ambientT = Math.random() * 100;
    let ambientAcc = 0;
    const ambient = (dt: number) => {
      ambientT += dt;
      ambientAcc += dt;
      if (ambientAcc < 0.09) return;
      ambientAcc = 0;
      const t = ambientT;
      for (let k = 0; k < 2; k++) {
        const ph = k * 2.4;
        const x = 0.5 + 0.38 * Math.sin(t * 0.37 + ph) * Math.cos(t * 0.11 + ph);
        const y = 0.5 + 0.34 * Math.sin(t * 0.29 + ph * 1.7);
        const vx = Math.cos(t * 0.37 + ph) * 0.37;
        const vy = Math.cos(t * 0.29 + ph * 1.7) * 0.29;
        splat(x, y, vx * 160, vy * 160, sampleColor(t * 0.25 + k * 1.6, 0.05));
      }
    };

    // ---------- Loop ----------
    let raf = 0;
    let last = performance.now();
    let visible = true;

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible) {
        last = now;
        return;
      }
      const dt = Math.min((now - last) / 1000, 1 / 30);
      last = now;

      while (queue.length) {
        const s = queue.shift()!;
        splat(s.x, s.y, s.dx, s.dy, s.color);
      }
      if (CONFIG.AMBIENT && !hovered) ambient(dt);

      step(dt);
      render();
    };
    raf = requestAnimationFrame(frame);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(container);

    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(resizeRaf);
      io.disconnect();
      resizeObserver.disconnect();
      container.removeEventListener("mousemove", onMove);
      container.removeEventListener("mouseenter", onEnter);
      container.removeEventListener("mouseleave", onLeave);
      container.removeEventListener("mousedown", onDown);
      container.removeEventListener("touchstart", onTouch);
      container.removeEventListener("touchmove", onTouch);
      container.removeEventListener("touchend", onTouchEnd);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl z-0"
    >
      {/* Liquid spotlight glow following the cursor */}
      <div
        ref={glowRef}
        className="absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-500 ease-out"
        style={{ opacity: 0 }}
      />

      {/* Specular border spotlight following the cursor */}
      <div
        ref={borderRef}
        className="absolute -inset-px rounded-3xl pointer-events-none transition-opacity duration-300 ease-out"
        style={{
          opacity: 0,
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          padding: "1px",
        }}
      />

      {/* GPU fluid simulation */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
    </div>
  );
}