"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home, ShieldCheck } from "lucide-react";
import { MeshDriftBackground } from "@/components/ui/mesh-drift-background";
import { HudButton } from "@/components/ui/hud-button";
import { Logo } from "@/components/marketing/logo";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Unhandled error:", error);
  }, [error]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#03120E] text-[#FAF7F2] flex flex-col justify-between p-6 sm:p-10 select-none">
      {/* ── Background WebGL Drift Shader ── */}
      <MeshDriftBackground className="z-0 opacity-60" />

      {/* ── Ambient Radial Glow ── */}
      <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[760px] max-w-[95vw] h-[420px] bg-[radial-gradient(ellipse_at_center,rgba(239,68,68,0.15),rgba(16,185,129,0.15)_50%,transparent_75%)] blur-3xl z-10" />

      {/* ── Cybernetic Grid ── */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:4rem_4rem] z-10" />

      {/* Top Navbar */}
      <header className="relative z-20 mx-auto w-full max-w-6xl flex items-center justify-between">
        <Logo light={true} />
        <span className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/25 px-3 py-1 rounded-full">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>DPDP Secure Session</span>
        </span>
      </header>

      {/* Center Card */}
      <main className="relative z-20 mx-auto w-full max-w-lg text-center my-auto py-12">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400 mb-6 shadow-[0_0_25px_rgba(245,158,11,0.2)]">
          <AlertTriangle className="h-8 w-8" />
        </div>

        <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-semibold text-amber-300 font-main backdrop-blur-md mb-4">
          <span className="size-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span>System Notice · 500 Error Handled</span>
        </div>

        <h1 className="font-main text-3xl sm:text-4xl font-extrabold tracking-tight text-[#FAF7F2]">
          Clinical System Interruption
        </h1>

        <p className="font-secondary mx-auto mt-3 max-w-md text-sm sm:text-base leading-relaxed text-emerald-100/75">
          We encountered an unexpected operational anomaly. Clinical databases and patient records remain safe and untouched.
        </p>

        {error.digest && (
          <div className="mt-4 inline-block font-mono text-[11px] text-emerald-300/60 bg-black/40 border border-white/10 rounded-lg px-3 py-1">
            Digest Ref: {error.digest}
          </div>
        )}

        {/* Actions */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <button
            type="button"
            onClick={reset}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-[#10B981] via-[#059669] to-[#047857] px-6 py-3.5 text-sm font-bold text-white uppercase tracking-wider font-main shadow-[0_8px_20px_-4px_rgba(16,185,129,0.35)] hover:brightness-110 active:scale-[0.98] transition-all"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Try Again</span>
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.06] hover:bg-white/[0.12] px-6 py-3.5 text-sm font-semibold text-white font-main transition-all active:scale-[0.98] backdrop-blur-sm"
          >
            <Home className="h-4 w-4 text-emerald-400" />
            <span>Return to Safety</span>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-20 text-center text-xs text-emerald-300/40 font-mono">
        SkoraCares Automated Diagnostics · Incident Logged
      </footer>
    </div>
  );
}