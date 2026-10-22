"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LandingItem } from "@/lib/db/schema";
import { BlurryToClear } from "@/components/ui/blurry-to-clear";

const DEFAULT_FAQS = [
  {
    id: 1,
    title: "What is SkoraCares and who is it for?",
    description:
      "SkoraCares is an end-to-end clinical operating system built for modern pharmacies, polyclinics, and doctors. It handles instant prescription dispensing, ABDM compliance, GST invoicing, live inventory, and multi-branch management in one connected workspace.",
  },
  {
    id: 2,
    title: "How does the 14-day free trial work?",
    description:
      "You get full, unrestricted access to all features for 14 days with zero credit card required. Setup takes under 2 minutes, and our onboarding team is available 24/7 to help configure your clinic.",
  },
  {
    id: 3,
    title: "Is patient health data secure and DPDP compliant?",
    description:
      "Yes, 100%. All data is hosted exclusively within Tier-4 Indian data centers, encrypted at rest (AES-256) and in transit (TLS 1.3), fully compliant with India's Digital Personal Data Protection (DPDP) Act and ABDM standards.",
  },
  {
    id: 4,
    title: "Can I manage multiple clinic branches and pharmacy counters?",
    description:
      "Absolutely. Multi-clinic architecture allows administrators to toggle between branches, track cross-branch inventory, and consolidate analytics while isolating role-based staff permissions.",
  },
  {
    id: 5,
    title: "Does it support automated WhatsApp prescription delivery?",
    description:
      "Yes, once a prescription or bill is finalized, an official branded WhatsApp message with the verified PDF link is automatically dispatched to the patient's phone number.",
  },
];

interface FaqProps {
  items: LandingItem[];
  title?: string | null;
  subtitle?: string | null;
  tag?: string;
}

export function Faq({
  items,
  title = "Questions, answered.",
  subtitle = "The things people ask most often. Still stuck? Reach out and we'll walk you through it.",
  tag = "FAQ",
}: FaqProps) {
  // Single-open accordion, all closed by default matching the 21st.dev reference
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqList = items && items.length > 0 ? items : DEFAULT_FAQS;

  const displayTitle =
    title && title.toLowerCase().includes("frequently")
      ? "Questions, answered."
      : title || "Questions, answered.";

  const displaySubtitle =
    subtitle ||
    "The things people ask most often. Still stuck? Reach out and we'll walk you through it.";

  return (
    <div className="relative w-full">
      {/* ── 21st.dev FAQ-05 TWO-COLUMN SPLIT CONTAINER (Deep Forest Green) ── */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-emerald-500/20 bg-gradient-to-b from-[#052217] via-[#041C13] to-[#02140D] shadow-[0_24px_50px_rgba(0,0,0,0.5),0_0_24px_rgba(16,185,129,0.08)]">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* ── LEFT COLUMN: Eyebrow, Editorial Headline & Intro ── */}
          <div className="flex flex-col justify-between p-6 sm:p-12 lg:col-span-5 lg:p-16">
            <div>
              {/* Eyebrow Tag */}
              <span className="font-main text-xs font-semibold uppercase tracking-[0.25em] text-emerald-400">
                {tag}
              </span>

              {/* Headline */}
              <BlurryToClear
                as="h2"
                className="mt-6 sm:mt-8 font-main text-3xl sm:text-5xl lg:text-[3.5rem] font-bold leading-[1.08] tracking-tight text-[#FAF7F2]"
              >
                {displayTitle}
              </BlurryToClear>

              {/* Subtitle / Intro */}
              <p className="font-secondary mt-4 sm:mt-6 max-w-sm text-sm sm:text-base leading-relaxed text-emerald-100/75">
                {displaySubtitle}
              </p>
            </div>

            {/* Support link prompt */}
            <div className="mt-8 sm:mt-10 pt-5 sm:pt-6 border-t border-emerald-900/60">
              <p className="font-secondary text-xs text-emerald-200/60">
                Have a specific question?{" "}
                <a
                  href="/contact"
                  className="font-medium text-emerald-400 transition-colors hover:text-emerald-300 underline underline-offset-4"
                >
                  Contact our clinic support team →
                </a>
              </p>
            </div>
          </div>

          {/* ── RIGHT COLUMN: Single-Open Accordion with Hairline Dividers ── */}
          <div className="flex flex-col justify-center border-t border-emerald-900/60 p-6 sm:p-12 lg:col-span-7 lg:border-t-0 lg:border-l lg:p-16">
            <div className="divide-y divide-emerald-900/60">
              {faqList.map((item, i) => {
                const isOpen = openIndex === i;
                return (
                  <div key={item.id || i} className="transition-colors">
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="group flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left transition-colors"
                    >
                      <span
                        className={cn(
                          "font-main text-base sm:text-lg font-medium transition-colors duration-200",
                          isOpen
                            ? "text-emerald-300"
                            : "text-[#FAF7F2] group-hover:text-emerald-300"
                        )}
                      >
                        {item.title}
                      </span>
                      <ChevronDown
                        className={cn(
                          "h-4 w-4 shrink-0 text-emerald-400/70 transition-transform duration-300 ease-out group-hover:text-emerald-300",
                          isOpen && "rotate-180 text-emerald-300"
                        )}
                        strokeWidth={2}
                      />
                    </button>

                    {/* Smooth height accordion animation */}
                    <div
                      className={cn(
                        "grid transition-all duration-300 ease-out",
                        isOpen
                          ? "grid-rows-[1fr] pb-5 opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      )}
                    >
                      <div className="overflow-hidden">
                        <p className="font-secondary text-sm sm:text-[15px] leading-relaxed text-emerald-100/70 pr-6">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Faq;
