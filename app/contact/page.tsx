"use client";

import React, { useState, useEffect } from "react";
import { 
  motion, 
  useMotionTemplate, 
  useMotionValue 
} from "framer-motion";
import { 
  ArrowUpRight, 
  Mail, 
  MapPin, 
  Twitter, 
  Github, 
  Linkedin, 
  Send, 
  CheckCircle2, 
  Terminal, 
  Globe, 
  Wifi,
  AlertCircle
} from "lucide-react";

// --- 1. UTILITIES ---

const ScrambleText = ({ text, className }: { text: string, className?: string }) => {
  const [display, setDisplay] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%&";
  
  useEffect(() => {
    let interval: NodeJS.Timeout;
    let iteration = 0;
    
    interval = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 3;
    }, 40);
    return () => clearInterval(interval);
  }, [text]);

  return <span className={className}>{display}</span>;
};

const LocalTime = () => {
  const [time, setTime] = useState("");
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString("en-US", { 
        hour12: false, 
        hour: "2-digit", 
        minute: "2-digit",
        second: "2-digit"
      }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return <span className="font-mono text-xs">{time} UTC+5.30</span>;
};

// --- 2. COMPONENTS ---

const SocialLink = ({ href, icon: Icon, label }: { href: string, icon: any, label: string }) => {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ y: -5 }}
      className="group flex flex-col items-center gap-3 p-4 border border-white/10 bg-white/5 hover:bg-white/10 hover:border-[#FF4D00]/50 transition-colors w-full"
    >
      <div className="p-3 bg-black rounded-full group-hover:text-[#FF4D00] transition-colors">
        <Icon size={20} />
      </div>
      <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400 group-hover:text-white">
        {label}
      </span>
    </motion.a>
  );
};

const InputField = ({ label, type = "text", placeholder, name, value, onChange, error }: any) => {
  return (
    <div className="group relative">
      <label className="text-[10px] font-mono text-[#FF4D00] uppercase tracking-widest mb-2 block opacity-70 group-focus-within:opacity-100 transition-opacity">
        {label}
      </label>
      <div className="relative">
        {type === "textarea" ? (
          <textarea 
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows={4}
            className={`w-full bg-black/50 border ${error ? 'border-red-500' : 'border-white/20'} text-white p-4 font-sans text-sm focus:outline-none focus:border-[#FF4D00] focus:ring-1 focus:ring-[#FF4D00] transition-all resize-none placeholder:text-white/20`}
          />
        ) : (
          <input 
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`w-full bg-black/50 border ${error ? 'border-red-500' : 'border-white/20'} text-white p-4 font-sans text-sm focus:outline-none focus:border-[#FF4D00] focus:ring-1 focus:ring-[#FF4D00] transition-all placeholder:text-white/20`}
          />
        )}
        
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-transparent group-focus-within:border-[#FF4D00] transition-all duration-300" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-transparent group-focus-within:border-[#FF4D00] transition-all duration-300" />
      </div>
      {error && (
        <p className="text-red-500 text-xs mt-1 font-mono">{error}</p>
      )}
    </div>
  );
};

// --- 3. MAIN PAGE ---

export default function ContactPage() {
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [errors, setErrors] = useState<any>({});
  const [errorMessage, setErrorMessage] = useState("");

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  const background = useMotionTemplate`radial-gradient(600px circle at ${mouseX}px ${mouseY}px, rgba(255, 77, 0, 0.05), transparent 80%)`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev: any) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: any = {};
    
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setFormStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setFormStatus("sent");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setFormStatus("error");
        setErrorMessage(data.error || "Failed to submit form");
      }
    } catch (error) {
      setFormStatus("error");
      setErrorMessage("Network error. Please try again.");
    }
  };

  const resetForm = () => {
    setFormStatus("idle");
    setErrorMessage("");
    setErrors({});
  };

  return (
    <main 
      className="min-h-screen bg-[#020202] text-white relative overflow-hidden selection:bg-[#FF4D00] selection:text-black"
      onMouseMove={handleMouseMove}
    >
      
      {/* BACKGROUND LAYERS */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <motion.div 
          className="absolute inset-0 z-10 pointer-events-none"
          style={{ background }}
        />
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay pointer-events-none" />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 pt-32 pb-20 min-h-screen flex flex-col justify-center">
        
        {/* HEADER SECTION */}
        <div className="mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="h-px w-12 bg-[#FF4D00]" />
            <span className="text-[#FF4D00] font-mono text-xs uppercase tracking-widest font-bold">
              // Initiate Uplink
            </span>
          </motion.div>
          
          <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-[0.85] text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 mb-8">
            <span className="block">Let's Build</span>
            <span className="block text-white" style={{ WebkitTextStroke: "1px rgba(255, 77, 0, 0.3)", color: "transparent" }}>
              The Future
            </span>
          </h1>
        </div>

        {/* SPLIT GRID LAYOUT */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-24">
          
          {/* LEFT COLUMN */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-12"
            >
              <p className="text-lg text-gray-400 leading-relaxed">
                Ready to deploy your next big project? Our systems are online and waiting for your command. 
                Fill out the transmission form to establish a direct link with our engineering team.
              </p>

              <div className="grid gap-8">
                <div className="group cursor-pointer">
                  <div className="flex items-center gap-3 text-[#FF4D00] mb-2">
                    <Mail size={18} />
                    <span className="font-mono text-xs uppercase tracking-widest">Direct Feed</span>
                  </div>
                  <a href="mailto:eaglexdevelopment@gmail.com" className="text-2xl md:text-3xl font-bold hover:text-[#FF4D00] transition-colors">
                    <ScrambleText text="eaglexdevelopment@gmail.com" />
                  </a>
                </div>

                <div className="group cursor-pointer">
                  <div className="flex items-center gap-3 text-[#FF4D00] mb-2">
                    <MapPin size={18} />
                    <span className="font-mono text-xs uppercase tracking-widest">Base of Operations</span>
                  </div>
                  <p className="text-xl font-bold text-white">
                    New Delhi, India
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/10">
                <SocialLink href="#" icon={Twitter} label="Twitter" />
                <SocialLink href="#" icon={Github} label="Github" />
                <SocialLink href="#" icon={Linkedin} label="LinkedIn" />
              </div>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: FORM */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-[#050505] border border-white/10 p-8 md:p-12 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-[#FF4D00]" />
              <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-[#FF4D00]" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-[#FF4D00]" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-[#FF4D00]" />

              {formStatus === "sent" ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center py-20"
                >
                  <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 size={40} className="text-green-500" />
                  </div>
                  <h3 className="text-3xl font-black uppercase mb-2">Transmission Received</h3>
                  <p className="text-gray-400 font-mono text-sm">We will re-establish contact shortly.</p>
                  <button 
                    onClick={resetForm}
                    className="mt-8 text-[#FF4D00] text-xs font-mono uppercase hover:underline"
                  >
                    Send Another Packet
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                  {formStatus === "error" && (
                    <div className="bg-red-500/10 border border-red-500 p-4 rounded flex items-center gap-3">
                      <AlertCircle size={20} className="text-red-500" />
                      <p className="text-red-500 text-sm">{errorMessage}</p>
                    </div>
                  )}

                  <div className="grid md:grid-cols-2 gap-8">
                    <InputField 
                      label="Identity (Name)" 
                      name="name" 
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      error={errors.name}
                    />
                    <InputField 
                      label="Frequency (Email)" 
                      name="email" 
                      type="email" 
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      error={errors.email}
                    />
                  </div>
                  
                  <InputField 
                    label="Sector (Subject)" 
                    name="subject" 
                    placeholder="Project Inquiry / Collaboration"
                    value={formData.subject}
                    onChange={handleChange}
                    error={errors.subject}
                  />
                  
                  <InputField 
                    label="Data Packet (Message)" 
                    name="message" 
                    type="textarea" 
                    placeholder="Tell us about your project requirements..."
                    value={formData.message}
                    onChange={handleChange}
                    error={errors.message}
                  />

                  <div className="pt-4 flex items-center justify-between">
                    <div className="hidden md:flex items-center gap-2 text-[10px] font-mono text-gray-500 uppercase">
                      <Terminal size={12} />
                      <span>End-to-End Encrypted</span>
                    </div>

                    <button 
                      type="submit"
                      disabled={formStatus === "sending"}
                      className="group relative px-8 py-4 bg-[#FF4D00] text-black font-black uppercase tracking-wider overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed w-full md:w-auto"
                    >
                      <div className="absolute inset-0 bg-white translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300 skew-x-12" />
                      <span className="relative flex items-center justify-center gap-2 group-hover:text-black transition-colors">
                        {formStatus === "sending" ? "Transmitting..." : "Send Transmission"} 
                        {formStatus !== "sending" && <Send size={16} />}
                      </span>
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>

        </div>

        {/* BOTTOM HUD */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="fixed bottom-0 left-0 w-full px-6 py-4 border-t border-white/5 bg-black/80 backdrop-blur-md flex justify-between items-center z-50 pointer-events-none"
        >
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-[10px] font-mono text-green-500">
              <Wifi size={12} className="animate-pulse" />
              <span>SYSTEM ONLINE</span>
            </div>
            <div className="hidden md:flex items-center gap-2 text-[10px] font-mono text-gray-500">
              <Globe size={12} />
              <span><LocalTime /></span>
            </div>
          </div>
          
          <div className="text-[10px] font-mono text-gray-600 uppercase">
            Botmartz © 2026
          </div>
        </motion.div>

      </div>
    </main>
  );
}