"use client";

import React from "react";

import { motion } from "framer-motion";

import { Cpu, Shield, Zap } from "lucide-react";

export default function Hero() {
  return (
    <section className="h-screen relative flex flex-col justify-center items-center px-4 md:px-6 overflow-hidden bg-[#020202]">
      {/* Background Rings */}

      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-10 w-72 h-72 border border-orange-600/20 rounded-full animate-[spin_25s_linear_infinite]" />

        <div className="absolute bottom-1/4 right-10 w-125 h-125 border border-orange-600/10 rounded-full animate-[spin_40s_linear_infinite_reverse]" />

        <div className="absolute inset-0 overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: -100, opacity: 0 }}
              animate={{ y: "110vh", opacity: [0, 0.5, 0] }}
              transition={{
                duration: 5 + Math.random() * 5,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
              className="absolute w-px h-20 bg-linear-to-b from-transparent via-orange-600 to-transparent"
              style={{ left: `${Math.random() * 100}%` }}
            />
          ))}
        </div>
      </div>

      <motion.div
        style={{ perspective: 1200 }}
        className="z-10 text-center relative flex flex-col items-center w-full"
      >
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: "100%", opacity: 1 }}
          transition={{ duration: 1.5, ease: "circOut" }}
          className="flex items-center justify-center gap-4 md:gap-8 mb-8 md:mb-16 max-w-5xl px-4 w-full"
        >
          <div className="h-px flex-1 bg-linear-to-r from-transparent via-orange-600 to-orange-600" />

          <div className="flex items-center gap-2 md:gap-3 font-mono text-[10px] md:text-xs text-orange-500 tracking-widest uppercase whitespace-nowrap">
            <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-orange-600 animate-ping rounded-full" />

            <span>Uplink_Established_V.4.2</span>
          </div>

          <div className="h-px flex-1 bg-linear-to-l from-transparent via-orange-600 to-orange-600" />
        </motion.div>

        <motion.div
          initial={{ rotateX: 35, opacity: 0, scale: 0.9 }}
          animate={{ rotateX: 0, opacity: 1, scale: 1 }}
          whileHover={{ rotateX: -10, rotateY: 5 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative cursor-default select-none"
        >
          <h1 className="text-[17vw] md:text-[20vw] font-black uppercase leading-[0.7] tracking-tighter italic text-white group">
            EagleX
            <br />
          </h1>
        </motion.div>

        <div className="mt-12 md:mt-28 grid grid-cols-1 md:grid-cols-3 gap-0 bg-white/5 border border-white/10 backdrop-blur-3xl w-full max-w-7xl mx-auto divide-y md:divide-y-0 md:divide-x divide-white/10 overflow-hidden">
          {[
            {
              label: "CORE",

              title: "Atomic Sync",

              desc: "Next-gen distributed kernels built for absolute zero-latency execution.",

              icon: <Cpu size={16} />,
            },

            {
              label: "FORTRESS",

              title: "Quantum Logic",

              desc: "Zero-trust protocols as standard. Hardened logic gates at every network node.",

              icon: <Shield size={16} />,
            },

            {
              label: "SPEED",

              title: "Blitz Protocol",

              desc: "Proprietary deployment pipelines that physically outpace the global CDN.",

              icon: <Zap size={16} />,
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + idx * 0.2, duration: 0.8 }}
              className="group relative p-8 md:p-14 hover:bg-orange-600/3 transition-all duration-700 overflow-hidden text-left"
            >
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-orange-600/40 group-hover:border-orange-600 transition-colors" />

              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-orange-600/40 group-hover:border-orange-600 transition-colors" />

              <div className="flex items-center gap-4 mb-4 md:mb-8">
                <div className="text-orange-600 group-hover:rotate-360 transition-transform duration-1000">
                  {item.icon}
                </div>

                <span className="text-orange-600 font-mono text-xs tracking-widest uppercase font-black opacity-50 group-hover:opacity-100 transition-opacity">
                  {item.label}
                </span>
              </div>

              <h3 className="text-2xl md:text-3xl font-black text-white mb-2 md:mb-4 uppercase tracking-tighter italic leading-none group-hover:text-orange-500 transition-colors">
                {item.title}
              </h3>

              <p className="text-[10px] md:text-xs text-gray-400 font-bold leading-relaxed uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">
                {item.desc}
              </p>

              <span className="absolute -bottom-6 -right-4 text-6xl md:text-7xl font-black text-white/1 italic select-none pointer-events-none group-hover:text-white/3 transition-colors">
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-6 md:bottom-14 flex flex-col items-center gap-5 cursor-pointer"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-px bg-orange-600/30" />

          <span className="text-xs font-mono uppercase tracking-widest text-orange-600 animate-pulse">
            Engage_Scroll
          </span>

          <div className="w-12 h-px bg-orange-600/30" />
        </div>

        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border border-orange-600/50 rounded-full flex justify-center p-1.5 backdrop-blur-sm"
        >
          <motion.div className="w-1.5 h-1.5 bg-orange-600 rounded-full shadow-[0_0_12px_#ea580c]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
