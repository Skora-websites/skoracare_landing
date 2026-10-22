"use client";

import React, { useState, forwardRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Corner = "tl" | "tr" | "bl" | "br";

const TICKS: Record<Corner, React.CSSProperties> = {
  tl: { top: 4, left: 4, borderWidth: "1.5px 0 0 1.5px" },
  tr: { top: 4, right: 4, borderWidth: "1.5px 1.5px 0 0" },
  bl: { bottom: 4, left: 4, borderWidth: "0 0 1.5px 1.5px" },
  br: { bottom: 4, right: 4, borderWidth: "0 1.5px 1.5px 0" },
};

export interface HudButtonProps {
  href?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
  size?: "default" | "sm";
  showArrow?: boolean;
  onClick?: () => void;
}

export const HudButton = forwardRef<HTMLElement, HudButtonProps>(
  (
    {
      href,
      type = "button",
      disabled = false,
      children = "Get free demo",
      className = "",
      size = "default",
      showArrow = false,
      onClick,
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = useState(false);
    const isSm = size === "sm";

    const commonClasses = `group relative inline-flex items-center justify-center overflow-hidden font-main font-bold uppercase text-white select-none transition-all duration-300 ${
      disabled
        ? "opacity-60 cursor-not-allowed"
        : "hover:-translate-y-0.5 active:translate-y-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_8px_20px_-4px_rgba(16,185,129,0.3)] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.5),0_12px_24px_-4px_rgba(16,185,129,0.45)] border border-emerald-400/40 hover:border-emerald-300/70 bg-gradient-to-b from-[#10B981] via-[#059669] to-[#047857]"
    } ${
      isSm
        ? "rounded-lg px-4.5 py-2 text-xs tracking-wider"
        : "rounded-xl px-8 py-4 text-sm sm:text-base tracking-[0.14em]"
    } ${className}`;

    const innerContent = (
      <>
        {/* 4 Corner HUD Crosshair/Bracket Ticks */}
        {(Object.keys(TICKS) as Corner[]).map((corner) => (
          <span
            key={corner}
            aria-hidden
            className={`pointer-events-none absolute border-solid transition-all duration-300 ${
              isSm ? "h-1 w-1" : "h-[6px] w-[6px]"
            }`}
            style={{
              ...TICKS[corner],
              borderColor: isHovered && !disabled ? "#ecfdf5" : "rgba(255, 255, 255, 0.65)",
              filter: isHovered && !disabled ? "drop-shadow(0 0 4px #a7f3d0)" : "none",
            }}
          />
        ))}

        {/* Cybernetic Scanline detail: fades in on hover */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.18) 0 1px, transparent 1px 3px)",
            opacity: isHovered && !disabled ? 1 : 0,
          }}
        />

        {/* Radiant inner ambient sweep */}
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 -rotate-45 translate-x-[-100%] group-hover:translate-x-[200%]"
        />

        {/* Button Content */}
        <span className={`relative z-10 flex items-center ${isSm ? "gap-2" : "gap-3"}`}>
          {/* Live Status indicator */}
          <span className={`relative flex ${isSm ? "h-1.5 w-1.5" : "h-2 w-2"}`}>
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-200 opacity-75" />
            <span className={`relative inline-flex rounded-full bg-emerald-100 ${isSm ? "h-1.5 w-1.5" : "h-2 w-2"}`} />
          </span>

          <span>{children}</span>

          {showArrow && (
            <ArrowRight className={`${isSm ? "h-3.5 w-3.5" : "h-4 w-4"} transition-transform duration-300 group-hover:translate-x-1.5 text-emerald-100`} />
          )}
        </span>
      </>
    );

    if (href) {
      return (
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          onClick={onClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={commonClasses}
        >
          {innerContent}
        </Link>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type}
        disabled={disabled}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={commonClasses}
      >
        {innerContent}
      </button>
    );
  }
);

HudButton.displayName = "HudButton";

export default HudButton;
