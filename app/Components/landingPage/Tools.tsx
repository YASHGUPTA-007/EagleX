import React from "react";
import { motion } from "framer-motion";
import { Layers, Rocket, Users, Database, ArrowUpRight } from "lucide-react";

export default function Tools() {
  return (
    <section className="py-24 md:py-60 px-6 max-w-475 mx-auto overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-24 gap-8"
      >
        <div className="space-y-4">
          <span className="text-orange-600 font-mono text-xs uppercase tracking-widest font-black italic block animate-pulse">
            [ DELIVERY_METHODOLOGY ]
          </span>
          <h2 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter leading-[0.8]">
            Tools of<br />Delivery
          </h2>
        </div>
        <p className="max-w-md text-gray-500 text-xs md:text-sm font-bold uppercase tracking-widest leading-relaxed text-left md:text-right border-l-2 md:border-l-0 md:border-r-2 border-orange-600 pl-6 md:pl-0 md:pr-6">
          We use a pre-built, proprietary stack that allows us to skip 80% of the setup time.
        </p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={{ show: { transition: { staggerChildren: 0.1 } } }}
        className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto"
      >
        <motion.div variants={{ hidden: { opacity: 0, scale: 0.95 }, show: { opacity: 1, scale: 1 } }} className="md:col-span-8 bg-[#0a0a0a] border border-white/10 rounded-[2rem] p-8 md:p-16 flex flex-col justify-between group overflow-hidden relative min-h-[400px]">
          <div className="absolute inset-0 bg-linear-to-br from-orange-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <Layers className="text-orange-600" size={48} />
          <h3 className="text-5xl md:text-9xl font-black uppercase italic leading-[0.85] mb-6">Instant UI/UX Kits</h3>
        </motion.div>

        <motion.div variants={{ hidden: { opacity: 0, x: 50 }, show: { opacity: 1, x: 0 } }} className="md:col-span-4 bg-orange-600 rounded-[2rem] p-8 md:p-12 flex flex-col justify-between group cursor-pointer overflow-hidden relative min-h-[300px]">
          <Rocket className="text-black group-hover:-translate-y-20 transition-all duration-700" size={48} />
          <h4 className="text-4xl md:text-5xl font-black uppercase italic text-black leading-none">Day 1 Deploy</h4>
        </motion.div>
        
        {/* Additional Grid Cards follow the same pattern... */}
      </motion.div>
    </section>
  );
}