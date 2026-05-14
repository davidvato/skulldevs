"use client";

import React from 'react';
import Image from 'next/image';
import { motion, Variants } from 'framer-motion';
import {
  Code2,
  Lightbulb,
  Rocket,
  Globe,
  ArrowUpRight,
  Database,
  Cpu,
  Layers,
  User
} from 'lucide-react';
import Navbar from '@/components/Navbar';

export default function Home() {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <main className="grain" style={{ minHeight: '100vh', paddingTop: '7rem', paddingBottom: '5rem' }}>
      <Navbar />

      <div className="container">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="bento-grid"
        >
          {/* Hero Cell */}
          <motion.div variants={item} className="bento-item span-3 row-2" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
            <div className="absolute" style={{ top: 0, right: 0, padding: '2rem', opacity: 0.2 }}>
              <Layers style={{ width: '12rem', height: '12rem', color: 'var(--accent)' }} />
            </div>
            <h1 className="heading-l mb-6">
              Creamos <span className="text-accent">Software</span> <br />que define industrias.
            </h1>
            <p className="text-xl text-gray-400" style={{ maxWidth: '36rem', lineHeight: '1.6' }}>
              En SkullDevs, fusionamos ingeniería de alto nivel con diseño audaz para construir la próxima generación de productos digitales.
            </p>
          </motion.div>

          {/* Quick CTA Cell */}
          <motion.div variants={item} className="bento-item border-accent/20 bg-accent/5" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Rocket style={{ width: '2.5rem', height: '2.5rem', color: 'var(--accent)' }} />
            <div>
              <h3 className="text-xl font-bold mb-2">Inicia hoy</h3>
              <p className="text-sm text-gray-400 mb-4">Transforma tu idea en código real.</p>
              <button onClick={() => window.dispatchEvent(new Event('openContactModal'))} className="btn-primary w-full py-3" style={{ display: 'block', textAlign: 'center' }}>Contáctanos</button>
            </div>
          </motion.div>


          {/* Service: Web */}
          <motion.div variants={item} className="bento-item" style={{ cursor: 'pointer' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3rem' }}>
              <Globe style={{ width: '2.5rem', height: '2.5rem', color: 'var(--accent)' }} />
              <ArrowUpRight style={{ width: '1.5rem', height: '1.5rem', color: '#4b5563' }} />
            </div>
            <h3 className="heading-m mb-2">Web Dev</h3>
            <p className="text-sm text-gray-400">Interfaces ultra-rápidas y escalables.</p>
          </motion.div>

          {/* Service: Consulting */}
          <motion.div variants={item} className="bento-item" style={{ cursor: 'pointer' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3rem' }}>
              <Lightbulb style={{ width: '2.5rem', height: '2.5rem', color: 'var(--accent)' }} />
              <ArrowUpRight style={{ width: '1.5rem', height: '1.5rem', color: '#4b5563' }} />
            </div>
            <h3 className="heading-m mb-2">Consultoría</h3>
            <p className="text-sm text-gray-400">Arquitectura y estrategia digital experta.</p>
          </motion.div>

          {/* Service: Data */}
          <motion.div variants={item} className="bento-item" style={{ cursor: 'pointer' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3rem' }}>
              <Database style={{ width: '2.5rem', height: '2.5rem', color: 'var(--accent)' }} />
              <ArrowUpRight style={{ width: '1.5rem', height: '1.5rem', color: '#4b5563' }} />
            </div>
            <h3 className="heading-m mb-2">Backend</h3>
            <p className="text-sm text-gray-400">Estructuras de datos robustas y seguras.</p>
          </motion.div>

          {/* Tech Stack Cell */}
          <motion.div variants={item} className="bento-item" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <Cpu style={{ width: '2.5rem', height: '2.5rem', color: 'var(--accent)' }} />
            <div>
              <h3 className="heading-m mb-2">Stack</h3>
              <p className="text-sm text-gray-400">Next.js / Node / Cloud</p>
              <p className="text-sm text-gray-400">HTML5 / CSS3 / Vanilla JS</p>
              <p className="text-sm text-gray-400">Etc...</p>
            </div>
          </motion.div>

          {/* Case Study: MatchUp Sports */}
          <motion.div id="casos" variants={item} className="bento-item span-2 row-2" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', cursor: 'pointer' }}>
            <div className="absolute inset-0 z-0" style={{ background: 'linear-gradient(135deg, #000, rgba(204, 255, 0, 0.1))', opacity: 0.5, transition: 'opacity 0.3s ease' }} />
            <div className="relative z-10 h-full" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'auto' }}>
                <div className="bg-accent" style={{ color: '#000', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Caso de Éxito
                </div>
                <a href="https://www.matchupsports.net/" target="_blank" rel="noopener noreferrer">
                  <ArrowUpRight style={{ width: '2rem', height: '2rem', color: '#fff' }} />
                </a>
              </div>
              <div style={{ marginTop: '3rem' }}>
                <h3 className="text-4xl font-black mb-4 uppercase">MatchUp Sports</h3>
                <p className="text-gray-300 leading-relaxed mb-6" style={{ fontSize: 'clamp(0.85rem, 2vw, 1rem)' }}>
                  Revolucionamos la gestión de torneos deportivos con una plataforma en tiempo real. Implementamos una arquitectura escalable que soporta miles de usuarios simultáneos, integrando sistemas de puntuación en vivo y gestión de brackets automatizada.
                </p>
                <div className="flex flex-wrap gap-4">
                  <span className="text-xs font-mono text-accent">#Fullstack</span>
                  <span className="text-xs font-mono text-accent">#Realtime</span>
                  <span className="text-xs font-mono text-accent">#Scalable</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Case Study: Copreset */}
          <motion.div variants={item} className="bento-item span-2 row-2" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', cursor: 'pointer' }}>
            <div className="absolute inset-0 z-0" style={{ background: 'linear-gradient(135deg, #000, rgba(204, 255, 0, 0.1))', opacity: 0.5, transition: 'opacity 0.3s ease' }} />
            <div className="relative z-10 h-full" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'auto' }}>
                <div className="bg-accent" style={{ color: '#000', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  Caso de Éxito
                </div>
                <a href="https://copreset.com" target="_blank" rel="noopener noreferrer">
                  <ArrowUpRight style={{ width: '2rem', height: '2rem', color: '#fff' }} />
                </a>
              </div>
              <div style={{ marginTop: '3rem' }}>
                <h3 className="text-4xl font-black mb-4 uppercase">COPRESET</h3>
                <p className="text-gray-300 leading-relaxed mb-6" style={{ fontSize: 'clamp(0.85rem, 2vw, 1rem)' }}>
                  Líderes en alta ingeniería ambiental. Diseñamos su presencia digital para destacar su tecnología de punta en biodigestores y gestión de residuos a nivel global, operando en más de 6 países.
                </p>
                <div className="flex flex-wrap gap-4">
                  <span className="text-xs font-mono text-accent">#Industrial</span>
                  <span className="text-xs font-mono text-accent">#Corporate</span>
                  <span className="text-xs font-mono text-accent">#Global</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Footer Cell */}
          <motion.div variants={item} className="bento-item span-4" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', gap: '2rem' }}>
            <div className="relative" style={{ width: '10rem', height: '2rem', opacity: 0.5 }}>
              <Image
                src="/logo.png"
                alt="SkullDevs"
                fill
                className="object-contain grayscale"
                style={{ filter: 'invert(1)', transform: 'scale(1.3)' }}
              />
            </div>
            <p className="text-gray-500 text-sm text-center">© 2026 SkullDevs. Engineering the future, today.</p>
            <div className="flex gap-6 text-xs uppercase font-bold tracking-widest text-gray-400" style={{ flexWrap: 'wrap', justifyContent: 'center' }}>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  window.dispatchEvent(new Event('openContactModal'));
                }}
                className="hover:text-accent transition-colors cursor-pointer"
                style={{ wordBreak: 'break-all' }}
              >
                skulldevs2020@gmail.com
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
