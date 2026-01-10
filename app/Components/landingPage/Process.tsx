"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

const steps = [
  { 
    id: "01", 
    title: "Discovery", 
    tag: "Analysis",
    desc: "We dismantle your requirements and reconstruct a battle plan. 1 Hour. No fluff." 
  },
  { 
    id: "02", 
    title: "Construction", 
    tag: "Development",
    desc: "5 Days of deep-work sprints. You receive daily builds, not static mockups." 
  },
  { 
    id: "03", 
    title: "Deployment", 
    tag: "Execution",
    desc: "Production launch. We manage the CI/CD pipeline and DNS propagation." 
  },
  { 
    id: "04", 
    title: "Evolution", 
    tag: "Optimization",
    desc: "Post-launch analytics review to engineer the next iteration cycle." 
  }
];

export default function ProcessSwissMasterpiece() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Grid Lines Draw Animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        }
      });

      // Top Border draws left to right
      tl.from(".border-top-draw", { scaleX: 0, duration: 1, ease: "expo.out" })
      // Vertical borders draw down
        .from(".border-vert-draw", { scaleY: 0, duration: 0.8, stagger: 0.1, ease: "expo.out" }, "-=0.5")
      // Content reveals
        .from(".step-content", { y: 20, opacity: 0, stagger: 0.1, duration: 0.5 }, "-=0.4");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="bg-white text-black py-32 border-b border-black relative overflow-hidden"
    >
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        
        {/* Header - Brutalist Typesetting */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-20 gap-10">
          <h2 className="text-[12vw] lg:text-[10vw] font-black leading-[0.8] tracking-tighter uppercase">
            The<br/>Process
          </h2>
          <div className="max-w-md pb-4">
            <div className="w-12 h-1 bg-orange-600 mb-6" />
            <p className="text-xl font-bold leading-tight uppercase tracking-tight">
              We skip the bureaucracy. <br/>
              A linear execution model designed for speed.
            </p>
          </div>
        </div>

        {/* The Grid System */}
        <div className="relative">
          {/* Top Horizontal Line */}
          <div className="border-top-draw absolute top-0 left-0 w-full h-[2px] bg-black origin-left" />

          <div className="grid grid-cols-1 lg:grid-cols-4">
            {steps.map((step, i) => (
              <div 
                key={step.id} 
                className="group relative border-black/10 lg:border-r border-b lg:border-b-0 min-h-[400px] flex flex-col justify-between p-8 hover:bg-black hover:text-white transition-colors duration-500 ease-out overflow-hidden"
              >
                {/* Vertical Border for Animation (Mobile hidden, Desktop visible) */}
                <div className="border-vert-draw absolute top-0 left-0 w-[1px] h-full bg-black origin-top hidden lg:block" />
                
                {/* Background Hover Accent (Orange Flash) */}
                <div className="absolute inset-0 bg-orange-600 translate-y-full group-hover:translate-y-[100%] transition-transform duration-0" />

                {/* Top: ID and Tag */}
                <div className="step-content relative z-10 w-full flex justify-between items-start border-b border-black/10 group-hover:border-white/20 pb-4 transition-colors duration-500">
                  <span className="text-6xl font-black tracking-tighter leading-none group-hover:text-orange-500 transition-colors duration-300">
                    {step.id}
                  </span>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-mono uppercase tracking-widest opacity-60 group-hover:opacity-100">
                      Phase_{step.id}
                    </span>
                    <span className="text-xs font-bold uppercase tracking-wide mt-1 px-2 py-0.5 border border-black group-hover:border-orange-500 group-hover:text-orange-500 rounded-full transition-colors">
                      {step.tag}
                    </span>
                  </div>
                </div>

                {/* Middle: Icon/Action (Reveals on Hover) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 scale-50 group-hover:scale-100 rotate-45 group-hover:rotate-0">
                  <ArrowUpRight size={80} className="text-orange-600" />
                </div>

                {/* Bottom: Content */}
                <div className="step-content relative z-10 pt-10">
                  <h3 className="text-3xl font-black uppercase tracking-tight mb-4 group-hover:translate-x-2 transition-transform duration-500">
                    {step.title}
                  </h3>
                  <p className="text-sm font-medium leading-relaxed opacity-70 max-w-[90%] group-hover:opacity-90 group-hover:text-zinc-300">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
            
            {/* Closing Vertical Border for last item */}
            <div className="border-vert-draw absolute top-0 right-0 w-[1px] h-full bg-black origin-top hidden lg:block" />
          </div>
        </div>
      </div>
    </section>
  );
}