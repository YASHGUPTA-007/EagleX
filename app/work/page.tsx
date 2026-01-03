"use client";

import { ArrowUpRight, Mail } from "lucide-react";
import CustomCursor from "../Components/CustomCursor";
import ProjectsShowcase from "../Components/ProjectShowcase";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

function WorkPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [-100, 0]);

  return (
    <div className="bg-[#050505] text-[#F5F5F5] selection:bg-orange-600 selection:text-black overflow-x-hidden w-full">
      <CustomCursor />
      
      {/* 1. Removed the "Our Work" Hero Section because ProjectsShowcase now has its own Kinetic Hero.
        2. Removed the 'max-w-7xl' wrapper to allow full-screen sticky scrolling.
      */}
      <ProjectsShowcase />

      {/* CTA Section 
         Changed to Black background to create contrast against the 
         Orange Stats section at the bottom of ProjectsShowcase.
      */}
      <section ref={containerRef} className="min-h-screen flex items-center justify-center bg-[#050505] relative z-20 border-t border-white/10 overflow-hidden">
        
        {/* Animated Background Grid */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        </div>

        <div className="text-center max-w-5xl px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <div className="h-px w-12 bg-orange-600" />
            <span className="text-orange-600 font-mono text-xs uppercase tracking-widest font-bold">
              What's Next?
            </span>
            <div className="h-px w-12 bg-orange-600" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-9xl font-black uppercase italic tracking-tighter text-white mb-12"
          >
            Let's Build <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-orange-500 to-orange-700">
              The Future
            </span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex flex-col md:flex-row items-center justify-center gap-6"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group px-12 py-6 bg-white text-black font-black uppercase text-lg hover:bg-orange-600 transition-all duration-300 flex items-center gap-3"
            >
              Start Project
              <ArrowUpRight className="group-hover:rotate-45 transition-transform duration-300" size={24} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group px-12 py-6 border border-white/20 text-white font-black uppercase text-lg hover:bg-white/5 transition-all duration-300 flex items-center gap-3"
            >
              <Mail size={24} />
              Email Us
            </motion.button>
          </motion.div>
        </div>

        {/* Footer Bottom Info */}
        <div className="absolute bottom-12 left-0 w-full px-12 flex justify-between items-end text-xs font-mono text-gray-500 uppercase tracking-widest">
            <div>© 2024 Botmartz</div>
            <div className="hidden md:block">Scroll to Top</div>
        </div>
      </section>
    </div>
  );
}

export default WorkPage;