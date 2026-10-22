"use client";

import { useMemo } from "react";
import { motion } from "motion/react";
import type { LandingItem } from "@/lib/db/schema";

interface TestimonialData {
  id?: number | string;
  quote: string;
  name: string;
  role: string;
  avatar: string;
}

const DEFAULT_TESTIMONIALS: TestimonialData[] = [
  {
    id: 1,
    quote:
      "SkoraCares has completely transformed our OPD operations, streamlining clinic schedules and prescription records. The cloud-based platform keeps our doctors productive, even remotely.",
    name: "Briana Patton",
    role: "Operations Manager, Care Clinics",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    quote:
      "The ABDM integration and fast digital prescription support have transformed our workflow, making our entire clinical team significantly more efficient and organized.",
    name: "Zainab Hussain",
    role: "Practice Administrator, Apex Health",
    avatar:
      "https://images.unsplash.com/photo-1594824813589-915003c2b8aa?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    quote:
      "Using this clinical platform, our clinic's online appointment flow and patient retention have significantly improved, boosting overall healthcare practice performance.",
    name: "Hassan Ali",
    role: "Clinic Director, Metro Med",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    quote:
      "Implementing SkoraCares was smooth and quick. The customizable, user-friendly interface made onboarding our multi-department staff surprisingly effortless.",
    name: "Dr. Ramesh Sharma",
    role: "Senior Consultant, Delhi",
    avatar:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: 5,
    quote:
      "The smooth implementation exceeded expectations. It streamlined pharmacy dispensing, improving overall medical compliance and operational transparency.",
    name: "Dr. Sneha Rao",
    role: "Pediatric Specialist, Hyderabad",
    avatar:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: 6,
    quote:
      "Our clinic functions improved dramatically with a user-friendly design and overwhelmingly positive patient feedback on instant WhatsApp prescriptions.",
    name: "Dr. Vikram Malhotra",
    role: "Orthopedic Surgeon, Pune",
    avatar:
      "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: 7,
    quote:
      "The home visit scheduling with live map tracking is unmatched. Dispatch nurses arrive on time with offline patient records ready on hand.",
    name: "Dr. Amit Kulkarni",
    role: "Chief Physician, Bengaluru Health",
    avatar:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: 8,
    quote:
      "Multi-vendor lab tests save our staff hours every single day. Orders flow automatically and reports are linked to the patient timeline without delays.",
    name: "Dr. Priya Menon",
    role: "Medical Director, Mumbai",
    avatar:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: 9,
    quote:
      "Financial ledger and GST-compliant invoices generate instantly. We now have 100% audit clarity across all 4 of our clinical branches.",
    name: "Kavita Nair",
    role: "Finance Lead, Lifeline Healthcare",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
  },
];

interface TestimonialsProps {
  items?: LandingItem[];
  title?: string | null;
  subtitle?: string | null;
}

export function TestimonialsCarousel({
  items,
  title = "What our users say",
  subtitle = "See what our customers have to say about us.",
}: TestimonialsProps) {
  const displayTitle =
    title && title.toLowerCase().includes("doctor")
      ? "What our users say"
      : title || "What our users say";

  const displaySubtitle =
    subtitle && subtitle.toLowerCase().includes("switching")
      ? "See what our customers have to say about us."
      : subtitle || "See what our customers have to say about us.";

  // Use the curated dataset matching the 21st.dev reference
  const testimonials = useMemo(() => {
    return DEFAULT_TESTIMONIALS;
  }, []);

  // Distribute testimonials across 3 columns
  const col1 = useMemo(
    () => testimonials.filter((_, i) => i % 3 === 0),
    [testimonials]
  );
  const col2 = useMemo(
    () => testimonials.filter((_, i) => i % 3 === 1),
    [testimonials]
  );
  const col3 = useMemo(
    () => testimonials.filter((_, i) => i % 3 === 2),
    [testimonials]
  );

  return (
    <div className="w-full">
      {/* ── HEADER (Centered, exactly matching other site sections) ── */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
        <h2 className="font-main text-balance text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#03120E] leading-[1.08]">
          {displayTitle.toLowerCase().includes("users") ? (
            <>
              {displayTitle.split(/(users)/i).map((part, i) =>
                part.toLowerCase() === "users" ? (
                  <span key={i} className="text-emerald-600">
                    {part}
                  </span>
                ) : (
                  part
                )
              )}
            </>
          ) : (
            displayTitle
          )}
        </h2>
        <p className="font-secondary mt-2.5 sm:mt-3 text-base sm:text-lg text-slate-500 max-w-xl mx-auto leading-relaxed">
          {displaySubtitle}
        </p>
      </div>

      {/* ── 3-COLUMN INFINITE VERTICAL SCROLLING GRID (Compact Height) ── */}
      <div className="relative mx-auto max-w-7xl overflow-hidden max-h-[460px] sm:max-h-[490px] px-2 sm:px-4">
        {/* Top Fade Gradient Mask (Pastel Green Blend) */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-20 sm:h-24 bg-gradient-to-b from-[#EAF7F0] via-[#EAF7F0]/85 to-transparent z-10" />

        {/* Bottom Fade Gradient Mask (Pastel Green Blend) */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 sm:h-24 bg-gradient-to-t from-[#EAF7F0] via-[#EAF7F0]/85 to-transparent z-10" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {/* Column 1 */}
          <TestimonialColumn items={col1} duration={26} />

          {/* Column 2 (hidden on mobile, visible md+) */}
          <div className="hidden md:block">
            <TestimonialColumn items={col2} duration={34} />
          </div>

          {/* Column 3 (hidden on mobile/tablet, visible lg+) */}
          <div className="hidden lg:block">
            <TestimonialColumn items={col3} duration={30} />
          </div>
        </div>
      </div>
    </div>
  );
}

const CARD_SHADES = [
  // 1: Warm ivory cream with subtle emerald accent border
  {
    bg: "bg-[#FAF7F2]",
    border: "border-emerald-200/80",
    hoverBorder: "hover:border-emerald-400/80",
    shadow: "shadow-[0_4px_24px_rgba(16,185,129,0.06),0_1px_2px_rgba(0,0,0,0.02)]",
    tag: "text-emerald-700 bg-emerald-50/80 border-emerald-100",
  },
  // 2: Soft pastel mint
  {
    bg: "bg-[#eaf7f0]",
    border: "border-[#c5ecd7]",
    hoverBorder: "hover:border-[#9ee0bb]",
    shadow: "shadow-[0_4px_24px_rgba(14,124,90,0.05)]",
    tag: "text-emerald-800 bg-[#FAF7F2]/80 border-emerald-200/60",
  },
  // 3: Light spring green
  {
    bg: "bg-[#e2f5e9]",
    border: "border-[#bae7cd]",
    hoverBorder: "hover:border-[#96dcaf]",
    shadow: "shadow-[0_4px_24px_rgba(14,124,90,0.06)]",
    tag: "text-emerald-800 bg-[#FAF7F2]/80 border-emerald-200/60",
  },
  // 4: Soft pale celadon
  {
    bg: "bg-[#eef8f2]",
    border: "border-[#cfedd9]",
    hoverBorder: "hover:border-[#aee2be]",
    shadow: "shadow-[0_4px_24px_rgba(14,124,90,0.05)]",
    tag: "text-emerald-800 bg-[#FAF7F2]/80 border-emerald-200/60",
  },
  // 5: Warm ivory cream
  {
    bg: "bg-[#F9F6F0]",
    border: "border-[#E8E2D5]",
    hoverBorder: "hover:border-[#CFC6B5]",
    shadow: "shadow-[0_4px_24px_rgba(16,185,129,0.05)]",
    tag: "text-emerald-700 bg-emerald-50/80 border-emerald-100",
  },
  // 6: Pastel honeydew / pear green
  {
    bg: "bg-[#f1faef]",
    border: "border-[#d5eed0]",
    hoverBorder: "hover:border-[#b4e2ac]",
    shadow: "shadow-[0_4px_24px_rgba(14,124,90,0.05)]",
    tag: "text-emerald-800 bg-[#FAF7F2]/80 border-emerald-200/60",
  },
  // 7: Light fresh mint
  {
    bg: "bg-[#e5f6ed]",
    border: "border-[#bde8d1]",
    hoverBorder: "hover:border-[#93dab3]",
    shadow: "shadow-[0_4px_24px_rgba(14,124,90,0.06)]",
    tag: "text-emerald-800 bg-[#FAF7F2]/80 border-emerald-200/60",
  },
  // 8: Pale seafoam / dew green
  {
    bg: "bg-[#edf8f4]",
    border: "border-[#cdeee2]",
    hoverBorder: "hover:border-[#a4e2cc]",
    shadow: "shadow-[0_4px_24px_rgba(14,124,90,0.05)]",
    tag: "text-emerald-800 bg-[#FAF7F2]/80 border-emerald-200/60",
  },
  // 9: Light meadow pastel
  {
    bg: "bg-[#e7f6ec]",
    border: "border-[#c1e8cc]",
    hoverBorder: "hover:border-[#9cdab0]",
    shadow: "shadow-[0_4px_24px_rgba(14,124,90,0.06)]",
    tag: "text-emerald-800 bg-[#FAF7F2]/80 border-emerald-200/60",
  },
];

function TestimonialColumn({
  items,
  duration = 28,
}: {
  items: TestimonialData[];
  duration?: number;
}) {
  // Duplicate items to form a seamless infinite loop
  const duplicated = useMemo(() => [...items, ...items], [items]);

  return (
    <div className="overflow-hidden">
      <motion.div
        animate={{
          y: ["0%", "-50%"],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
        }}
        whileHover={{ animationPlayState: "paused" }}
        className="flex flex-col gap-6"
      >
        {duplicated.map((item, idx) => {
          const shadeIndex =
            item.id && typeof item.id === "number"
              ? (item.id - 1) % CARD_SHADES.length
              : idx % CARD_SHADES.length;
          const shade = CARD_SHADES[Math.abs(shadeIndex)];

          return (
            <div
              key={`${item.id}-${idx}`}
              className={`group rounded-3xl p-7 sm:p-8 border transition-all duration-300 hover:shadow-[0_12px_36px_rgba(14,124,90,0.12)] hover:-translate-y-1 ${shade.bg} ${shade.border} ${shade.hoverBorder} ${shade.shadow}`}
            >
              {/* Quote Body */}
              <p className="font-secondary text-sm sm:text-[15px] leading-relaxed text-slate-700">
                {item.quote}
              </p>

              {/* Author Footer */}
              <div className="mt-6 flex items-center gap-3.5 pt-2">
                <img
                  src={item.avatar}
                  alt={item.name}
                  loading="lazy"
                  className="h-10 w-10 sm:h-11 sm:w-11 rounded-full object-cover ring-2 ring-white/90 shadow-sm"
                />
                <div className="min-w-0 flex-1">
                  <p className="font-main text-sm font-semibold text-slate-900 leading-tight truncate">
                    {item.name}
                  </p>
                  <p className="font-secondary text-xs text-slate-500 mt-0.5 truncate">
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}

export const TestimonialsColumns = TestimonialsCarousel;
export default TestimonialsCarousel;
