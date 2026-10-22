import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Stethoscope, Activity, Sparkles, CheckCircle2 } from "lucide-react";
import { LoginForm } from "./login-form";
import { MeshDriftBackground } from "@/components/ui/mesh-drift-background";
import { Logo } from "@/components/marketing/logo";

export const metadata: Metadata = {
  title: "Doctor & Clinic Sign In | SkoraCares",
  description: "Sign in to your clinical operating system. Access appointments, digital prescriptions, and patient records.",
};

export default function LoginPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-[1.1fr_0.9fr] bg-[#FAFBF9]">
      {/* ── LEFT: IMMERSIVE BRAND PANEL (DESKTOP) ── */}
      <div className="relative hidden overflow-hidden bg-[#03120E] text-[#FAF7F2] lg:flex flex-col justify-between p-12 lg:p-16 select-none">
        {/* Animated WebGL Mesh Drift Gradient */}
        <MeshDriftBackground className="z-0 opacity-60" />

        {/* Ambient Top Glow */}
        <div className="pointer-events-none absolute -top-32 left-1/4 w-96 h-96 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.22),transparent_70%)] blur-3xl z-10" />

        {/* Subtle Cybernetic Grid */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] z-10" />

        {/* Header */}
        <div className="relative z-20">
          <Logo light={true} />
        </div>

        {/* Center Editorial Narrative */}
        <div className="relative z-20 my-auto py-10 max-w-lg">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-400 font-main backdrop-blur-md mb-6">
            <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Clinical Workspace</span>
          </div>

          <h1 className="font-main text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.14]">
            Unified Care,{" "}
            <span className="text-emerald-400">Zero Administrative Lag.</span>
          </h1>

          <p className="font-secondary mt-5 text-base lg:text-lg leading-relaxed text-emerald-100/75">
            Log in to manage appointments, dispense authenticated WhatsApp prescriptions, track daybooks, and sync multi-clinic operations seamlessly.
          </p>

          {/* Quick Pillars */}
          <div className="mt-8 space-y-3">
            {[
              "Instant prescription generation with verified clinical templates",
              "Automated GST billing, daybooks and ledger tracking",
              "100% Indian data sovereignty under the DPDP Act",
            ].map((text) => (
              <div key={text} className="flex items-center gap-3 text-sm text-emerald-100/90 font-secondary">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <CheckCircle2 className="size-3.5" />
                </span>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Note */}
        <div className="relative z-20 flex items-center justify-between text-xs text-emerald-300/60 font-mono border-t border-emerald-900/40 pt-6">
          <span>Tier-4 Cloud Infrastructure</span>
          <span>© {new Date().getFullYear()} SkoraCares</span>
        </div>
      </div>

      {/* ── RIGHT: AUTHENTICATION FORM PANEL ── */}
      <div className="flex items-center justify-center px-6 py-12 lg:px-12 lg:py-20 bg-[#FAFBF9]">
        <div className="w-full max-w-md">
          {/* Mobile Logo & Brand Header */}
          <div className="mb-8 text-center lg:text-left">
            <div className="lg:hidden mb-6 flex justify-center">
              <Logo light={false} />
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-900/10 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800 font-main mb-3">
              <span className="size-1.5 rounded-full bg-emerald-600 animate-pulse" />
              <span>Practitioner Portal</span>
            </div>

            <h2 className="font-main text-3xl font-extrabold tracking-tight text-[#03120E]">
              Sign in to your clinic
            </h2>
            <p className="font-secondary mt-2 text-sm text-ink-muted">
              Enter your registered practitioner email and password to access your dashboard.
            </p>
          </div>

          {/* Login Form Component */}
          <LoginForm />

          {/* Helper Links */}
          <div className="mt-8 space-y-3 text-center text-sm font-secondary">
            <p>
              <Link
                href="/forgot-password"
                className="font-semibold text-emerald-700 hover:text-emerald-900 transition-colors"
              >
                Forgot your password?
              </Link>
            </p>
            <p className="text-ink-muted">
              Don&apos;t have an account yet?{" "}
              <Link
                href="/signup"
                className="font-bold text-[#03120E] hover:text-emerald-700 underline underline-offset-4 decoration-emerald-500/40 transition-colors"
              >
                Register your clinic
              </Link>
            </p>
          </div>

          {/* Security Assurance */}
          <div className="mt-10 pt-6 border-t border-gray-200/80 flex items-center justify-center gap-2 text-xs text-ink-muted">
            <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
            <span>256-bit TLS encrypted & ABDM compliant</span>
          </div>
        </div>
      </div>
    </div>
  );
}
