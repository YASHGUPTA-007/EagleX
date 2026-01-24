"use client";

import React, { useState } from "react";
import { ArrowUpRight, Sparkles, Code2, Zap } from "lucide-react";
import { motion } from "framer-motion";

const featuredProjects = [
  {
    id: 1,
    title: "Skyline Chili",
    category: "Restaurant",
    image: "/projects/SkylineChill.png",
    tags: ["React", "CMS", "E-commerce"]
  },
  {
    id: 2,
    title: "CyreneAI",
    category: "AI Platform",
    image: "/projects/CyreneAI.png",
    tags: ["AI", "Blockchain", "Web3"]
  },
  {
    id: 3,
    title: "HROne Cloud",
    category: "HR Tech",
    image: "/projects/HROne%20Cloud.png",
    tags: ["AI/ML", "Enterprise", "SaaS"]
  }
];

export default function ProjectsPreview() {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  return (
    <section className="relative py-24 md:py-32 bg-[#020202] text-white overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:60px_60px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_-100px,#FF4D0015,transparent)]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-6"
          >
            <Sparkles className="text-[#FF4D00]" size={20} />
            <span className="text-[#FF4D00] font-mono text-xs uppercase tracking-widest font-bold">
              Featured Work
            </span>
          </motion.div>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.85]"
            >
              Projects That <br />
              <span className="text-[#FF4D00]">Deliver</span>
            </motion.h2>

            <motion.a
              href="/work"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group self-start lg:self-end px-8 py-4 bg-[#FF4D00] text-black font-black uppercase text-sm tracking-wider hover:bg-white transition-colors duration-300 flex items-center gap-3"
            >
              View All Work
              <ArrowUpRight className="group-hover:rotate-45 transition-transform duration-300" size={20} />
            </motion.a>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, index) => (
            <motion.a
              key={project.id}
              href="/work"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              className="group relative bg-[#0A0A0A] border border-white/10 overflow-hidden hover:border-[#FF4D00] transition-all duration-500"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-black">
                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-top"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4 px-3 py-1 bg-black/80 backdrop-blur-sm border border-white/20">
                  <span className="text-[#FF4D00] font-mono text-[10px] uppercase tracking-widest">
                    {project.category}
                  </span>
                </div>

                {/* Number */}
                <div className="absolute bottom-4 right-4 text-6xl font-black text-white/10 font-mono leading-none">
                  0{project.id}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white group-hover:text-[#FF4D00] transition-colors duration-300 mb-4">
                  {project.title}
                </h3>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-white/5 border border-white/10 text-[10px] font-mono text-gray-400 group-hover:border-[#FF4D00]/30 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Corner Accents */}
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white/20 group-hover:border-[#FF4D00] transition-colors" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white/20 group-hover:border-[#FF4D00] transition-colors" />
            </motion.a>
          ))}
        </div>

        {/* CTA Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-20 p-10 bg-[#FF4D00] text-black flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div>
            <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-2">
              20+ Live Projects
            </h3>
            <p className="text-black/70 font-medium">
              From startups to enterprises, we build digital experiences that perform.
            </p>
          </div>
          <a
            href="/work"
            className="group px-8 py-4 bg-black text-white font-black uppercase text-sm tracking-wider hover:bg-white hover:text-black transition-colors duration-300 flex items-center gap-3 whitespace-nowrap"
          >
            Explore More
            <ArrowUpRight className="group-hover:rotate-45 transition-transform duration-300" size={20} />
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-8 grid grid-cols-3 gap-px bg-white/10"
        >
          <div className="bg-[#0A0A0A] p-8 text-center border border-white/5">
            <Code2 className="w-10 h-10 text-[#FF4D00] mx-auto mb-3" />
            <div className="text-4xl font-black text-white mb-1">99%</div>
            <p className="text-gray-400 text-xs uppercase tracking-wider">Satisfaction</p>
          </div>
          
          <div className="bg-[#0A0A0A] p-8 text-center border border-white/5">
            <Zap className="w-10 h-10 text-[#FF4D00] mx-auto mb-3" />
            <div className="text-4xl font-black text-white mb-1">8+</div>
            <p className="text-gray-400 text-xs uppercase tracking-wider">Industries</p>
          </div>
          
          <div className="bg-[#0A0A0A] p-8 text-center border border-white/5">
            <Sparkles className="w-10 h-10 text-[#FF4D00] mx-auto mb-3" />
            <div className="text-4xl font-black text-white mb-1">20+</div>
            <p className="text-gray-400 text-xs uppercase tracking-wider">Live Projects</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}