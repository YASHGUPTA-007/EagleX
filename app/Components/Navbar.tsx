"use client";

import React, { useState, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Zap,
  Gift,
  ArrowDown,
  Trophy,
  Timer,
  Users
} from "lucide-react";

// --- Mobile Menu Component ---
const MobileMenu = memo(({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (v: boolean) => void }) => {
  const handleScrollToForm = useCallback(() => {
    setIsOpen(false);
    setTimeout(() => {
      const formElement = document.getElementById('enter-draw');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  }, [setIsOpen]);

  const handleScrollToSpecs = useCallback(() => {
    setIsOpen(false);
    setTimeout(() => {
      window.scrollTo({ top: window.innerHeight * 0.8, behavior: 'smooth' });
    }, 100);
  }, [setIsOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, filter: "blur(20px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 0.95, filter: "blur(20px)" }}
          transition={{ duration: 0.3, ease: "circOut" }}
          className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col pt-24 px-6 overflow-hidden"
        >
          {/* Background Grid - Simplified */}
          <div className="absolute inset-0 z-0 opacity-5 bg-[linear-gradient(to_right,#ea580c_1px,transparent_1px),linear-gradient(to_bottom,#ea580c_1px,transparent_1px)] bg-[length:40px_40px]" />

          {/* Menu Items */}
          <div className="z-10 flex flex-col gap-6">
            <motion.button
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0, type: "spring", stiffness: 300, damping: 24 }}
              onClick={handleScrollToForm}
              className="group flex items-center gap-4 cursor-pointer border-b border-white/10 pb-4 text-left"
            >
              <div className="w-2 h-2 bg-orange-600 rotate-45 group-hover:scale-150 transition-transform" />
              <span className="text-3xl md:text-5xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600 group-hover:from-orange-400 group-hover:to-orange-600 transition-all duration-300">
                Enter Draw
              </span>
              <ArrowDown className="ml-auto text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" size={24} />
            </motion.button>

            <motion.button
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.08, type: "spring", stiffness: 300, damping: 24 }}
              onClick={handleScrollToSpecs}
              className="group flex items-center gap-4 cursor-pointer border-b border-white/10 pb-4 text-left"
            >
              <div className="w-2 h-2 bg-orange-600 rotate-45 group-hover:scale-150 transition-transform" />
              <span className="text-3xl md:text-5xl font-black uppercase text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600 group-hover:from-orange-400 group-hover:to-orange-600 transition-all duration-300">
                Learn More
              </span>
              <ArrowDown className="ml-auto text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" size={24} />
            </motion.button>

            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.16, type: "spring", stiffness: 300, damping: 24 }}
              className="mt-8 p-6 border-2 border-orange-600/30 bg-orange-600/10 rounded-lg"
            >
              <div className="flex items-center gap-3 mb-4">
                <Gift size={32} className="text-orange-500" />
                <div>
                  <h3 className="text-xl font-black uppercase text-white">Lucky Draw Active</h3>
                  <p className="text-sm text-gray-400 font-mono">Limited Time Offer</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-black/40 p-3 rounded">
                  <div className="text-xs text-gray-500 mb-1">Winners</div>
                  <div className="text-orange-500 font-black text-lg">7 SLOTS</div>
                </div>
                <div className="bg-black/40 p-3 rounded">
                  <div className="text-xs text-gray-500 mb-1">Value</div>
                  <div className="text-green-500 font-black text-lg">$5000</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Bottom HUD Data */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-auto mb-10 grid grid-cols-3 gap-3"
          >
            <div className="p-3 border border-white/10 bg-white/5 rounded-lg">
              <Trophy size={16} className="text-orange-500 mb-2" />
              <div className="text-[10px] text-gray-500 mb-1">STATUS</div>
              <div className="text-green-500 font-mono text-xs">LIVE</div>
            </div>
            <div className="p-3 border border-white/10 bg-white/5 rounded-lg">
              <Timer size={16} className="text-orange-500 mb-2" />
              <div className="text-[10px] text-gray-500 mb-1">DELIVERY</div>
              <div className="text-orange-500 font-mono text-xs">7 DAYS</div>
            </div>
            <div className="p-3 border border-white/10 bg-white/5 rounded-lg">
              <Users size={16} className="text-orange-500 mb-2" />
              <div className="text-[10px] text-gray-500 mb-1">ENTRIES</div>
              <div className="text-white font-mono text-xs">OPEN</div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});
MobileMenu.displayName = "MobileMenu";

// --- Main Navbar Component ---

export default function JarvisNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const handleScrollToForm = useCallback(() => {
    const formElement = document.getElementById('enter-draw');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 pointer-events-none">

        {/* Top Decorative Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, ease: "circOut" }}
          className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-600/50 to-transparent"
        />

        <div className="relative px-4 md:px-8 py-3 md:py-4 flex justify-between items-center">

          {/* Left: Brand Logo */}
          <div className="flex justify-start pointer-events-auto">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer"
            >
              <img 
                src="/Eaglex2.png" 
                alt="Eagle X Logo" 
                className="w-20 md:w-24 lg:w-32 h-auto object-contain"
              />
            </motion.div>
          </div>

          {/* Center: Lucky Draw Badge (Desktop Only) */}
          <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 pointer-events-auto">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-r from-orange-600 to-red-600 px-6 py-2 border-2 border-yellow-400 flex items-center gap-3 shadow-[0_0_30px_rgba(234,88,12,0.5)]"
              style={{ clipPath: "polygon(0 0, 100% 0, 95% 100%, 0 100%)" }}
            >
              <Gift size={20} className="text-white" strokeWidth={2.5} />
              <div className="border-l-2 border-white/30 pl-3">
                <div className="text-white font-black text-xs uppercase tracking-wider">
                  Lucky Draw Active
                </div>
                <div className="text-yellow-300 font-mono text-[10px]">
                  7 Winners • $5000 Value
                </div>
              </div>
              <Zap size={16} className="text-yellow-300 animate-pulse" fill="currentColor" />
            </motion.div>
          </div>

          {/* Right: Action Buttons */}
          <div className="flex justify-end items-center gap-3 pointer-events-auto">

            {/* Enter Draw Button (Desktop) */}
            <motion.button
              onClick={handleScrollToForm}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:flex relative group px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 overflow-hidden items-center gap-2 border-2 border-yellow-400 shadow-[0_0_20px_rgba(234,88,12,0.4)]"
              style={{ clipPath: "polygon(0 0, 100% 0, 100% 70%, 90% 100%, 0 100%)" }}
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <ArrowDown size={16} className="text-black group-hover:animate-bounce" strokeWidth={3} />
              <span className="font-black text-sm uppercase tracking-wider text-black drop-shadow-sm relative z-10">
                Enter Draw
              </span>
            </motion.button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={handleToggle}
              className="relative z-50 w-10 h-10 md:w-12 md:h-12 bg-black border border-white/10 flex items-center justify-center hover:border-orange-500/50 transition-colors"
              aria-label="Toggle menu"
            >
              <div className="relative w-5 h-5 md:w-6 md:h-6 flex flex-col justify-between items-end overflow-hidden">
                <motion.span
                  animate={isOpen ? { rotate: 45, y: 10 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-full h-0.5 bg-white origin-center"
                />
                <motion.span
                  animate={isOpen ? { opacity: 0, x: 20 } : { opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-2/3 h-0.5 bg-orange-500"
                />
                <motion.span
                  animate={isOpen ? { rotate: -45, y: -10, width: "100%" } : { rotate: 0, y: 0, width: "50%" }}
                  transition={{ duration: 0.2 }}
                  className="h-0.5 bg-white origin-center"
                />
              </div>
            </button>
          </div>
        </div>

        {/* Decorative corner pieces */}
        <div className="fixed top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-orange-600/20 pointer-events-none hidden lg:block" />
        <div className="fixed top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-orange-600/20 pointer-events-none hidden lg:block" />

      </nav>

      {/* Mobile Menu Overlay */}
      <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}