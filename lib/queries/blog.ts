import { cache } from "react";
import { and, desc, eq, isNull, or, sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { blogs, categories } from "@/lib/db/schema";

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
    title: "Digitizing Your Clinic's Financial Ledger & GST Invoicing",
    slug: "clinic-financial-ledger-gst-invoicing",
    shortcontent:
      "Simplify daily cash reconciliation, doctor payout splits, and GST compliance with an automated healthcare accounting workflow.",
    content: `
      <h2>Accounting Complexities in Healthcare</h2>
      <p>Unlike standard retail, clinics deal with multiple consultation fee tiers, doctor fee split-percentages, pharmacy dispensing margins, and external lab vendor commissions. Tracking these in separate spreadsheets leads to revenue leakages.</p>
      
      <h2>Automated Day-End Cash Balancing</h2>
      <p>With SkoraCares integrated ledger, every consultation, lab test collection, and medicine sale is logged in real-time. Front-desk staff can balance the cash register with UPI receipts in under 2 minutes at the end of every shift.</p>
    `,
    image: null,
    createdAt: new Date("2026-10-10"),
    category: "Finance & Operations",
  },
];

export const getPublishedBlogs = cache(async (): Promise<PublishedBlogPost[]> => {
  try {
    const rows = await db
      .select({
        id: blogs.id,
        title: blogs.title,
        slug: blogs.slug,
        shortcontent: blogs.shortcontent,
        image: blogs.image,
        createdAt: blogs.createdAt,
        category: categories.name,
      })
      .from(blogs)
      .innerJoin(categories, eq(categories.id, blogs.categoryId))
      .where(
        and(
          eq(blogs.status, true),
          // Published now OR scheduled to publish in the past.
          or(isNull(blogs.publishAt), sql`${blogs.publishAt} <= NOW()`)
        )
      )
      .orderBy(desc(blogs.createdAt));

    if (rows && rows.length > 0) return rows;
    return DEFAULT_BLOGS;
  } catch (error) {
    console.warn(
      "[getPublishedBlogs] Database offline or unreachable, using default static fallback posts."
    );
    return DEFAULT_BLOGS;
  }
});

export const getBlogBySlug = cache(
  async (slug: string): Promise<PublishedBlogPost | null> => {
    try {
      const [row] = await db
        .select({
          id: blogs.id,
          title: blogs.title,
          slug: blogs.slug,
          shortcontent: blogs.shortcontent,
          content: blogs.content,
          image: blogs.image,
          createdAt: blogs.createdAt,
          category: categories.name,
        })
        .from(blogs)
        .innerJoin(categories, eq(categories.id, blogs.categoryId))
        .where(
          and(
            eq(blogs.slug, slug),
            eq(blogs.status, true),
            or(isNull(blogs.publishAt), sql`${blogs.publishAt} <= NOW()`)
          )
        );

      if (row) return row;
      const fallback = DEFAULT_BLOGS.find((b) => b.slug === slug);
      return fallback ?? null;
    } catch (error) {
      console.warn(
        `[getBlogBySlug] Database offline or unreachable for slug ${slug}, checking fallback posts.`
      );
      const fallback = DEFAULT_BLOGS.find((b) => b.slug === slug);
      return fallback ?? null;
    }
  }
);

