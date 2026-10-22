"use client";

import {
  Bell,
  BookOpenText,
  Building2,
  CheckCircle2,
  FileText,
  FlaskConical,
  FolderOpen,
  MapPin,
  Package,
  PenLine,
  ShieldCheck,
  Sparkles,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { LandingItem } from "@/lib/db/schema";
import { BlurryToClear } from "@/components/ui/blurry-to-clear";
import { FallingPattern } from "@/components/ui/falling-pattern";

export type FeatureCardItem = {
  id: string | number;
  title: string;
  description: string;
  icon: LucideIcon;
  badge?: string;
};

export const STATIC_FEATURES: FeatureCardItem[] = [
  {
    id: "f-1",
    title: "Online Prescription Upload",
    description:
      "Submit, verify, and dispense prescriptions digitally with instant drug interaction checks, error-free dosing, and direct SMS/WhatsApp delivery.",
    icon: FileText,
    badge: "Clinical Core",
  },
  {
    id: "f-2",
    title: "Consent Form Submission",
    description:
      "Collect and store patient consent forms electronically with full compliance, digital signatures, and permanent tamper-proof audit trails.",
    icon: PenLine,
  },
  {
    id: "f-3",
    title: "Multi-Vendor Lab Integration",
    description:
      "Seamlessly connect with certified diagnostic laboratories to order pathology tests, monitor processing status, and receive PDF reports automatically.",
    icon: FlaskConical,
  },
  {
    id: "f-4",
    title: "Staff & Duty Management",
    description:
      "Manage your entire clinical and front-desk team — roster shifts, role permissions, and attendance — from one unified operations command.",
    icon: Users,
  },
  {
    id: "f-5",
    title: "Inventory & Expense Tracking",
    description:
      "Track clinic consumables, pharmaceutical stock, and operating overhead in real time with automatic low-stock alerts and cost analysis.",
    icon: Package,
  },
  {
    id: "f-6",
    title: "Home Visit with Live Map",
    description:
      "Schedule home health consultations and track field practitioners in real time with GPS routing for punctual, transparent care delivery.",
    icon: MapPin,
  },
  {
    id: "f-7",
    title: "Multi-Clinic Management",
    description:
      "Operate and oversee multiple clinic branches, doctors, and treatment rooms from one centralized, cloud-synced executive interface.",
    icon: Building2,
  },
  {
    id: "f-8",
    title: "Role & Permission Security",
    description:
      "Define granular, role-based access for doctors, receptionists, accountants, and lab technicians to safeguard sensitive patient health data.",
    icon: ShieldCheck,
  },
  {
    id: "f-9",
    title: "White-Label Brand Experience",
    description:
      "Deliver a bespoke patient experience with your own logo, custom clinic portal, personalized SMS headers, and branded invoices.",
    icon: Sparkles,
  },
  {
    id: "f-10",
    title: "Integrated Financial Ledger",
    description:
      "Maintain transparent financial accounting, patient credit ledgers, daily collections, and GST-ready invoices without external software.",
    icon: BookOpenText,
  },
  {
    id: "f-11",
    title: "Automated Follow-up Reminders",
    description:
      "Reduce patient no-shows with automated WhatsApp and SMS follow-up alerts for chronic reviews, post-op visits, and vaccination schedules.",
    icon: Bell,
  },
  {
    id: "f-12",
    title: "Comprehensive Electronic Health Records (EHR)",
    description:
      "Store and navigate longitudinal patient histories — consultation notes, vitals trends, previous prescriptions, and lab history — securely on any device.",
    icon: FolderOpen,
  },
];

export type CardTheme = {
  bgClasses: string;
  borderClasses: string;
  isDark: boolean;
  bgImage?: string;
  imageOverlay?: string;
  iconBg: string;
  iconColor: string;
  badge?: { text: string; bg: string; textCol: string; border: string };
};

const CARD_THEMES: CardTheme[] = [
  /* 0: Online Prescription Upload (3x2 featured, deep hunter forest with clear clinical photo & Rx preview) */
  {
    isDark: true,
    bgClasses: "bg-gradient-to-br from-[#062418] via-[#041D14] to-[#02130D]",
    borderClasses: "border-emerald-500/40 hover:border-emerald-400/80",
    bgImage: "/images/bento/prescription-dispense.jpg",
    imageOverlay: "bg-gradient-to-t from-[#02130D]/85 via-transparent to-black/20",
    iconBg: "bg-emerald-950/85 ring-1 ring-emerald-400/40 backdrop-blur-md",
    iconColor: "text-emerald-300",
  },
  /* 1: Consent Form Submission (3x1, crisp spring celadon & mint) */
  {
    isDark: false,
    bgClasses: "bg-gradient-to-br from-[#F0FAF4] via-[#E4F6EB] to-[#D5F1DF]",
    borderClasses: "border-emerald-300/60 hover:border-emerald-500/70",
    iconBg: "bg-white shadow-sm ring-1 ring-emerald-600/20",
    iconColor: "text-emerald-800",
    badge: {
      text: "Tamper-Proof Audit",
      bg: "bg-emerald-800/10",
      textCol: "text-emerald-900",
      border: "border-emerald-600/30",
    },
  },
  /* 2: Multi-Vendor Lab Integration (3x1, luminous dark oceanic jade with clear lab photo) */
  {
    isDark: true,
    bgClasses: "bg-gradient-to-br from-[#042820] via-[#053328] to-[#021C16]",
    borderClasses: "border-emerald-500/40 hover:border-emerald-400/80",
    bgImage: "/images/bento/lab-diagnostics.jpg",
    imageOverlay: "bg-gradient-to-t from-[#021C16]/80 via-transparent to-black/25",
    iconBg: "bg-emerald-950/85 ring-1 ring-emerald-400/40 backdrop-blur-md",
    iconColor: "text-emerald-300",
    badge: {
      text: "Pathology Auto-Sync",
      bg: "bg-emerald-900/70",
      textCol: "text-emerald-300",
      border: "border-emerald-400/40",
    },
  },
  /* 3: Staff & Duty Management (2x1, pale pistachio & herbal cream) */
  {
    isDark: false,
    bgClasses: "bg-gradient-to-br from-[#FCFBF8] via-[#F4F9F2] to-[#E9F4E6]",
    borderClasses: "border-emerald-200/80 hover:border-emerald-400/60",
    iconBg: "bg-emerald-50 ring-1 ring-emerald-700/20",
    iconColor: "text-emerald-800",
  },
  /* 4: Inventory & Expense Tracking (2x1, rich dark olive-emerald pine) */
  {
    isDark: true,
    bgClasses: "bg-gradient-to-br from-[#083824] via-[#0C4A30] to-[#052618]",
    borderClasses: "border-emerald-500/40 hover:border-emerald-400/80",
    iconBg: "bg-emerald-950/85 ring-1 ring-emerald-400/40",
    iconColor: "text-emerald-300",
  },
  /* 5: Home Visit with Live Map (2x1, soft seafoam & frosted dark green with clear photo) */
  {
    isDark: true,
    bgClasses: "bg-gradient-to-br from-[#021F16] via-[#042C1F] to-[#02170F]",
    borderClasses: "border-emerald-500/40 hover:border-emerald-400/80",
    bgImage: "/images/bento/home-visit.jpg",
    imageOverlay: "bg-gradient-to-t from-[#02170F]/80 via-transparent to-black/20",
    iconBg: "bg-emerald-950/85 ring-1 ring-emerald-400/40 backdrop-blur-md",
    iconColor: "text-emerald-300",
    badge: {
      text: "GPS Routing",
      bg: "bg-emerald-900/70",
      textCol: "text-emerald-300",
      border: "border-emerald-400/40",
    },
  },
  /* 6: Multi-Clinic Management (3x1, architectural deep malachite with clear clinic interior) */
  {
    isDark: true,
    bgClasses: "bg-gradient-to-br from-[#05291E] via-[#083A2A] to-[#031C14]",
    borderClasses: "border-emerald-500/40 hover:border-emerald-400/80",
    bgImage: "/images/bento/clinic-interior.jpg",
    imageOverlay: "bg-gradient-to-t from-[#031C14]/80 via-transparent to-black/20",
    iconBg: "bg-emerald-950/85 ring-1 ring-emerald-400/40 backdrop-blur-md",
    iconColor: "text-emerald-300",
    badge: {
      text: "Multi-Branch Sync",
      bg: "bg-emerald-900/70",
      textCol: "text-emerald-300",
      border: "border-emerald-400/40",
    },
  },
  /* 7: Role & Permission Security (3x1, crisp botanical sage) */
  {
    isDark: false,
    bgClasses: "bg-gradient-to-br from-[#EEF7F1] via-[#E2F2E7] to-[#D5EDDD]",
    borderClasses: "border-emerald-300/60 hover:border-emerald-500/70",
    iconBg: "bg-white shadow-sm ring-1 ring-emerald-600/20",
    iconColor: "text-emerald-800",
    badge: {
      text: "Granular RBAC",
      bg: "bg-emerald-800/10",
      textCol: "text-emerald-900",
      border: "border-emerald-600/30",
    },
  },
  /* 8: White-Label Brand Experience (2x1, high-voltage vibrant emerald) */
  {
    isDark: true,
    bgClasses: "bg-gradient-to-br from-[#064E3B] via-[#047857] to-[#065F46]",
    borderClasses: "border-emerald-400/45 hover:border-emerald-300/80",
    iconBg: "bg-emerald-900/90 ring-1 ring-emerald-300/40",
    iconColor: "text-emerald-200",
  },
  /* 9: Integrated Financial Ledger (2x1, soft eucalyptus & warm pearl mint) */
  {
    isDark: false,
    bgClasses: "bg-gradient-to-br from-[#FAF8F3] via-[#EFF8F1] to-[#E2F2E6]",
    borderClasses: "border-emerald-200/70 hover:border-emerald-400/60",
    iconBg: "bg-white shadow-sm ring-1 ring-emerald-600/20",
    iconColor: "text-emerald-800",
  },
  /* 10: Automated Follow-up Reminders (2x1, refreshing bright mint green) */
  {
    isDark: false,
    bgClasses: "bg-gradient-to-br from-[#D4F7DF] via-[#BCF0CD] to-[#A4EABE]",
    borderClasses: "border-emerald-400/70 hover:border-emerald-500/80",
    iconBg: "bg-emerald-800 ring-1 ring-emerald-900/30",
    iconColor: "text-[#FAF7F2]",
    badge: {
      text: "WhatsApp & SMS",
      bg: "bg-emerald-800/20",
      textCol: "text-emerald-950",
      border: "border-emerald-800/30",
    },
  },
  /* 11: Comprehensive Electronic Health Records (6x1 wide, dark with EHR screen photo & live widget) */
  {
    isDark: true,
    bgClasses: "bg-gradient-to-br from-[#031A12] via-[#05281B] to-[#02120B]",
    borderClasses: "border-emerald-500/40 hover:border-emerald-400/80",
    bgImage: "/images/bento/ehr-screen.jpg",
    imageOverlay: "bg-gradient-to-r from-[#031A12]/85 via-transparent to-black/35",
    iconBg: "bg-emerald-950/85 ring-1 ring-emerald-400/40 backdrop-blur-md",
    iconColor: "text-emerald-300",
  },
];

/* Refined, high-fidelity pharmacy SVG icons with smooth micro-interaction animations */
function BentoIcon({ id }: { id: string | number }) {
  const strId = String(id);
  switch (strId) {
    case "f-1": // Prescription Upload: Rx sheet with checkmark shield
      return (
        <svg viewBox="0 0 24 24" fill="none" className="size-6 stroke-[1.8] transition-transform duration-300 group-hover:scale-110">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14 2v6h6" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
          {/* Rx Symbol */}
          <path d="M8 12h3.5a1.8 1.8 0 0 0 0-3.6H8v7.2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M10.8 12.2l2.8 3.4" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          {/* Pill Badge */}
          <circle cx="17.5" cy="17.5" r="3" fill="#10B981" fillOpacity="0.2" stroke="#10B981" strokeWidth="1.4" className="transition-transform duration-300 group-hover:scale-110" />
          <path d="M16 17.5l1 1 2-2" stroke="#10B981" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "f-2": // Consent Form: Shield + Signature
      return (
        <svg viewBox="0 0 24 24" fill="none" className="size-6 stroke-[1.8] transition-transform duration-300 group-hover:scale-110">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9 12l2 2 4-4" stroke="#10B981" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="transition-all duration-300 group-hover:stroke-emerald-400" />
          <path d="M8 16.5c1.5-.5 3 .5 4 0s2-.5 3 0" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.5" />
        </svg>
      );
    case "f-3": // Multi-Vendor Lab: Chemistry Flask with Effervescent Bubbles
      return (
        <svg viewBox="0 0 24 24" fill="none" className="size-6 stroke-[1.8] transition-transform duration-300 group-hover:scale-110">
          <path d="M10 2v5.5L4.5 18A2 2 0 0 0 6.2 21h11.6a2 2 0 0 0 1.7-3L14 7.5V2h-4z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8.5 2h7" stroke="currentColor" strokeLinecap="round" />
          <path d="M6.5 16h11" stroke="#10B981" strokeWidth="1.8" strokeLinecap="round" strokeDasharray="1.5 2.5" className="transition-all duration-300 group-hover:stroke-emerald-300" />
          <circle cx="9.5" cy="18.5" r="1.2" fill="#34D399" className="transition-transform duration-300 group-hover:-translate-y-1" />
          <circle cx="14" cy="17" r="1.6" fill="#10B981" className="transition-transform duration-300 group-hover:-translate-y-1.5" />
          <circle cx="12" cy="13.5" r="0.9" fill="#6EE7B7" className="transition-transform duration-300 group-hover:-translate-y-1" />
        </svg>
      );
    case "f-4": // Staff & Duty Management: Pharmacist Roster
      return (
        <svg viewBox="0 0 24 24" fill="none" className="size-6 stroke-[1.8] transition-transform duration-300 group-hover:scale-110">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="9" cy="7" r="4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
          {/* Shift Clock Badge */}
          <circle cx="18" cy="8" r="4" stroke="#10B981" strokeWidth="1.6" fill="currentColor" fillOpacity="0.05" />
          <polyline points="18 6 18 8 19.5 9" stroke="#10B981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "f-5": // Inventory & Expense Tracking: Stock Box with Barcode & Trend
      return (
        <svg viewBox="0 0 24 24" fill="none" className="size-6 stroke-[1.8] transition-transform duration-300 group-hover:scale-110">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="12" y1="22.08" x2="12" y2="12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
          {/* Barcode Lines on front face */}
          <line x1="7.5" y1="14" x2="7.5" y2="17.5" stroke="#10B981" strokeWidth="1.4" strokeLinecap="round" />
          <line x1="9.5" y1="14.5" x2="9.5" y2="17" stroke="#10B981" strokeWidth="1" strokeLinecap="round" />
          <line x1="16.5" y1="14" x2="16.5" y2="17.5" stroke="#10B981" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      );
    case "f-6": // Home Visit / Medicine Delivery: Pin with Pharmacy Cross
      return (
        <svg viewBox="0 0 24 24" fill="none" className="size-6 stroke-[1.8] transition-transform duration-300 group-hover:scale-110">
          <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
          {/* Pharmacy Cross Inside Pin */}
          <circle cx="12" cy="10" r="3.6" fill="#10B981" fillOpacity="0.25" stroke="#10B981" strokeWidth="1.2" />
          <path d="M12 8v4M10 10h4" stroke="#10B981" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "f-7": // Multi-Clinic / Pharmacy Chain: Connected Storefronts
      return (
        <svg viewBox="0 0 24 24" fill="none" className="size-6 stroke-[1.8] transition-transform duration-300 group-hover:scale-110">
          <rect x="3" y="4" width="11" height="17" rx="2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7 21v-3h3v3" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8.5 7.5v2.5M7.25 8.75h2.5" stroke="#10B981" strokeWidth="1.8" strokeLinecap="round" />
          {/* Branch 2 Building */}
          <path d="M14 8h5a2 2 0 0 1 2 2v11h-7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="2 1.5" />
          <circle cx="18" cy="14" r="1.2" fill="#34D399" />
        </svg>
      );
    case "f-8": // Role & Permission Security: Vault Padlock
      return (
        <svg viewBox="0 0 24 24" fill="none" className="size-6 stroke-[1.8] transition-transform duration-300 group-hover:scale-110">
          <rect x="3" y="11" width="18" height="11" rx="2.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="12" cy="16" r="1.6" fill="#10B981" />
          <path d="M12 17.6v2" stroke="#10B981" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "f-9": // White-Label Brand: Sparkling Storefront Star
      return (
        <svg viewBox="0 0 24 24" fill="none" className="size-6 stroke-[1.8] transition-transform duration-300 group-hover:scale-110">
          <path d="M12 2l2.6 6.2L21 9.5l-4.8 4.4 1.4 6.6-5.6-3.3-5.6 3.3 1.4-6.6L3 9.5l6.4-1.3L12 2z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" fill="currentColor" fillOpacity="0.1" />
          <circle cx="12" cy="11.5" r="2.2" fill="#10B981" className="transition-transform duration-300 group-hover:scale-125" />
        </svg>
      );
    case "f-10": // Financial Ledger: Tally Book with ₹ Rupee Symbol
      return (
        <svg viewBox="0 0 24 24" fill="none" className="size-6 stroke-[1.8] transition-transform duration-300 group-hover:scale-110">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
          {/* ₹ Rupee Symbol */}
          <path d="M9.5 6.5h5M9.5 9.2h4a1.8 1.8 0 0 0 0-3.6" stroke="#10B981" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M11.5 9.2l3.2 4.2" stroke="#10B981" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "f-11": // Automated Reminders: Resonating Alert Bell
      return (
        <svg viewBox="0 0 24 24" fill="none" className="size-6 stroke-[1.8] transition-transform duration-300 group-hover:scale-110">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
          {/* Wave Ripple Ring */}
          <path d="M19 4a4.5 4.5 0 0 1 2.5 3.5" stroke="#10B981" strokeWidth="1.8" strokeLinecap="round" className="transition-transform duration-300 group-hover:scale-115" />
          <circle cx="12" cy="8" r="1.5" fill="#10B981" />
        </svg>
      );
    case "f-12": // Comprehensive EHR: Dossier with Vital ECG Rhythm
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" className="size-6 stroke-[1.8] transition-transform duration-300 group-hover:scale-110">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
          {/* ECG Vital Wave */}
          <path d="M6 14.5h2.5l1.6-3.2 2.2 6.4 1.8-4.2 1.4 2 2.5-1" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-all duration-300 group-hover:stroke-emerald-300" />
        </svg>
      );
  }
}

/* Interlocking bento spans on a 6-column grid:
   Card 0 (3x2), Card 1 (3x1), Card 2 (3x1), Cards 3-5 (2x1 each),
   Cards 6-7 (3x1 each), Cards 8-10 (2x1 each), Card 11 (6x1 wide) */
const SPANS = [
  "sm:col-span-2 lg:col-span-3 lg:row-span-2",
  "lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-3",
  "lg:col-span-3",
  "lg:col-span-2",
  "lg:col-span-2",
  "lg:col-span-2",
  "sm:col-span-2 lg:col-span-6",
];

export function FeaturesBento({
  title = "Everything Your Clinic Needs",
  subtitle = "Purpose-built tools for modern healthcare professionals — from solo practitioners to multi-branch hospitals.",
  items,
}: {
  title?: string | null;
  subtitle?: string | null;
  items?: LandingItem[];
}) {
  // Always fallback to STATIC_FEATURES if dynamic items are missing or empty
  const displayItems =
    items && items.length > 0
      ? items.map((item, idx) => ({
          id: item.id ?? `f-${idx}`,
          title: item.title ?? STATIC_FEATURES[idx % STATIC_FEATURES.length].title,
          description:
            item.description ??
            STATIC_FEATURES[idx % STATIC_FEATURES.length].description,
          icon: STATIC_FEATURES[idx % STATIC_FEATURES.length].icon,
          badge: item.badge ?? undefined,
        }))
      : STATIC_FEATURES;

  return (
    <section className="relative overflow-hidden">
      <FallingPattern className="py-20 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="mx-auto mb-16 sm:mb-20 max-w-3xl text-center">
            <h2 className="font-main text-balance text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#03120E] leading-[1.08]">
              {title || "Everything Your Clinic Needs"}
            </h2>
            {subtitle && (
              <p className="font-secondary mx-auto mt-4 sm:mt-6 max-w-2xl text-pretty text-sm sm:text-xl leading-relaxed text-[#0E3E2E]/80 line-clamp-2 sm:line-clamp-none">
                {subtitle}
              </p>
            )}
          </div>

        {/* Bento Grid: 100% Static & Reliably Visible */}
        <div className="grid grid-flow-dense grid-cols-1 gap-5 sm:grid-cols-2 lg:auto-rows-[minmax(14rem,auto)] lg:grid-cols-6">
          {displayItems.map((item, i) => {
            const span = SPANS[i % SPANS.length];
            const theme = CARD_THEMES[i % CARD_THEMES.length];
            const featured = i === 0;
            const wide = i === displayItems.length - 1 && displayItems.length >= 12;

            /* Card 0: Featured Dark Clinical Prescription Card */
            if (featured) {
              return (
                <div
                  key={item.id}
                  className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border ${theme.borderClasses} ${theme.bgClasses} p-7 sm:p-8 lg:p-9 pb-8 sm:pb-9 text-[#FAF7F2] shadow-lg transition-all duration-300 hover:-translate-y-2 active:scale-[0.98] hover:shadow-[0_22px_45px_-12px_rgba(16,185,129,0.35)] ${span}`}
                >
                  {/* Background Image: Crisp and Vibrant with Subtle Transparent Mask */}
                  {theme.bgImage && (
                    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={theme.bgImage}
                        alt=""
                        className="size-full object-cover opacity-85 transition-transform duration-700 ease-out group-hover:scale-108"
                      />
                      <div className={`absolute inset-0 ${theme.imageOverlay || "bg-gradient-to-t from-[#02130D]/80 via-transparent to-black/20"}`} />
                    </div>
                  )}

                  {/* Subtle Background Radial Glow */}
                  <div className="pointer-events-none absolute -top-16 -right-16 size-60 rounded-full bg-emerald-500/15 blur-3xl" />

                  {/* Ambient Sheen Sweep on Hover */}
                  <span className="pointer-events-none absolute -inset-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 -rotate-45 translate-x-[-100%] group-hover:translate-x-[200%] z-20" />

                  {/* Top: Pill & Digital Prescription Badge Preview */}
                  <div className="relative z-10 flex items-start justify-between gap-4">
                    <span className={`flex size-12 items-center justify-center rounded-2xl ${theme.iconBg} ${theme.iconColor} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-2 shadow-sm`}>
                      <BentoIcon id={item.id} />
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-emerald-950/80 px-3 py-1 text-xs font-semibold text-emerald-300 backdrop-blur-md font-main">
                      <CheckCircle2 className="size-3 text-emerald-400" />
                      <span>Instant Verification</span>
                    </span>
                  </div>

                  {/* Middle: Clinical Rx Preview Widget */}
                  <div className="relative z-10 my-4 sm:my-5 rounded-2xl border border-emerald-500/25 bg-emerald-950/75 p-4.5 backdrop-blur-md shadow-inner">
                    <div className="flex items-center justify-between text-xs text-emerald-300/90 font-main">
                      <span>Rx #SK-9482</span>
                      <span className="text-emerald-400 font-semibold">Dr. A. Sharma</span>
                    </div>
                    <div className="mt-3 space-y-2">
                      <div className="flex items-center justify-between text-xs font-medium text-[#FAF7F2]">
                        <span>Amoxicillin 500mg</span>
                        <span className="text-emerald-300 font-semibold">1 Tab TDS · 5 Days</span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-[#FAF7F2]/80">
                        <span>Paracetamol 650mg</span>
                        <span className="text-emerald-300/80">SOS · Post Meals</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom: Title & Description */}
                  <div className="relative z-10">
                    <BlurryToClear
                      as="h3"
                      className="font-main text-2xl sm:text-[26px] font-bold text-[#FAF7F2] drop-shadow-sm"
                    >
                      {item.title}
                    </BlurryToClear>
                    <p className="font-secondary mt-1.5 sm:mt-2 text-xs sm:text-[15px] leading-relaxed text-emerald-100/90 drop-shadow-xs line-clamp-2 sm:line-clamp-none">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            }

            /* Card 11: Wide Electronic Health Record (EHR) Card */
            if (wide) {
              return (
                <div
                  key={item.id}
                  className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border ${theme.borderClasses} ${theme.bgClasses} p-7 sm:p-8 lg:p-9 text-[#FAF7F2] shadow-sm transition-all duration-300 hover:-translate-y-2 active:scale-[0.98] hover:shadow-[0_22px_45px_-12px_rgba(16,185,129,0.35)] md:flex-row md:items-center md:gap-8 lg:gap-12 ${span}`}
                >
                  {/* Background Image: Crisp with Light Translucent Mask */}
                  {theme.bgImage && (
                    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={theme.bgImage}
                        alt=""
                        className="size-full object-cover opacity-80 transition-transform duration-700 ease-out group-hover:scale-108"
                      />
                      <div className={`absolute inset-0 ${theme.imageOverlay || "bg-gradient-to-r from-[#031A12]/85 via-transparent to-black/35"}`} />
                    </div>
                  )}

                  {/* Ambient Sheen Sweep on Hover */}
                  <span className="pointer-events-none absolute -inset-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 -rotate-45 translate-x-[-100%] group-hover:translate-x-[200%] z-20" />

                  {/* Left Column: Icon, Title, Description, Tags */}
                  <div className="relative z-10 flex-1">
                    <div className={`mb-4 flex size-12 items-center justify-center rounded-2xl ${theme.iconBg} ${theme.iconColor} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-2 shadow-sm`}>
                      <BentoIcon id={item.id} />
                    </div>
                    <BlurryToClear
                      as="h3"
                      className="font-main text-2xl sm:text-[26px] font-bold text-[#FAF7F2] drop-shadow-sm"
                    >
                      {item.title}
                    </BlurryToClear>
                    <p className="font-secondary mt-1.5 sm:mt-2 max-w-xl text-xs sm:text-[15px] leading-relaxed text-emerald-100/90 drop-shadow-xs line-clamp-2 sm:line-clamp-none">
                      {item.description}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {[
                        "Instant History Search",
                        "Diagnostic Trendlines",
                        "Lab PDF Auto-Sync",
                        "Zero Data Loss",
                      ].map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-emerald-950/80 border border-emerald-400/30 px-3 py-1 text-xs font-semibold text-emerald-200 font-main backdrop-blur-md shadow-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: EHR Live Timeline Snippet */}
                  <div className="relative z-10 mt-6 w-full md:mt-0 md:w-80 shrink-0 rounded-2xl border border-emerald-400/30 bg-emerald-950/80 p-5 backdrop-blur-md shadow-xl">
                    <div className="flex items-center justify-between border-b border-emerald-400/20 pb-2.5 text-xs font-semibold text-emerald-200 font-main">
                      <span>Longitudinal Vitals</span>
                      <span className="text-emerald-400 font-bold">Live EHR</span>
                    </div>
                    <div className="mt-3.5 space-y-2.5 text-xs text-emerald-100/90 font-secondary">
                      <div className="flex justify-between">
                        <span className="text-emerald-300/80">Blood Pressure:</span>
                        <span className="font-semibold text-emerald-300">120/80 mmHg</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-emerald-300/80">HbA1c Trend:</span>
                        <span className="font-semibold text-emerald-300">5.6% (Normal)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-emerald-300/80">Next Review:</span>
                        <span className="font-semibold text-[#FAF7F2] font-main">
                          Scheduled Oct 28
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            /* Cards 1 - 10: Standard Bento Tiles with Rich Internal Padding & Hover Animations */
            return (
              <div
                key={item.id}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border ${theme.borderClasses} ${theme.bgClasses} p-6 sm:p-7 lg:p-7.5 pb-7 sm:pb-8 shadow-sm transition-all duration-300 hover:-translate-y-2 active:scale-[0.98] hover:shadow-[0_20px_45px_-12px_rgba(16,185,129,0.3)] ${span}`}
              >
                {/* Background Image: Crisp with Light Translucent Mask */}
                {theme.bgImage && (
                  <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={theme.bgImage}
                      alt=""
                      className="size-full object-cover opacity-85 transition-transform duration-700 ease-out group-hover:scale-108"
                    />
                    <div className={`absolute inset-0 ${theme.imageOverlay || "bg-gradient-to-t from-black/70 via-black/20 to-transparent"}`} />
                  </div>
                )}

                {/* Ambient Sheen Sweep on Hover */}
                <span className="pointer-events-none absolute -inset-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 -rotate-45 translate-x-[-100%] group-hover:translate-x-[200%] z-20" />

                <div className="relative z-10 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <span className={`flex size-11 items-center justify-center rounded-xl ${theme.iconBg} ${theme.iconColor} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-2 shadow-xs`}>
                        <BentoIcon id={item.id} />
                      </span>
                      {theme.badge && (
                        <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold font-main backdrop-blur-md ${theme.badge.bg} ${theme.badge.textCol} ${theme.badge.border}`}>
                          {theme.badge.text}
                        </span>
                      )}
                    </div>

                    <BlurryToClear
                      as="h3"
                      className={`font-main text-lg font-bold leading-snug drop-shadow-xs ${theme.isDark ? "text-[#FAF7F2]" : "text-[#03120E]"}`}
                    >
                      {item.title}
                    </BlurryToClear>
                    <p className={`font-secondary mt-1.5 sm:mt-2 text-xs sm:text-sm leading-relaxed line-clamp-2 sm:line-clamp-none ${theme.isDark ? "text-emerald-100/85" : "text-[#0E3E2E]/80"}`}>
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      </FallingPattern>
    </section>
  );
}

export default FeaturesBento;
