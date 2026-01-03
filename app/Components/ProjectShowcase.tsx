"use client";

import { useRef, useEffect, useState, MouseEvent as ReactMouseEvent } from "react";
import { 
  motion, 
  useMotionValue, 
  useSpring, 
  useTransform, 
  useScroll 
} from "framer-motion";
import { ExternalLink, Code2, Layers, Activity, Zap, Crosshair, Cpu, Globe } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// --- DATA ---
interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  liveLink: string;
  image: string;
  category: string;
}

const projects = [
  {
    id: 1,
    title: "Skyline Chili",
    description: "Professional restaurant website with online ordering.",
    techStack: ["React", "CMS"],
    liveLink: "https://skylinechili.com",
    image: "/projects/SkylineChill.png",
    category: "Restaurant"
  },
  {
    id: 2,
    title: "Goodwin Batteries",
    description: "Industrial battery supplier platform.",
    techStack: ["E-commerce", "B2B"],
    liveLink: "https://goodwinbatteries.in",
    image: "/projects/Goodwin%20Batteries.png",
    category: "Industrial"
  },
  {
    id: 3,
    title: "Vyapar App",
    description: "GST billing & accounting software.",
    techStack: ["Android", "Cloud"],
    liveLink: "https://vyaparapp.in",
    image: "/projects/Vyapar%20App.png",
    category: "FinTech"
  },
  {
    id: 4,
    title: "HROne Cloud",
    description: "Complete HR management platform.",
    techStack: ["AI/ML", "Enterprise"],
    liveLink: "https://hrone.cloud",
    image: "/projects/HROne%20Cloud.png",
    category: "HR Tech"
  },
  {
    id: 5,
    title: "First500days",
    description: "Global venture studio.",
    techStack: ["Full Stack", "Consulting"],
    liveLink: "https://first500days.com",
    image: "/projects/First500days.png",
    category: "Venture"
  },
  {
    id: 6,
    title: "CyreneAI",
    description: "AI-powered tokenization infrastructure.",
    techStack: ["AI", "Blockchain"],
    liveLink: "https://cyreneai.com",
    image: "/projects/CyreneAI.png",
    category: "AI"
  },
  {
    id: 7,
    title: "Saurce",
    description: "African manufacturing sourcing platform connecting buyers with personally verified manufacturers across Sub-Saharan Africa. Transparent pricing, capacity, and direct contacts.",
    techStack: ["Next.js", "B2B Platform", "Marketplace", "API"],
    liveLink: "https://saurce.fr",
    image: "/projects/Saurce.png",
    category: "B2B Marketplace"
  }
];

// --- UTILITIES ---

const useScrambleText = (text: string, speed: number = 40) => {
  const [displayText, setDisplayText] = useState("");
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";
  
  useEffect(() => {
    let i = 0;
    let timer: NodeJS.Timeout;
    
    const animate = () => {
      setDisplayText((prev) => {
        if (i >= text.length) {
          clearInterval(timer);
          return text;
        }
        const scrambled = text
          .split("")
          .map((char, index) => {
            if (index < i) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("");
        i += 1/3; 
        return scrambled;
      });
    };
    timer = setInterval(animate, speed);
    return () => clearInterval(timer);
  }, [text, speed]);

  return displayText;
};

// --- COMPONENTS ---

// 1. The 3D Marquee Row (Optimized for smoothness)
const MarqueeRow = ({ reverse = false, duration = 50 }) => {
  return (
    <div className="flex overflow-hidden w-full relative group pointer-events-none">
      <motion.div
        initial={{ x: reverse ? "-50%" : "0%" }}
        animate={{ x: reverse ? "0%" : "-50%" }}
        transition={{ duration, ease: "linear", repeat: Infinity }}
        className="flex gap-6 px-4 w-max will-change-transform" // Hardware acceleration
      >
        {/* Quadruple data to ensure gapless loop on large 4k screens */}
        {[...projects, ...projects, ...projects, ...projects].map((project, i) => (
          <div 
            key={i} 
            className="relative w-[280px] md:w-[360px] aspect-[16/9] rounded-lg overflow-hidden border border-white/20 bg-white/5"
          >
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-500"
            />
            {/* Subtle overlay so text pops, but image is still very visible */}
            <div className="absolute inset-0 bg-black/20" />
            
            {/* Minimal Label */}
            <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded border border-white/10">
              <span className="text-[10px] font-bold text-white uppercase tracking-wider">{project.title}</span>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

// 2. Custom Cursor
const ProjectCursor = ({ active }: { active: boolean }) => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 64);
      cursorY.set(e.clientY - 64);
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
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <span className="font-black text-xs tracking-widest uppercase">View</span>
    </motion.div>
  );
};

// 3. THE MASTERPIECE HERO (Updated Headlines + Visibility)
const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Scramble Texts - NEW HEADLINES
  const title1 = useScrambleText("OUR", 50);
  const title2 = useScrambleText("PORTFOLIO", 50);

  // Mouse Interaction
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const xDisplay = useTransform(mouseX, (value) => value.toFixed(3));
  const yDisplay = useTransform(mouseY, (value) => value.toFixed(3));
  
  // Reduced parallax range to prevent "jitters" from aggressive movement
  const marqueeX = useTransform(mouseX, [0, 1], [-15, 15]);
  const marqueeY = useTransform(mouseY, [0, 1], [-15, 15]);
  
  const contentRotateX = useTransform(mouseY, [0, 1], [3, -3]);
  const contentRotateY = useTransform(mouseX, [0, 1], [-3, 3]);

  function handleMouseMove(e: ReactMouseEvent) {
    const { width, height, left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - left) / width);
    mouseY.set((e.clientY - top) / height);
  }

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-[#020202] perspective-1000"
      style={{ perspective: "1000px" }}
    >
      {/* 1. LAYER: GRAIN */}
      <div className="absolute inset-0 z-30 pointer-events-none opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />

      {/* 2. LAYER: 3D MARQUEE BACKGROUND */}
      <motion.div 
        style={{ 
          x: marqueeX, 
          y: marqueeY, 
          rotateX: 10, // Reduced tilt for better visibility
          rotateZ: -5,
          scale: 1.1,
          willChange: "transform" // Critical for preventing jitters
        }}
        className="absolute inset-0 z-0 flex flex-col justify-center gap-6 opacity-60 hover:opacity-90 transition-opacity duration-700"
      >
        <MarqueeRow duration={60} />
        <MarqueeRow reverse duration={70} />
        <MarqueeRow duration={80} />
        
        {/* Soft Vignette (Lighter than before to keep images visible) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#020202_95%)]" />
      </motion.div>

      {/* 3. LAYER: HUD ELEMENTS (Cleaned Branding) */}
      <div className="absolute inset-0 z-20 pointer-events-none p-6 md:p-12 hidden md:block">
        {/* Top Left */}
        <div className="absolute top-12 left-12 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-xs font-mono text-orange-500/80">
                <Globe size={14} className="animate-spin-slow" />
                <span>NEXUS.ONLINE</span>
            </div>
            <div className="h-px w-24 bg-orange-500/30" />
        </div>
        
        {/* Top Right */}
        <div className="absolute top-12 right-12 text-right">
             <div className="text-[10px] font-mono text-gray-500 mb-1">GRID POS</div>
             <div className="text-xs font-mono text-orange-500 flex flex-col items-end gap-1">
                <div className="flex gap-2">X: <motion.span>{xDisplay}</motion.span></div>
                <div className="flex gap-2">Y: <motion.span>{yDisplay}</motion.span></div>
             </div>
        </div>

        {/* Bottom Left */}
        <div className="absolute bottom-12 left-12">
            <div className="flex items-center gap-2 mb-2">
                <Cpu size={14} className="text-gray-600" />
                <span className="text-[10px] font-mono text-gray-500">SYSTEM KERNEL v1.0</span>
            </div>
            <div className="flex gap-1">
                {[1,2,3,4].map(i => (
                    <motion.div 
                        key={i}
                        animate={{ height: [10, 20, 10] }}
                        transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                        className="w-1 bg-orange-600/40" 
                    />
                ))}
            </div>
        </div>
      </div>

      {/* 4. MAIN CONTENT */}
      <motion.div 
        style={{ rotateX: contentRotateX, rotateY: contentRotateY, transformStyle: "preserve-3d" }}
        className="relative z-20 flex flex-col items-center text-center max-w-7xl px-6"
      >
        {/* Top Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-orange-500/30 bg-black/60 backdrop-blur-md shadow-[0_0_20px_rgba(249,115,22,0.2)]"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
          <span className="text-[10px] font-mono text-orange-400 uppercase tracking-[0.2em]">
            Portfolio Archive
          </span>
        </motion.div>

        {/* Hero Text */}
        <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter text-white leading-[0.85] mb-10 select-none drop-shadow-2xl">
          <div className="relative block overflow-hidden">
             <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-400">
                {title1}
             </span>
          </div>
          
          <div className="relative block mt-2">
             {/* CHANGED TO SOLID ORANGE */}
             <span 
               className="block text-[#FF4D00]"
             >
                {title2}
             </span>
             {/* Glow Effect */}
             <span className="absolute inset-0 text-[#FF4D00]/20 blur-[20px] pointer-events-none">
                 {title2}
             </span>
          </div>
        </h1>

        {/* Description - Added bg to ensure readability over marquee */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="text-gray-300 text-sm md:text-lg max-w-lg leading-relaxed font-light tracking-wide mb-12 bg-black/40 backdrop-blur-sm p-4 rounded-xl border border-white/5"
        >
          <span className="text-orange-500 font-mono text-xs mr-2">[MISSION]</span>
          We fuse code and creativity to build digital ecosystems that feel alive. 
          Performance, aesthetics, and scalability in perfect harmony.
        </motion.p>

        {/* Primary CTA */}
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-8 py-4 bg-white text-black font-bold uppercase text-xs tracking-widest overflow-hidden hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-shadow"
        >
            <div className="absolute inset-0 bg-orange-500 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
            <span className="relative z-10 group-hover:text-white transition-colors duration-300 flex items-center gap-2">
                Explore Work <Zap size={14} />
            </span>
        </motion.button>
      </motion.div>
    </section>
  );
};

// 4. Main Projects Component
export default function ProjectsShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray(".project-section");
      
      sections.forEach((section: any) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "bottom top",
          pin: true,
          pinSpacing: false,
          snap: {
            snapTo: 1,
            duration: 0.5,
            delay: 0.1,
            ease: "power1.inOut"
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main 
      id="our-work"
      ref={containerRef} 
      className="relative bg-[#020202] overflow-hidden"
    >
      <ProjectCursor active={activeProject !== null} />

      {/* NEW 3D MARQUEE HERO */}
      <Hero />

      {/* Projects Grid */}
      <div className="relative z-30">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="project-section h-screen w-full relative py-0 bg-[#020202] flex items-center overflow-hidden border-t border-white/5"
            onMouseEnter={() => setActiveProject(project.id)}
            onMouseLeave={() => setActiveProject(null)}
          >
            <div className="h-full w-full grid grid-cols-1 lg:grid-cols-12 gap-0">
              
              {/* Left Side - Image */}
              <div className={`lg:col-span-7 relative overflow-hidden h-[40vh] lg:h-full ${
                index % 2 === 0 ? 'order-1' : 'order-1 lg:order-2'
              }`}>
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="project-card relative h-full w-full group cursor-pointer block"
                >
                  {/* Live Indicator */}
                  <div className="absolute top-6 left-6 z-30 flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-[10px] font-mono text-green-500 uppercase tracking-wider">Live</span>
                  </div>

                  <motion.img
                    initial={{ scale: 1.1, filter: "grayscale(100%)" }}
                    whileInView={{ scale: 1, filter: "grayscale(0%)" }}
                    transition={{ duration: 1.2 }}
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-orange-600/20" />
                  
                  {/* Overlay Info on Image Hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/40 backdrop-blur-sm">
                    <div className="text-center">
                      <ExternalLink className="text-white mx-auto mb-4" size={48} />
                      <p className="text-white font-bold uppercase tracking-widest text-sm">Click to View</p>
                    </div>
                  </div>

                  {/* Corners */}
                  <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-orange-600 z-20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-orange-600 z-20 opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Project Number Badge */}
                  <div className="absolute top-8 right-8 lg:left-8 lg:right-auto text-6xl lg:text-[12rem] font-black text-white/5 leading-none select-none pointer-events-none">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                </a>
              </div>

              {/* Right Side - Content */}
              <div className={`lg:col-span-5 bg-[#0a0a0a] border-t lg:border-t-0 lg:border-l border-white/5 p-8 md:p-16 flex flex-col justify-center h-[60vh] lg:h-full ${
                index % 2 === 0 ? 'order-2' : 'order-2 lg:order-1'
              }`}>
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  {/* Category */}
                  <div className="flex items-center gap-3 mb-6">
                    <Layers className="text-orange-600" size={20} />
                    <span className="text-orange-600 font-mono text-xs uppercase tracking-widest font-black">
                      {project.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9] text-white mb-6">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-8 max-w-lg">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="mb-8">
                    <div className="flex items-center gap-2 mb-4">
                      <Code2 className="text-orange-600" size={18} />
                      <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">
                        Tech Stack
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-white/5 border border-white/10 rounded text-xs font-mono text-gray-300 hover:bg-orange-600/20 hover:border-orange-600/30 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 px-6 py-3 bg-orange-600 text-black font-black uppercase tracking-wider text-sm hover:bg-white transition-colors"
                  >
                    <span>View Live Project</span>
                    <ExternalLink 
                      className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" 
                      size={18} 
                    />
                  </a>
                </motion.div>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Stats Footer */}
      <section className="py-20 md:py-32 bg-orange-600 text-black overflow-hidden relative border-t border-white/10">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </div>
          
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-4 text-center md:text-left"
          >
            <Activity size={48} className="mx-auto md:mx-0 mb-4" strokeWidth={2.5} />
            <div className="text-6xl md:text-7xl font-black tracking-tighter">{projects.length}+</div>
            <p className="font-bold uppercase tracking-widest text-sm">Live Projects</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4 text-center md:text-left"
          >
            <Code2 size={48} className="mx-auto md:mx-0 mb-4" strokeWidth={2.5} />
            <div className="text-6xl md:text-7xl font-black tracking-tighter">100%</div>
            <p className="font-bold uppercase tracking-widest text-sm">Client Satisfaction</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4 text-center md:text-left"
          >
            <Layers size={48} className="mx-auto md:mx-0 mb-4" strokeWidth={2.5} />
            <div className="text-6xl md:text-7xl font-black tracking-tighter">8+</div>
            <p className="font-bold uppercase tracking-widest text-sm">Industries Served</p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}