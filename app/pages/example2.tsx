// "use client";

// import React, { useEffect, useRef, useState, useMemo } from "react";
// import { 
//   motion, 
//   useScroll, 
//   useTransform, 
//   AnimatePresence, 
//   useSpring, 
//   useVelocity, 
//   useAcceleration 
// } from "framer-motion";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { 
//   ArrowUpRight, Code2, Cpu, Globe, Zap, Fingerprint, 
//   Layers, Shield, Terminal, Database, Rocket, 
//   Users, Workflow, Activity, ChevronDown, Command, 
//   MousePointer2, Radio, Server, Share2, Binary, 
//   Box, Eye, HardDrive, Hexagon, Infinity as InfinityIcon, 
//   Microscope, Monitor, Network, PenTool, Processor, 
//   RefreshCcw, Search, Settings, Smartphone, Tablet, 
//   Target, Triangle, Waves 
// } from "lucide-react";
// import { clsx, type ClassValue } from "clsx";
// import { twMerge } from "tailwind-merge";

// /** * UTILS 
//  */
// function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs));
// }

// if (typeof window !== "undefined") {
//   gsap.registerPlugin(ScrollTrigger);
// }

// // --- TYPES ---
// type SectionProps = {
//   children: React.ReactNode;
//   className?: string;
//   id?: string;
// };

// /**
//  * 1. CUSTOM PRIMITIVES & FILTERS
//  */
// const SvgFilters = () => (
//   <svg className="hidden">
//     <defs>
//       <filter id="grain">
//         <feTurbulence type="fractalNoise" baseFrequency="0.60" numOctaves="3" stitchTiles="stitch" />
//         <feColorMatrix type="saturate" values="0" />
//       </filter>
//       <filter id="distort">
//         <feTurbulence type="turbulence" baseFrequency="0.05" numOctaves="2" result="turbulence" />
//         <feDisplacementMap in2="turbulence" in="SourceGraphic" scale="5" xChannelSelector="R" yChannelSelector="G" />
//       </filter>
//     </defs>
//   </svg>
// );

// const GrainOverlay = () => (
//   <div className="fixed inset-0 z-[99] pointer-events-none opacity-[0.05]" style={{ filter: 'url(#grain)' }} />
// );

// /**
//  * 2. REUSABLE UI COMPONENTS (The "Building Blocks")
//  */
// const Section = ({ children, className, id }: SectionProps) => (
//   <section id={id} className={cn("min-h-screen relative overflow-hidden flex flex-col px-6 md:px-12", className)}>
//     {children}
//   </section>
// );

// const MagneticButton = ({ children, className }: { children: React.ReactNode, className?: string }) => {
//   const ref = useRef<HTMLButtonElement>(null);
//   const [position, setPosition] = useState({ x: 0, y: 0 });

//   const handleMouse = (e: React.MouseEvent) => {
//     const { clientX, clientY } = e;
//     const { height, width, left, top } = ref.current!.getBoundingClientRect();
//     const middleX = clientX - (left + width / 2);
//     const middleY = clientY - (top + height / 2);
//     setPosition({ x: middleX * 0.3, y: middleY * 0.3 });
//   };

//   const reset = () => setPosition({ x: 0, y: 0 });

//   return (
//     <motion.button
//       ref={ref}
//       onMouseMove={handleMouse}
//       onMouseLeave={reset}
//       animate={{ x: position.x, y: position.y }}
//       transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
//       className={cn("relative overflow-hidden rounded-full", className)}
//     >
//       {children}
//     </motion.button>
//   );
// };

// /**
//  * 3. THE 14 SECTIONS ENGINE
//  */
// export default function EagleXMonolith() {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const horizontalSectionRef = useRef<HTMLDivElement>(null);
//   const { scrollYProgress } = useScroll();
  
//   // Custom Smooth Scroll Logic (Simplified Lenis Concept)
//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       // Horizontal Scroll Timeline
//       const panels = gsap.utils.toArray(".panel");
//       gsap.to(panels, {
//         xPercent: -100 * (panels.length - 1),
//         ease: "none",
//         scrollTrigger: {
//           trigger: ".horizontal-container",
//           pin: true,
//           scrub: 1,
//           end: () => "+=" + horizontalSectionRef.current?.offsetWidth,
//         }
//       });

//       // Split Text Animation Simulation
//       gsap.from(".reveal-text", {
//         y: 100,
//         opacity: 0,
//         stagger: 0.1,
//         duration: 1,
//         ease: "power4.out",
//         scrollTrigger: {
//           trigger: ".reveal-text",
//           start: "top 80%",
//         }
//       });
//     }, containerRef);
//     return () => ctx.revert();
//   }, []);

//   return (
//     <div ref={containerRef} className="bg-[#050505] text-[#FAFAFA] antialiased">
//       <SvgFilters />
//       <GrainOverlay />
      
//       {/* SECTION 1: FLOATING NAV & HUD */}
//       <motion.nav 
//         initial={{ y: -100 }} 
//         animate={{ y: 0 }}
//         className="fixed top-0 left-0 w-full z-[100] px-6 py-8 flex justify-between items-start pointer-events-none"
//       >
//         <div className="flex flex-col gap-1 pointer-events-auto group cursor-pointer">
//           <div className="flex items-center gap-2">
//             <div className="w-10 h-10 bg-orange-600 rounded-sm flex items-center justify-center transform group-hover:rotate-90 transition-transform duration-500">
//               <Command className="text-black" size={20} />
//             </div>
//             <span className="text-3xl font-black uppercase tracking-tighter italic">EagleX</span>
//           </div>
//           <span className="text-[10px] font-mono text-orange-500/50 ml-12 tracking-widest uppercase">Protocol Alpha-2.5</span>
//         </div>

//         <div className="hidden lg:flex flex-col items-end gap-4 pointer-events-auto">
//           <div className="bg-white/5 backdrop-blur-md border border-white/10 p-4 rounded-xl flex gap-12">
//             {["Services", "Arsenal", "Nexus", "Foundry"].map((item) => (
//               <a key={item} href={`#${item.toLowerCase()}`} className="text-[10px] uppercase font-bold tracking-[0.3em] hover:text-orange-500 transition-all">
//                 {item}
//               </a>
//             ))}
//           </div>
//           <div className="flex gap-2">
//             <div className="px-3 py-1 rounded-full bg-orange-600/10 border border-orange-600/30 text-[9px] text-orange-500 font-mono">NODE: SF_USA</div>
//             <div className="px-3 py-1 rounded-full bg-green-600/10 border border-green-600/30 text-[9px] text-green-500 font-mono">STATUS: OPTIMAL</div>
//           </div>
//         </div>
//       </motion.nav>

//       {/* SECTION 2: THE KINETIC HERO */}
//       <Section className="justify-center items-center text-center pt-32">
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#ea580c10_0%,_transparent_70%)]" />
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
//           className="relative z-10"
//         >
//           <h1 className="text-[16vw] font-black uppercase leading-[0.8] tracking-[ -0.05em] italic">
//             Heavy<br />
//             <span className="text-orange-600 not-italic">Metal</span><br />
//             Code
//           </h1>
//           <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-12 text-left max-w-6xl mx-auto">
//             <div className="border-l border-orange-600 pl-6">
//               <span className="text-orange-600 font-mono text-xs uppercase mb-2 block">Architecture</span>
//               <p className="text-sm text-gray-400 font-medium">Next-generation distributed systems engineered for extreme throughput and zero failure tolerance.</p>
//             </div>
//             <div className="border-l border-white/20 pl-6">
//               <span className="text-white/40 font-mono text-xs uppercase mb-2 block">Velocity</span>
//               <p className="text-sm text-gray-400 font-medium">Proprietary CI/CD pipelines that move at the speed of thought. Deployment to edge in &lt;100ms.</p>
//             </div>
//             <div className="border-l border-white/20 pl-6">
//               <span className="text-white/40 font-mono text-xs uppercase mb-2 block">Intelligence</span>
//               <p className="text-sm text-gray-400 font-medium">Neural-engine integration into every core primitive. AI isn't a feature; it's our foundational layer.</p>
//             </div>
//           </div>
//         </motion.div>
        
//         <motion.div 
//           animate={{ y: [0, 10, 0] }} 
//           transition={{ duration: 2, repeat: Infinity }}
//           className="absolute bottom-10"
//         >
//           <ChevronDown className="text-orange-600" />
//         </motion.div>
//       </Section>

//       {/* SECTION 3: THE HYPER-SPEED MARQUEE */}
//       <div className="relative py-12 bg-orange-600 border-y-4 border-black overflow-hidden flex select-none">
//         <motion.div 
//           animate={{ x: [0, -1000] }} 
//           transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
//           className="flex whitespace-nowrap items-center gap-12 px-6"
//         >
//           {[...Array(10)].map((_, i) => (
//             <React.Fragment key={i}>
//               <span className="text-6xl font-black uppercase text-black italic">Industry Standards Shattered</span>
//               <Zap className="text-black fill-black" size={40} />
//               <span className="text-6xl font-black uppercase text-black italic">Atomic Precision</span>
//               <Hexagon className="text-black" size={40} />
//             </React.Fragment>
//           ))}
//         </motion.div>
//       </div>

//       {/* SECTION 4: BRUTALIST MISSION MANIFESTO */}
//       <Section className="py-40 bg-white text-black">
//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
//           <div className="lg:col-span-8">
//             <h2 className="text-sm font-mono text-orange-600 mb-12 tracking-widest uppercase font-bold underline decoration-4">Section_04: The Manifesto</h2>
//             <p className="text-5xl md:text-[6.5vw] font-black leading-[0.9] uppercase tracking-tighter">
//               We do not build for the <span className="text-gray-300">present.</span> We engineer for the <span className="italic">inevitable</span> digital collapse of mediocrity.
//             </p>
//           </div>
//           <div className="lg:col-span-4 flex flex-col justify-end">
//             <div className="aspect-square bg-black p-12 flex flex-col justify-between group cursor-crosshair">
//               <ArrowUpRight className="text-orange-600 w-20 h-20 group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform duration-500" />
//               <p className="text-white text-2xl font-bold leading-tight uppercase">
//                 Ready to initiate the protocol? 
//                 <br />
//                 <span className="text-orange-600 text-sm font-mono mt-4 block">Awaiting_Handshake...</span>
//               </p>
//             </div>
//           </div>
//         </div>
//       </Section>

//       {/* SECTIONS 5-8: THE HORIZONTAL TECHNICAL FOUNDRY */}
//       <div className="horizontal-container relative h-screen overflow-hidden">
//         <div ref={horizontalSectionRef} className="flex h-full">
//           {/* SECTION 5 */}
//           <div className="panel w-screen h-full bg-[#080808] flex-shrink-0 flex flex-col justify-center px-20 border-r border-white/5 relative">
//             <div className="absolute top-20 right-20 flex flex-col items-end opacity-10">
//               <span className="text-[20vw] font-black leading-none">05</span>
//               <span className="text-2xl font-mono tracking-widest uppercase">Infrastructure</span>
//             </div>
//             <div className="max-w-4xl space-y-8">
//               <div className="w-20 h-2px bg-orange-600" />
//               <h3 className="text-8xl font-black uppercase italic">The Core<br />Engine</h3>
//               <p className="text-xl text-gray-400 font-light leading-relaxed max-w-2xl">
//                 Our infrastructure is built on a custom Rust-based microkernel architecture, ensuring that memory management and thread safety are never an afterthought. We eliminate garbage collection pauses entirely for real-time applications.
//               </p>
//               <div className="flex gap-4">
//                 {["KUBERNETES", "RUST", "GO", "AWS"].map(t => (
//                   <span key={t} className="px-4 py-1 border border-white/10 text-[10px] font-mono">{t}</span>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* SECTION 6 */}
//           <div className="panel w-screen h-full bg-[#0C0C0C] flex-shrink-0 flex flex-col justify-center px-20 border-r border-white/5 relative">
//             <div className="absolute bottom-20 left-20 opacity-10 flex flex-col">
//               <span className="text-[20vw] font-black leading-none">06</span>
//               <span className="text-2xl font-mono tracking-widest uppercase">Security</span>
//             </div>
//             <div className="max-w-4xl space-y-8 ml-auto text-right">
//               <div className="w-20 h-2px bg-orange-600 ml-auto" />
//               <h3 className="text-8xl font-black uppercase">Fortified<br />Logic</h3>
//               <p className="text-xl text-gray-400 font-light leading-relaxed max-w-2xl ml-auto">
//                 Every line of code undergoes automated formal verification. We deploy Zero-Trust networks as a standard, ensuring that identity is verified at every packet transfer within the cluster.
//               </p>
//               <div className="flex gap-4 justify-end">
//                 {["SSL/TLS 1.3", "OIDC", "AES-256", "SOC2"].map(t => (
//                   <span key={t} className="px-4 py-1 border border-white/10 text-[10px] font-mono">{t}</span>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* SECTION 7 */}
//           <div className="panel w-screen h-full bg-[#050505] flex-shrink-0 flex flex-col justify-center px-20 border-r border-white/5 relative">
//              <div className="max-w-4xl space-y-8">
//               <Activity className="text-orange-600" size={64} />
//               <h3 className="text-8xl font-black uppercase">Neural<br />Bridges</h3>
//               <p className="text-xl text-gray-400 font-light leading-relaxed max-w-2xl">
//                 We integrate Large Language Models directly into the application state-tree, allowing for semantic search and generative UI components that adapt to user behavior in real-time.
//               </p>
//             </div>
//           </div>

//           {/* SECTION 8 */}
//           <div className="panel w-screen h-full bg-orange-600 text-black flex-shrink-0 flex flex-col justify-center px-20">
//             <div className="grid grid-cols-2 gap-20 items-center">
//               <h3 className="text-[12vw] font-black uppercase leading-none italic">Elite<br />Sync</h3>
//               <div className="space-y-6">
//                 <p className="text-3xl font-bold uppercase tracking-tighter">Your technical debt ends here.</p>
//                 <p className="text-lg font-medium opacity-80 leading-relaxed">
//                   We don't "fix" legacy systems. We architect new realities that render the past obsolete. 
//                   Our handover process includes a full 360-degree audit and team training protocol.
//                 </p>
//                 <div className="h-[2px] w-full bg-black/20" />
//                 <span className="text-sm font-mono font-black uppercase">Protocol_Finalized.txt</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* SECTION 9: THE BENTO-FOUNDRY */}
//       <Section id="foundry" className="py-40 bg-black">
//         <h2 className="text-[8vw] font-black uppercase italic mb-20 tracking-tighter">The_Arsenal.exe</h2>
//         <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-4 md:grid-rows-2 gap-4 h-[1200px] md:h-[800px]">
//           <div className="md:col-span-2 md:row-span-2 bg-[#111] border border-white/5 rounded-3xl p-12 flex flex-col justify-between group overflow-hidden relative">
//             <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
//             <Cpu className="text-orange-600 mb-8" size={60} />
//             <div>
//               <h4 className="text-4xl font-bold uppercase mb-4">Edge Intelligence</h4>
//               <p className="text-gray-500 text-lg leading-relaxed">Distributing computational heavy-lifting to the global edge. Reducing latency from seconds to microseconds.</p>
//             </div>
//           </div>
//           <div className="bg-[#111] border border-white/5 rounded-3xl p-8 flex flex-col justify-between hover:border-orange-600/50 transition-colors">
//             <Globe size={32} className="text-orange-600" />
//             <span className="text-xl font-bold uppercase tracking-tighter">Global Deployment</span>
//           </div>
//           <div className="bg-white text-black rounded-3xl p-8 flex flex-col justify-between group cursor-pointer overflow-hidden">
//              <ArrowUpRight size={40} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
//              <span className="text-2xl font-black uppercase leading-none">Full-Stack<br />Dominance</span>
//           </div>
//           <div className="bg-[#111] border border-white/5 rounded-3xl p-8 flex flex-col justify-between hover:bg-orange-600 hover:text-black transition-all group">
//             <Terminal size={32} className="group-hover:text-black" />
//             <span className="text-xl font-bold uppercase tracking-tighter">Custom Internal Tooling</span>
//           </div>
//           <div className="bg-[#111] border border-white/5 rounded-3xl p-8 flex flex-col justify-between">
//             <Shield size={32} className="text-orange-500" />
//             <span className="text-xl font-bold uppercase tracking-tighter">Quantum-Safe Encryption</span>
//           </div>
//         </div>
//       </Section>

//       {/* SECTION 10: DYNAMIC TECH STACK (SCROLL-CONTROLLED) */}
//       <Section className="py-40 bg-[#080808]">
//         <div className="max-w-7xl mx-auto w-full">
//           <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
//             <h2 className="text-8xl font-black uppercase italic leading-none">The<br /><span className="text-orange-600">Stack</span></h2>
//             <p className="max-w-sm text-gray-500 font-medium uppercase tracking-widest text-xs border-r-2 border-orange-600 pr-8">
//               We exclusively use technologies that are battle-tested yet forward-compatible. No experiments, only precision.
//             </p>
//           </div>
//           <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
//             {["Next.js 15", "TypeScript", "GSAP 3", "Framer Motion", "Tailwind CSS", "Prisma", "PostgreSQL", "Redis", "Docker", "AWS", "Vercel", "Rust", "Go", "Python", "PyTorch", "OpenAI API"].map((tech) => (
//               <div key={tech} className="bg-black p-10 flex items-center justify-center group hover:bg-orange-600 transition-colors cursor-default">
//                 <span className="text-sm font-bold uppercase tracking-[0.2em] group-hover:text-black group-hover:scale-110 transition-all">{tech}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </Section>

//       {/* SECTION 11: THE EXECUTION PIPELINE (VISUAL FLOW) */}
//       <Section className="py-40">
//         <h2 className="text-center text-sm font-mono text-orange-600 mb-20 tracking-[0.5em] uppercase">Development_Protocol_V.4</h2>
//         <div className="relative max-w-5xl mx-auto">
//           <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2" />
//           {[
//             { title: "Discovery & Deep Audit", desc: "We tear down your current bottlenecks and define the path of least resistance.", icon: <Search size={20}/> },
//             { title: "Architectural Blueprint", desc: "Defining the state management, database schema, and edge-logic for the entire ecosystem.", icon: <PenTool size={20}/> },
//             { title: "Agile Development Sprint", desc: "High-velocity coding blocks with daily internal audits and continuous integration.", icon: <Code2 size={20}/> },
//             { title: "The Handover Protocol", desc: "Zero-downtime deployment followed by a rigorous testing phase and team onboarding.", icon: <RefreshCcw size={20}/> }
//           ].map((item, idx) => (
//             <div key={idx} className={cn("relative mb-32 flex flex-col md:flex-row items-center gap-10", idx % 2 === 0 ? "md:flex-row-reverse" : "")}>
//               <div className="absolute left-0 md:left-1/2 w-8 h-8 rounded-full bg-orange-600 border-4 border-black z-10 -translate-x-1/2 flex items-center justify-center">
//                 <div className="w-1 h-1 bg-black rounded-full" />
//               </div>
//               <div className="w-full md:w-1/2 bg-[#111] p-10 rounded-3xl border border-white/5 hover:border-orange-600/30 transition-all">
//                 <div className="text-orange-600 mb-6">{item.icon}</div>
//                 <h4 className="text-2xl font-bold uppercase mb-4 tracking-tighter">{item.title}</h4>
//                 <p className="text-gray-500 leading-relaxed font-medium">{item.desc}</p>
//               </div>
//               <div className="hidden md:block w-1/2" />
//             </div>
//           ))}
//         </div>
//       </Section>

//       {/* SECTION 12: SOCIAL PROOF / CLIENTS (DARK MODE) */}
//       <Section className="py-40 bg-white text-black items-center justify-center">
//         <div className="text-center max-w-4xl">
//            <h2 className="text-xs font-black uppercase tracking-[0.5em] mb-12 opacity-30">Strategic Alliances</h2>
//            <p className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-20 italic">
//              Trusted by the <span className="text-orange-600">1%</span> of tech leaders pushing the boundaries of <span className="text-gray-400">human potential.</span>
//            </p>
//            <div className="grid grid-cols-2 md:grid-cols-4 gap-20 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
//              <div className="font-black text-2xl tracking-tighter italic">NEXUS_LABS</div>
//              <div className="font-black text-2xl tracking-tighter italic">QUANTUM.IO</div>
//              <div className="font-black text-2xl tracking-tighter italic">HYPER_DRIVE</div>
//              <div className="font-black text-2xl tracking-tighter italic">APEX_CORE</div>
//            </div>
//         </div>
//       </Section>

//       {/* SECTION 13: THE "GIGA" CTA */}
//       <Section className="h-screen items-center justify-center text-center px-4 overflow-hidden relative">
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] font-black opacity-[0.02] pointer-events-none select-none italic">
//           READY?
//         </div>
//         <motion.div whileHover={{ scale: 0.98 }} className="cursor-pointer group relative z-10">
//           <h2 className="text-[12vw] font-black uppercase leading-[0.8] tracking-[-0.05em] mb-12">
//             Initiate<br />
//             <span className="text-orange-600 italic">Protocol</span>
//           </h2>
//           <MagneticButton className="bg-white text-black px-12 py-6 flex items-center gap-4 group">
//             <span className="text-xl font-black uppercase italic tracking-widest">Connect to Network</span>
//             <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center group-hover:translate-x-2 transition-transform">
//               <ArrowUpRight size={20} className="text-black" />
//             </div>
//           </MagneticButton>
//         </motion.div>
//       </Section>

//       {/* SECTION 14: THE INDUSTRIAL FOOTER */}
//       <footer className="bg-[#050505] pt-40 pb-12 px-6 border-t border-white/5 relative z-20">
//         <div className="max-w-[1800px] mx-auto">
//           <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 mb-40">
//             <div className="lg:col-span-6">
//               <div className="flex items-center gap-4 mb-10">
//                 <div className="w-12 h-12 bg-orange-600 rounded-sm flex items-center justify-center">
//                   <Command className="text-black" size={24} />
//                 </div>
//                 <span className="text-5xl font-black uppercase italic tracking-tighter">EagleX</span>
//               </div>
//               <p className="text-2xl text-gray-500 font-medium leading-relaxed max-w-xl">
//                 Engineering the digital backbone for global enterprise. Zero compromise. Zero failure. Zero bullshit.
//               </p>
//             </div>
//             <div className="lg:col-span-3">
//                <h5 className="text-xs font-mono text-orange-500 uppercase tracking-widest mb-10">Internal_Links</h5>
//                <ul className="space-y-4">
//                  {["Case Studies", "Laboratory", "Philosophy", "Press Kit", "Contact"].map(l => (
//                    <li key={l}><a href="#" className="text-lg font-bold uppercase hover:text-orange-500 transition-colors tracking-tight">{l}</a></li>
//                  ))}
//                </ul>
//             </div>
//             <div className="lg:col-span-3">
//                <h5 className="text-xs font-mono text-orange-500 uppercase tracking-widest mb-10">Neural_Network</h5>
//                <ul className="space-y-4">
//                  {["X / Twitter", "GitHub", "LinkedIn", "Discord", "Behance"].map(l => (
//                    <li key={l}><a href="#" className="text-lg font-bold uppercase hover:text-orange-500 transition-colors tracking-tight">{l}</a></li>
//                  ))}
//                </ul>
//             </div>
//           </div>

//           <div className="flex flex-col md:flex-row justify-between items-end gap-10 pt-12 border-t border-white/5">
//             <div className="space-y-4">
//                <div className="text-[12px] font-mono text-gray-600 uppercase tracking-[0.4em]">Current_System_Time: {new Date().toLocaleTimeString()}</div>
//                <div className="text-[12px] font-mono text-gray-600 uppercase tracking-[0.4em]">Encryption_Level: AES_GCM_256</div>
//             </div>
//             <div className="text-right flex flex-col items-end">
//                <div className="flex gap-8 mb-4">
//                  <span className="text-[10px] font-bold uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity cursor-pointer">Privacy Protocol</span>
//                  <span className="text-[10px] font-bold uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity cursor-pointer">Security Policy</span>
//                </div>
//                <span className="text-[10px] font-mono text-gray-700">©2025 EAGLEX SYSTEMS GROUP ● ALL_RIGHTS_RESERVED</span>
//             </div>
//           </div>
//         </div>
//       </footer>

//       {/* GLOBAL CUSTOM STYLES */}
//       <style jsx global>{`
//         @font-face {
//           font-family: 'Geist';
//           src: url('https://cdn.jsdelivr.net/font-geist/1.0.0/Geist-Variable.woff2') format('woff2');
//         }
        
//         body {
//           font-family: 'Geist', sans-serif;
//           cursor: crosshair;
//         }

//         .panel {
//           will-change: transform;
//         }

//         ::-webkit-scrollbar {
//           width: 0px;
//           display: none;
//         }

//         ::selection {
//           background: #ea580c;
//           color: black;
//         }

//         .horizontal-container {
//           overscroll-behavior: none;
//         }
//       `}</style>
//     </div>
//   );
// }