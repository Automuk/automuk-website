"use client";

import React, { useEffect, useRef } from "react";

export default function DataStreamBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let streams: { x: number; y: number; speed: number; length: number; opacity: number }[] = [];
        const streamCount = 20;

        const init = () => {
            const rect = canvas.parentElement?.getBoundingClientRect();
            canvas.width = rect?.width || window.innerWidth;
            canvas.height = rect?.height || 800;
            streams = [];
            for (let i = 0; i < streamCount; i++) {
                streams.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    speed: 1 + Math.random() * 3,
                    length: 50 + Math.random() * 150,
                    opacity: 0.1 + Math.random() * 0.2
                });
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            streams.forEach(s => {
                s.y += s.speed;
                if (s.y > canvas.height) {
                    s.y = -s.length;
                    s.x = Math.random() * canvas.width;
                }

                const grad = ctx.createLinearGradient(s.x, s.y, s.x, s.y + s.length);
                grad.addColorStop(0, "transparent");
                grad.addColorStop(0.5, `rgba(206, 119, 251, ${s.opacity})`);
                grad.addColorStop(1, "transparent");

                ctx.strokeStyle = grad;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(s.x, s.y);
                ctx.lineTo(s.x, s.y + s.length);
                ctx.stroke();
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
