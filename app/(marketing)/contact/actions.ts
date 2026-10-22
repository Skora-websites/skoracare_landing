"use server";

import { authRateLimit } from "@/lib/security/rate-limit";
import { getClientIp } from "@/lib/security/ip";

export type DemoBookingState = { success: boolean; error: string | null };

export async function bookDemo(
  _prev: DemoBookingState,
  formData: FormData
): Promise<DemoBookingState> {
  const honeypot = String(formData.get("company_website") ?? "").trim();
  if (honeypot) {
    return { success: true, error: null };
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const clinic = String(formData.get("clinic") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !message) {
    return { success: false, error: "Please fill in all required fields." };
  }

  const clientIp = await getClientIp();
  const ipCheck = authRateLimit.demoIp(clientIp);
  if (!ipCheck.allowed) {
    const minutes = Math.ceil(ipCheck.retryAfterMs / 60_000);
    return { success: false, error: `Too many requests from this network. Try again in ${minutes} minute(s).` };
  }

  const { allowed, retryAfterMs } = authRateLimit.demo(email);
  if (!allowed) {
    const minutes = Math.ceil(retryAfterMs / 60_000);
    return { success: false, error: `Too many requests. Try again in ${minutes} minute(s).` };
  }

  console.log("[Demo Booking Received]", { name, email, phone, clinic, message, date: new Date().toISOString() });
  return { success: true, error: null };
}
