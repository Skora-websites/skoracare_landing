"use client";

import { useActionState, useState } from "react";
import { Check, X, UploadCloud } from "lucide-react";
import { respondConsent } from "./actions";

const initialState = { error: null as string | null };

export function ConsentForm({ slug }: { slug: string }) {
  const [state, formAction, pending] = useActionState(respondConsent, initialState);
  const [fileName, setFileName] = useState<string | null>(null);

  return (
    <form action={formAction} className="mt-6">
      <input type="hidden" name="slug" value={slug} />
      {state.error && (
        <p className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3.5 text-xs font-semibold text-red-700">
          {state.error}
        </p>
      )}

      {/* Optional document upload (jpg/png/pdf, max 5 MB) */}
      <label className="mb-4 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-emerald-900/15 bg-emerald-50/30 p-4 text-center transition-colors hover:border-emerald-500/40 hover:bg-emerald-50/60">
        <UploadCloud className="h-6 w-6 text-emerald-700" />
        <p className="mt-2 text-xs font-bold text-slate-800 font-main truncate max-w-xs">
          {fileName ?? "Upload existing prescription / report (optional)"}
        </p>
        <p className="mt-0.5 text-[11px] text-ink-muted">JPG, PNG or PDF · max 5 MB</p>
        <input
          type="file"
          name="consent_file"
          accept="image/jpeg,image/png,application/pdf"
          className="sr-only"
          onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
        />
      </label>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="submit"
          name="decision"
          value="accept"
          disabled={pending}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-[#10B981] via-[#059669] to-[#047857] py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-white shadow-sm hover:brightness-110 active:scale-[0.98] disabled:opacity-60 font-main transition-all"
        >
          <Check className="h-4 w-4" /> I Consent
        </button>
        <button
          type="submit"
          name="decision"
          value="reject"
          disabled={pending}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-white py-3 text-xs sm:text-sm font-bold uppercase tracking-wider text-red-700 hover:bg-red-50 active:scale-[0.98] disabled:opacity-60 font-main transition-all"
        >
          <X className="h-4 w-4" /> Decline
        </button>
      </div>
    </form>
  );
}
