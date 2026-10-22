"use client";

import { useRef } from "react";
import {
  ArrowRight,
  Check,
  Building2,
  Clock,
  ShieldCheck,
  Sparkles,
  FileText,
  Activity,
  Users,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { LandingItem } from "@/lib/db/schema";
import { BlurryToClear } from "@/components/ui/blurry-to-clear";
import { HudButton } from "@/components/ui/hud-button";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export type ProductCardData = {
  id: string | number;
  title: string;
  description: string;
  badge?: string;
  link?: string;
  linkText?: string;
  features: string[];
};

export const STATIC_PRODUCTS: ProductCardData[] = [
  {
    id: "prod-1",
    title: "All-in-One Healthcare Management Platform",
    description:
      "Manage your complete healthcare operations with a unified, high-performance platform. From patient records and digital prescriptions to staff scheduling, billing, home visits, and multi-clinic coordination — everything is centralized in one smart dashboard.",
    badge: "Core Platform",
    link: "/contact",
    linkText: "Request Platform Demo",
    features: [
      "Online Prescription Upload & Consent Form Submission",
      "Multi-Vendor Integration for Pathology & Lab Tests",
      "Staff, Role & Permission Management",
      "Home Visit Dispatch with Live Map Integration",
      "Multi-Clinic Management & White-Label Architecture",
      "Ledger Accounting, I/E Tracking & Automated Follow-ups",
    ],
  },
  {
    id: "prod-2",
    title: "Smart, Affordable & Trusted Solution",
    description:
      "Designed specifically for modern healthcare practices, Skora offers enterprise-grade capabilities at transparent, clinic-friendly pricing. Leading doctors and multi-specialty clinics trust us to automate daily administration and elevate patient care.",
    badge: "Practice Growth",
    link: "/signup",
    linkText: "Start Free Trial",
    features: [
      "PMS Complimentary for Existing Customers",
      "Affordable Scalable Monthly & Annual Plans",
      "30 Days Full-Feature Risk-Free Trial",
      "Intuitive, Fast Interface — No Steep Learning Curve",
      "Highest Feature Set at Unmatched Price-to-Value",
      "24×7 Clinical Onboarding & Technical Support",
    ],
  },
];

/* Custom SVG Badge that replaces any emoji with sleek, branded icons */
function CleanBadge({ badge, index }: { badge: string; index: number }) {
  // Strip any emoji characters (like 🚀, ⚙️, etc.)
  const cleanText = badge
    .replace(/[\p{Extended_Pictographic}\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, "")
    .trim();

  const isGrowthOrRocket =
    badge.includes("🚀") ||
    cleanText.toLowerCase().includes("why choose") ||
    cleanText.toLowerCase().includes("growth") ||
    index === 1;

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-950/60 px-3 py-1 text-xs font-semibold text-emerald-300 font-main backdrop-blur-md">
      {isGrowthOrRocket ? (
        <svg viewBox="0 0 24 24" fill="none" className="size-3.5 text-emerald-400 stroke-[2] shrink-0">
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" className="size-3.5 text-emerald-400 stroke-[2] shrink-0">
          <circle cx="12" cy="12" r="3" stroke="currentColor" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
      <span>{cleanText}</span>
    </span>
  );
}

export function ProductsStack({
  title = "Explore Our Suite of Solutions",
  subtitle = "Engineered for clinical precision and practice growth — everything your healthcare team needs in one connected workspace.",
  items,
}: {
  title?: string | null;
  subtitle?: string | null;
  items?: LandingItem[];
}) {
  const sectionRef = useRef<HTMLElement>(null);

  // Always fallback to STATIC_PRODUCTS if dynamic items are missing or empty
  const displayProducts: ProductCardData[] =
    items && items.length > 0
      ? items.map((p, idx) => ({
          id: p.id ?? `prod-${idx}`,
          title:
            p.title ??
            STATIC_PRODUCTS[idx % STATIC_PRODUCTS.length].title,
          description:
            p.description ??
            STATIC_PRODUCTS[idx % STATIC_PRODUCTS.length].description,
          badge:
            p.badge ??
            STATIC_PRODUCTS[idx % STATIC_PRODUCTS.length].badge,
          link:
            p.link && !p.link.startsWith("#")
              ? p.link
              : STATIC_PRODUCTS[idx % STATIC_PRODUCTS.length].link,
          linkText:
            p.linkText ??
            STATIC_PRODUCTS[idx % STATIC_PRODUCTS.length].linkText,
          features:
            ((p.features as unknown as string[]) ?? []).length > 0
              ? (p.features as unknown as string[])
              : STATIC_PRODUCTS[idx % STATIC_PRODUCTS.length].features,
        }))
      : STATIC_PRODUCTS;

  return (
    <section ref={sectionRef} className="py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-14 sm:mb-20 max-w-3xl">
          <h2 className="font-main text-balance text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#FAF7F2] leading-[1.08]">
            {title || "Explore Our Suite of Solutions"}
          </h2>
          {subtitle && (
            <p className="font-secondary mt-6 text-pretty text-lg sm:text-xl leading-relaxed text-[#FAF7F2]/80">
              {subtitle}
            </p>
          )}
        </div>

        {/* Product Cards Stack — Both Cards Fully Highlighted & Interactive */}
        <div className="space-y-10 sm:space-y-14">
          {displayProducts.map((p, i) => {
            const isFirst = i === 0;

            return (
              <article
                key={p.id}
                className="group relative overflow-hidden rounded-[2.5rem] border border-emerald-500/30 bg-gradient-to-br from-[#062419] via-[#041C13] to-[#02130D] p-1 shadow-[0_24px_50px_rgba(0,0,0,0.55)] transition-all duration-300 hover:border-emerald-400/60 hover:shadow-[0_24px_60px_rgba(16,185,129,0.18)]"
              >
                {/* Subtle Ambient Radial Highlight */}
                <div className="pointer-events-none absolute -right-24 -top-24 size-96 rounded-full bg-emerald-500/10 blur-[130px]" />
                <div className="pointer-events-none absolute -left-20 -bottom-20 size-80 rounded-full bg-teal-500/10 blur-[120px]" />

                <div className="relative z-10 grid gap-10 p-8 sm:p-12 md:p-14 lg:grid-cols-12 lg:items-center lg:gap-14">
                  {/* Left Column: Product Information & Feature Matrix */}
                  <div className="lg:col-span-7">
                    <div className="flex items-center gap-3">
                      <span className="font-main text-xs font-bold tracking-[0.25em] text-emerald-400">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {p.badge && <CleanBadge badge={p.badge} index={i} />}
                    </div>

                    <BlurryToClear
                      as="h3"
                      className="mt-5 font-main text-balance text-3xl sm:text-4xl font-bold tracking-tight text-[#FAF7F2] leading-tight"
                    >
                      {p.title}
                    </BlurryToClear>

                    <p className="font-secondary mt-3 sm:mt-5 max-w-2xl text-pretty text-sm sm:text-[17px] leading-relaxed text-[#FAF7F2]/80 line-clamp-2 sm:line-clamp-none">
                      {p.description}
                    </p>

                    {/* Features Grid */}
                    <ul className="mt-8 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                      {p.features.map((feat) => (
                        <li
                          key={feat}
                          className="flex items-start gap-2.5 text-sm sm:text-[15px] text-[#FAF7F2]/90 font-secondary"
                        >
                          <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                            <Check className="size-3" strokeWidth={3} />
                          </span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <div className="mt-10">
                      <HudButton
                        size="sm"
                        href={p.link ?? "/contact"}
                        className="shadow-[0_12px_28px_-6px_rgba(16,185,129,0.55),0_0_20px_rgba(52,211,153,0.35)]"
                      >
                        {p.linkText ?? "Learn More"}
                      </HudButton>
                    </div>
                  </div>

                  {/* Right Column: Tailored Clinical Interface Preview */}
                  <div className="lg:col-span-5">
                    {isFirst ? (
                      /* Card 0: Clinical Command Hub Visual Preview */
                      <div className="relative overflow-hidden rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-[#062419] to-[#02140D] p-6 shadow-2xl">
                        <div className="flex items-center justify-between border-b border-emerald-500/20 pb-4">
                          <div className="flex items-center gap-2.5">
                            <span className="flex size-9 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-300">
                              <Building2 className="size-5" />
                            </span>
                            <div>
                              <p className="font-main text-xs font-bold text-[#FAF7F2]">
                                Metro Health Care Hub
                              </p>
                              <p className="font-main text-[11px] text-emerald-300/80">
                                Central Multi-Clinic View
                              </p>
                            </div>
                          </div>
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-2.5 py-1 text-[11px] font-semibold text-emerald-300">
                            <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            Active Live
                          </span>
                        </div>

                        <div className="mt-5 space-y-3 font-main">
                          <div className="flex items-center justify-between rounded-xl bg-emerald-950/50 border border-emerald-500/20 p-3">
                            <div className="flex items-center gap-2 text-xs text-[#FAF7F2]">
                              <FileText className="size-4 text-emerald-400" />
                              <span>Digital Rx Dispatched</span>
                            </div>
                            <span className="text-xs font-bold text-emerald-300">
                              248 Today
                            </span>
                          </div>

                          <div className="flex items-center justify-between rounded-xl bg-emerald-950/50 border border-emerald-500/20 p-3">
                            <div className="flex items-center gap-2 text-xs text-[#FAF7F2]">
                              <Activity className="size-4 text-teal-400" />
                              <span>Lab Reports Verified</span>
                            </div>
                            <span className="text-xs font-bold text-teal-300">
                              98.6% Synced
                            </span>
                          </div>

                          <div className="flex items-center justify-between rounded-xl bg-emerald-950/50 border border-emerald-500/20 p-3">
                            <div className="flex items-center gap-2 text-xs text-[#FAF7F2]">
                              <Users className="size-4 text-emerald-400" />
                              <span>Doctors On Duty</span>
                            </div>
                            <span className="text-xs font-bold text-emerald-300">
                              18 Active
                            </span>
                          </div>
                        </div>

                        <div className="mt-5 rounded-xl border border-emerald-500/20 bg-emerald-900/30 p-3 text-center">
                          <p className="font-main text-xs font-semibold text-emerald-300 inline-flex items-center justify-center gap-1.5">
                            <Check className="size-3.5 text-emerald-400 stroke-[2.5]" />
                            <span>DPDP Compliant · 256-Bit Encrypted</span>
                          </p>
                        </div>
                      </div>
                    ) : (
                      /* Card 1: Practice Trust & Guarantee Preview */
                      <div className="relative overflow-hidden rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-[#062419] to-[#02140D] p-6 shadow-2xl">
                        <div className="text-center pb-5 border-b border-emerald-500/20">
                          <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-300 mb-3">
                            <ShieldCheck className="size-6 text-emerald-400" />
                          </div>
                          <p className="font-main text-lg font-bold text-[#FAF7F2]">
                            30-Day Risk-Free Trial
                          </p>
                          <p className="font-secondary text-xs text-emerald-200/70 mt-1">
                            Zero setup fee · Instant 2-minute activation
                          </p>
                        </div>

                        <div className="mt-5 space-y-3 font-main">
                          <div className="rounded-xl bg-emerald-950/50 border border-emerald-500/20 p-3 flex justify-between items-center text-xs">
                            <span className="text-[#FAF7F2]">Platform Uptime SLA</span>
                            <span className="font-bold text-emerald-300">99.9%</span>
                          </div>

                          <div className="rounded-xl bg-emerald-950/50 border border-emerald-500/20 p-3 flex justify-between items-center text-xs">
                            <span className="text-[#FAF7F2]">Dedicated Training</span>
                            <span className="font-bold text-emerald-300">Included Free</span>
                          </div>

                          <div className="rounded-xl bg-emerald-950/50 border border-emerald-500/20 p-3 flex justify-between items-center text-xs">
                            <span className="text-[#FAF7F2]">Data Migration</span>
                            <span className="font-bold text-emerald-300">1-Click Import</span>
                          </div>
                        </div>

                        <div className="mt-5 rounded-xl border border-emerald-500/20 bg-emerald-900/30 p-3 text-center">
                          <p className="font-main text-xs font-semibold text-emerald-300 inline-flex items-center justify-center gap-1.5">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="size-3.5 text-emerald-400">
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                            <span>Trusted by 2,000+ Healthcare Providers</span>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ProductsStack;
