"use client";

import {
  type CSSProperties,
  useLayoutEffect,
  useRef,
  useSyncExternalStore,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BlurryToClear } from "@/components/ui/blurry-to-clear";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function useGSAP(
  callback: () => void | (() => void),
  options?: {
    dependencies?: unknown[];
    scope?: { current: Element | null } | Element | null;
  }
) {
  const deps = options?.dependencies ?? [];
  const scope = options?.scope;
  const ctxRef = useRef<gsap.Context | null>(null);
  const cleanupRef = useRef<(() => void) | undefined>(undefined);

  useLayoutEffect(() => {
    const el =
      scope && typeof scope === "object" && "current" in scope
        ? scope.current
        : (scope as Element | null);
    ctxRef.current = gsap.context(() => {}, el ?? undefined);
    return () => {
      cleanupRef.current?.();
      cleanupRef.current = undefined;
      ctxRef.current?.revert();
      ctxRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    if (!ctxRef.current) return;
    cleanupRef.current?.();
    const ret = ctxRef.current.add(callback);
    cleanupRef.current = typeof ret === "function" ? ret : undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export type JourneyItem = {
  id: string;
  year: string;
  month: string;
  content: string;
};

export type TimelineProps = {
  title?: string;
  periodLabel?: string;
  textColor?: string;
  mutedTextColor?: string;
  activeColor?: string;
  backgroundColor?: string;
  imageUrl?: string;
  imageAlt?: string;
  topItems?: JourneyItem[];
  bottomItems?: JourneyItem[];
  duration?: number;
  scrollDuration?: number;
};

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mediaQueryList = window.matchMedia(REDUCED_MOTION_QUERY);
  mediaQueryList.addEventListener("change", callback);
  return () => mediaQueryList.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia?.(REDUCED_MOTION_QUERY)?.matches ?? false;
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    () => false
  );
}

// 4 original deployment milestones
const defaultTopJourneyData: JourneyItem[] = [
  {
    id: "step-1",
    year: "Step 01",
    month: "Create Your Account",
    content: "Sign up in 2 minutes. No credit card needed for the free trial.",
  },
  {
    id: "step-3",
    year: "Step 03",
    month: "Add Patient Data",
    content: "Easily add new patient details or import existing records in just a few clicks.",
  },
];

const defaultBottomJourneyData: JourneyItem[] = [
  {
    id: "step-2",
    year: "Step 02",
    month: "Set Up Your Clinic",
    content: "Add your doctors, departments, schedule, and branding easily.",
  },
  {
    id: "step-4",
    year: "Step 04",
    month: "Go Live & Grow",
    content: "Start seeing patients digitally and watch your efficiency soar.",
  },
];

export default function Timeline({
  title = "Deployment Guide",
  periodLabel = "From signup to fully operational in under a day — no IT team required.",
  textColor = "var(--color-white, #FAF7F2)",
  mutedTextColor = "#94a3b8",
  activeColor = "#10B981",
  backgroundColor = "#03120E",
  imageUrl = "/images/pharmacy-deployment.jpg",
  imageAlt = "Modern pharmacy dispensary inventory and prescription management",
  topItems = defaultTopJourneyData,
  bottomItems = defaultBottomJourneyData,
}: TimelineProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const wholeSliderRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  const sectionStyle: CSSProperties = {
    color: textColor,
    backgroundColor,
  };
  const activeStyle: CSSProperties = {
    backgroundColor: activeColor,
  };
  const mutedTextStyle: CSSProperties = {
    color: mutedTextColor,
  };

  const topJourneyData = topItems;
  const bottomJourneyData = bottomItems;

  useGSAP(
    () => {
      const section = sectionRef.current;
      const slider = wholeSliderRef.current;
      if (!section || !slider) return;

      const stackSlide = section.closest<HTMLElement>(".stack-slide");
      const isInsideStack = Boolean(stackSlide);
      const targetTrigger = stackSlide || section;

      const isMobile = window.innerWidth < 768;
      if (isMobile) {
        if (reducedMotion) {
          gsap.set(".v-timeline-fill", { height: "100%" });
          [1, 2, 3, 4].forEach((num) => {
            gsap.set(`.mv-node-${num}`, { scale: 1, opacity: 1, backgroundColor: "#34D399" });
            gsap.set(`.mv-card-${num}`, { opacity: 1, x: 0, y: 0 });
          });
          return;
        }

        // Set initial state for alternating layout
        gsap.set(".v-timeline-fill", { height: "0%" });
        gsap.set(".mv-node-1", { scale: 1.15, backgroundColor: "#34D399" });
        gsap.set(".mv-card-1", { opacity: 0.85, x: 0 });

        // Step 2 & 4 start shifted slightly to the right
        gsap.set(".mv-node-2", { scale: 0.85, opacity: 0.4 });
        gsap.set(".mv-card-2", { opacity: 0.25, x: 18 });

        // Step 3 starts shifted slightly to the left
        gsap.set(".mv-node-3", { scale: 0.85, opacity: 0.4 });
        gsap.set(".mv-card-3", { opacity: 0.25, x: -18 });

        gsap.set(".mv-node-4", { scale: 0.85, opacity: 0.4 });
        gsap.set(".mv-card-4", { opacity: 0.25, x: 18 });

        // Smooth vertical on-scroll scrub animation
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 65%",
            end: "bottom 75%",
            scrub: 0.6,
          },
        });

        // Scrub active beam fill line down the exact center
        tl.to(".v-timeline-fill", { height: "100%", ease: "none", duration: 1.0 }, 0);

        // Step 01 (Left)
        tl.to(".mv-node-1", { scale: 1.25, backgroundColor: "#34D399", duration: 0.1 }, 0.05)
          .to(".mv-card-1", { opacity: 1, borderColor: "rgba(52, 211, 153, 0.6)", backgroundColor: "rgba(6, 78, 59, 0.65)", duration: 0.1 }, 0.05);

        // Step 02 (Right)
        tl.to(".mv-node-2", { scale: 1.25, opacity: 1, backgroundColor: "#34D399", duration: 0.15 }, 0.3)
          .to(".mv-card-2", { opacity: 1, x: 0, borderColor: "rgba(52, 211, 153, 0.6)", backgroundColor: "rgba(6, 78, 59, 0.65)", duration: 0.15 }, 0.3);

        // Step 03 (Left)
        tl.to(".mv-node-3", { scale: 1.25, opacity: 1, backgroundColor: "#34D399", duration: 0.15 }, 0.6)
          .to(".mv-card-3", { opacity: 1, x: 0, borderColor: "rgba(52, 211, 153, 0.6)", backgroundColor: "rgba(6, 78, 59, 0.65)", duration: 0.15 }, 0.6);

        // Step 04 (Right)
        tl.to(".mv-node-4", { scale: 1.25, opacity: 1, backgroundColor: "#34D399", duration: 0.15 }, 0.85)
          .to(".mv-card-4", { opacity: 1, x: 0, borderColor: "rgba(52, 211, 153, 0.6)", backgroundColor: "rgba(6, 78, 59, 0.65)", duration: 0.15 }, 0.85);

        return;
      }

      const slidePercent = -54;
      const scrollDistance = window.innerWidth * 3.0;

      if (reducedMotion) {
        gsap.set(slider, { xPercent: 0 });
        gsap.set(".journey-line-fill", { width: "100%" });
        [1, 2, 3, 4].forEach((num) => {
          gsap.set(`.jd-step-${num}`, { scale: 1 });
          gsap.set(`.jl-step-${num}`, { scaleY: 1 });
          gsap.set(`.card-step-${num}`, { opacity: 1, y: 0 });
        });
        return;
      }

      // Initial state: Step 01 is active & visible immediately
      gsap.set(".jd-step-1", { scale: 1 });
      gsap.set(".jl-step-1", { scaleY: 1, transformOrigin: "bottom center" });
      gsap.set(".card-step-1", { opacity: 1, y: 0 });
      gsap.set(".journey-line-fill", { width: "18%" });

      // Steps 2, 3, 4 start hidden
      [2, 3, 4].forEach((num) => {
        const isTop = num % 2 === 1;
        gsap.set(`.jd-step-${num}`, { scale: 0 });
        gsap.set(`.jl-step-${num}`, {
          scaleY: 0,
          transformOrigin: isTop ? "bottom center" : "top center",
        });
        gsap.set(`.card-step-${num}`, {
          opacity: 0,
          y: isTop ? 16 : -16,
        });
      });

      // Synchronized Scroll Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: targetTrigger,
          start: "top top",
          end: `+=${scrollDistance}`,
          scrub: 0.8,
          pin: !isInsideStack,
          pinSpacing: !isInsideStack,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // 1. Horizontal slider track translation:
      // Glides smoothly to place Step 04 at the center of the viewport by 0.78
      tl.to(
        slider,
        {
          xPercent: slidePercent,
          ease: "none",
          duration: 0.78,
        },
        0
      );

      // 2. Continuous horizontal progress line expansion across the milestones
      tl.to(
        ".journey-line-fill",
        {
          width: "100%",
          ease: "none",
          duration: 0.75,
        },
        0
      );

      // 3. Step 02 reveal (bottom, ~20% progress)
      tl.to(".jd-step-2", { scale: 1, duration: 0.10, ease: "back.out(2)" }, 0.18)
        .to(".jl-step-2", { scaleY: 1, duration: 0.12, ease: "power2.out" }, 0.20)
        .to(".card-step-2", { opacity: 1, y: 0, duration: 0.14, ease: "power2.out" }, 0.22);

      // 4. Step 03 reveal (top, ~40% progress)
      tl.to(".jd-step-3", { scale: 1, duration: 0.10, ease: "back.out(2)" }, 0.38)
        .to(".jl-step-3", { scaleY: 1, duration: 0.12, ease: "power2.out" }, 0.40)
        .to(".card-step-3", { opacity: 1, y: 0, duration: 0.14, ease: "power2.out" }, 0.42);

      // 5. Step 04 reveal (bottom, ~60% progress)
      tl.to(".jd-step-4", { scale: 1, duration: 0.10, ease: "back.out(2)" }, 0.58)
        .to(".jl-step-4", { scaleY: 1, duration: 0.12, ease: "power2.out" }, 0.60)
        .to(".card-step-4", { opacity: 1, y: 0, duration: 0.14, ease: "power2.out" }, 0.62);

      // 6. Generous frozen hold phase (0.78 -> 1.0)
      // Step 04 remains proudly centered and steady for the user to read comfortably
      tl.to({}, { duration: 0.22 });

      const handleResize = () => {
        ScrollTrigger.refresh();
      };
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    },
    { dependencies: [reducedMotion], scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="deployment-guide"
      data-timeline-track="true"
      className="relative w-full overflow-hidden bg-[#03120E] text-[#FAF7F2] select-none rounded-none md:rounded-[inherit] md:h-[calc(100vh-1rem)] md:sm:h-[calc(100vh-1.75rem)] md:flex md:items-center md:justify-start"
      style={sectionStyle}
    >
      {/* ── MOBILE ELONGATED ALTERNATING VERTICAL TIMELINE (< 768px) ── */}
      <div className="flex md:hidden flex-col w-full px-3 sm:px-6 py-20 sm:py-28 max-w-xl mx-auto">
        {/* Header Block (Centered with generous top breathing room) */}
        <div className="mb-14 sm:mb-20 text-center pt-2">
          <span className="font-main inline-block text-[11px] uppercase tracking-[0.24em] text-emerald-400 font-bold mb-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            Deployment Guide
          </span>
          <h2 className="font-main text-2xl sm:text-3xl md:text-4xl font-bold leading-tight text-[#FAF7F2] tracking-tight mt-1">
            {title}
          </h2>
          <p className="font-secondary mt-2.5 text-xs sm:text-sm leading-relaxed text-[#FAF7F2]/75 max-w-sm mx-auto">
            {periodLabel}
          </p>
        </div>

        {/* Central Vertical Timeline Track with Alternating Steps */}
        <div className="relative w-full space-y-20 sm:space-y-28 py-6">
          {/* Base Background Track Line (Dead Center) */}
          <div className="absolute left-1/2 -translate-x-1/2 top-4 bottom-10 w-[2px] bg-emerald-500/20 rounded-full" />

          {/* Active Scrubbed Beam Fill Line (Dead Center) */}
          <div
            className="v-timeline-fill absolute left-1/2 -translate-x-1/2 top-4 w-[2px] bg-gradient-to-b from-emerald-400 via-teal-300 to-emerald-400 shadow-[0_0_14px_#10B981] rounded-full will-change-[height]"
            style={{ height: "0%" }}
          />

          {/* ── STEP 01 (LEFT SIDE) ── */}
          {topJourneyData[0] && (
            <div className="relative flex items-center w-full min-h-[110px]">
              {/* Center Milestone Node (Smaller, clean jewel dot without numbers) */}
              <div className="mv-node-1 absolute left-1/2 -translate-x-1/2 top-4 size-3.5 sm:size-4 rounded-full bg-emerald-400 shadow-[0_0_10px_#10B981] ring-3 ring-[#03120E] z-20 will-change-transform" />
              {/* Card on Left */}
              <div className="w-[calc(50%-1.1rem)] sm:w-[calc(50%-1.5rem)] mr-auto">
                <div className="mv-card-1 rounded-xl sm:rounded-2xl border border-emerald-500/35 bg-emerald-950/65 p-3.5 sm:p-5 backdrop-blur-md shadow-lg transition-colors duration-300">
                  <div className="flex items-center justify-between gap-1 mb-1.5">
                    <span className="text-[10px] sm:text-xs font-bold text-emerald-400 uppercase tracking-widest font-main">
                      Step 01
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-bold text-emerald-300/90 bg-emerald-900/60 px-2 py-0.5 rounded-full border border-emerald-500/25 whitespace-nowrap">
                      2-Min Setup
                    </span>
                  </div>
                  <h4 className="font-main font-extrabold text-sm sm:text-base text-[#FAF7F2] leading-tight tracking-tight mt-1">
                    {topJourneyData[0].month}
                  </h4>
                  <p className="font-secondary text-[11px] sm:text-xs leading-relaxed text-[#FAF7F2]/75 mt-1.5">
                    {topJourneyData[0].content}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 02 (RIGHT SIDE) ── */}
          {bottomJourneyData[0] && (
            <div className="relative flex items-center w-full min-h-[110px]">
              {/* Center Milestone Node (Smaller, clean jewel dot without numbers) */}
              <div className="mv-node-2 absolute left-1/2 -translate-x-1/2 top-4 size-3.5 sm:size-4 rounded-full bg-emerald-950 border border-emerald-500/40 ring-2 ring-[#03120E] z-20 will-change-transform" />
              {/* Card on Right */}
              <div className="w-[calc(50%-1.1rem)] sm:w-[calc(50%-1.5rem)] ml-auto">
                <div className="mv-card-2 rounded-xl sm:rounded-2xl border border-emerald-500/15 bg-emerald-950/25 p-3.5 sm:p-5 backdrop-blur-md opacity-35 transition-colors duration-300">
                  <div className="flex items-center justify-between gap-1 mb-1.5">
                    <span className="text-[10px] sm:text-xs font-bold text-emerald-400 uppercase tracking-widest font-main">
                      Step 02
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-bold text-emerald-300/90 bg-emerald-900/60 px-2 py-0.5 rounded-full border border-emerald-500/25 whitespace-nowrap">
                      Clinic Roles
                    </span>
                  </div>
                  <h4 className="font-main font-extrabold text-sm sm:text-base text-[#FAF7F2] leading-tight tracking-tight mt-1">
                    {bottomJourneyData[0].month}
                  </h4>
                  <p className="font-secondary text-[11px] sm:text-xs leading-relaxed text-[#FAF7F2]/75 mt-1.5">
                    {bottomJourneyData[0].content}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 03 (LEFT SIDE) ── */}
          {topJourneyData[1] && (
            <div className="relative flex items-center w-full min-h-[110px]">
              {/* Center Milestone Node (Smaller, clean jewel dot without numbers) */}
              <div className="mv-node-3 absolute left-1/2 -translate-x-1/2 top-4 size-3.5 sm:size-4 rounded-full bg-emerald-950 border border-emerald-500/40 ring-2 ring-[#03120E] z-20 will-change-transform" />
              {/* Card on Left */}
              <div className="w-[calc(50%-1.1rem)] sm:w-[calc(50%-1.5rem)] mr-auto">
                <div className="mv-card-3 rounded-xl sm:rounded-2xl border border-emerald-500/15 bg-emerald-950/25 p-3.5 sm:p-5 backdrop-blur-md opacity-35 transition-colors duration-300">
                  <div className="flex items-center justify-between gap-1 mb-1.5">
                    <span className="text-[10px] sm:text-xs font-bold text-emerald-400 uppercase tracking-widest font-main">
                      Step 03
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-bold text-emerald-300/90 bg-emerald-900/60 px-2 py-0.5 rounded-full border border-emerald-500/25 whitespace-nowrap">
                      Data Import
                    </span>
                  </div>
                  <h4 className="font-main font-extrabold text-sm sm:text-base text-[#FAF7F2] leading-tight tracking-tight mt-1">
                    {topJourneyData[1].month}
                  </h4>
                  <p className="font-secondary text-[11px] sm:text-xs leading-relaxed text-[#FAF7F2]/75 mt-1.5">
                    {topJourneyData[1].content}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 04 (RIGHT SIDE) ── */}
          {bottomJourneyData[1] && (
            <div className="relative flex items-center w-full min-h-[110px]">
              {/* Center Milestone Node (Smaller, clean jewel dot without numbers) */}
              <div className="mv-node-4 absolute left-1/2 -translate-x-1/2 top-4 size-3.5 sm:size-4 rounded-full bg-emerald-950 border border-emerald-500/40 ring-2 ring-[#03120E] z-20 will-change-transform" />
              {/* Card on Right */}
              <div className="w-[calc(50%-1.1rem)] sm:w-[calc(50%-1.5rem)] ml-auto">
                <div className="mv-card-4 rounded-xl sm:rounded-2xl border border-emerald-500/15 bg-emerald-950/25 p-3.5 sm:p-5 backdrop-blur-md opacity-35 transition-colors duration-300">
                  <div className="flex items-center justify-between gap-1 mb-1.5">
                    <span className="text-[10px] sm:text-xs font-bold text-emerald-400 uppercase tracking-widest font-main">
                      Step 04
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-bold text-emerald-300/90 bg-emerald-900/60 px-2 py-0.5 rounded-full border border-emerald-500/25 whitespace-nowrap">
                      Go Live
                    </span>
                  </div>
                  <h4 className="font-main font-extrabold text-sm sm:text-base text-[#FAF7F2] leading-tight tracking-tight mt-1">
                    {bottomJourneyData[1].month}
                  </h4>
                  <p className="font-secondary text-[11px] sm:text-xs leading-relaxed text-[#FAF7F2]/75 mt-1.5">
                    {bottomJourneyData[1].content}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── DESKTOP HORIZONTAL SLIDER (>= 768px) ── */}
      <div
        ref={wholeSliderRef}
        className="hidden md:flex h-[84vh] items-center gap-[3vw] px-[4vw] will-change-transform"
        style={{ width: "max-content" }}
      >
        {/* Left Feature Hero Image (Larger & Prominent) */}
        <div className="h-[30vw] w-[25vw] flex-shrink-0 overflow-hidden rounded-[28px] border border-emerald-500/30 shadow-[0_24px_60px_rgba(0,0,0,0.65)] max-[768px]:h-[54vw] max-[768px]:w-[76vw] max-[768px]:rounded-[20px]">
          <img
            src={imageUrl}
            alt={imageAlt}
            draggable={false}
            className="h-full w-full object-cover object-top"
          />
        </div>

        {/* Section Title & Subtitle Block */}
        <div className="w-[18vw] max-[768px]:w-[60vw] flex-shrink-0 flex flex-col justify-center pr-2">
          <span className="font-main inline-block text-xs uppercase tracking-[0.2em] text-emerald-400 font-bold mb-2">
            Deployment Guide
          </span>
          <h2 className="font-main text-[2.5vw] font-bold leading-[1.05] max-[768px]:text-[6.5vw] text-[#FAF7F2] tracking-tight">
            {title}
          </h2>
          <p className="font-secondary mt-4 text-[1.1vw] leading-relaxed max-[768px]:text-[3.6vw] text-[#FAF7F2]/75">
            {periodLabel}
          </p>
        </div>

        {/* ── 4-STEP REFINED TIMELINE CANVAS ── */}
        <div className="relative h-[28vw] w-[114vw] max-[768px]:h-[74vh] max-[768px]:w-[260vw] flex-shrink-0">
          {/* Main Horizontal Timeline Track (Continuous Background + Active Scrubbed Progress) */}
          <div className="w-full absolute left-0 top-[50%] -translate-y-1/2 h-[2px] bg-emerald-500/25 rounded-full z-0">
            <div
              className="absolute left-0 top-0 h-full journey-line-fill rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-300 shadow-[0_0_12px_#10B981]"
              style={{ width: "18%" }}
            />
          </div>

          {/* ── STEP 01 (TOP) ── */}
          <div className="absolute left-[7vw] max-[768px]:left-[12vw] top-0 bottom-0 w-[23vw] max-[768px]:w-[58vw] pointer-events-none">
            {/* Milestone Waypoint Node on Main Horizontal Line */}
            <div
              className="absolute left-0 top-[50%] -translate-x-1/2 -translate-y-1/2 size-[14px] rounded-full jd-step-1 shadow-[0_0_12px_#10B981] ring-4 ring-[#03120E] z-20"
              style={activeStyle}
            />
            {/* Vertical Stem Connecting Upward */}
            <div
              className="absolute left-0 bottom-[50%] -translate-x-1/2 w-[2px] h-[5.5vw] max-[768px]:h-[10vh] jl-step-1 bg-gradient-to-t from-emerald-400 via-emerald-400 to-emerald-300 z-10"
            />
            {/* Terminal Header Node */}
            <div className="absolute left-0 bottom-[calc(50%+5.5vw)] -translate-x-1/2 translate-y-1/2 size-[10px] rounded-full bg-emerald-300 shadow-[0_0_10px_#10B981] ring-2 ring-[#03120E] z-20 jd-step-1" />
            {/* Step 01 Content Card (Above Axis, aligned with Terminal Node) */}
            <div className="absolute left-[1.2vw] max-[768px]:left-[3.5vw] bottom-[calc(50%+4.3vw)] max-[768px]:bottom-[calc(50%+7.8vh)] w-[21vw] max-[768px]:w-[54vw] card-step-1 space-y-1.5 pointer-events-auto">
              <BlurryToClear
                as="h4"
                className="font-main font-bold text-[1.65vw] leading-none max-[768px]:text-[4.6vw] text-[#FAF7F2]"
              >
                {topJourneyData[0]?.year} • {topJourneyData[0]?.month}
              </BlurryToClear>
              <p className="font-secondary text-[1.05vw] leading-relaxed max-[768px]:text-[3.5vw] text-[#FAF7F2]/75">
                {topJourneyData[0]?.content}
              </p>
            </div>
          </div>

          {/* ── STEP 02 (BOTTOM) ── */}
          <div className="absolute left-[33vw] max-[768px]:left-[74vw] top-0 bottom-0 w-[23vw] max-[768px]:w-[58vw] pointer-events-none">
            {/* Milestone Waypoint Node on Main Horizontal Line */}
            <div
              className="absolute left-0 top-[50%] -translate-x-1/2 -translate-y-1/2 size-[14px] rounded-full jd-step-2 shadow-[0_0_12px_#10B981] ring-4 ring-[#03120E] z-20"
              style={activeStyle}
            />
            {/* Vertical Stem Connecting Downward */}
            <div
              className="absolute left-0 top-[50%] -translate-x-1/2 w-[2px] h-[5.5vw] max-[768px]:h-[10vh] jl-step-2 bg-gradient-to-b from-emerald-400 via-emerald-400 to-emerald-300 z-10"
            />
            {/* Terminal Header Node */}
            <div className="absolute left-0 top-[calc(50%+5.5vw)] -translate-x-1/2 -translate-y-1/2 size-[10px] rounded-full bg-emerald-300 shadow-[0_0_10px_#10B981] ring-2 ring-[#03120E] z-20 jd-step-2" />
            {/* Step 02 Content Card (Below Axis, header aligned with Terminal Node) */}
            <div className="absolute left-[1.2vw] max-[768px]:left-[3.5vw] top-[calc(50%+4.3vw)] max-[768px]:top-[calc(50%+7.8vh)] w-[21vw] max-[768px]:w-[54vw] card-step-2 space-y-1.5 pointer-events-auto">
              <BlurryToClear
                as="h4"
                className="font-main font-bold text-[1.65vw] leading-none max-[768px]:text-[4.6vw] text-[#FAF7F2]"
              >
                {bottomJourneyData[0]?.year} • {bottomJourneyData[0]?.month}
              </BlurryToClear>
              <p className="font-secondary text-[1.05vw] leading-relaxed max-[768px]:text-[3.5vw] text-[#FAF7F2]/75">
                {bottomJourneyData[0]?.content}
              </p>
            </div>
          </div>

          {/* ── STEP 03 (TOP) ── */}
          <div className="absolute left-[59vw] max-[768px]:left-[136vw] top-0 bottom-0 w-[23vw] max-[768px]:w-[58vw] pointer-events-none">
            {/* Milestone Waypoint Node on Main Horizontal Line */}
            <div
              className="absolute left-0 top-[50%] -translate-x-1/2 -translate-y-1/2 size-[14px] rounded-full jd-step-3 shadow-[0_0_12px_#10B981] ring-4 ring-[#03120E] z-20"
              style={activeStyle}
            />
            {/* Vertical Stem Connecting Upward */}
            <div
              className="absolute left-0 bottom-[50%] -translate-x-1/2 w-[2px] h-[5.5vw] max-[768px]:h-[10vh] jl-step-3 bg-gradient-to-t from-emerald-400 via-emerald-400 to-emerald-300 z-10"
            />
            {/* Terminal Header Node */}
            <div className="absolute left-0 bottom-[calc(50%+5.5vw)] -translate-x-1/2 translate-y-1/2 size-[10px] rounded-full bg-emerald-300 shadow-[0_0_10px_#10B981] ring-2 ring-[#03120E] z-20 jd-step-3" />
            {/* Step 03 Content Card (Above Axis, aligned with Terminal Node) */}
            <div className="absolute left-[1.2vw] max-[768px]:left-[3.5vw] bottom-[calc(50%+4.3vw)] max-[768px]:bottom-[calc(50%+7.8vh)] w-[21vw] max-[768px]:w-[54vw] card-step-3 space-y-1.5 pointer-events-auto">
              <BlurryToClear
                as="h4"
                className="font-main font-bold text-[1.65vw] leading-none max-[768px]:text-[4.6vw] text-[#FAF7F2]"
              >
                {topJourneyData[1]?.year} • {topJourneyData[1]?.month}
              </BlurryToClear>
              <p className="font-secondary text-[1.05vw] leading-relaxed max-[768px]:text-[3.5vw] text-[#FAF7F2]/75">
                {topJourneyData[1]?.content}
              </p>
            </div>
          </div>

          {/* ── STEP 04 (BOTTOM) ── */}
          <div className="absolute left-[85vw] max-[768px]:left-[198vw] top-0 bottom-0 w-[23vw] max-[768px]:w-[58vw] pointer-events-none">
            {/* Milestone Waypoint Node on Main Horizontal Line */}
            <div
              className="absolute left-0 top-[50%] -translate-x-1/2 -translate-y-1/2 size-[14px] rounded-full jd-step-4 shadow-[0_0_12px_#10B981] ring-4 ring-[#03120E] z-20"
              style={activeStyle}
            />
            {/* Vertical Stem Connecting Downward */}
            <div
              className="absolute left-0 top-[50%] -translate-x-1/2 w-[2px] h-[5.5vw] max-[768px]:h-[10vh] jl-step-4 bg-gradient-to-b from-emerald-400 via-emerald-400 to-emerald-300 z-10"
            />
            {/* Terminal Header Node */}
            <div className="absolute left-0 top-[calc(50%+5.5vw)] -translate-x-1/2 -translate-y-1/2 size-[10px] rounded-full bg-emerald-300 shadow-[0_0_10px_#10B981] ring-2 ring-[#03120E] z-20 jd-step-4" />
            {/* Step 04 Content Card (Below Axis, header aligned with Terminal Node) */}
            <div className="absolute left-[1.2vw] max-[768px]:left-[3.5vw] top-[calc(50%+4.3vw)] max-[768px]:top-[calc(50%+7.8vh)] w-[21vw] max-[768px]:w-[54vw] card-step-4 space-y-1.5 pointer-events-auto">
              <BlurryToClear
                as="h4"
                className="font-main font-bold text-[1.65vw] leading-none max-[768px]:text-[4.6vw] text-[#FAF7F2]"
              >
                {bottomJourneyData[1]?.year} • {bottomJourneyData[1]?.month}
              </BlurryToClear>
              <p className="font-secondary text-[1.05vw] leading-relaxed max-[768px]:text-[3.5vw] text-[#FAF7F2]/75">
                {bottomJourneyData[1]?.content}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export { Timeline };
