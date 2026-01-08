import React from "react";
import { motion } from "framer-motion";

export default function Testimonials() {
  return (
    <section className="py-24 md:py-60 px-6 border-t border-white/5 relative overflow-hidden">
      {/* Background Floating Text */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 0.02 }}
        transition={{ duration: 2, ease: "circOut" }}
        className="absolute top-1/2 left-0 w-full text-[25vw] font-black -translate-y-1/2 pointer-events-none italic select-none whitespace-nowrap"
      >
        Founders Founders Founders
      </motion.div>

      <div className="max-w-7xl mx-auto text-center space-y-20 md:space-y-40 relative z-10">
        {/* Alliances / Logo Section */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.2 },
            },
          }}
          className="flex flex-col md:flex-row justify-between items-center gap-10 md:gap-20 opacity-40 hover:opacity-100 transition-opacity duration-700 grayscale hover:grayscale-0"
        >
          {["Y-COMBINATOR Startup", "TechStars Alumni", "IndieHacker", "SaaS Founder"].map((logo) => (
            <motion.div
              key={logo}
              variants={{
                hidden: { y: 20, opacity: 0 },
                show: { y: 0, opacity: 1 },
              }}
              whileHover={{ scale: 1.1, skewX: -10 }}
              className="text-xl md:text-3xl font-black uppercase italic tracking-tighter cursor-crosshair transition-all"
            >
              {logo}
            </motion.div>
          ))}
        </motion.div>

        {/* Main Quote */}
        <div className="space-y-12">
          <div className="overflow-hidden">
            <motion.blockquote
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl md:text-8xl font-black uppercase italic tracking-tighter leading-none max-w-6xl mx-auto"
            >
              &quot;They took my napkin sketch and gave me a <span className="text-orange-600">live product</span> in 6 days. We raised our <span className="italic">Pre-Seed</span> the next month.&quot;
            </motion.blockquote>
          </div>

          <motion.div
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: "auto" }}
            transition={{ delay: 0.5, duration: 1 }}
            className="flex items-center justify-center gap-6 overflow-hidden"
          >
            <div className="h-px w-12 bg-orange-600" />
            <span className="font-mono text-orange-600 text-[10px] md:text-xs uppercase tracking-widest whitespace-nowrap">
              CEO, FinTech Startup (San Francisco)
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}