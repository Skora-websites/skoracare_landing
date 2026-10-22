"use client";

import { useMemo } from "react";
import Timeline, { type JourneyItem } from "@/components/ui/timeline";

type StepItem = {
  id: number;
  title: string | null;
  description: string | null;
  badge: string | null;
};

export function HowItWorks({
  title,
  subtitle,
  items,
}: {
  title: string | null;
  subtitle: string | null;
  items: StepItem[];
}) {
  const topJourneyData: JourneyItem[] = useMemo(() => {
    return [
      {
        id: "step-1",
        year: "Step 01",
        month: items?.[0]?.title ?? "Create Your Account",
        content:
          items?.[0]?.description ??
          "Sign up in 2 minutes. No credit card needed for the free trial.",
      },
      {
        id: "step-3",
        year: "Step 03",
        month: items?.[2]?.title ?? "Add Patient Data",
        content:
          items?.[2]?.description ??
          "Easily add new patient details or import existing records in just a few clicks.",
      },
    ];
  }, [items]);

  const bottomJourneyData: JourneyItem[] = useMemo(() => {
    return [
      {
        id: "step-2",
        year: "Step 02",
        month: items?.[1]?.title ?? "Set Up Your Clinic",
        content:
          items?.[1]?.description ??
          "Add your doctors, departments, schedule, and branding easily.",
      },
      {
        id: "step-4",
        year: "Step 04",
        month: items?.[3]?.title ?? "Go Live & Grow",
        content:
          items?.[3]?.description ??
          "Start seeing patients digitally and watch your efficiency soar.",
      },
    ];
  }, [items]);

  return (
    <div className="w-full relative overflow-hidden rounded-[inherit]">
      <Timeline
        title={title ?? "Deployment Guide"}
        periodLabel={subtitle ?? "4 Simple Steps • 24H Rapid Go-Live"}
        backgroundColor="#03120E"
        textColor="#FAF7F2"
        mutedTextColor="#94a3b8"
        activeColor="#10B981"
        imageUrl="/images/pharmacy-dispensary-real.jpg"
        imageAlt="Professional Indian pharmacist managing modern dispensary counter"
        topItems={topJourneyData}
        bottomItems={bottomJourneyData}
      />
    </div>
  );
}

export default HowItWorks;
