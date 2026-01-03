"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Code2, Layers } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  liveLink: string;
  image: string;
  category: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "[INSERT PROJECT NAME 1]",
    description: "[INSERT PROJECT DESCRIPTION HERE - Brief overview of what this project does and its key features]",
    techStack: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    liveLink: "https://example.com/project1",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
    category: "Web Application"
  },
  {
    id: 2,
    title: "[INSERT PROJECT NAME 2]",
    description: "[INSERT PROJECT DESCRIPTION HERE - Brief overview of what this project does and its key features]",
    techStack: ["React", "Node.js", "PostgreSQL", "AWS"],
    liveLink: "https://example.com/project2",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2670&auto=format&fit=crop",
    category: "SaaS Platform"
  },
  {
    id: 3,
    title: "[INSERT PROJECT NAME 3]",
    description: "[INSERT PROJECT DESCRIPTION HERE - Brief overview of what this project does and its key features]",
    techStack: ["Vue.js", "Firebase", "Stripe", "Vercel"],
    liveLink: "https://example.com/project3",
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=2670&auto=format&fit=crop",
    category: "E-Commerce"
  },
  {
    id: 4,
    title: "[INSERT PROJECT NAME 4]",
    description: "[INSERT PROJECT DESCRIPTION HERE - Brief overview of what this project does and its key features]",
    techStack: ["Svelte", "GraphQL", "MongoDB", "Netlify"],
    liveLink: "https://example.com/project4",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop",
    category: "Analytics Dashboard"
  },
  {
    id: 5,
    title: "[INSERT PROJECT NAME 5]",
    description: "[INSERT PROJECT DESCRIPTION HERE - Brief overview of what this project does and its key features]",
    techStack: ["Next.js", "Supabase", "Tailwind", "OpenAI"],
    liveLink: "https://example.com/project5",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2664&auto=format&fit=crop",
    category: "AI Tool"
  },
  {
    id: 6,
    title: "[INSERT PROJECT NAME 6]",
    description: "[INSERT PROJECT DESCRIPTION HERE - Brief overview of what this project does and its key features]",
    techStack: ["React Native", "Expo", "Firebase", "Redux"],
    liveLink: "https://example.com/project6",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2672&auto=format&fit=crop",
    category: "Mobile App"
  }
];

export default function ProjectsShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray(".project-section");
      
      sections.forEach((section: any, i) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "bottom top",
          pin: true,
          pinSpacing: false,
          snap: 1,
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="our-work"
      ref={containerRef} 
      className="relative bg-[#050505] overflow-hidden"
    >
      {/* Section Header */}
      <div className="sticky top-0 z-40 bg-[#050505] border-b border-white/5 py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-orange-600 font-mono text-xs uppercase tracking-widest font-black block mb-4">
              [ PORTFOLIO_ARCHIVE ]
            </span>
            <h2 className="text-6xl md:text-9xl font-black uppercase italic tracking-tighter leading-[0.8] text-white">
              Our<br />
              <span className="text-orange-600">Work</span>
            </h2>
          </motion.div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="relative">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="project-section h-screen w-full relative snap-start snap-always py-20 bg-[#050505]"
          >
            <div className="h-full w-full grid grid-cols-1 lg:grid-cols-12 gap-0">
              
              {/* Left Side - Image */}
              <div className={`lg:col-span-7 relative overflow-hidden h-1/2 lg:h-full ${
                index % 2 === 0 ? 'order-1' : 'order-2 lg:order-1'
              }`}>
                <div className="project-card relative h-full w-full group cursor-pointer">
                  <motion.img
                    initial={{ scale: 1.1 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 1.2 }}
                    src={project.image}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-orange-600/20" />
                  
                  {/* Overlay Info on Image Hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="text-center">
                      <ExternalLink className="text-white mx-auto mb-4" size={48} />
                      <p className="text-white font-bold uppercase tracking-widest text-sm">Click to View</p>
                    </div>
                  </div>

                  {/* Project Number Badge */}
                  <div className="absolute top-8 left-8 text-9xl md:text-[12rem] font-black text-white/5 leading-none select-none">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                </div>
              </div>

              {/* Right Side - Content */}
              <div className={`lg:col-span-5 bg-[#0a0a0a] border-t lg:border-t-0 lg:border-l border-white/5 p-8 md:p-16 flex flex-col justify-center h-1/2 lg:h-full ${
                index % 2 === 0 ? 'order-2' : 'order-1 lg:order-2'
              }`}>
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  {/* Category */}
                  <div className="flex items-center gap-3 mb-6">
                    <Layers className="text-orange-600" size={20} />
                    <span className="text-orange-600 font-mono text-xs uppercase tracking-widest font-black">
                      {project.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9] text-white mb-6">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-8 max-w-lg">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="mb-8">
                    <div className="flex items-center gap-2 mb-4">
                      <Code2 className="text-orange-600" size={18} />
                      <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">
                        Tech Stack
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-white/5 border border-white/10 rounded text-xs font-mono text-gray-300 hover:bg-orange-600/20 hover:border-orange-600/30 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 px-6 py-3 bg-orange-600 text-black font-black uppercase tracking-wider text-sm hover:bg-white transition-colors"
                  >
                    <span>View Live Project</span>
                    <ExternalLink 
                      className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" 
                      size={18} 
                    />
                  </a>

                  {/* Project Index */}
                  <div className="mt-12 pt-8 border-t border-white/5">
                    <span className="text-xs font-mono text-gray-600 uppercase tracking-widest">
                      Project {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                    </span>
                  </div>
                </motion.div>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Navigation Indicator */}
      {/* <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3">
        {projects.map((_, index) => (
          <a
            key={index}
            href={`#project-${index + 1}`}
            className="w-2 h-2 rounded-full bg-white/20 hover:bg-orange-600 transition-colors"
          />
        ))}
      </div>

      <style jsx global>{`
        .project-section {
          scroll-snap-type: y mandatory;
        }
      `}</style> */}
    </section>
  );
}