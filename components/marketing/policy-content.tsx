import Link from "next/link";
import { PageHeader } from "./page-header";
import { ArrowCta } from "@/components/ui/arrow-cta";
import { Shield, FileText } from "lucide-react";

const POLICY_LINKS = [
  { href: "/terms-conditions", label: "Terms & Conditions" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/refund-policy", label: "Refund Policy" },
  { href: "/cancellation-policy", label: "Cancellation Policy" },
];

export function PolicyContent({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#FAFBF9] min-h-screen">
      <PageHeader
        badge="Legal & Compliance"
        title={title}
        subtitle={`Effective Date & Last Updated: ${updated} • Standard Clinical Governance`}
      />

      <section className="py-16 lg:py-24 relative">
        <div className="mx-auto max-w-5xl px-5 lg:px-8">
          {/* Quick Policy Navigation Tabs */}
          <div className="mb-10 flex flex-wrap items-center gap-2 border-b border-emerald-900/10 pb-4">
            <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-ink-muted mr-3">
              <FileText className="h-4 w-4 text-emerald-600" /> Documents:
            </span>
            {POLICY_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-1.5 text-xs font-semibold text-ink-muted hover:text-[#03120E] hover:bg-emerald-50 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Policy Card Body */}
          <div className="rounded-3xl border border-emerald-900/10 bg-white p-8 sm:p-14 shadow-[0_15px_40px_-15px_rgba(3,18,14,0.05)]">
            <div className="mb-8 flex items-center gap-3 border-b border-gray-100 pb-6 text-xs text-ink-muted">
              <Shield className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>
                Compliant with Information Technology Act, 2000 and Digital Personal Data Protection (DPDP) Act, India.
              </span>
            </div>

            <div className="space-y-10">{children}</div>
          </div>
        </div>
      </section>

      {/* Universal Bottom Closing CTA */}
      <ArrowCta />
    </div>
  );
}

export function PolicyBlock({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <div className="group border-l-2 border-emerald-500/30 pl-5 sm:pl-6 transition-colors hover:border-emerald-600">
      <h2 className="font-main text-xl sm:text-2xl font-bold tracking-tight text-[#03120E]">
        {heading}
      </h2>
      <div className="mt-3.5 space-y-3.5 text-sm sm:text-base leading-relaxed text-ink-muted">
        {children}
      </div>
    </div>
  );
}
