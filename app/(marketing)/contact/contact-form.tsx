"use client";

import { useActionState } from "react";
import { CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import { bookDemo } from "./actions";
import { HudButton } from "@/components/ui/hud-button";

const initialState = { success: false, error: null as string | null };

export function ContactForm() {
  const [state, formAction, pending] = useActionState(bookDemo, initialState);

  return (
    <div
      className="relative rounded-3xl border border-emerald-900/10 bg-white/90 p-8 sm:p-10 shadow-[0_20px_50px_-15px_rgba(3,18,14,0.06)] backdrop-blur-md transition-all duration-300 hover:shadow-[0_25px_60px_-15px_rgba(3,18,14,0.1)]"
      id="demo"
    >
      {/* Decorative top accent line */}
      <div className="absolute inset-x-8 top-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />

      <div className="flex items-center gap-2">
        <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="font-main text-xs font-semibold tracking-wider text-emerald-700 uppercase">
          Direct Access
        </span>
      </div>

      <h2 className="mt-2 font-main text-2xl sm:text-3xl font-extrabold tracking-tight text-[#03120E]">
        Book a Personalized Demo
      </h2>
      <p className="mt-2 text-sm sm:text-base leading-relaxed text-ink-muted">
        Experience how SkoraCares reduces clinic admin by 40% and speeds up patient consultations.
      </p>

      {state.success ? (
        <div className="mt-8 rounded-2xl border border-emerald-500/30 bg-emerald-50/60 p-8 text-center animate-in fade-in-50 zoom-in-95 duration-300">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 shadow-inner">
            <CheckCircle2 className="h-9 w-9 text-emerald-600" />
          </div>
          <h3 className="mt-4 font-main text-xl font-bold text-[#03120E]">Demo Request Received!</h3>
          <p className="mt-2 text-sm text-ink-muted max-w-md mx-auto">
            Our clinical specialist will reach out within one business day via phone and WhatsApp to configure your customized walkthrough.
          </p>
        </div>
      ) : (
        <form action={formAction} className="mt-8 space-y-5">
          {/* Honeypot field for bot/crawler interception (hidden from humans) */}
          <div className="sr-only" aria-hidden="true">
            <label htmlFor="company_website">Leave this field blank</label>
            <input
              id="company_website"
              name="company_website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-[#03120E] mb-1.5">
                Full name <span className="text-emerald-600">*</span>
              </label>
              <input
                id="name"
                name="name"
                required
                placeholder="Dr. Ramesh Kumar"
                className="w-full rounded-xl border border-gray-200 bg-gray-50/60 px-4 py-3 text-sm text-ink placeholder:text-gray-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-[#03120E] mb-1.5">
                Work Email <span className="text-emerald-600">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="doctor@clinic.com"
                className="w-full rounded-xl border border-gray-200 bg-gray-50/60 px-4 py-3 text-sm text-ink placeholder:text-gray-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200"
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-[#03120E] mb-1.5">
                Phone / WhatsApp <span className="text-emerald-600">*</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                placeholder="+91 98765 43210"
                className="w-full rounded-xl border border-gray-200 bg-gray-50/60 px-4 py-3 text-sm text-ink placeholder:text-gray-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200"
              />
            </div>
            <div>
              <label htmlFor="clinic" className="block text-xs font-bold uppercase tracking-wider text-[#03120E] mb-1.5">
                Practice / Clinic Name
              </label>
              <input
                id="clinic"
                name="clinic"
                placeholder="City Heart & Multi-Specialty Clinic"
                className="w-full rounded-xl border border-gray-200 bg-gray-50/60 px-4 py-3 text-sm text-ink placeholder:text-gray-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200"
              />
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-[#03120E] mb-1.5">
              Practice Details & Special Requirements
            </label>
            <textarea
              id="message"
              name="message"
              rows={3}
              placeholder="Tell us about your daily patient footfall, number of doctors, or specific modules needed (Rx, Billing, Pharmacy, Diagnostics)…"
              className="w-full rounded-xl border border-gray-200 bg-gray-50/60 px-4 py-3 text-sm text-ink placeholder:text-gray-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 resize-none transition-all duration-200"
            />
          </div>

          {state.error && (
            <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {state.error}
            </p>
          )}

          <div className="pt-2">
            <HudButton
              type="submit"
              disabled={pending}
              showArrow
              className="w-full !py-4 justify-center"
            >
              {pending ? "Submitting Request…" : "Request Live Demo"}
            </HudButton>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs text-ink-muted border-t border-gray-100">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              100% confidential & zero spam
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-emerald-600" />
              Free 15-day guided trial
            </span>
          </div>
        </form>
      )}
    </div>
  );
}
