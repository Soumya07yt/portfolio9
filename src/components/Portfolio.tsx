import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Experience from './sections/Experience';
import Achievements from './sections/Achievements';
import Contact from './sections/Contact';
import Navigation from './Navigation';
import ThreeBackground from './ThreeBackground';
import CustomCursor from './CustomCursor';

gsap.registerPlugin(ScrollTrigger);

const Portfolio: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP ScrollTrigger animations
    const sections = gsap.utils.toArray('.section');
    
    sections.forEach((section: any) => {
      gsap.fromTo(section, 
        { 
          opacity: 0, 
          y: 100 
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Parallax effect for background elements
    gsap.to('.parallax-bg', {
      yPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: '.parallax-bg',
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-gray-900 text-white overflow-x-hidden">
      <CustomCursor />
      <ThreeBackground />
      <Navigation />
      
      <main className="relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Achievements />
          <Contact />
        </motion.div>
      </main>

      {/* Floating SVG Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <svg className="absolute top-20 left-10 w-20 h-20 text-blue-500/20 animate-pulse" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>
        <svg className="absolute top-1/3 right-20 w-16 h-16 text-purple-500/20 animate-bounce" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="10"/>
        </svg>
        <svg className="absolute bottom-1/4 left-1/4 w-12 h-12 text-green-500/20 animate-spin" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/>
        </svg>
      </div>
    </div>
  );
};

export default Portfolio;