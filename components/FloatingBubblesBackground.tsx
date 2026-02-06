"use client";

import React, { useEffect, useRef } from "react";

export default function FloatingBubblesBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let bubbles: { x: number; y: number; r: number; opacity: number; speed: number }[] = [];
        const count = 30;

        const init = () => {
            const rect = canvas.parentElement?.getBoundingClientRect();
            canvas.width = rect?.width || window.innerWidth;
            canvas.height = rect?.height || 500;
            bubbles = [];
            for (let i = 0; i < count; i++) {
                bubbles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    r: Math.random() * 20 + 5,
                    opacity: Math.random() * 0.2 + 0.05,
                    speed: 0.2 + Math.random() * 0.5
                });
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            bubbles.forEach(b => {
                b.y -= b.speed;
                if (b.y + b.r < 0) {
                    b.y = canvas.height + b.r;
                    b.x = Math.random() * canvas.width;
                }

                ctx.beginPath();
                ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${b.opacity})`;
                ctx.fill();
            });
            animationFrameId = requestAnimationFrame(animate);
        };

        init();
        animate();
        window.addEventListener("resize", init);

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener("resize", init);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
        />
    );
}
