"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
    const [cursorText, setCursorText] = useState("");
    const [isHovering, setIsHovering] = useState(false);

    // Smooth spring animation for cursor position
    const cursorX = useSpring(0, { damping: 25, stiffness: 400 });
    const cursorY = useSpring(0, { damping: 25, stiffness: 400 });

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseEnter = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            
            // Ensure target has closest method
            if (!target.closest) return;

            // Check if hovering over project card
            if (target.closest(".project-card")) {
                setIsHovering(true);
                setCursorText("VIEW PROJECT");
                return;
            }

            // Check if hovering over clickable elements
            if (target.closest("a, button")) {
                setIsHovering(true);
                setCursorText("");
            }
        };

        const handleMouseLeave = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            
            // Ensure target has closest method
            if (!target.closest) return;
            
            if (target.closest(".project-card, a, button")) {
                setIsHovering(false);
                setCursorText("");
            }
        };

        window.addEventListener("mousemove", moveCursor);
        document.addEventListener("mouseenter", handleMouseEnter, true);
        document.addEventListener("mouseleave", handleMouseLeave, true);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            document.removeEventListener("mouseenter", handleMouseEnter, true);
            document.removeEventListener("mouseleave", handleMouseLeave, true);
        };
    }, [cursorX, cursorY]);

    return (
        <>
            {/* Hide default cursor */}
            <style jsx global>{`
        * {
          cursor: none !important;
        }
      `}</style>

            {/* Custom Cursor */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-99 mix-blend-difference"
                style={{
                    x: cursorX,
                    y: cursorY,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
            >
                <motion.div
                    animate={{
                        width: isHovering ? 120 : 20,
                        height: isHovering ? 120 : 20,
                    }}
                    transition={{ type: "spring", damping: 20, stiffness: 300 }}
                    className="bg-white rounded-full flex items-center justify-center"
                >
                    {cursorText && (
                        <motion.span
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            className="text-black text-xs font-black uppercase tracking-wider"
                        >
                            {cursorText}
                        </motion.span>
                    )}
                </motion.div>
            </motion.div>
        </>
    );
}