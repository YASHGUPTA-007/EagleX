import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="h-screen flex flex-col justify-center items-center relative overflow-hidden bg-orange-600 text-black">
      <div className="absolute inset-0 opacity-10 flex flex-col gap-10 select-none py-10">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ x: i % 2 === 0 ? [-200, 0] : [0, -200] }}
            transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
            className="text-[12vw] font-black uppercase italic leading-none whitespace-nowrap"
          >
            BUILD_MVP_NOW_BUILD_MVP_NOW
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8 }} className="relative z-10 text-center cursor-pointer group">
        <h2 className="text-[14vw] font-black uppercase leading-[0.7] tracking-tighter italic">
          Launch<br />
          <span className="text-transparent stroke-black transition-all duration-500 group-hover:text-black" style={{ WebkitTextStroke: "1px black" }}>Now</span>
        </h2>
        <div className="mt-12 flex justify-center items-center gap-6">
          <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center">
            <ArrowUpRight className="text-orange-600" size={40} />
          </div>
          <p className="text-xl md:text-4xl font-black uppercase italic underline underline-offset-8">Book Intro Call</p>
        </div>
      </motion.div>
    </section>
  );
}