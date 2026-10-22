"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Home,
  Building2,
  Sparkles,
  BookOpen,
  PhoneCall,
  ChevronRight,
  ShieldCheck,
  MessageCircle,
  Activity,
  ArrowRight,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Logo } from "./logo";
import { HudButton } from "@/components/ui/hud-button";
import { cn } from "@/lib/utils";

type NavItem = {
  label: string;
  href: string;
  icon: typeof Home;
  badge?: string;
};

const NAV_ITEMS: NavItem[] = [
  {
    label: "Home",
    href: "/",
    icon: Home,
  },
  {
    label: "About",
    href: "/about",
    icon: Building2,
  },
  {
    label: "Blog",
    href: "/blog",
    icon: BookOpen,
  },
  {
    label: "Contact",
    href: "/contact",
    icon: PhoneCall,
  },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      const heroThreshold = Math.min(window.innerHeight * 0.7, 500);
      setScrolled(window.scrollY > heroThreshold);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close menu on ESC key press
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-3 sm:top-5 z-[100] flex justify-center px-4 pointer-events-none transition-all duration-700">
        <div
          className={cn(
            "pointer-events-auto relative flex items-center justify-between gap-4 sm:gap-6 md:gap-8 px-5 sm:px-7 py-2 sm:py-2.5 transition-all duration-700 ease-out",
            "rounded-tl-[24px] rounded-br-[24px] rounded-tr-[6px] rounded-bl-[6px]",
            scrolled
              ? "border border-emerald-500/30 bg-white/95 shadow-[0_20px_45px_-8px_rgba(15,23,42,0.16),0_0_25px_rgba(16,185,129,0.18)] backdrop-blur-xl"
              : "border border-transparent bg-white/0 shadow-none backdrop-blur-none"
          )}
        >
          {/* Subtle Neon Horizon Hairlines */}
          {scrolled && (
            <>
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-12 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-emerald-400/60 to-transparent"
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-12 bottom-0 h-[1.5px] bg-gradient-to-r from-transparent via-emerald-500/70 to-transparent"
              />
            </>
          )}

          {/* Brand Logo */}
          <Logo light={!scrolled} />

          {/* Desktop Nav Links */}
          <nav className="hidden items-center gap-6 md:flex">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-sm transition-colors py-1 relative",
                    scrolled
                      ? isActive
                        ? "text-emerald-600 font-bold"
                        : "text-slate-600 hover:text-slate-900 font-medium"
                      : isActive
                      ? "text-emerald-400 font-bold drop-shadow-xs"
                      : "text-[#FAF7F2]/80 hover:text-white font-medium"
                  )}
                >
                  {item.label}
                  {item.badge && (
                    <span className="ml-1.5 rounded-full bg-emerald-500/20 px-1.5 py-0.5 text-[9px] font-bold text-emerald-300 border border-emerald-500/30">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* CTA Actions */}
          <div className="hidden items-center gap-4 md:flex">
            <Link
              href="/login"
              className={cn(
                "text-sm font-medium transition-colors px-2 py-1",
                scrolled
                  ? "text-slate-700 hover:text-emerald-700"
                  : "text-[#FAF7F2]/85 hover:text-emerald-300"
              )}
            >
              Sign In
            </Link>
            <HudButton href="/signup" size="sm">
              Get Started
            </HudButton>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className={cn(
              "inline-flex h-10 w-10 sm:h-9 sm:w-9 items-center justify-center border md:hidden transition-all duration-300 rounded-tl-xl rounded-br-xl rounded-tr-xs rounded-bl-xs active:scale-95",
              scrolled
                ? "border-emerald-500/40 bg-white/80 text-slate-700 hover:bg-slate-100 shadow-sm"
                : "border-white/25 bg-white/10 text-white hover:bg-white/20 backdrop-blur-md"
            )}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* ── REDESIGNED PREMIUM MOBILE NAVIGATION OVERLAY ── */}
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[120] md:hidden flex flex-col justify-end p-0 sm:p-6 sm:justify-center">
            {/* Backdrop Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-black/75 backdrop-blur-md"
              aria-hidden
            />

            {/* Bottom Sheet Nav Panel: Slides Up into Viewport */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300, mass: 0.85 }}
              className="relative z-10 w-full max-w-lg mx-auto overflow-hidden rounded-t-[28px] rounded-b-none sm:rounded-[26px] border border-white/10 border-b-0 sm:border-b bg-[#071510]/95 shadow-[0_-15px_50px_rgba(0,0,0,0.65)] backdrop-blur-2xl text-white max-h-[92vh] flex flex-col"
            >
              {/* Bottom Sheet Grab Handle for Mobile */}
              <div className="pt-2.5 pb-0.5 flex justify-center sm:hidden" aria-hidden>
                <div className="h-1 w-10 rounded-full bg-white/20" />
              </div>

              {/* Header inside Mobile Panel */}
              <div className="flex items-center justify-between px-6 pt-4 pb-4 border-b border-white/[0.08]">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.06] border border-white/10 text-emerald-400">
                    <Activity className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <p className="font-main text-sm font-bold tracking-tight text-white">
                      Skora<span className="text-emerald-400">Cares</span>
                    </p>
                    <p className="text-[10px] uppercase font-mono tracking-wider text-slate-400">
                      Clinic OS Navigation
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex h-8.5 w-8.5 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-slate-300 hover:text-white hover:bg-white/[0.1] transition-colors active:scale-95"
                  aria-label="Close navigation"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Navigation Links List */}
              <div className="flex-1 overflow-y-auto px-4 py-3.5 space-y-1 scrollbar-thin">
                {NAV_ITEMS.map((item, index) => {
                  const isActive = pathname === item.href;
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.03 + 0.04, duration: 0.2 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "group relative flex items-center justify-between rounded-2xl p-3 sm:p-3.5 transition-all duration-200 active:scale-[0.98]",
                          isActive
                            ? "bg-white/[0.08] border border-emerald-500/30 text-white"
                            : "hover:bg-white/[0.04] border border-transparent text-slate-300"
                        )}
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          <div
                            className={cn(
                              "flex h-9.5 w-9.5 shrink-0 items-center justify-center rounded-xl transition-colors duration-200",
                              isActive
                                ? "bg-emerald-500/15 border border-emerald-500/30 text-emerald-400"
                                : "bg-white/[0.04] border border-white/5 text-slate-400 group-hover:text-emerald-300 group-hover:bg-white/[0.08]"
                            )}
                          >
                            <item.icon className="h-4.5 w-4.5" />
                          </div>

                          <div className="flex items-center gap-2 min-w-0">
                            <span className="font-main text-sm font-semibold tracking-tight text-white truncate">
                              {item.label}
                            </span>
                            {item.badge && (
                              <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-300 border border-emerald-500/25">
                                {item.badge}
                              </span>
                            )}
                          </div>
                        </div>

                        <ChevronRight
                          className={cn(
                            "h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1",
                            isActive ? "text-emerald-400" : "text-slate-600"
                          )}
                        />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Direct Support & WhatsApp Desk */}
              <div className="px-5 py-2.5 border-t border-white/[0.07] bg-black/20 flex items-center justify-between text-xs text-slate-400">
                <a
                  href="tel:+919217375831"
                  className="flex items-center gap-1.5 hover:text-slate-200 transition-colors"
                >
                  <PhoneCall className="h-3.5 w-3.5 text-emerald-400/80" />
                  <span>+91 921 7375 831</span>
                </a>
                <span className="text-slate-700">•</span>
                <a
                  href="https://wa.me/919217375831?text=Hi%2C%20I%20would%20like%20a%20demo%20of%20SkoraCares."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-emerald-300 transition-colors font-medium text-emerald-400"
                >
                  <MessageCircle className="h-3.5 w-3.5 text-emerald-400" />
                  <span>WhatsApp Desk</span>
                </a>
              </div>

              {/* Action Button Tray: Only Demo Button */}
              <div className="p-4 pb-6 sm:pb-4 border-t border-white/[0.07] bg-[#050F0B]/80">
                <HudButton
                  href="/contact#demo"
                  onClick={() => setOpen(false)}
                  className="w-full !py-3.5 justify-center text-xs tracking-wider"
                  showArrow
                >
                  Book Free Demo
                </HudButton>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;
