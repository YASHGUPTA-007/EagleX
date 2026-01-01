"use client";
import React from "react";
import { motion } from "framer-motion";
import { Activity, Hexagon, Zap, Layers, Rocket, Terminal, Shield, ArrowUpRight } from "lucide-react";
import { RevealTitle } from "../ui/shared-components";

export const MarqueeSection = () => (
  <div className="relative py-8 md:py-12 bg-orange-600 border-y-4 border-black overflow-hidden flex select-none z-20 -rotate-1 origin-center scale-105">
    <motion.div 
      animate={{ x: [0, -2000] }} 
      transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      className="flex whitespace-nowrap items-center gap-10 md:gap-20 px-10"
    >
      {[...Array(12)].map((_, i) => (
        <React.Fragment key={i}>
          <span className="text-5xl md:text-7xl font-black uppercase text-black italic">Next-Gen Architecture</span>
          <Zap className="text-black fill-black" size={32} />
          <span className="text-5xl md:text-7xl font-black uppercase text-black italic">Atomic Components</span>
          <Hexagon className="text-black" size={32} />
        </React.Fragment>
      ))}
    </motion.div>
  </div>
);

export const IntentSection = () => (
  <section className="py-20 md:py-60 px-6 max-w-450 mx-auto">
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20">
      <div className="lg:col-span-9">
        <RevealTitle className="text-xs md:text-sm font-mono text-orange-500 mb-6 md:mb-12 tracking-widest uppercase font-black">Section_04 // The Intent</RevealTitle>
        <p className="text-4xl md:text-[8vw] font-black leading-[0.9] md:leading-[0.85] uppercase tracking-tighter">
          We do not build for <span className="text-gray-700 italic">convenience.</span> We build for <span className="text-orange-600">absolute dominance.</span>
        </p>
      </div>
      <div className="lg:col-span-3 flex flex-col justify-end gap-8 md:gap-12">
        <div className="p-8 md:p-10 bg-white/5 border border-white/10 rounded-3xl space-y-6 group cursor-pointer">
          <Activity className="text-orange-600" size={32} />
          <p className="text-gray-400 text-xs md:text-sm leading-relaxed uppercase font-bold tracking-widest group-hover:text-white transition-colors">
            Our methodology prioritizes high-stakes engineering over aesthetic fluff. We architect digital machinery.
          </p>
        </div>
        <div className="text-[12vw] font-black text-white/3 leading-none uppercase italic select-none hidden md:block">Impact</div>
      </div>
    </div>
  </section>
);

export const BentoGridSection = () => (
  <section className="py-24 md:py-60 px-6 max-w-475 mx-auto overflow-hidden">
    <motion.div 
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-24 gap-8"
    >
      <div className="space-y-4">
        <span className="text-orange-600 font-mono text-xs uppercase tracking-widest font-black italic block animate-pulse">
          [ SYSTEM_LOAD: ARSENAL_MODULE ]
        </span>
        <h2 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter leading-[0.8]">
          Tools of<br />Dominance
        </h2>
      </div>
      <p className="max-w-md text-gray-500 text-xs md:text-sm font-bold uppercase tracking-widest leading-relaxed text-left md:text-right border-l-2 md:border-l-0 md:border-r-2 border-orange-600 pl-6 md:pl-0 md:pr-6">
        Our custom component library is engineered for performance benchmarks that outclass standard React patterns by 40%.
      </p>
    </motion.div>

    <motion.div 
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={{ show: { transition: { staggerChildren: 0.1 } } }}
      className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-325"
    >
      <motion.div variants={{ hidden: { opacity: 0, scale: 0.95 }, show: { opacity: 1, scale: 1 } }} className="md:col-span-8 bg-[#0a0a0a] border border-white/10 rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 flex flex-col justify-between group overflow-hidden relative min-h-[400px] md:min-h-0">
         <div className="absolute inset-0 bg-linear-to-br from-orange-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
         <div className="flex justify-between items-start z-10">
           <Layers className="text-orange-600" size={48} />
           <span className="text-gray-700 font-mono text-[10px] md:text-xs uppercase font-black tracking-widest">Ref_742-ALPHA</span>
         </div>
         <div className="z-10 mt-10 md:mt-0">
           <h3 className="text-5xl md:text-9xl font-black uppercase italic leading-[0.85] mb-6 md:mb-10 group-hover:skew-x-2 transition-transform duration-700">Atomic<br /><span className="text-orange-600">Design</span> Lab</h3>
           <p className="text-gray-400 text-sm md:text-xl max-w-2xl leading-relaxed uppercase font-bold tracking-tight opacity-100 md:opacity-0 group-hover:opacity-100 transition-all duration-500 md:translate-y-4 group-hover:translate-y-0">A proprietary UI framework built on top of native Tailwind and Framer.</p>
         </div>
      </motion.div>
      <motion.div variants={{ hidden: { opacity: 0, x: 50 }, show: { opacity: 1, x: 0 } }} className="md:col-span-4 bg-orange-600 rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 flex flex-col justify-between group cursor-pointer overflow-hidden relative min-h-[300px] md:min-h-0">
         <Rocket className="text-black group-hover:-translate-y-20 group-hover:translate-x-20 transition-all duration-700 ease-in-out" size={48} />
         <div className="space-y-4 z-10"><h4 className="text-4xl md:text-5xl font-black uppercase italic text-black leading-none">Blitz<br />Release</h4><p className="text-black font-bold uppercase text-xs tracking-widest opacity-70">CI/CD deployment in under 60 seconds.</p></div>
      </motion.div>
      <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} className="md:col-span-3 bg-[#111] border border-white/5 rounded-[2rem] md:rounded-[3rem] p-8 md:p-10 flex flex-col justify-between hover:bg-orange-600 transition-all duration-500 group min-h-[200px] md:min-h-0"><Terminal className="text-orange-600 group-hover:text-black transition-colors" size={32} /><h4 className="text-xl md:text-2xl font-black uppercase tracking-tighter group-hover:text-black">CLI Interface</h4></motion.div>
      <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }} className="md:col-span-3 bg-[#0a0a0a] border border-white/10 rounded-[2rem] md:rounded-[3rem] p-8 md:p-10 flex flex-col justify-between hover:border-orange-600 transition-colors group min-h-[200px] md:min-h-0"><Shield className="text-orange-600 group-hover:scale-110 transition-transform" size={32} /><h4 className="text-xl md:text-2xl font-black uppercase tracking-tighter">Audit Logic</h4></motion.div>
      <motion.div variants={{ hidden: { opacity: 0, scale: 0.9 }, show: { opacity: 1, scale: 1 } }} className="md:col-span-6 bg-[#111] border border-white/5 rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 flex items-center justify-between group overflow-hidden relative min-h-[200px] md:min-h-0"><div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#ea580c15_0%,transparent_70%)] group-hover:scale-150 transition-transform duration-1000" /><div className="space-y-2 md:space-y-4 z-10"><h4 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter group-hover:text-orange-500 transition-colors">Neural Sync</h4><p className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest">Real-time AI telemetry integration.</p></div><ArrowUpRight className="text-white opacity-20 group-hover:opacity-100 group-hover:translate-x-4 group-hover:-translate-y-4 transition-all duration-500" size={60} /></motion.div>
    </motion.div>
  </section>
);