"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
  memo,
} from "react";
import {
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
  LazyMotion,
  domAnimation,
  m,
} from "framer-motion";
import {
  Zap,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Terminal,
  Code2,
  Lock,
  Smartphone,
  FileCode,
  Globe,
  Star,
  Award,
  Gift,
} from "lucide-react";

// --- OPTIMIZED UTILITY HOOKS ---
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    
    let timeoutId: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(checkMobile, 150);
    };
    
    window.addEventListener("resize", debouncedResize, { passive: true });
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", debouncedResize);
    };
  }, []);
  
  return isMobile;
};

// --- OPTIMIZED COMPONENTS ---

const ScrambleText = memo(
  ({
    text,
    className,
    startDelay = 500,
  }: {
    text: string;
    className?: string;
    startDelay?: number;
  }) => {
    const [display, setDisplay] = useState(text);
    const [hasStarted, setHasStarted] = useState(false);
    const charsRef = useRef("ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%&");

    useEffect(() => {
      const startTimeout = setTimeout(() => setHasStarted(true), startDelay);
      return () => clearTimeout(startTimeout);
    }, [startDelay]);

    useEffect(() => {
      if (!hasStarted) return;
      
      let iteration = 0;
      const interval = setInterval(() => {
        setDisplay(
          text
            .split("")
            .map((letter, index) => {
              if (index < iteration) return text[index];
              if (letter === " ") return " ";
              return charsRef.current[Math.floor(Math.random() * charsRef.current.length)];
            })
            .join(""),
        );
        if (iteration >= text.length) clearInterval(interval);
        iteration += 1 / 3;
      }, 30);
      
      return () => clearInterval(interval);
    }, [text, hasStarted]);

    return <span className={className}>{display}</span>;
  },
);
ScrambleText.displayName = "ScrambleText";

// Enhanced Banner Component
const ContinuousBanner = memo(() => {
  const bannerItems = [
    { icon: Gift, text: "FREE WEBSITE" },
    { icon: Star, text: "NO HIDDEN FEES" },
    { icon: Award, text: "FULL OWNERSHIP" },
    { icon: Zap, text: "7 DAY DELIVERY" },
    { icon: Star, text: "LIMITED TIME" },
    { icon: Award, text: "7 WINNERS" },
    { icon: Gift, text: "$5000 VALUE" },
  ];
  
  return (
    <div className="w-full bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 py-6 md:py-8 relative overflow-hidden border-y-4 border-black shadow-[0_10px_50px_rgba(234,88,12,0.5)]">
      {/* Animated background pattern */}
      <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(0,0,0,0.1)_10px,rgba(0,0,0,0.1)_20px)]" />
      
      <m.div
        animate={{ x: [0, -1800] }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex whitespace-nowrap items-center"
      >
        {Array(8)
          .fill(null)
          .map((_, i) => (
            <div key={i} className="flex items-center">
              {bannerItems.map((item, j) => {
                const Icon = item.icon;
                return (
                  <div
                    key={j}
                    className="flex items-center gap-3 mx-6 md:mx-12"
                  >
                    <Icon 
                      size={28} 
                      className="text-white drop-shadow-lg" 
                      strokeWidth={3}
                      fill="white"
                    />
                    <span className="text-white font-black text-xl md:text-3xl uppercase tracking-wider drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                      {item.text}
                    </span>
                    <Star 
                      size={20} 
                      className="text-yellow-300" 
                      fill="yellow"
                    />
                  </div>
                );
              })}
            </div>
          ))}
      </m.div>
      
      {/* Shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
    </div>
  );
});
ContinuousBanner.displayName = "ContinuousBanner";

const SpotlightCard = memo(({
  children,
  className = "",
  spotlightColor = "rgba(234, 88, 12, 0.15)",
  disabled = false,
}: any) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, [disabled]);

  const handleMouseEnter = useCallback(() => !disabled && setOpacity(1), [disabled]);
  const handleMouseLeave = useCallback(() => setOpacity(0), []);

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden ${className}`}
    >
      {!disabled && (
        <div
          className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300"
          style={{
            opacity,
            background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
});
SpotlightCard.displayName = "SpotlightCard";

const TechSpecs = memo(({ isMobile }: { isMobile: boolean }) => {
  const specs = useMemo(() => [
    {
      icon: Code2,
      title: "Modern Stack",
      desc: "Next.js 14 + React Server Components",
    },
    {
      icon: Zap,
      title: "Edge Performance",
      desc: "Global CDN Deployment via Vercel",
    },
    {
      icon: Smartphone,
      title: "Responsive Core",
      desc: "Mobile-First Tailwind Architecture",
    },
    {
      icon: Lock,
      title: "Enterprise Security",
      desc: "SSL, DDoS Protection & Encrypted Data",
    },
  ], []);

  return (
    <div className="w-full max-w-5xl mx-auto mb-20 relative z-30 px-4">
      <div className="flex items-center gap-4 mb-8">
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-white/20" />
        <h3 className="text-xs md:text-sm font-mono text-zinc-500 uppercase tracking-[0.3em] md:tracking-[0.5em]">
          System Capabilities
        </h3>
        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-white/20" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {specs.map((spec, i) => (
          <SpotlightCard
            key={i}
            disabled={isMobile}
            className="bg-zinc-900/40 border border-white/5 p-3 md:p-6 group hover:border-orange-500/30 transition-colors backdrop-blur-sm"
          >
            <div className="w-8 h-8 md:w-10 md:h-10 bg-zinc-800 rounded-lg flex items-center justify-center mb-2 md:mb-4 group-hover:bg-orange-600 group-hover:text-black transition-colors">
              <spec.icon size={isMobile ? 16 : 20} />
            </div>
            <h4 className="text-white font-bold uppercase text-[10px] md:text-sm mb-1 md:mb-2 leading-tight">
              {spec.title}
            </h4>
            <p className="text-zinc-500 text-[9px] md:text-xs font-mono leading-relaxed">
              {spec.desc}
            </p>
          </SpotlightCard>
        ))}
      </div>
    </div>
  );
});
TechSpecs.displayName = "TechSpecs";

const ProcessTimeline = memo(({ isMobile }: { isMobile: boolean }) => {
  const steps = useMemo(() => [
    {
      title: "Target Selection",
      desc: "Randomized algorithm selects 7 unique founders from the entry pool.",
      time: "T-Minus 48h",
    },
    {
      title: "Briefing Uplink",
      desc: "Winners receive a secure link to define project scope and asset transfer.",
      time: "T-Minus 24h",
    },
    {
      title: "Rapid Development",
      desc: "Our elite dev squad builds the core architecture in a 7-day sprint.",
      time: "Deployment Phase",
    },
    {
      title: "Global Launch",
      desc: "Full ownership transfer. Source code handover. You go live.",
      time: "Mission Complete",
    },
  ], []);

  return (
    <div className="w-full max-w-4xl mx-auto mt-24 mb-20 relative z-30 px-4">
      <div className="text-center mb-16">
        <h2 className="text-3xl font-black uppercase italic tracking-tighter text-white mb-2">
          Execution Protocol
        </h2>
        <p className="text-orange-600 font-mono text-xs uppercase tracking-widest">
          /// From Selection to Launch
        </p>
      </div>

      <div className="relative">
        <div className="absolute left-[15px] top-0 bottom-0 w-[1px] bg-zinc-800 md:left-1/2" />
        {steps.map((step, i) => (
          <div
            key={i}
            className={`relative flex items-start gap-8 mb-12 md:mb-0 ${i % 2 === 0 ? "md:flex-row-reverse" : ""}`}
          >
            <div className="hidden md:block w-1/2" />
            <div className="absolute left-0 md:left-1/2 -translate-x-1/2 w-8 h-8 bg-black border-2 border-zinc-700 rounded-full flex items-center justify-center z-10">
              <div className="w-2 h-2 bg-orange-600 rounded-full" />
            </div>
            <SpotlightCard 
              disabled={isMobile}
              className="flex-1 bg-zinc-900/30 border border-white/5 p-6 ml-10 md:ml-0 md:mx-8 hover:border-orange-500/30 transition-colors backdrop-blur-sm"
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-white font-bold uppercase">{step.title}</h4>
                <span className="text-[10px] font-mono text-orange-500 border border-orange-500/30 px-2 py-0.5 rounded">
                  {step.time}
                </span>
              </div>
              <p className="text-zinc-500 text-sm font-mono leading-relaxed">
                {step.desc}
              </p>
            </SpotlightCard>
          </div>
        ))}
      </div>
    </div>
  );
});
ProcessTimeline.displayName = "ProcessTimeline";

const FAQTerminal = memo(() => (
  <div className="w-full max-w-3xl mx-auto mb-24 relative z-30 px-4">
    <div className="bg-[#0a0a0a] border border-zinc-800 overflow-hidden font-mono text-sm relative">
      <div className="bg-zinc-900/50 p-2 border-b border-zinc-800 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
          <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
        </div>
        <span className="text-zinc-500 text-xs ml-2">user@eaglex-faq:~</span>
      </div>

      <div className="p-6 space-y-6">
        <div>
          <p className="text-orange-500 mb-1">$ query --why-is-it-free</p>
          <p className="text-zinc-400 pl-4 border-l border-zinc-700">
            We are showcasing our velocity. We build fast, we build well. This
            is a marketing expense for us, allocated to providing value rather
            than running ads.
          </p>
        </div>
        <div>
          <p className="text-orange-500 mb-1">$ query --ownership-rights</p>
          <p className="text-zinc-400 pl-4 border-l border-zinc-700">
            100% Client Ownership. Upon completion, you receive the GitHub
            repository, Vercel transfer, and all related assets. No vendor
            lock-in.
          </p>
        </div>
        <div>
          <p className="text-orange-500 mb-1">$ query --hidden-fees</p>
          <p className="text-zinc-400 pl-4 border-l border-zinc-700">
            <span className="text-green-500">NULL.</span> No monthly
            maintenance fees. No hosting fees (on Vercel free tier). You pay
            $0.
          </p>
        </div>
        <div className="text-orange-500">$ _</div>
      </div>

      <div className="absolute top-0 right-0 p-4 opacity-20 pointer-events-none">
        <FileCode size={100} />
      </div>
    </div>
  </div>
));
FAQTerminal.displayName = "FAQTerminal";

const FooterMarquee = memo(() => {
  const marqueeItems = useMemo(() => [
    { text: "★ EAGLE X SYSTEMS", isSpecial: false },
    { text: "7 DAY TURNAROUND", isSpecial: true, icon: Zap },
    { text: "★ SEO OPTIMIZED", isSpecial: false },
    { text: "MOBILE RESPONSIVE", isSpecial: true, icon: Globe },
    { text: "★ FULL OWNERSHIP", isSpecial: false },
    { text: "★ $5000 VALUE", isSpecial: true },
  ], []);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white text-black py-2 font-black text-sm uppercase z-50 border-t-4 border-orange-600 hover:bg-orange-600 hover:text-white transition-colors cursor-help">
      <m.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="flex whitespace-nowrap"
      >
        {Array(4)
          .fill(null)
          .map((_, i) => (
            <div key={i} className="flex items-center">
              {marqueeItems.map((item, j) => {
                const Icon = item.icon;
                return (
                  <span
                    key={j}
                    className={`mx-8 flex items-center gap-2 ${item.isSpecial ? "text-orange-600" : ""}`}
                  >
                    {Icon && <Icon size={14} fill="currentColor" />}
                    {item.text}
                  </span>
                );
              })}
            </div>
          ))}
      </m.div>
    </div>
  );
});
FooterMarquee.displayName = "FooterMarquee";

// --- MAIN COMPONENT ---
export default function LuckyDrawPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectIdea: "",
    companyName: "",
    website: "",
  });
  const [errors, setErrors] = useState<any>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [mounted, setMounted] = useState(false);

  const isMobile = useIsMobile();

  // Simplified mouse tracking - disabled on mobile
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = useMemo(() => ({ damping: 25, stiffness: 80 }), []);
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);
  const rotateX = useTransform(springY, [0, 1000], [1, -1]);
  const rotateY = useTransform(springX, [0, 2000], [-1, 1]);

  useEffect(() => {
    setMounted(true);
    
    if (!isMobile) {
      const handleMouse = (e: MouseEvent) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      };
      
      window.addEventListener("mousemove", handleMouse, { passive: true });
      return () => window.removeEventListener("mousemove", handleMouse);
    }
  }, [mouseX, mouseY, isMobile]);

  const handleChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev: any) => ({ ...prev, [name]: "" }));
  }, [errors]);

  const validateForm = useCallback(() => {
    const newErrors: any = {};
    if (!formData.name.trim()) newErrors.name = "Required";
    if (!formData.email.trim()) newErrors.email = "Required";
    if (!formData.phone.trim()) newErrors.phone = "Required";
    if (!formData.projectIdea.trim()) newErrors.projectIdea = "Required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch('/api/lucky-draw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit entry');
      }

      setStatus("sent");
      setFormData({
        name: "",
        email: "",
        phone: "",
        projectIdea: "",
        companyName: "",
        website: "",
      });
    } catch (error: any) {
      setStatus("error");
      setErrorMessage(error.message || 'Failed to submit entry. Please try again.');
      
      setTimeout(() => {
        setStatus("idle");
        setErrorMessage("");
      }, 5000);
    }
  }, [formData, validateForm]);

  const handleReset = useCallback(() => setStatus("idle"), []);

  return (
    <LazyMotion features={domAnimation} strict>
      <main className="min-h-screen bg-[#020202] text-white relative overflow-x-hidden selection:bg-orange-500 selection:text-black font-sans">
        {/* Simplified Background - Static on Mobile */}
        <div className="fixed inset-0 z-0 pointer-events-none select-none flex items-center justify-center">
          {/* Simplified gradient background */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(234,88,12,0.15),transparent_50%)]" />
          
          {/* Static Eagle Image */}
          <img
            src="/Eaglex2.png"
            alt="Eagle X Robo Logo"
            className="relative z-10 w-full h-full object-contain object-center scale-125 md:scale-90 translate-y-[-5%] md:translate-y-0 opacity-60"
            loading="eager"
          />

          <div className="absolute inset-0 z-20 bg-[radial-gradient(circle_at_center,transparent_15%,#000_95%)]" />
          <div className="absolute bottom-0 left-0 right-0 h-full z-20 bg-gradient-to-t from-[#020202] via-[#020202]/80 to-transparent" />
        </div>

        {/* Simplified Grid */}
        <div className="fixed inset-0 z-0 pointer-events-none opacity-5">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </div>

        {/* Main Content */}
        <div className="relative z-30 pt-20 md:pt-32 pb-20 flex flex-col items-center">
          {/* Hero Header */}
          <div className="relative text-center max-w-7xl mx-auto px-4 md:px-8 mb-12">
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-500/30 bg-orange-500/10 mb-4 md:mb-6 backdrop-blur-md"
            >
              <div className="w-2 h-2 rounded-full bg-orange-500" />
              <span className="text-xs font-mono text-orange-400 tracking-widest uppercase">
                Eagle x / Lucky Draw
              </span>
            </m.div>

            <h1 className="text-4xl sm:text-5xl md:text-9xl font-black text-white tracking-tighter leading-[0.9] uppercase mb-6 md:mb-8">
              <div className="flex flex-col items-center gap-1 md:gap-2">
                <span className="relative inline-block">
                  WIN A FREE
                  {!isMobile && (
                    <>
                      <span className="absolute inset-0 text-red-500 opacity-50 mix-blend-screen translate-x-[2px] pointer-events-none">
                        WIN A FREE
                      </span>
                      <span className="absolute inset-0 text-blue-500 opacity-50 mix-blend-screen -translate-x-[2px] pointer-events-none">
                        WIN A FREE
                      </span>
                    </>
                  )}
                </span>

                <span className="text-transparent bg-clip-text bg-gradient-to-b from-orange-400 to-orange-700">
                  {mounted ? <ScrambleText text="WEBSITE" /> : "WEBSITE"}
                </span>
              </div>
            </h1>

            <p className="max-w-xl mx-auto text-gray-200 text-base md:text-lg lg:text-xl font-medium leading-relaxed mb-8 md:mb-10 px-4 md:px-0">
              Forging high-performance digital infrastructure for the next
              generation of{" "}
              <span className="text-white font-bold">unicorn founders.</span>{" "}
              Enter now for a chance to win.
            </p>
          </div>

          {/* Enhanced Continuous Banner */}
          <ContinuousBanner />

          <TechSpecs isMobile={isMobile} />

          {/* 3D Form Container - Simplified on Mobile */}
          <m.div
            style={isMobile ? {} : { rotateX, rotateY }}
            className="w-full max-w-4xl px-4 md:px-0 relative mb-20 mt-16"
          >
            {/* Decorative Elements */}
            <m.div
              animate={isMobile ? {} : { rotate: [10, 15, 10], scale: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-16 -right-4 md:-right-8 z-30 w-24 h-24 md:w-36 md:h-36 bg-yellow-400 rounded-full flex items-center justify-center border-4 border-black shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)]"
            >
              <div className="text-center transform -rotate-12">
                <p className="text-black font-black text-3xl md:text-5xl leading-none tracking-tighter">
                  $0
                </p>
                <p className="text-black font-bold text-[10px] md:text-xs uppercase leading-none bg-black text-white px-1">
                  Cost to you
                </p>
              </div>
            </m.div>

            <div className="absolute -left-20 top-20 -rotate-12 hidden lg:block z-30">
              <div className="bg-red-600 text-white font-black text-xl px-4 py-2 uppercase border-2 border-white shadow-lg">
                High Value Asset
              </div>
            </div>

            {/* Main Form Box */}
            <div className="relative bg-[#111] border border-zinc-700 p-1 shadow-[0_0_100px_rgba(234,88,12,0.1)] backdrop-blur-sm">
              <div className="h-3 w-full bg-[repeating-linear-gradient(45deg,#ea580c,#ea580c_10px,#000_10px,#000_20px)] mb-1 relative z-10" />

              <div className="bg-[#090909] p-6 md:p-12 relative z-10">
                <AnimatePresence mode="wait">
                  {status === "sent" ? (
                    <m.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-20 relative z-20"
                    >
                      <div className="w-24 h-24 bg-green-500 rounded-none mx-auto mb-8 flex items-center justify-center transform rotate-3 shadow-[8px_8px_0px_white] border-2 border-black">
                        <CheckCircle2 size={48} className="text-black" />
                      </div>
                      <h3 className="text-3xl md:text-5xl font-black uppercase mb-2 italic tracking-tighter">
                        Transmission Received
                      </h3>
                      <div className="inline-block bg-white text-black px-6 py-2 text-sm font-bold uppercase mb-8 transform -rotate-2 border-2 border-zinc-500 border-dashed">
                        Ticket ID: #{Math.floor(Math.random() * 9000) + 1000}-X
                      </div>
                      <p className="text-gray-400 mb-8 max-w-md mx-auto font-mono text-sm">
                        Stand by for uplink. Selected candidates will be
                        contacted via encrypted channel within 48 hours.
                      </p>
                      <button
                        onClick={handleReset}
                        className="text-orange-500 hover:text-white underline underline-offset-4 decoration-2 font-mono uppercase"
                      >
                        [ Initiate New Sequence ]
                      </button>
                    </m.div>
                  ) : (
                    <m.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="relative z-20"
                    >
                      <div className="flex items-end justify-between mb-10 border-b-2 border-white/10 pb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="w-2 h-2 bg-red-500 rounded-full" />
                            <span className="text-[10px] font-mono text-red-500 uppercase">
                              Recording Entry
                            </span>
                          </div>
                          <h2 className="text-2xl md:text-3xl font-black uppercase italic tracking-tighter text-white">
                            Enter The Draw
                          </h2>
                          <p className="text-orange-600 font-mono text-xs uppercase tracking-widest mt-1">
                            /// No Payment Required
                          </p>
                        </div>
                        <Terminal className="text-zinc-700 mb-1" />
                      </div>

                      {status === "error" && (
                        <div className="bg-red-500 text-white p-4 mb-8 font-bold flex items-center gap-3 shadow-[4px_4px_0px_rgba(255,255,255,0.1)] border border-white">
                          <AlertCircle size={20} /> {errorMessage}
                        </div>
                      )}

                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                          {["name", "phone"].map((field) => (
                            <div key={field} className="space-y-1">
                              <label className="text-[10px] font-black bg-white text-black px-1 uppercase inline-block transform -skew-x-12 ml-2">
                                {field === "name" ? "Identity" : "Signal"}
                              </label>
                              <SpotlightCard 
                                disabled={isMobile}
                                className="bg-zinc-900/50 border border-zinc-700 hover:border-orange-500 transition-colors"
                              >
                                <input
                                  type={field === "phone" ? "tel" : "text"}
                                  name={field}
                                  value={(formData as any)[field]}
                                  onChange={handleChange}
                                  placeholder={
                                    field === "name"
                                      ? "FULL NAME"
                                      : "+1 000 000 0000"
                                  }
                                  className="w-full bg-transparent p-4 text-sm text-white focus:outline-none placeholder:text-zinc-600 font-mono"
                                />
                              </SpotlightCard>
                              {errors[field] && (
                                <p className="text-red-500 text-xs font-bold uppercase">
                                  Required Field
                                </p>
                              )}
                            </div>
                          ))}
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-black bg-white text-black px-1 uppercase inline-block transform -skew-x-12 ml-2">
                            Comms Channel
                          </label>
                          <SpotlightCard 
                            disabled={isMobile}
                            className="bg-zinc-900/50 border border-zinc-700 hover:border-orange-500 transition-colors"
                          >
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              placeholder="NAME@COMPANY.COM"
                              className="w-full bg-transparent p-4 text-sm text-white focus:outline-none placeholder:text-zinc-600 font-mono"
                            />
                          </SpotlightCard>
                          {errors.email && (
                            <p className="text-red-500 text-xs font-bold uppercase">
                              Required Field
                            </p>
                          )}
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          {["companyName", "website"].map((field) => (
                            <div key={field} className="space-y-1">
                              <label className="text-[10px] font-black bg-zinc-800 text-zinc-400 px-1 uppercase inline-block transform -skew-x-12 ml-2">
                                {field === "companyName"
                                  ? "Entity (Opt)"
                                  : "URL (Opt)"}
                              </label>
                              <SpotlightCard 
                                disabled={isMobile}
                                className="bg-zinc-900/50 border border-zinc-700 hover:border-orange-500 transition-colors"
                              >
                                <input
                                  type={field === "website" ? "url" : "text"}
                                  name={field}
                                  value={(formData as any)[field]}
                                  onChange={handleChange}
                                  placeholder="OPTIONAL"
                                  className="w-full bg-transparent p-4 text-sm text-white focus:outline-none placeholder:text-zinc-600 font-mono"
                                />
                              </SpotlightCard>
                            </div>
                          ))}
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-black bg-white text-black px-1 uppercase inline-block transform -skew-x-12 ml-2">
                            Project Brief
                          </label>
                          <SpotlightCard 
                            disabled={isMobile}
                            className="bg-zinc-900/50 border border-zinc-700 hover:border-orange-500 transition-colors"
                          >
                            <textarea
                              name="projectIdea"
                              value={formData.projectIdea}
                              onChange={handleChange}
                              rows={3}
                              placeholder="DESCRIBE YOUR VISION..."
                              className="w-full bg-transparent p-4 text-sm text-white focus:outline-none placeholder:text-zinc-600 font-mono resize-none"
                            />
                          </SpotlightCard>
                          {errors.projectIdea && (
                            <p className="text-red-500 text-xs font-bold uppercase">
                              Required Field
                            </p>
                          )}
                        </div>

                        <button
                          type="submit"
                          disabled={status === "sending"}
                          className="w-full group relative overflow-hidden bg-orange-600 hover:bg-white transition-colors duration-100 h-16"
                        >
                          <div className="absolute inset-0 flex items-center justify-center gap-3">
                            <span className="text-black font-black text-xl uppercase italic tracking-tighter group-hover:text-black transition-colors z-10">
                              {status === "sending"
                                ? "INITIALIZING..."
                                : "SECURE YOUR SPOT"}
                            </span>
                            <ArrowRight
                              className="text-black group-hover:translate-x-2 transition-transform z-10"
                              strokeWidth={3}
                            />
                          </div>
                        </button>
                      </form>
                    </m.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="h-3 w-full bg-[repeating-linear-gradient(-45deg,#ea580c,#ea580c_10px,#000_10px,#000_20px)] mt-1 relative z-10" />
            </div>
          </m.div>

          <ProcessTimeline isMobile={isMobile} />
          <FAQTerminal />
        </div>

        <FooterMarquee />

        <style jsx global>{`
          @keyframes shimmer {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(100%);
            }
          }
          .animate-shimmer {
            animation: shimmer 3s infinite;
          }
        `}</style>
      </main>
    </LazyMotion>
  );
}