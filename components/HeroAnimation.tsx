"use client";

import React, { useEffect, useRef } from "react";

const PARTICLE_COUNT = 100;
const CONNECTION_DISTANCE = 150;
const MOUSE_RADIUS = 200;

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
        // Natural movement
        this.baseX += this.vx;
        this.baseY += this.vy;

        // Bounce off walls
        if (this.baseX < 0 || this.baseX > width) this.vx *= -1;
        if (this.baseY < 0 || this.baseY > height) this.vy *= -1;

        // Mouse attraction/repulsion logic
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < MOUSE_RADIUS) {
            const force = (MOUSE_RADIUS - distance) / MOUSE_RADIUS;
            const directionX = dx / distance;
            const directionY = dy / distance;

            // "Magnetic" pull towards mouse
            this.x += directionX * force * 5;
            this.y += directionY * force * 5;
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
