// components/CurlyBackground.tsx
"use client";

import { useEffect, useRef } from "react";

const getRandomColor = () =>
  `hsl(${Math.random() * 360}, 80%, ${60 + Math.random() * 20}%)`;

const drawCurlyLine = (ctx: CanvasRenderingContext2D, x: number, y: number, color: string) => {
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.beginPath();
  const amplitude = 20 + Math.random() * 30;
  const frequency = 0.05 + Math.random() * 0.1;
  for (let i = 0; i < 300; i++) {
    ctx.lineTo(x + i, y + Math.sin(i * frequency) * amplitude);
  }
  ctx.stroke();
};

const CurlyBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < 15; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        drawCurlyLine(ctx, x, y, getRandomColor());
      }

      requestAnimationFrame(animate);
    };

    animate();

    const moveHandler = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", moveHandler);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", moveHandler);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none opacity-20 mix-blend-screen"
    />
  );
};

export default CurlyBackground;
