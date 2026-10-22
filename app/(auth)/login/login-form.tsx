"use client";

import { useActionState, useState } from "react";
import { LogIn, ShieldAlert, ArrowRight, Lock, Mail } from "lucide-react";
import { loginAction } from "./actions";
import { HudButton } from "@/components/ui/hud-button";

const initialState = { error: null as string | null };

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);
  const [lastError, setLastError] = useState<string | null>(null);
  const [dismissed, setDismissed] = useState(false);

  if (state.error !== lastError) {
    setLastError(state.error);
    setDismissed(false);
  }
  const visibleError = state.error && !dismissed ? state.error : null;

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <label
          htmlFor="email"
          className="block text-xs font-bold uppercase tracking-wider text-[#03120E] mb-1.5"
        >
          Email address
        </label>
        <div className="relative">
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="doctor@clinic.com"
            onInput={() => setDismissed(true)}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-ink placeholder:text-gray-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-xs font-bold uppercase tracking-wider text-[#03120E] mb-1.5"
        >
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            placeholder="••••••••"
            onInput={() => setDismissed(true)}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-ink placeholder:text-gray-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200"
          />
        </div>
      </div>

      {visibleError && (
        <div
          role="alert"
          aria-live="assertive"
          className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50/80 p-4 animate-in fade-in-50 duration-200"
        >
          <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-red-600" aria-hidden="true" />
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-red-800">
              Authentication Notice
            </p>
            <p className="mt-0.5 text-xs text-red-700 leading-relaxed">{visibleError}</p>
          </div>
        </div>
      )}

      <div className="pt-2">
        <HudButton
          type="submit"
          disabled={pending}
          showArrow
          className="w-full !py-3.5 justify-center"
        >
          {pending ? "Authenticating…" : "Sign in to Dashboard"}
        </HudButton>
      </div>
    </form>
  );
}
