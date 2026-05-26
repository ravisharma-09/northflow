'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Eased values for the outer orb to create the "lag behind" premium feel
  const springConfig = { stiffness: 120, damping: 20, mass: 0.6 };
  const orbX = useSpring(mouseX, springConfig);
  const orbY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if mouse is over clickable element
      const isClickable = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.classList.contains('cursor-pointer') ||
        target.closest('.cursor-pointer');

      setHovered(!!isClickable);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY]);

  if (!mounted) return null;

  return (
    <div className="hidden lg:block pointer-events-none fixed inset-0 z-99999 overflow-hidden">
      {/* Inner Dot */}
      <motion.div
        className="soft-cursor-dot"
        style={{
          x: mouseX,
          y: mouseY,
        }}
        animate={{
          scale: hovered ? 1.5 : 1,
          backgroundColor: hovered ? '#FFFFFF' : '#34D279',
        }}
        transition={{ duration: 0.2 }}
      />

      {/* Outer Eased Orb */}
      <motion.div
        className="soft-cursor-orb"
        style={{
          x: orbX,
          y: orbY,
        }}
        animate={{
          scale: hovered ? 1.3 : 1,
          borderColor: hovered ? 'rgba(255, 255, 255, 0.4)' : 'rgba(52, 210, 121, 0.35)',
          backgroundColor: hovered ? 'rgba(255, 255, 255, 0.05)' : 'rgba(52, 210, 121, 0.03)',
        }}
        transition={{ duration: 0.2 }}
      />
    </div>
  );
}
