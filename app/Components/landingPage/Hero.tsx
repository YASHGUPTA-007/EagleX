"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { 
  motion, 
  useMotionValue, 
  useSpring, 
  useTransform,
  LazyMotion,
  domAnimation,
  m
} from "framer-motion";
import { ArrowUpRight, Terminal, Zap, Activity } from "lucide-react";

// --- PROJECT DATA FOR MARQUEE ---
const projects = [
  "/projects/SkylineChill.png",
  "/projects/Goodwin Batteries.png",
  "/projects/Vyapar App.png",
  "/projects/HROne Cloud.png",
  "/projects/First500days.png",
  "/projects/CyreneAI.png",
  "/projects/Saurce.png"
];

const tripleProjects = [...projects, ...projects, ...projects];

// --- DEVICE DETECTION HOOK ---
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return isMobile;
};

// --- 1. SCRAMBLE TEXT EFFECT COMPONENT ---
const ScrambleText = React.memo(({ text, className, startDelay = 5700 }: { text: string, className?: string, startDelay?: number }) => {
  const [display, setDisplay] = useState(text);
  const [hasStarted, setHasStarted] = useState(false);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%&";
  
  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setHasStarted(true);
    }, startDelay);

    return () => clearTimeout(startTimeout);
  }, [startDelay]);

  useEffect(() => {
    if (!hasStarted) return;

    let interval: NodeJS.Timeout;
    let iteration = 0;
    
    interval = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 3;
    }, 30);
    return () => clearInterval(interval);
  }, [text, hasStarted]);

  return <span className={className}>{display}</span>;
});

ScrambleText.displayName = "ScrambleText";

// --- BACKGROUND MARQUEE COMPONENT ---
const MarqueeRow = React.memo(({ duration, reverse, isMobile }: { duration: number, reverse?: boolean, isMobile: boolean }) => (
  <div className="flex overflow-hidden w-full will-change-transform">
    <m.div
      initial={{ x: reverse ? "-50%" : "0%" }}
      animate={{ x: reverse ? "0%" : "-50%" }}
      transition={{ duration: isMobile ? duration * 1.5 : duration, ease: "linear", repeat: Infinity }}
      className="flex gap-4 md:gap-8 px-2 md:px-4 min-w-max"
    >
      {tripleProjects.map((src, i) => (
        <div key={i} className="w-[200px] md:w-[300px] h-[120px] md:h-[180px] rounded-lg overflow-hidden border border-white/10 bg-white/5 relative flex-shrink-0">
          <img 
            src={src} 
            alt="" 
            className="w-full h-full object-cover opacity-50" 
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      ))}
    </m.div>
  </div>
));

MarqueeRow.displayName = "MarqueeRow";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  // --- 3D TILT LOGIC (Disabled on mobile) ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = useMemo(() => ({ damping: 25, stiffness: 80 }), []);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), springConfig);

  const bgConfig = useMemo(() => ({ damping: 35, stiffness: 60 }), []);
  const bgX = useSpring(useTransform(mouseX, [-0.5, 0.5], ["8%", "-8%"]), bgConfig);
  const bgY = useSpring(useTransform(mouseY, [-0.5, 0.5], ["8%", "-8%"]), bgConfig);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return; // Disable on mobile
    
    const rect = ref.current?.getBoundingClientRect();
    if (rect) {
      const width = rect.width;
      const height = rect.height;
      const mouseXFromCenter = e.clientX - rect.left - width / 2;
      const mouseYFromCenter = e.clientY - rect.top - height / 2;
      
      mouseX.set(mouseXFromCenter / width);
      mouseY.set(mouseYFromCenter / height);
    }
  }, [mouseX, mouseY, isMobile]);

  const handleMouseLeave = useCallback(() => {
    if (isMobile) return;
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY, isMobile]);

  const tickerContent = useMemo(() => 
    Array(10).fill("").map((_, i) => (
      <React.Fragment key={i}>
        <span className="flex items-center gap-2 text-white">
          <Zap size={12} className="text-orange-500" /> RAPID DEPLOYMENT
        </span>
        <span>///</span>
        <span className="flex items-center gap-2 text-white">
          <Terminal size={12} className="text-orange-500" /> CLEAN ARCHITECTURE
        </span>
        <span>///</span>
      </React.Fragment>
    )), []
  );

  return (
    <LazyMotion features={domAnimation} strict>
      <section 
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative h-screen w-full bg-black overflow-hidden flex items-center justify-center"
        style={{ perspective: isMobile ? "none" : "1000px" }}
      >
        {/* --- PARALLAX CONTAINER --- */}
        <m.div 
          style={isMobile ? {} : { x: bgX, y: bgY, scale: 1.1 }} 
          className="absolute inset-0 z-0 pointer-events-none select-none flex items-center justify-center will-change-transform"
        >
          {/* 1. MARQUEE LAYER - Better positioning for mobile */}
          <div className="absolute inset-0 z-0 flex flex-col justify-center gap-3 md:gap-6 opacity-90 grayscale -rotate-6 scale-110 md:scale-125">
            <MarqueeRow duration={40} isMobile={isMobile} />
            <MarqueeRow duration={50} reverse isMobile={isMobile} />
            <MarqueeRow duration={60} isMobile={isMobile} />
            <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_20%,#000_90%)]" />
          </div>

          {/* 2. EAGLE IMAGE - Better mobile placement */}
          <m.img 
            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            src="/Eaglex2.png" 
            alt="Eagle X Robo Logo"
            className="relative z-10 w-full h-full object-contain object-center scale-125 md:scale-90 translate-y-[-5%] md:translate-y-0"
            loading="eager"
          />
          
          {/* 3. OVERLAYS */}
          <div className="absolute inset-0 z-20 bg-orange-900/10 mix-blend-overlay" />
          <div className="absolute inset-0 z-20 bg-[radial-gradient(circle_at_center,transparent_15%,#000_95%)]" />
          <div className="absolute bottom-0 left-0 right-0 h-3/4 md:h-2/3 z-20 bg-gradient-to-t from-black via-black/60 to-transparent" />
        </m.div>

        {/* --- Dynamic Background Grid Lines --- */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)] bg-[size:2rem_2rem] md:bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-10" />
          <m.div 
            animate={{ backgroundPosition: ["0px 0px", "0px 100px"] }}
            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            className="absolute bottom-0 left-[-50%] right-[-50%] h-[30vh] md:h-[50vh] bg-[linear-gradient(to_right,#ea580c_1px,transparent_1px),linear-gradient(to_bottom,#ea580c_1px,transparent_1px)] bg-[size:2rem_2rem] md:bg-[size:4rem_4rem] opacity-20 md:opacity-30 [transform:perspective(500px)_rotateX(60deg)] origin-bottom will-change-transform"
          />
        </div>

        {/* --- 3D Content Container --- */}
        <m.div
          style={isMobile ? {} : { rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="relative z-30 w-full max-w-7xl mx-auto px-4 md:px-8 flex flex-col items-center justify-center mt-0 md:mt-[-5vh] will-change-transform"
        >
          
          {/* --- Main Typography --- */}
          <div className="relative text-center transform-style-3d">
            
            <m.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-500/30 bg-orange-500/10 mb-4 md:mb-6 backdrop-blur-md"
            >
              <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              <span className="text-xs font-mono text-orange-400 tracking-widest uppercase">
                Eagle x 
              </span>
            </m.div>

            {/* Headline - Optimized for mobile */}
            <h1 className="text-4xl sm:text-5xl md:text-9xl font-black text-white tracking-tighter leading-[0.9] uppercase mb-6 md:mb-8 drop-shadow-2xl">
              <div className="flex flex-col items-center gap-1 md:gap-2">
                <span className="relative inline-block hover:scale-[1.02] transition-transform duration-300">
                  We Engineer
                  <span className="absolute inset-0 text-red-500 opacity-30 md:opacity-50 mix-blend-screen translate-x-[1px] md:translate-x-[2px] pointer-events-none">We Engineer</span>
                  <span className="absolute inset-0 text-blue-500 opacity-30 md:opacity-50 mix-blend-screen -translate-x-[1px] md:-translate-x-[2px] pointer-events-none">We Engineer</span>
                </span>
                
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-orange-400 to-orange-700 filter drop-shadow-[0_0_25px_rgba(234,88,12,0.5)]">
                  <ScrambleText text="DOMINANCE" />
                </span>
              </div>
            </h1>

            <p className="max-w-xl mx-auto text-gray-200 text-base md:text-lg lg:text-xl font-medium leading-relaxed mb-8 md:mb-10 text-shadow-lg px-4 md:px-0">
              Forging high-performance digital infrastructure for the next generation of 
              <span className="text-white font-bold"> unicorn founders.</span>
            </p>

            {/* Buttons - Side by side on mobile */}
            <div className="flex flex-row items-center justify-center gap-3 md:gap-5 px-4 md:px-0">
              <button className="group relative flex-1 md:flex-none px-4 md:px-8 py-3 md:py-4 bg-orange-600 text-black font-bold uppercase tracking-wider overflow-hidden text-xs md:text-sm">
                <div className="absolute inset-0 bg-white translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-200 skew-x-12" />
                <span className="relative flex items-center justify-center gap-1 md:gap-2 group-hover:text-black transition-colors">
                  <span className="hidden sm:inline">Initialize</span>
                  <span className="sm:hidden">Start</span>
                  <ArrowUpRight size={16} className="md:w-[18px] md:h-[18px]" />
                </span>
              </button>
              
              <button className="group flex-1 md:flex-none px-4 md:px-8 py-3 md:py-4 bg-black/40 backdrop-blur-sm border border-white/20 text-white font-bold uppercase tracking-wider hover:bg-white/10 transition-all text-xs md:text-sm">
                <span className="flex items-center justify-center gap-1 md:gap-2">
                  <Activity size={16} className="text-orange-500 group-hover:animate-pulse md:w-[18px] md:h-[18px]" /> 
                  <span className="hidden sm:inline">Metrics</span>
                  <span className="sm:hidden">View</span>
                </span>
              </button>
            </div>
          </div>

        </m.div>

        {/* --- Bottom Scrolling Ticker --- */}
        <div className="absolute bottom-0 left-0 w-full border-t border-white/10 bg-black/90 backdrop-blur-xl py-3 md:py-4 overflow-hidden z-40">
          <m.div 
            animate={{ x: [0, -1000] }}
            transition={{ repeat: Infinity, duration: isMobile ? 30 : 20, ease: "linear" }}
            className="flex whitespace-nowrap gap-8 md:gap-12 text-[10px] md:text-xs font-mono text-gray-500 uppercase tracking-widest will-change-transform"
          >
            {tickerContent}
          </m.div>
        </div>

      </section>
    </LazyMotion>
  );
}