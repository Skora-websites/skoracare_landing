import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, MessageSquare, Shield, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/marketing/page-header";
import { ContactForm } from "./contact-form";
import { getCompanySettings } from "@/lib/queries/landing";
import { ArrowCta } from "@/components/ui/arrow-cta";

export const metadata: Metadata = {
  title: "Contact & Book a Demo | SkoraCares",
  description: "Connect with our clinical workflow experts. Schedule a live walkthrough or get instant support for your healthcare practice.",
};

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const settings = await getCompanySettings();
  const phone = settings?.companyMobile1 ?? "+91 921 7375 831";
  const email = settings?.companyEmail1 ?? "info@skoracares.com";
  const rawPhone = phone.replace(/[^0-9+]/g, "");

  const contactChannels = [
    {
      icon: Phone,
      label: "Direct Clinical Hotline",
      value: phone,
      subtext: "Priority response for doctors & practice managers",
      href: `tel:${rawPhone}`,
      actionLabel: "Call directly",
    },
    {
      icon: MessageSquare,
      label: "WhatsApp Clinical Desk",
      value: "Chat on WhatsApp",
      subtext: "Instant responses during clinic hours",
      href: `https://wa.me/${rawPhone.replace("+", "")}?text=Hi%2C%20I%20would%20like%20a%20demo%20of%20SkoraCares.`,
      actionLabel: "Open WhatsApp",
      highlight: true,
    },
    {
      icon: Mail,
      label: "Enterprise & Email Inquiries",
      value: email,
      subtext: "Responses guaranteed within 4 hours",
      href: `mailto:${email}`,
      actionLabel: "Send an email",
    },
    {
      icon: MapPin,
      label: "Technology Headquarters",
      value: "SkoraSoft Technologies",
      subtext: "New Delhi, India • Serving pan-India healthcare facilities",
    },
    {
      icon: Clock,
      label: "Operations & Support Hours",
      value: "Monday – Saturday",
      subtext: "9:00 AM – 8:00 PM IST (Emergency on-call 24/7)",
    },
  ];

  return (
    <div className="bg-[#FAFBF9] min-h-screen">
      <PageHeader
        badge="Contact & Onboarding"
        title="Let's transform your clinical practice"
        subtitle="Speak directly with our healthcare technology specialists. Book a custom demo, explore custom integrations, or get rapid onboarding assistance."
      />

      <section className="py-20 lg:py-28 relative">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16 items-start">
            {/* Left Column: Direct channels and reassurance cards */}
            <div className="space-y-6">
              <div>
                <span className="font-main text-xs font-bold tracking-widest uppercase text-emerald-700">
                  Direct Clinical Touchpoints
                </span>
                <h2 className="mt-2 font-main text-2xl sm:text-3xl font-extrabold tracking-tight text-[#03120E]">
                  We are here to support your practice every day.
                </h2>
                <p className="mt-3 text-sm sm:text-base text-ink-muted leading-relaxed">
                  Whether you are a solo practitioner looking to digitize prescriptions or a 50-doctor multi-specialty hospital, our dedicated deployment team will guide you step by step.
                </p>
              </div>

              <div className="space-y-4 pt-2">
                {contactChannels.map((c) => (
                  <div
                    key={c.label}
                    className={`group relative flex items-start gap-4 rounded-2xl border p-5 transition-all duration-300 hover:-translate-y-1 ${
                      c.highlight
                        ? "border-emerald-300/60 bg-gradient-to-r from-emerald-50/70 to-emerald-100/30 shadow-md shadow-emerald-500/5 hover:border-emerald-400"
                        : "border-emerald-900/10 bg-white shadow-sm hover:border-emerald-700/30 hover:shadow-[0_12px_30px_-8px_rgba(3,18,14,0.08)]"
                    }`}
                  >
                    <div
                      className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
                        c.highlight
                          ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30 group-hover:scale-105"
                          : "bg-emerald-50 text-emerald-700 group-hover:bg-emerald-700 group-hover:text-white"
                      }`}
                    >
                      <c.icon className="h-5 w-5" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold uppercase tracking-wider text-ink-muted">
                        {c.label}
                      </p>
                      {c.href ? (
                        <a
                          href={c.href}
                          target={c.href.startsWith("http") ? "_blank" : undefined}
                          rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="mt-1 block font-main text-base font-bold text-[#03120E] transition-colors hover:text-emerald-700 truncate"
                        >
                          {c.value}
                        </a>
                      ) : (
                        <p className="mt-1 font-main text-base font-bold text-[#03120E]">
                          {c.value}
                        </p>
                      )}
                      <p className="mt-0.5 text-xs text-ink-muted">{c.subtext}</p>
                    </div>

                    {c.actionLabel && (
                      <span className="hidden sm:inline-block text-xs font-semibold text-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity">
                        {c.actionLabel} &rarr;
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* Security & Reliability Callout */}
              <div className="rounded-2xl border border-dashed border-emerald-900/20 bg-emerald-50/40 p-5 flex items-center gap-3.5">
                <Shield className="h-6 w-6 text-emerald-700 shrink-0" />
                <p className="text-xs text-ink-muted leading-relaxed">
                  <strong className="text-[#03120E]">Bank-Grade Data Security:</strong> All inquiries and clinical data inquiries are encrypted under Indian DPDP Act guidelines. No third-party data brokering.
                </p>
              </div>
            </div>

            {/* Right Column: High-converting demo booking form */}
            <div className="lg:sticky lg:top-28">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Universal Bottom Closing CTA */}
      <ArrowCta />
    </div>
  );
}
