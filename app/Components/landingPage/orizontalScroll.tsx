import React from "react";
import { Clock, FileCode, Rocket } from "lucide-react";

export default function HorizontalScroll({ horizontalRef }: { horizontalRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div className="h-trigger relative h-screen overflow-hidden">
      <div ref={horizontalRef} className="flex flex-row h-full w-[400vw]">
        
        {/* Panel 1: The Timeline */}
        <div className="h-panel w-screen h-full bg-[#080808] border-r border-white/5 flex flex-col md:grid md:grid-cols-2 relative">
          <div className="p-8 md:p-24 flex flex-col justify-center relative z-10 order-2 md:order-1 h-1/2 md:h-full">
            <div className="mb-8">
              <Clock size={48} className="text-orange-600 animate-pulse mb-6" />
              <h3 className="text-4xl md:text-8xl font-black uppercase italic tracking-tighter leading-[0.9]">7-Day<br />Sprint</h3>
            </div>
            <p className="text-sm md:text-xl text-gray-500 font-medium leading-relaxed max-w-xl">
              Traditional agencies take months. We take days. From kickoff to live URL, we cut the fluff and build the core features that validate your market.
            </p>
            <div className="flex flex-wrap gap-4 mt-8">
              {["DAY 1: SCOPE", "DAY 3: CORE", "DAY 5: TEST", "DAY 7: LAUNCH"].map(tag => (
                <span key={tag} className="px-3 py-1 border border-orange-600/30 text-[10px] md:text-xs font-mono text-orange-500">{tag}</span>
              ))}
            </div>
          </div>
          <div className="relative h-1/2 md:h-full w-full order-1 md:order-2 overflow-hidden border-b md:border-b-0 md:border-l border-white/5">
            <img src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=2670&auto=format&fit=crop" alt="Rapid Development" className="w-full h-full object-cover opacity-70 scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#080808] via-[#080808]/90 to-transparent" />
          </div>
        </div>

        {/* Panel 2: Lean Inputs */}
        <div className="h-panel w-screen h-full bg-[#0a0a0a] border-r border-white/5 flex flex-col md:grid md:grid-cols-2 relative">
          <div className="relative h-1/2 md:h-full w-full overflow-hidden border-b md:border-b-0 md:border-r border-white/5">
            <img src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2670&auto=format&fit=crop" alt="Whiteboard" className="w-full h-full object-cover opacity-50 grayscale" />
            <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-l from-[#0a0a0a] via-[#0a0a0a]/90 to-transparent" />
          </div>
          <div className="p-8 md:p-24 flex flex-col justify-center text-left md:text-right relative z-10 h-1/2 md:h-full">
            <div className="mb-8 md:ml-auto md:flex md:flex-col md:items-end">
              <FileCode size={48} className="text-orange-600 mb-6" />
              <h3 className="text-4xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9]">Lean<br />Inputs</h3>
            </div>
            <p className="text-sm md:text-xl text-gray-500 font-medium leading-relaxed max-w-xl md:ml-auto">
              We don&apos;t need a 50-page spec document. Send us a voice note, a napkin sketch, or a Loom video.
            </p>
          </div>
        </div>

        {/* Panel 3: Scale Ready */}
        <div className="h-panel w-screen h-full bg-white text-black border-r border-white/5 flex flex-col md:grid md:grid-cols-2 relative">
          <div className="p-8 md:p-24 flex flex-col justify-center relative z-10 h-1/2 md:h-full order-2 md:order-1">
            <Rocket size={48} className="text-orange-600 mb-6" />
            <h3 className="text-4xl md:text-8xl font-black uppercase italic tracking-tighter leading-[0.9]">Scale<br />Ready</h3>
            <p className="text-sm md:text-xl font-bold leading-relaxed max-w-xl">
              Built fast doesn&apos;t mean built cheap. We use Next.js and Supabase.
            </p>
          </div>
          <div className="relative h-1/2 md:h-full w-full order-1 md:order-2 overflow-hidden border-b md:border-b-0 md:border-l border-gray-100">
            <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop" className="w-full h-full object-cover opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-white via-white/80 to-transparent" />
          </div>
        </div>

        {/* Panel 4: Ownership */}
        <div className="h-panel w-screen h-full bg-orange-600 text-black flex flex-col md:grid md:grid-cols-2 relative">
          <div className="relative h-1/2 md:h-full w-full overflow-hidden border-b md:border-b-0 md:border-r border-black/10">
            <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2664&auto=format&fit=crop" className="w-full h-full object-cover opacity-60 grayscale" />
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-orange-600 via-orange-600/80 to-transparent" />
          </div>
          <div className="p-8 md:p-24 flex flex-col justify-center relative z-10 h-1/2 md:h-full">
            <h3 className="text-4xl md:text-8xl font-black uppercase leading-[0.9] italic tracking-tighter mb-8">Full<br />Ownership</h3>
            <p className="text-2xl md:text-3xl font-black uppercase leading-tight">No Lock-ins. <br /> You own the code.</p>
          </div>
        </div>
      </div>
    </div>
  );
}