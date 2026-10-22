"use client";

import { type ReactNode } from "react";
import { BlurryToClear } from "@/components/ui/blurry-to-clear";
import { MeshDriftBackground } from "@/components/ui/mesh-drift-background";
import { cn } from "@/lib/utils";

export function PageHeader({
  badge,
  title,
  subtitle,
  children,
  className,
}: {
  badge?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-[#03120E] pb-14 pt-32 sm:pb-18 sm:pt-38 lg:pb-22 lg:pt-44 text-[#FAF7F2] select-none",
        className
      )}
    >
      {/* ── 21st.dev "Mesh drift" WebGL Shader Background ── */}
      <MeshDriftBackground className="z-0" />

      {/* ── AMBIENT TOP RADIAL EMERALD GLOW ── */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[760px] max-w-[95vw] h-[380px] bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.25),rgba(4,29,20,0.6)_60%,transparent_75%)] blur-3xl z-10" />

      {/* ── SUBTLE GEOMETRIC GRID OVERLAY ── */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-10" />

      {/* ── VIGNETTE SCRIM FOR PRISTINE CONTRAST ── */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#03120E]/40 via-transparent to-[#03120E]/85 z-10" />

      <div className="relative z-20 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {badge && (
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-400 font-main backdrop-blur-md shadow-[0_0_14px_rgba(16,185,129,0.18)] mb-4">
            <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>{badge}</span>
          </div>
        )}

        <BlurryToClear
          as="h1"
          className="font-main text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FAF7F2] leading-[1.12] max-w-4xl drop-shadow-[0_4px_16px_rgba(0,0,0,0.4)]"
        >
          {title}
        </BlurryToClear>

        {subtitle && (
          <p className="font-secondary mt-4 sm:mt-5 max-w-2xl text-pretty text-sm sm:text-lg lg:text-xl leading-relaxed text-emerald-100/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]">
            {subtitle}
          </p>
        )}

        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}

export default PageHeader;
