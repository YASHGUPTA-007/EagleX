// components/EagleCursor.tsx
'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function EagleCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Use gsap.quickTo for high performance updates
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.1, ease: "power3" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.1, ease: "power3" });

    // Initial position off-screen
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });

    const updatePosition = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      // Ensure cursor is visible when moving
      if (cursor.style.opacity === '0') {
         gsap.to(cursor, { opacity: 1, duration: 0.2 });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(cursor, { opacity: 0, duration: 0.2 });
    };
    
    const handleMouseEnter = () => {
      gsap.to(cursor, { opacity: 1, duration: 0.2 });
    };

    window.addEventListener('mousemove', updatePosition);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-50 hidden lg:block opacity-0"
    >
      <img src="/eaglecursor.png" alt="" width={100} height={100} />
    </div>
  );
}