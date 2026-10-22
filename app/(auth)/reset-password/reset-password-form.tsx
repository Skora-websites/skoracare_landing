"use client";

import { useActionState } from "react";
import { KeyRound, CheckCircle2, ShieldAlert } from "lucide-react";
import { resetPassword } from "./actions";
import { HudButton } from "@/components/ui/hud-button";

const initialState = { error: null as string | null, ok: false };

export function ResetPasswordForm({ email, token }: { email: string; token: string }) {
  const [state, formAction, pending] = useActionState(resetPassword, initialState);

  if (state.ok) {
    return (
      <div className="rounded-2xl border border-emerald-500/30 bg-emerald-50/60 p-6 text-center animate-in fade-in-50 duration-300">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600 mb-3">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <p className="font-main text-sm font-bold text-[#03120E]">
          Password Updated Successfully
        </p>
        <p className="font-secondary mt-1 text-xs text-ink-muted leading-relaxed">
          All existing sessions have been signed out for security. You can now sign in with your updated credentials.
        </p>
      </div>
    );
  }

  if (!email || !token) {
    return (
      <div className="rounded-2xl border border-amber-300 bg-amber-50/80 p-5 text-center">
        <ShieldAlert className="mx-auto h-6 w-6 text-amber-600 mb-2" />
        <p className="text-xs font-bold text-amber-900 uppercase">
          Incomplete Reset Token
        </p>
        <p className="mt-1 text-xs text-amber-800">
          This password reset link is invalid or has expired. Please request a new recovery link from the sign-in page.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="email" value={email} />
      <input type="hidden" name="token" value={token} />

      <div>
        <label htmlFor="password" className="block text-xs font-bold uppercase tracking-wider text-[#03120E] mb-1.5">
          New Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
          placeholder="Min 8 characters"
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-ink placeholder:text-gray-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200"
        />
      </div>

      <div>
        <label htmlFor="confirm" className="block text-xs font-bold uppercase tracking-wider text-[#03120E] mb-1.5">
          Confirm New Password
        </label>
        <input
          id="confirm"
          name="confirm"
          type="password"
          required
          autoComplete="new-password"
          placeholder="Repeat the new password"
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
          {pending ? "Updating…" : "Update Password"}
        </HudButton>
      </div>
    </form>
  );
}
