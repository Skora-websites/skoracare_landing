"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export interface FallingPatternProps {
  className?: string;
  children?: React.ReactNode;
  /** Grid dot spacing in pixels */
  gridSize?: number;
  /** Number of active falling streams/particles */
  density?: number;
  /** Base falling speed multiplier */
  speed?: number;
  /** Primary particle & grid dot colors */
  colors?: string[];
  /** Glow blur intensity for falling elements */
  blur?: number;
}

interface FallingStream {
  x: number;
  y: number;
  length: number;
  speed: number;
  size: number;
  color: string;
  opacity: number;
  blur: number;
}

export function FallingPattern({
  className,
  children,
  gridSize = 24,
  density = 70,
  speed = 1.3,
  colors = [
    "rgba(16, 185, 129, 0.8)",  // Soft Emerald
    "rgba(5, 150, 105, 0.8)",   // Deep Mint
    "rgba(52, 211, 153, 0.85)", // Light Mint
    "rgba(13, 148, 136, 0.75)", // Soft Teal
    "rgba(20, 184, 166, 0.75)", // Gentle Cyan
  ],
  blur = 6,
}: FallingPatternProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let isVisible = true;
    let width = container.clientWidth;
    let height = container.clientHeight;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      if (!container || !canvas) return;
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const numColumns = Math.floor(width / gridSize);

    interface StreamItem {
      x: number;
      y: number;
      speed: number;
      trailLength: number;
      headSize: number;
      lineWidth: number;
      color: string;
      opacity: number;
      blur: number;
    }

    const streams: StreamItem[] = [];

    const createStream = (randomY = false): StreamItem => {
      const col = Math.floor(Math.random() * Math.max(1, numColumns));
      const x = col * gridSize + gridSize / 2;
      const streamSpeed = (Math.random() * 1.4 + 0.8) * speed;
      const color = colors[Math.floor(Math.random() * colors.length)];
      return {
        x,
        y: randomY ? Math.random() * height : -Math.random() * 200 - 30,
        speed: streamSpeed,
        trailLength: Math.floor(Math.random() * 45) + 35, // 35px to 80px gentle streak trail
        headSize: Math.random() * 1.0 + 2.0, // 2.0px to 3.0px head radius
        lineWidth: Math.random() * 0.6 + 1.2, // 1.2px to 1.8px subtle beam width
        color,
        opacity: Math.random() * 0.25 + 0.45, // 0.45 to 0.70 refined opacity
        blur: Math.random() > 0.4 ? blur : 3,
      };
    };

    const effectiveDensity = width < 640 ? Math.round(density * 0.6) : density;
    for (let i = 0; i < effectiveDensity; i++) {
      streams.push(createStream(true));
    }

    // Animation Loop
    const render = () => {
      if (!isVisible) {
        animId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // 1. Draw Subtle Ambient Dot Matrix Grid
      ctx.fillStyle = "rgba(16, 185, 129, 0.11)"; // Gentle mint/emerald dots
      const startX = (width % gridSize) / 2;
      for (let x = startX; x < width; x += gridSize) {
        for (let y = gridSize / 2; y < height; y += gridSize) {
          ctx.beginPath();
          ctx.arc(x, y, 1.1, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Accentuate every 4th column/row intersection subtly
      ctx.fillStyle = "rgba(5, 150, 105, 0.18)";
      const majorStep = gridSize * 4;
      for (let x = startX + gridSize / 2; x < width; x += majorStep) {
        for (let y = gridSize; y < height; y += majorStep) {
          ctx.beginPath();
          ctx.arc(x, y, 1.4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 2. Draw Falling Streaks & Gentle Glowing Particles
      streams.forEach((s, idx) => {
        s.y += s.speed;

        // Reset stream when trail drops past bottom
        if (s.y - s.trailLength > height) {
          streams[idx] = createStream(false);
          return;
        }

        const tailY = s.y - s.trailLength;

        // Draw Vertical Falling Laser Beam Streak with gentle fade
        const grad = ctx.createLinearGradient(s.x, tailY, s.x, s.y);
        grad.addColorStop(0, "rgba(16, 185, 129, 0)");
        grad.addColorStop(0.7, s.color.replace(/[\d.]+\)$/, `${s.opacity * 0.35})`));
        grad.addColorStop(1, s.color.replace(/[\d.]+\)$/, `${s.opacity * 0.8})`));

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(s.x, Math.max(0, tailY));
        ctx.lineTo(s.x, s.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = s.lineWidth;
        ctx.lineCap = "round";
        ctx.stroke();

        // Draw Falling Head Particle with Soft Glow
        if (s.y >= 0 && s.y <= height + 20) {
          ctx.shadowBlur = s.blur;
          ctx.shadowColor = s.color;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.headSize, 0, Math.PI * 2);
          ctx.fillStyle = s.color.replace(/[\d.]+\)$/, `${s.opacity})`);
          ctx.fill();
        }
        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    observer.observe(container);

    animId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resize);
      observer.disconnect();
      cancelAnimationFrame(animId);
    };
  }, [gridSize, density, speed, blur, colors]);

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full overflow-hidden bg-[#FAFBF9] isolate", className)}
    >
      {/* Background Falling Pattern Canvas */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 z-0 h-full w-full"
      />

      {/* Subtle translucent edge transitions */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-[#FAFBF9]/80 to-transparent z-[1]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#FAFBF9]/80 to-transparent z-[1]" />

      {/* Foreground Content */}
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
}

export default FallingPattern;
