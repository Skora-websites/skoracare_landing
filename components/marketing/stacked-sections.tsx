"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function StackedSections({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const container = containerRef.current;
      if (!container) return;

      const slides = gsap.utils.toArray<HTMLElement>(".stack-slide");
      if (slides.length <= 1) return;

      const mm = gsap.matchMedia();

      // ─────────────────────────────────────────────────────────────
      // DESKTOP (>= 768px): 3D DEPTH CARD STACKING & TIMELINE PIN
      // (Mobile mode scrolls normally as a standard site with no card animation)
      // ─────────────────────────────────────────────────────────────
      mm.add("(min-width: 768px)", () => {
        slides.forEach((slide, i) => {
          if (i === slides.length - 1) return;
          const nextSlide = slides[i + 1];
          const cardInner =
            slide.querySelector<HTMLElement>(".stack-card-inner") || slide;

          // Check if slide contains an interactive horizontal timeline (desktop only)
          const hasTimeline = Boolean(
            slide.querySelector<HTMLElement>("[data-timeline-track]")
          );

          if (hasTimeline) {
            const scrollDistance = window.innerWidth * 3.0;

            // 1. PINNING: Lock this section firmly at top top on the vertical plane
            // Viewport CANNOT scroll downwards until horizontal timeline completes
            ScrollTrigger.create({
              trigger: slide,
              start: "top top",
              end: `+=${scrollDistance}`,
              pin: true,
              pinSpacing: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            });

            // 2. OSMO 3D STACKING DEPTH: Only starts when nextSlide arrives after pin finishes
            gsap.fromTo(
              cardInner,
              {
                transformPerspective: 1200,
                rotateX: 0,
                scale: 1,
                yPercent: 0,
                filter: "brightness(1)",
                transformOrigin: "50% 100%",
              },
              {
                transformPerspective: 1200,
                rotateX: 18,
                scale: 0.88,
                yPercent: -4,
                filter: "brightness(0.45)",
                transformOrigin: "50% 100%",
                ease: "none",
                scrollTrigger: {
                  trigger: nextSlide,
                  start: "top bottom",
                  end: "top top",
                  scrub: 0.45,
                },
              }
            );
            return;
          }

          // 1. PINNING: Hold current slide in place while nextSlide glides over it
          const isTall = slide.offsetHeight > window.innerHeight + 40;

          ScrollTrigger.create({
            trigger: slide,
            start: () => {
              const tall = slide.offsetHeight > window.innerHeight + 40;
              return tall ? "bottom bottom" : "top top";
            },
            endTrigger: nextSlide,
            end: "top top",
            pin: true,
            pinSpacing: false,
            anticipatePin: 1,
          });

          // 2. DESKTOP OSMO 3D DEPTH STACKING
          gsap.fromTo(
            cardInner,
            {
              transformPerspective: 1200,
              rotateX: 0,
              scale: 1,
              yPercent: 0,
              filter: "brightness(1)",
              transformOrigin: "50% 100%",
            },
            {
              transformPerspective: 1200,
              rotateX: 18,
              scale: 0.88,
              yPercent: -4,
              filter: "brightness(0.45)",
              transformOrigin: "50% 100%",
              ease: "none",
              scrollTrigger: {
                trigger: nextSlide,
                start: isTall ? "bottom bottom" : "top bottom",
                end: "top top",
                scrub: 0.45,
              },
            }
          );
        });
      });

      return () => {
        mm.revert();
      };
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="relative w-full">
      {children}
    </div>
  );
}

export function StackSlide({
  children,
  zIndex = 10,
  className = "",
  hasTopCurve = true,
}: {
  children: ReactNode;
  zIndex?: number;
  className?: string;
  hasTopCurve?: boolean;
}) {
  return (
    <div
      style={{ zIndex, perspective: "1300px" }}
      className="stack-slide relative w-full p-0 md:px-6 lg:px-8 md:py-3.5"
    >
      <div
        className={`stack-card-inner w-full will-change-transform overflow-hidden rounded-none md:rounded-[56px] shadow-none md:shadow-[0_24px_65px_-15px_rgba(15,23,42,0.18),0_6px_22px_rgba(15,23,42,0.06)] ${className}`}
        style={{ transformStyle: "preserve-3d" }}
      >
        {children}
      </div>
    </div>
  );
}

/**
 * Sleek, compact gradient transition between section background colors on mobile screens (< 768px).
 * Hidden on desktop (md:) where 3D depth card stacking provides natural boundaries.
 */
export function MobileSectionTransition({
  from,
  to,
  height = "h-8 sm:h-10",
  className = "",
}: {
  from: string;
  to: string;
  height?: string;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`block md:hidden w-full ${height} pointer-events-none select-none relative z-10 shrink-0 -mt-px -mb-px ${className}`}
      style={{
        background: `linear-gradient(to bottom, ${from}, ${to})`,
      }}
    />
  );
}

