import Link from "next/link";
import { Activity } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  light = false,
}: {
  className?: string;
  light?: boolean;
}) {
  return (
    <Link href="/" className={cn("group inline-flex items-center gap-2.5", className)}>
      <span
        className={cn(
          "relative flex h-10 w-10 items-center justify-center rounded-xl shadow-md transition-transform duration-300 group-hover:scale-105",
          light
            ? "bg-white/10 border border-white/20 shadow-black/20"
            : "bg-[#0D261E] border border-emerald-900/50 shadow-emerald-950/20"
        )}
      >
        <Activity className="h-5 w-5 text-emerald-400" strokeWidth={2.5} />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-lg font-bold tracking-tight transition-colors duration-300",
            light ? "text-[#FAF7F2]" : "text-slate-900"
          )}
        >
          Skora
          <span className={light ? "text-emerald-400" : "text-emerald-600"}>
            Cares
          </span>
        </span>
        <span
          className={cn(
            "text-[10px] font-semibold uppercase tracking-[0.2em] transition-colors duration-300",
            light ? "text-[#FAF7F2]/60" : "text-slate-500"
          )}
        >
          Clinic OS
        </span>
      </span>
    </Link>
  );
}
