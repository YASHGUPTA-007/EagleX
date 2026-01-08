"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Hero from "./Components/landingPage/Hero";
import { GridPattern } from "./Components/shared";
import Marquee from "./Components/landingPage/Marquee";
import Mission from "./Components/landingPage/Mission";
import HorizontalScroll from "./Components/landingPage/orizontalScroll";
import Tools from "./Components/landingPage/Tools";
import Stack from "./Components/landingPage/Stack";
import Process from "./Components/landingPage/Process";
import Testimonials from "./Components/landingPage/Testimonials";
import CTA from "./Components/landingPage/CTA";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function EagleXMonolith() {
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray(".h-panel");
      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: ".h-trigger",
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => "+=" + (horizontalRef.current?.offsetWidth || 2000),
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-[#050505] text-[#F5F5F5] selection:bg-orange-600 selection:text-black overflow-x-hidden w-full">
      <GridPattern opacity={0.03} />
      <Hero />
      <Marquee />
      <Mission />
      <HorizontalScroll horizontalRef={horizontalRef} />
      <Tools />
      <Stack />
      <Process />
      <Testimonials />
      <CTA />

      <style jsx global>{`
        ::-webkit-scrollbar { width: 0px; display: none; }
        body { -ms-overflow-style: none; scrollbar-width: none; background: #020202; }
        .h-panel { will-change: transform; }
      `}</style>
    </div>
  );
}