"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  Zap,
  Briefcase,
  User,
  Mail
} from "lucide-react";

// --- Configuration ---
const NAV_ITEMS = [
  { label: "Our Work", icon: Briefcase, href: "/work" },
  { label: "About", icon: User, href: "#" },
  { label: "Contact", icon: Mail, href: "#" },
];

// --- Utility Components ---

const TechLink = ({ children, href, isActive = false }: { children: React.ReactNode, href: string, isActive?: boolean }) => {
  return (
    <motion.a
      href={href}
      className="relative px-6 py-2 group overflow-hidden cursor-pointer flex items-center gap-2"
      whileHover="hover"
    >
      {/* Hover Background Sweep */}
      <motion.div
        className="absolute inset-0 bg-orange-600/10 skew-x-12 translate-x-[-150%] group-hover:translate-x-0 transition-transform duration-300"
      />

      {/* Corner Brackets */}
      <span className="absolute top-0 left-0 w-2 h-2 border-l border-t border-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <span className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Text */}
      <span className={`font-mono text-sm uppercase tracking-widest ${isActive ? "text-orange-500" : "text-gray-400 group-hover:text-white"} transition-colors relative z-10`}>
        {children}
      </span>
    </motion.a>
  );
};

// --- Mobile Menu Component ---
const MobileMenu = ({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (v: boolean) => void }) => {
  const menuVariants: Variants = {
    closed: { opacity: 0, scale: 0.95, filter: "blur(20px)", pointerEvents: "none" as const },
    open: { opacity: 1, scale: 1, filter: "blur(0px)", pointerEvents: "auto" as const }
  };

  const itemVariants: Variants = {
    closed: { x: -50, opacity: 0 },
    open: {
      x: 0,
      opacity: 1
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="closed"
          animate="open"
          exit="closed"
          variants={menuVariants}
          transition={{ duration: 0.4, ease: "circOut" }}
          className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col pt-32 px-6 overflow-hidden"
        >
          {/* Background Grid */}
          <div className="absolute inset-0 z-0 opacity-10 bg-[linear-gradient(to_right,#ea580c_1px,transparent_1px),linear-gradient(to_bottom,#ea580c_1px,transparent_1px)] bg-[length:40px_40px]" />

          {/* Menu Items */}
          <div className="z-10 flex flex-col gap-8">
            {NAV_ITEMS.map((item, i) => (
              <motion.div
                key={item.label}
                custom={i}
                variants={itemVariants}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 300, damping: 24 }}
                className="group flex items-center gap-4 cursor-pointer border-b border-white/10 pb-4"
                onClick={() => setIsOpen(false)}
              >
                <div className="w-2 h-2 bg-orange-600 rotate-45 group-hover:scale-150 transition-transform" />
                <span className="text-4xl md:text-6xl font-black uppercase text-transparent bg-clip-text bg-linear-to-r from-gray-400 to-gray-600 group-hover:from-orange-400 group-hover:to-orange-600 transition-all duration-300">
                  {item.label}
                </span>
                <span className="ml-auto text-xs font-mono text-orange-500 opacity-0 group-hover:opacity-100">
                  // LINK_ESTABLISHED
                </span>
              </motion.div>
            ))}
          </div>

          {/* Bottom HUD Data */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-auto mb-10 grid grid-cols-2 gap-4"
          >
            <div className="p-4 border border-white/10 bg-white/5 rounded-lg">
              <div className="text-[10px] text-gray-500 mb-1">SYS_STATUS</div>
              <div className="text-green-500 font-mono text-sm">OPTIMAL</div>
            </div>
            <div className="p-4 border border-white/10 bg-white/5 rounded-lg">
              <div className="text-[10px] text-gray-500 mb-1">LATENCY</div>
              <div className="text-orange-500 font-mono text-sm">12ms</div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- Main Navbar Component ---

export default function JarvisNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 pointer-events-none">

        {/* Top Decorative Line (Scanner) */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, ease: "circOut" }}
          className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-orange-600/50 to-transparent"
        />

        <div className="relative px-4 md:px-8 py-4 flex justify-between items-start">

          {/* 1. Left: Brand Logo (Updated) */}
          <div className="flex flex-col gap-2 pointer-events-auto">
            <motion.div
              whileHover={{ scale: 1.05, filter: "brightness(1.2)" }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer"
            >
              {/* Resized Logo: w-24 (mobile) / w-32 (desktop) */}
              <img 
                src="/Eaglex2.png" 
                alt="Eagle X Logo" 
                className="w-20 md:w-24 h-auto object-contain"
              />
            </motion.div>
          </div>

          {/* 2. Center: Desktop Navigation (Glass Panel) */}
          <div className="hidden lg:flex items-center pointer-events-auto">
            <div className="bg-black/40 backdrop-blur-xl border border-white/10 px-8 py-3 rounded-none clip-path-polygon flex gap-8 shadow-[0_0_20px_-10px_rgba(234,88,12,0.5)]"
              style={{ clipPath: "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)" }}>
              {NAV_ITEMS.map((item) => (
                <TechLink key={item.label} href={item.href}>
                  {item.label}
                </TechLink>
              ))}
            </div>
          </div>

          {/* 3. Right: Action & Mobile Toggle */}
          <div className="flex items-start gap-4 pointer-events-auto">

            {/* "Initialize" Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:flex relative group px-6 py-3 bg-orange-600 overflow-hidden items-center gap-2"
              style={{ clipPath: "polygon(0 0, 100% 0, 100% 70%, 90% 100%, 0 100%)" }}
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <Zap size={16} className="text-black fill-black" />
              <span className="font-bold text-xs uppercase tracking-widest text-black">
                Deploy Unit
              </span>
            </motion.button>

            {/* Mobile Menu Toggle (Mechanical Switch Look) */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative z-50 w-12 h-12 bg-black border border-white/10 flex items-center justify-center hover:border-orange-500/50 transition-colors"
            >
              <div className="relative w-6 h-6 flex flex-col justify-between items-end overflow-hidden">
                <motion.span
                  animate={isOpen ? { rotate: 45, y: 11 } : { rotate: 0, y: 0 }}
                  className="w-full h-0.5 bg-white origin-center"
                />
                <motion.span
                  animate={isOpen ? { opacity: 0, x: 20 } : { opacity: 1, x: 0 }}
                  className="w-2/3 h-0.5 bg-orange-500"
                />
                <motion.span
                  animate={isOpen ? { rotate: -45, y: -11, width: "100%" } : { rotate: 0, y: 0, width: "50%" }}
                  className="h-0.5 bg-white origin-center"
                />
              </div>
            </button>
          </div>
        </div>

        {/* Decorative corner pieces for HUD feel */}
        <div className="fixed top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-orange-600/20 pointer-events-none hidden md:block" />
        <div className="fixed top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-orange-600/20 pointer-events-none hidden md:block" />

      </nav>

      {/* Mobile Menu Overlay */}
      <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}