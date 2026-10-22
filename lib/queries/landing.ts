import { cache } from "react";
import type { LandingItem } from "@/lib/db/schema";

export type LandingSectionData = {
  id: number;
  key: string;
  name: string;
  title: string | null;
  subtitle: string | null;
  isActive: boolean | null;
  metadata: unknown;
  items: LandingItem[];
};

export const getLandingData = cache(async (): Promise<Map<string, LandingSectionData>> => {
  return new Map<string, LandingSectionData>();
});

export type CompanySettings = {
  companyName: string | null;
  companyTagline: string | null;
  companyEmail1: string | null;
  companyMobile1: string | null;
  companyWhatsapp1: string | null;
  currencySymbol: string | null;
  defaultTrialDays: number | null;
};

export const getCompanySettings = cache(async (): Promise<CompanySettings | null> => {
  return {
    companyName: "SkoraCares",
    companyTagline: "Smarter Patient & Clinic Management",
    companyEmail1: "hello@skorahealth.com",
    companyMobile1: "+91 98765 43210",
    companyWhatsapp1: "+91 98765 43210",
    currencySymbol: "₹",
    defaultTrialDays: 15,
  };
});
