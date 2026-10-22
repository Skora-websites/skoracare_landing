"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { ShaderBackground } from "@/components/ui/shader-b3e94fd7";
import { HudButton } from "@/components/ui/hud-button";

export type ArrowCtaProps = {
  title?: string;
  subtitle?: string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
  note?: string;
  badgeText?: string;
  features?: string[];
  className?: string;
};

export function ArrowCta({
  title = "Ready to Modernize Your Clinic?",
  subtitle = "Join leading clinics using Skora to streamline patient workflows, automate bookings, and cut administrative overhead by 40%.",
  primaryButtonText = "Start Free Trial",
  primaryButtonHref = "/signup",
  secondaryButtonText = "Request a Demo",
  secondaryButtonHref = "/contact",
  note = "No credit card required · Instant 2-minute deployment · Cancel anytime",
  className,
}: ArrowCtaProps) {
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const targetRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      // Remove arrow animation completely on mobile version as requested
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let isWindowActive = false;
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

    const updateCanvasSize = () => {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    const handleMouseMove = (e: MouseEvent) => {
      isWindowActive = true;
      targetX = e.clientX;
      targetY = e.clientY;
      if (!currentX && !currentY) {
        currentX = targetX;
        currentY = targetY;
      }
    };

    const handleMouseLeave = () => {
      isWindowActive = false;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    const drawArrow = (targetRect: DOMRect) => {
      // Smooth lerp mouse follow
      currentX += (targetX - currentX) * 0.22;
      currentY += (targetY - currentY) * 0.22;

      const x0 = currentX;
      const y0 = currentY;

      // Target button center in viewport coordinates
      const cx = targetRect.left + targetRect.width / 2;
      const cy = targetRect.top + targetRect.height / 2;

      // Stop point exactly on button perimeter
      const a = Math.atan2(cy - y0, cx - x0);
      const halfW = targetRect.width / 2 + 10;
      const halfH = targetRect.height / 2 + 10;
      const x1 = cx - Math.cos(a) * halfW;
      const y1 = cy - Math.sin(a) * halfH;

      const dist = Math.hypot(x1 - x0, y1 - y0);
      if (dist < 28) return; // Cursor is directly over the button

      // Bezier curve calculations
      const midX = (x0 + x1) / 2;
      const midY = (y0 + y1) / 2;
      const offset = Math.min(180, dist * 0.32);
      const t = Math.max(-1, Math.min(1, (y0 - y1) / 180));
      const controlX = midX;
      const controlY = midY + offset * t;

      // Dynamic opacity based on proximity and smooth fade-in
      const opacity = Math.min(0.95, Math.max(0.35, (dist - 28) / 380));

      ctx.save();
      ctx.shadowColor = "rgba(16, 185, 129, 0.55)";
      ctx.shadowBlur = 10;
      ctx.strokeStyle = `rgba(52, 211, 153, ${opacity})`;
      ctx.lineWidth = 2.2;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      // Dashed quadratic curve
      ctx.beginPath();
      ctx.moveTo(x0, y0);
      ctx.quadraticCurveTo(controlX, controlY, x1, y1);
      ctx.setLineDash([8, 5]);
      ctx.stroke();

      // Arrowhead pointing right at target button
      const angle = Math.atan2(y1 - controlY, x1 - controlX);
      const headLength = 13;
      ctx.setLineDash([]);
      ctx.fillStyle = `rgba(52, 211, 153, ${opacity})`;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(
        x1 - headLength * Math.cos(angle - Math.PI / 6),
        y1 - headLength * Math.sin(angle - Math.PI / 6)
      );
      ctx.lineTo(
        x1 - headLength * Math.cos(angle + Math.PI / 6),
        y1 - headLength * Math.sin(angle + Math.PI / 6)
      );
      ctx.closePath();
      ctx.fill();

      // Small cursor focal ring
      ctx.beginPath();
      ctx.arc(x0, y0, 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const animate = (time = 0) => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      const targetEl = targetRef.current;
      if (targetEl) {
        const targetRect = targetEl.getBoundingClientRect();
        const isInViewport =
          targetRect.bottom > 0 &&
          targetRect.top < window.innerHeight &&
          targetRect.right > 0 &&
          targetRect.left < window.innerWidth;

        if (isInViewport) {
          // Autonomous smooth guide before user interaction
          if (!isWindowActive) {
            const cx = targetRect.left + targetRect.width / 2;
            const cy = targetRect.top + targetRect.height / 2;
            const t = time * 0.0018;
            targetX = cx - 180 + Math.cos(t) * 35;
            targetY = cy - 140 + Math.sin(t * 1.5) * 20;
            if (!currentX && !currentY) {
              currentX = targetX;
              currentY = targetY;
            }
          }

          if (currentX > 0 && currentY > 0) {
            drawArrow(targetRect);
          }
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mounted]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full overflow-hidden bg-[#03150E] text-[#FAF7F2] py-14 sm:py-24 lg:py-32 min-h-[60vh] sm:min-h-[75vh] md:min-h-screen flex items-center justify-center select-none",
        className
      )}
    >
      {/* 21st.dev Animated Mesh Drift Shader Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <ShaderBackground className="h-full w-full opacity-90" />
      </div>

      {/* Ambient Teal Glow */}
      <div className="pointer-events-none absolute -top-32 left-1/4 h-80 w-80 rounded-full bg-teal-500/20 blur-[120px] z-[2]" />
      <div className="pointer-events-none absolute -bottom-32 right-1/4 h-80 w-80 rounded-full bg-teal-500/15 blur-[120px] z-[2]" />

      {/* Subtle depth vignette for text legibility */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-[#03150E]/40 via-transparent to-[#03150E]/70" />

      <div className="relative z-10 mx-auto max-w-5xl px-5 sm:px-8 text-center">
        {/* Section Headline */}
        <h2 className="font-main text-balance text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.08] tracking-tight text-[#FAF7F2]">
          {title}
        </h2>

        {/* Section Subtitle */}
        {subtitle && (
          <p className="font-secondary mx-auto mt-4 sm:mt-7 max-w-2xl text-pretty text-sm sm:text-xl leading-relaxed text-[#FAF7F2]/80 line-clamp-2 sm:line-clamp-none">
            {subtitle}
          </p>
        )}

        {/* Action Buttons: Primary is targeted by cursor arrow and uses HudButton */}
        <div className="mt-7 sm:mt-11 flex flex-wrap items-center justify-center gap-3.5 sm:gap-5">
          <HudButton
            ref={targetRef}
            href={primaryButtonHref}
            className="shadow-[0_16px_36px_-6px_rgba(20,184,166,0.55),0_0_24px_rgba(45,212,191,0.35)]"
          >
            {primaryButtonText}
          </HudButton>

          {secondaryButtonText && (
            <a
              href={secondaryButtonHref}
              className="inline-flex items-center rounded-xl border border-white/20 bg-white/10 px-8 sm:px-10 py-4 text-base font-semibold text-[#FAF7F2] backdrop-blur-md transition-all duration-300 hover:border-white/40 hover:bg-white/20 font-main"
            >
              {secondaryButtonText}
            </a>
          )}
        </div>

        {/* Deployment Note */}
        {note && (
          <p className="font-secondary mt-6 sm:mt-8 text-xs sm:text-sm text-[#FAF7F2]/65">
            {note}
          </p>
        )}
      </div>

      {/* Interactive Cursor Arrow Canvas Overlay: Desktop Only (Hidden & Removed on Mobile) */}
      {mounted &&
        typeof document !== "undefined" &&
        createPortal(
          <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-[99999] hidden md:block"
            style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", pointerEvents: "none", zIndex: 99999 }}
          />,
          document.body
        )}
    </div>
  );
}

// Export original name for 21st.dev compatibility
export const ArrowOverlayComponent = ArrowCta;
export default ArrowCta;
