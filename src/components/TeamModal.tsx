"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Target, Zap } from 'lucide-react';

interface MemberInfo {
  name: string;
  role: string;
  definition: string;
  skills: string[];
}

const teamData: MemberInfo[] = [
  {
    name: "David Vargas T.",
    role: "Lead Web Engineer & Support Strategist",
    definition: "Responsable de la arquitectura técnica y la implementación de soluciones web escalables. Su enfoque combina el dominio técnico en ecosistemas como WordPress y herramientas modernas de desarrollo con una visión crítica de soporte técnico. Se encarga de asegurar que el proyecto no solo sea funcional, sino también eficiente y centrado en resolver problemas reales del usuario.",
    skills: ["Web Architecture", "Modern DevTools", "Support Strategy", "Problem Solving"]
  },
  {
    name: "Hugo B. Balboa",
    role: "Operations & Business Development Lead",
    definition: "Encargado de la gestión operativa, la estrategia de negocio y la coordinación de procesos internos. Su rol se centra en la optimización de flujos de trabajo, la gestión de recursos y la expansión del alcance del proyecto. Actúa como el puente entre las capacidades técnicas de desarrollo y las metas comerciales o de impacto de Skulldevs.",
    skills: ["Operations Management", "Business Strategy", "Process Optimization", "Resource Planning"]
  }
];

export default function TeamModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const openModal = () => {
      setIsOpen(true);
      document.body.style.overflow = 'hidden';
    };

    const handleHashChange = () => {
      if (window.location.hash === '#team') {
        openModal();
      } else {
        setIsOpen(false);
        document.body.style.overflow = '';
      }
    };

    const handleCustomEvent = () => {
      window.location.hash = '#team';
      openModal();
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('openTeamModal', handleCustomEvent);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('openTeamModal', handleCustomEvent);
      document.body.style.overflow = '';
    };
  }, []);

  const closeModal = () => {
    window.location.hash = '';
    setIsOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="modal-root">
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          />
          <div className="modal-wrapper" style={{ pointerEvents: 'none', maxWidth: '850px' }}>
            <motion.div
              className="modal-content bento-item"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              style={{ pointerEvents: 'auto', border: '1px solid var(--accent)', maxHeight: '90vh', overflowY: 'auto', padding: 0 }}
            >
              {/* Close Button */}
              <button className="modal-close" onClick={closeModal} style={{ zIndex: 50, position: 'absolute', top: '1.5rem', right: '1.5rem' }}>
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col">
                {/* PART 1: HEADER & INTRO */}
                <div className="p-8 md:p-12 border-b border-white/5 bg-accent/5">
                  <div className="inline-block px-3 py-1 rounded-full bg-accent/10 border border-accent/20 mb-6">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">Strategic Duo</p>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-6">The Team</h2>
                  <p className="text-gray-300 text-base md:text-lg max-w-2xl leading-relaxed italic">
                    Esta dupla permite que <span className="text-accent font-bold">Skulldevs</span> se posicione como un partner tecnológico que entiende tanto el código como la operación del negocio.
                  </p>
                </div>

                {/* PART 2: PROFILE 1 (David) */}
                <div className="p-8 md:p-12 border-b border-white/5">
                  <div className="flex flex-col md:flex-row gap-8 md:gap-12">
                    <div className="w-20 h-20 rounded-2xl bg-accent/10 flex items-center justify-center border border-accent/20 shadow-[0_0_30px_rgba(204,255,0,0.1)] shrink-0">
                      <User className="w-10 h-10 text-accent" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2">{teamData[0].name}</h3>
                      <p className="text-accent text-xs font-bold uppercase tracking-widest mb-8">{teamData[0].role}</p>

                      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                        <div className="md:col-span-3">
                          <div className="flex items-center gap-3 text-accent/80 mb-3">
                            <Target className="w-4 h-4" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Definición</span>
                          </div>
                          <p className="text-gray-400 leading-relaxed text-sm">
                            {teamData[0].definition}
                          </p>
                        </div>
                        <div className="md:col-span-2">
                          <div className="flex items-center gap-3 text-accent/80 mb-4">
                            <Zap className="w-4 h-4" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Core Skills</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {teamData[0].skills.map((skill, i) => (
                              <span key={i} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* PART 3: PROFILE 2 (Hugo) */}
                <div className="p-8 md:p-12">
                  <div className="flex flex-col md:flex-row gap-8 md:gap-12">
                    <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 shadow-[0_0_30px_rgba(255,255,255,0.05)] shrink-0">
                      <User className="w-10 h-10 text-white/50" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-2">{teamData[1].name}</h3>
                      <p className="text-accent text-xs font-bold uppercase tracking-widest mb-8">{teamData[1].role}</p>

                      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                        <div className="md:col-span-3">
                          <div className="flex items-center gap-3 text-accent/80 mb-3">
                            <Target className="w-4 h-4" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Definición</span>
                          </div>
                          <p className="text-gray-400 leading-relaxed text-sm">
                            {teamData[1].definition}
                          </p>
                        </div>
                        <div className="md:col-span-2">
                          <div className="flex items-center gap-3 text-accent/80 mb-4">
                            <Zap className="w-4 h-4" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Core Skills</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {teamData[1].skills.map((skill, i) => (
                              <span key={i} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
