"use client";

import React, { useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform
} from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight, Zap,
  Layers, Database, Rocket,
  Activity,
  Hexagon,
  Clock,
  FileCode,
  Users
} from "lucide-react";

// Import Shared Components
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import Footer from "./Components/Footer";
import { GridPattern, RevealTitle } from "./Components/shared";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function EagleXMonolith() {
  const containerRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Horizontal Scroll GSAP Logic
      const panels = gsap.utils.toArray(".h-panel");
      gsap.to(panels, {
        xPercent: -100 * (panels.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: ".h-trigger",
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => "+=" + (horizontalRef.current?.offsetWidth || 2000),
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-[#050505] text-[#F5F5F5] selection:bg-orange-600 selection:text-black overflow-x-hidden w-full">
      <GridPattern opacity={0.03} />

      <Navbar />
      <Hero />

      {/* Marquee Section */}
      <div className="relative py-8 md:py-12 bg-orange-600 border-y-4 border-black overflow-hidden flex select-none z-20 -rotate-1 origin-center scale-105">
        <motion.div
          animate={{ x: [0, -2000] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap items-center gap-10 md:gap-20 px-10"
        >
          {[...Array(12)].map((_, i) => (
            <React.Fragment key={i}>
              <span className="text-5xl md:text-7xl font-black uppercase text-black italic">MVP in 7 Days</span>
              <Zap className="text-black fill-black" size={32} />
              <span className="text-5xl md:text-7xl font-black uppercase text-black italic">Rapid Execution</span>
              <Hexagon className="text-black" size={32} />
            </React.Fragment>
          ))}
        </motion.div>
      </div>

      {/* Intent Section */}
      <section className="py-20 md:py-60 px-6 max-w-450 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20">
          <div className="lg:col-span-9">
            <RevealTitle className="text-xs md:text-sm font-mono text-orange-500 mb-6 md:mb-12 tracking-widest uppercase font-black">Section_01 // The Mission</RevealTitle>
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

      {/* Horizontal Scroll Trigger Area - Split Panel Layout */}
      <div className="h-trigger relative h-screen overflow-hidden">
        <div ref={horizontalRef} className="flex flex-row h-full w-[400vw]">

          {/* Panel 1: The Timeline (Speed Focus) */}
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
              <div className="absolute inset-0 bg-orange-600/10 z-10 pointer-events-none" />
              <img
                src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=2670&auto=format&fit=crop"
                alt="Rapid Development"
                className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity duration-1000 scale-105 hover:scale-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#080808] via-[#080808]/90 to-transparent" />
            </div>
          </div>

          {/* Panel 2: Minimal Requirements (Simplicity Focus) */}
          <div className="h-panel w-screen h-full bg-[#0a0a0a] border-r border-white/5 flex flex-col md:grid md:grid-cols-2 relative">
            <div className="relative h-1/2 md:h-full w-full overflow-hidden border-b md:border-b-0 md:border-r border-white/5">
              <img
                src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2670&auto=format&fit=crop"
                alt="Whiteboard Session"
                className="w-full h-full object-cover opacity-50 hover:opacity-80 transition-opacity duration-1000 grayscale hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-l from-[#0a0a0a] via-[#0a0a0a]/90 to-transparent" />
            </div>
            <div className="p-8 md:p-24 flex flex-col justify-center text-left md:text-right relative z-10 h-1/2 md:h-full">
              <div className="mb-8 md:ml-auto md:flex md:flex-col md:items-end">
                <FileCode size={48} className="text-orange-600 mb-6" />
                <h3 className="text-4xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9]">Lean<br />Inputs</h3>
              </div>
              <p className="text-sm md:text-xl text-gray-500 font-medium leading-relaxed max-w-xl md:ml-auto">
                We don&apos;t need a 50-page spec document. Send us a voice note, a napkin sketch, or a Loom video. We handle the technical translation.
              </p>
              <div className="flex flex-wrap gap-4 mt-8 md:justify-end">
                {["NO JARGON", "DIRECT COMMS", "FOUNDER FRIENDLY"].map(tag => (
                  <span key={tag} className="px-3 py-1 border border-white/10 text-[10px] md:text-xs font-mono">{tag}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Panel 3: Scalable Tech (Quality Focus) */}
          <div className="h-panel w-screen h-full bg-white text-black border-r border-white/5 flex flex-col md:grid md:grid-cols-2 relative">
            <div className="p-8 md:p-24 flex flex-col justify-center relative z-10 h-1/2 md:h-full order-2 md:order-1">
              <div className="mb-8">
                <Rocket size={48} className="text-orange-600 mb-6" />
                <h3 className="text-4xl md:text-8xl font-black uppercase italic tracking-tighter leading-[0.9]">Scale<br />Ready</h3>
              </div>
              <p className="text-sm md:text-xl font-bold leading-relaxed max-w-xl">
                Built fast doesn&apos;t mean built cheap. We use Next.js and Supabase to ensure your MVP can handle 100k+ users from day one.
              </p>
            </div>
            <div className="relative h-1/2 md:h-full w-full order-1 md:order-2 overflow-hidden border-b md:border-b-0 md:border-l border-gray-100">
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"
                alt="Scalable Infrastructure"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-white via-white/80 to-transparent" />
            </div>
          </div>

          {/* Panel 4: Ownership (Trust Focus) */}
          <div className="h-panel w-screen h-full bg-orange-600 text-black flex flex-col md:grid md:grid-cols-2 relative">
            <div className="relative h-1/2 md:h-full w-full overflow-hidden border-b md:border-b-0 md:border-r border-black/10">
              <div className="absolute inset-0 bg-orange-600/20 mix-blend-multiply z-10" />
              <img
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2664&auto=format&fit=crop"
                alt="Handover"
                className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-orange-600 via-orange-600/80 to-transparent" />
            </div>
            <div className="p-8 md:p-24 flex flex-col justify-center relative z-10 h-1/2 md:h-full">
              <h3 className="text-4xl md:text-8xl font-black uppercase leading-[0.9] italic tracking-tighter mb-8">Full<br />Ownership</h3>
              <div className="space-y-6">
                <p className="text-2xl md:text-3xl font-black uppercase leading-tight">No Lock-ins. <br /> You own the code.</p>
                <p className="text-sm md:text-base font-bold opacity-80 leading-relaxed uppercase max-w-md">
                  We deliver the complete GitHub repository, API keys, and documentation. You get a product you can pitch to investors with zero dependencies.
                </p>
                <div className="h-2 w-full bg-black/20" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bento Grid / Tools Section */}
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
            We use a pre-built, proprietary stack that allows us to skip 80% of the setup time and focus entirely on your unique business logic.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            show: { transition: { staggerChildren: 0.1 } }
          }}
          className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-325"
        >
          {/* Main Card: UI Kits */}
          <motion.div
            variants={{ hidden: { opacity: 0, scale: 0.95 }, show: { opacity: 1, scale: 1 } }}
            className="md:col-span-8 bg-[#0a0a0a] border border-white/10 rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 flex flex-col justify-between group overflow-hidden relative min-h-[400px] md:min-h-0"
          >
            <div className="absolute inset-0 bg-linear-to-br from-orange-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="flex justify-between items-start z-10">
              <Layers className="text-orange-600" size={48} />
              <span className="text-gray-700 font-mono text-[10px] md:text-xs uppercase font-black tracking-widest">Rapid_UI_Engine</span>
            </div>
            <div className="z-10 mt-10 md:mt-0">
              <h3 className="text-5xl md:text-9xl font-black uppercase italic leading-[0.85] mb-6 md:mb-10 group-hover:skew-x-2 transition-transform duration-700">
                Instant<br /><span className="text-orange-600">UI/UX</span> Kits
              </h3>
              <p className="text-gray-400 text-sm md:text-xl max-w-2xl leading-relaxed uppercase font-bold tracking-tight opacity-100 md:opacity-0 group-hover:opacity-100 transition-all duration-500 md:translate-y-4 group-hover:translate-y-0">
                We don&apos;t design from scratch. We utilize high-converting, tested component libraries to assemble your interface in hours, not weeks.
              </p>
            </div>
          </motion.div>

          {/* Card 2: Deployment */}
          <motion.div
            variants={{ hidden: { opacity: 0, x: 50 }, show: { opacity: 1, x: 0 } }}
            className="md:col-span-4 bg-orange-600 rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 flex flex-col justify-between group cursor-pointer overflow-hidden relative min-h-[300px] md:min-h-0"
          >
            <Rocket className="text-black group-hover:-translate-y-20 group-hover:translate-x-20 transition-all duration-700 ease-in-out" size={48} />
            <div className="space-y-4 z-10">
              <h4 className="text-4xl md:text-5xl font-black uppercase italic text-black leading-none">Day 1<br />Deploy</h4>
              <p className="text-black font-bold uppercase text-xs tracking-widest opacity-70">You get a live URL within 24 hours of kickoff.</p>
            </div>
          </motion.div>

          {/* Card 3: Communication */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            className="md:col-span-3 bg-[#111] border border-white/5 rounded-[2rem] md:rounded-[3rem] p-8 md:p-10 flex flex-col justify-between hover:bg-orange-600 transition-all duration-500 group min-h-[200px] md:min-h-0"
          >
            <Users className="text-orange-600 group-hover:text-black transition-colors" size={32} />
            <h4 className="text-xl md:text-2xl font-black uppercase tracking-tighter group-hover:text-black">Direct Access</h4>
            <p className="text-[10px] text-gray-500 font-mono group-hover:text-black/70">Slack/WhatsApp with devs. No middle-men.</p>
          </motion.div>

          {/* Card 4: Architecture */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            className="md:col-span-3 bg-[#0a0a0a] border border-white/10 rounded-[2rem] md:rounded-[3rem] p-8 md:p-10 flex flex-col justify-between hover:border-orange-600 transition-colors group min-h-[200px] md:min-h-0"
          >
            <Database className="text-orange-600 group-hover:scale-110 transition-transform" size={32} />
            <h4 className="text-xl md:text-2xl font-black uppercase tracking-tighter">Real DB</h4>
            <p className="text-[10px] text-gray-500 font-mono">Postgres setup included. Real data, no mocks.</p>
          </motion.div>

          {/* Card 5: Investor Ready */}
          <motion.div
            variants={{ hidden: { opacity: 0, scale: 0.9 }, show: { opacity: 1, scale: 1 } }}
            className="md:col-span-6 bg-[#111] border border-white/5 rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 flex items-center justify-between group overflow-hidden relative min-h-[200px] md:min-h-0"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#ea580c15_0%,transparent_70%)] group-hover:scale-150 transition-transform duration-1000" />
            <div className="space-y-2 md:space-y-4 z-10">
              <h4 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter group-hover:text-orange-500 transition-colors">Investor Ready</h4>
              <p className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-widest">Polished UX flows that sell the vision.</p>
            </div>
            <ArrowUpRight className="text-white opacity-20 group-hover:opacity-100 group-hover:translate-x-4 group-hover:-translate-y-4 transition-all duration-500" size={60} />
          </motion.div>
        </motion.div>
      </section>

      {/* System Specs Section */}
      <section className="py-24 md:py-60 bg-[#020202] relative overflow-hidden border-y border-white/5">
        <motion.div
          style={{ opacity: useTransform(scrollYProgress, [0.6, 0.7, 0.8], [0, 0.2, 0]) }}
          className="absolute inset-0"
        >
          <GridPattern size={40} />
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-40">
          <div className="space-y-12 md:space-y-24">
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                transition={{ duration: 0.8, ease: "circOut" }}
                className="text-5xl md:text-7xl font-black uppercase italic leading-none"
              >
                The<br /><span className="text-orange-600">Stack</span>
              </motion.h2>
            </div>

            <div className="space-y-8 md:space-y-12">
              {[
                { label: "Frontend", value: "Next.js / React 18", id: "01" },
                { label: "Styling", value: "Tailwind / Framer", id: "02" },
                { label: "Backend", value: "Supabase / Node", id: "03" },
                { label: "Delivery", value: "Vercel / Netlify", id: "04" }
              ].map((spec, i) => (
                <motion.div
                  key={spec.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="border-b border-white/10 pb-6 md:pb-8 flex justify-between items-end group cursor-crosshair"
                >
                  <div className="space-y-2">
                    <span className="text-orange-600 font-mono text-[10px] md:text-xs uppercase tracking-widest block group-hover:translate-x-2 transition-transform">
                      {spec.label}
                    </span>
                    <div className="text-xl md:text-3xl font-black uppercase group-hover:text-orange-500 transition-colors tracking-tighter">
                      {spec.value}
                    </div>
                  </div>
                  <span className="text-gray-800 font-mono text-xs group-hover:text-orange-900 transition-colors italic">{spec.id}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="bg-[#0a0a0a] rounded-3xl p-6 md:p-12 border border-white/5 flex flex-col gap-6 md:gap-10 shadow-[0_0_50px_rgba(234,88,12,0.05)]"
          >
            <div className="flex justify-between items-center border-b border-white/5 pb-6 md:pb-8">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-orange-600 rounded-full animate-ping" />
                <span className="text-[10px] md:text-xs font-mono text-orange-500 uppercase tracking-widest italic">Live_Sprint_Log.txt</span>
              </div>
              <div className="text-[10px] md:text-xs font-mono text-gray-600">STATUS: ON TRACK</div>
            </div>

            <div className="font-mono text-[10px] md:text-xs text-gray-500 space-y-4 h-64 md:h-112.5 overflow-hidden">
              {[
                "CLIENT_BRIEF_RECEIVED",
                "WIREFRAMES_APPROVED",
                "DB_SCHEMA_DEPLOYED",
                "AUTH_FLOW_COMPLETE",
                "PAYMENT_GATEWAY_INTEGRATED",
                "CORE_FEATURE_A_BUILT",
                "CORE_FEATURE_B_BUILT",
                "UI_POLISH_PASS",
                "DEPLOYMENT_TO_STAGING",
                "CLIENT_REVIEW_CALL",
                "MVP_LIVE_PRODUCTION"
              ].map((log, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-2 md:gap-6 border-l border-orange-600/20 pl-4 hover:bg-white/5 transition-colors"
                >
                  <span className="text-orange-600/40 hidden md:inline">[DAY_{Math.min(i + 1, 7)}]</span>
                  <span className="text-gray-400 italic break-all">{log}</span>
                  <span className="ml-auto text-green-500/40">DONE</span>
                </motion.div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 0.98, backgroundColor: "#fff", color: "#000" }}
              className="mt-auto w-full py-4 border border-white/10 font-black uppercase tracking-widest text-[10px] md:text-xs transition-all"
            >
              Start Your Sprint
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Cycle Section */}
      <section className="py-24 md:py-60 bg-white text-black relative overflow-hidden">
        <div className="max-w-450 mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-40 gap-10">
            <motion.h2
              initial={{ x: -100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 1 }}
              className="text-[14vw] font-black uppercase leading-[0.7] tracking-tighter italic"
            >
              The<br />Process
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="max-w-md text-sm md:text-xl font-bold uppercase tracking-tight text-gray-400 italic border-l-4 border-black pl-8"
            >
              We skip the bureaucracy. A simple 4-step process designed to get you to market before your competitors.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-20">
            {[
              { id: "01", title: "Discovery", desc: "1 Hour Call. We define the core features needed for launch." },
              { id: "02", title: "Build", desc: "5 Days of intense coding. You get daily updates via Loom." },
              { id: "03", title: "Launch", desc: "Day 7. We deploy to production. You are live." },
              { id: "04", title: "Iterate", desc: "We support the launch and prep for V2 based on real user data." }
            ].map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className="space-y-6 md:space-y-8 group relative"
              >
                <motion.div
                  whileHover={{ x: 20, skewX: -10 }}
                  className="text-7xl md:text-9xl font-black text-gray-100 group-hover:text-orange-600 transition-all duration-700 cursor-default select-none"
                >
                  {item.id}
                </motion.div>

                <div className="relative z-10">
                  <h4 className="text-2xl md:text-3xl font-black uppercase tracking-tighter group-hover:translate-x-2 transition-transform">
                    {item.title}
                  </h4>
                  <p className="text-gray-500 font-medium leading-relaxed uppercase text-[10px] md:text-xs tracking-widest mt-4">
                    {item.desc}
                  </p>
                </div>

                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                  className="h-2 w-full bg-black origin-left"
                />
                <div className="h-2 w-0 group-hover:w-full bg-orange-600 transition-all duration-500 absolute bottom-0 left-0" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Alliances/Testimonials Section */}
      <section className="py-24 md:py-60 px-6 border-t border-white/5 relative overflow-hidden">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 0.02 }}
          transition={{ duration: 2, ease: "circOut" }}
          className="absolute top-1/2 left-0 w-full text-[25vw] font-black -translate-y-1/2 pointer-events-none italic select-none whitespace-nowrap"
        >
          Founders Founders Founders
        </motion.div>

        <div className="max-w-7xl mx-auto text-center space-y-20 md:space-y-40 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.2 }
              }
            }}
            className="flex flex-col md:flex-row justify-between items-center gap-10 md:gap-20 opacity-40 hover:opacity-100 transition-opacity duration-700 grayscale hover:grayscale-0"
          >
            {["Y-COMBINATOR Startup", "TechStars Alumni", "IndieHacker", "SaaS Founder"].map((logo) => (
              <motion.div
                key={logo}
                variants={{
                  hidden: { y: 20, opacity: 0 },
                  show: { y: 0, opacity: 1 }
                }}
                whileHover={{ scale: 1.1, skewX: -10 }}
                className="text-xl md:text-3xl font-black uppercase italic tracking-tighter cursor-crosshair transition-all"
              >
                {logo}
              </motion.div>
            ))}
          </motion.div>

          <div className="space-y-12">
            <div className="overflow-hidden">
              <motion.blockquote
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="text-3xl md:text-8xl font-black uppercase italic tracking-tighter leading-none max-w-6xl mx-auto"
              >
                &quot;They took my napkin sketch and gave me a <span className="text-orange-600">live product</span> in 6 days. We raised our <span className="italic">Pre-Seed</span> the next month.&quot;
              </motion.blockquote>
            </div>

            <motion.div
              initial={{ opacity: 0, width: 0 }}
              whileInView={{ opacity: 1, width: "auto" }}
              transition={{ delay: 0.5, duration: 1 }}
              className="flex items-center justify-center gap-6 overflow-hidden"
            >
              <div className="h-px w-12 bg-orange-600" />
              <span className="font-mono text-orange-600 text-[10px] md:text-xs uppercase tracking-widest whitespace-nowrap">
                CEO, FinTech Startup (San Francisco)
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="h-screen flex flex-col justify-center items-center relative overflow-hidden bg-orange-600 text-black">
        <div className="absolute inset-0 opacity-10 flex flex-col gap-10 select-none py-10">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ x: i % 2 === 0 ? [-200, 0] : [0, -200] }}
              transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
              className="text-[12vw] font-black uppercase italic leading-none whitespace-nowrap"
            >
              BUILD_MVP_NOW_BUILD_MVP_NOW_BUILD_MVP_NOW
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 text-center cursor-pointer group"
        >
          <motion.span
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="text-[10px] md:text-xs font-black uppercase tracking-widest mb-8 md:mb-12 block"
          >
            Limited_Slots_Available_For_Q1
          </motion.span>

          <h2 className="text-[14vw] font-black uppercase leading-[0.7] tracking-tighter italic">
            Launch<br />
            <span className="text-transparent stroke-black transition-all duration-500 group-hover:text-black" style={{ WebkitTextStroke: "1px black" }}>Now</span>
          </h2>

          <motion.div
            whileHover={{ y: -10 }}
            className="mt-12 md:mt-20 flex justify-center items-center gap-6 md:gap-12"
          >
            <div className="w-20 h-20 md:w-32 md:h-32 bg-black rounded-full flex items-center justify-center group-hover:scale-110 group-hover:bg-zinc-900 transition-all duration-500">
              <ArrowUpRight className="text-orange-600 group-hover:rotate-45 transition-transform duration-500" size={40} />
            </div>
            <p className="text-xl md:text-4xl font-black uppercase italic underline decoration-4 md:decoration-8 underline-offset-8">Book Intro Call</p>
          </motion.div>
        </motion.div>
      </section>

      <Footer />

      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin 30s linear infinite;
        }
        ::-webkit-scrollbar {
          width: 0px;
          display: none;
        }
        body {
          -ms-overflow-style: none;
          scrollbar-width: none;
          background: #020202;
        }
        .h-panel {
          will-change: transform;
        }
      `}</style>
    </div>
  );
}