import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { GridPattern } from "../shared";

export default function Stack() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0.6, 0.7, 0.8], [0, 0.2, 0]);

  return (
    <section className="py-24 md:py-60 bg-[#020202] relative overflow-hidden border-y border-white/5">
      <motion.div style={{ opacity }} className="absolute inset-0">
        <GridPattern size={40} />
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-40">
        <div className="space-y-12 md:space-y-24">
          <div className="overflow-hidden">
            <motion.h2 initial={{ y: "100%" }} whileInView={{ y: 0 }} transition={{ duration: 0.8 }} className="text-5xl md:text-7xl font-black uppercase italic leading-none">
              The<br /><span className="text-orange-600">Stack</span>
            </motion.h2>
          </div>
          {/* Mapping specs... */}
        </div>
        
        <motion.div initial={{ scale: 0.9, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} className="bg-[#0a0a0a] rounded-3xl p-6 md:p-12 border border-white/5 flex flex-col gap-6 shadow-[0_0_50px_rgba(234,88,12,0.05)]">
           <div className="flex justify-between items-center border-b border-white/5 pb-6">
             <span className="text-[10px] md:text-xs font-mono text-orange-500 uppercase italic">Live_Sprint_Log.txt</span>
           </div>
           {/* Mapping log entries... */}
        </motion.div>
      </div>
    </section>
  );
}