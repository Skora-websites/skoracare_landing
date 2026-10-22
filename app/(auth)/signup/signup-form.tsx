"use client";

import Link from "next/link";
import { useActionState, useState, useTransition } from "react";
import { UserPlus, Stethoscope, User, ShieldCheck } from "lucide-react";
import { signupAction } from "./actions";
import { sendSignupOtp } from "./otp-actions";
import { HudButton } from "@/components/ui/hud-button";

const initialState = { error: null as string | null };

export function SignupForm() {
  const [state, formAction, pending] = useActionState(signupAction, initialState);
  const [role, setRole] = useState<"patient" | "doctor">("doctor");
  const [otpSending, startOtpSend] = useTransition();
  const [otpSent, setOtpSent] = useState(false);
  const [otpMessage, setOtpMessage] = useState<string | null>(null);

  function handleSendOtp() {
    const email = (document.getElementById("email") as HTMLInputElement | null)?.value ?? "";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setOtpMessage("Enter a valid email address first.");
      return;
    }
    setOtpMessage(null);
    startOtpSend(async () => {
      const fd = new FormData();
      fd.set("email", email);
      const res = await sendSignupOtp(initialState, fd);
      if (res.error) setOtpMessage(res.error);
      else {
        setOtpSent(true);
        setOtpMessage(
          res.devOtp
            ? `OTP sent! (Dev mode — your OTP is ${res.devOtp})`
            : "OTP sent! Check your email."
        );
      }
    });
  }

  return (
    <form action={formAction} className="mt-8 space-y-4 sm:space-y-5">
      {/* Role Selection */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-[#03120E] mb-2">
          Account Category
        </label>
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => setRole("doctor")}
            className={`flex items-center justify-center gap-2 rounded-xl border-2 py-3 px-3 text-xs sm:text-sm font-bold font-main transition-all ${
              role === "doctor"
                ? "border-emerald-600 bg-emerald-50 text-emerald-900 shadow-xs"
                : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
            }`}
          >
            <Stethoscope className="h-4 w-4 text-emerald-600" />
            Doctor / Clinic
          </button>
          <button
            type="button"
            onClick={() => setRole("patient")}
            className={`flex items-center justify-center gap-2 rounded-xl border-2 py-3 px-3 text-xs sm:text-sm font-bold font-main transition-all ${
              role === "patient"
                ? "border-emerald-600 bg-emerald-50 text-emerald-900 shadow-xs"
                : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
            }`}
          >
            <User className="h-4 w-4 text-emerald-600" />
            Patient
          </button>
        </div>
        <input type="hidden" name="role" value={role} />
        {role === "doctor" && (
          <p className="mt-2 rounded-xl border border-emerald-200 bg-emerald-50/70 px-3.5 py-2 text-xs font-medium text-emerald-800 flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-emerald-600 animate-pulse" />
            Doctor accounts include a 15-day free trial — zero credit card required.
          </p>
        )}
      </div>

      <div>
        <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-[#03120E] mb-1.5">
          Full Name
        </label>
        <input
          id="name"
          name="name"
          required
          placeholder="Dr. Rajesh Sharma"
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-ink placeholder:text-gray-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-[#03120E] mb-1.5">
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          placeholder="doctor@clinic.com"
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-ink placeholder:text-gray-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200"
        />
      </div>

      <div className="grid grid-cols-2 gap-3.5">
        <div>
          <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-[#03120E] mb-1.5">
            Phone / WhatsApp
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            placeholder="98XXXXXXXX"
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-ink placeholder:text-gray-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200"
          />
        </div>
        <div>
          <label htmlFor="gender" className="block text-xs font-bold uppercase tracking-wider text-[#03120E] mb-1.5">
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-ink focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200"
            defaultValue=""
          >
            <option value="" disabled>
              Select
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      {/* OTP verification */}
      <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/50 p-4">
        <label htmlFor="otp" className="block text-xs font-bold uppercase tracking-wider text-emerald-900 mb-1.5">
          Email OTP Verification
        </label>
        <div className="flex gap-2">
          <input
            id="otp"
            name="otp"
            type="text"
            inputMode="numeric"
            maxLength={6}
            placeholder="6-digit code"
            className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-ink placeholder:text-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
          />
          <button
            type="button"
            onClick={handleSendOtp}
            disabled={otpSending || otpSent}
            className="shrink-0 rounded-xl border border-emerald-600 bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-emerald-700 active:scale-[0.98] disabled:opacity-60 transition-all"
          >
            {otpSending ? "Sending…" : otpSent ? "OTP sent ✓" : "Send OTP"}
          </button>
        </div>
        {otpMessage && (
          <p className="mt-2 text-xs font-semibold text-emerald-800">{otpMessage}</p>
        )}
        <p className="mt-1 text-[11px] text-ink-muted">
          We&apos;ll dispatch a 6-digit verification code to confirm your email.
        </p>
      </div>

      <div>
        <label htmlFor="password" className="block text-xs font-bold uppercase tracking-wider text-[#03120E] mb-1.5">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={8}
          placeholder="At least 8 characters"
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-ink placeholder:text-gray-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200"
        />
      </div>

      <div>
        <label htmlFor="password_confirmation" className="block text-xs font-bold uppercase tracking-wider text-[#03120E] mb-1.5">
          Confirm Password
        </label>
        <input
          id="password_confirmation"
          name="password_confirmation"
          type="password"
          required
          placeholder="Repeat your password"
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-ink placeholder:text-gray-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200"
        />
      </div>

      {state.error && (
        <p className="rounded-xl border border-red-200 bg-red-50 p-4 text-xs font-semibold text-red-700">
          {state.error}
        </p>
      )}

      <div className="pt-2">
        <HudButton
          type="submit"
          disabled={pending}
          showArrow
          className="w-full !py-3.5 justify-center"
        >
          {pending ? "Creating account…" : "Complete Account Registration"}
        </HudButton>
      </div>

      <p className="text-center text-xs leading-relaxed text-ink-muted pt-1">
        By registering you agree to our{" "}
        <Link href="/terms-conditions" className="text-emerald-700 font-semibold hover:underline">
          Terms
        </Link>{" "}
        and{" "}
        <Link href="/privacy-policy" className="text-emerald-700 font-semibold hover:underline">
          Privacy Policy
        </Link>
        .
      </p>
    </form>
  );
}
