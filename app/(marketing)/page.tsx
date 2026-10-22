import {
  Building2,
  Headphones,
  MapPin,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import { getLandingData } from "@/lib/queries/landing";



import { LandingHero } from "@/components/marketing/landing-hero";
import { FeaturesBento } from "@/components/marketing/features-bento";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { ProductsStack } from "@/components/marketing/products-stack";
import { TestimonialsCarousel } from "@/components/marketing/testimonials-carousel";
import { Reveal } from "@/components/marketing/reveal";
import { Pricing } from "@/components/marketing/pricing";
import { Faq } from "@/components/marketing/faq";
import { ArrowCta } from "@/components/ui/arrow-cta";
import { StackedSections, StackSlide, MobileSectionTransition } from "@/components/marketing/stacked-sections";

export const dynamic = "force-dynamic";

const TRUST_ITEMS = [
  { icon: ShieldCheck, label: "DPDP-compliant, data in India" },
  { icon: Building2, label: "Multi-clinic support" },
  { icon: Headphones, label: "24x7 support" },
  { icon: MessageCircle, label: "WhatsApp integration" },
  { icon: MapPin, label: "Made in India" },
];

const STATS = [
  { num: "12+", label: "Integrated Modules" },
  { num: "100%", label: "Paperless & Cloud-Native" },
  { num: "15-Day", label: "Free Guided Trial" },
  { num: "99.9%", label: "Uptime Guaranteed" },
];

export default async function HomePage() {
  const data = await getLandingData();
  const checkoutPlans = undefined;

  const hero = data.get("hero");
  const features = data.get("features");
  const steps = data.get("how_it_works");
  const products = data.get("products");
  const testimonials = data.get("testimonials");
  const pricing = data.get("pricing");
  const faq = data.get("faq");
  const cta = data.get("cta");

  return (
    <div className="relative w-full overflow-x-clip bg-[#071E17]">
      <StackedSections>
        {/* ── SLIDE 1: HERO (Seamless Blended Deep Green Hero) ── */}
        <StackSlide zIndex={10} hasTopCurve={false} className="bg-[#03120E] border-none shadow-none overflow-hidden">
          <LandingHero items={hero?.items ?? []} />
          {/* Mobile transition: Slide 1 (#03120E) -> Slide 2 Marquee (#041D14) */}
          <MobileSectionTransition from="#03120E" to="#041D14" />
        </StackSlide>

        {/* ── SLIDE 2: FEATURES BENTO & STATS (Static Platform Features) ── */}
        <StackSlide zIndex={20} className="bg-white border-none overflow-hidden">
          {/* Trust marquee at top of Slide 2 section card */}
          <div className="relative overflow-hidden border-b border-emerald-900/15 bg-[#041D14] py-5">
            <div className="marquee-track items-center">
              {[...TRUST_ITEMS, ...TRUST_ITEMS].map(({ icon: Icon, label }, i) => (
                <span
                  key={i}
                  className="flex items-center gap-3 whitespace-nowrap px-8 text-sm font-semibold text-emerald-100/80 font-main"
                >
                  <Icon className="h-4 w-4 text-emerald-400" />
                  {label}
                  <span aria-hidden className="ml-8 h-1.5 w-1.5 rounded-full bg-emerald-700/50" />
                </span>
              ))}
            </div>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#041D14] to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#041D14] to-transparent" />
          </div>

          {/* Mobile transition: Marquee (#041D14) -> Bento (#FAFBF9) */}
          <MobileSectionTransition from="#041D14" to="#FAFBF9" />

          <FeaturesBento
            title={features?.title ?? "Everything Your Clinic Needs"}
            subtitle={
              features?.subtitle ??
              "Purpose-built tools for modern healthcare professionals — from solo practitioners to multi-branch hospitals."
            }
          />

          {/* Mobile transition: Bento (#FAFBF9) -> Stats (#0d261e) */}
          <MobileSectionTransition from="#FAFBF9" to="#0d261e" />

          {/* Stats band */}
          <section className="ambient-grain relative overflow-hidden bg-navy-950 py-16 sm:py-20">
            <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-accent-500/10 blur-[120px]" />
            <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-2 gap-y-12 px-5 lg:grid-cols-4 lg:px-8">
              {STATS.map((s, i) => (
                <Reveal
                  key={s.label}
                  delay={i * 0.08}
                  className="border-white/10 text-center lg:[&:not(:first-child)]:border-l"
                >
                  <p className="font-main text-5xl font-semibold tracking-tight text-white md:text-6xl">
                    {s.num}
                  </p>
                  <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/75 font-main">
                    {s.label}
                  </p>
                </Reveal>
              ))}
            </div>
          </section>

          {/* Mobile transition: Stats (#0d261e) -> Slide 3 How It Works (#03120E) */}
          <MobileSectionTransition from="#0d261e" to="#03120E" />
        </StackSlide>

        {/* ── SLIDE 3: HOW IT WORKS (Deployment Guide Pinned Timeline) ── */}
        <StackSlide zIndex={30} className="bg-[#03120E] border-none overflow-hidden">
          <HowItWorks
            title={steps?.title ?? "How It Works"}
            subtitle={steps?.subtitle ?? "Get up and running in minutes with our guided clinical onboarding."}
            items={steps?.items?.map((s) => ({
              id: s.id,
              title: s.title,
              description: s.description,
              badge: s.badge ?? null,
            })) ?? []}
          />
          {/* Mobile transition: Slide 3 (#03120E) -> Slide 4 Suite of Solutions (#143B30) */}
          <MobileSectionTransition from="#03120E" to="#143B30" />
        </StackSlide>

        {/* ── SLIDE 4: SUITE OF SOLUTIONS (Static Core Products) ────────── */}
        <StackSlide zIndex={40} className="bg-[#143B30] border-none overflow-hidden">
          <ProductsStack
            title={products?.title ?? "Explore Our Suite of Solutions"}
            subtitle={
              products?.subtitle ??
              "Engineered for clinical precision and practice growth — everything your healthcare team needs in one connected workspace."
            }
            items={products?.items ?? []}
          />
          {/* Mobile transition: Slide 4 (#143B30) -> Slide 5 Testimonials (#EAF7F0) */}
          <MobileSectionTransition from="#143B30" to="#EAF7F0" />
        </StackSlide>

        {/* ── SLIDE 5: TESTIMONIALS (Pastel Green Background) ─────────────── */}
        <StackSlide zIndex={50} className="bg-[#EAF7F0] border-none overflow-hidden">
          <section className="relative overflow-hidden py-12 sm:py-16 lg:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <TestimonialsCarousel
                title={testimonials?.title ?? "Trusted by Healthcare Leaders"}
                subtitle={testimonials?.subtitle ?? "See how clinicians and practice managers across India scale their healthcare operations."}
                items={testimonials?.items ?? []}
              />
            </div>
          </section>
          {/* Mobile transition: Slide 5 (#EAF7F0) -> Slide 6 Pricing (#FFFFFF) */}
          <MobileSectionTransition from="#EAF7F0" to="#FFFFFF" />
        </StackSlide>

        {/* ── SLIDE 6: PRICING ───────────────────────────────────────────── */}
        <StackSlide zIndex={60} className="bg-white border-none overflow-hidden">
          <section className="py-12 sm:py-24 lg:py-36">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <Pricing
                title={pricing?.title ?? "Pricing that scales with your Business"}
                subtitle={pricing?.subtitle ?? "Trusted by healthcare leaders across India. Explore which option is right for you."}
                items={pricing?.items ?? []}
                checkoutPlans={checkoutPlans}
              />
            </div>
          </section>
          {/* Mobile transition: Slide 6 (#FFFFFF) -> Slide 7 FAQ (#02130D) */}
          <MobileSectionTransition from="#FFFFFF" to="#02130D" />
        </StackSlide>

        {/* ── SLIDE 7: FAQ (21st.dev FAQ-05 Two-Column Card in Deep Forest Green) ── */}
        <StackSlide zIndex={70} className="bg-[#02130D] border-none overflow-hidden">
          <section className="ambient-grain relative overflow-hidden py-16 sm:py-24 lg:py-36">
            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <Faq
                title={faq?.title ?? "Questions, answered."}
                subtitle={faq?.subtitle ?? "The things people ask most often. Still stuck? Reach out and we'll walk you through it."}
                items={faq?.items ?? []}
              />
            </div>
          </section>
          {/* Mobile transition: Slide 7 (#02130D) -> Slide 8 Closing CTA (#03150E) */}
          <MobileSectionTransition from="#02130D" to="#03150E" />
        </StackSlide>

        {/* ── SLIDE 8: MASSIVE CLOSING CTA (21st.dev WebGL Shader & Arrow CTA) ── */}
        <StackSlide zIndex={80} className="bg-[#03150E] border-none overflow-hidden min-h-[60vh] sm:min-h-screen flex flex-col justify-center">
          <ArrowCta
            title={cta?.title ?? "Ready to Modernize Your Clinic?"}
            subtitle={
              cta?.subtitle ??
              "Join leading clinics using Skora to streamline patient workflows, automate bookings, and cut administrative overhead by 40%."
            }
            primaryButtonText="Start Free Trial"
            primaryButtonHref="/signup"
            secondaryButtonText="Request a Demo"
            secondaryButtonHref="/contact"
            note="No credit card required · Instant 2-minute deployment · Cancel anytime"
          />
          {/* Mobile transition: Slide 8 (#03150E) -> Footer (#03140E) */}
          <MobileSectionTransition from="#03150E" to="#03140E" />
        </StackSlide>
      </StackedSections>
    </div>
  );
}

