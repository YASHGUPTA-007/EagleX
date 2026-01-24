'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function PageLoader() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'locked' | 'unlocking' | 'open'>('locked');
  const [logs, setLogs] = useState<string[]>([]);
  const [hasShownLoader, setHasShownLoader] = useState(false);

  // Check if we're on the landing page and haven't shown the loader yet
  const isLandingPage = pathname === '/';
  const shouldShowLoader = isLandingPage && !hasShownLoader;

  // --- LOG GENERATOR ---
  useEffect(() => {
    if (!shouldShowLoader) return;

    const systemChecks = [
      "INITIALIZING CORE...", "LOADING ASSETS [TEXTURES]", "CONNECTING TO NEURAL NET...",
      "OPTIMIZING VIRTUAL DOM...", "HYDRATING COMPONENT TREE...", "CHECKING SECURITY PROTOCOLS...",
      "ESTABLISHING SECURE HANDSHAKE...", "RENDERING VIEWPORT...", "SYSTEM GREEN."
    ];
    let i = 0;
    const interval = setInterval(() => {
      if (i < systemChecks.length) {
        setLogs(prev => [...prev.slice(-4), systemChecks[i]]);
        i++;
      }
    }, 200); 
    return () => clearInterval(interval);
  }, [shouldShowLoader]);

  // --- FASTER LOADING LOGIC ---
  useEffect(() => {
    if (!shouldShowLoader) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 99) {
          clearInterval(interval);
          return 100;
        }
        const remaining = 100 - prev;
        const increment = Math.max(1.5, remaining * 0.2); 
        return prev + increment;
      });
    }, 30); 
    return () => clearInterval(interval);
  }, [shouldShowLoader]);

  // --- SLOWER TRANSITION SEQUENCE ---
  useEffect(() => {
    if (!shouldShowLoader) return;

    if (progress === 100) {
      setTimeout(() => {
        setPhase('unlocking'); 
        
        setTimeout(() => {
          setPhase('open'); 
          
          setTimeout(() => {
            setMounted(false);
            setHasShownLoader(true);
            // Store in sessionStorage so it persists during the session
            sessionStorage.setItem('loaderShown', 'true');
          }, 3200); 
        }, 2000);
      }, 200);
    }
  }, [progress, shouldShowLoader]);

  // Check sessionStorage on mount
  useEffect(() => {
    const loaderShown = sessionStorage.getItem('loaderShown');
    if (loaderShown === 'true') {
      setHasShownLoader(true);
      setMounted(false);
    }
  }, []);

  // Don't render if not on landing page or already shown
  if (!shouldShowLoader || !mounted) return null;

  return (
    <div className={`fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-black transition-all duration-500 ${phase === 'open' ? 'pointer-events-none bg-transparent' : 'pointer-events-auto'}`}>
      
      {/* LAYER 1: BACKGROUND */}
      <div className={`absolute inset-0 bg-[#050505] transition-opacity duration-500 ${phase === 'open' ? 'opacity-0' : 'opacity-100'}`}>
         <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_2px,3px_100%]" />
      </div>

      {/* LAYER 2: THE TITAN GATES */}
      <div className={`absolute inset-0 z-30 flex items-center justify-center transition-transform duration-100 ${phase === 'open' ? 'animate-shake' : ''}`}>
        {[0, 60, 120, 180, 240, 300].map((deg, i) => (
          <div
            key={i}
            className="absolute w-[200vw] h-[60vh] md:w-[100vw] md:h-[50vh] bg-[#0a0a0a] border-b-2 border-zinc-800 origin-bottom shadow-2xl"
            style={{
              rotate: `${deg}deg`,
              bottom: '50%',
              transform: phase === 'open' ? `translateY(120vh)` : `translateY(0)`,
              transition: `transform 3s cubic-bezier(0.6, -0.28, 0.735, 0.045) ${i * 0.05}s`,
            }}
          >
            <div className="absolute bottom-0 w-full h-20 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,107,53,0.05)_10px,rgba(255,107,53,0.05)_20px)] border-t border-zinc-800" />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] font-mono text-zinc-600 -rotate-90 opacity-50">LOCK_0{i+1}</div>
          </div>
        ))}
      </div>

      {/* LAYER 3: CENTER LOCK */}
      <div className="relative z-40">
        
        <div className={`w-48 h-48 md:w-54 md:h-54 bg-[#111] border border-zinc-700 flex items-center justify-center relative shadow-[0_0_50px_rgba(0,0,0,0.8)] transition-opacity duration-500 ${phase === 'open' ? 'opacity-0' : 'opacity-100'}`}
          style={{ 
            overflow: 'visible',
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
          }}
        >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent h-[20%] w-full animate-scan pointer-events-none" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }} />
        </div>
        
        {/* Eagle on top, outside hexagon clipping */}
        <img 
          src="/Eaglex4.png" 
          alt="EagleX Logo" 
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-48 md:h-48 object-contain transition-all ${phase === 'open' ? 'scale-[10] opacity-0 duration-1000' : 'scale-100 opacity-100 duration-300'} ${phase === 'unlocking' ? 'brightness-200 drop-shadow-[0_0_15px_rgba(255,255,255,1)]' : 'brightness-100'}`}
        />
        
        {/* --- FIXED SECTION START --- */}
        {/* Added dynamic class to fade out opacity when phase is 'open' */}
        <div className={`absolute -bottom-16 left-1/2 -translate-x-1/2 text-center w-full transition-opacity duration-500 ${phase === 'open' ? 'opacity-0' : 'opacity-100'}`}>
            <div className="text-3xl font-black text-white tracking-tighter">
                {Math.floor(progress)}<span className="text-orange-500 text-sm align-top">%</span>
            </div>
        </div>
        {/* --- FIXED SECTION END --- */}

      </div>

      {/* LAYER 4: LOGS */}
      <div className={`absolute bottom-8 left-4 md:bottom-10 md:left-10 z-50 font-mono text-[10px] md:text-xs text-orange-500/80 transition-opacity duration-300 ${phase === 'open' ? 'opacity-0' : 'opacity-100'}`}>
         {logs.map((log, i) => (
             <div key={i} className="animate-fade-in-up">&gt; {log}</div>
         ))}
      </div>

      <style jsx>{`
        .clip-path-hexagon { clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%); }
        .animate-spin-slow { animation: spin 10s linear infinite; }
        .animate-spin-fast { animation: spin 0.5s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes scan { 0% { top: -20%; } 100% { top: 120%; } }
        .animate-scan { animation: scan 1.5s linear infinite; }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-up { animation: fadeInUp 0.2s ease-out forwards; }
        @keyframes shake {
            0%, 100% { transform: translate(0, 0); }
            10%, 30%, 50%, 70%, 90% { transform: translate(-2px, -2px); }
            20%, 40%, 60%, 80% { transform: translate(2px, 2px); }
        }
        .animate-shake { animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both; }
      `}</style>
    </div>
  );
}