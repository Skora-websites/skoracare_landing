import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, KeyRound, ShieldCheck } from "lucide-react";
import { ForgotPasswordForm } from "./forgot-password-form";
import { Logo } from "@/components/marketing/logo";

export const metadata: Metadata = {
  title: "Forgot Password | SkoraCares",
  description: "Recover access to your clinical operating system dashboard.",
};

export default function ForgotPasswordPage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#FAFBF9] flex flex-col justify-between p-6 sm:p-10">
      {/* ── Ambient Radial Emerald Glow ── */}
      <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] max-w-[90vw] h-[360px] bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.14),transparent_70%)] blur-3xl z-0" />

      {/* Top Header */}
      <header className="relative z-10 mx-auto w-full max-w-5xl flex items-center justify-between">
        <Logo light={false} />
        <Link
          href="/login"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 hover:text-emerald-900 transition-colors font-main"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to sign in</span>
        </Link>
      </header>

      {/* Center Form Card */}
      <main className="relative z-10 mx-auto w-full max-w-md my-auto py-10">
        <div className="rounded-3xl border border-emerald-900/10 bg-white p-8 sm:p-10 shadow-[0_20px_50px_-15px_rgba(3,18,14,0.06)]">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700 mb-6 border border-emerald-100 shadow-2xs">
            <KeyRound className="size-6" />
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-900/10 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800 font-main mb-3">
            <span className="size-1.5 rounded-full bg-emerald-600 animate-pulse" />
            <span>Account Recovery</span>
          </div>

          <h1 className="font-main text-2xl sm:text-3xl font-extrabold tracking-tight text-[#03120E]">
            Reset your password
          </h1>
          <p className="font-secondary mt-2 text-sm text-ink-muted leading-relaxed">
            Enter your clinic account email and we&apos;ll send you a secure verification link to choose a new password.
          </p>

          <div className="mt-6">
            <ForgotPasswordForm />
          </div>

          <p className="mt-8 text-center text-xs font-secondary text-ink-muted">
            Remembered your credentials?{" "}
            <Link
              href="/login"
              className="font-bold text-[#03120E] hover:text-emerald-700 underline underline-offset-4 decoration-emerald-500/40 transition-colors"
            >
              Sign in now
            </Link>
          </p>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-ink-muted">
          <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>Encrypted under Indian DPDP Act standards</span>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center text-xs text-ink-muted font-mono">
        © {new Date().getFullYear()} SkoraCares · Practice Management OS
      </footer>
    </div>
  );
}
