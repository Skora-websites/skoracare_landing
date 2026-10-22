import { cache } from "react";

export type PublishedBlogPost = {
  id: number;
  title: string;
  slug: string;
  shortcontent: string | null;
  content?: string | null;
  image: string | null;
  createdAt: Date | null;
  category: string;
};

const DEFAULT_BLOGS: PublishedBlogPost[] = [
  {
    id: 1,
    title: "How Indian Clinics are Cutting OPD Wait Times by 40%",
    slug: "cutting-opd-wait-times-indian-clinics",
    shortcontent:
      "From queue tokens to digital prescription dispensing, discover how leading polyclinics across Delhi NCR and Mumbai streamlined their daily OPD flow.",
    content: `
      <h2>The OPD Bottleneck in Indian Clinics</h2>
      <p>Every morning across thousands of clinics in India, reception desks are inundated with walk-in registrations, paper records searches, and prescription handwriting delays. On average, an Indian OPD patient spends 45 minutes waiting for a 6-minute doctor consultation.</p>
      
      <h2>Moving to Unified Digital Care</h2>
      <p>By digitizing prescription generation and integrating pathology order dispatch, doctors can cut documentation time from 4 minutes per patient down to under 45 seconds. Patients receive authenticated digital prescriptions directly via WhatsApp, reducing front-desk queries and follow-up chaos.</p>
      
      <h2>Key Takeaways for Practice Managers</h2>
      <ul>
        <li>Implement token-based digital queue management to eliminate crowded waiting rooms.</li>
        <li>Adopt one-click digital Rx templates tailored for Indian pharmacological brands.</li>
        <li>Automate WhatsApp consultation summaries to boost treatment adherence.</li>
      </ul>
    `,
    image: null,
    createdAt: new Date("2026-09-15"),
    category: "Clinic Management",
  },
  {
    id: 2,
    title: "ABDM Milestone 1, 2 & 3: What Doctors Need to Know in 2026",
    slug: "abdm-milestone-compliance-guide-doctors-2026",
    shortcontent:
      "A clinician-friendly guide to Ayushman Bharat Digital Mission (ABDM) compliance, ABHA creation, and secure health record exchange under the DPDP Act.",
    content: `
      <h2>Understanding India's Digital Health Mission</h2>
      <p>The Ayushman Bharat Digital Mission (ABDM) is transforming Indian healthcare infrastructure. For private practices, understanding the compliance milestones is essential for staying compliant and eligible for national digital health registries.</p>
      
      <h2>Milestone 1: ABHA Registration & Verification</h2>
      <p>Ayushman Bharat Health Accounts (ABHA) allow patients to carry their health records across providers seamlessly. SkoraCares enables instant 1-click ABHA generation using Aadhaar OTP verification right at the reception desk.</p>
      
      <h2>Data Sovereignty and the DPDP Act</h2>
      <p>Under India's Digital Personal Data Protection (DPDP) Act, patient health records must reside in Tier-4 Indian data centers with end-to-end encryption. All transmissions must be backed by cryptographically verifiable consent tokens.</p>
    `,
    image: null,
    createdAt: new Date("2026-09-28"),
    category: "ABDM & Compliance",
  },
  {
    id: 3,
    title: "Multi-Clinic Practice Management: Managing 5 Locations from One Screen",
    slug: "multi-clinic-practice-management-architecture",
    shortcontent:
      "Cross-location staff rosters, centralized inventory reordering, and unified patient EMRs — how doctor chains scale without losing control.",
    content: `
      <h2>The Multi-Clinic Coordination Challenge</h2>
      <p>Opening a second or third clinic branch is a milestone, but operating multiple locations with disjointed software causes stock discrepancies, lost follow-ups, and fragmented patient histories.</p>
      
      <h2>Unified Telemetry & Cross-Branch Visibility</h2>
      <p>With SkoraCares Multi-Branch Architecture, medical directors switch between clinical locations with a single click. Inventory transfers between clinic dispensaries are reconciled in real-time, eliminating expired medicine write-offs.</p>
    `,
    image: null,
    createdAt: new Date("2026-10-05"),
    category: "Practice Growth",
  },
];

export const getPublishedBlogs = cache(async (): Promise<PublishedBlogPost[]> => {
  return DEFAULT_BLOGS;
});

export const getPublishedBlogBySlug = cache(
  async (slug: string): Promise<PublishedBlogPost | null> => {
    return DEFAULT_BLOGS.find((b) => b.slug === slug) ?? null;
  }
);

export const getBlogBySlug = getPublishedBlogBySlug;
export const getBlogs = getPublishedBlogs;
