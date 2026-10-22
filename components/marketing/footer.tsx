"use client";

import HalftoneWordmarkFooter from "@/components/ui/halftone-wordmark-footer";

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function LinkedInIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

function TwitterXIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const SKORA_COLUMNS = [
  {
    title: "Platform",
    links: [
      { label: "Online Prescriptions", href: "/#features" },
      { label: "Clinic Network", href: "/#features" },
      { label: "Home Visit & Maps", href: "/#features" },
      { label: "ABDM & GST Invoicing", href: "/#features" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Pricing Plans", href: "/pricing" },
      { label: "Blog & News", href: "/blog" },
      { label: "Contact Us", href: "/contact" },
      { label: "Book a Demo", href: "/contact#demo" },
    ],
  },
  {
    title: "Policies",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms-conditions" },
      { label: "Cancellation Policy", href: "/cancellation-policy" },
      { label: "Refund Policy", href: "/refund-policy" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "Greater Noida West, India", href: "/contact" },
      { label: "+91 921 7375 831", href: "tel:+919217375831" },
      { label: "info@skoracares.com", href: "mailto:info@skoracares.com" },
      {
        label: "Facebook",
        href: "https://www.facebook.com/skoracares",
        icon: <FacebookIcon className="h-4 w-4" />,
      },
      {
        label: "Instagram",
        href: "https://www.instagram.com/skoracares_?",
        icon: <InstagramIcon className="h-4 w-4" />,
      },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/company/skorainfotech",
        icon: <LinkedInIcon className="h-4 w-4" />,
      },
      {
        label: "X (Twitter)",
        href: "https://twitter.com/skoracares",
        icon: <TwitterXIcon className="h-3.5 w-3.5" />,
      },
    ],
  },
];

export function Footer() {
  return (
    <div className="relative w-full bg-[#03140E] md:bg-[#071E17] p-0 md:px-6 lg:px-8 md:pt-3.5 pb-0">
      <div className="relative w-full overflow-hidden rounded-none md:rounded-t-[56px] rounded-b-none border-none md:border md:border-b-0 md:border-emerald-500/25 bg-[#03140E] shadow-none md:shadow-[0_-20px_50px_-10px_rgba(0,0,0,0.5),0_24px_65px_-15px_rgba(15,23,42,0.2)]">
        {/* Ambient Dark Gradient Bloom */}
        <div className="pointer-events-none absolute -top-28 left-1/2 -translate-x-1/2 w-[52rem] h-[22rem] rounded-full bg-emerald-500/10 blur-[140px] z-10" />

        <HalftoneWordmarkFooter
          wordmark="skoracares"
          label="SkoraCares Clinic OS"
          meta="Smart Patient & Practice Management"
          preset="emerald"
          palette={{
            background: "#03140E",
            ink: "#FAF7F2",
            warm: "#34d399",
          }}
          columns={SKORA_COLUMNS}
          backToTop={true}
          height="560px"
          crop={0.18}
          dotGap={6}
          grain={0.45}
        />
      </div>
    </div>
  );
}

export default Footer;
