"use client";

import React from 'react';
import { BadgeCheck, Briefcase, Printer, Rocket, Wrench, GraduationCap, Cpu, ExternalLink } from 'lucide-react';
import Navbar from '@/components/Navbar';

const contactData = [
  "Zapopan, Jalisco, México",
  "federbbalboa@email.com",
  "+52 333 460 6632",
];

const perfil =
  "Profesional de tecnología y transformación digital con más de 20 años de experiencia integrando gestión de proyectos/producto, análisis de negocio, arquitectura de software, eCommerce y entrega tecnológica. Certificado SAFe® 6.0 POPM, con experiencia práctica en requerimientos, validaciones UAT/E2E, riesgos, dependencias, integraciones, seguridad, infraestructura, APIs, releases y estabilización en producción. De manera paralela a su actividad profesional, desarrolla proyectos independientes de IA, LLM locales, automatización, procesamiento de datos, analytics, dashboards, plataformas CRM/ERP/WMS/OMS, asistentes de voz y experimentación con automatización de video.";

const proyectosIndependientes = [
  { area: "AI & Local LLMs", exp: "Entornos de LLM locales, asistentes de IA, flujos de conocimiento, análisis y automatización." },
  { area: "Workflow Automation", exp: "Integraciones con n8n + Claude, orquestación de APIs/servicios y automatización de procesos empresariales." },
  { area: "Data & Analytics", exp: "Procesamiento, transformación y análisis de datos, así como dashboards personalizados para visibilidad operativa y toma de decisiones." },
  { area: "Digital Platforms", exp: "Desarrollo desde cero de plataformas y prototipos relacionados con CRM, ERP, WMS y OMS." },
  { area: "Voice & Video AI", exp: "Sistemas de asistentes de voz y experimentación con automatización de edición y postproducción de video mediante IA." },
  { area: "Independent Innovation", exp: "Desarrollo continuo de proyectos tecnológicos propios enfocados en IA, automatización, arquitectura de software, datos, APIs y transformación digital." },
];

const proyectosMarcas = [
  { marca: "Dairy Queen", url: "https://www.dairyqueen.com", tipo: "Participación en proyectos digitales, dinámicas en línea a través del sitio web para eventos especiales, mantenimiento y desarrollo web ejecutados dentro de un entorno de agencia, aportando capacidades técnicas y de desarrollo web." },
  { marca: "Sirloin Stockade", url: "https://sirloinstockade.mx", tipo: "Desarrollo web y proyectos digitales relacionados con la presencia online de la marca. Dinámica en línea de rifa de un auto con validación de SEGOB." },
  { marca: "Wings Army", url: "https://wingsarmy.mx", tipo: "Participación en proyectos digitales/web y trabajo técnico relacionado con dinámicas en línea a través de redes sociales." },
  { marca: "COPRESET.com", url: "https://copreset.com", tipo: "Desarrollo web y trabajo sobre plataformas digitales." },
  { marca: "JAT-Global.com", url: "https://jatglobal.com", tipo: "Desarrollo de sitio web corporativo y soluciones digitales." },
  { marca: "Aaptiv", url: "https://aaptiv.com", tipo: "Participación en proyectos de desarrollo web/digital." },
  { marca: "Skulldevs.dev", url: "https://github.com/davidvato/skulldevs", tipo: "Plataforma tecnológica y showcase de desarrollo independiente, combinando desarrollo web, experimentación tecnológica e innovación digital." },
];

const competencias = [
  { area: "Project / Product Management", cap: "Agile, SAFe, Scrum, Kanban, planificación, roadmap, prioridades, riesgos, dependencias y stakeholders." },
  { area: "Business Analysis", cap: "Requerimientos, historias de usuario, criterios de aceptación, reglas de negocio, análisis funcional/técnico y procesos." },
  { area: "Digital Transformation", cap: "Digitalización, automatización, optimización de procesos, plataformas empresariales y transformación tecnológica." },
  { area: "Technical Delivery", cap: "Arquitectura, APIs, integraciones, bases de datos, cloud, seguridad, infraestructura, despliegues, UAT/E2E y soporte productivo." },
];

const experiencia = [
  {
    periodo: "Oct 2025 – Ene 2026",
    rol: "Farmacias Guadalajara | Product Manager | Enterprise Delivery Lead",
    bullets: [
      "Lideró la etapa final de la migración de eCommerce a Salesforce y la integración con OMS para pedidos y entregas.",
      "Lideró UAT y validaciones end-to-end de eCommerce, servicios backend, APIs, OMS, fulfillment, inventario y entregas.",
      "Revisó arquitectura, integraciones, seguridad, infraestructura y conectividad segura de APIs en un entorno híbrido.",
      "Coordinó releases controlados y equipos multidisciplinarios sin interrumpir la operación.",
    ],
  },
  {
    periodo: "2024 – 2025",
    rol: "ISITA / Farmacias Guadalajara | Product Manager | Technical Project Manager | Digital Transformation Coordinator",
    bullets: [
      "Coordinó iniciativas de transformación Salesforce y equipos técnicos y de negocio multidisciplinarios.",
      "Gestionó bloques de UAT, validaciones E2E en staging, reglas de negocio, requerimientos, flujos de datos y evidencias.",
      "Coordinó infraestructura, ciberseguridad, data center, mobile, POS, logística, compras, inventario, releases e integraciones empresariales.",
    ],
  },
  {
    periodo: "2021 – 2023",
    rol: "Concentrix Catalyst | Project Manager | Scrum Master | Technical Delivery",
    bullets: [
      "Gestionó proyectos eCommerce Magento desde requerimientos hasta despliegue, coordinando equipos de negocio, desarrollo y QA.",
      "Definió requerimientos, criterios de aceptación, prioridades, riesgos, dependencias, planeación de releases y capacidad.",
    ],
  },
  {
    periodo: "2020 – 2021",
    rol: "Turn | Project Manager | Business Analyst | Technical Lead",
    bullets: [
      "Lideró levantamiento de requerimientos, análisis funcional/técnico y definición de soluciones.",
      "Tradujo necesidades de negocio a tareas técnicas utilizando Jira, Trello y Confluence; apoyó arquitectura y despliegues en AWS, Laravel y Ubuntu.",
    ],
  },
  {
    periodo: "2018 – 2020",
    rol: "121Corp | Digital Design Manager | Web & Digital Transformation Lead",
    bullets: [
      "Coordinó equipos creativos y técnicos para sitios web, aplicaciones web y plataformas digitales.",
      "Lideró iniciativas de digitalización y automatización en arquitectura, APIs, infraestructura, bases de datos, integraciones y despliegues.",
    ],
  },
  {
    periodo: "2016 – 2019",
    rol: "BDP | Director of Development | Technical Project Lead / Senior Web Developer",
    bullets: [
      "Lideró iniciativas eCommerce y de plataformas digitales cubriendo arquitectura, bases de datos, integraciones y sistemas internos.",
      "Coordinó equipos de desarrollo, hosting, migraciones, despliegues y troubleshooting; evaluó oportunidades de automatización.",
    ],
  },
];

const stack = [
  "PHP", "JavaScript", "jQuery", "HTML5", "CSS3", "Laravel", "React Native", "Node.js",
  "AWS", "MySQL", "ES6", "Redux.js", "Vue.js", "Firebase", "CentOS", "Ubuntu", "Postman",
  "Babel", "Git", "IoT", "APIs", "JSON", "Bootstrap", "WordPress", "Magento", "Shopify",
  "WooCommerce", "PrestaShop", "n8n", "Claude", "Local LLM environments",
];

const reconocimientos = [
  "Mención de industria en CSS Design Awards (2015) por excelencia en UI.",
  "Viral CodePen Creator, autor del “Bootstrap Sidebar Menu” utilizado globalmente.",
  "Mención especial DevSnap / Sam (2024) por arquitectura Responsive Admin.",
];

const formacion = [
  "Administración en Sistemas de Información (ASI) — UNICO / Universidad Autónoma de Guadalajara (UAG).",
  "SAFe® Agile POPM 6.0",
  "Cisco CCNA 1–4",
  "Español: Nativo · Inglés: Avanzado",
];

function SectionTitle({ icon: Icon, children }: { icon: React.ComponentType<{ style?: React.CSSProperties }>; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3" style={{ marginBottom: '1.5rem' }}>
      <Icon style={{ width: '1.4rem', height: '1.4rem', color: 'var(--accent)' }} />
      <h2 className="cv-section-title">{children}</h2>
    </div>
  );
}

export default function CvHugoClient() {
  return (
    <main className="grain" style={{ minHeight: '100vh', paddingTop: '6.5rem', paddingBottom: '5rem' }}>
      <Navbar />

      <div className="container">
        <div className="cv-wrap">
          {/* ============ CABECERA ============ */}
          <header className="bento-item" style={{ padding: '2.5rem 2rem' }}>
            <div className="flex items-start justify-between" style={{ flexWrap: 'wrap', gap: '1rem', marginBottom: '1.75rem' }}>
              <div>
                <span className="chip" style={{ marginBottom: '0.75rem' }}>CV · Hugo</span>
                <h1 className="heading-l" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)' }}>
                  HUGO F. <span className="text-gradient">BRIBIESCA BALBOA</span>
                </h1>
              </div>
              <button onClick={() => window.print()} className="btn-primary cv-no-print" style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}>
                <Printer style={{ width: '1rem', height: '1rem', marginRight: '0.5rem', verticalAlign: '-2px' }} />
                Descargar / Imprimir
              </button>
            </div>

            <h2 className="cv-role" style={{ marginBottom: '0.75rem' }}>
              Senior Project Manager | Technical Project Manager | Product Owner | Business Analyst
            </h2>
            <p className="cv-tagline" style={{ marginBottom: '1.5rem' }}>
              Transformación Digital | eCommerce | Agile / SAFe | IA y Automatización | Entrega Tecnológica | Arquitectura Técnica
            </p>
            <div className="flex flex-wrap gap-3">
              {contactData.map((c) => (
                <span key={c} className="chip" style={{ borderColor: 'rgba(255,255,255,0.15)', color: '#d1d5db', background: 'rgba(255,255,255,0.03)' }}>{c}</span>
              ))}
            </div>
          </header>

          {/* ============ PERFIL ============ */}
          <section className="bento-item">
            <SectionTitle icon={BadgeCheck}>Perfil Profesional</SectionTitle>
            <p className="cv-p">{perfil}</p>
          </section>

          {/* ============ PROYECTOS INDEPENDIENTES ============ */}
          <section className="bento-item">
            <SectionTitle icon={Rocket}>Proyectos independientes de IA, automatización y tecnología digital</SectionTitle>
            <div className="cv-table">
              {proyectosIndependientes.map((r) => (
                <div key={r.area} className="cv-row">
                  <div className="cv-label">{r.area}</div>
                  <div className="cv-value">{r.exp}</div>
                </div>
              ))}
            </div>
          </section>

          {/* ============ MARCAS ============ */}
          <section className="bento-item">
            <SectionTitle icon={ExternalLink}>Proyectos digitales y experiencia con marcas seleccionadas</SectionTitle>
            <div className="cv-table">
              {proyectosMarcas.map((r) => (
                <div key={r.marca} className="cv-row">
                  <div className="cv-label">
                    <a href={r.url} target="_blank" rel="noopener noreferrer" className="cv-link">
                      {r.marca}
                      <ExternalLink style={{ width: '0.9rem', height: '0.9rem', flexShrink: 0 }} />
                    </a>
                  </div>
                  <div className="cv-value">{r.tipo}</div>
                </div>
              ))}
            </div>
          </section>

          {/* ============ COMPETENCIAS ============ */}
          <section className="bento-item">
            <SectionTitle icon={Wrench}>Competencias principales</SectionTitle>
            <div className="cv-table">
              {competencias.map((r) => (
                <div key={r.area} className="cv-row">
                  <div className="cv-label">{r.area}</div>
                  <div className="cv-value">{r.cap}</div>
                </div>
              ))}
            </div>
          </section>

          {/* ============ EXPERIENCIA ============ */}
          <section className="bento-item">
            <SectionTitle icon={Briefcase}>Experiencia profesional</SectionTitle>
            <div className="cv-timeline">
              {experiencia.map((job) => (
                <div key={job.rol} className="cv-job">
                  <div className="cv-job-head">
                    <span className="cv-period">{job.periodo}</span>
                    <h3 className="cv-job-rol">{job.rol}</h3>
                  </div>
                  <ul className="cv-bullets">
                    {job.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* ============ WORDPRESS ============ */}
          <section className="bento-item" style={{ borderColor: 'rgba(34, 211, 238, 0.25)', background: 'linear-gradient(180deg, rgba(34,211,238,0.04), transparent 40%), var(--surface)' }}>
            <div className="flex items-center gap-3" style={{ marginBottom: '1.25rem' }}>
              <Cpu style={{ width: '1.4rem', height: '1.4rem', color: 'var(--accent-2)' }} />
              <h2 className="cv-section-title" style={{ background: 'linear-gradient(90deg, var(--accent-2), var(--accent-3))', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
                Especialización WordPress / PHP
              </h2>
            </div>
            <p className="cv-p">
              Desarrollo WordPress personalizado, themes, plugins, WooCommerce, REST API, Elementor, BuddyBoss,
              LearnDash, Paid Memberships Pro, backend PHP, bases de datos, APIs, optimización, hosting, despliegue
              y soporte productivo.
            </p>
          </section>

          {/* ============ STACK ============ */}
          <section className="bento-item">
            <div className="flex items-center gap-3" style={{ marginBottom: '1.5rem' }}>
              <Cpu style={{ width: '1.4rem', height: '1.4rem', color: 'var(--accent)' }} />
              <h2 className="cv-section-title">Stack tecnológico</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {stack.map((t) => (
                <span key={t} className="chip" style={{ borderColor: 'rgba(255,255,255,0.14)', color: '#d1d5db', background: 'rgba(255,255,255,0.03)', textTransform: 'none', letterSpacing: '0.02em' }}>{t}</span>
              ))}
            </div>
          </section>

          {/* ============ RECONOCIMIENTOS ============ */}
          <section className="bento-item">
            <SectionTitle icon={GraduationCap}>Reconocimientos y formación</SectionTitle>
            <div className="cv-two-col">
              <div>
                <h4 className="cv-mini-title">Reconocimientos</h4>
                <ul className="cv-bullets">
                  {reconocimientos.map((r) => (
                    <li key={r}>{r}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="cv-mini-title">Formación</h4>
                <ul className="cv-bullets">
                  {formacion.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <p className="cv-foot" style={{ textAlign: 'center' }}>
            {contactData.join(' · ')}
          </p>
        </div>
      </div>
    </main>
  );
}