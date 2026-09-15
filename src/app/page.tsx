"use client";

import React from 'react';
import Image from 'next/image';
import { motion, Variants, MotionConfig } from 'framer-motion';
import {
  Layers,
  Rocket,
  ArrowUpRight,
  FileSpreadsheet,
  Workflow,
  LayoutDashboard,
  Plug,
  LineChart,
  Zap,
  Clock,
  AlertTriangle,
  UserX,
  EyeOff,
  Check,
  X,
  MessagesSquare,
  PenTool,
  Code2,
  LifeBuoy,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import Navbar from '@/components/Navbar';

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

function Reveal({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

function SectionHeader({ eyebrow, title, sub }: { eyebrow: string; title: React.ReactNode; sub?: string }) {
  return (
    <div className="section-header">
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="section-title">{title}</h2>
      {sub && <p className="section-sub">{sub}</p>}
    </div>
  );
}

const pains = [
  { icon: Clock, num: "01", title: "Horas perdidas", text: "Copiar, pegar y corregir tablas consume horas que podrías usar para hacer crecer tu negocio." },
  { icon: AlertTriangle, num: "02", title: "Errores costosos", text: "Una fórmula rota o un dato duplicado parecen pequeños… hasta que le cuestan un cliente." },
  { icon: UserX, num: "03", title: "Dependencia total", text: "Si la única persona que entiende tu proceso se va, tu operación se detiene." },
  { icon: EyeOff, num: "04", title: "Cero visibilidad", text: "Inventario, ventas y cobranza sin datos claros: decides con información de hace semanas." }
];

const beforeList = [
  "Todo vive en hojas de cálculo y papel",
  "Procesos manuales que tardan días",
  "Errores humanos en cada paso",
  "Reportes que llegan tarde y ya no sirven",
  "Dependes de una persona o de la memoria"
];

const afterList = [
  "Todo en un solo sistema, desde cualquier lugar",
  "Los procesos se ejecutan solos, en segundos",
  "Datos confiables, sin errores de captura",
  "Reportes en tiempo real, listos para decidir",
  "Operación documentada y lista para crecer"
];

const steps = [
  { icon: MessagesSquare, num: "01", title: "Te escuchamos", text: "Platicamos de tu negocio y tus procesos sin tecnicismos. Primero entendemos cómo trabajas hoy." },
  { icon: PenTool, num: "02", title: "Diseñamos tu solución", text: "Dibujamos contigo el sistema: pantallas, flujos y reglas, todo claro antes de escribir una línea de código." },
  { icon: Code2, num: "03", title: "Lo construimos", text: "Desarrollamos tu software a la medida y lo conectamos con las herramientas que ya usas." },
  { icon: LifeBuoy, num: "04", title: "Te acompañamos", text: "Capacitamos a tu equipo, resolvemos dudas y el sistema crece junto a tu empresa." }
];

const whyUs = [
  "A tu medida, no plantillas de catálogo",
  "Hablamos claro: cero jerga técnica",
  "Soporte real después de la entrega"
];

export default function Home() {
  return (
    <MotionConfig reducedMotion="user">
      <main className="grain" style={{ minHeight: '100vh', paddingTop: '7rem', paddingBottom: '5rem' }}>
        <Navbar />

        {/* ============ HERO ============ */}
        <div className="container">
          <motion.div variants={container} initial="hidden" animate="show" className="bento-grid" style={{ paddingTop: 0 }}>
            <motion.div variants={item} className="bento-item span-3 row-2" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
              <div className="absolute" style={{ bottom: 0, right: 0, padding: '2rem', opacity: 0.18, transform: 'rotate(-6deg)' }}>
                <Layers style={{ width: '12rem', height: '12rem', color: 'var(--accent)' }} />
              </div>
              <div
                className="mb-6"
                style={{ display: 'inline-block', background: 'rgba(204, 255, 0, 0.08)', border: '1px solid rgba(204, 255, 0, 0.2)', padding: '0.3rem 0.9rem', borderRadius: '9999px' }}
              >
                <p className="text-accent" style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.3em' }}>
                  Transformación Digital
                </p>
              </div>
              <h1 className="heading-l mb-6">
                Haz que tu empresa <span className="text-gradient">trabaje como debería.</span>
              </h1>
              <p className="text-xl text-gray-400" style={{ maxWidth: '38rem', lineHeight: '1.6' }}>
                ¿Todavía corres en Excel? Nosotros te transformamos a Power BI, automatizamos procesos manuales y te damos datos en tiempo real para que dejes de decidir a ciegas.
              </p>
              <div className="flex flex-wrap gap-3" style={{ marginTop: '2rem' }}>
                {['Power BI', 'Automatización', 'Datos en tiempo real'].map((c) => (
                  <span key={c} className="chip">{c}</span>
                ))}
              </div>
            </motion.div>

            <motion.div variants={item} className="bento-item border-accent/20 bg-accent/5" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <Rocket style={{ width: '2.5rem', height: '2.5rem', color: 'var(--accent)' }} />
              <div>
                <h3 className="text-xl font-bold mb-2">Automatiza hoy</h3>
                <p className="text-sm text-gray-400 mb-4">Agenda un diagnóstico gratuito y descubre qué procesos puedes digitalizar.</p>
                <button onClick={() => window.dispatchEvent(new Event('openContactModal'))} className="btn-primary w-full py-3" style={{ display: 'block', textAlign: 'center', cursor: 'pointer' }}>Contáctanos</button>
              </div>
            </motion.div>

            <motion.div variants={item} className="bento-item" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <FileSpreadsheet style={{ width: '2.5rem', height: '2.5rem', color: 'var(--accent)' }} />
              <div>
                <h3 className="heading-m mb-2">¿Presa del Excel?</h3>
                <p className="text-sm text-gray-400" style={{ lineHeight: '1.6' }}>
                  Fórmulas rotas, información duplicada y procesos que solo entiende una persona. Si sigues operando así, pierdes tiempo y dinero a diario.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* ============ PROBLEMA ============ */}
        <div className="container">
          <Reveal>
            <SectionHeader
              eyebrow="La realidad de hoy"
              title={<>El Excel te está costando <span className="text-accent">más de lo que crees</span>.</>}
              sub="No hablamos de 'modernizar por modernizar'. Hablamos de procesos que frenan tu crecimiento todos los días."
            />
          </Reveal>
          <div className="bento-grid" style={{ paddingTop: 0 }}>
            {pains.map((p) => (
              <Reveal key={p.num} className="bento-item">
                <span className="num-ghost">{p.num}</span>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3rem' }}>
                  <p.icon style={{ width: '2.25rem', height: '2.25rem', color: 'var(--accent)' }} />
                </div>
                <div>
                  <h3 className="heading-m mb-2">{p.title}</h3>
                  <p className="text-sm text-gray-400" style={{ lineHeight: '1.6' }}>{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* ============ ANTES / DESPUÉS ============ */}
        <div className="container">
          <Reveal>
            <SectionHeader
              eyebrow="Antes vs. Después"
              title={<>La misma empresa, <span className="text-accent">dos formas de operar</span>.</>}
              sub="Así se ve hoy tu operación. Y así queda una vez que la automatizamos con software a la medida."
            />
          </Reveal>
          <Reveal>
            <div className="ba-grid">
              <div className="ba-col ba-col--before">
                <div className="flex items-center gap-3" style={{ marginBottom: '0.5rem' }}>
                  <X style={{ width: '1.25rem', height: '1.25rem', color: '#6b7280' }} />
                  <span className="text-xs font-black uppercase tracking-widest text-gray-500">Hoy · Asociado a hojas y papeles</span>
                </div>
                {beforeList.map((b) => (
                  <div key={b} className="flex items-start gap-3">
                    <X style={{ width: '1rem', height: '1rem', color: '#6b7280', flexShrink: 0, marginTop: '2px' }} />
                    <p className="text-sm text-gray-500" style={{ lineHeight: '1.5' }}>{b}</p>
                  </div>
                ))}
              </div>
              <div className="ba-col ba-col--after">
                <div className="flex items-center gap-3" style={{ marginBottom: '0.5rem' }}>
                  <Check style={{ width: '1.25rem', height: '1.25rem', color: 'var(--accent)' }} />
                  <span className="text-xs font-black uppercase tracking-widest text-accent">Con SkullDevs · Todo en un sistema</span>
                </div>
                {afterList.map((a) => (
                  <div key={a} className="flex items-start gap-3">
                    <Check style={{ width: '1rem', height: '1rem', color: 'var(--accent)', flexShrink: 0, marginTop: '2px' }} />
                    <p className="text-sm text-gray-300" style={{ lineHeight: '1.5' }}>{a}</p>
                  </div>
                ))}
                <button
                  onClick={() => window.dispatchEvent(new Event('openContactModal'))}
                  className="btn-primary"
                  style={{ marginTop: '0.75rem', cursor: 'pointer' }}
                >
                  Quiero mi diagnóstico
                </button>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ============ MÉTODO ============ */}
        <div className="container" id="metodo">
          <Reveal>
            <SectionHeader
              eyebrow="Nuestro método"
              title={<>4 pasos. <span className="text-accent">Sin jerga técnica</span>.</>}
              sub="Así funciona todo el proceso, explicado para que lo entienda toda tu empresa: de finanzas a almacén."
            />
          </Reveal>
          <div className="bento-grid" style={{ paddingTop: 0 }}>
            {steps.map((s) => (
              <Reveal key={s.num} className="bento-item span-2">
                <span className="num-ghost">{s.num}</span>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3rem' }}>
                  <s.icon style={{ width: '2.5rem', height: '2.5rem', color: 'var(--accent)' }} />
                  <ArrowRight style={{ width: '1.5rem', height: '1.5rem', color: '#4b5563' }} />
                </div>
                <div>
                  <h3 className="heading-m mb-2">{s.title}</h3>
                  <p className="text-sm text-gray-400" style={{ lineHeight: '1.6', maxWidth: '30rem' }}>{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* ============ SERVICIOS ============ */}
        <div className="container" id="servicios">
          <Reveal>
            <SectionHeader
              eyebrow="Lo que hacemos por ti"
              title={<>Tecnología que <span className="text-accent">resuelve</span>, no tecnología que impresiona.</>}
              sub="Cada proyecto parte de un problema real de tu operación. Esto es lo que resolvemos."
            />
          </Reveal>
          <div className="bento-grid" style={{ paddingTop: 0 }}>
            <Reveal className="bento-item span-2" style={{ cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3rem' }}>
                <Workflow style={{ width: '2.5rem', height: '2.5rem', color: 'var(--accent)' }} />
                <ArrowUpRight style={{ width: '1.5rem', height: '1.5rem', color: '#4b5563' }} />
              </div>
              <h3 className="heading-m mb-2">Automatización de Procesos</h3>
              <p className="text-sm text-gray-400" style={{ lineHeight: '1.6' }}>
                Eliminamos lo repetitivo: flujos de aprobación, notificaciones, archivos y documentos que se generan solos, sin intervención humana.
              </p>
            </Reveal>
            <Reveal className="bento-item" style={{ cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3rem' }}>
                <LayoutDashboard style={{ width: '2.5rem', height: '2.5rem', color: 'var(--accent)' }} />
                <ArrowUpRight style={{ width: '1.5rem', height: '1.5rem', color: '#4b5563' }} />
              </div>
              <h3 className="heading-m mb-2">Sistemas a Medida</h3>
              <p className="text-sm text-gray-400" style={{ lineHeight: '1.6' }}>
                Paneles, catálogos e inventarios hechos para cómo trabaja tu empresa, no al revés.
              </p>
            </Reveal>
            <Reveal className="bento-item" style={{ cursor: 'pointer' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3rem' }}>
                <Plug style={{ width: '2.5rem', height: '2.5rem', color: 'var(--accent)' }} />
                <ArrowUpRight style={{ width: '1.5rem', height: '1.5rem', color: '#4b5563' }} />
              </div>
              <h3 className="heading-m mb-2">Integraciones</h3>
              <p className="text-sm text-gray-400" style={{ lineHeight: '1.6' }}>
                Conectamos facturación, pagos y tus herramientas actuales para que todo hable entre sí.
              </p>
            </Reveal>
            <Reveal className="bento-item span-2" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <LineChart style={{ width: '2.5rem', height: '2.5rem', color: 'var(--accent)' }} />
              <div>
                <h3 className="heading-m mb-2">Datos en Tiempo Real</h3>
                <p className="text-sm text-gray-400" style={{ lineHeight: '1.6' }}>
                  Reportes y dashboards que se actualizan solos: ventas, costos, inventario y cobranza al día, listos para tomar decisiones.
                </p>
              </div>
            </Reveal>
            <Reveal className="bento-item span-2" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <ShieldCheck style={{ width: '2.5rem', height: '2.5rem', color: 'var(--accent)' }} />
              <div>
                <h3 className="heading-m mb-2">¿Por qué SkullDevs?</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginTop: '0.75rem' }}>
                  {whyUs.map((w) => (
                    <div key={w} className="flex items-start gap-3">
                      <Check style={{ width: '1rem', height: '1rem', color: 'var(--accent)', flexShrink: 0, marginTop: '2px' }} />
                      <p className="text-sm text-gray-300" style={{ lineHeight: '1.5' }}>{w}</p>
                    </div>
                  ))}
                </div>
                <p className="font-mono text-xs text-gray-500" style={{ marginTop: '1.25rem' }}>Next.js · Node · Cloud · APIs</p>
              </div>
            </Reveal>
          </div>
        </div>

        {/* ============ CASOS ============ */}
        <div className="container" id="casos">
          <Reveal>
            <SectionHeader
              eyebrow="Resultados reales"
              title={<>Ya lo hicimos <span className="text-accent">antes</span>.</>}
              sub="Empresas que confiaron su transformación digital a SkullDevs y hoy operan con software propio."
            />
          </Reveal>
          <div className="bento-grid" style={{ paddingTop: 0 }}>
            <Reveal className="bento-item span-2 row-2" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', cursor: 'pointer' }}>
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
            </Reveal>

            <Reveal className="bento-item span-2 row-2" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', cursor: 'pointer' }}>
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
            </Reveal>
          </div>
        </div>

        {/* ============ CTA FINAL ============ */}
        <div className="container">
          <div className="bento-grid" style={{ paddingTop: 0 }}>
            <Reveal className="bento-item span-4" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', textAlign: 'center', padding: '4rem 2rem' }}>
              <Zap style={{ width: '3rem', height: '3rem', color: 'var(--accent)' }} />
              <h2 className="section-title" style={{ maxWidth: '42rem' }}>
                ¿Listo para dejar el Excel <span className="text-accent">atrás?</span>
              </h2>
              <p className="section-sub" style={{ textAlign: 'center' }}>
                Agenda un diagnóstico gratuito de 30 minutos. Sin compromiso: te mostramos qué procesos puedes automatizar y cuánto tiempo recuperarías.
              </p>
              <button
                onClick={() => window.dispatchEvent(new Event('openContactModal'))}
                className="btn-primary"
                style={{ padding: '1.1rem 2.5rem', fontSize: '1rem', cursor: 'pointer' }}
              >
                Agendar diagnóstico gratis
              </button>
              <p className="text-xs uppercase font-bold tracking-widest text-gray-500">
                skulldevs2020@gmail.com
              </p>
            </Reveal>
          </div>
        </div>

        {/* ============ FOOTER ============ */}
        <div className="container">
          <div className="bento-grid" style={{ paddingTop: 0 }}>
            <Reveal className="bento-item span-4" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', gap: '2rem' }}>
              <div className="relative" style={{ width: '10rem', height: '2rem', opacity: 0.5 }}>
                <Image
                  src="/skulldevs/logo.png"
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
            </Reveal>
          </div>
        </div>
      </main>
    </MotionConfig>
  );
}