// "use client";
// import React, { useEffect, useRef, useState } from "react";
// import { motion, useScroll, useTransform, AnimatePresence, useSpring } from "framer-motion";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { 
//   ArrowUpRight, Code2, Cpu, Globe, Zap, Fingerprint, 
//   Layers, Shield, Terminal, Database, Rocket, 
//   Users, Workflow, Activity, ChevronDown, Command, 
//   MousePointer2, Radio, Server, Share2 
// } from "lucide-react";

// if (typeof window !== "undefined") {
//   gsap.registerPlugin(ScrollTrigger);
// }

// // --- UTILS & HOOKS ---
// const useMousePosition = () => {
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   useEffect(() => {
//     const updateMousePosition = (e: MouseEvent) => {
//       setMousePosition({ x: e.clientX, y: e.clientY });
//     };
//     window.addEventListener("mousemove", updateMousePosition);
//     return () => window.removeEventListener("mousemove", updateMousePosition);
//   }, []);
//   return mousePosition;
// };

// // --- COMPONENTS ---

// const CustomCursor = () => {
//   const { x, y } = useMousePosition();
//   return (
//     <motion.div 
//       className="fixed top-0 left-0 w-8 h-8 bg-orange-600 rounded-full mix-blend-difference pointer-events-none z-[999] flex items-center justify-center"
//       animate={{ x: x - 16, y: y - 16 }}
//       transition={{ type: "spring", damping: 25, stiffness: 250, mass: 0.5 }}
//     >
//       <div className="w-1 h-1 bg-black rounded-full" />
//     </motion.div>
//   );
// };

// const NoiseOverlay = () => (
//   <div className="fixed inset-0 z-[1] pointer-events-none opacity-[0.03] contrast-150 brightness-150">
//     <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
//       <filter id="noiseFilter">
//         <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
//       </filter>
//       <rect width="100%" height="100%" filter="url(#noiseFilter)" />
//     </svg>
//   </div>
// );

// // --- MAIN PAGE COMPONENT ---

// export default function EagleXMasterpiece() {
//   const containerRef = useRef(null);
//   const horizontalRef = useRef(null);
//   const videoRef = useRef(null);
//   const { scrollYProgress } = useScroll();
//   const scaleProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

//   useEffect(() => {
//     // GSAP Horizontal Scroll Logic
//     const sections = gsap.utils.toArray(".h-panel");
//     gsap.to(sections, {
//       xPercent: -100 * (sections.length - 1),
//       ease: "none",
//       scrollTrigger: {
//         trigger: ".h-container",
//         pin: true,
//         scrub: 1,
//         snap: 1 / (sections.length - 1),
//         end: () => "+=" + (horizontalRef.current as any).offsetWidth,
//       },
//     });

//     // Parallax elements
//     gsap.to(".parallax-bg", {
//       yPercent: 50,
//       ease: "none",
//       scrollTrigger: {
//         trigger: ".parallax-section",
//         scrub: true
//       }
//     });

//     return () => {
//       ScrollTrigger.getAll().forEach(t => t.kill());
//     };
//   }, []);

//   return (
//     <div ref={containerRef} className="relative bg-[#050505] text-[#e5e5e5] overflow-x-hidden selection:bg-orange-600">
//       <CustomCursor />
//       <NoiseOverlay />

//       {/* 1. FLOATING NAV (CYBERPUNK GLASS) */}
//       <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-5xl">
//         <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl px-8 py-4 flex justify-between items-center shadow-2xl">
//           <div className="flex items-center gap-2 group cursor-pointer">
//             <div className="w-8 h-8 bg-orange-600 rounded flex items-center justify-center rotate-45 group-hover:rotate-180 transition-transform duration-500">
//               <Command size={16} className="text-black -rotate-45 group-hover:rotate-[-180deg] transition-transform duration-500" />
//             </div>
//             <span className="text-2xl font-black tracking-tighter uppercase italic">EagleX</span>
//           </div>
//           <div className="hidden lg:flex gap-10">
//             {['Strategy', 'Architect', 'Stacks', 'Nexus'].map((item) => (
//               <a key={item} href={`#${item.toLowerCase()}`} className="text-[10px] uppercase tracking-[0.2em] font-bold hover:text-orange-500 transition-colors">
//                 {item}
//               </a>
//             ))}
//           </div>
//           <button className="relative overflow-hidden px-6 py-2 bg-white text-black text-[10px] font-black uppercase tracking-widest rounded-lg group">
//             <span className="relative z-10">Secure Slot</span>
//             <div className="absolute inset-0 bg-orange-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
//           </button>
//         </div>
//       </nav>

//       {/* 2. HERO: KINETIC TYPOGRAPHY */}
//       <section className="h-screen flex flex-col justify-center items-center relative px-4 text-center overflow-hidden">
//         <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-900/20 blur-[120px] rounded-full animate-pulse" />
//         <motion.div 
//           initial={{ opacity: 0, y: 50 }} 
//           animate={{ opacity: 1, y: 0 }}
//           className="z-10"
//         >
//           <span className="inline-block border border-orange-500/30 px-4 py-1 rounded-full text-[10px] text-orange-500 font-mono tracking-widest mb-8">
//             SYSTEM STATUS: OPERATIONAL // V.2025
//           </span>
//           <h1 className="text-[14vw] md:text-[16vw] font-black leading-[0.75] uppercase tracking-tighter italic">
//             DIGITAL<br />
//             <span className="text-transparent border-t-2 border-b-2 border-orange-600 px-4">WARFARE</span>
//           </h1>
//           <div className="mt-12 flex flex-col md:flex-row gap-8 items-center justify-center uppercase tracking-widest text-[10px] text-gray-400">
//             <span className="flex items-center gap-2"><Radio size={14} className="text-orange-500 animate-pulse" /> Low Latency Node</span>
//             <span className="flex items-center gap-2"><Fingerprint size={14} className="text-orange-500" /> Zero Trust Architecture</span>
//             <span className="flex items-center gap-2"><Zap size={14} className="text-orange-500" /> Next.js 15 Engine</span>
//           </div>
//         </motion.div>
//         <motion.div 
//           style={{ scaleY: scaleProgress }} 
//           className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[1px] h-32 bg-gradient-to-t from-orange-600 to-transparent origin-bottom"
//         />
//       </section>

//       {/* 3. RUNNING BANNER: THE HYPER-SPEED TRACK */}
//       <div className="relative z-20 -rotate-2 scale-110 bg-orange-600 py-6 border-y-4 border-black flex overflow-hidden whitespace-nowrap">
//         {[1, 2, 3, 4, 5].map((i) => (
//           <div key={i} className="flex items-center animate-marquee">
//             <span className="text-6xl font-black text-black uppercase italic px-10 leading-none">EagleX Systems ● Neural Core ● Scalable Infra ● No-Latency Dev ●</span>
//           </div>
//         ))}
//       </div>

//       {/* 4. MANIFESTO: BRUTALIST GRID */}
//       <section className="py-40 px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-[1800px] mx-auto">
//         <div className="lg:col-span-8">
//           <h2 className="text-sm font-mono text-orange-500 mb-8">[04/SECTION: PHILOSOPHY]</h2>
//           <p className="text-5xl md:text-8xl font-bold leading-[0.9] tracking-tighter uppercase">
//             We architect <span className="text-gray-700 italic">unbreakable</span> digital dominance through <span className="text-orange-600">atomic engineering.</span>
//           </p>
//         </div>
//         <div className="lg:col-span-4 flex flex-col justify-end gap-10">
//           <div className="p-8 border border-white/10 rounded-3xl bg-white/5">
//             <Activity className="text-orange-600 mb-6" size={40} />
//             <p className="text-gray-400 text-sm leading-relaxed">
//               Our dev-ops pipelines are optimized for 99.99% uptime. We don't just ship code; we deploy revenue-generating machines.
//             </p>
//           </div>
//           <div className="text-orange-600 text-[10vw] font-black leading-none text-right opacity-10 uppercase italic">
//             Dominance
//           </div>
//         </div>
//       </section>

//       {/* 5, 6, 7, 8: HORIZONTAL SCROLL: THE ARCHITECTURE */}
//       <div className="h-container relative overflow-hidden">
//         <div ref={horizontalRef} className="flex w-[400vw] h-screen bg-[#080808]">
//           <div className="h-panel w-screen h-full flex flex-col justify-center px-20 relative">
//             <span className="text-[30vw] absolute -bottom-10 right-0 font-black text-white/[0.02] leading-none uppercase">Core</span>
//             <div className="max-w-4xl relative z-10">
//               <h3 className="text-orange-600 font-mono mb-4">#05 // SYSTEM_ARCHITECTURE</h3>
//               <h4 className="text-8xl font-black uppercase tracking-tighter mb-8">Atomic Structuring</h4>
//               <p className="text-xl text-gray-400 max-w-2xl">Modular component libraries built with shadcn/ui and custom-engineered primitives for infinite scalability.</p>
//             </div>
//           </div>
//           <div className="h-panel w-screen h-full flex flex-col justify-center px-20 bg-[#0a0a0a]">
//             <div className="max-w-4xl">
//               <h3 className="text-orange-600 font-mono mb-4">#06 // NEURAL_STACK</h3>
//               <h4 className="text-8xl font-black uppercase tracking-tighter mb-8">Intelligence Layer</h4>
//               <p className="text-xl text-gray-400 max-w-2xl">Native integration of vector databases (Pinecone/Weaviate) for RAG-enabled AI applications.</p>
//             </div>
//           </div>
//           <div className="h-panel w-screen h-full flex flex-col justify-center px-20 relative">
//             <span className="text-[30vw] absolute -top-10 left-0 font-black text-white/[0.02] leading-none uppercase">Pulse</span>
//             <div className="max-w-4xl">
//               <h3 className="text-orange-600 font-mono mb-4">#07 // VELOCITY_PROTOCOL</h3>
//               <h4 className="text-8xl font-black uppercase tracking-tighter mb-8">Edge Optimization</h4>
//               <p className="text-xl text-gray-400 max-w-2xl">Vercel Edge functions combined with Rust-based core logic for sub-10ms response times globally.</p>
//             </div>
//           </div>
//           <div className="h-panel w-screen h-full flex flex-col justify-center px-20 bg-orange-600 text-black">
//             <div className="max-w-4xl">
//               <h3 className="font-mono mb-4 text-black/60">#08 // SEC_PROTOCOL</h3>
//               <h4 className="text-8xl font-black uppercase tracking-tighter mb-8">Fortified Base</h4>
//               <p className="text-xl font-bold max-w-2xl text-black/80">Penetration-tested security layers, SOC2 compliant workflows, and end-to-end encrypted data streams.</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* 9. THE LAB (BENTO GRID REFINED) */}
//       <section id="nexus" className="py-40 px-6 max-w-[1800px] mx-auto">
//         <h2 className="text-sm font-mono text-orange-500 mb-16 tracking-widest">[ 09 / THE NEXUS LAB ]</h2>
//         <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-[1000px]">
//           <div className="md:col-span-2 row-span-2 bg-[#111] border border-white/5 rounded-[2rem] p-12 flex flex-col justify-between group overflow-hidden relative">
//             <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/10 blur-[80px] group-hover:bg-orange-600/20 transition-all duration-700" />
//             <Layers className="text-orange-600 group-hover:scale-110 transition-transform" size={48} />
//             <div>
//               <h3 className="text-5xl font-black uppercase mb-4 leading-none">Omni-Channel<br />Syncing</h3>
//               <p className="text-gray-500 text-lg">One codebase, infinite platforms. React Native and Next.js synchronized via a shared logic layer.</p>
//             </div>
//           </div>
//           <div className="bg-orange-600 rounded-[2rem] p-12 flex flex-col justify-between cursor-pointer group hover:rotate-2 transition-all">
//             <Rocket className="text-black" size={48} />
//             <h3 className="text-3xl font-black uppercase text-black leading-none">Blitz<br />Release</h3>
//           </div>
//           <div className="bg-[#111] border border-white/5 rounded-[2rem] p-12 flex flex-col justify-between">
//             <Database className="text-orange-600" size={48} />
//             <h3 className="text-2xl font-bold uppercase">Data<br />Visualization</h3>
//           </div>
//           <div className="md:col-span-2 bg-white text-black rounded-[2rem] p-12 flex items-center justify-between group">
//             <div className="max-w-xs">
//               <h3 className="text-4xl font-black uppercase mb-2 leading-none">Custom<br />Hardware</h3>
//               <p className="text-sm font-medium opacity-60 italic">IoT integration specialists.</p>
//             </div>
//             <ArrowUpRight className="group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform duration-500" size={80} />
//           </div>
//         </div>
//       </section>

//       {/* 10. TECH ORCHESTRATION (TICKER + GRID) */}
//       <section className="py-32 border-y border-white/5 overflow-hidden">
//         <div className="flex gap-20 animate-infinite-scroll opacity-30">
//           {["REACT", "NEXTJS", "GSAP", "FRAMER", "RUST", "GOLANG", "PYTHON", "POSTGRES", "AWS", "VERCEL", "DOCKER", "KUBERNETES"].map((t) => (
//             <span key={t} className="text-[12vw] font-black text-transparent border-white stroke-white uppercase leading-none" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.2)" }}>
//               {t}
//             </span>
//           ))}
//         </div>
//       </section>

//       {/* 11. PROCESS: RADIAL STEPS */}
//       <section className="py-40 px-6 max-w-7xl mx-auto">
//          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
//            <div>
//               <h2 className="text-7xl font-black uppercase tracking-tighter mb-10">The Execution<br />Pipeline</h2>
//               <div className="space-y-12">
//                 {[
//                   { step: "01", title: "Cybernetic Discovery", desc: "We extract every technical requirement and business bottleneck." },
//                   { step: "02", title: "Atomic Design", desc: "Design systems built for velocity and visual punch." },
//                   { step: "03", title: "Heavy Metal Dev", desc: "Hardened code, military-grade security, and extreme performance." },
//                   { step: "04", title: "Global Deployment", desc: "Pushing to 300+ edge locations for instant global accessibility." }
//                 ].map((item) => (
//                   <div key={item.step} className="flex gap-8 group">
//                     <span className="text-2xl font-mono text-orange-600">{item.step}</span>
//                     <div>
//                       <h4 className="text-2xl font-bold uppercase group-hover:text-orange-500 transition-colors">{item.title}</h4>
//                       <p className="text-gray-500 mt-2">{item.desc}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//            </div>
//            <div className="relative aspect-square bg-[#111] rounded-full flex items-center justify-center border border-white/5 overflow-hidden">
//               <div className="absolute inset-0 bg-[conic-gradient(from_0deg,_transparent,_#ea580c)] opacity-10 animate-spin-slow" />
//               <div className="text-center z-10">
//                 <Workflow size={80} className="text-orange-600 mx-auto mb-6" />
//                 <span className="text-sm font-mono tracking-widest uppercase">System Flux Active</span>
//               </div>
//            </div>
//          </div>
//       </section>

//       {/* 12. TESTIMONIALS (ULTRA-BOLD) */}
//       <section className="py-40 bg-white text-black overflow-hidden relative">
//         <div className="absolute top-0 left-0 text-[40vw] font-black opacity-[0.03] leading-none pointer-events-none">QUOTE</div>
//         <div className="max-w-7xl mx-auto px-6 relative z-10">
//           <p className="text-4xl md:text-7xl font-bold leading-tight tracking-tighter uppercase italic">
//             "EagleX didn't just rebuild our app; they rebuilt our entire technical identity. Their team works like a <span className="text-orange-600">special ops unit.</span>"
//           </p>
//           <div className="mt-12 flex items-center gap-6">
//             <div className="w-16 h-[2px] bg-black" />
//             <p className="font-black uppercase tracking-widest">Director of Eng @ Silicon Labs</p>
//           </div>
//         </div>
//       </section>

//       {/* 13. FINAL CTA (MEGA SCALE) */}
//       <section className="h-screen flex flex-col justify-center items-center px-4">
//         <motion.div 
//           whileHover={{ scale: 0.95 }}
//           className="group cursor-pointer text-center"
//         >
//           <h2 className="text-[14vw] font-black leading-none uppercase tracking-tighter italic transition-all duration-700 group-hover:text-orange-600">
//             Let's Build<br />The Future
//           </h2>
//           <div className="mt-10 flex items-center justify-center gap-4">
//             <div className="w-20 h-20 bg-orange-600 rounded-full flex items-center justify-center group-hover:scale-125 transition-transform duration-500">
//                <ArrowUpRight size={40} className="text-black" />
//             </div>
//             <span className="text-2xl font-bold tracking-widest uppercase italic">Start the Protocol</span>
//           </div>
//         </motion.div>
//       </section>

//       {/* 14. FOOTER (INDUSTRIAL REFINED) */}
//       <footer className="bg-[#080808] pt-32 pb-12 px-6 border-t border-white/5">
//         <div className="max-w-[1800px] mx-auto">
//           <div className="grid grid-cols-1 lg:grid-cols-4 gap-20 mb-32">
//             <div className="lg:col-span-2">
//               <div className="text-6xl font-black italic mb-8">EAGLEX.SYSTEMS</div>
//               <p className="text-gray-500 max-w-md text-lg leading-relaxed">
//                 Elite development for those who demand excellence. Based in SF / NYC / Global.
//               </p>
//             </div>
//             <div>
//               <h4 className="text-orange-500 font-mono text-xs uppercase tracking-widest mb-8">Directories</h4>
//               <ul className="space-y-4 text-sm font-bold uppercase tracking-widest">
//                 <li><a href="#" className="hover:text-orange-500">Case Studies</a></li>
//                 <li><a href="#" className="hover:text-orange-500">Open Source</a></li>
//                 <li><a href="#" className="hover:text-orange-500">Internal Lab</a></li>
//                 <li><a href="#" className="hover:text-orange-500">The Stack</a></li>
//               </ul>
//             </div>
//             <div>
//               <h4 className="text-orange-500 font-mono text-xs uppercase tracking-widest mb-8">Network</h4>
//               <ul className="space-y-4 text-sm font-bold uppercase tracking-widest">
//                 <li><a href="#" className="hover:text-orange-500">X / Twitter</a></li>
//                 <li><a href="#" className="hover:text-orange-500">GitHub</a></li>
//                 <li><a href="#" className="hover:text-orange-500">LinkedIn</a></li>
//                 <li><a href="#" className="hover:text-orange-500">Discord</a></li>
//               </ul>
//             </div>
//           </div>
//           <div className="flex flex-col md:flex-row justify-between items-center gap-10 pt-12 border-t border-white/5 text-[10px] font-mono text-gray-600 uppercase tracking-[0.3em]">
//             <span>© 2025 EagleX / Encrypted Connection Secured</span>
//             <div className="flex gap-10">
//               <span>Term: 404_READY</span>
//               <span>Status: NOMINAL</span>
//               <span>Lat: 37.7749 N</span>
//             </div>
//           </div>
//         </div>
//       </footer>

//       {/* GLOBAL CSS STYLES (Add to globals.css) */}
//       <style jsx global>{`
//         @keyframes marquee {
//           0% { transform: translateX(0); }
//           100% { transform: translateX(-100%); }
//         }
//         .animate-marquee {
//           animation: marquee 30s linear infinite;
//         }
//         @keyframes infinite-scroll {
//           from { transform: translateX(0); }
//           to { transform: translateX(-50%); }
//         }
//         .animate-infinite-scroll {
//           animation: infinite-scroll 60s linear infinite;
//           width: fit-content;
//         }
//         .animate-spin-slow {
//           animation: spin 10s linear infinite;
//         }
//         @keyframes spin {
//           from { transform: rotate(0deg); }
//           to { transform: rotate(360deg); }
//         }
//         .text-outline {
//           -webkit-text-stroke: 1px rgba(255,255,255,0.3);
//           color: transparent;
//         }
//         body::-webkit-scrollbar {
//           display: none;
//         }
//         body {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//       `}</style>
//     </div>
//   );
// }