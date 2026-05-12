"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Code2,
  Lightbulb,
  Rocket,
  Globe,
  ArrowUpRight,
  Database,
  Cpu,
  Layers
} from 'lucide-react';
import Navbar from '@/components/Navbar';

export default function Home() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <main className="grain min-h-screen pt-32 pb-20">
      <Navbar />

      <div className="container">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="bento-grid"
        >
          {/* Hero Cell */}
          <motion.div variants={item} className="bento-item span-3 row-2 flex flex-col justify-end">
            <div className="absolute top-0 right-0 p-8 opacity-20">
              <Layers className="w-64 h-64 text-[var(--accent)]" />
            </div>
            <h1 className="heading-l mb-6">
              Creamos <span className="text-accent">Software</span> <br /> que define industrias.
            </h1>
            <p className="text-xl text-gray-400 max-w-xl leading-relaxed">
              En SkullDevs, fusionamos ingeniería de alto nivel con diseño audaz para construir la próxima generación de productos digitales.
            </p>
          </motion.div>

          {/* Quick CTA Cell */}
          <motion.div variants={item} className="bento-item flex flex-col justify-between border-accent/20 bg-accent/5">
            <Rocket className="w-10 h-10 text-accent" />
            <div>
              <h3 className="text-xl font-bold mb-2">Inicia hoy</h3>
              <p className="text-sm text-gray-400 mb-4">Transforma tu idea en código real.</p>
              <button className="w-full btn-primary py-3">Contáctanos</button>
            </div>
          </motion.div>

          {/* Tech Stack Cell */}
          <motion.div variants={item} className="bento-item flex flex-col justify-between">
            <Cpu className="w-10 h-10 text-gray-500" />
            <div>
              <p className="text-xs uppercase tracking-tighter text-gray-500 mb-1">Stack</p>
              <p className="text-lg font-bold">Next.js / Node / Cloud</p>
            </div>
          </motion.div>

          {/* Service: Web */}
          <motion.div variants={item} className="bento-item group">
            <div className="flex justify-between items-start mb-12">
              <Globe className="w-10 h-10 text-accent" />
              <ArrowUpRight className="w-6 h-6 text-gray-600 group-hover:text-accent transition-colors" />
            </div>
            <h3 className="heading-m mb-2">Web Dev</h3>
            <p className="text-sm text-gray-400">Interfaces ultra-rápidas y escalables.</p>
          </motion.div>

          {/* Case Study: MatchUp Sports */}
          <motion.div id="casos" variants={item} className="bento-item span-2 row-2 flex flex-col overflow-hidden group">
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-black to-accent/10 opacity-50 group-hover:opacity-70 transition-opacity" />
            <div className="relative z-10 h-full flex flex-col">
              <div className="flex justify-between items-start mb-auto">
                <div className="bg-accent text-black px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                  Caso de Éxito
                </div>
                <a href="https://www.matchupsports.net/" target="_blank" rel="noopener noreferrer">
                  <ArrowUpRight className="w-8 h-8 text-white hover:text-accent transition-colors" />
                </a>
              </div>
              <div className="mt-20">
                <h3 className="text-4xl font-black mb-4 uppercase">MatchUp Sports</h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Revolucionamos la gestión de torneos deportivos con una plataforma en tiempo real. Implementamos una arquitectura escalable que soporta miles de usuarios simultáneos, integrando sistemas de puntuación en vivo y gestión de brackets automatizada.
                </p>
                <div className="flex gap-4">
                  <span className="text-xs font-mono text-accent">#Fullstack</span>
                  <span className="text-xs font-mono text-accent">#Realtime</span>
                  <span className="text-xs font-mono text-accent">#Scalable</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Service: Consulting */}
          <motion.div variants={item} className="bento-item group">
            <div className="flex justify-between items-start mb-12">
              <Lightbulb className="w-10 h-10 text-accent" />
              <ArrowUpRight className="w-6 h-6 text-gray-600 group-hover:text-accent transition-colors" />
            </div>
            <h3 className="heading-m mb-2">Consultoría</h3>
            <p className="text-sm text-gray-400">Arquitectura y estrategia digital experta.</p>
          </motion.div>

          {/* Service: Data */}
          <motion.div variants={item} className="bento-item group">
            <div className="flex justify-between items-start mb-12">
              <Database className="w-10 h-10 text-accent" />
              <ArrowUpRight className="w-6 h-6 text-gray-600 group-hover:text-accent transition-colors" />
            </div>
            <h3 className="heading-m mb-2">Backend</h3>
            <p className="text-sm text-gray-400">Estructuras de datos robustas y seguras.</p>
          </motion.div>

          {/* Experience Cell */}
          <motion.div variants={item} className="bento-item flex flex-col justify-center items-center text-center">
            <p className="text-5xl font-black text-accent mb-2">50+</p>
            <p className="text-xs uppercase tracking-widest text-gray-500">Proyectos Lanzados</p>
          </motion.div>

          {/* Footer Cell */}
          <motion.div variants={item} className="bento-item span-4 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="relative w-40 h-8 opacity-50">
              <Image
                src="/logo.png"
                alt="SkullDevs"
                fill
                className="object-contain grayscale"
                style={{ filter: 'invert(1)', transform: 'scale(1.3)' }}
              />
            </div>
            <p className="text-gray-500 text-sm">© 2026 SkullDevs. Engineering the future, today.</p>
            <div className="flex gap-6 text-xs uppercase font-bold tracking-widest text-gray-400">
              <a className="hover:text-accent transition-colors">skulldevs2020@gmail.com</a>

            </div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
