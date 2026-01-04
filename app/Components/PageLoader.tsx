'use client';

import { useEffect, useState, useRef } from 'react';

export default function PageLoader() {
  const [startExit, setStartExit] = useState(false);
  const [removeComponent, setRemoveComponent] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const playVideo = async () => {
      if (videoRef.current) {
        try {
          // 1. Reset volume and unmute
          videoRef.current.volume = 1.0;
          videoRef.current.muted = false;
          
          // 2. Attempt to play with sound
          await videoRef.current.play();
        } catch (err) {
          console.warn("Browser blocked sound. Falling back to muted autoplay.", err);
          // 3. Fallback: Play muted if browser blocks audio
          if (videoRef.current) {
            videoRef.current.muted = true;
            try {
              await videoRef.current.play();
            } catch (mutedErr) {
              console.error("Video failed to play entirely:", mutedErr);
              setStartExit(true); // Emergency exit
            }
          }
        }
      }
    };

    playVideo();

    // Safety Timeout: Force exit if video hangs (6 seconds)
    const safetyTimer = setTimeout(() => {
        if (!startExit) handleVideoEnd();
    }, 6000);

    return () => clearTimeout(safetyTimer);
  }, []);

  const handleVideoEnd = () => {
    setStartExit(true);
    setTimeout(() => {
        setRemoveComponent(true);
    }, 1200); 
  };

  if (removeComponent) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-auto">
      
      {/* --- LAYER 1: FLASH (Topmost z-50) --- */}
       <div 
        className={`absolute inset-0 bg-white z-50 pointer-events-none transition-opacity duration-700 ease-out ${
          startExit ? 'opacity-0 animate-flash-long' : 'opacity-0'
        }`} 
      />

      {/* --- LAYER 2: VIDEO (z-40) --- */}
      {/* Removed 'muted' prop to allow sound */}
      <div className={`absolute inset-0 z-40 flex items-center justify-center bg-black transition-opacity duration-500 ${startExit ? 'opacity-0' : 'opacity-100'}`}>
        <video
          ref={videoRef}
          playsInline
          // Removed 'muted' attribute here
          onEnded={handleVideoEnd} 
          className="w-full h-full object-cover" 
          src="/transition.mp4" 
        />
      </div>

      {/* --- LAYER 3: SPLIT SHUTTERS (z-30) --- */}
      <div 
        className={`absolute top-0 left-0 w-full h-[50%] bg-black z-30 transition-transform duration-1000 ease-[cubic-bezier(0.87,0,0.13,1)] ${
          startExit ? '-translate-y-full' : 'translate-y-0'
        }`} 
      />
      
       <div 
        className={`absolute bottom-0 left-0 w-full h-[50%] bg-black z-30 transition-transform duration-1000 ease-[cubic-bezier(0.87,0,0.13,1)] ${
          startExit ? 'translate-y-full' : 'translate-y-0'
        }`} 
      >
        <div className={`absolute top-0 left-0 w-full h-[2px] bg-orange-500 shadow-[0_0_30px_rgba(255,107,53,1)] transition-opacity duration-300 ${startExit ? 'opacity-100' : 'opacity-0'}`} />
      </div>

      <style jsx>{`
        @keyframes flash-long {
            0% { opacity: 0; }
            10% { opacity: 1; }
            100% { opacity: 0; }
        }
        .animate-flash-long {
            animation: flash-long 1.0s ease-out forwards;
        }
      `}</style>
    </div>
  );
}