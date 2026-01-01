"use client";
import React from "react";
import { motion } from "framer-motion";
import { Command } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#020202] pt-24 md:pt-60 pb-12 px-6 md:px-20 border-t border-white/5 relative z-20">
      <div className="max-w-500 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-32 mb-16 md:mb-60">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-6 space-y-12 md:space-y-16"
          >
            <div className="flex items-center gap-6 group">
               <motion.div 
                whileHover={{ rotate: 180 }}
                className="w-12 h-12 md:w-16 md:h-16 bg-orange-600 rounded-sm flex items-center justify-center cursor-pointer"
               >
                  <Command className="text-black" size={24} />
               </motion.div>
               <span className="text-5xl md:text-7xl font-black uppercase italic tracking-tighter transition-all group-hover:text-orange-600">EagleX</span>
            </div>
            <p className="text-xl md:text-3xl text-zinc-500 font-medium leading-relaxed max-w-2xl uppercase tracking-tighter">
              Architecting the future of global enterprise. Zero-latency. Zero-failure. <span className="text-white">Absolute-precision.</span>
            </p>
            
            <div className="flex gap-8 md:gap-12 flex-wrap">
               {[
                 { label: "Operational Hub", val: "San Francisco, CA" },
                 { label: "Network Node", val: "Stockholm, SE" }
               ].map((hub, idx) => (
                 <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.2 * idx }}
                  key={idx} className="space-y-2 border-l border-white/10 pl-6"
                 >
                    <span className="text-orange-600 font-mono text-[10px] md:text-xs uppercase tracking-widest">{hub.label}</span>
                    <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest leading-tight">{hub.val}</p>
                 </motion.div>
               ))}
            </div>
          </motion.div>
          
          <div className="lg:col-span-6 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-20">
            {[
              { title: "Sub-Networks", links: ["Foundry", "Arsenal", "Infra", "Stack", "Clients"] },
              { title: "Sync_Links", links: ["Twitter / X", "GitHub", "LinkedIn", "Discord", "Behance"] },
              { title: "Protocols", links: ["Privacy", "Security", "Terms", "Cookies"] }
            ].map((group, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * idx }}
                key={idx} className="space-y-6 md:space-y-10"
              >
                 <h5 className="text-[10px] md:text-xs font-mono text-orange-500 uppercase tracking-widest font-black flex items-center gap-2">
                   <span className="w-1.5 h-1.5 bg-orange-600 rounded-full" /> {group.title}
                 </h5>
                 <ul className="space-y-2 md:space-y-4">
                   {group.links.map(l => (
                     <li key={l} className="overflow-hidden">
                        <motion.a 
                          whileHover={{ x: 10, color: "#ea580c" }}
                          href="#" className="text-base md:text-lg font-black uppercase transition-all tracking-tight block"
                        >
                          {l}
                        </motion.a>
                     </li>
                   ))}
                 </ul>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 border-t border-white/5 pt-12">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-6 md:gap-10 text-[10px] md:text-xs font-black uppercase tracking-widest text-zinc-700">
              <motion.span animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1 }}>TX_LAT: 0.12ms</motion.span>
              <span>STATUS: STABLE_ALPHA</span>
              <span>ENCRYPT: AES_GCM_X4</span>
            </div>
            <div className="text-[10px] md:text-xs font-mono text-zinc-600 uppercase tracking-widest">
              © 2025 EagleX Global Nexus ● system_build_v4.2.0-final
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-4 w-full md:w-auto">
             <div className="flex gap-12 font-black uppercase text-[10px] md:text-xs">
               <span className="cursor-pointer hover:text-orange-600 transition-colors tracking-widest">Handshake Nominal</span>
               <span className="cursor-pointer hover:text-orange-600 transition-colors tracking-widest">Node Operational</span>
             </div>
             <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              transition={{ duration: 1.5, ease: "circOut" }}
              className="h-1 w-full md:w-[20rem] bg-linear-to-r from-transparent via-orange-600/30 to-transparent" 
             />
          </div>
        </div>
      </div>
    </footer>
  );
}