import type { Metadata } from "next";
import {
  Check,
  HeartPulse,
  ShieldCheck,
  Sparkles,
  Users,
  Activity,
  Server,
  Lock,
  Building2,
  Clock,
  ArrowRight,
  TrendingUp,
  Stethoscope,
  Network,
  FlaskConical,
  Cpu,
  CheckCircle2,
} from "lucide-react";
import { PageHeader } from "@/components/marketing/page-header";
import { BlurryToClear } from "@/components/ui/blurry-to-clear";
import { ArrowCta } from "@/components/ui/arrow-cta";
import { HudButton } from "@/components/ui/hud-button";

export const metadata: Metadata = {
  title: "About Us | SkoraCares",
  description:
    "SkoraCares is building the digital clinical nervous system for Indian healthcare — empowering clinics, doctors, and pharmacies with modern, ABDM-ready software.",
};

const VALUES = [
  {
    icon: HeartPulse,
    title: "Clinical Precision",
    badge: "Doctor-First",
    text: "Every feature is engineered directly with practicing clinicians to cut documentation time and eliminate prescription errors.",
  },
  {
    icon: ShieldCheck,
    title: "Data Sovereignty & DPDP",
    badge: "100% India Hosted",
    text: "Patient health data resides exclusively in Tier-4 Indian data centers with AES-256 encryption at rest and in transit.",
  },
  {
    icon: Sparkles,
    title: "Zero-Friction Simplicity",
    badge: "Under 2 Clicks",
    text: "Complex hospital enterprise software shouldn't require weeks of training. If an action takes more than two clicks, we redesign it.",
  },
  {
    icon: Users,
    title: "Scalable Network Architecture",
    badge: "Single to Polyclinic",
    text: "From a solo doctor's OPD desk to a 10-branch polyclinic network, our unified platform scales effortlessly with practice growth.",
  },
];

const CORE_PILLARS = [
  {
    step: "01",
    phase: "Pillar 01",
    phaseStatus: "Live Module",
    title: "OPD & Patient Token Queue",
    description:
      "Manage walk-in registrations, doctor consultation schedules, and keep your waiting lounge organized with live digital tokens.",
    metric: "OPD Flow",
    icon: Stethoscope,
    tags: ["Token Queue", "Walk-in Desk", "Doctor Calendar"],
    highlight: "Front Desk",
  },
  {
    step: "02",
    phase: "Pillar 02",
    phaseStatus: "Live Module",
    title: "Digital Prescriptions & EMR",
    description:
      "Generate clean digital prescriptions in seconds with verified drug dosages, clinical notes, and automated WhatsApp delivery to patients.",
    metric: "Paperless Rx",
    icon: Network,
    tags: ["Digital Rx", "Dosage Database", "WhatsApp Share"],
    highlight: "Consultation",
  },
  {
    step: "03",
    phase: "Pillar 03",
    phaseStatus: "Live Module",
    title: "Diagnostics & Lab Orders",
    description:
      "Connect with certified pathology labs to order diagnostic investigations directly from consultation notes and receive PDF results automatically.",
    metric: "Diagnostics",
    icon: FlaskConical,
    tags: ["Lab Orders", "PDF Reports", "Result Sync"],
    highlight: "Lab Hub",
  },
  {
    step: "04",
    phase: "Pillar 04",
    phaseStatus: "Live Module",
    title: "GST Billing & Multi-Clinic",
    description:
      "Track daily clinic income and expenses, generate GST-compliant OPD bills, and administer multiple clinic branches with role-based access.",
    metric: "Financial Control",
    icon: Cpu,
    tags: ["GST Invoicing", "Daybook Ledger", "Multi-Clinic"],
    highlight: "Practice Admin",
    isCurrent: true,
  },
];

const STATS = [
  { value: "12+", label: "Integrated Practice Modules" },
  { value: "100%", label: "Cloud-Based & Paperless" },
  { value: "15-Day", label: "Full-Featured Free Trial" },
  { value: "Tier-4", label: "Indian Cloud Infrastructure" },
];

export default function AboutPage() {
  return (
    <div className="relative w-full bg-[#FAFBF9] text-slate-900 overflow-x-clip">
      {/* ── 1. HERO SECTION ── */}
      <PageHeader
        badge="About SkoraCares"
        title="Engineering the Digital Nervous System for Indian Healthcare"
        subtitle="SkoraCares empowers clinicians, polyclinics, and pharmacies with an enterprise-grade Clinical OS — modernizing OPD workflows, patient care, and practice growth across India."
      >
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <HudButton href="/contact#demo">
            Book a Clinic Tour
          </HudButton>
          <a
            href="/#features"
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white font-main backdrop-blur-md transition-all hover:bg-white/20 hover:border-white/35 active:scale-[0.98]"
          >
            <span>Explore Platform Modules</span>
            <ArrowRight className="size-4" />
          </a>
        </div>
      </PageHeader>

      {/* ── 2. OUR ORIGIN & MISSION NARRATIVE ── */}
      <section className="py-20 sm:py-28 bg-white border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <span className="font-main text-xs font-bold uppercase tracking-wider text-emerald-600 mb-3 block">
                Our Origin & Purpose
              </span>
              <BlurryToClear
                as="h2"
                className="font-main text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-[1.14]"
              >
                Built for the real-world realities of{" "}
                <span className="text-emerald-600">Indian clinics</span>
              </BlurryToClear>

              <div className="font-secondary mt-6 space-y-4 text-base sm:text-lg leading-relaxed text-slate-600">
                <p>
                  Running a modern clinic in India is demanding. Clinicians and practice managers must
                  seamlessly coordinate walk-in OPD lines, paper prescriptions, lab test samples,
                  reception billing, GST compliance, and patient follow-ups — all in high-volume,
                  fast-paced environments.
                </p>
                <p>
                  Existing legacy systems are either bloated foreign software that doesn&apos;t match
                  Indian clinical workflows, or clunky desktop utilities that crash and lose patient
                  records.
                </p>
                <p>
                  We built SkoraCares to be different: blazingly fast, cloud-synced, and designed with
                  practicing Indian doctors so your focus stays exactly where it matters — on delivering
                  exceptional patient care.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {[
                  "Online digital prescription upload & verification",
                  "ABDM-ready ABHA generation & consent flows",
                  "Multi-vendor diagnostic lab order dispatch",
                  "Automated WhatsApp consultation summaries",
                  "Integrated Indian ledger & GST invoicing",
                  "Role-based staff & multi-clinic oversight",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-sm font-medium text-slate-800 font-secondary">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                      <Check className="size-3" strokeWidth={3} />
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Card: Clinical Trust Highlights */}
            <div className="relative">
              <div className="relative overflow-hidden rounded-[32px] border border-slate-200/90 bg-gradient-to-br from-[#041D14] to-[#02130D] p-8 sm:p-10 text-white shadow-xl">
                <div className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-emerald-500/15 blur-3xl" />

                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 px-3 py-1 text-xs font-semibold text-emerald-300 font-main mb-6">
                    <Activity className="size-3.5" />
                    <span>Clinic OS Architecture</span>
                  </div>

                  <p className="font-main text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
                    12+ Modules
                  </p>
                  <p className="font-secondary text-base sm:text-lg text-emerald-100/85 mt-2">
                    A unified digital healthcare platform designed specifically for modern Indian clinics, polyclinics, and diagnostic facilities.
                  </p>

                  <div className="mt-8 grid grid-cols-3 gap-3.5 sm:gap-4 border-t border-emerald-500/20 pt-8">
                    {[
                      { val: "100%", lbl: "Digital Rx" },
                      { val: "Zero", lbl: "Paper Loss" },
                      { val: "Multi", lbl: "Clinic Support" },
                    ].map((s) => (
                      <div key={s.lbl} className="rounded-2xl bg-white/10 p-3.5 sm:p-4 text-center backdrop-blur-md border border-white/10">
                        <p className="font-main text-lg sm:text-xl font-bold text-white">{s.val}</p>
                        <p className="font-secondary text-[11px] text-emerald-200/75 mt-1">{s.lbl}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 rounded-2xl bg-emerald-950/60 border border-emerald-500/20 p-4 flex items-center gap-3.5">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-300">
                      <Clock className="size-5" />
                    </span>
                    <div>
                      <p className="font-main text-sm font-semibold text-white">Instant 24-Hour Deployment</p>
                      <p className="font-secondary text-xs text-emerald-200/70">Full clinic onboarding and staff training with zero downtime.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. FOUR CORE VALUES (ANIMATED BENTO CARDS) ── */}
      <section className="py-20 sm:py-28 bg-[#FAFBF9]">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="mx-auto mb-14 sm:mb-18 max-w-3xl text-center">
            <span className="font-main text-xs font-bold uppercase tracking-wider text-emerald-600 mb-2.5 block">
              Our Core Principles
            </span>
            <BlurryToClear
              as="h2"
              className="font-main text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-[1.12]"
            >
              The principles that guide our product
            </BlurryToClear>
            <p className="font-secondary mx-auto mt-4 max-w-2xl text-base sm:text-lg text-slate-600 leading-relaxed">
              Every interface, database schema, and integration is held to these non-negotiable standards of clinical excellence.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v, i) => {
              const Icon = v.icon;
              return (
                <div
                  key={v.title}
                  className="group relative flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-white p-7 sm:p-8 shadow-xs transition-all duration-300 hover:-translate-y-2 hover:border-emerald-500/40 hover:shadow-[0_20px_45px_-12px_rgba(16,185,129,0.2)] active:scale-[0.99]"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-6">
                      <div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 transition-transform duration-300 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white shadow-xs">
                        <Icon className="size-6" />
                      </div>
                      <span className="font-main text-[11px] font-semibold text-emerald-700 bg-emerald-100/70 border border-emerald-200/80 px-2.5 py-0.5 rounded-full">
                        {v.badge}
                      </span>
                    </div>

                    <h3 className="font-main text-xl font-bold text-slate-900 tracking-tight">
                      {v.title}
                    </h3>
                    <p className="font-secondary mt-2.5 text-sm leading-relaxed text-slate-600">
                      {v.text}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs font-semibold text-emerald-700 font-main group-hover:text-emerald-800">
                    <span>Principle 0{i + 1}</span>
                    <ArrowRight className="size-3.5 ml-auto transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 4. COMPANY MILESTONES (INTERACTIVE TIMELINE) ── */}
      <section className="py-20 sm:py-28 bg-[#FAFBF9] border-y border-slate-200/80 relative overflow-hidden">
        {/* Ambient background decoration */}
        <div className="pointer-events-none absolute -top-40 right-1/4 size-96 rounded-full bg-emerald-500/5 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-40 left-1/4 size-96 rounded-full bg-emerald-500/5 blur-3xl" />

        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 relative z-10">
          <div className="mx-auto mb-16 sm:mb-20 max-w-3xl text-center">
            <span className="font-main text-xs font-bold uppercase tracking-widest text-emerald-700 mb-2.5 inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200/80 px-3.5 py-1 rounded-full">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Complete Practice Workflow
            </span>
            <BlurryToClear
              as="h2"
              className="mt-3 font-main text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-[1.12]"
            >
              Four operational pillars for modern clinics
            </BlurryToClear>
            <p className="font-secondary mx-auto mt-4 max-w-2xl text-base sm:text-lg text-slate-600 leading-relaxed">
              Every workflow engineered to eliminate administrative bottlenecks — from patient arrival to digital prescription, lab tests, and billing.
            </p>
          </div>

          {/* Connected Grid of Operational Pillars */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 items-stretch">
            {CORE_PILLARS.map((m) => {
              const Icon = m.icon;
              return (
                <div
                  key={m.step}
                  className={`group relative flex flex-col justify-between overflow-hidden rounded-[28px] border p-6 sm:p-7 transition-all duration-300 hover:-translate-y-2.5 ${
                    m.isCurrent
                      ? "border-emerald-500/50 bg-gradient-to-b from-white via-white to-emerald-50/30 shadow-[0_12px_36px_-10px_rgba(16,185,129,0.22)] ring-1 ring-emerald-500/25"
                      : "border-slate-200/90 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-emerald-500/35 hover:shadow-[0_18px_40px_-12px_rgba(16,185,129,0.14)]"
                  }`}
                >
                  {/* Giant Watermarked Step Number in Background */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -right-2 -bottom-2 font-main text-7xl font-black text-slate-100/80 select-none group-hover:text-emerald-500/[0.09] transition-colors leading-none"
                  >
                    {m.step}
                  </span>

                  {/* Top Glowing Hairline on Hover */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-8 top-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />

                  {/* Card Content Top */}
                  <div className="relative z-10">
                    {/* Header Row: Icon + Metric Chip */}
                    <div className="flex items-center justify-between gap-2 mb-5">
                      <div
                        className={`flex size-11 items-center justify-center rounded-2xl transition-all duration-300 shadow-xs ${
                          m.isCurrent
                            ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30 group-hover:scale-105"
                            : "bg-emerald-50 text-emerald-700 border border-emerald-100 group-hover:bg-emerald-600 group-hover:text-white group-hover:scale-105"
                        }`}
                      >
                        <Icon className="size-5" />
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span
                          className={`font-main text-[11px] font-bold px-2.5 py-1 rounded-full border shadow-2xs flex items-center gap-1.5 ${
                            m.isCurrent
                              ? "bg-emerald-600 text-white border-emerald-500"
                              : "bg-slate-50 text-slate-700 border-slate-200/80"
                          }`}
                        >
                          {m.metric}
                        </span>
                      </div>
                    </div>

                    {/* Pillar Subtitle & Step Number */}
                    <div className="flex items-baseline justify-between mb-1">
                      <span className="font-main text-xs font-bold uppercase tracking-wider text-emerald-700">
                        {m.phase}
                      </span>
                      <span className="font-main text-3xl font-black tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
                        {m.step}
                      </span>
                    </div>

                    {/* Pillar Title */}
                    <h3 className="font-main text-lg font-bold text-slate-900 tracking-tight leading-snug">
                      {m.title}
                    </h3>

                    {/* Description */}
                    <p className="font-secondary text-xs sm:text-sm text-slate-600 leading-relaxed mt-2.5">
                      {m.description}
                    </p>

                    {/* Capability Tags */}
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {m.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-main text-[10.5px] font-medium bg-slate-50 group-hover:bg-emerald-50/60 text-slate-600 group-hover:text-emerald-900 rounded-md px-2 py-0.5 border border-slate-100 group-hover:border-emerald-200/60 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Content Bottom: Status */}
                  <div className="relative z-10 mt-6 pt-4 border-t border-slate-100">
                    <div className="flex items-center justify-between text-xs font-main">
                      <span className="text-slate-400 font-medium">Status</span>
                      <span className="font-bold flex items-center gap-1 text-emerald-700">
                        <CheckCircle2 className="size-3.5 text-emerald-600" />
                        {m.phaseStatus}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 5. CLINICAL IMPACT STATS BAND ── */}
      <section className="relative overflow-hidden bg-[#041D14] py-16 sm:py-20 text-white">
        <div className="pointer-events-none absolute -left-20 -top-20 size-80 rounded-full bg-emerald-500/15 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 -bottom-20 size-80 rounded-full bg-emerald-500/15 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-y-10 gap-x-6 lg:grid-cols-4 lg:divide-x lg:divide-emerald-900/40">
            {STATS.map((s) => (
              <div key={s.label} className="text-center lg:px-6">
                <p className="font-main text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white drop-shadow-sm">
                  {s.value}
                </p>
                <p className="font-main text-xs sm:text-sm font-semibold uppercase tracking-wider text-emerald-200/80 mt-2.5">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. DATA SECURITY & INDIAN INFRASTRUCTURE ── */}
      <section className="py-20 sm:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="rounded-[32px] border border-slate-200/90 bg-[#FAFBF9] p-8 sm:p-12 lg:p-16">
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <div>
                <span className="font-main text-xs font-bold uppercase tracking-wider text-emerald-600 mb-2.5 block">
                  Enterprise Security & Compliance
                </span>
                <BlurryToClear
                  as="h2"
                  className="font-main text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 leading-[1.16]"
                >
                  Uncompromising protection for patient health data
                </BlurryToClear>
                <p className="font-secondary mt-4 text-base leading-relaxed text-slate-600">
                  We adhere strictly to India&apos;s Digital Personal Data Protection (DPDP) Act and ABDM
                  standards. Your patient medical records are encrypted, isolated, and hosted exclusively on
                  certified Indian infrastructure.
                </p>

                <div className="mt-6 flex flex-wrap gap-2.5">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-50 px-3.5 py-1 text-xs font-semibold text-emerald-800 font-main">
                    <ShieldCheck className="size-3.5 text-emerald-600" />
                    DPDP Act Compliant
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-50 px-3.5 py-1 text-xs font-semibold text-emerald-800 font-main">
                    <Server className="size-3.5 text-emerald-600" />
                    Tier-4 Indian Data Centers
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/25 bg-emerald-50 px-3.5 py-1 text-xs font-semibold text-emerald-800 font-main">
                    <Lock className="size-3.5 text-emerald-600" />
                    AES-256 Bit Encryption
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    title: "Zero Third-Party Ad Tracking",
                    desc: "Patient records are strictly private and never monetized or shared with third-party advertisers.",
                  },
                  {
                    title: "Granular Role Permissions",
                    desc: "Separate doctors, pharmacists, billing operators, and front-desk staff with strict access controls.",
                  },
                  {
                    title: "Tamper-Proof Audit Logs",
                    desc: "Every record edit, prescription dispatch, and billing refund is logged with permanent audit trails.",
                  },
                  {
                    title: "Daily Automated Backups",
                    desc: "Redundant cloud snapshots guarantee instantaneous recovery without data loss.",
                  },
                ].map((item, i) => (
                  <div key={i} className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
                    <p className="font-main text-sm font-bold text-slate-900">{item.title}</p>
                    <p className="font-secondary text-xs text-slate-600 mt-1.5 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. UNIVERSAL BOTTOM CLOSING CTA ── */}
      <section className="bg-[#03150E]">
        <ArrowCta
          title="Ready to Modernize Your Clinic?"
          subtitle="Join modern clinics using SkoraCares to streamline OPD workflows, automate bookings, and cut administrative overhead."
          primaryButtonText="Start Free Trial"
          primaryButtonHref="/signup"
          secondaryButtonText="Book a Demo"
          secondaryButtonHref="/contact#demo"
          note="No credit card required · Instant 2-minute deployment · Cancel anytime"
        />
      </section>
    </div>
  );
}
