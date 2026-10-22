"use client";

import { useActionState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { requestPasswordReset } from "./actions";
import { HudButton } from "@/components/ui/hud-button";

const initialState = { error: null as string | null, sent: false };

export function ForgotPasswordForm() {
  const [state, formAction, pending] = useActionState(requestPasswordReset, initialState);

  if (state.sent) {
    return (
      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-50/60 p-6 text-center animate-in fade-in-50 duration-300">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 mb-3">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <p className="font-main text-sm font-bold text-[#03120E]">
          Recovery Link Dispatched
        </p>
        <p className="font-secondary mt-1 text-xs text-ink-muted leading-relaxed">
          {state.error ?? "If an account exists for that email, a password reset link has been dispatched. It remains active for 60 minutes."}
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label
          htmlFor="email"
          className="block text-xs font-bold uppercase tracking-wider text-[#03120E] mb-1.5"
        >
          Registered Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="doctor@clinic.com"
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-ink placeholder:text-gray-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200"
        />
      </div>

      {state.error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-3.5 text-xs font-semibold text-red-700">
          {state.error}
        </div>
      )}

      <div className="pt-2">
        <HudButton
          type="submit"
          disabled={pending}
          showArrow
          className="w-full !py-3.5 justify-center"
        >
          {pending ? "Sending Link…" : "Send Password Reset Link"}
        </HudButton>
      </div>
    </form>
  );
}
