import React from "react";
import { motion } from "framer-motion";
import { Zap, Hexagon } from "lucide-react";

export default function Marquee() {
  return (
    <div className="relative py-8 md:py-12 bg-orange-600 border-y-4 border-black overflow-hidden flex select-none z-20 -rotate-1 origin-center scale-105">
      <motion.div
        animate={{ x: [0, -2000] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="flex whitespace-nowrap items-center gap-10 md:gap-20 px-10"
      >
        {[...Array(12)].map((_, i) => (
          <React.Fragment key={i}>
            <span className="text-5xl md:text-7xl font-black uppercase text-black italic">MVP in 7 Days</span>
            <Zap className="text-black fill-black" size={32} />
            <span className="text-5xl md:text-7xl font-black uppercase text-black italic">Rapid Execution</span>
            <Hexagon className="text-black" size={32} />
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
}