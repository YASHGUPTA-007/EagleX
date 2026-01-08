import React from "react";
import { Activity } from "lucide-react";
import { RevealTitle } from "../shared"; 

export default function Mission() {
  return (
    <section className="py-20 md:py-60 px-6 max-w-450 mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20">
        <div className="lg:col-span-9">
          <RevealTitle className="text-xs md:text-sm font-mono text-orange-500 mb-6 md:mb-12 tracking-widest uppercase font-black">
            Section_01 // The Mission
          </RevealTitle>
          <p className="text-4xl md:text-[8vw] font-black leading-[0.9] md:leading-[0.85] uppercase tracking-tighter">
            We don&apos;t just write code. We <span className="text-gray-700 italic">launch businesses</span> in <span className="text-orange-600">record time.</span>
          </p>
        </div>
        <div className="lg:col-span-3 flex flex-col justify-end gap-8 md:gap-12">
          <div className="p-8 md:p-10 bg-white/5 border border-white/10 rounded-3xl space-y-6 group cursor-pointer">
            <Activity className="text-orange-600" size={32} />
            <p className="text-gray-400 text-xs md:text-sm leading-relaxed uppercase font-bold tracking-widest group-hover:text-white transition-colors">
              Market speed is your only advantage. We translate your rough ideas into a deployed, investor-ready MVP in one week.
            </p>
          </div>
          <div className="text-[12vw] font-black text-white/3 leading-none uppercase italic select-none hidden md:block">Speed</div>
        </div>
      </div>
    </section>
  );
}