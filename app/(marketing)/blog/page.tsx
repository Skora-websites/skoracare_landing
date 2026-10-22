import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarDays, BookOpen, Clock, Tag } from "lucide-react";
import { getPublishedBlogs } from "@/lib/queries/blog";
import { PageHeader } from "@/components/marketing/page-header";
import { formatDate } from "@/lib/utils";
import { publicUploadUrl } from "@/lib/utils/uploads";
import { ArrowCta } from "@/components/ui/arrow-cta";
import { BlurryToClear } from "@/components/ui/blurry-to-clear";

export const metadata: Metadata = {
  title: "Blog & Practice Insights | SkoraCares",
  description:
    "Expert perspectives on clinic operations, ABDM guidelines, prescription workflows, and growing modern healthcare practices in India.",
};

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const posts = await getPublishedBlogs();

  // Extract unique categories
  const categories = ["All", ...Array.from(new Set(posts.map((p) => p.category)))];

  return (
    <div className="relative w-full bg-[#FAFBF9] text-slate-900 overflow-x-clip">
      {/* ── 1. HERO HEADER ── */}
      <PageHeader
        badge="Practice Insights & Guides"
        title="Modern Healthcare Perspectives"
        subtitle="Practical strategies on Indian clinic operations, digital OPD management, ABDM compliance, and scaling patient care."
      />

      {/* ── 2. BLOG CONTENT CATALOG ── */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          {/* Category Filter Pills (Informational) */}
          <div className="mb-12 flex flex-wrap items-center gap-2 border-b border-slate-200/80 pb-6">
            <span className="font-main text-xs font-bold uppercase tracking-wider text-slate-400 mr-2 flex items-center gap-1.5">
              <Tag className="size-3.5 text-emerald-600" />
              Topics:
            </span>
            {categories.map((cat, i) => (
              <span
                key={cat}
                className={`font-main text-xs font-semibold px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                  i === 0
                    ? "bg-emerald-600 text-white shadow-xs"
                    : "bg-white text-slate-600 hover:text-emerald-700 hover:bg-emerald-50/80 border border-slate-200/80"
                }`}
              >
                {cat}
              </span>
            ))}
          </div>

          {posts.length === 0 ? (
            <div className="rounded-[32px] border border-dashed border-slate-300 bg-white py-24 text-center p-8">
              <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 mb-4">
                <BookOpen className="size-6" />
              </div>
              <h3 className="font-main text-xl font-bold text-slate-900">No articles published yet</h3>
              <p className="font-secondary mt-2 text-sm text-slate-500 max-w-sm mx-auto">
                Check back soon for fresh clinical operational guides and healthcare updates.
              </p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 items-stretch">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-[28px] border border-slate-200/90 bg-white shadow-xs transition-all duration-300 hover:-translate-y-2 hover:border-emerald-500/40 hover:shadow-[0_20px_45px_-12px_rgba(16,185,129,0.22)] active:scale-[0.99]"
                >
                  {/* Article Banner Image */}
                  <div className="relative h-48 w-full overflow-hidden bg-[#041D14]">
                    {publicUploadUrl(post.image) ? (
                      <img
                        src={publicUploadUrl(post.image) ?? ""}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#041D14] to-[#02130D] relative overflow-hidden">
                        <div className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-emerald-500/20 blur-2xl" />
                        <span className="flex size-14 items-center justify-center rounded-2xl bg-white/10 text-emerald-300 backdrop-blur-md border border-white/10 transition-transform duration-300 group-hover:scale-110">
                          <BookOpen className="size-6" />
                        </span>
                      </div>
                    )}
                    <span className="absolute bottom-3 left-4 font-main text-xs font-semibold px-2.5 py-0.5 rounded-full bg-black/60 text-white backdrop-blur-md border border-white/15">
                      {post.category}
                    </span>
                  </div>

                  {/* Article Body */}
                  <div className="flex flex-1 flex-col justify-between p-6 sm:p-7">
                    <div>
                      <div className="flex items-center gap-3 text-xs text-slate-400 font-secondary mb-3">
                        <span className="inline-flex items-center gap-1 text-slate-500 font-medium">
                          <CalendarDays className="size-3.5 text-emerald-600" />
                          {formatDate(post.createdAt)}
                        </span>
                        <span>•</span>
                        <span className="inline-flex items-center gap-1 text-slate-500">
                          <Clock className="size-3.5" />
                          4 min read
                        </span>
                      </div>

                      <h2 className="font-main text-lg font-bold leading-snug text-slate-900 group-hover:text-emerald-700 transition-colors">
                        {post.title}
                      </h2>

                      {post.shortcontent && (
                        <p className="font-secondary mt-2.5 text-sm leading-relaxed text-slate-600 line-clamp-3">
                          {post.shortcontent}
                        </p>
                      )}
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-700 font-main">
                      <span>Read full article</span>
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── 3. UNIVERSAL BOTTOM CLOSING CTA ── */}
      <section className="bg-[#03150E]">
        <ArrowCta
          title="Ready to Modernize Your Clinic?"
          subtitle="Join doctors and practice managers using SkoraCares to automate daily OPD administration."
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
