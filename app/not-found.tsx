import Link from "next/link";
import { ArrowLeft, Home, Search, ShieldAlert, Sparkles, HelpCircle } from "lucide-react";
import { MeshDriftBackground } from "@/components/ui/mesh-drift-background";
import { HudButton } from "@/components/ui/hud-button";
import { Logo } from "@/components/marketing/logo";

export default function NotFoundPage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#03120E] text-[#FAF7F2] flex flex-col justify-between p-6 sm:p-10 select-none">
      {/* ── WebGL Shader Animated Drift Gradient ── */}
      <MeshDriftBackground className="z-0 opacity-70" />

      {/* ── Ambient Radial Emerald Aura ── */}
      <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[760px] max-w-[95vw] h-[420px] bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.25),rgba(4,29,20,0.6)_60%,transparent_75%)] blur-3xl z-10" />

      {/* ── Geometric Cybernetic Grid ── */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] z-10" />

      {/* Top Navbar Header */}
      <header className="relative z-20 mx-auto w-full max-w-6xl flex items-center justify-between">
        <Logo light={true} />
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-300 hover:text-white transition-colors font-main"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Back to safety</span>
        </Link>
      </header>

      {/* Center 404 Visual Content */}
      <main className="relative z-20 mx-auto w-full max-w-xl text-center my-auto py-12">
        {/* Status Chip */}
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-300 font-main backdrop-blur-md mb-6 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
          <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Error 404 · Unresolved Destination</span>
        </div>

        {/* 404 Title */}
        <h1 className="font-main text-7xl sm:text-9xl font-black tracking-tight text-white drop-shadow-[0_8px_32px_rgba(16,185,129,0.35)] leading-none">
          404
        </h1>

        <h2 className="mt-4 font-main text-2xl sm:text-3xl font-extrabold tracking-tight text-[#FAF7F2]">
          Page Not Found in Clinical Registry
        </h2>

        <p className="font-secondary mx-auto mt-3 max-w-md text-sm sm:text-base leading-relaxed text-emerald-100/75">
          The page or record you are searching for does not exist, has been archived, or was moved during our system update.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <HudButton href="/" showArrow className="w-full sm:w-auto">
            Return to Homepage
          </HudButton>

          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.06] hover:bg-white/[0.12] px-6 py-3.5 text-sm font-semibold text-white font-main transition-all active:scale-[0.98] backdrop-blur-sm"
          >
            <HelpCircle className="h-4 w-4 text-emerald-400" />
            <span>Contact Support</span>
          </Link>
        </div>

        {/* Quick Nav Links */}
        <div className="mt-12 pt-8 border-t border-white/[0.08] flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-emerald-200/60 font-main">
          <Link href="/about" className="hover:text-white transition-colors">
            About Us
          </Link>
          <span>•</span>
          <Link href="/pricing" className="hover:text-white transition-colors">
            Pricing Plans
          </Link>
          <span>•</span>
          <Link href="/blog" className="hover:text-white transition-colors">
            Blog
          </Link>
          <span>•</span>
          <Link href="/login" className="hover:text-white transition-colors">
            Doctor Login
          </Link>
        </div>
      </main>

      {/* Footer Tag */}
      <footer className="relative z-20 text-center text-xs text-emerald-300/40 font-mono">
        Secured by SkoraCares · Tier-4 Clinical Infrastructure
      </footer>
    </div>
  );
}