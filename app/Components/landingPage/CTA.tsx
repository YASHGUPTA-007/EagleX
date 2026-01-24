"use client";

import React, { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

export default function CTACompact() {
  const [time, setTime] = useState(0);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setTime(prev => prev + 1), 40);
    return () => clearInterval(interval);
  }, []);

  // Scrolling rows
  const rows = [...Array(6)].map((_, i) => ({
    text: "LAUNCH_MVP_NOW_",
    speed: i % 2 === 0 ? 1.2 : -1.2,
    offset: i * 50
  }));

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-br from-orange-600 via-orange-500 to-orange-600 py-20 px-6">
      
      {/* Scrolling Background Text */}
      <div className="absolute inset-0 flex flex-col justify-center gap-4 select-none pointer-events-none overflow-hidden opacity-[0.15]">
        {rows.map((row, i) => (
          <div
            key={i}
            className="text-[16vw] font-black uppercase italic leading-none whitespace-nowrap text-black"
            style={{
              transform: `translateX(${((time * row.speed + row.offset) % 200) - 100}%)`,
              willChange: "transform"
            }}
          >
            {row.text.repeat(10)}
          </div>
        ))}
      </div>

      {/* Radial Glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-250 h-250 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0,0,0,0.12) 0%, transparent 65%)",
          transform: `translate(-50%, -50%) scale(${1 + Math.sin(time / 30) * 0.15})`
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-6xl w-full">
        
        {/* Headline */}
        <div className="mb-6 md:mb-10">
          <h1 className="text-[clamp(3.5rem,18vw,20rem)] font-black uppercase leading-[0.7] tracking-tighter">
            <span 
              className="block text-black"
              style={{
                textShadow: hovered ? '5px 5px 0 rgba(0,0,0,0.25)' : '3px 3px 0 rgba(0,0,0,0.15)',
                transition: 'text-shadow 0.3s'
              }}
            >
              LAUNCH
            </span>
            <span 
              className="block"
              style={{
                WebkitTextStroke: '3px black',
                color: 'transparent',
                transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'black';
                e.currentTarget.style.webkitTextStroke = '0px black';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'transparent';
                e.currentTarget.style.webkitTextStroke = '3px black';
              }}
            >
              NOW
            </span>
          </h1>
        </div>

        {/* Subheadline */}
        <p className="text-lg md:text-2xl lg:text-3xl font-bold text-black/85 mb-10 md:mb-16 max-w-4xl mx-auto leading-tight px-4">
          Your idea deserves to exist.<br />
          <span className="text-black">We make it real in 7 days.</span>
        </p>

        {/* CTA Button */}
        <div className="relative inline-block mb-12 md:mb-20">
          
          {/* Rotating Ring */}
          <div className="absolute -inset-12 md:-inset-16 pointer-events-none opacity-30">
            <div
              className="absolute inset-0 rounded-full border-2 md:border-3 border-dashed border-black/40"
              style={{ transform: `rotate(${time * 2}deg)` }}
            />
          </div>

          {/* Orbiting Dots */}
          {hovered && [...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none hidden md:block"
              style={{
                transform: `translate(-50%, -50%) rotate(${i * 45 + time * 4}deg) translateY(-110px)`
              }}
            >
              <div 
                className="w-3 h-3 bg-black/60 rounded-full"
                style={{
                  transform: `rotate(-${i * 45 + time * 4}deg)`
                }}
              />
            </div>
          ))}

          {/* Button */}
          <a
            href="/contact"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="group relative inline-flex items-center gap-4 md:gap-6 px-6 md:px-10 py-4 md:py-6 bg-black rounded-full overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
          >
            {/* White Fill Animation */}
            <div 
              className="absolute inset-0 bg-white rounded-full transition-all duration-700"
              style={{
                clipPath: hovered ? 'circle(150% at 50% 50%)' : 'circle(0% at 50% 50%)'
              }}
            />

            {/* Icon */}
            <div className="relative z-10">
              <div 
                className="w-14 h-14 md:w-20 md:h-20 rounded-full flex items-center justify-center transition-all duration-500 bg-orange-600 group-hover:bg-black group-hover:rotate-45"
              >
                <ArrowUpRight 
                  size={typeof window !== 'undefined' && window.innerWidth < 768 ? 28 : 36}
                  className="transition-all duration-500 text-black group-hover:text-orange-600"
                  style={{
                    transform: hovered ? 'rotate(-45deg) scale(1.1)' : 'rotate(0deg)'
                  }}
                />
              </div>
            </div>

            {/* Text */}
            <div className="relative z-10 text-left">
              <p className="text-2xl md:text-4xl lg:text-5xl font-black uppercase italic text-orange-600 group-hover:text-black transition-colors duration-500">
                Book Call Now
              </p>
              <p className="text-xs md:text-sm font-mono uppercase tracking-wider md:tracking-widest mt-1 text-orange-600/70 group-hover:text-black/70 transition-colors duration-500">
                Free • 30 Min • This Week
              </p>
            </div>

            {/* Rotating Border */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none hidden md:block">
              <rect
                x="2" y="2"
                width="calc(100% - 4px)"
                height="calc(100% - 4px)"
                rx="9999"
                fill="none"
                stroke="white"
                strokeWidth="3"
                strokeDasharray="10 10"
                strokeDashoffset={hovered ? -time * 2 : 0}
                className="opacity-0 group-hover:opacity-30 transition-opacity duration-500"
              />
            </svg>
          </a>
        </div>

        {/* Trust Metrics */}
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 lg:gap-12 mb-8 md:mb-12">
          {[
            { num: "7", label: "Days", sub: "To Launch" },
            { num: "$0", label: "Risk", sub: "Free Call" },
            { num: "∞", label: "Value", sub: "Production" }
          ].map((item, i) => (
            <div key={i} className="group cursor-default">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/15 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                  <span className="text-xl md:text-2xl font-black text-black">{item.num}</span>
                </div>
                <div className="text-left">
                  <div className="text-xs md:text-sm font-bold text-black uppercase">{item.label}</div>
                  <div className="text-[10px] md:text-xs text-black/60 font-mono">{item.sub}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Signals */}
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 text-[10px] md:text-xs font-mono text-black/50 uppercase tracking-wider px-4">
          {["No Contracts", "Fixed Price", "Start Monday"].map((text, i) => (
            <span key={i} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-black rounded-full animate-pulse" style={{ animationDelay: `${i * 0.3}s` }} />
              {text}
            </span>
          ))}
        </div>
      </div>

      {/* Corner Brackets */}
      <div className="absolute top-0 left-0 w-16 h-16 md:w-20 md:h-20 border-t-3 border-l-3 md:border-t-4 md:border-l-4 border-black/20" />
      <div className="absolute top-0 right-0 w-16 h-16 md:w-20 md:h-20 border-t-3 border-r-3 md:border-t-4 md:border-r-4 border-black/20" />
      <div className="absolute bottom-0 left-0 w-16 h-16 md:w-20 md:h-20 border-b-3 border-l-3 md:border-b-4 md:border-l-4 border-black/20" />
      <div className="absolute bottom-0 right-0 w-16 h-16 md:w-20 md:h-20 border-b-3 border-r-3 md:border-b-4 md:border-r-4 border-black/20" />
    </section>
  );
}