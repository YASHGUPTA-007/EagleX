// "use client";

// import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
// import { 
//   motion, 
//   useScroll, 
//   useTransform, 
//   AnimatePresence, 
//   useSpring, 
//   useMotionValue,
//   useVelocity
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
//   Target, Triangle, Waves, Lock, Unlock, Key, CpuCore, 
//   Cloud, CloudLightning, BarChart3, PieChart, LineChart
// } from "lucide-react";
// import { clsx, type ClassValue } from "clsx";
// import { twMerge } from "tailwind-merge";

// /** * SECTION 0: CORE UTILITIES & THEME CONFIG 
//  */
// function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs));
// }

// if (typeof window !== "undefined") {
//   gsap.registerPlugin(ScrollTrigger);
// }

// // Custom Technical Schematics for Backgrounds
// const TechnicalGrid = () => (
//   <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.15]">
//     <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
//       <defs>
//         <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
//           <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="0.5" />
//         </pattern>
//         <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
//           <rect width="100" height="100" fill="url(#smallGrid)" />
//           <path d="M 100 0 L 0 0 0 100" fill="none" stroke="white" strokeWidth="1" />
//         </pattern>
//       </defs>
//       <rect width="100%" height="100%" fill="url(#grid)" />
//     </svg>
//   </div>
// );

// /**
//  * SECTION 1: CUSTOM HOOKS
//  */
// const useHUDData = () => {
//   const [data, setData] = useState({ cpu: 0, mem: 0, lat: 0 });
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setData({
//         cpu: Math.floor(Math.random() * 100),
//         mem: Math.floor(Math.random() * 64),
//         lat: Math.floor(Math.random() * 20)
//       });
//     }, 2000);
//     return () => clearInterval(interval);
//   }, []);
//   return data;
// };

// /**
//  * SECTION 2: HIGH-END ATOMIC COMPONENTS
//  */
// const RevealText = ({ text, className }: { text: string, className?: string }) => {
//   return (
//     <div className={cn("overflow-hidden flex flex-wrap", className)}>
//       {text.split(" ").map((word, i) => (
//         <motion.span
//           key={i}
//           initial={{ y: "100%" }}
//           whileInView={{ y: 0 }}
//           transition={{ duration: 0.8, delay: i * 0.02, ease: [0.16, 1, 0.3, 1] }}
//           viewport={{ once: true }}
//           className="mr-[0.3em] inline-block"
//         >
//           {word}
//         </motion.span>
//       ))}
//     </div>
//   );
// };

// const GlitchButton = ({ children, primary = false }: { children: React.ReactNode, primary?: boolean }) => (
//   <button className={cn(
//     "relative px-8 py-4 uppercase font-black tracking-widest text-xs transition-all duration-300 group overflow-hidden",
//     primary ? "bg-orange-600 text-black" : "bg-transparent border border-white/20 text-white hover:border-orange-600"
//   )}>
//     <span className="relative z-10 flex items-center gap-2">
//       {children}
//       <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
//     </span>
//     <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-white/10 transition-transform duration-500" />
//   </button>
// );

// const SectionHeading = ({ number, title, subtitle }: { number: string, title: string, subtitle: string }) => (
//   <div className="mb-24 space-y-4">
//     <div className="flex items-center gap-4 text-orange-600 font-mono text-sm tracking-[0.4em]">
//       <span>[{number}]</span>
//       <div className="h-px w-20 bg-orange-600" />
//       <span>PROT_SYS</span>
//     </div>
//     <h2 className="text-7xl md:text-9xl font-black uppercase tracking-tighter italic leading-none">{title}</h2>
//     <p className="text-gray-500 max-w-xl text-lg font-medium">{subtitle}</p>
//   </div>
// );

// /**
//  * SECTION 3: THE MONOLITH PAGE ENGINE
//  */
// export default function EagleXMonolith() {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const hudData = useHUDData();
//   const mouseX = useMotionValue(0);
//   const mouseY = useMotionValue(0);

//   // Mouse trail effect
//   useEffect(() => {
//     const handleMouseMove = (e: MouseEvent) => {
//       mouseX.set(e.clientX);
//       mouseY.set(e.clientY);
//     };
//     window.addEventListener("mousemove", handleMouseMove);
//     return () => window.removeEventListener("mousemove", handleMouseMove);
//   }, [mouseX, mouseY]);

//   // GSAP Scene Controls
//   useEffect(() => {
//     const ctx = gsap.context(() => {
//       // 1. Horizontal Scroll logic
//       const sections = gsap.utils.toArray(".horizontal-panel");
//       gsap.to(sections, {
//         xPercent: -100 * (sections.length - 1),
//         ease: "none",
//         scrollTrigger: {
//           trigger: ".horizontal-wrapper",
//           pin: true,
//           scrub: 1,
//           snap: 1 / (sections.length - 1),
//           end: () => "+=3000"
//         }
//       });

//       // 2. Parallax elements
//       gsap.utils.toArray(".parallax-layer").forEach((layer: any) => {
//         const depth = layer.dataset.depth || 0.2;
//         gsap.to(layer, {
//           y: -100 * depth,
//           ease: "none",
//           scrollTrigger: {
//             trigger: layer,
//             scrub: true
//           }
//         });
//       });
//     }, containerRef);
//     return () => ctx.revert();
//   }, []);

//   return (
//     <div ref={containerRef} className="bg-[#020202] text-[#e0e0e0] font-sans selection:bg-orange-600 selection:text-black">
      
//       {/* HUD OVERLAY (Fixed Status Bars) */}
//       <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[100] border-[20px] border-white/5 md:border-[40px]">
//         <div className="absolute top-8 left-8 flex flex-col gap-1 font-mono text-[8px] text-orange-600/50 uppercase tracking-widest">
//           <span>TX_RATE: 44.1 KHZ</span>
//           <span>BUFFER: {hudData.mem}MB</span>
//           <span>LATENCY: {hudData.lat}MS</span>
//         </div>
//         <div className="absolute bottom-8 right-8 flex flex-col items-end gap-1 font-mono text-[8px] text-orange-600/50 uppercase tracking-widest">
//           <span>COORDS: {Math.floor(mouseX.get())} // {Math.floor(mouseY.get())}</span>
//           <span>CPU_LOAD: {hudData.cpu}%</span>
//           <span>ENC: AES_256_GCM</span>
//         </div>
//       </div>

//       {/* FLOATING NAV BAR */}
//       <nav className="fixed top-12 left-1/2 -translate-x-1/2 z-[110] w-[90%] max-w-7xl flex justify-between items-center px-10 py-5 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-2xl">
//         <div className="flex items-center gap-3">
//           <div className="w-8 h-8 bg-orange-600 rounded flex items-center justify-center animate-pulse">
//             <Command size={18} className="text-black" />
//           </div>
//           <span className="text-2xl font-black uppercase italic tracking-tighter">EagleX</span>
//         </div>
//         <div className="hidden lg:flex gap-12">
//           {['Logic', 'Infrastructure', 'Arsenal', 'Foundry', 'Network'].map((item) => (
//             <a key={item} href={`#${item.toLowerCase()}`} className="text-[10px] font-black uppercase tracking-[0.3em] hover:text-orange-600 transition-colors">
//               {item}
//             </a>
//           ))}
//         </div>
//         <GlitchButton primary>Secure Slot</GlitchButton>
//       </nav>

//       {/* SECTION 1: HYPER-HERO WITH 3D TEXT EFFECT */}
//       <section className="relative h-screen flex flex-col justify-center items-center px-6 text-center overflow-hidden">
//         <TechnicalGrid />
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vw] h-[150vh] bg-[radial-gradient(circle_at_center,_#ea580c08_0%,_transparent_50%)]" />
        
//         <motion.div
//           initial={{ opacity: 0, y: 100 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
//           className="relative z-10"
//         >
//           <span className="text-orange-500 font-mono text-xs uppercase tracking-[1em] mb-10 block animate-pulse">INITIALIZING_DOMINANCE_SEQUENCE</span>
//           <h1 className="text-[14vw] md:text-[18vw] font-black uppercase leading-[0.75] tracking-tighter italic">
//             Atomic<br />
//             <span className="text-transparent stroke-orange-600" style={{ WebkitTextStroke: "2px #ea580c" }}>Systems</span>
//           </h1>
//           <div className="mt-16 max-w-2xl mx-auto border-t border-white/10 pt-10">
//             <p className="text-gray-500 text-lg uppercase font-bold tracking-widest leading-relaxed">
//               We architect digital fortresses for the elite 1%. High-velocity development for world-shaping enterprises.
//             </p>
//           </div>
//         </motion.div>
        
//         <motion.div 
//           animate={{ y: [0, 20, 0] }}
//           transition={{ duration: 2, repeat: Infinity }}
//           className="absolute bottom-20 flex flex-col items-center gap-4 cursor-pointer"
//         >
//           <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-orange-600">Scroll to Deploy</span>
//           <ChevronDown className="text-orange-600" />
//         </motion.div>
//       </section>

//       {/* SECTION 2: RUNNING BANNER (GSAP-INFINITE) */}
//       <div className="py-12 bg-orange-600 border-y-4 border-black flex overflow-hidden whitespace-nowrap z-20 relative rotate-1 scale-105 origin-center">
//         {[...Array(6)].map((_, i) => (
//           <div key={i} className="flex items-center gap-12 animate-marquee">
//             <span className="text-6xl md:text-8xl font-black text-black uppercase italic leading-none">EagleX Protocol</span>
//             <Zap className="text-black fill-black" size={60} />
//             <span className="text-6xl md:text-8xl font-black text-black uppercase italic leading-none">Zero Latency Dev</span>
//             <InfinityIcon className="text-black" size={60} />
//           </div>
//         ))}
//       </div>

//       {/* SECTION 3: THE MISSION (MANIFESTO) */}
//       <section className="py-60 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
//         <div className="lg:col-span-8">
//           <SectionHeading 
//             number="03" 
//             title="The_Manifesto" 
//             subtitle="We don't settle for 'functional'. We build software that feels like physical industrial hardware—precise, unyielding, and eternal."
//           />
//           <div className="space-y-12">
//             <RevealText 
//               text="Our engineers come from the high-frequency trading world and military security research. We approach Next.js and GoLang as if we were building aerospace guidance systems." 
//               className="text-3xl md:text-5xl font-bold leading-tight"
//             />
//           </div>
//         </div>
//         <div className="lg:col-span-4 aspect-square bg-[#0a0a0a] border border-white/5 rounded-3xl p-12 flex flex-col justify-between group overflow-hidden relative">
//           <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/10 blur-3xl group-hover:bg-orange-600/30 transition-all duration-700" />
//           <Fingerprint size={80} className="text-orange-600 group-hover:scale-110 transition-transform" />
//           <h4 className="text-2xl font-black uppercase">Biometric <br /> Level Security</h4>
//         </div>
//       </section>

//       {/* SECTION 4-7: THE HORIZONTAL TECHNICAL SLIDE (GSAP) */}
//       <div className="horizontal-wrapper relative h-screen overflow-hidden bg-[#050505]">
//         <div className="flex h-full">
//           {/* PANEL 4 */}
//           <div className="horizontal-panel w-screen h-full flex-shrink-0 flex flex-col justify-center px-10 md:px-40 relative border-r border-white/5">
//              <span className="absolute top-20 right-20 text-[20vw] font-black opacity-[0.03]">04</span>
//              <div className="max-w-4xl space-y-10">
//                 <Cpu size={80} className="text-orange-600" />
//                 <h3 className="text-8xl font-black uppercase italic">Neural Architecture</h3>
//                 <p className="text-2xl text-gray-500 font-light leading-relaxed">
//                   Every EagleX deployment includes a custom LLM fine-tuning layer. We don't just connect to APIs; we embed intelligence into the core database drivers.
//                 </p>
//              </div>
//           </div>
//           {/* PANEL 5 */}
//           <div className="horizontal-panel w-screen h-full flex-shrink-0 bg-[#080808] flex flex-col justify-center px-10 md:px-40 relative border-r border-white/5">
//              <div className="max-w-4xl space-y-10 ml-auto text-right">
//                 <Shield size={80} className="text-orange-600 ml-auto" />
//                 <h3 className="text-8xl font-black uppercase">Quantum Defiance</h3>
//                 <p className="text-2xl text-gray-500 font-light leading-relaxed">
//                   Post-quantum cryptographic algorithms are standard in our security stack. Your data remains encrypted even against the compute power of 2030.
//                 </p>
//              </div>
//           </div>
//           {/* PANEL 6 */}
//           <div className="horizontal-panel w-screen h-full flex-shrink-0 bg-white text-black flex flex-col justify-center px-10 md:px-40 relative border-r border-white/5">
//              <div className="max-w-4xl space-y-10">
//                 <Globe size={80} className="text-orange-600" />
//                 <h3 className="text-8xl font-black uppercase italic">Global Edge</h3>
//                 <p className="text-2xl font-bold leading-relaxed">
//                   Zero-latency distribution across 320 nodes. Our apps launch faster than a local file system. Speed is the only metric that matters.
//                 </p>
//              </div>
//           </div>
//           {/* PANEL 7 */}
//           <div className="horizontal-panel w-screen h-full flex-shrink-0 bg-orange-600 text-black flex flex-col justify-center px-10 md:px-40 relative">
//              <div className="grid grid-cols-2 gap-20">
//                 <h3 className="text-[12vw] font-black uppercase leading-[0.8] italic">Tech<br />Apex</h3>
//                 <div className="space-y-8">
//                   <p className="text-4xl font-bold uppercase tracking-tighter">Handover Protocol Complete.</p>
//                   <p className="text-lg font-medium opacity-80 leading-relaxed">
//                     We transition your legacy stack into the future with a 48-hour migration sprint. High-pressure engineering, high-reward results.
//                   </p>
//                   <div className="h-1 w-full bg-black/20" />
//                   <span className="text-sm font-mono font-black uppercase tracking-widest">End_Of_Transmission</span>
//                 </div>
//              </div>
//           </div>
//         </div>
//       </div>

//       {/* SECTION 8: THE BENTO ARSENAL (HEAVY GRID) */}
//       <section className="py-60 px-6 max-w-[1800px] mx-auto">
//         <SectionHeading 
//           number="08" 
//           title="The_Arsenal" 
//           subtitle="Our custom-built library of technical components. Optimized for performance, built for visual impact."
//         />
//         <div className="grid grid-cols-1 md:grid-cols-6 grid-rows-6 md:grid-rows-3 gap-6 h-[2000px] md:h-[1200px]">
//           {/* Main Card */}
//           <div className="md:col-span-4 md:row-span-2 bg-[#0a0a0a] border border-white/10 rounded-[3rem] p-16 flex flex-col justify-between group overflow-hidden">
//              <div className="flex justify-between items-start">
//                 <Layers className="text-orange-600" size={60} />
//                 <div className="text-right">
//                   <span className="text-orange-600 font-mono text-xs">V.9.0</span>
//                   <div className="text-gray-600 text-[10px] mt-1 uppercase font-bold">Encrypted Node</div>
//                 </div>
//              </div>
//              <div>
//                 <h3 className="text-6xl md:text-8xl font-black uppercase leading-none mb-8 group-hover:translate-x-4 transition-transform duration-700">Multi-Cloud<br />Orchestrator</h3>
//                 <p className="text-gray-500 text-xl max-w-xl">Dynamically switch between AWS, GCP, and Azure to optimize for cost, latency, and regional compliance.</p>
//              </div>
//           </div>
//           {/* Secondary Cards */}
//           <div className="md:col-span-2 bg-orange-600 rounded-[3rem] p-12 flex flex-col justify-between group cursor-pointer hover:rotate-2 transition-all">
//              <Rocket className="text-black" size={48} />
//              <h4 className="text-4xl font-black uppercase text-black italic">Blitz Launch</h4>
//           </div>
//           <div className="md:col-span-2 bg-[#111] rounded-[3rem] p-12 border border-white/5 flex flex-col justify-between">
//              <Database className="text-orange-600" size={48} />
//              <h4 className="text-2xl font-bold uppercase tracking-tighter">Self-Healing<br />Databases</h4>
//           </div>
//           <div className="md:col-span-2 bg-white text-black rounded-[3rem] p-12 flex flex-col justify-between hover:bg-orange-600 transition-colors group">
//              <Activity className="group-hover:text-black transition-colors" size={48} />
//              <h4 className="text-2xl font-black uppercase leading-none">Real-Time<br />Telemetry</h4>
//           </div>
//           <div className="md:col-span-2 bg-[#0a0a0a] border border-white/10 rounded-[3rem] p-12 flex flex-col justify-between">
//              <Terminal className="text-orange-600" size={48} />
//              <h4 className="text-2xl font-bold uppercase">Dev-Ops<br />Automations</h4>
//           </div>
//           <div className="md:col-span-2 bg-[#111] rounded-[3rem] p-12 border border-white/5 flex items-center justify-center">
//              <div className="text-center">
//                 <span className="text-7xl font-black text-white italic">99.9%</span>
//                 <p className="text-[10px] uppercase font-mono text-orange-600 mt-2">Uptime Protocol</p>
//              </div>
//           </div>
//         </div>
//       </section>

//       {/* SECTION 9: THE TECH HUD (TECHNICAL SPECS) */}
//       <section className="py-60 bg-[#020202] border-y border-white/5 relative">
//         <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20">
//           <TechnicalGrid />
//         </div>
//         <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-32 relative z-10">
//           <div className="space-y-20">
//             <h2 className="text-7xl font-black uppercase leading-none">The System<br /><span className="text-orange-600 italic">Specifications</span></h2>
//             <div className="grid grid-cols-1 gap-12">
//               {[
//                 { label: "Compiler", value: "Custom LLVM Frontend" },
//                 { label: "Deployment", value: "Terraform / Kubernetes" },
//                 { label: "Database", value: "Distributed Citus PostgreSQL" },
//                 { label: "Cache", value: "Redis Cluster with Global Sync" }
//               ].map((spec, i) => (
//                 <div key={i} className="group cursor-default border-b border-white/10 pb-6">
//                   <span className="text-orange-600 font-mono text-xs uppercase mb-2 block tracking-[0.3em]">{spec.label}</span>
//                   <div className="text-3xl font-black uppercase flex justify-between items-center group-hover:text-orange-500 transition-colors">
//                     {spec.value}
//                     <ArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//           <div className="bg-[#0a0a0a] rounded-3xl p-10 border border-white/10 flex flex-col gap-10">
//             <div className="flex justify-between items-center border-b border-white/5 pb-6">
//               <span className="text-xs font-mono text-gray-500">SYSTEM_LOGS_V2.0</span>
//               <div className="flex gap-2">
//                 <div className="w-2 h-2 rounded-full bg-orange-600 animate-ping" />
//                 <div className="w-2 h-2 rounded-full bg-orange-600" />
//               </div>
//             </div>
//             <div className="space-y-4 font-mono text-[10px] text-gray-400 overflow-hidden h-[400px]">
//               {[...Array(20)].map((_, i) => (
//                 <div key={i} className="flex gap-4 border-l border-orange-600/30 pl-4">
//                   <span className="text-orange-600/50">[{new Date().getTime() + i}]</span>
//                   <span>INFRASTRUCTURE_SYNC: NODE_{i}_STATUS_OK</span>
//                   <span className="ml-auto text-green-500">DEVOPS_PROT_02_SUCCESS</span>
//                 </div>
//               ))}
//             </div>
//             <div className="mt-auto">
//               <GlitchButton primary>Access Source</GlitchButton>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* SECTION 10: THE FOUNDRY (PROCESS) */}
//       <section className="py-60 bg-white text-black">
//         <div className="max-w-[1800px] mx-auto px-6">
//            <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-40">
//              <h2 className="text-[12vw] font-black leading-[0.8] uppercase tracking-tighter">The<br />Foundry</h2>
//              <p className="max-w-md text-xl font-bold uppercase tracking-tight text-gray-400">Our process is a refined cycle of destruction and rebuilding until the architecture is flawless.</p>
//            </div>
           
//            <div className="grid grid-cols-1 lg:grid-cols-4 gap-20">
//              {[
//                { id: "01", title: "Cybernetic Discovery", desc: "We extract the DNA of your problem through deep audit and competitor autopsy." },
//                { id: "02", title: "Atomic Engineering", desc: "Drafting the low-level architecture, database schemas, and state-management trees." },
//                { id: "03", title: "Hardened Delivery", desc: "Rapid sprints involving military-grade testing and zero-downtime deployment." },
//                { id: "04", title: "Neural Evolution", desc: "Continuous optimization through AI-driven analytics and telemetry feedback loops." }
//              ].map((step, i) => (
//                <div key={i} className="space-y-10 group">
//                  <span className="text-8xl font-black text-gray-100 group-hover:text-orange-600 transition-colors duration-500">{step.id}</span>
//                  <div className="space-y-4">
//                     <h4 className="text-3xl font-black uppercase tracking-tighter">{step.title}</h4>
//                     <p className="text-gray-500 font-medium leading-relaxed">{step.desc}</p>
//                  </div>
//                  <div className="h-px w-full bg-black/10 origin-left scale-x-10 group-hover:scale-x-100 transition-transform duration-700" />
//                </div>
//              ))}
//            </div>
//         </div>
//       </section>

//       {/* SECTION 11: DYNAMIC TECH STACK (FULL SCREEN) */}
//       <section className="min-h-screen py-40 flex items-center justify-center relative overflow-hidden bg-[#050505]">
//         <div className="absolute inset-0 opacity-10 flex flex-col gap-20 -rotate-12 scale-125">
//           {[...Array(10)].map((_, i) => (
//             <div key={i} className={cn("text-9xl font-black uppercase italic whitespace-nowrap flex gap-10", i % 2 === 0 ? "translate-x-40" : "-translate-x-40")}>
//               {["React", "Next.js", "Rust", "GoLang", "Postgres", "AWS", "Python", "Docker"].map(tech => (
//                 <span key={tech} className="text-transparent border-t-2 border-b-2 border-orange-600/50 px-10">{tech}</span>
//               ))}
//             </div>
//           ))}
//         </div>
//         <div className="relative z-10 text-center space-y-10 max-w-4xl px-6">
//            <Cpu size={120} className="text-orange-600 mx-auto animate-spin-slow" />
//            <h2 className="text-6xl md:text-8xl font-black uppercase italic">Universal<br />Compatibility</h2>
//            <p className="text-xl text-gray-500 font-bold uppercase tracking-widest leading-relaxed">
//              Our stacks are cloud-agnostic, edge-native, and future-proof. We don't just use tools; we master them to build your custom ecosystem.
//            </p>
//         </div>
//       </section>

//       {/* SECTION 12: SOCIAL PROOF (TRUST VESTIGE) */}
//       <section className="py-60 px-6 border-t border-white/5">
//         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-20 opacity-20 hover:opacity-100 transition-opacity duration-1000">
//            <div className="text-4xl font-black uppercase tracking-tighter italic">NEXUS_CORE</div>
//            <div className="text-4xl font-black uppercase tracking-tighter italic underline decoration-orange-600">QUANTUM_SYS</div>
//            <div className="text-4xl font-black uppercase tracking-tighter italic">HYPER_LABS</div>
//            <div className="text-4xl font-black uppercase tracking-tighter italic">APEX_ONE</div>
//         </div>
//         <div className="mt-40 text-center">
//            <blockquote className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-none max-w-5xl mx-auto">
//              "EagleX didn't just rebuild our app; they rebuilt our <span className="text-orange-600">entire technical identity.</span>"
//            </blockquote>
//            <p className="mt-12 font-mono text-orange-500 uppercase tracking-[0.5em] text-xs">— CTO, NEXUS TECHNOLOGIES</p>
//         </div>
//       </section>

//       {/* SECTION 13: THE GIGA CTA (FULL PAGE OVERLAY) */}
//       <section className="h-screen flex flex-col justify-center items-center relative overflow-hidden bg-orange-600 text-black">
//         <motion.div 
//           whileHover={{ scale: 0.95 }}
//           className="relative z-10 text-center cursor-pointer group"
//         >
//           <span className="text-[15px] font-black uppercase tracking-[1em] mb-10 block opacity-50">Handshake_Sequence_Ready</span>
//           <h2 className="text-[14vw] font-black uppercase leading-[0.7] tracking-tighter italic">
//             Start<br />
//             <span className="text-transparent stroke-black" style={{ WebkitTextStroke: "2px black" }}>Project</span>
//           </h2>
//           <div className="mt-20 flex justify-center items-center gap-10">
//             <div className="w-32 h-32 bg-black rounded-full flex items-center justify-center group-hover:scale-125 transition-transform duration-700">
//                <ArrowUpRight className="text-orange-600" size={60} />
//             </div>
//             <p className="text-3xl font-black uppercase italic underline decoration-4">Initiate Connect</p>
//           </div>
//         </motion.div>
//         {/* Background Decorative */}
//         <div className="absolute bottom-0 left-0 w-full text-[20vw] font-black opacity-[0.05] whitespace-nowrap leading-none select-none pointer-events-none">
//           EAGLEX EAGLEX EAGLEX EAGLEX EAGLEX EAGLEX
//         </div>
//       </section>

//       {/* SECTION 14: THE INDUSTRIAL FOOTER (MASSIVE CONTENT) */}
//       <footer className="bg-[#020202] pt-60 pb-12 px-6 md:px-20 border-t border-white/5 relative z-20">
//         <div className="max-w-[2000px] mx-auto">
//           <div className="grid grid-cols-1 lg:grid-cols-12 gap-32 mb-60">
//             <div className="lg:col-span-6 space-y-12">
//               <div className="flex items-center gap-6">
//                  <div className="w-16 h-16 bg-orange-600 rounded flex items-center justify-center">
//                     <Command className="text-black" size={32} />
//                  </div>
//                  <span className="text-7xl font-black uppercase italic tracking-tighter">EagleX</span>
//               </div>
//               <p className="text-3xl text-gray-500 font-medium leading-relaxed max-w-2xl">
//                 The world's most sophisticated technical partner. We architect digital dominance for those who demand excellence.
//               </p>
//               <div className="flex gap-10">
//                 <GlitchButton>Case Studies</GlitchButton>
//                 <GlitchButton primary>Connect</GlitchButton>
//               </div>
//             </div>
            
//             <div className="lg:col-span-2 space-y-12">
//                <h5 className="text-xs font-mono text-orange-500 uppercase tracking-widest">Navigation</h5>
//                <ul className="space-y-6">
//                  {["Our Foundry", "The Arsenal", "Infrastructure", "Neural Stack", "Clients"].map(l => (
//                    <li key={l}><a href="#" className="text-xl font-bold uppercase hover:text-orange-500 transition-all tracking-tight block">{l}</a></li>
//                  ))}
//                </ul>
//             </div>
            
//             <div className="lg:col-span-2 space-y-12">
//                <h5 className="text-xs font-mono text-orange-500 uppercase tracking-widest">Connect</h5>
//                <ul className="space-y-6">
//                  {["Twitter / X", "GitHub", "LinkedIn", "Discord", "Behance"].map(l => (
//                    <li key={l}><a href="#" className="text-xl font-bold uppercase hover:text-orange-500 transition-all tracking-tight block">{l}</a></li>
//                  ))}
//                </ul>
//             </div>
            
//             <div className="lg:col-span-2 space-y-12">
//                <h5 className="text-xs font-mono text-orange-500 uppercase tracking-widest">Legal</h5>
//                <ul className="space-y-6">
//                  {["Privacy Protocol", "Security Policy", "Terms of Service", "Cookies"].map(l => (
//                    <li key={l}><a href="#" className="text-xl font-bold uppercase hover:text-orange-500 transition-all tracking-tight block">{l}</a></li>
//                  ))}
//                </ul>
//             </div>
//           </div>

//           <div className="flex flex-col md:flex-row justify-between items-end gap-10 border-t border-white/5 pt-12">
//             <div className="flex flex-col gap-2">
//               <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.5em] text-gray-700">
//                 <span>Latitude: 37.7749° N</span>
//                 <span>Longitude: 122.4194° W</span>
//               </div>
//               <div className="text-[10px] font-mono text-gray-600 uppercase tracking-[0.2em]">© 2025 EagleX Systems Group ● All Rights Reserved. Build v2.5.0-Release</div>
//             </div>
//             <div className="flex flex-col items-end gap-2">
//                <div className="flex gap-12 font-black uppercase text-xs">
//                  <span className="cursor-pointer hover:text-orange-600 transition-colors tracking-widest">Protocol Nominal</span>
//                  <span className="cursor-pointer hover:text-orange-600 transition-colors tracking-widest">System Operational</span>
//                </div>
//                <div className="h-px w-60 bg-gradient-to-r from-transparent via-orange-600/50 to-transparent" />
//             </div>
//           </div>
//         </div>
//       </footer>

//       {/* GLOBAL CUSTOM STYLES */}
//       <style jsx global>{`
//         @keyframes marquee {
//           0% { transform: translateX(0); }
//           100% { transform: translateX(-100%); }
//         }
//         .animate-marquee {
//           animation: marquee 40s linear infinite;
//         }
//         .animate-spin-slow {
//           animation: spin 20s linear infinite;
//         }
//         @keyframes spin {
//           from { transform: rotate(0deg); }
//           to { transform: rotate(360deg); }
//         }
//         ::-webkit-scrollbar {
//           width: 0px;
//           display: none;
//         }
//         body {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//           background: black;
//         }
//         .horizontal-panel {
//           will-change: transform;
//         }
//       `}</style>
//     </div>
//   );
// }