"use client";

import React from "react";
import { motion } from "framer-motion";

/**
 * GridPattern Component
 * Creates the subtle background grid overlay used in the Stack and Hero sections.
 */
export const GridPattern = ({ opacity = 0.05, size = 40 }: { opacity?: number; size?: number }) => {
  return (
    <div 
      className="absolute inset-0 pointer-events-none" 
      style={{ 
        backgroundImage: `linear-gradient(to right, rgba(255,255,255,${opacity}) 1px, transparent 1px), 
                          linear-gradient(to bottom, rgba(255,255,255,${opacity}) 1px, transparent 1px)`,
        backgroundSize: `${size}px ${size}px`
      }} 
    />
  );
};

/**
 * RevealTitle Component
 * A wrapper that uses Framer Motion to slide text up into view, 
 * used for section headers like "Section_01 // The Mission".
 */
export const RevealTitle = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className="overflow-hidden">
      <motion.div
        initial={{ y: "100%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
};