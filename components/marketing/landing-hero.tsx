"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Clock,
  ShieldCheck,
  QrCode,
  MessageCircle,
  Thermometer,
} from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import type { LandingItem } from "@/lib/db/schema";
import { MeshDriftBackground } from "@/components/ui/mesh-drift-background";
import { HudButton } from "@/components/ui/hud-button";

gsap.registerPlugin(useGSAP);

type HeroSlide = Pick<
  LandingItem,
  "id" | "title" | "description" | "link" | "linkText" | "image"
>;

export function LandingHero({ items }: { items?: HeroSlide[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Center hero refs
  const headlineLine1Ref = useRef<HTMLHeadingElement>(null);
  const headlineLine2Ref = useRef<HTMLSpanElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Scattered medical objects refs
  const stickyNoteRef = useRef<HTMLDivElement>(null);
  const rxPadRef = useRef<HTMLDivElement>(null);
  const checkTileRef = useRef<HTMLDivElement>(null);
  const remindersCardRef = useRef<HTMLDivElement>(null);
  const stopwatchTileRef = useRef<HTMLDivElement>(null);
  const tasksCardRef = useRef<HTMLDivElement>(null);
  const integrationsCardRef = useRef<HTMLDivElement>(null);
  const blisterPackRef = useRef<HTMLDivElement>(null);
  const thermometerRef = useRef<HTMLDivElement>(null);
  const medicineBottleRef = useRef<HTMLDivElement>(null);
  const fallenPillBottleRef = useRef<HTMLDivElement>(null);

  // High-performance direct CSS variable mouse parallax
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // -1 to 1
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    el.style.setProperty("--mx", x.toFixed(3));
    el.style.setProperty("--my", y.toFixed(3));
  };

  const handleMouseLeave = () => {
    const el = containerRef.current;
    if (!el) return;
    el.style.setProperty("--mx", "0");
    el.style.setProperty("--my", "0");
  };

  // GSAP animation triggers cleanly after page load without causing React fiber re-render conflicts
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        // Reduced motion: show all immediately
        gsap.set(
          [
            headlineLine1Ref.current,
            headlineLine2Ref.current,
            descRef.current,
            ctaRef.current,
            stickyNoteRef.current,
            rxPadRef.current,
            checkTileRef.current,
            remindersCardRef.current,
            stopwatchTileRef.current,
            tasksCardRef.current,
            integrationsCardRef.current,
            blisterPackRef.current,
            thermometerRef.current,
            medicineBottleRef.current,
            fallenPillBottleRef.current,
          ],
          { opacity: 1, visibility: "visible" }
        );
        return;
      }

      const runEntrance = () => {
        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

        // Headline lines reveal upward
        tl.fromTo(
          [headlineLine1Ref.current, headlineLine2Ref.current],
          { y: 65, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.1, stagger: 0.14, ease: "power4.out" },
          0.1
        );

        // Subtitle & CTA
        tl.fromTo(
          descRef.current,
          { y: 35, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.95, ease: "power3.out" },
          0.38
        );

        tl.fromTo(
          ctaRef.current,
          { y: 30, opacity: 0, scale: 0.92 },
          { y: 0, opacity: 1, scale: 1, duration: 0.95, ease: "back.out(1.6)" },
          0.48
        );

        // ── MEDICAL DESK ITEMS FLOAT IN FROM OUTSIDE THE SCREEN ──

        // 1. Top-Left: Pinned Sticky Note & Layered Rx Pad
        if (stickyNoteRef.current) {
          tl.fromTo(
            stickyNoteRef.current,
            { x: -220, y: -140, opacity: 0, rotate: -26 },
            { x: 0, y: 0, opacity: 1, rotate: -6, duration: 1.4, ease: "power4.out" },
            0.3
          );
        }

        if (rxPadRef.current) {
          tl.fromTo(
            rxPadRef.current,
            { x: -240, y: -80, opacity: 0, rotate: 2 },
            { x: 0, y: 0, opacity: 1, rotate: 8, duration: 1.5, ease: "power4.out" },
            0.25
          );
        }

        if (checkTileRef.current) {
          tl.fromTo(
            checkTileRef.current,
            { scale: 0, opacity: 0, y: 30 },
            { scale: 1, opacity: 1, y: 0, duration: 0.9, ease: "back.out(2)" },
            0.6
          );
        }

        // 2. Top-Right: Reminders Card & Clinical Stopwatch
        if (remindersCardRef.current) {
          tl.fromTo(
            remindersCardRef.current,
            { x: 220, y: -140, opacity: 0, rotate: 24 },
            { x: 0, y: 0, opacity: 1, rotate: 5, duration: 1.4, ease: "power4.out" },
            0.35
          );
        }

        if (stopwatchTileRef.current) {
          tl.fromTo(
            stopwatchTileRef.current,
            { scale: 0, opacity: 0, x: -30 },
            { scale: 1, opacity: 1, x: 0, duration: 0.9, ease: "back.out(2)" },
            0.65
          );
        }

        // 3. Bottom-Left: Today's Prescriptions Card & Blister Pack
        if (tasksCardRef.current) {
          tl.fromTo(
            tasksCardRef.current,
            { x: -240, y: 160, opacity: 0, rotate: -18 },
            { x: 0, y: 0, opacity: 1, rotate: -3, duration: 1.45, ease: "power4.out" },
            0.4
          );
        }

        if (blisterPackRef.current) {
          tl.fromTo(
            blisterPackRef.current,
            { x: -140, y: 120, opacity: 0, scale: 0.7, rotate: -25 },
            { x: 0, y: 0, opacity: 1, scale: 1, rotate: -8, duration: 1.3, ease: "power4.out" },
            0.5
          );
        }

        // 4. Bottom-Right (Desktop) / Bottom-Left (Mobile): 100+ Integrations Card
        if (integrationsCardRef.current) {
          const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
          tl.fromTo(
            integrationsCardRef.current,
            isMobile
              ? { x: -320, y: 30, opacity: 0, rotate: -22 }
              : { x: 240, y: 160, opacity: 0, rotate: 20 },
            {
              x: 0,
              y: 0,
              opacity: 1,
              rotate: isMobile ? -5 : 4,
              duration: 1.45,
              ease: "power4.out",
            },
            0.45
          );
        }

        if (thermometerRef.current) {
          tl.fromTo(
            thermometerRef.current,
            { x: 160, y: 100, opacity: 0, rotate: 22 },
            { x: 0, y: 0, opacity: 1, rotate: 12, duration: 1.3, ease: "power4.out" },
            0.55
          );
        }

        // 5. Amber Medicine Bottle
        if (medicineBottleRef.current) {
          tl.fromTo(
            medicineBottleRef.current,
            { scale: 0.5, opacity: 0, y: 60 },
            { scale: 1, opacity: 1, y: 0, duration: 1.2, ease: "back.out(1.7)" },
            0.5
          );
        }

        // 6. Fallen Pill Bottle with Spilled Pills (Tilted Left at region ~1207, 338)
        if (fallenPillBottleRef.current) {
          tl.fromTo(
            fallenPillBottleRef.current,
            { x: 160, y: 30, opacity: 0, scale: 0.75, rotate: 18 },
            { x: 0, y: 0, opacity: 1, scale: 1, rotate: 0, duration: 1.4, ease: "power4.out" },
            0.45
          );
        }
      };

      if (document.readyState === "complete") {
        const timer = setTimeout(runEntrance, 120);
        return () => clearTimeout(timer);
      } else {
        const onLoad = () => {
          setTimeout(runEntrance, 120);
        };
        window.addEventListener("load", onLoad);
        return () => window.removeEventListener("load", onLoad);
      }
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[100svh] w-full overflow-hidden bg-[#03120E] px-4 pb-20 pt-20 sm:pt-28 md:pb-28 md:pt-36 flex items-center justify-center select-none"
    >
      {/* ── 21st.dev "Mesh drift" WebGL Shader Background ── */}
      <MeshDriftBackground className="z-0" />

      {/* ── SCATTERED CLINICAL & MEDICAL OBJECTS (FRAME ADJUSTED FOR MOBILE) ── */}
      <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
        {/* Layered Prescription Sheet (Rx Memo Pad) - Top-Left Under Sticky Note */}
        <div
          ref={rxPadRef}
          style={{
            transform: `translate3d(calc(var(--mx, 0) * -14px), calc(var(--my, 0) * -14px), 0) rotate(8deg)`,
            transition: "transform 0.25s cubic-bezier(0.2, 0, 0.2, 1)",
          }}
          className="pointer-events-auto absolute top-16 -left-3 sm:top-10 sm:left-4 md:top-12 md:left-6 lg:left-8 scale-[0.52] sm:scale-100 origin-top-left opacity-0 will-change-transform active:scale-95 transition-transform"
        >
          <div className="animate-pond-float-1">
            <div className="water-item-shadow w-48 sm:w-56 md:w-60 rounded-2xl border border-white/80 bg-white/95 p-4 pt-4.5 backdrop-blur-md transition-all duration-300 hover:scale-105 hover:rotate-12 cursor-pointer">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="font-secondary text-lg font-bold text-emerald-800 tracking-wide">
                  ℞ SkoraRx
                </span>
                <span className="text-[10px] font-main text-slate-400">#RX-2026</span>
              </div>
              <div className="mt-2.5 space-y-1.5 text-[11px] text-slate-600">
                <p className="font-medium text-slate-800">Pt: Anita Verma • 34Y / F</p>
                <div className="flex items-center justify-between text-slate-500 font-main text-[10px]">
                  <span>1. Tab. Telmisartan 40mg</span>
                  <span className="text-emerald-700 font-bold">1-0-1</span>
                </div>
                <div className="flex items-center justify-between text-slate-500 font-main text-[10px]">
                  <span>2. Tab. Pantoprazole 40mg</span>
                  <span className="text-emerald-700 font-bold">1-0-0</span>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2 text-[9px] font-bold text-emerald-700">
                <span>Dr. Alok Mehta, MD</span>
                <span className="hidden sm:inline-flex items-center gap-1 rounded bg-emerald-100 px-1.5 py-0.5 text-emerald-800">
                  <span>Verified</span>
                  <Check className="h-2.5 w-2.5 stroke-[3]" />
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Canary Yellow Sticky Note: Upper-Left Framing Corner Below Navbar */}
        <div
          ref={stickyNoteRef}
          style={{
            transform: `translate3d(calc(var(--mx, 0) * -20px), calc(var(--my, 0) * -20px), 0) rotate(-6deg)`,
            transition: "transform 0.25s cubic-bezier(0.2, 0, 0.2, 1)",
          }}
          className="pointer-events-auto absolute top-34 left-1 sm:top-40 sm:left-4 md:top-48 md:left-6 lg:left-8 xl:left-12 scale-[0.54] sm:scale-100 origin-top-left opacity-0 will-change-transform group cursor-pointer active:scale-95 transition-transform z-20"
        >
          <div className="animate-pond-float-2">
            <div className="water-item-shadow relative w-48 sm:w-56 md:w-60 rounded-xl bg-[#fef08a] p-4.5 pt-6 border border-yellow-200/90 transition-all duration-300 group-hover:-translate-y-2 group-hover:rotate-[-4deg]">
              {/* 3D Realistic Pushpin with Specular Glow & Metal Pin */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-none z-20">
                <svg
                  width="28"
                  height="34"
                  viewBox="0 0 28 34"
                  fill="none"
                  className="drop-shadow-[0_6px_10px_rgba(0,0,0,0.35)]"
                >
                  <defs>
                    <linearGradient id="pinNeedle" x1="14" y1="20" x2="14" y2="34" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#94A3B8" />
                      <stop offset="60%" stopColor="#CBD5E1" />
                      <stop offset="100%" stopColor="#475569" />
                    </linearGradient>
                    <radialGradient id="pinGlow" cx="11" cy="7" r="10" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#FF6B6B" />
                      <stop offset="35%" stopColor="#EF4444" />
                      <stop offset="70%" stopColor="#DC2626" />
                      <stop offset="100%" stopColor="#7F1D1D" />
                    </radialGradient>
                    <linearGradient id="pinCollar" x1="9" y1="17" x2="19" y2="17" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#7F1D1D" />
                      <stop offset="30%" stopColor="#EF4444" />
                      <stop offset="70%" stopColor="#F87171" />
                      <stop offset="100%" stopColor="#991B1B" />
                    </linearGradient>
                  </defs>
                  {/* Metal Needle */}
                  <path d="M13 18 L13 32 L15 32 L15 18 Z" fill="url(#pinNeedle)" />
                  <polygon points="13,32 15,32 14,34" fill="#334155" />
                  {/* Paper puncture shadow */}
                  <ellipse cx="14" cy="33" rx="2" ry="0.8" fill="#713F12" opacity="0.4" />
                  {/* Collar */}
                  <ellipse cx="14" cy="18" rx="5" ry="2.2" fill="url(#pinCollar)" />
                  <ellipse cx="14" cy="17.5" rx="4.2" ry="1.6" fill="#DC2626" />
                  {/* Waist */}
                  <path d="M10 12 C10 15 11 17 11 17.5 L17 17.5 C17 17 18 15 18 12 Z" fill="#991B1B" />
                  {/* Head */}
                  <circle cx="14" cy="9" r="7.5" fill="url(#pinGlow)" />
                  {/* Highlight */}
                  <ellipse cx="12" cy="6" rx="3.2" ry="2" fill="#FFFFFF" opacity="0.8" />
                  <circle cx="11" cy="5.2" r="1.2" fill="#FFFFFF" opacity="0.95" />
                </svg>
              </div>

              <p className="font-main text-[11px] sm:text-sm font-semibold leading-relaxed text-yellow-950/90 tracking-tight line-clamp-3 sm:line-clamp-none">
                Take notes: verify Montelukast &amp; Levo batch expiry, restock saline bottles &amp; check cold-chain log by 4 PM.
              </p>

              <div className="mt-3 flex items-center justify-between border-t border-yellow-300/80 pt-2 text-[10px] font-semibold text-yellow-900/80">
                <span>Dr. Mehta • Clinic A</span>
                <span className="flex items-center gap-1 font-main">
                  <Clock className="h-3 w-3" /> Urgent
                </span>
              </div>
            </div>
          </div>

          {/* 3D Floating Squircle Checkmark Badge */}
          <div
            ref={checkTileRef}
            style={{
              transform: `translate3d(calc(var(--mx, 0) * -28px), calc(var(--my, 0) * -28px), 0)`,
              transition: "transform 0.25s cubic-bezier(0.2, 0, 0.2, 1)",
            }}
            className="absolute -bottom-6 -left-2 sm:-bottom-8 sm:-left-4 z-20 pointer-events-auto"
          >
            <div className="animate-pond-float-4">
              <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-emerald-600 to-emerald-400 shadow-[0_14px_30px_rgba(16,185,129,0.45),0_4px_10px_rgba(0,0,0,0.18),inset_0_1px_1px_rgba(255,255,255,0.4)] transition-transform duration-300 hover:scale-110 hover:rotate-6 border border-emerald-300/30">
                <Check className="h-5 w-5 sm:h-7 sm:w-7 text-white stroke-[3]" />
              </div>
            </div>
          </div>
        </div>

        {/* ── TOP-RIGHT: Reminders Card + 3D Clinical Stopwatch (Below Navbar on Mobile) ── */}
        <div
          ref={remindersCardRef}
          style={{
            transform: `translate3d(calc(var(--mx, 0) * 20px), calc(var(--my, 0) * -20px), 0) rotate(5deg)`,
            transition: "transform 0.25s cubic-bezier(0.2, 0, 0.2, 1)",
          }}
          className="pointer-events-auto absolute top-28 -right-2 sm:top-14 sm:right-4 md:top-20 md:right-6 lg:right-10 xl:right-14 scale-[0.52] sm:scale-100 origin-top-right opacity-0 will-change-transform group cursor-pointer active:scale-95 transition-transform z-20"
        >
          <div className="animate-pond-float-3">
            {/* Frosted Layer behind */}
            <div className="absolute -inset-2 rotate-6 rounded-3xl border border-white/70 bg-white/70 p-4 shadow-sm backdrop-blur-sm -z-10 transition-transform duration-300 group-hover:rotate-8 group-hover:scale-105" />

            {/* Reminders Folder Card */}
            <div className="water-item-shadow relative w-50 sm:w-60 md:w-64 rounded-2xl bg-white p-4 sm:p-4.5 border border-white/90 transition-all duration-300 group-hover:-translate-y-2 group-hover:rotate-[3deg]">
              <div className="flex items-center justify-between">
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-700">
                  Reminders
                </span>
                <span className="text-[9px] sm:text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                  Auto Sync
                </span>
              </div>

              <div className="mt-3 border-t border-slate-100 pt-2.5">
                <p className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                  Patient Refill: Metformin 500mg
                </p>
                <p className="mt-0.5 text-[10px] sm:text-[11px] text-slate-500 font-medium">
                  Rahul Sharma • 60 Tablets Dispense
                </p>

                {/* Time Pill */}
                <div className="mt-2.5 inline-flex items-center gap-1.5 rounded-lg bg-emerald-50/90 border border-emerald-200/80 px-2 py-0.5 text-[11px] font-semibold text-emerald-800">
                  <Clock className="h-3 w-3 text-emerald-600" />
                  <span>13:00 - 13:45 PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* 3D Floating Stopwatch Tile */}
          <div
            ref={stopwatchTileRef}
            style={{
              transform: `translate3d(calc(var(--mx, 0) * 28px), calc(var(--my, 0) * -28px), 0)`,
              transition: "transform 0.25s cubic-bezier(0.2, 0, 0.2, 1)",
            }}
            className="absolute -bottom-6 -left-3 sm:bottom-auto sm:-top-12 sm:-left-12 z-20 pointer-events-auto"
          >
            <div className="animate-pond-float-1">
              <div className="flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-2xl bg-white border border-slate-100 shadow-[0_18px_40px_-6px_rgba(15,23,42,0.16),0_4px_12px_rgba(0,0,0,0.06),inset_0_2px_2px_rgba(250,247,242,0.95)] transition-transform duration-300 hover:scale-110 hover:-rotate-6 cursor-pointer">
                <svg
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 sm:h-11 sm:w-11 drop-shadow-[0_2px_6px_rgba(0,0,0,0.15)]"
                >
              <defs>
                <linearGradient id="stopwatchCase" x1="6" y1="6" x2="42" y2="44" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="50%" stopColor="#E2E8F0" />
                  <stop offset="100%" stopColor="#94A3B8" />
                </linearGradient>
                <linearGradient id="bezelRing" x1="10" y1="10" x2="38" y2="40" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#059669" />
                  <stop offset="100%" stopColor="#022c1e" />
                </linearGradient>
                <radialGradient id="dialGlow" cx="24" cy="26" r="14" gradientUnits="userSpaceOnUse">
                  <stop offset="70%" stopColor="#FFFFFF" />
                  <stop offset="100%" stopColor="#ECFDF5" />
                </radialGradient>
              </defs>

              {/* Top Crown Button & Stem */}
              <rect x="21" y="2" width="6" height="4" rx="1.5" fill="#64748B" />
              <rect x="22" y="1" width="4" height="2" rx="0.5" fill="#94A3B8" />
              <rect x="22.5" y="5" width="3" height="3" fill="#CBD5E1" />

              {/* Left Split Button */}
              <g transform="rotate(-40 12 11)">
                <rect x="10" y="8" width="4" height="3" rx="1" fill="#94A3B8" />
              </g>

              {/* Right Lap Button */}
              <g transform="rotate(40 36 11)">
                <rect x="34" y="8" width="4" height="3" rx="1" fill="#94A3B8" />
              </g>

              {/* Stopwatch Case & Bezel */}
              <circle cx="24" cy="26" r="18" fill="url(#stopwatchCase)" stroke="#CBD5E1" strokeWidth="0.8" />
              <circle cx="24" cy="26" r="16" fill="url(#bezelRing)" />
              <circle cx="24" cy="26" r="14.5" fill="url(#dialGlow)" stroke="#A7F3D0" strokeWidth="0.5" />

              {/* Minute Tick Marks */}
              {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                <line
                  key={deg}
                  x1="24"
                  y1={deg % 90 === 0 ? "13" : "13.8"}
                  x2="24"
                  y2="15.2"
                  stroke={deg % 90 === 0 ? "#047857" : "#94A3B8"}
                  strokeWidth={deg % 90 === 0 ? "1.2" : "0.75"}
                  strokeLinecap="round"
                  transform={`rotate(${deg} 24 26)`}
                />
              ))}

              {/* Subdial (Seconds tracking at 6 o'clock) */}
              <circle cx="24" cy="31" r="3.5" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="0.5" strokeDasharray="1 1" />
              <line x1="24" y1="31" x2="25.5" y2="29.5" stroke="#059669" strokeWidth="0.75" strokeLinecap="round" />
              <circle cx="24" cy="31" r="0.8" fill="#047857" />

              {/* Main Needle */}
              <g transform="rotate(52 24 26)">
                <line x1="24" y1="26" x2="24" y2="29" stroke="#EF4444" strokeWidth="1" strokeLinecap="round" />
                <line x1="24" y1="26" x2="24" y2="14.5" stroke="#047857" strokeWidth="1.2" strokeLinecap="round" />
                <polygon points="23.2,16 24.8,16 24,14" fill="#10B981" />
              </g>

              {/* Center Jewel Pivot Pin */}
              <circle cx="24" cy="26" r="2.2" fill="#0F172A" />
              <circle cx="24" cy="26" r="1.2" fill="#EF4444" />
              <circle cx="23.6" cy="25.6" r="0.5" fill="#FFFFFF" />
            </svg>
              </div>
            </div>
          </div>
        </div>

        {/* ── BOTTOM-LEFT: Today's Prescriptions Card + Blister Pack (Downward balanced spacing) ── */}
        <div
          ref={tasksCardRef}
          style={{
            transform: `translate3d(calc(var(--mx, 0) * -18px), calc(var(--my, 0) * 18px), 0) rotate(-3deg)`,
            transition: "transform 0.25s cubic-bezier(0.2, 0, 0.2, 1)",
          }}
          className="pointer-events-auto absolute bottom-2 left-2 sm:bottom-3 sm:left-4 md:bottom-4 md:left-6 lg:left-8 xl:left-12 opacity-0 will-change-transform group cursor-pointer hidden sm:block active:scale-95 transition-transform"
        >
          <div className="animate-pond-float-4">
            <div className="water-item-shadow w-56 sm:w-64 md:w-72 rounded-2xl bg-white p-4.5 sm:p-5 border border-white/90 transition-all duration-300 group-hover:-translate-y-2 group-hover:rotate-[-1deg]">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs sm:text-sm font-bold text-slate-900">
                  Today&apos;s prescriptions
                </span>
                <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  18 Active
                </span>
              </div>

              {/* Task Row 1 */}
              <div className="mt-3.5 space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-md bg-amber-500 text-[10px] font-bold text-white shadow-xs">
                      8
                    </span>
                    <span className="font-semibold text-slate-800">
                      Rx: Cefixime 200mg (Post-Op)
                    </span>
                  </div>
                  <div className="flex -space-x-1.5">
                    <div className="h-5 w-5 rounded-full bg-emerald-600 text-[9px] font-bold text-white flex items-center justify-center ring-2 ring-white">
                      DR
                    </div>
                    <div className="h-5 w-5 rounded-full bg-teal-500 text-[9px] font-bold text-white flex items-center justify-center ring-2 ring-white">
                      PH
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500 font-main">
                  <span>Sep 10</span>
                  <span className="font-semibold text-slate-700">60%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full w-[60%] rounded-full bg-gradient-to-r from-emerald-500 to-teal-400" />
                </div>
              </div>

              {/* Task Row 2 */}
              <div className="mt-4 space-y-1.5 border-t border-slate-100 pt-3">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-md bg-emerald-600 text-[10px] font-bold text-white shadow-xs">
                      3
                    </span>
                    <span className="font-semibold text-slate-800">
                      Cold-chain Insulin Pack
                    </span>
                  </div>
                  <div className="flex -space-x-1.5">
                    <div className="h-5 w-5 rounded-full bg-sky-600 text-[9px] font-bold text-white flex items-center justify-center ring-2 ring-white">
                      RN
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500 font-main">
                  <span>Sep 18</span>
                  <span className="font-bold text-emerald-600">100%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full w-full rounded-full bg-emerald-500" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3D Blister Pack Strip */}
        <div
          ref={blisterPackRef}
          style={{
            transform: `translate3d(calc(var(--mx, 0) * -24px), calc(var(--my, 0) * 14px), 0) rotate(-8deg)`,
            transition: "transform 0.25s cubic-bezier(0.2, 0, 0.2, 1)",
          }}
          className="pointer-events-auto absolute bottom-6 left-[18%] sm:left-[20%] md:left-[22%] opacity-0 will-change-transform hidden 2xl:block"
        >
          <div className="animate-pond-float-5">
            <div className="water-item-shadow flex items-center gap-2 rounded-2xl bg-gradient-to-b from-slate-100 to-slate-200/90 p-3 border border-white/80 backdrop-blur-xs transition-transform duration-300 hover:scale-110 hover:-rotate-4 cursor-pointer">
              <div className="flex flex-col gap-2">
                <div className="h-7 w-4 rounded-full bg-gradient-to-b from-emerald-400 to-emerald-600 shadow-inner ring-1 ring-white/60" />
                <div className="h-7 w-4 rounded-full bg-gradient-to-b from-teal-400 to-teal-600 shadow-inner ring-1 ring-white/60" />
              </div>
              <div className="flex flex-col gap-2">
                <div className="h-7 w-4 rounded-full bg-gradient-to-b from-emerald-500 to-emerald-700 shadow-inner ring-1 ring-white/60" />
                <div className="h-7 w-4 rounded-full bg-gradient-to-b from-teal-500 to-teal-700 shadow-inner ring-1 ring-white/60" />
              </div>
              <div className="ml-1 text-[9px] font-main font-bold text-slate-600 leading-tight">
                <span>Azithro 500</span>
                <br />
                <span className="text-emerald-700 font-extrabold">SEALED</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── BOTTOM-RIGHT: 100+ Integrations Card + Digital Thermometer (Moved upwards slightly) ── */}
        <div
          ref={integrationsCardRef}
          style={{
            transform: `translate3d(calc(var(--mx, 0) * 18px), calc(var(--my, 0) * 18px), 0)`,
            transition: "transform 0.25s cubic-bezier(0.2, 0, 0.2, 1)",
          }}
          className="pointer-events-auto absolute bottom-10 left-1 sm:bottom-12 sm:left-auto sm:right-4 md:bottom-16 md:right-6 lg:right-8 xl:left-auto xl:right-12 scale-[0.54] sm:scale-100 origin-bottom-left sm:origin-bottom-right -rotate-4 sm:rotate-4 opacity-0 will-change-transform group cursor-pointer block active:scale-95 transition-transform z-20"
        >
          <div className="animate-pond-float-2">
            <div className="water-item-shadow w-56 sm:w-64 md:w-72 rounded-2xl bg-white p-4.5 sm:p-5 border border-white/90 transition-all duration-300 group-hover:-translate-y-2 group-hover:-rotate-[2deg] sm:group-hover:rotate-[2deg]">
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm font-bold text-slate-900">
                  100+ Integrations
                </span>
                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                  ABDM & GST
                </span>
              </div>

              {/* 3D App Icon Badges in a row */}
              <div className="mt-4 flex items-center justify-between gap-2.5">
                {/* Official WhatsApp Rx Icon */}
                <div className="flex flex-1 flex-col items-center justify-center rounded-xl bg-white p-2 border border-slate-100 shadow-[0_6px_14px_-2px_rgba(16,185,129,0.2),0_2px_4px_rgba(0,0,0,0.04)] transition-transform duration-200 hover:scale-105">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#25D366] text-white shadow-xs">
                    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-white" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                  </div>
                  <span className="mt-1 text-[9px] font-bold text-slate-700">WhatsApp</span>
                </div>

                {/* Barcode Scanner */}
                <div className="flex flex-1 flex-col items-center justify-center rounded-xl bg-white p-2 border border-slate-100 shadow-[0_6px_14px_-2px_rgba(14,165,233,0.2),0_2px_4px_rgba(0,0,0,0.04)] transition-transform duration-200 hover:scale-105">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-500 text-white shadow-xs">
                    <QrCode className="h-3.5 w-3.5" />
                  </div>
                  <span className="mt-1 text-[9px] font-bold text-slate-700">Barcode</span>
                </div>

                {/* ABDM Compliance */}
                <div className="flex flex-1 flex-col items-center justify-center rounded-xl bg-white p-2 border border-slate-100 shadow-[0_6px_14px_-2px_rgba(16,185,129,0.2),0_2px_4px_rgba(0,0,0,0.04)] transition-transform duration-200 hover:scale-105">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-600 text-white shadow-xs">
                    <ShieldCheck className="h-3.5 w-3.5" />
                  </div>
                  <span className="mt-1 text-[9px] font-bold text-slate-700">ABDM</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Digital Clinical Thermometer Prop */}
        <div
          ref={thermometerRef}
          style={{
            transform: `translate3d(calc(var(--mx, 0) * 24px), calc(var(--my, 0) * 14px), 0) rotate(12deg)`,
            transition: "transform 0.25s cubic-bezier(0.2, 0, 0.2, 1)",
          }}
          className="pointer-events-auto absolute bottom-6 right-[18%] sm:right-[20%] md:right-[22%] opacity-0 will-change-transform hidden 2xl:block"
        >
          <div className="animate-pond-float-3">
            <div className="water-item-shadow flex items-center gap-2 rounded-2xl bg-white/95 px-3.5 py-2.5 border border-white/90 backdrop-blur-xs transition-transform duration-300 hover:scale-110 hover:rotate-6 cursor-pointer">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                <Thermometer className="h-4 w-4" />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-main text-xs font-extrabold text-slate-900">98.6°F</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <span className="text-[9px] font-medium text-slate-400">Vitals Normal</span>
              </div>
            </div>
          </div>
        </div>

        {/* Amber Medicine Bottle with White Cap */}
        <div
          ref={medicineBottleRef}
          style={{
            transform: `translate3d(calc(var(--mx, 0) * 12px), calc(var(--my, 0) * 10px), 0)`,
            transition: "transform 0.25s cubic-bezier(0.2, 0, 0.2, 1)",
          }}
          className="pointer-events-auto absolute top-10 right-[16%] md:right-[18%] lg:right-[20%] opacity-0 will-change-transform hidden 2xl:block"
        >
          <div className="animate-pond-float-5">
            <div className="water-item-shadow flex items-center gap-2 rounded-2xl bg-gradient-to-r from-amber-50 to-amber-100/90 px-3 py-2 border border-white/80 transition-transform duration-300 hover:scale-105 cursor-pointer">
              <div className="flex h-8 w-6 flex-col items-center justify-center rounded bg-amber-700/90 text-white shadow-xs">
                <div className="h-1.5 w-4 rounded-xs bg-white mb-0.5" />
                <span className="text-[8px] font-main font-bold">Rx</span>
              </div>
              <div className="text-[10px] leading-tight">
                <span className="font-bold text-amber-950">Batch #902</span>
                <br />
                <span className="text-[9px] text-amber-800/80">Active Inventory</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── LOWER-RIGHT / DESK HORIZON: Physical Fallen Pill Bottle Spilled From Side (Physics Realism) ── */}
        <div
          ref={fallenPillBottleRef}
          style={{
            transform: `translate3d(calc(var(--mx, 0) * 16px), calc(var(--my, 0) * 10px), 0)`,
            transition: "transform 0.25s cubic-bezier(0.2, 0, 0.2, 1)",
          }}
          className="pointer-events-auto absolute bottom-9 -right-6 sm:bottom-auto sm:top-[38%] md:top-[40%] sm:-right-16 md:-right-12 lg:-right-8 xl:-right-4 2xl:right-0 scale-[0.58] sm:scale-100 origin-bottom-right opacity-0 will-change-transform group cursor-pointer z-20 select-none active:scale-95 transition-transform"
        >
          <div className="animate-pond-float-4">
            {/* Real Physical Desk Scene (Spilled from right side of desk) */}
            <div className="relative flex items-center justify-end h-[175px] -rotate-[12deg] sm:rotate-0 origin-bottom-right">
              {/* Ground Ambient Contact Shadow (Physics surface realism) */}
              <div className="pointer-events-none absolute -bottom-3 right-0 w-64 sm:w-80 h-9 bg-black/60 blur-xl rounded-full" />

              {/* ── SCATTERED SPILLED PILLS (Physically Grounded, Real Pharmaceutical Materials, No Orange Pills) ── */}
              <div className="relative h-[180px] w-[130px] sm:w-[155px] pointer-events-none">
                {/* ── UPPER SIDE OF BOTTLE MOUTH & SHOULDER ── */}
                {/* Pill 1: Round scored white tablet with debossed score line */}
                <div
                  className="pointer-events-auto absolute top-1 right-4 sm:right-7 flex h-4.5 w-4.5 rotate-[24deg] items-center justify-center rounded-full bg-gradient-to-br from-white via-slate-100 to-slate-300 shadow-[0_8px_16px_rgba(0,0,0,0.65),inset_0_1.5px_2px_rgba(255,255,255,0.9),inset_0_-1.5px_2px_rgba(0,0,0,0.3)] ring-1 ring-slate-300/80 transition-transform duration-300 hover:scale-125"
                  title="Amoxicillin 500mg Tablet"
                >
                  <div className="h-0.5 w-2.5 rounded-full bg-slate-400/90 shadow-[inset_0_1px_1px_rgba(0,0,0,0.4)]" />
                </div>

                {/* Pill 2: Two-Tone Emerald & White Gelatin Capsule with seam & specular gloss */}
                <div
                  className="pointer-events-auto absolute top-5 right-9 sm:right-14 flex h-3.5 w-8 -rotate-[32deg] items-center overflow-hidden rounded-full shadow-[0_9px_18px_rgba(0,0,0,0.7),0_2px_4px_rgba(16,185,129,0.4)] ring-1 ring-white/50 transition-transform duration-300 hover:scale-125 hover:-rotate-[40deg]"
                  title="Antibiotic Capsule"
                >
                  {/* Left Half (Emerald Gelatin Cap) */}
                  <div className="relative h-full w-1/2 bg-gradient-to-b from-emerald-400 via-emerald-600 to-emerald-900 border-r border-emerald-950/40">
                    <span className="absolute inset-x-1 top-0.5 h-[1px] bg-white/70 rounded-full" />
                  </div>
                  {/* Interlocking Seam Band */}
                  <div className="h-full w-[1.5px] bg-emerald-950/50 shrink-0 z-10" />
                  {/* Right Half (White Gelatin Body) */}
                  <div className="relative h-full w-1/2 bg-gradient-to-b from-white via-slate-100 to-slate-300">
                    <span className="absolute inset-x-1 top-0.5 h-[1px] bg-white/90 rounded-full" />
                    <span className="absolute inset-0 flex items-center justify-center text-[5.5px] font-mono font-bold text-slate-500 tracking-tighter">
                      SK50
                    </span>
                  </div>
                </div>

                {/* Pill 3: Scored Biconvex White Calcite Tablet */}
                <div
                  className="pointer-events-auto absolute top-9 right-2 sm:right-4 flex h-4 w-4 -rotate-[15deg] items-center justify-center rounded-full bg-gradient-to-br from-white via-slate-100 to-slate-200 shadow-[0_8px_16px_rgba(0,0,0,0.6),inset_0_1px_2px_rgba(255,255,255,0.9)] ring-1 ring-slate-300 transition-transform duration-300 hover:scale-125"
                >
                  <div className="h-0.5 w-2 rounded-full bg-slate-400 shadow-inner" />
                </div>

                {/* ── CENTRAL MOUTH OPENING: TUMBLING OFF THE LIP ── */}
                {/* Pill 4: Deep Teal & Porcelain White Gelatin Capsule */}
                <div
                  className="pointer-events-auto absolute top-13 right-1 sm:right-2 z-20 flex h-3.5 w-8 -rotate-[22deg] items-center overflow-hidden rounded-full shadow-[0_10px_20px_rgba(0,0,0,0.75),0_2px_5px_rgba(20,184,166,0.4)] ring-1 ring-white/50 transition-transform duration-300 hover:scale-125 hover:-translate-x-1"
                >
                  {/* Teal Cap */}
                  <div className="relative h-full w-1/2 bg-gradient-to-b from-teal-400 via-teal-600 to-teal-900 border-r border-teal-950/40">
                    <span className="absolute inset-x-1 top-0.5 h-[1px] bg-white/70 rounded-full" />
                  </div>
                  <div className="h-full w-[1.5px] bg-teal-950/50 shrink-0 z-10" />
                  {/* White Body */}
                  <div className="relative h-full w-1/2 bg-gradient-to-b from-white via-slate-100 to-slate-300">
                    <span className="absolute inset-x-1 top-0.5 h-[1px] bg-white/90 rounded-full" />
                  </div>
                </div>

                {/* Pill 5: Mint Celadon Oval Caplet (Scored Medical Tablet) */}
                <div
                  className="pointer-events-auto absolute top-16 right-7 sm:right-11 flex h-3.5 w-6 rotate-[28deg] items-center justify-center rounded-full bg-gradient-to-b from-emerald-100 via-emerald-200 to-emerald-300 shadow-[0_8px_16px_rgba(0,0,0,0.6),inset_0_1px_1.5px_rgba(255,255,255,0.8)] ring-1 ring-emerald-300/70 transition-transform duration-300 hover:scale-125"
                >
                  <div className="h-2 w-0.5 bg-emerald-500/80 rounded-full shadow-inner" />
                </div>

                {/* Pill 6: Two-Tone Emerald & White Capsule rolling on desk surface */}
                <div
                  className="pointer-events-auto absolute top-18 right-14 sm:right-20 flex h-3.5 w-8 rotate-[38deg] items-center overflow-hidden rounded-full shadow-[0_9px_18px_rgba(0,0,0,0.7),0_2px_4px_rgba(16,185,129,0.35)] ring-1 ring-white/50 transition-transform duration-300 hover:scale-125 hover:rotate-[46deg]"
                >
                  <div className="relative h-full w-1/2 bg-gradient-to-b from-emerald-400 via-emerald-600 to-emerald-900">
                    <span className="absolute inset-x-1 top-0.5 h-[1px] bg-white/70 rounded-full" />
                  </div>
                  <div className="h-full w-[1.5px] bg-emerald-950/50 shrink-0 z-10" />
                  <div className="relative h-full w-1/2 bg-gradient-to-b from-white via-slate-100 to-slate-300">
                    <span className="absolute inset-x-1 top-0.5 h-[1px] bg-white/90 rounded-full" />
                  </div>
                </div>

                {/* ── LOWER SIDE OF BOTTLE MOUTH & DETACHED CAP ── */}
                {/* Pill 7: Scored White Calcium Tablet */}
                <div
                  className="pointer-events-auto absolute top-22 right-9 sm:right-13 flex h-4 w-4 -rotate-[44deg] items-center justify-center rounded-full bg-gradient-to-br from-white via-slate-100 to-slate-200 shadow-[0_8px_15px_rgba(0,0,0,0.6)] ring-1 ring-slate-300 transition-transform duration-300 hover:scale-125"
                >
                  <div className="h-0.5 w-2 rounded-full bg-slate-400 shadow-inner" />
                </div>

                {/* Realistic White Child-Resistant Cap with Knurled Teeth & Embossed Top */}
                <div className="pointer-events-auto absolute top-23 right-3 sm:right-6 z-10 flex h-14 sm:h-16 w-8 sm:w-9 rotate-[34deg] flex-col justify-between rounded-md bg-gradient-to-r from-slate-200 via-white to-slate-100 shadow-[0_14px_28px_rgba(0,0,0,0.8),inset_0_1px_2px_rgba(255,255,255,0.95)] ring-1 ring-slate-300 transition-transform duration-300 group-hover:rotate-[40deg]">
                  {/* Embossed Directional Safety Rim */}
                  <div className="flex h-3 w-full items-center justify-center border-b border-slate-200/90 px-0.5">
                    <span className="text-[5px] font-mono font-extrabold text-slate-400 tracking-tighter uppercase leading-none">
                      PUSH ↺ TURN
                    </span>
                  </div>

                  {/* 16 High-Precision Ribbed Gripping Teeth */}
                  <div className="flex flex-1 justify-between items-center px-1 py-0.5">
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="h-full w-[1.5px] bg-gradient-to-b from-slate-100 via-slate-300 to-slate-400 rounded-full shadow-[0.5px_0_1px_rgba(255,255,255,0.8)]"
                      />
                    ))}
                  </div>

                  {/* Safety Flange Collar */}
                  <div className="h-1.5 w-full bg-gradient-to-r from-slate-300 via-slate-200 to-slate-300 rounded-b-md border-t border-slate-300" />
                </div>

                {/* Pill 8: Two-Tone Teal & White Capsule resting beside cap */}
                <div
                  className="pointer-events-auto absolute top-26 right-15 sm:right-21 flex h-3.5 w-8 -rotate-[58deg] items-center overflow-hidden rounded-full shadow-[0_9px_18px_rgba(0,0,0,0.65),0_2px_4px_rgba(20,184,166,0.35)] ring-1 ring-white/50 transition-transform duration-300 hover:scale-125 hover:rotate-[65deg]"
                >
                  <div className="relative h-full w-1/2 bg-gradient-to-b from-teal-400 via-teal-600 to-teal-900">
                    <span className="absolute inset-x-1 top-0.5 h-[1px] bg-white/70 rounded-full" />
                  </div>
                  <div className="h-full w-[1.5px] bg-teal-950/50 shrink-0 z-10" />
                  <div className="relative h-full w-1/2 bg-gradient-to-b from-white via-slate-100 to-slate-300">
                    <span className="absolute inset-x-1 top-0.5 h-[1px] bg-white/90 rounded-full" />
                  </div>
                </div>

                {/* Pill 9: Two-Tone Emerald & White Capsule (Replaces old orange pill) */}
                <div
                  className="pointer-events-auto absolute top-30 right-3 sm:right-5 flex h-3.5 w-7.5 rotate-[76deg] items-center overflow-hidden rounded-full shadow-[0_9px_17px_rgba(0,0,0,0.65),0_2px_4px_rgba(16,185,129,0.35)] ring-1 ring-white/50 transition-transform duration-300 hover:scale-125"
                >
                  <div className="relative h-full w-1/2 bg-gradient-to-b from-emerald-400 via-emerald-600 to-emerald-900">
                    <span className="absolute inset-x-1 top-0.5 h-[1px] bg-white/70 rounded-full" />
                  </div>
                  <div className="h-full w-[1.5px] bg-emerald-950/50 shrink-0 z-10" />
                  <div className="relative h-full w-1/2 bg-gradient-to-b from-white via-slate-100 to-slate-300">
                    <span className="absolute inset-x-1 top-0.5 h-[1px] bg-white/90 rounded-full" />
                  </div>
                </div>

                {/* Pill 10: Mini Scored White Tablet on bottom boundary */}
                <div
                  className="pointer-events-auto absolute top-34 right-10 sm:right-14 flex h-4.5 w-4.5 rotate-[30deg] items-center justify-center rounded-full bg-gradient-to-br from-white via-slate-100 to-slate-200 shadow-[0_8px_16px_rgba(0,0,0,0.6),inset_0_1px_2px_rgba(255,255,255,0.9)] ring-1 ring-slate-300 transition-transform duration-300 hover:scale-125"
                >
                  <div className="h-0.5 w-2.5 rounded-full bg-slate-400 shadow-inner" />
                </div>
              </div>

              {/* ── THE LARGE FALLEN AMBER PHARMACY BOTTLE (Physics Realism, Translucent Glass, Screw Threads & Realistic Label) ── */}
              <div className="relative flex items-center -rotate-[24deg] sm:-rotate-[18deg] transition-transform duration-300 group-hover:-rotate-[14deg] drop-shadow-[0_26px_40px_rgba(0,0,0,0.9)] shrink-0">
                {/* Screw-Threaded Glass Neck & Rim Collar */}
                <div className="relative z-10 flex h-11 sm:h-13 w-5 sm:w-6 flex-col justify-between rounded-l-md bg-gradient-to-b from-[#78350f] via-[#b45309] to-[#2e1002] border-l-2 border-amber-400/90 shadow-[inset_0_2px_4px_rgba(255,255,255,0.45)] py-0.5">
                  {/* Upper Helical Screw Thread Ridge */}
                  <div className="h-1 w-full bg-gradient-to-r from-amber-600 via-amber-300/80 to-amber-950 rounded-xs shadow-[0_1px_1px_rgba(0,0,0,0.6)]" />
                  {/* Dark hollow throat cavity */}
                  <div className="mx-auto h-5 sm:h-7 w-2 sm:w-2.5 rounded-full bg-[#140601] shadow-[inset_0_2px_6px_rgba(0,0,0,0.98)]" />
                  {/* Lower Screw Thread Ridge */}
                  <div className="h-1 w-full bg-gradient-to-r from-amber-600 via-amber-300/80 to-amber-950 rounded-xs shadow-[0_1px_1px_rgba(0,0,0,0.6)]" />
                </div>

                {/* Substantial, Large Amber Pharmacy Glass Cylinder */}
                <div className="relative flex h-20 sm:h-24 md:h-26 w-36 sm:w-44 md:w-50 items-center justify-center overflow-hidden rounded-r-3xl bg-gradient-to-b from-[#6b2c08] via-[#a14a09] to-[#210901] border-2 border-amber-500/70 shadow-[0_24px_50px_rgba(0,0,0,0.9),inset_0_4px_10px_rgba(255,255,255,0.5),inset_0_-5px_12px_rgba(0,0,0,0.75)]">
                  {/* Interior Capsule Silhouettes (Visible Through Translucent Amber Glass) */}
                  <div className="pointer-events-none absolute left-3 top-3 flex gap-2 opacity-40">
                    <div className="h-3 w-6 rounded-full bg-emerald-400/60 rotate-12 blur-[0.5px]" />
                    <div className="h-3 w-5 rounded-full bg-white/70 -rotate-25 blur-[0.5px]" />
                  </div>
                  <div className="pointer-events-none absolute left-6 bottom-3 flex gap-2 opacity-35">
                    <div className="h-3 w-6 rounded-full bg-white/80 rotate-45 blur-[0.5px]" />
                    <div className="h-3 w-5 rounded-full bg-emerald-300/60 -rotate-15 blur-[0.5px]" />
                  </div>

                  {/* Cylindrical Glass Specular Highlight Sweep */}
                  <div className="pointer-events-none absolute inset-x-0 top-1 sm:top-1.5 h-3.5 sm:h-4 bg-gradient-to-b from-white/50 via-white/20 to-transparent rounded-full z-20" />
                  {/* Bottom Rim Ambient Light Bounce */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-1 h-2 bg-gradient-to-t from-amber-400/30 to-transparent rounded-full z-20" />

                  {/* Professional Clinical Pharmacy Rx Label (Wrapped with realistic cylindrical lighting) */}
                  <div className="relative z-10 flex h-15 sm:h-18 w-26 sm:w-32 flex-col justify-between rounded-lg bg-gradient-to-r from-slate-100 via-white to-slate-100 p-2 sm:p-2.5 shadow-[0_4px_10px_rgba(0,0,0,0.5)] border border-amber-950/30">
                    {/* Header Strip with Rx and USP Banner */}
                    <div className="flex items-center justify-between border-b border-slate-200 pb-1">
                      <div className="flex items-center gap-1">
                        <span className="flex h-3.5 w-3.5 items-center justify-center rounded-xs bg-emerald-600 text-[8px] font-bold text-white leading-none shadow-2xs">
                          Rx
                        </span>
                        <span className="text-[9px] sm:text-[10px] font-extrabold text-slate-900 font-main tracking-tight">
                          SKORA RX
                        </span>
                      </div>
                      <span className="text-[6.5px] font-bold text-rose-700 bg-rose-50 px-1 py-0.2 rounded border border-rose-200/80">
                        RX ONLY
                      </span>
                    </div>

                    {/* Medication Details */}
                    <div className="my-0.5 leading-tight">
                      <p className="text-[8px] sm:text-[9.5px] font-extrabold text-slate-900 tracking-tight font-main">
                        Amoxicillin 500mg
                      </p>
                      <p className="text-[7px] sm:text-[7.5px] font-mono text-emerald-700 font-semibold">
                        Qty: 30 Capsules · Refill: 0
                      </p>
                    </div>

                    {/* Realistic Barcode & Lot / NDC Identification */}
                    <div className="flex items-center justify-between pt-0.5 border-t border-slate-200/90">
                      <div className="flex h-2 w-16 items-center gap-[1px] opacity-85">
                        <div className="h-full w-[2px] bg-slate-900" />
                        <div className="h-full w-[1px] bg-slate-900" />
                        <div className="h-full w-[2.5px] bg-slate-900" />
                        <div className="h-full w-[1px] bg-slate-900" />
                        <div className="h-full w-[3px] bg-slate-900" />
                        <div className="h-full w-[1px] bg-slate-900" />
                        <div className="h-full w-[2px] bg-slate-900" />
                        <div className="h-full w-[1px] bg-slate-900" />
                        <div className="h-full w-[2.5px] bg-slate-900" />
                      </div>
                      <span className="text-[5.5px] font-mono font-bold text-slate-500">
                        NDC 54868-09
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── CENTER HERO CONTENT: EXACT UNBOXED CHRONOTASK STRUCTURE ── */}
      <div className="relative z-20 mx-auto max-w-3xl text-center px-4 pt-34 pb-20 sm:py-0">
        {/* MAIN HEADLINE (Two-tone composition matching reference image) */}
        <h1
          ref={headlineLine1Ref}
          className="font-main text-[clamp(2.1rem,7.5vw,4.25rem)] font-extrabold tracking-[-0.035em] text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)] leading-[1.08]"
        >
          Dispense, track, and care
        </h1>
        <span
          ref={headlineLine2Ref}
          className="block font-main text-[clamp(2.1rem,7.5vw,4.25rem)] font-bold tracking-[-0.035em] text-emerald-300 drop-shadow-[0_4px_16px_rgba(0,0,0,0.4)] leading-[1.08] mt-1"
        >
          all in one place
        </span>

        {/* SUBTITLE */}
        <p
          ref={descRef}
          className="font-secondary mx-auto mt-4 sm:mt-6 max-w-md sm:max-w-xl text-balance text-sm sm:text-base md:text-lg font-medium leading-relaxed text-emerald-50/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]"
        >
          Smart pharmacy software engineered for instant prescription dispensing, live batch tracking, and effortless patient care.
        </p>

        {/* CTA BUTTON */}
        <div ref={ctaRef} className="mt-6 sm:mt-8 flex flex-col items-center justify-center gap-2.5 sm:gap-3">
          <HudButton href="/contact#demo">
            Get free demo
          </HudButton>

          {/* Trust tag */}
          <p className="font-secondary text-[11px] sm:text-xs font-medium text-emerald-100/75 drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)]">
            Free 14-day trial <span className="text-emerald-400/50">•</span> No credit card required <span className="text-emerald-400/50">•</span> Instant setup
          </p>
        </div>
      </div>
    </section>
  );
}
