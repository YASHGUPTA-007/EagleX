"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  motion, 
  useScroll, 
  useTransform, 
  useInView,
  useSpring
} from "framer-motion";
import { 
  Code2, 
  Activity,
  Cpu, 
  Globe, 
  Zap, 
  Target, 
  ShieldCheck, 
  Terminal,
  Users,
  Trophy,
  ArrowRight
} from "lucide-react";

// --- UTILITIES ---

const ScrambleText = ({ text, className, trigger = true }: { text: string, className?: string, trigger?: boolean }) => {
  const [display, setDisplay] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%&";
  
  useEffect(() => {
    if (!trigger) return;
    
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
  }, [text, trigger]);

  return <span className={className}>{display}</span>;
};

const CountUp = ({ value, label }: { value: string, label: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  return (
    <div ref={ref} className="group relative p-8 border border-white/10 bg-white/5 hover:border-[#FF4D00]/50 transition-colors overflow-hidden">
      <div className="absolute inset-0 bg-[#FF4D00]/5 scale-y-0 group-hover:scale-y-100 transition-transform origin-bottom duration-500" />
      
      {/* Corner Markers */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#FF4D00] opacity-50" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#FF4D00] opacity-50" />
      
      <h3 className="text-5xl md:text-7xl font-black text-white mb-2 relative z-10">
        {isInView ? <ScrambleText text={value} /> : "00"}
      </h3>
      <p className="font-mono text-xs text-[#FF4D00] uppercase tracking-widest relative z-10">
        {label}
      </p>
    </div>
  );
};

// --- COMPONENTS ---

const ValueCard = ({ icon: Icon, title, desc, index }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="relative pl-8 py-4 border-l border-white/10 group hover:border-[#FF4D00] transition-colors"
    >
      <div className="absolute left-[-21px] top-6 w-10 h-10 bg-[#020202] border border-white/20 group-hover:border-[#FF4D00] rounded-full flex items-center justify-center transition-colors z-10">
        <Icon size={18} className="text-gray-500 group-hover:text-[#FF4D00] transition-colors" />
      </div>
      
      <h4 className="text-xl font-bold text-white mb-2 uppercase group-hover:text-[#FF4D00] transition-colors">
        {title}
      </h4>
      <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
        {desc}
      </p>
    </motion.div>
  );
};

const TeamMember = ({ name, role, img }: any) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className="group relative w-full aspect-[3/4] bg-[#0a0a0a] border border-white/10 overflow-hidden"
  >
    {/* Image Placeholder */}
    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
    <img src={img} alt={name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 opacity-70 group-hover:opacity-100" />
    
    {/* Scanline Effect */}
    <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[size:100%_4px] opacity-0 group-hover:opacity-20 pointer-events-none z-20" />

    {/* Info */}
    <div className="absolute bottom-0 left-0 w-full p-6 z-30">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[#FF4D00] font-mono text-[10px] uppercase tracking-widest border border-[#FF4D00]/30 px-2 py-1 bg-[#FF4D00]/10">
          Operative
        </span>
        <Activity size={14} className="text-[#FF4D00] animate-pulse" />
      </div>
      <h3 className="text-2xl font-black text-white uppercase">{name}</h3>
      <p className="text-gray-400 font-mono text-xs uppercase">{role}</p>
    </div>
  </motion.div>
);

// --- MAIN PAGE ---

export default function AboutPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <main ref={containerRef} className="bg-[#020202] text-white min-h-screen selection:bg-[#FF4D00] selection:text-black overflow-hidden">
      
      {/* Progress Bar */}
      <motion.div style={{ scaleX }} className="fixed top-0 left-0 h-1 w-full bg-[#FF4D00] origin-left z-50 mix-blend-screen" />

      {/* --- SECTION 1: HERO MANIFESTO --- */}
      <section className="relative pt-32 pb-20 px-6 min-h-[80vh] flex flex-col justify-center border-b border-white/5">
        {/* Background Texture */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />
        
        <div className="max-w-7xl mx-auto w-full relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 mb-8"
          >
            <Terminal size={20} className="text-[#FF4D00]" />
            <span className="font-mono text-[#FF4D00] text-sm uppercase tracking-widest">
              System Identity // Eagle X
            </span>
          </motion.div>

          <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-[0.85] mb-12">
            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-600">
              The Architects
            </span>
            <span className="block text-white">
              Of <span className="text-[#FF4D00]">The New Order</span>
            </span>
          </h1>

          <div className="grid md:grid-cols-2 gap-12 items-end">
            <p className="text-xl text-gray-400 leading-relaxed">
              We are not just a dev shop. We are a high-performance engineering unit dedicated to building digital dominance. 
              While others follow trends, we forge the infrastructure that defines them.
            </p>
            <div className="flex gap-4">
               <div className="h-px bg-white/20 flex-1 my-auto" />
               <div className="font-mono text-xs text-gray-500 text-right">
                 EST. 2024<br />
                 SECTOR: GLOBAL
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 2: STATS (THE METRICS) --- */}
      <section className="border-b border-white/5">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          <CountUp value="50+" label="Projects Deployed" />
          <CountUp value="100%" label="Client Uptime" />
          <CountUp value="08+" label="Global Partners" />
          <CountUp value="24/7" label="System Monitor" />
        </div>
      </section>

      {/* --- SECTION 3: CORE PROTOCOLS (VALUES) --- */}
      <section className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-16">
            
            {/* Left: Sticky Title */}
            <div className="md:w-1/3">
              <div className="sticky top-32">
                <div className="w-12 h-1 bg-[#FF4D00] mb-6" />
                <h2 className="text-5xl font-black uppercase tracking-tighter mb-6">
                  Core <br />Protocols
                </h2>
                <p className="text-gray-500 font-mono text-sm">
                  // THE CODE WE LIVE BY
                </p>
              </div>
            </div>

            {/* Right: List */}
            <div className="md:w-2/3 space-y-8">
              <ValueCard 
                index={1}
                icon={Zap}
                title="Rapid Deployment"
                desc="Speed is a feature. We engineer systems designed for instant scalability and zero-latency performance."
              />
              <ValueCard 
                index={2}
                icon={ShieldCheck}
                title="Bulletproof Logic"
                desc="We don't ship bugs. Our code undergoes rigorous stress testing to ensure military-grade stability."
              />
              <ValueCard 
                index={3}
                icon={Target}
                title="Precision Design"
                desc="Aesthetics meet function. Every pixel serves a purpose in the greater machine."
              />
              <ValueCard 
                index={4}
                icon={Cpu}
                title="Future-Proofing"
                desc="We build with tomorrow's stack, ensuring your infrastructure outlasts the competition."
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 4: THE UNIT (TEAM) --- */}


      {/* --- SECTION 5: CTA --- */}
      <section className="py-32 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[#FF4D00]/5" />
        <div className="max-w-4xl mx-auto relative z-10">
          <h2 className="text-6xl md:text-9xl font-black uppercase tracking-tighter text-white mb-8">
            Ready to <br />
            <span className="text-[#FF4D00]">Deploy?</span>
          </h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-6 bg-white text-black font-black uppercase text-xl hover:bg-[#FF4D00] hover:text-white transition-colors"
          >
            Initiate Contact
          </motion.button>
        </div>
      </section>

    </main>
  );
}