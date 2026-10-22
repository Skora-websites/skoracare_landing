"use client";

import React, { ElementType } from "react";
import { motion, useReducedMotion } from "motion/react";

export interface BlurryToClearProps {
  as?: ElementType;
  children: React.ReactNode;
  className?: string;
  delay?: number;
  id?: string;
  style?: React.CSSProperties;
}

export function BlurryToClear({
  as = "h3",
  children,
  className = "",
  delay = 0,
  id,
  style,
}: BlurryToClearProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    const Component = as;
    return (
      <Component id={id} className={className} style={style}>
        {children}
      </Component>
    );
  }

  // Support any HTML tag dynamically with motion
  const MotionComponent =
    (motion as unknown as Record<string, typeof motion.div>)[
      typeof as === "string" ? as : "div"
    ] || motion.div;

  return (
    <MotionComponent
      id={id}
      initial={{
        filter: "blur(24px)",
        opacity: 0,
        scale: 1.06,
      }}
      whileInView={{
        filter: "blur(0px)",
        opacity: 1,
        scale: 1,
      }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{
        duration: 1.4,
        delay,
        ease: [0.16, 1, 0.3, 1], // Camera lens pulling focus smooth ease-out
      }}
      className={className}
      style={{ willChange: "filter, transform, opacity", ...style }}
    >
      {children}
    </MotionComponent>
  );
}

export default BlurryToClear;
