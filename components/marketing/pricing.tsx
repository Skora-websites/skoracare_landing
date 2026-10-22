"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Check, X, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import type { LandingItem } from "@/lib/db/schema";

import { BlurryToClear } from "@/components/ui/blurry-to-clear";

type PlanFeature = {
  name: string;
  included_monthly?: boolean;
  included_yearly?: boolean;
  text_monthly?: string;
  text_yearly?: string;
};

/** Maps a marketing plan title to its checkout package id (doctors only). */
export type PricingCheckoutPlan = {
  title: string;
  packageId: string;
  buyerName?: string | null;
  buyerEmail?: string | null;
  buyerPhone?: string | null;
};

const PLAN_META: Record<number, { title: string; desc: string }> = {
  0: {
    title: "Starter",
    desc: "Great for solo practitioners and small clinics looking to digitize OPD.",
  },
  1: {
    title: "Business",
    desc: "Best value for growing clinics and practices that need advanced features.",
  },
  2: {
    title: "Enterprise",
    desc: "Advanced plan with enhanced security, custom integrations, and unlimited access.",
  },
};

const DEFAULT_PLANS: LandingItem[] = [
  {
    id: 1,
    sectionKey: "pricing",
    title: "Package 1",
    description: "Great for solo practitioners and small clinics looking to digitize OPD.",
    image: null,
    icon: null,
    badge: null,
    link: "/signup",
    linkText: "Get Started",
    priceMonthly: "799",
    priceYearly: "7990",
    priceOriginalMonthly: "999",
    priceOriginalYearly: "9588",
    features: [
      { name: "1 Doctor / OPD Counter", included_monthly: true, included_yearly: true },
      { name: "OPD & Appointment Management", included_monthly: true, included_yearly: true },
      { name: "Digital Prescriptions & Records", included_monthly: true, included_yearly: true },
      { name: "Billing System & GST Invoicing", included_monthly: true, included_yearly: true },
      { name: "Staff Management", included_monthly: true, included_yearly: true },
      { name: "Comprehensive Patient Records", included_monthly: true, included_yearly: true },
      { name: "Ledger Management", included_monthly: true, included_yearly: true },
      { name: "Online/Offline Consultation", included_monthly: true, included_yearly: true },
      { name: "Multi Clinic Management", included_monthly: true, included_yearly: true },
      { name: "Multi Vendor Lab Tests", included_monthly: false, included_yearly: false },
      { name: "Role & Permission Management", included_monthly: false, included_yearly: false },
      { name: "GMB Optimization", included_monthly: false, included_yearly: false },
      { name: "Custom Landing Page", included_monthly: false, included_yearly: true, text_monthly: "Landing Page", text_yearly: "Landing Page" },
    ],
    stars: 5,
    order: 0,
    isActive: true,
    createdAt: null,
    updatedAt: null,
  },
  {
    id: 2,
    sectionKey: "pricing",
    title: "Package 2",
    badge: "✦ Most Popular",
    description: "Best value for growing clinics and practices that need advanced features.",
    image: null,
    icon: null,
    link: "/signup",
    linkText: "Get Started",
    priceMonthly: "1299",
    priceYearly: "12990",
    priceOriginalMonthly: "1599",
    priceOriginalYearly: "15588",
    features: [
      { name: "Up to 3 Doctors / Users", included_monthly: true, included_yearly: true },
      { name: "Multi Vendor Lab Tests", included_monthly: true, included_yearly: true },
      { name: "Role & Permission Management", included_monthly: true, included_yearly: true },
      { name: "GMB Google Business Optimization", included_monthly: true, included_yearly: true },
      { name: "OPD & Appointment Management", included_monthly: true, included_yearly: true },
      { name: "Digital Prescriptions & Records", included_monthly: true, included_yearly: true },
      { name: "Billing System & GST Invoicing", included_monthly: true, included_yearly: true },
      { name: "Staff Management", included_monthly: true, included_yearly: true },
      { name: "Comprehensive Patient Records", included_monthly: true, included_yearly: true },
      { name: "Ledger Management", included_monthly: true, included_yearly: true },
      { name: "Online/Offline Consultation", included_monthly: true, included_yearly: true },
      { name: "Multi Clinic Management", included_monthly: true, included_yearly: true },
      { name: "Static Web Pages", included_monthly: true, included_yearly: true, text_monthly: "Static Pages", text_yearly: "Static Pages" },
    ],
    stars: 5,
    order: 1,
    isActive: true,
    createdAt: null,
    updatedAt: null,
  },
  {
    id: 3,
    sectionKey: "pricing",
    title: "Package 3",
    description: "Advanced plan with enhanced security, custom integrations, and unlimited access.",
    image: null,
    icon: null,
    badge: null,
    link: "/signup",
    linkText: "Get Started",
    priceMonthly: "2499",
    priceYearly: "24990",
    priceOriginalMonthly: "2999",
    priceOriginalYearly: "29988",
    features: [
      { name: "Up to 5 Doctors / Users", included_monthly: true, included_yearly: true },
      { name: "Multi Clinic Network Hub", included_monthly: true, included_yearly: true },
      { name: "Multi Vendor Lab Integration", included_monthly: true, included_yearly: true },
      { name: "Advanced Role & Permission Matrix", included_monthly: true, included_yearly: true },
      { name: "GMB Optimization & Marketing Tools", included_monthly: true, included_yearly: true },
      { name: "OPD & Appointment Management", included_monthly: true, included_yearly: true },
      { name: "Digital Prescriptions & Records", included_monthly: true, included_yearly: true },
      { name: "Billing System & GST Invoicing", included_monthly: true, included_yearly: true },
      { name: "Staff Management", included_monthly: true, included_yearly: true },
      { name: "Comprehensive Patient Records", included_monthly: true, included_yearly: true },
      { name: "Ledger Management", included_monthly: true, included_yearly: true },
      { name: "Online/Offline Consultation", included_monthly: true, included_yearly: true },
      { name: "Dynamic Web Pages & Custom Portal", included_monthly: true, included_yearly: true, text_monthly: "Dynamic Pages", text_yearly: "Dynamic Pages" },
    ],
    stars: 5,
    order: 2,
    isActive: true,
    createdAt: null,
    updatedAt: null,
  },
];

type SelectedPlanModalData = {
  plan: LandingItem;
  meta: { title: string; desc: string };
  isPopular: boolean;
  displayPrice: number;
  rawPrice: number;
  features: PlanFeature[];
  checkout?: PricingCheckoutPlan;
};

export function Pricing({
  items,
  checkoutPlans,
  title,
  subtitle,
  hideHeader = false,
}: {
  items: LandingItem[];
  checkoutPlans?: PricingCheckoutPlan[];
  title?: string | null;
  subtitle?: string | null;
  hideHeader?: boolean;
}) {
  const [yearly, setYearly] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<SelectedPlanModalData | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const checkoutByTitle = new Map(
    (checkoutPlans ?? []).map((c) => [c.title, c])
  );

  const displayItems = items && items.length > 0 ? items : DEFAULT_PLANS;

  // Lock body scroll and listen for Escape key when overlay is active
  useEffect(() => {
    if (selectedPlan) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") setSelectedPlan(null);
      };
      window.addEventListener("keydown", onKeyDown);
      return () => {
        document.body.style.overflow = prevOverflow;
        window.removeEventListener("keydown", onKeyDown);
      };
    }
  }, [selectedPlan]);

  return (
    <div className="relative w-full">
      {/* ── AMBIENT TOP RADIAL GLOW ── */}
      {!hideHeader && (
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[720px] max-w-[90vw] h-[360px] bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.18),rgba(59,130,246,0.06),transparent_70%)] blur-3xl -z-10" />
      )}

      {/* ── HEADER WITH DYNAMIC ACCENT BOX (OPTIONAL) ── */}
      <div className={cn("mx-auto max-w-3xl text-center px-4", hideHeader ? "mb-8 sm:mb-12" : "mb-10 sm:mb-16")}>
        {!hideHeader && (
          <>
            <h2 className="font-main text-balance text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-slate-900 leading-[1.15]">
              Pricing that scales with{" "}
              <span className="text-emerald-600">
                your Business
              </span>
            </h2>
            <p className="font-secondary mx-auto mt-3 sm:mt-5 max-w-xl text-pretty text-sm sm:text-lg leading-relaxed text-slate-500">
              {subtitle ??
                "Trusted by healthcare leaders across India. Explore which option is right for you."}
            </p>
          </>
        )}

        {/* ── SLEEK PILL BILLING TOGGLE ── */}
        <div className={cn("inline-flex items-center rounded-full bg-slate-100/95 p-1.5 border border-slate-200/90 shadow-[inset_0_1px_3px_rgba(0,0,0,0.06)]", !hideHeader && "mt-6 sm:mt-10")}>
          <button
            type="button"
            onClick={() => setYearly(false)}
            className="relative px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold rounded-full transition-colors z-10 font-main"
          >
            {!yearly && (
              <motion.div
                layoutId="pricing-active-pill"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 shadow-[0_4px_14px_rgba(16,185,129,0.35)]"
                transition={{ type: "spring", stiffness: 420, damping: 32 }}
              />
            )}
            <span
              className={cn(
                "relative z-10 transition-colors",
                !yearly
                  ? "text-white font-bold"
                  : "text-slate-600 hover:text-slate-900"
              )}
            >
              Monthly
            </span>
          </button>

          <button
            type="button"
            onClick={() => setYearly(true)}
            className="relative px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold rounded-full transition-colors z-10 flex items-center gap-1.5 sm:gap-2 font-main"
          >
            {yearly && (
              <motion.div
                layoutId="pricing-active-pill"
                className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-600 to-emerald-500 shadow-[0_4px_14px_rgba(16,185,129,0.35)]"
                transition={{ type: "spring", stiffness: 420, damping: 32 }}
              />
            )}
            <span
              className={cn(
                "relative z-10 transition-colors",
                yearly
                  ? "text-white font-bold"
                  : "text-slate-600 hover:text-slate-900"
              )}
            >
              Yearly
            </span>
            <span
              className={cn(
                "relative z-10 text-[10px] sm:text-[11px] font-semibold px-1.5 sm:px-2 py-0.5 rounded-full transition-colors",
                yearly
                  ? "bg-white/25 text-white"
                  : "bg-emerald-100 text-emerald-800 border border-emerald-200/80"
              )}
            >
              Save 20%
            </span>
          </button>
        </div>
      </div>

      {/* ── 3-COLUMN CARDS GRID (COMPACT ON MOBILE) ── */}
      <div className="grid gap-6 sm:gap-8 md:grid-cols-3 items-stretch px-1 sm:px-0">
        {displayItems.map((plan, idx) => {
          const features = (plan.features as unknown as PlanFeature[]) ?? [];
          const isPopular = Boolean(plan.badge) || idx === 1;
          const originalTitle = plan.title ?? "";
          const displayMeta = PLAN_META[idx] ?? {
            title: originalTitle || "Plan",
            desc: "Everything you need to power your clinic and patient care.",
          };

          const rawPrice = yearly
            ? Number(plan.priceYearly ?? 0)
            : Number(plan.priceMonthly ?? 0);

          // Display formatted monthly equivalent when yearly is active
          const displayPrice = yearly
            ? plan.priceYearly
              ? Math.round(Number(plan.priceYearly) / 12)
              : Math.round(rawPrice * 0.8)
            : Number(plan.priceMonthly ?? 0);

          const checkout = checkoutByTitle.get(originalTitle);

          // Top 3 preview features for mobile
          const previewFeatures = features.slice(0, 3);

          return (
            <div
              key={plan.id ?? idx}
              className={cn(
                "relative rounded-[28px] sm:rounded-[30px] p-6 sm:p-9 transition-all duration-300 flex flex-col justify-between",
                isPopular
                  ? "border-2 border-emerald-500 bg-white shadow-[0_12px_44px_rgba(16,185,129,0.14)] hover:shadow-[0_18px_54px_rgba(16,185,129,0.22)] ring-4 ring-emerald-500/10 md:-translate-y-2 hover:-translate-y-3"
                  : "border border-slate-200/90 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.07)] hover:-translate-y-1.5"
              )}
            >
              {/* Top Card Info */}
              <div>
                {/* Header: Title + Popular Badge */}
                <div className="flex items-center justify-between gap-2">
                  <BlurryToClear
                    as="h3"
                    className="font-main text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight"
                  >
                    {displayMeta.title}
                  </BlurryToClear>
                  {isPopular && (
                    <span className="font-main text-xs font-semibold bg-emerald-500 text-white px-3 py-1 rounded-full shadow-sm tracking-wide">
                      Popular
                    </span>
                  )}
                </div>

                {/* Subtitle description */}
                <p className="font-secondary text-xs sm:text-sm text-slate-500 mt-2 sm:mt-2.5 sm:min-h-[44px] leading-relaxed line-clamp-2 sm:line-clamp-none">
                  {displayMeta.desc}
                </p>

                {/* Price Display */}
                <div className="mt-4 sm:mt-6 flex items-baseline gap-1">
                  <span className="font-main text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight flex items-baseline">
                    <span className="text-xl sm:text-3xl font-bold mr-0.5">₹</span>
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={yearly ? "yearly" : "monthly"}
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.2 }}
                      >
                        {displayPrice.toLocaleString("en-IN")}
                      </motion.span>
                    </AnimatePresence>
                  </span>
                  <span className="font-secondary text-xs sm:text-sm text-slate-500 ml-1">
                    /month
                  </span>
                </div>

                {yearly && (
                  <p className="font-secondary text-[11px] sm:text-xs text-emerald-700 font-medium mt-1">
                    ₹{rawPrice.toLocaleString("en-IN")} billed yearly (Save 20%)
                  </p>
                )}

                {/* Main Action Button */}
                <div className="mt-5 sm:mt-6">
                  (
                    <a
                      href={
                        plan.link && !plan.link.startsWith("#")
                          ? plan.link
                          : "/signup"
                      }
                      className={cn(
                        "block w-full py-3 sm:py-3.5 px-6 rounded-2xl font-main text-sm font-semibold transition-all hover:scale-[1.01] active:scale-[0.99] text-center",
                        isPopular
                          ? "bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white shadow-[0_6px_22px_rgba(16,185,129,0.35)]"
                          : "bg-gradient-to-b from-[#2a2a2a] to-[#121212] hover:from-[#363636] hover:to-[#1c1c1c] text-white shadow-[0_4px_14px_rgba(0,0,0,0.18)] border border-white/10"
                      )}
                    >
                      {plan.linkText ?? "Get started"}
                    </a>
                </div>
              </div>

              {/* ── MOBILE: SHORT COMPACT 3 POINTS + READ MORE ── */}
              <div className="block sm:hidden mt-5 border-t border-slate-100 pt-4">
                <p className="font-main text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                  Key Highlights
                </p>
                <ul className="space-y-2">
                  {previewFeatures.map((f, i) => {
                    const included = yearly
                      ? f.included_yearly
                      : f.included_monthly;
                    const label = yearly ? f.text_yearly : f.text_monthly;
                    return (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-xs font-secondary"
                      >
                        {included ? (
                          <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                            <Check className="h-2.5 w-2.5" strokeWidth={3} />
                          </span>
                        ) : (
                          <span className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-300">
                            <X className="h-2.5 w-2.5" strokeWidth={2.5} />
                          </span>
                        )}
                        <span
                          className={cn(
                            included
                              ? "text-slate-700 font-medium"
                              : "text-slate-400"
                          )}
                        >
                          {label ?? f.name}
                        </span>
                      </li>
                    );
                  })}
                </ul>

                {/* Read more button to open overlay */}
                <button
                  type="button"
                  onClick={() =>
                    setSelectedPlan({
                      plan,
                      meta: displayMeta,
                      isPopular,
                      displayPrice,
                      rawPrice,
                      features,
                      checkout,
                    })
                  }
                  className="mt-3.5 w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-50 hover:bg-emerald-50/80 active:bg-emerald-100/60 border border-slate-200/80 hover:border-emerald-200/80 text-emerald-700 font-main text-xs font-semibold transition-all group"
                >
                  <span>Read more</span>
                  <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 text-emerald-600" />
                </button>
              </div>

              {/* ── DESKTOP & TABLET: FULL FEATURE LIST ── */}
              <div className="hidden sm:block mt-8 border-t border-slate-100 pt-6">
                <p className="font-main text-xs font-bold uppercase tracking-wider text-slate-400 mb-3.5">
                  Included Features
                </p>
                <ul className="space-y-3">
                  {features.map((f, i) => {
                    const included = yearly
                      ? f.included_yearly
                      : f.included_monthly;
                    const label = yearly ? f.text_yearly : f.text_monthly;
                    return (
                      <li
                        key={i}
                        className="flex items-start gap-2.5 text-sm font-secondary"
                      >
                        {included ? (
                          <span className="mt-0.5 flex h-4.5 w-4.5 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                            <Check className="h-3 w-3" strokeWidth={3} />
                          </span>
                        ) : (
                          <span className="mt-0.5 flex h-4.5 w-4.5 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-300">
                            <X className="h-3 w-3" strokeWidth={2.5} />
                          </span>
                        )}
                        <span
                          className={cn(
                            included
                              ? "text-slate-700 font-medium"
                              : "text-slate-400"
                          )}
                        >
                          {label ?? f.name}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── MOBILE OVERLAY MODAL: ALL PLAN POINTS (PORTALED TO BODY) ── */}
      {mounted &&
        typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {selectedPlan && (
              <div className="fixed inset-0 z-[99999] flex items-end sm:items-center justify-center p-0 sm:p-4">
                {/* Backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => setSelectedPlan(null)}
                  className="fixed inset-0 bg-black/65 backdrop-blur-sm"
                />

                {/* Bottom Sheet Modal Container */}
                <motion.div
                  initial={{ opacity: 0, y: "100%" }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: "100%" }}
                  transition={{ type: "spring", damping: 28, stiffness: 320 }}
                  className="relative w-full max-w-lg bg-white rounded-t-[32px] sm:rounded-[32px] shadow-2xl border border-slate-200/90 max-h-[85dvh] sm:max-h-[82vh] flex flex-col overflow-hidden z-10 mb-0"
                >
                  {/* Top Handle for Mobile Drag/Dismiss Cue */}
                  <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto mt-3 shrink-0 sm:hidden" />

                  {/* Modal Header (Pinned / Non-shrinking) */}
                  <div className="p-5 sm:p-6 border-b border-slate-100 flex items-start justify-between gap-4 shrink-0 bg-white">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-main text-2xl font-bold text-slate-900 tracking-tight">
                          {selectedPlan.meta.title}
                        </h3>
                        {selectedPlan.isPopular && (
                          <span className="font-main text-xs font-semibold bg-emerald-500 text-white px-2.5 py-0.5 rounded-full shadow-sm">
                            Popular
                          </span>
                        )}
                      </div>
                      <p className="font-secondary text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                        {selectedPlan.meta.desc}
                      </p>
                      <div className="mt-2.5 flex items-baseline gap-1">
                        <span className="font-main text-2xl font-extrabold text-slate-900">
                          ₹{selectedPlan.displayPrice.toLocaleString("en-IN")}
                        </span>
                        <span className="font-secondary text-xs text-slate-500">
                          /month {yearly ? `(₹${selectedPlan.rawPrice.toLocaleString("en-IN")} billed yearly)` : ""}
                        </span>
                      </div>
                    </div>

                    {/* Close Button */}
                    <button
                      type="button"
                      onClick={() => setSelectedPlan(null)}
                      className="rounded-full p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors shrink-0"
                      aria-label="Close modal"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Scrollable Features List */}
                  <div className="flex-1 overflow-y-auto overscroll-contain p-5 sm:p-6 divide-y divide-slate-100">
                    <div className="pb-3">
                      <p className="font-main text-xs font-bold uppercase tracking-wider text-slate-400">
                        All Included Features ({selectedPlan.features.length})
                      </p>
                    </div>
                    <ul className="space-y-3 pt-3 pb-2">
                      {selectedPlan.features.map((f, i) => {
                        const included = yearly
                          ? f.included_yearly
                          : f.included_monthly;
                        const label = yearly ? f.text_yearly : f.text_monthly;
                        return (
                          <li
                            key={i}
                            className="flex items-start gap-2.5 text-sm font-secondary"
                          >
                            {included ? (
                              <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                                <Check className="h-3 w-3" strokeWidth={3} />
                              </span>
                            ) : (
                              <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-300">
                                <X className="h-3 w-3" strokeWidth={2.5} />
                              </span>
                            )}
                            <span
                              className={cn(
                                "leading-snug",
                                included
                                  ? "text-slate-800 font-medium"
                                  : "text-slate-400"
                              )}
                            >
                              {label ?? f.name}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  {/* Modal Footer / Action Button (Pinned / Non-shrinking / Always Visible) */}
                  <div className="p-4 sm:p-5 border-t border-slate-100 bg-white flex items-center gap-3 shrink-0 pb-6 sm:pb-5 shadow-[0_-4px_16px_rgba(0,0,0,0.04)]">
                    <div className="flex-1">
                      (
                        <a
                          href={
                            selectedPlan.plan.link && !selectedPlan.plan.link.startsWith("#")
                              ? selectedPlan.plan.link
                              : "/signup"
                          }
                          className={cn(
                            "block w-full py-3 px-5 rounded-xl font-main text-sm font-semibold transition-all text-center",
                            selectedPlan.isPopular
                              ? "bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white shadow-[0_4px_16px_rgba(16,185,129,0.3)]"
                              : "bg-slate-900 hover:bg-slate-800 text-white shadow-sm"
                          )}
                        >
                          {selectedPlan.plan.linkText ?? "Get started"}
                        </a>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedPlan(null)}
                      className="py-3 px-4 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 font-main text-sm font-semibold transition-colors shrink-0"
                    >
                      Close
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
}

export default Pricing;

