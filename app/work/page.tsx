"use client";

import { ArrowUpRight, Mail, Zap, Terminal } from "lucide-react";
import ProjectsShowcase from "../Components/ProjectShowcase";
import { motion } from "framer-motion";

function WorkPage() {
  return (
    <div className="bg-[#050505] text-[#F5F5F5] selection:bg-orange-600 selection:text-black overflow-x-hidden w-full">
      
      <ProjectsShowcase />

      {/* CTA Section */}
      <section className="min-h-screen flex items-center justify-center bg-[#050505] relative z-20 border-t-2 border-orange-600/20 overflow-hidden">
      
      {/* Animated Background Grid */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        {/* Central glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-[120px]" />
      </div>

      {/* Scanline effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%)] bg-[size:100%_4px] pointer-events-none opacity-30 z-10" />

      <div className="text-center max-w-6xl px-6 relative z-10">
        {/* Header Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center gap-4 mb-10"
        >
          <Terminal size={16} className="text-orange-600" />
          <span className="text-orange-600 font-mono text-[10px] uppercase tracking-[0.3em] font-bold">
            Protocol_Final // Deploy
          </span>
          <div className="flex gap-1">
            {[1,2,3].map(i => (
              <div key={i} className="w-1.5 h-1.5 bg-orange-600 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
            ))}
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-[0.85] mb-4">
            <span className="block text-white" style={{ textShadow: '0 0 30px rgba(255, 77, 0, 0.3), 4px 4px 0px rgba(0, 0, 0, 0.8)' }}>
              LET'S BUILD
            </span>
            <span className="block text-[#FF4D00]" style={{ 
              WebkitTextStroke: '2px #FF4D00',
              paintOrder: 'stroke fill',
              textShadow: '0 0 30px rgba(255, 77, 0, 0.8), 4px 4px 0px rgba(0, 0, 0, 0.6)'
            } as React.CSSProperties}>
              THE FUTURE
            </span>
          </h2>
          
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-zinc-400 text-lg md:text-xl font-semibold max-w-2xl mx-auto"
          >
            Your next MVP is 7 days away. No contracts. No lock-ins. Just pure execution.
          </motion.p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-center gap-6 mb-20"
        >
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(255, 77, 0, 0.6)' }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-12 py-6 bg-orange-600 text-black font-black uppercase text-lg tracking-wider hover:bg-white transition-all duration-300 flex items-center gap-4 overflow-hidden"
          >
            <Zap size={24} strokeWidth={3} className="group-hover:rotate-12 transition-transform" />
            <span>Start Project</span>
            <ArrowUpRight className="group-hover:rotate-45 transition-transform duration-300" size={24} strokeWidth={3} />
          </motion.a>

          <motion.a
            href="mailto:eaglexdevelopment@gmail.com"
            whileHover={{ scale: 1.05, borderColor: 'rgba(255, 77, 0, 0.5)', backgroundColor: 'rgba(255, 77, 0, 0.1)' }}
            whileTap={{ scale: 0.95 }}
            className="group px-12 py-6 border-2 border-white/20 text-white font-black uppercase text-lg tracking-wider transition-all duration-300 flex items-center gap-4"
          >
            <Mail size={24} strokeWidth={2.5} />
            <span>Email Us</span>
          </motion.a>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-wrap justify-center items-center gap-8 md:gap-12"
        >
          {[
            { label: "7 Day Delivery", value: "Guaranteed" },
            { label: "No Contracts", value: "100% Flexible" },
            { label: "Full Ownership", value: "Your Code" }
          ].map((item, i) => (
            <div key={i} className="text-center">
              <div className="text-2xl md:text-3xl font-black text-orange-600 mb-1">{item.value}</div>
              <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider">{item.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Footer Bottom Info */}
      <div className="absolute bottom-8 left-0 w-full px-6 md:px-12 z-20">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono text-zinc-600 uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-orange-600/50 rounded-full animate-pulse" />
            <span>© 2024 EagleX - Built with Precision</span>
          </div>
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 text-orange-600 hover:text-orange-500 transition-colors"
          >
            <span>Scroll to Top</span>
            <ArrowUpRight size={14} className="rotate-[-90deg]" />
          </motion.button>
        </div>
      </div>

      {/* Corner Accents */}
      <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-orange-600/30" />
      <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-orange-600/30" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-orange-600/30" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-orange-600/30" />
    </section>
    </div>
  );
}

export default WorkPage;