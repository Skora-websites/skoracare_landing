import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/user";
import { getCompanySettings } from "@/lib/queries/landing";
import { logoutAction } from "@/lib/actions/auth";
import { isRazorpayConfigured } from "@/lib/packages/razorpay";
import { getPackagePricing } from "@/lib/packages/config";
import { PackageCheckoutButton } from "@/components/packages/package-checkout-button";
import { PhoneCall, Mail, MessageCircle, LogOut, ShieldCheck, Check, Sparkles } from "lucide-react";
import { Logo } from "@/components/marketing/logo";

export const metadata: Metadata = { title: "Trial Plan Expired · SkoraCares" };

export default async function TrialExpiredPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== "doctor" || !user.trialEndsAt || user.trialEndsAt > new Date()) {
    redirect(user ? (user.role === "doctor" ? "/doctor" : "/") : "/login");
  }

  const settings = await getCompanySettings();
  const supportEmail = settings?.companyEmail1 ?? "info@skoracares.com";
  const supportPhone = settings?.companyMobile1 ?? "+91 921 7375 831";
  const rawPhone = supportPhone.replace(/[^0-9+]/g, "");
  const cleanWhatsapp = rawPhone.replace("+", "");
  const wa = cleanWhatsapp.length === 10 ? `91${cleanWhatsapp}` : cleanWhatsapp;

  const message = encodeURIComponent(
    `Hi, my trial plan on SkoraCares has ended.\nDoctor: ${user.name}\nEmail: ${user.email}\nI would like to renew or extend my plan.`
  );
  const whatsappUrl = `https://wa.me/${wa}?text=${message}`;
  const emailUrl = `mailto:${supportEmail}?subject=${encodeURIComponent(`Subscription Renewal Request - ${user.name}`)}&body=${message}`;
  const callUrl = `tel:${rawPhone}`;

  const renewPlanId = "package-2";
  const renewPricing = isRazorpayConfigured() ? getPackagePricing(renewPlanId, "monthly") : null;

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#03120E] text-[#FAF7F2] flex items-center justify-center p-5 sm:p-8">
      {/* ── Ambient Radial Emerald Glow ── */}
      <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 w-[760px] max-w-[95vw] h-[420px] bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.2),rgba(4,29,20,0.6)_60%,transparent_75%)] blur-3xl z-0" />

      {/* Main Split Modal Container */}
      <div className="relative z-10 w-full max-w-4xl overflow-hidden rounded-[32px] border border-emerald-500/30 bg-[#041D14]/90 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_35px_rgba(16,185,129,0.15)] backdrop-blur-xl grid lg:grid-cols-2">
        {/* Left Column: Brand & Status Narrative */}
        <div className="p-8 sm:p-12 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-emerald-900/40 relative">
          <div>
            <Logo light={true} />

            <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-semibold text-amber-300 font-main">
              <span className="size-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span>15-Day Trial Period Concluded</span>
            </div>

            <h1 className="mt-4 font-main text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              Your trial period has concluded
            </h1>

            <p className="font-secondary mt-3 text-sm sm:text-base leading-relaxed text-emerald-100/75">
              Doctor <strong className="text-white">{user.name}</strong>, your clinic records and prescription templates are securely saved. Choose a plan to resume full OPD access.
            </p>

            <ul className="mt-6 space-y-2.5 text-xs sm:text-sm text-emerald-100/80 font-secondary">
              {[
                "Prescription history & patient medical records intact",
                "Instant reactivation with zero data loss",
                "Compliant with Indian DPDP Act standards",
              ].map((f) => (
                <li key={f} className="flex items-center gap-2.5">
                  <span className="flex size-4.5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                    <Check className="size-3" strokeWidth={3} />
                  </span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Need Extension Card */}
          <div className="mt-8 rounded-2xl border border-emerald-500/20 bg-emerald-950/40 p-5">
            <h3 className="font-main text-sm font-bold text-white flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-emerald-400" />
              Need a temporary extension?
            </h3>
            <p className="mt-1 text-xs text-emerald-200/70 leading-relaxed font-secondary">
              If your clinic requires extra evaluation days, speak directly with our clinical desk on WhatsApp.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-3.5 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white hover:bg-emerald-500 transition-colors shadow-sm font-main"
            >
              <MessageCircle className="h-4 w-4" />
              Request Trial Extension
            </a>
          </div>
        </div>

        {/* Right Column: Instant Self-Serve Renewal & Help Desk */}
        <div className="p-8 sm:p-12 bg-white text-slate-900 flex flex-col justify-between">
          <div>
            <span className="font-main text-xs font-bold uppercase tracking-widest text-emerald-700">
              Immediate Unlock
            </span>
            <h2 className="mt-1 font-main text-2xl sm:text-3xl font-extrabold tracking-tight text-[#03120E]">
              Select Your Plan
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-ink-muted font-secondary">
              Instant activation via UPI, Cards, or Netbanking.
            </p>

            {renewPricing && (
              <div className="mt-6 rounded-2xl border-2 border-emerald-500/30 bg-emerald-50/50 p-6 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="font-main text-sm font-bold text-emerald-900">
                    Recommended: {renewPricing.plan.name}
                  </span>
                  <span className="font-main text-xs font-bold bg-emerald-600 text-white px-2.5 py-0.5 rounded-full">
                    Popular
                  </span>
                </div>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="font-main text-4xl font-extrabold text-[#03120E]">
                    ₹{(renewPricing.amount / 100).toLocaleString("en-IN")}
                  </span>
                  <span className="text-xs text-ink-muted">/month</span>
                </div>
                <p className="mt-2 text-xs text-ink-muted leading-relaxed font-secondary">
                  Up to 3 doctors, full digital Rx dispensing, automated WhatsApp deliveries, and multi-vendor lab integration.
                </p>

                <div className="mt-4">
                  <PackageCheckoutButton
                    packageId={renewPlanId}
                    packageName={renewPricing.plan.name}
                    period="monthly"
                    label={`Reactivate Now · ₹${(renewPricing.amount / 100).toLocaleString("en-IN")}`}
                    buyer={{ name: user.name, email: user.email, phone: user.phone }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Direct Clinical Support Channels */}
          <div className="mt-8 pt-6 border-t border-gray-100 space-y-3">
            <div className="flex flex-col sm:flex-row gap-2.5">
              <a
                href={callUrl}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-gray-50/70 hover:bg-gray-100 py-2.5 px-3 text-xs font-bold text-[#03120E] transition-all font-main"
              >
                <PhoneCall className="h-3.5 w-3.5 text-emerald-700" />
                <span>Call Clinical Desk</span>
              </a>
              <a
                href={emailUrl}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-gray-50/70 hover:bg-gray-100 py-2.5 px-3 text-xs font-bold text-[#03120E] transition-all font-main"
              >
                <Mail className="h-3.5 w-3.5 text-emerald-700" />
                <span>Email Support</span>
              </a>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] text-ink-muted flex items-center gap-1 font-secondary">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                DPDP Verified Access
              </span>
              <form action={logoutAction}>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700 transition-colors font-main"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span>Sign out</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
