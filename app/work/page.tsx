"use client";

import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import { 
  motion, 
  useScroll, 
  useTransform, 
  useSpring, 
  useMotionValue,
  AnimatePresence
} from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  ArrowUpRight, 
  Code2, 
  Cpu, 
  Globe, 
  Layers, 
  Layout, 
  Smartphone, 
  Terminal, 
  Zap,
  Maximize2,
  GitBranch,
  Eye
} from "lucide-react";
import Link from "next/link";

// --- Mock Imports (Replace with your actual paths) ---
import Navbar from "../Components/Navbar"; // Assume exists based on context
import Footer from "../Components/Footer"; // Assume exists based on context
import { GridPattern, RevealTitle } from "../Components/shared"; // Assume exists

// --- GSAP Registration ---
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// --- DATA: Project Database ---
const PROJECTS = [
  {
    id: "01",
    client: "NEXUS_FINANCE",
    title: "Algorithmic Trading Dashboard",
    category: "Fintech",
    year: "2025",
    description: "A high-frequency trading interface processing 50k+ socket events per second. Built for institutional speed with zero-latency visualizers.",
    tech: ["Next.js 14", "WebSockets", "WebGL", "Rust"],
    stats: { speed: "< 12ms", users: "10k+", volume: "$2B+" },
    image: "https://images.unsplash.com/photo-1642543492481-44e81e3914a7?q=80&w=2560&auto=format&fit=crop",
    color: "#EA580C" // Orange
  },
  {
    id: "02",
    client: "ORBITAL_SYSTEMS",
    title: "Satellite Telemetry Core",
    category: "Aerospace",
    year: "2024",
    description: "Mission control dashboard for LEO satellite constellations. Real-time trajectory plotting and hardware health monitoring.",
    tech: ["Three.js", "React", "Python Backend", "Mapbox"],
    stats: { speed: "Real-time", users: "Enterprise", volume: "140 Satellites" },
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop",
    color: "#3B82F6" // Blue
  },
  {
    id: "03",
    client: "SYNTH_AI",
    title: "Generative Model Interface",
    category: "AI / LLM",
    year: "2025",
    description: "A drag-and-drop neural network builder. Allows non-technical founders to fine-tune LLMs on proprietary datasets.",
    tech: ["OpenAI API", "Tailwind", "Framer Motion", "Pinecone"],
    stats: { speed: "400 t/s", users: "50k+", volume: "1M Gens" },
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2565&auto=format&fit=crop",
    color: "#10B981" // Emerald
  },
  {
    id: "04",
    client: "VELOCITY_MOTORS",
    title: "EV Fleet Management",
    category: "IoT / Auto",
    year: "2024",
    description: "Telemetry ingestion for autonomous EV fleets. Predictive maintenance alerts and route optimization algorithms.",
    tech: ["GraphQL", "Apollo", "AWS IoT", "Redis"],
    stats: { speed: "99.9% Uptime", users: "B2B", volume: "5k Units" },
    image: "https://images.unsplash.com/photo-1555677284-6a6f9716352c?q=80&w=2560&auto=format&fit=crop",
    color: "#F43F5E" // Rose
  }
];

const ARCHIVE = [
  { name: "Project Alpha", type: "E-Commerce", year: "2023", link: "#" },
  { name: "CyberDeck", type: "Security SaaS", year: "2023", link: "#" },
  { name: "FlowState", type: "Productivity", year: "2022", link: "#" },
  { name: "Void Runner", type: "WebGL Game", year: "2022", link: "#" },
  { name: "CryptoPulse", type: "Web3", year: "2021", link: "#" },
];

// --- COMPONENTS ---

// 1. Custom Cursor Follower for "VIEW" Interaction
const ProjectCursor = ({ active, color }: { active: boolean, color: string }) => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorX, cursorY]);

  return (
    <motion.div
      style={{ x: cursorX, y: cursorY }}
      className="fixed top-0 left-0 w-32 h-32 pointer-events-none z-50 mix-blend-difference hidden md:flex items-center justify-center rounded-full bg-white text-black"
      animate={{ 
        scale: active ? 1 : 0,
        opacity: active ? 1 : 0
      }}
      transition={{ duration: 0.2 }}
    >
      <span className="font-black text-xs tracking-widest uppercase">View Unit</span>
    </motion.div>
  );
};

// 2. Scramble Text Hook
const useScramble = (text: string) => {
  const [display, setDisplay] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%&";
  
  const scramble = () => {
    let interval: NodeJS.Timeout;
    let iteration = 0;
    clearInterval(interval!);
    
    interval = setInterval(() => {
      setDisplay(
        text.split("").map((letter, index) => {
          if (index < iteration) return text[index];
          return chars[Math.floor(Math.random() * chars.length)];
        }).join("")
      );
      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 3;
    }, 30);
  };

  return { display, scramble };
};

export default function WorkPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [filter, setFilter] = useState("ALL");

  // Parallax Header Logic
  const { scrollY } = useScroll();
  const headerY = useTransform(scrollY, [0, 500], [0, 200]);
  const headerOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Pinning logic for project cards
      const projects = gsap.utils.toArray(".project-card");
      
      projects.forEach((card: any, i) => {
        ScrollTrigger.create({
          trigger: card,
          start: "top top",
          end: "bottom top",
          pin: true,
          pinSpacing: false,
          scrub: true,
        });
      });

      // Archive List Reveal
      gsap.from(".archive-row", {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".archive-section",
          start: "top 80%",
        }
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="bg-[#050505] min-h-screen text-[#F5F5F5] selection:bg-orange-600 selection:text-black w-full overflow-x-hidden">
      <Navbar />
      <ProjectCursor active={!!activeProject} color="#EA580C" />
      <GridPattern opacity={0.04} />

      {/* --- HERO SECTION --- */}
      <section className="relative h-[80vh] flex flex-col justify-end px-6 md:px-12 pb-20 border-b border-white/10 overflow-hidden">
        <motion.div 
          style={{ y: headerY, opacity: headerOpacity }}
          className="relative z-10 max-w-7xl mx-auto w-full"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px w-20 bg-orange-600" />
            <span className="font-mono text-orange-500 text-xs uppercase tracking-[0.3em]">
              Classified_Directory // V.2.0
            </span>
          </div>

          <h1 className="text-[15vw] leading-[0.8] font-black uppercase italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
            Deployed<br />
            <span className="text-orange-600">Units</span>
          </h1>
        </motion.div>

        {/* Decorative Code Background */}
        <div className="absolute top-0 right-0 p-10 opacity-10 font-mono text-xs hidden md:block select-none pointer-events-none text-right">
          {Array(20).fill(0).map((_, i) => (
            <div key={i}>{`> FETCHING_DATA_STREAM_${i} ... [ OK ]`}</div>
          ))}
        </div>
      </section>

      {/* --- FILTER BAR (Sticky) --- */}
      <div className="sticky top-0 z-40 bg-[#050505]/80 backdrop-blur-lg border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex flex-wrap justify-between items-center gap-4">
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {["ALL", "FINTECH", "SAAS", "AI / LLM", "IOT"].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 text-[10px] md:text-xs font-mono border transition-all ${
                  filter === cat 
                    ? "bg-orange-600 border-orange-600 text-black font-bold" 
                    : "border-white/10 text-gray-500 hover:border-white/30 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="text-[10px] font-mono text-gray-500 hidden md:block">
            {PROJECTS.length} ACTIVE DEPLOYMENTS FOUND
          </div>
        </div>
      </div>

      {/* --- MAIN PROJECT GALLERY (Stacked Pinning Layout) --- */}
      <section className="relative pt-20 pb-40">
        {PROJECTS.map((project, index) => (
          <div 
            key={project.id} 
            className="project-card relative min-h-screen w-full flex flex-col justify-center bg-[#050505] border-t border-white/5"
            onMouseEnter={() => setActiveProject(project.id)}
            onMouseLeave={() => setActiveProject(null)}
          >
            <div className="max-w-7xl mx-auto w-full px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center h-full py-20">
              
              {/* Left Content */}
              <div className="lg:col-span-5 flex flex-col gap-10 z-20 pointer-events-none">
                <div className="flex items-center gap-4">
                  <span className="text-6xl md:text-8xl font-black text-white/10">{project.id}</span>
                  <div className="px-3 py-1 border border-white/10 rounded-full text-[10px] font-mono text-orange-500 uppercase">
                    {project.category}
                  </div>
                </div>

                <div className="space-y-4">
                  <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-[0.9]">
                    {project.title}
                  </h2>
                  <p className="text-sm md:text-lg text-gray-400 font-medium leading-relaxed max-w-md">
                    {project.description}
                  </p>
                </div>

                {/* Tech Stack Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">Technologies</span>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map(t => (
                        <span key={t} className="px-2 py-1 bg-white/5 text-[10px] font-mono text-gray-300">{t}</span>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">Metrics</span>
                    <div className="space-y-1">
                      {Object.entries(project.stats).map(([key, val]) => (
                        <div key={key} className="flex justify-between text-[10px] font-mono border-b border-white/5 pb-1">
                          <span className="text-gray-500 uppercase">{key}</span>
                          <span className="text-orange-500">{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-8">
                  <Link href={`/work/${project.id}`} className="pointer-events-auto group inline-flex items-center gap-3 text-sm font-bold uppercase tracking-widest hover:text-orange-600 transition-colors">
                    <div className="w-10 h-10 border border-white/20 flex items-center justify-center group-hover:bg-orange-600 group-hover:border-orange-600 group-hover:text-black transition-all">
                      <ArrowUpRight size={18} />
                    </div>
                    <span>Analyze Case Study</span>
                  </Link>
                </div>
              </div>

              {/* Right Image (Parallax/Reveal) */}
              <div className="lg:col-span-7 h-[50vh] lg:h-[70vh] relative group overflow-hidden rounded-sm lg:rounded-none">
                <div className="absolute inset-0 bg-orange-600/10 mix-blend-color z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Overlay UI Elements */}
                <div className="absolute top-4 left-4 z-20 flex gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-[10px] font-mono text-green-500">LIVE_PREVIEW</span>
                </div>
                
                {/* Image */}
                <motion.img 
                  initial={{ scale: 1.1, filter: "grayscale(100%)" }}
                  whileInView={{ scale: 1, filter: "grayscale(0%)" }}
                  transition={{ duration: 1.5 }}
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                />

                {/* Cyberpunk Corners */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-orange-600 z-20" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-orange-600 z-20" />
              </div>
            </div>

            {/* Background Grid for Specific Card */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
               <GridPattern size={30} opacity={0.1} />
            </div>
          </div>
        ))}
      </section>

      {/* --- ARCHIVE SECTION (List View) --- */}
      <section className="archive-section py-24 md:py-40 bg-[#0A0A0A] border-t border-white/10 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex justify-between items-end mb-20">
            <h2 className="text-6xl md:text-9xl font-black uppercase italic tracking-tighter text-white/10">
              The<br />Archive
            </h2>
            <div className="text-right hidden md:block">
              <p className="font-mono text-xs text-orange-500 mb-2">[ LEGACY_SYSTEMS ]</p>
              <p className="max-w-xs text-xs text-gray-500">
                Earlier prototypes, experimental builds, and closed-source internal tools.
              </p>
            </div>
          </div>

          <div className="border-t border-white/10">
            {ARCHIVE.map((item, i) => (
              <motion.div 
                key={i}
                className="archive-row group relative flex flex-col md:flex-row md:items-center justify-between py-8 border-b border-white/10 hover:bg-white/5 transition-colors cursor-pointer px-4"
              >
                <div className="flex items-center gap-8">
                  <span className="font-mono text-xs text-gray-600">0{i+5}</span>
                  <h3 className="text-2xl md:text-4xl font-black uppercase italic text-gray-300 group-hover:text-orange-500 group-hover:translate-x-4 transition-all duration-300">
                    {item.name}
                  </h3>
                </div>
                
                <div className="flex items-center gap-8 mt-4 md:mt-0">
                  <span className="font-mono text-xs px-2 py-1 border border-white/10 text-gray-500 uppercase">{item.type}</span>
                  <span className="font-mono text-xs text-gray-600">{item.year}</span>
                  <ArrowUpRight className="text-gray-600 group-hover:text-orange-600 opacity-0 group-hover:opacity-100 transition-all" size={20} />
                </div>

                {/* Hover Reveal Image (Floating) */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-32 bg-gray-800 hidden md:block opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 z-20 overflow-hidden border border-orange-600/50">
                  <img 
                    src={`https://source.unsplash.com/random/400x200?tech,code,${i}`} 
                    className="w-full h-full object-cover mix-blend-luminosity"
                    alt="preview"
                  />
                  <div className="absolute inset-0 bg-orange-600/10" />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 flex justify-center">
            <button className="px-8 py-4 border border-white/20 font-mono text-xs uppercase hover:bg-white hover:text-black transition-colors">
              Load_All_Repositories (42)
            </button>
          </div>
        </div>
      </section>

      {/* --- STATS / PROCESS FOOTER --- */}
      <section className="py-24 bg-orange-600 text-black overflow-hidden relative">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
         
         <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
            <div className="space-y-4 text-center md:text-left">
              <ActivityIcon size={48} className="mx-auto md:mx-0 mb-4" />
              <div className="text-6xl font-black tracking-tighter">100%</div>
              <p className="font-bold uppercase tracking-widest text-sm">Uptime Guarantee</p>
            </div>
            <div className="space-y-4 text-center md:text-left">
              <Code2 size={48} className="mx-auto md:mx-0 mb-4" />
              <div className="text-6xl font-black tracking-tighter">500k+</div>
              <p className="font-bold uppercase tracking-widest text-sm">Lines of Code Shipped</p>
            </div>
            <div className="space-y-4 text-center md:text-left">
              <Zap size={48} className="mx-auto md:mx-0 mb-4" />
              <div className="text-6xl font-black tracking-tighter">14 Days</div>
              <p className="font-bold uppercase tracking-widest text-sm">Avg. Launch Time</p>
            </div>
         </div>
      </section>

      <Footer />
    </main>
  );
}

// --- Icons wrapper for simplicity ---
const ActivityIcon = ({size, className}: {size:number, className?:string}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
);