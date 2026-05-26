'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function HeroVisual() {
  const [leadCount, setLeadCount] = useState(18);
  const [growthCount, setGrowthCount] = useState(284);
  const [workflowProgress, setWorkflowProgress] = useState(0);
  const [aiChecks, setAiChecks] = useState(0);

  useEffect(() => {
    const interval4s = setInterval(() => {
      setLeadCount((prev) => prev + Math.floor(Math.random() * 3) + 1);
      setGrowthCount((prev) => prev + Math.floor(Math.random() * 5));
      setAiChecks(0);
      setTimeout(() => setAiChecks(1), 500);
      setTimeout(() => setAiChecks(2), 1000);
      setTimeout(() => setAiChecks(3), 1500);
    }, 4000);

    const interval3s = setInterval(() => {
      setWorkflowProgress(0);
      setTimeout(() => setWorkflowProgress(100), 400);
    }, 3000);

    return () => {
      clearInterval(interval4s);
      clearInterval(interval3s);
    };
  }, []);

  return (
    <div className="hero-visual-container relative w-full h-full" style={{ perspective: '1200px' }}>

      {/* ======= TOP ROW: AI (left) + Leads (right) ======= */}
      {/* These sit at the TOP of the container, ABOVE the browser */}

      {/* AI Card — top-left corner */}
      <div className="hero-card hero-card-ai absolute top-0 left-0 z-30" style={{ opacity: 0 }}>
        <motion.div
          className="hero-parallax-card-2 w-[170px] bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[16px] p-3 shadow-[0_0_20px_rgba(52,210,121,0.12)] [transform-style:preserve-3d]"
          whileHover={{ y: -4 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-md bg-[var(--background)] border border-[var(--border)] flex items-center justify-center text-brand">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-[11px] font-black text-foreground">AI Engine</span>
            </div>
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[7px] font-extrabold uppercase bg-brand-muted text-brand border border-brand/10">
              <span className="w-1 h-1 rounded-full bg-brand animate-pulse" /> Live
            </span>
          </div>
          <div className="flex flex-col gap-1">
            {[1, 2, 3].map((check) => (
              <div key={check} className="flex items-center gap-1.5">
                <div className={`w-2.5 h-2.5 rounded-full flex items-center justify-center transition-colors duration-300 ${aiChecks >= check ? 'bg-brand' : 'bg-surface'}`}>
                  {aiChecks >= check && (
                    <svg className="w-1.5 h-1.5 text-[var(--background)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <div className={`h-1 rounded-full transition-all duration-300 ${aiChecks >= check ? 'w-14 bg-brand/40' : 'w-8 bg-surface'}`} />
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Leads Card — top-right corner */}
      <div className="hero-card hero-card-leads absolute top-0 right-0 z-30" style={{ opacity: 0 }}>
        <motion.div
          className="hero-parallax-card-1 w-[170px] bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[16px] p-3 shadow-xl flex items-center gap-2.5 [transform-style:preserve-3d]"
          whileHover={{ y: -4 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <div className="w-7 h-7 rounded-full bg-brand-muted border border-brand/20 flex items-center justify-center text-brand flex-shrink-0">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] font-black text-foreground">+{leadCount} Leads</span>
            <span className="text-[8px] font-semibold text-muted">Generated this hour</span>
          </div>
        </motion.div>
      </div>

      {/* ======= CENTER: Browser Window ======= */}
      {/* Vertically centered, occupies the middle band */}
      <div
        className="hero-browser absolute left-1/2 top-1/2 z-20 w-[90%] max-w-[460px]"
        style={{
          opacity: 0,
          transform: 'translate(-50%, -50%) rotateY(-6deg) rotateX(3deg)',
          aspectRatio: '1.6',
        }}
      >
        <motion.div
          className="hero-parallax-browser w-full h-full bg-[var(--card-bg)] border border-[var(--card-border)] rounded-[20px] overflow-hidden flex flex-col backdrop-blur-[24px] relative [transform-style:preserve-3d]"
          style={{ boxShadow: 'var(--shadow-premium)' }}
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent pointer-events-none z-50 rounded-[20px]" />

          {/* Chrome bar */}
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--border)] bg-[var(--surface)]">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#FF5F56]" />
              <span className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
              <span className="w-2 h-2 rounded-full bg-[#27C93F]" />
            </div>
            <div className="px-6 py-0.5 bg-[var(--background)] rounded-full border border-[var(--border)] text-[9px] text-muted font-bold tracking-tight">
              northflow.co
            </div>
            <div className="flex items-center gap-1 opacity-50">
              <span className="w-1 h-1 rounded-full bg-white" />
              <span className="w-1 h-1 rounded-full bg-white" />
              <span className="w-1 h-1 rounded-full bg-white" />
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 flex items-center justify-between p-5 gap-4 bg-[var(--background)]">
            <div className="w-[50%] flex flex-col gap-2.5">
              <h3 className="text-lg lg:text-xl font-display font-black leading-tight text-foreground">
                Building digital <br />
                experiences that <br />
                <span className="text-brand">drive</span> real results.
              </h3>
              <p className="text-[9px] text-muted leading-relaxed font-semibold max-w-[180px]">
                We design and build high-performing websites for modern brands.
              </p>
            </div>
            <div className="w-[44%] h-[85%] rounded-lg overflow-hidden bg-[var(--surface)] border border-[var(--border)]">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80"
                alt="Preview"
                className="w-full h-full object-cover opacity-80"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* ======= BOTTOM ROW: Workflow (left) + Growth (right) ======= */}
      {/* These sit at the BOTTOM of the container, BELOW the browser */}

      {/* Workflow Card — bottom-left corner */}
      <div className="hero-card hero-card-workflow absolute bottom-[12%] left-[5%] z-30" style={{ opacity: 0 }}>
        <motion.div
          className="hero-parallax-card-3 w-[170px] bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[16px] p-3 shadow-xl flex items-center gap-2.5 [transform-style:preserve-3d]"
          whileHover={{ y: -4 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <div className="w-7 h-7 rounded-full bg-brand-muted border border-brand/20 flex items-center justify-center text-brand flex-shrink-0 relative overflow-hidden">
            <div
              className="absolute inset-0 bg-brand/30 transition-all duration-500 ease-out"
              style={{ height: `${workflowProgress}%`, bottom: 0, top: 'auto' }}
            />
            <svg className="w-3.5 h-3.5 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
          <div className="flex flex-col">
            <h5 className="text-[11px] font-black text-foreground">Workflow</h5>
            <p className="text-[8px] text-muted">{workflowProgress === 100 ? 'Complete' : 'Processing...'}</p>
          </div>
        </motion.div>
      </div>

      {/* Growth Card — bottom-right corner */}
      <div className="hero-card hero-card-growth absolute bottom-[8%] right-0 z-30" style={{ opacity: 0 }}>
        <motion.div
          className="hero-parallax-card-4 w-[160px] bg-[var(--card-bg)] backdrop-blur-xl border border-[var(--card-border)] rounded-[16px] p-3 shadow-xl text-left [transform-style:preserve-3d]"
          whileHover={{ y: -4 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <div className="flex items-center gap-1.5 mb-1.5">
            <div className="w-4 h-4 rounded-md bg-[var(--background)] border border-[var(--border)] flex items-center justify-center text-brand">
              <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5z" />
              </svg>
            </div>
            <span className="text-[9px] font-black text-muted uppercase">Results</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-xs font-bold text-foreground">Growth</span>
            <span className="text-lg font-black text-brand">+{growthCount}%</span>
          </div>
        </motion.div>
      </div>

    </div>
  );
}
