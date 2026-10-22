import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ShieldCheck, Calendar, User, Stethoscope, Lock } from "lucide-react";
import { getConsentBySlug } from "@/lib/queries/consent";
import { ConsentForm } from "./consent-form";
import { Logo } from "@/components/marketing/logo";

export const metadata: Metadata = { title: "Consultation Consent · SkoraCares" };

export default async function ConsentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const consent = await getConsentBySlug(slug);
  if (!consent) notFound();

  const decided = consent.isAccepted || consent.isRejected;
  if (decided) notFound();

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#FAFBF9] flex flex-col justify-between p-6 sm:p-10">
      {/* ── Ambient Radial Emerald Glow ── */}
      <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] max-w-[90vw] h-[360px] bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.15),transparent_70%)] blur-3xl z-0" />

      {/* Top Header */}
      <header className="relative z-10 mx-auto w-full max-w-5xl flex items-center justify-between">
        <Logo light={false} />
        <span className="flex items-center gap-1.5 text-xs font-mono text-emerald-800 bg-emerald-100/70 border border-emerald-200/80 px-3 py-1 rounded-full">
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-700" />
          <span>ABDM Verified Consent Request</span>
        </span>
      </header>

      {/* Main Consent Card */}
      <main className="relative z-10 mx-auto w-full max-w-lg my-auto py-10">
        <div className="rounded-3xl border border-emerald-900/10 bg-white p-8 sm:p-10 shadow-[0_20px_50px_-15px_rgba(3,18,14,0.06)]">
          <div className="flex items-center gap-3.5 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-100 shadow-2xs">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h1 className="font-main text-xl sm:text-2xl font-bold tracking-tight text-[#03120E]">
                Consultation Consent
              </h1>
              <p className="font-secondary text-xs sm:text-sm text-ink-muted">
                Please review the consultation details below.
              </p>
            </div>
          </div>

          <div className="space-y-3 rounded-2xl border border-gray-100 bg-gray-50/60 p-5 text-xs sm:text-sm">
            <div className="flex items-center justify-between border-b border-gray-200/50 pb-2.5">
              <span className="text-ink-muted flex items-center gap-1.5">
                <Stethoscope className="h-3.5 w-3.5 text-emerald-700" />
                Doctor
              </span>
              <span className="font-bold text-[#03120E]">{consent.doctorName}</span>
            </div>

            {consent.doctorQualification && (
              <div className="flex items-center justify-between border-b border-gray-200/50 pb-2.5">
                <span className="text-ink-muted">Qualification</span>
                <span className="font-semibold text-ink">{consent.doctorQualification}</span>
              </div>
            )}

            <div className="flex items-center justify-between border-b border-gray-200/50 pb-2.5">
              <span className="text-ink-muted flex items-center gap-1.5">
                <User className="h-3.5 w-3.5 text-emerald-700" />
                Patient
              </span>
              <span className="font-semibold text-ink">You</span>
            </div>

            {consent.appointmentDate && (
              <div className="flex items-center justify-between pt-0.5">
                <span className="text-ink-muted flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-emerald-700" />
                  Appointment
                </span>
                <span className="font-semibold text-[#03120E]">
                  {new Date(consent.appointmentDate).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                  {consent.appointmentTime ? ` at ${consent.appointmentTime}` : ""}
                </span>
              </div>
            )}
          </div>

          <p className="mt-5 text-xs leading-relaxed text-ink-muted font-secondary">
            I understand and consent to the medical consultation with the doctor named above, including examinations and diagnostic treatment recommendations. I confirm that the provided details are accurate.
          </p>

          <ConsentForm slug={consent.slug} />
        </div>

        <p className="mt-6 text-center text-xs text-ink-muted font-mono">
          Secured by SkoraCares · Encrypted via Indian DPDP Act standards
        </p>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center text-xs text-ink-muted font-mono">
        © {new Date().getFullYear()} SkoraCares · Clinical Operating System
      </footer>
    </div>
  );
}
