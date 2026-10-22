import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

const alteHaasGrotesk = localFont({
  src: [
    {
      path: "../public/fonts/AlteHaasGroteskRegular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/AlteHaasGroteskBold.woff",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-alte-haas",
  display: "swap",
});

const redaction = localFont({
  src: [
    {
      path: "../public/fonts/Redaction-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Redaction-Italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/fonts/Redaction-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-redaction",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "SkoraCares — Smarter Patient & Clinic Management",
    template: "%s · SkoraCares",
  },
  description:
    "Online Prescription Upload, Multi Clinic Management, Home Visit with Map Integration — everything your practice needs in one powerful platform.",
  keywords: [
    "clinic management",
    "healthcare software",
    "patient records",
    "online prescriptions",
    "doctor appointment",
  ],
  openGraph: {
    title: "SkoraCares — Smarter Patient & Clinic Management",
    description: "Purpose-built tools for modern healthcare professionals.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${alteHaasGrotesk.variable} ${redaction.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        {children}
      </body>
    </html>
  );
}
