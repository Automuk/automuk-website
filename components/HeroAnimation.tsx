"use client";

import React, { useEffect, useRef } from "react";

// Reduced particle count cuts O(n²) connection checks from 4,950 → 1,128 per frame
const PARTICLE_COUNT = 48;
const CONNECTION_DISTANCE = 130;
const MOUSE_RADIUS = 180;
// Grid cell size for spatial hashing — only check particles in neighbouring cells
const CELL_SIZE = CONNECTION_DISTANCE;

class Particle {
    x: number;
    y: number;
    baseX: number;
    baseY: number;
    vx: number;
    vy: number;
    size: number;

    constructor(width: number, height: number) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.baseX = this.x;
        this.baseY = this.y;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
    }

    update(mouseX: number, mouseY: number, width: number, height: number) {
        this.baseX += this.vx;
        this.baseY += this.vy;

        if (this.baseX < 0 || this.baseX > width) this.vx *= -1;
        if (this.baseY < 0 || this.baseY > height) this.vy *= -1;

        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < MOUSE_RADIUS && distance > 0) {
            const force = (MOUSE_RADIUS - distance) / MOUSE_RADIUS;
            this.x += (dx / distance) * force * 5;
            this.y += (dy / distance) * force * 5;
        }

        this.x += (this.baseX - this.x) * 0.05;
        this.y += (this.baseY - this.y) * 0.05;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = "rgba(49, 104, 250, 0.4)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

export default function HeroAnimation() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: -1000, y: -1000 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let particles: Particle[] = [];
        let animationFrameId: number;

        const init = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            particles = [];
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                particles.push(new Particle(canvas.width, canvas.height));
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Build spatial hash grid to avoid O(n²) distance checks
            const grid = new Map<string, number[]>();
            for (let i = 0; i < particles.length; i++) {
                particles[i].update(
                    mouseRef.current.x, mouseRef.current.y,
                    canvas.width, canvas.height
                );
                particles[i].draw(ctx);
                const cx = Math.floor(particles[i].x / CELL_SIZE);
                const cy = Math.floor(particles[i].y / CELL_SIZE);
                const key = `${cx},${cy}`;
                if (!grid.has(key)) grid.set(key, []);
                grid.get(key)!.push(i);
            }

            // Only check neighbours in adjacent cells
            const dxMouse = mouseRef.current.x;
            const dyMouse = mouseRef.current.y;

            for (let i = 0; i < particles.length; i++) {
                const cx = Math.floor(particles[i].x / CELL_SIZE);
                const cy = Math.floor(particles[i].y / CELL_SIZE);

                for (let nx = cx - 1; nx <= cx + 1; nx++) {
                    for (let ny = cy - 1; ny <= cy + 1; ny++) {
                        const neighbours = grid.get(`${nx},${ny}`);
                        if (!neighbours) continue;
                        for (const j of neighbours) {
                            if (j <= i) continue;
                            const ddx = particles[i].x - particles[j].x;
                            const ddy = particles[i].y - particles[j].y;
                            const distance = Math.sqrt(ddx * ddx + ddy * ddy);
                            if (distance < CONNECTION_DISTANCE) {
                                const mdx = dxMouse - particles[i].x;
                                const mdy = dyMouse - particles[i].y;
                                const distMouse = Math.sqrt(mdx * mdx + mdy * mdy);
                                let opacity = 1 - distance / CONNECTION_DISTANCE;
                                opacity *= distMouse < MOUSE_RADIUS ? 2 : 0.2;
                                ctx.strokeStyle = `rgba(49, 104, 250, ${opacity * 0.3})`;
                                ctx.lineWidth = 0.5;
                                ctx.beginPath();
                                ctx.moveTo(particles[i].x, particles[i].y);
                                ctx.lineTo(particles[j].x, particles[j].y);
                                ctx.stroke();
                            }
                        }
                    }
                }
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };

        const handleResize = () => {
            init();
        };

        init();
        animate();

        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        window.addEventListener("resize", handleResize, { passive: true });

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
        />
    );
}

        // Ease back to base position
        this.x += (this.baseX - this.x) * 0.05;
        this.y += (this.baseY - this.y) * 0.05;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = "rgba(49, 104, 250, 0.4)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

export default function HeroAnimation() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: -1000, y: -1000 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let particles: Particle[] = [];
        let animationFrameId: number;

        const init = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            particles = [];
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                particles.push(new Particle(canvas.width, canvas.height));
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < particles.length; i++) {
                particles[i].update(mouseRef.current.x, mouseRef.current.y, canvas.width, canvas.height);
                particles[i].draw(ctx);

                // Draw connections
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < CONNECTION_DISTANCE) {
                        // Connections become more opaque near the mouse
                        const dxMouse = mouseRef.current.x - particles[i].x;
                        const dyMouse = mouseRef.current.y - particles[i].y;
                        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

                        let opacity = 1 - distance / CONNECTION_DISTANCE;
                        if (distMouse < MOUSE_RADIUS) {
                            opacity *= 2; // Strengthen connection near mouse
                        } else {
                            opacity *= 0.2; // Fade out far from mouse
                        }

                        ctx.strokeStyle = `rgba(49, 104, 250, ${opacity * 0.3})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };

        const handleResize = () => {
            init();
        };

        init();
        animate();

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("resize", handleResize);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
        />
    );
}
