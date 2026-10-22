import type { Metadata } from "next";
import {
  Check,
  X,
  Shield,
  Zap,
  RefreshCw,
  Headphones,
  Database,
  Building2,
  Users,
  Stethoscope,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { PageHeader } from "@/components/marketing/page-header";
import { Pricing } from "@/components/marketing/pricing";
import { Faq } from "@/components/marketing/faq";
import { ArrowCta } from "@/components/ui/arrow-cta";
import { getLandingData } from "@/lib/queries/landing";
import { getCurrentUser } from "@/lib/auth/user";
import { isRazorpayConfigured } from "@/lib/packages/razorpay";
import { PACKAGE_PLANS } from "@/lib/packages/config";

export const metadata: Metadata = {
  title: "Pricing Plans for Modern Clinics | SkoraCares",
  description:
    "Explore transparent clinical pricing plans for solo doctors, polyclinics, and multi-branch hospital chains. 15-day free trial, zero hidden fees.",
};

export const dynamic = "force-dynamic";

export default async function PricingPage() {
  const data = await getLandingData();
  const pricing = data.get("pricing");
  const faq = data.get("faq");

  // Doctors see live checkout buttons on the pricing cards (Razorpay);
  // every other visitor keeps marketing demo links.
  const user = await getCurrentUser();
  const checkoutPlans =
    user?.role === "doctor" && isRazorpayConfigured()
      ? PACKAGE_PLANS.map((p) => ({
          title: p.name,
          packageId: p.id,
          buyerName: user.name,
          buyerEmail: user.email,
          buyerPhone: user.phone,
        }))
      : undefined;

  // 3 Clinical Practice Categories / Personas
  const practiceCategories = [
    {
      category: "Category 1",
      tierName: "Starter Tier",
      targetAudience: "Solo Practitioners & Single OPD",
      price: "₹799",
      idealFor:
        "Individual doctors looking to eliminate paper prescriptions, manage walk-in patient queues, and generate GST-compliant OPD bills.",
      highlights: [
        "1 Doctor / OPD Counter",
        "Instant digital prescription dispensing",
        "Walk-in appointment & token queue",
        "Automated WhatsApp digital Rx links",
      ],
      icon: Stethoscope,
      accent: "border-slate-200/80 bg-white",
    },
    {
      category: "Category 2",
      tierName: "Business Tier",
      targetAudience: "Growing Clinics & Polyclinics",
      price: "₹1,299",
      badge: "✦ Most Popular",
      idealFor:
        "Multi-doctor clinics needing integrated pathology tests, front-desk staff role management, and Google Business profile optimization.",
      highlights: [
        "Up to 3 Doctors & Staff Accounts",
        "Multi-Vendor Pathology & Lab Integration",
        "Role-based access permissions",
        "Google Business Profile (GMB) Growth",
      ],
      icon: Users,
      accent: "border-emerald-500/40 bg-emerald-50/40 ring-1 ring-emerald-500/20",
    },
    {
      category: "Category 3",
      tierName: "Enterprise Tier",
      targetAudience: "Multi-Branch Chains & Hospitals",
      price: "₹2,499",
      idealFor:
        "Healthcare organizations with multiple locations requiring unified inventory, cross-branch data aggregation, and custom web portals.",
      highlights: [
        "Up to 5+ Doctors / Multi-Counter OPD",
        "Multi-Clinic Network Hub & Analytics",
        "Dynamic Web Pages & Custom Patient Portal",
        "Priority 24/7 dedicated clinical account manager",
      ],
      icon: Building2,
      accent: "border-slate-200/80 bg-white",
    },
  ];

  // Feature Matrix Rows
  const comparisonMatrix = [
    {
      feature: "Doctor / OPD Counters Included",
      starter: "1 Doctor",
      business: "Up to 3 Doctors",
      enterprise: "Up to 5+ Doctors",
    },
    {
      feature: "Digital Prescriptions & EMR",
      starter: true,
      business: true,
      enterprise: true,
    },
    {
      feature: "ABHA & ABDM Milestone Compliance",
      starter: true,
      business: true,
      enterprise: true,
    },
    {
      feature: "GST Invoicing & Daybook Accounting",
      starter: true,
      business: true,
      enterprise: true,
    },
    {
      feature: "Automated WhatsApp Rx Delivery",
      starter: true,
      business: true,
      enterprise: true,
    },
    {
      feature: "Multi-Vendor Pathology / Lab Tests",
      starter: false,
      business: true,
      enterprise: true,
    },
    {
      feature: "Role & Permission Management",
      starter: false,
      business: true,
      enterprise: true,
    },
    {
      feature: "GMB Google Business Optimization",
      starter: false,
      business: true,
      enterprise: true,
    },
    {
      feature: "Multi-Clinic Branch Switching",
      starter: "Single Branch",
      business: "Up to 2 Branches",
      enterprise: "Unlimited Branches",
    },
    {
      feature: "Custom Web Presence",
      starter: "Custom Landing Page (Yearly)",
      business: "Static Clinic Web Pages",
      enterprise: "Dynamic Portal & Web CMS",
    },
    {
      feature: "Data Backup & Migration",
      starter: "Automated Daily",
      business: "Automated Daily",
      enterprise: "Real-time Redundant Backups",
    },
    {
      feature: "Support SLA",
      starter: "Standard Phone & Email",
      business: "Priority WhatsApp Desk",
      enterprise: "24/7 Dedicated Account Manager",
    },
  ];

  const valuePerks = [
    {
      icon: Database,
      title: "Free Data Migration",
      desc: "Our technical team migrates your existing patient records from Excel, Practo, or legacy software at zero extra cost.",
    },
    {
      icon: Headphones,
      title: "1-on-1 Staff Training",
      desc: "Live walkthroughs for your receptionists, nurses, and billing staff to ensure complete ease of use from day one.",
    },
    {
      icon: RefreshCw,
      title: "Zero Lock-In Contract",
      desc: "Switch between monthly and yearly billing anytime. Upgrade or cancel your subscription whenever you wish.",
    },
    {
      icon: Shield,
      title: "100% DPDP & ABDM Ready",
      desc: "Tier-4 Indian cloud data centers complying strictly with the Digital Personal Data Protection Act.",
    },
  ];

  return (
    <div className="bg-[#FAFBF9] min-h-screen">
      {/* ── 1. PAGE HERO HEADER ── */}
      <PageHeader
        badge="Transparent Clinical Pricing"
        title="Predictable plans tailored to your practice scale"
        subtitle="Start with a risk-free 15-day trial — zero setup fees, no credit card required. Upgrade or downgrade anytime as your patient volume grows."
      />

      {/* ── 2. THE THREE PRACTICE CATEGORIES (SEGMENTED OVERVIEW) ── */}
      <section className="pt-16 pb-10">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="font-main text-xs font-bold tracking-widest uppercase text-emerald-700">
              Tailored for Every Practice Stage
            </span>
            <h2 className="mt-2 font-main text-2xl sm:text-3xl font-extrabold tracking-tight text-[#03120E]">
              Three categories built for Indian clinics
            </h2>
            <p className="mt-2 text-sm text-ink-muted">
              Whether you are a solo doctor or running a 10-branch polyclinic network, select the tier that matches your clinical operations.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {practiceCategories.map((cat) => (
              <div
                key={cat.tierName}
                className={`rounded-3xl border p-6 sm:p-7 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md flex flex-col justify-between ${cat.accent}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 px-2.5 py-1 rounded-full">
                      {cat.category}
                    </span>
                    {cat.badge && (
                      <span className="font-main text-xs font-bold text-white bg-emerald-600 px-3 py-1 rounded-full shadow-xs">
                        {cat.badge}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-xs">
                      <cat.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-main text-lg font-bold text-[#03120E]">
                        {cat.tierName}
                      </h3>
                      <p className="text-xs font-semibold text-emerald-700">
                        {cat.targetAudience}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-ink-muted leading-relaxed mb-5">
                    {cat.idealFor}
                  </p>

                  <div className="border-t border-gray-100 pt-4 space-y-2">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Core Capabilities
                    </p>
                    {cat.highlights.map((h) => (
                      <div key={h} className="flex items-center gap-2 text-xs text-ink">
                        <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-gray-100 flex items-baseline justify-between">
                  <div>
                    <span className="text-xs text-ink-muted">Starting at</span>
                    <p className="font-main text-2xl font-extrabold text-[#03120E]">
                      {cat.price}
                      <span className="text-xs font-normal text-ink-muted">/mo</span>
                    </p>
                  </div>
                  <a
                    href="#plans"
                    className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-900 transition-colors"
                  >
                    View Plan &rarr;
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. INTERACTIVE 3-TIER PRICING CARDS SECTION ── */}
      <section id="plans" className="py-12 sm:py-16 relative scroll-mt-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Pricing
            items={pricing?.items ?? []}
            checkoutPlans={checkoutPlans}
            hideHeader={true}
          />
        </div>
      </section>

      {/* ── 4. DETAILED FEATURE COMPARISON TABLE ── */}
      <section className="py-16 sm:py-24 border-t border-emerald-900/10 bg-white">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="font-main text-xs font-bold tracking-widest uppercase text-emerald-700">
              Detailed Breakdown
            </span>
            <h2 className="mt-2 font-main text-2xl sm:text-4xl font-extrabold tracking-tight text-[#03120E]">
              Compare plan features side-by-side
            </h2>
            <p className="mt-3 text-sm sm:text-base text-ink-muted">
              Transparent specifications for each clinical package. No hidden limits.
            </p>
          </div>

          <div className="overflow-x-auto rounded-3xl border border-emerald-900/10 shadow-xs">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#03120E] text-white">
                <tr>
                  <th className="py-5 px-6 font-main font-bold text-base w-2/5">Feature</th>
                  <th className="py-5 px-6 font-main font-bold text-base text-center w-1/5">
                    Starter
                    <span className="block text-xs font-normal text-emerald-300">₹799/mo</span>
                  </th>
                  <th className="py-5 px-6 font-main font-bold text-base text-center w-1/5 bg-emerald-900/60">
                    Business
                    <span className="block text-xs font-normal text-emerald-300">₹1,299/mo</span>
                  </th>
                  <th className="py-5 px-6 font-main font-bold text-base text-center w-1/5">
                    Enterprise
                    <span className="block text-xs font-normal text-emerald-300">₹2,499/mo</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {comparisonMatrix.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={i % 2 === 0 ? "bg-white" : "bg-[#FAFBF9]"}
                  >
                    <td className="py-4 px-6 font-medium text-[#03120E]">{row.feature}</td>
                    
                    {/* Starter */}
                    <td className="py-4 px-6 text-center text-xs text-ink-muted">
                      {typeof row.starter === "boolean" ? (
                        row.starter ? (
                          <Check className="mx-auto h-5 w-5 text-emerald-600" />
                        ) : (
                          <X className="mx-auto h-4 w-4 text-gray-300" />
                        )
                      ) : (
                        <span className="font-semibold text-ink">{row.starter}</span>
                      )}
                    </td>

                    {/* Business */}
                    <td className="py-4 px-6 text-center text-xs text-ink-muted bg-emerald-50/20">
                      {typeof row.business === "boolean" ? (
                        row.business ? (
                          <Check className="mx-auto h-5 w-5 text-emerald-600" />
                        ) : (
                          <X className="mx-auto h-4 w-4 text-gray-300" />
                        )
                      ) : (
                        <span className="font-semibold text-emerald-900">{row.business}</span>
                      )}
                    </td>

                    {/* Enterprise */}
                    <td className="py-4 px-6 text-center text-xs text-ink-muted">
                      {typeof row.enterprise === "boolean" ? (
                        row.enterprise ? (
                          <Check className="mx-auto h-5 w-5 text-emerald-600" />
                        ) : (
                          <X className="mx-auto h-4 w-4 text-gray-300" />
                        )
                      ) : (
                        <span className="font-semibold text-ink">{row.enterprise}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── 5. THE SKORACARES GUARANTEE BENTO ── */}
      <section className="py-20 bg-[#041D14] text-white relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(#10B981 1px, transparent 1px), radial-gradient(#10B981 1px, #041D14 1px)",
            backgroundSize: "24px 24px",
            backgroundPosition: "0 0, 12px 12px",
          }}
        />

        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="font-main text-xs font-bold tracking-widest uppercase text-emerald-400">
              The SkoraCares Guarantee
            </span>
            <h2 className="mt-2 font-main text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              Every plan includes enterprise onboarding
            </h2>
            <p className="mt-3 text-sm sm:text-base text-emerald-100/70">
              No hidden setup charges, no surprises. Everything you need to modernize your clinic smoothly.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {valuePerks.map((perk) => (
              <div
                key={perk.title}
                className="rounded-2xl border border-emerald-500/20 bg-emerald-950/40 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-400/40 hover:bg-emerald-950/60"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-4">
                  <perk.icon className="h-6 w-6" />
                </div>
                <h3 className="font-main text-lg font-bold text-white">{perk.title}</h3>
                <p className="mt-2 text-xs sm:text-sm text-emerald-200/70 leading-relaxed">
                  {perk.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 pt-8 border-t border-emerald-800/40 text-xs sm:text-sm text-emerald-200/80 font-medium">
            <span className="flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-400" /> Free 15-day trial
            </span>
            <span className="flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-400" /> No credit card required
            </span>
            <span className="flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-400" /> Cancel anytime
            </span>
            <span className="flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-400" /> Live support in Hindi & English
            </span>
          </div>
        </div>
      </section>

      {/* ── 6. UNIVERSAL FAQ BLOCK ── */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Faq
            title={faq?.title ?? "Questions, answered."}
            subtitle={faq?.subtitle ?? "The things people ask most often. Still stuck? Reach out and we'll walk you through it."}
            items={faq?.items ?? []}
          />
        </div>
      </section>

      {/* ── 7. UNIVERSAL BOTTOM CTA ── */}
      <ArrowCta />
    </div>
  );
}
