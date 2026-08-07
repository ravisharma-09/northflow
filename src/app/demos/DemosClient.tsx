"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { demoSites } from "@/data/demo-sites";
import { Plus_Jakarta_Sans } from "next/font/google";
import { useRef } from "react";

const displayFont = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });

export default function DemosClient() {
  const containerRef = useRef(null);
  
  return (
    <div ref={containerRef} className="min-h-screen bg-[#050505] text-[#fafafa] selection:bg-white/20 selection:text-white overflow-hidden relative font-medium">
      
      {/* Custom Header */}
      <header className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between p-6 md:p-12">
        <a href="/" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors">
          <ArrowRight className="w-3 h-3 rotate-180" />
          Back to NorthFlow
        </a>
      </header>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 md:px-12 max-w-7xl mx-auto flex flex-col z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50 mb-8">
            NorthFlow Showcase
          </p>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className={`${displayFont.className} text-[clamp(4rem,9vw,9rem)] font-black leading-[0.85] tracking-tighter mb-8 text-white max-w-5xl`}
        >
          Industry Concept Demonstrations
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="max-w-2xl text-lg md:text-xl text-white/50 font-medium mb-12 leading-relaxed"
        >
          Explore five fictional service-business websites designed with complete, high-conversion interactive customer journeys.
        </motion.p>
      </section>

      {/* Bento Grid Section */}
      <section className="relative px-6 md:px-12 pb-32 max-w-7xl mx-auto z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {demoSites.map((demo, index) => {
            const isLarge = index === 0;
            
            return (
              <motion.article
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: (index % 3) * 0.15 }}
                key={demo.slug}
                className={`group relative flex flex-col bg-[#0a0a0a] border border-white/10 transition-all duration-500 hover:border-white/30
                  ${isLarge ? 'md:col-span-2' : ''}
                `}
              >
                {/* Image Container - Clean Box */}
                <div className={`relative w-full overflow-hidden border-b border-white/10 bg-[#111] ${isLarge ? 'aspect-[21/9]' : 'aspect-[4/3]'}`}>
                  <Image
                    src={demo.image}
                    alt={demo.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  
                  {/* Floating Action */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100 flex items-center justify-center">
                    <a
                      href={`/demos/${demo.slug}`}
                      className="absolute inset-0 z-20 flex items-center justify-center"
                      aria-label={`Open ${demo.businessName} live demo`}
                    >
                      <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white text-black scale-90 opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100 shadow-2xl">
                        <ArrowUpRight className="h-6 w-6" />
                      </span>
                    </a>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col p-8 md:p-10 flex-grow">
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
                      {demo.industry}
                    </span>
                    <span className={`${displayFont.className} text-sm font-black text-white/20`}>
                      0{index + 1}
                    </span>
                  </div>

                  <h2 className={`${displayFont.className} text-3xl md:text-4xl font-black mb-4 text-white group-hover:text-white transition-colors duration-500 tracking-tight`}>
                    {demo.businessName}
                  </h2>
                  <p className="text-white/50 font-medium text-base max-w-lg leading-relaxed mb-10 flex-grow">
                    {demo.description}
                  </p>
                  
                  <div className="pt-6 border-t border-white/10">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-4">Journey Demonstrated</p>
                    <div className="flex flex-wrap gap-x-2 gap-y-3">
                      {demo.journey.map((step, i) => (
                         <div key={step.title} className="flex items-center text-xs font-bold text-white/70">
                           {step.title}
                           {i < demo.journey.length - 1 && <ArrowRight className="w-3 h-3 mx-2 text-white/20" />}
                         </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-6 md:px-12 border-t border-white/10 overflow-hidden text-center z-10 bg-[#050505]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50 mb-8">NorthFlow Strategy Call</p>
          <h2 className={`${displayFont.className} text-[clamp(3rem,6vw,6rem)] font-black leading-[0.9] tracking-tighter mb-12 text-white`}>
            Turn the right concept into <br />
            your real working system.
          </h2>
          <a
            href="/start"
            className="inline-flex min-h-14 items-center gap-3 px-10 rounded-none border-2 border-white bg-white text-[#050505] font-black text-sm uppercase tracking-[0.1em] transition-all duration-300 hover:bg-transparent hover:text-white"
          >
            Book a Strategy Call
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </motion.div>
      </section>
    </div>
  );
}
