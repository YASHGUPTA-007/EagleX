"use client";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// 1. Grid Background Pattern
export const GridPattern = ({ size = 40, opacity = 0.1 }) => (
  <div className="absolute inset-0 pointer-events-none" style={{ opacity }}>
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="innerGrid" width={size} height={size} patternUnits="userSpaceOnUse">
          <path d={`M ${size} 0 L 0 0 0 ${size}`} fill="none" stroke="white" strokeWidth="0.5" />
        </pattern>
        <pattern id="mainGrid" width={size * 5} height={size * 5} patternUnits="userSpaceOnUse">
          <rect width={size * 5} height={size * 5} fill="url(#innerGrid)" />
          <path d={`M ${size * 5} 0 L 0 0 0 ${size * 5}`} fill="none" stroke="white" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#mainGrid)" />
    </svg>
  </div>
);

// 2. Text Reveal Animation Wrapper
export const RevealTitle = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return (
    <div className={cn("overflow-hidden block", className)}>
      <motion.div
        initial={{ y: "100%", rotate: 5 }}
        whileInView={{ y: 0, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
};

// 3. Magnetic Hover Link
export const MagneticLink = ({ children, href = "#" }: { children: React.ReactNode, href?: string }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const move = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current!.getBoundingClientRect();
    setPos({ x: (clientX - (left + width / 2)) * 0.4, y: (clientY - (top + height / 2)) * 0.4 });
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={move}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      className="relative text-xs font-black uppercase tracking-widest hover:text-orange-500 transition-colors py-2 px-4"
    >
      {children}
    </motion.a>
  );
};