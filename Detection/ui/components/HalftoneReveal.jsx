'use client';

import { useEffect, useRef } from 'react';

export default function HalftoneReveal() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    let frameId;
    let pointer = { x: -9999, y: -9999 };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (time) => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const dark = document.documentElement.classList.contains('dark');
      const spacing = 15;
      context.clearRect(0, 0, width, height);
      context.fillStyle = dark ? 'rgba(93, 214, 44, 0.16)' : 'rgba(32, 32, 32, 0.13)';

      for (let y = spacing; y < height * 0.78; y += spacing) {
        for (let x = spacing; x < width; x += spacing) {
          const distance = Math.hypot(x - pointer.x, y - pointer.y);
          const reveal = Math.max(0, 1 - distance / 220);
          const wave = (Math.sin(time * 0.0012 + x * 0.012 + y * 0.008) + 1) * 0.5;
          const radius = 1 + reveal * 2.2 + wave * 0.35;
          context.beginPath();
          context.arc(x, y, radius, 0, Math.PI * 2);
          context.fill();
        }
      }
      frameId = requestAnimationFrame(draw);
    };

    const move = (event) => {
      pointer = { x: event.clientX, y: event.clientY };
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', move);
    frameId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', move);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="halftone-canvas" />;
}
