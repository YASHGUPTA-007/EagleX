"use client";

import React from "react";
import { motion } from "framer-motion";

const steps = [
  { id: "01", title: "Discovery", desc: "1 Hour Call. We define the core features needed for launch." },
  { id: "02", title: "Build", desc: "5 Days of intense coding. You get daily updates via Loom." },
  { id: "03", title: "Launch", desc: "Day 7. We deploy to production. You are live." },
  { id: "04", title: "Iterate", desc: "We support the launch and prep for V2 based on real user data." }
];

export default function Process() {
  return (
    <section className="py-24 md:py-60 bg-white text-black relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-40 gap-10">
          <motion.h2
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-[14vw] font-black uppercase leading-[0.7] tracking-tighter italic"
          >
            The<br />Process
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="max-w-md text-sm md:text-xl font-bold uppercase tracking-tight text-gray-400 italic border-l-4 border-black pl-8"
          >
            We skip the bureaucracy. A simple 4-step process designed to get you to market before your competitors.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-20">
          {steps.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="space-y-6 md:space-y-8 group relative"
            >
              <motion.div
                whileHover={{ x: 20, skewX: -10 }}
                className="text-7xl md:text-9xl font-black text-gray-100 group-hover:text-orange-600 transition-all duration-700 cursor-default select-none"
              >
                {item.id}
              </motion.div>

              <div className="relative z-10">
                <h4 className="text-2xl md:text-3xl font-black uppercase tracking-tighter group-hover:translate-x-2 transition-transform">
                  {item.title}
                </h4>
                <p className="text-gray-500 font-medium leading-relaxed uppercase text-[10px] md:text-xs tracking-widest mt-4">
                  {item.desc}
                </p>
              </div>

              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="h-2 w-full bg-black origin-left"
              />
              <div className="h-2 w-0 group-hover:w-full bg-orange-600 transition-all duration-500 absolute bottom-0 left-0" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}