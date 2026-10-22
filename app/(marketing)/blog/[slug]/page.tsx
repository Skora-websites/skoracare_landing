import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock, Tag, Share2, CheckCircle2 } from "lucide-react";
import { getBlogBySlug } from "@/lib/queries/blog";
import { formatDate } from "@/lib/utils";
import { publicUploadUrl } from "@/lib/utils/uploads";
import { ArrowCta } from "@/components/ui/arrow-cta";
import { BlurryToClear } from "@/components/ui/blurry-to-clear";
import { MeshDriftBackground } from "@/components/ui/mesh-drift-background";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);
  return {
    title: `${post?.title ?? "Article"} | SkoraCares Blog`,
    description: post?.shortcontent ?? "Clinical management insights and healthcare operational guides.",
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);
  if (!post) notFound();

  return (
    <div className="relative w-full bg-[#FAFBF9] text-slate-900 overflow-x-clip">
      {/* ── 1. ARTICLE HEADER (DEEP FOREST GREEN WITH ANIMATED MESH DRIFT) ── */}
      <section className="relative overflow-hidden bg-[#03120E] pb-16 pt-32 sm:pb-20 sm:pt-40 lg:pb-24 lg:pt-44 text-[#FAF7F2] select-none">
        {/* Animated WebGL Mesh Drift Gradient */}
        <MeshDriftBackground className="z-0" />

        {/* Ambient Top Radial Emerald Glow */}
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[760px] max-w-[95vw] h-[380px] bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.25),rgba(4,29,20,0.6)_60%,transparent_75%)] blur-3xl z-10" />

        {/* Scrim Overlay for Crisp Contrast */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#03120E]/40 via-transparent to-[#03120E]/85 z-10" />

        <div className="relative z-20 mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="group inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors font-main mb-6"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to all insights</span>
          </Link>

          <div className="flex flex-wrap items-center gap-3 text-xs text-emerald-200/80 font-secondary mb-4">
            <span className="font-main text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
              {post.category}
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1.5 font-medium">
              <CalendarDays className="size-3.5 text-emerald-400" />
              {formatDate(post.createdAt)}
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-3.5" />
              5 min read
            </span>
          </div>

          <BlurryToClear
            as="h1"
            className="font-main text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#FAF7F2] leading-[1.15]"
          >
            {post.title}
          </BlurryToClear>

          {post.shortcontent && (
            <p className="font-secondary mt-5 text-base sm:text-lg leading-relaxed text-emerald-100/80">
              {post.shortcontent}
            </p>
          )}
        </div>
      </section>

      {/* ── 2. ARTICLE CONTENT BODY ── */}
      <article className="py-16 sm:py-20">
        <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
          {/* Featured Image */}
          {publicUploadUrl(post.image) && (
            <div className="mb-12 overflow-hidden rounded-[28px] border border-slate-200 shadow-md">
              <img
                src={publicUploadUrl(post.image) ?? ""}
                alt={post.title}
                className="w-full object-cover max-h-[460px]"
              />
            </div>
          )}

          {/* Reader Body Card */}
          <div className="rounded-[32px] border border-slate-200/90 bg-white p-7 sm:p-12 shadow-xs">
            <div className="prose prose-slate max-w-none font-secondary text-[16px] sm:text-[17px] leading-[1.85] text-slate-700">
              {(post.content ?? "").split("\n\n").map((para, i) => {
                const trimmed = para.trim();
                if (!trimmed) return null;

                // Render subheadings if paragraph starts with ## or <h2>
                if (trimmed.startsWith("## ") || trimmed.startsWith("<h2>")) {
                  const headingText = trimmed.replace(/^##\s*/, "").replace(/<\/?h2>/g, "");
                  return (
                    <h2
                      key={i}
                      className="font-main text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mt-10 mb-4 pt-4 border-t border-slate-100 first:mt-0 first:pt-0 first:border-none"
                    >
                      {headingText}
                    </h2>
                  );
                }

                return (
                  <p key={i} className="mb-5 text-slate-700 leading-relaxed">
                    {trimmed}
                  </p>
                );
              })}
            </div>

            {/* Author / Editorial Trust Box */}
            <div className="mt-12 rounded-2xl border border-slate-200/80 bg-[#FAFBF9] p-6 sm:p-7 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white font-main font-bold text-lg">
                  SC
                </div>
                <div>
                  <p className="font-main text-sm font-bold text-slate-900">SkoraCares Clinical Editorial Team</p>
                  <p className="font-secondary text-xs text-slate-500">Verified for Indian clinical compliance and ABDM standards.</p>
                </div>
              </div>
              <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 font-main">
                <CheckCircle2 className="size-4" />
                Verified Clinical Guide
              </span>
            </div>
          </div>
        </div>
      </article>

      {/* ── 3. UNIVERSAL BOTTOM CLOSING CTA ── */}
      <section className="bg-[#03150E]">
        <ArrowCta
          title="Ready to Transform Your Clinic?"
          subtitle="Join leading practices across India using SkoraCares to automate patient workflows, billing, and lab operations."
          primaryButtonText="Start Free Trial"
          primaryButtonHref="/signup"
          secondaryButtonText="Book a Demo"
          secondaryButtonHref="/contact#demo"
          note="No credit card required · Instant 2-minute deployment · Cancel anytime"
        />
      </section>
    </div>
  );
}
