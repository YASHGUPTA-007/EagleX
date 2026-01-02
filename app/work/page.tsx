"use client"

import { ArrowUpRight } from "lucide-react"
import CustomCursor from "../Components/CustomCursor"
import ProjectsShowcase from "../Components/ProjectShowcase"
import { motion } from "framer-motion";

function WorkPage() {
    return (
        <div className="bg-[#050505] text-[#F5F5F5] selection:bg-orange-600 selection:text-black overflow-x-hidden w-full">
            <CustomCursor />
            <section className="h-screen flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#222_1px,transparent_1px),linear-gradient(to_bottom,#222_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10" />
                <div className="text-center z-10">
                    <h1 className="text-[20vw] font-black uppercase italic leading-none text-white/5 mb-4">BUILD</h1>
                    <h2 className="text-6xl md:text-9xl font-black uppercase tracking-tighter text-white">Our <span className="text-orange-600">Work</span></h2>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-6">
                <ProjectsShowcase />
            </div>

            {/* CTA Section */}
            <section className="min-h-screen flex items-center justify-center bg-orange-600 text-black py-20 relative z-10">
                <div className="text-center max-w-4xl px-6">
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-xs font-mono uppercase tracking-widest mb-8"
                    >
                        Ready to build something amazing?
                    </motion.p>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-7xl md:text-9xl font-black uppercase italic mb-12"
                    >
                        Start Your<br />Project Now
                    </motion.h2>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-12 py-6 bg-black text-white font-black uppercase text-lg hover:bg-zinc-900 transition-colors flex items-center gap-3 mx-auto"
                    >
                        Get Started
                        <ArrowUpRight size={24} />
                    </motion.button>
                </div>
            </section>
        </div>
    )
}
export default WorkPage