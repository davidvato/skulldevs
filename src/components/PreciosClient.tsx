"use client";

import React, { useState } from 'react';
import { MotionConfig } from 'framer-motion';
import {
  BarChart3, Bell, Globe, Briefcase, FileText, CalendarDays, Brain,
  Check, Plus, X, Zap, MessageCircle, Sparkles, Send, Wallet, HeartHandshake
} from 'lucide-react';
import Navbar from '@/components/Navbar';

interface Service {
  id: string;
  cat: string;
  name: string;
  desc: string;
  price: number;
  tools?: string[];
}

interface Cat {
  key: string;
  label: string;
  icon: React.ComponentType<{ style?: React.CSSProperties }>;
  blurb: string;
  tint: string;
}

const fmt = (n: number) =>
  new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(n);

const cats: Cat[] = [
  { key: 'datos', label: 'De Excel a Dashboards', icon: BarChart3, blurb: 'Tus hojas de cálculo convertidas en métricas y números que se ven en tiempo real.', tint: '#ccff00' },
  { key: 'conexiones', label: 'Notificaciones & Conexiones', icon: Bell, blurb: 'Que tu sistema hable solo: reportes y avisos por correo o WhatsApp.', tint: '#22d3ee' },
  { key: 'sitios', label: 'Sitios Web & WhatsApp', icon: Globe, blurb: 'Tu negocio en línea y con WhatsApp conectado para captar y atender clientes.', tint: '#8b5cf6' },
  { key: 'agenda', label: 'Agendamiento & Calendarios', icon: CalendarDays, blurb: 'Citas que se apartan solas y recordatorios que se envían solos. Ideal para dentistas y servicios.', tint: '#f472b6' },
  { key: 'docs', label: 'Documentos & Datos', icon: FileText, blurb: 'Formularios que llenan y generan documentos finales automáticamente.', tint: '#2dd4bf' },
  { key: 'crm', label: 'CRM & ERP', icon: Briefcase, blurb: 'Control de clientes, inventarios, ventas y cobranza en un solo lugar.', tint: '#60a5fa' },
  { key: 'ia', label: 'Inteligencia Artificial (supervisada)', icon: Brain, blurb: 'Procesos con IA que revisan, analizan y dan resultados. Tú siempre validas antes de publicar.', tint: '#a78bfa' },
];

const services: Service[] = [
  { id: 'excel-dash-basic', cat: 'datos', name: 'Dashboard con tus datos de Excel', desc: 'Convertimos tu Excel en un tablero de métricas (ventas, gastos, inventario) que se actualiza solo.', price: 3000, tools: ['Power BI', 'Looker Studio'] },
  { id: 'excel-dash-auto', cat: 'datos', name: 'Dashboard que se actualiza automáticamente', desc: 'Conectamos tus datos para que cada vez que cambien, el tablero se refresque sin que toques nada.', price: 5000, tools: ['n8n', 'Make', 'Power BI'] },
  { id: 'excel-clean', cat: 'datos', name: 'Limpieza y procesamiento de datos', desc: 'Corregimos fórmulas rotas, duplicados y errores, y dejamos tu información lista para analizarse.', price: 4500, tools: ['n8n', 'Python', 'Sheets'] },

  { id: 'notif-email', cat: 'conexiones', name: 'Reportes automáticos por correo', desc: 'Recibe en tu inbox (diario o semanal) reportes de ventas, inventario o lo que necesites.', price: 2500, tools: ['n8n', 'Gmail'] },
  { id: 'notif-whatsapp', cat: 'conexiones', name: 'Notificaciones por WhatsApp', desc: 'Alertas a ti o a tu equipo por WhatsApp: pedidos, citas, pagos o avisos importantes.', price: 4000, tools: ['WhatsApp Business', 'Twilio'] },

  { id: 'web-simple', cat: 'sitios', name: 'Sitio web profesional', desc: 'Página de presentación de tu negocio: servicios, contacto y formularios.', price: 6500, tools: ['Next.js', 'WordPress'] },
  { id: 'web-catalogo', cat: 'sitios', name: 'Sitio con catálogo + WhatsApp', desc: 'Muestra tus productos o servicios y que te escriban directo por WhatsApp.', price: 9500, tools: ['Next.js', 'WhatsApp API'] },
  { id: 'web-tienda', cat: 'sitios', name: 'Tienda online con checkout por WhatsApp', desc: 'Catálogo con precios y pedidos que llegan a tu WhatsApp para cerrar la venta.', price: 14000, tools: ['Next.js', 'WhatsApp API'] },
  { id: 'web-whatsapp-boton', cat: 'sitios', name: 'Botón de WhatsApp en tu sitio actual', desc: 'Agregamos el botón flotante "Escríbenos" a la web que ya tienes.', price: 2000, tools: ['WhatsApp', 'JS'] },

  { id: 'agend-link', cat: 'agenda', name: 'Enlace para agendar citas', desc: 'Comparte un enlace donde tu cliente elige día y hora; queda en tu calendario.', price: 3000, tools: ['Calendly', 'Google Calendar'] },
  { id: 'agend-records', cat: 'agenda', name: 'Citas + recordatorios por WhatsApp', desc: 'Cada cita genera recordatorio automático para tu cliente, reduciendo cancelaciones.', price: 4500, tools: ['WhatsApp API', 'Google Calendar'] },
  { id: 'agend-consultorio', cat: 'agenda', name: 'Sistema de citas para consultorios', desc: 'Agenda de pacientes, historial de citas y recordatorios. Ideal para dentistas y médicos.', price: 9000, tools: ['n8n', 'Calendly', 'Sheets/DB'] },

  { id: 'doc-pdf', cat: 'docs', name: 'Formularios que generan PDF (cotizaciones)', desc: 'Tu cliente llena un formulario y se genera su cotización o documento en PDF automáticamente.', price: 4500, tools: ['Google Forms', 'n8n', 'PDF'] },
  { id: 'doc-recopila', cat: 'docs', name: 'Recopilación automática de información', desc: 'Reunimos datos de correos, webs o formularios en una base ordenada y lista para usar.', price: 6000, tools: ['n8n', 'Airtable', 'Sheets'] },
  { id: 'doc-genera', cat: 'docs', name: 'Generación de documentos finales', desc: 'Contratos, avalúos, reportes: se generan solos con la información de tu operación.', price: 5500, tools: ['n8n', 'Make', 'Docs API'] },

  { id: 'crm-basico', cat: 'crm', name: 'CRM básico de clientes', desc: 'Tus clientes, sus compras y su historial en un solo lugar.', price: 8000, tools: ['Airtable/DB', 'Sheets'] },
  { id: 'crm-seguimiento', cat: 'crm', name: 'CRM + seguimiento automático', desc: 'El sistema les escribe a tus clientes por email o WhatsApp para darles seguimiento.', price: 12500, tools: ['n8n', 'WhatsApp API'] },
  { id: 'crm-erp', cat: 'crm', name: 'ERP a la medida (inventario + ventas + clientes)', desc: 'Tu operación completa: pedidos, inventario, ventas, cobranza y reportes.', price: 25000, tools: ['Next.js', 'Base de datos', 'APIs'] },
  { id: 'crm-erp-auto', cat: 'crm', name: 'Automatizar tu ERP o sistema actual', desc: 'Conectamos lo que ya usas para que haga más solo y te dé reportes.', price: 10000, tools: ['n8n', 'Make', 'APIs'] },

  { id: 'ia-chat', cat: 'ia', name: 'Chatbot IA (Web / WhatsApp)', desc: 'Atiende las dudas más comunes de tus clientes las 24 horas, y lo humano lo toma una persona.', price: 6500, tools: ['OpenAI', 'n8n'] },
  { id: 'ia-docs', cat: 'ia', name: 'IA que analiza y resume documentos', desc: 'Contratos, facturas o informes: la IA los lee, resume y responde sobre su contenido.', price: 7000, tools: ['OpenAI', 'Docs'] },
  { id: 'ia-valid', cat: 'ia', name: 'IA que revisa y valida resultados', desc: 'Un proceso IA supervisado que revisa, valida y entrega resultados listos para aprobar.', price: 7500, tools: ['OpenAI', 'n8n'] },
  { id: 'ia-pipeline', cat: 'ia', name: 'IA para procesos completos (con supervisión)', desc: 'Un flujo completo: lee, analiza, da el resultado y te pide validación antes de ejecutar.', price: 12000, tools: ['OpenAI', 'n8n', 'WhatsApp API'] },
];

interface Pack {
  id: string;
  name: string;
  desc: string;
  icon: React.ComponentType<{ style?: React.CSSProperties }>;
  ids: string[];
}

const packs: Pack[] = [
  { id: 'pack-arranque', name: 'Arranque · Excel → Dashboard', desc: 'Tu Excel pasa a tablero en tiempo real con reportes automáticos a tu correo.', icon: Zap, ids: ['excel-dash-basic', 'excel-dash-auto', 'notif-email'] },
  { id: 'pack-negocio', name: 'Negocio conectado', desc: 'Sitio web + WhatsApp + notificaciones y un dashboard básico.', icon: Globe, ids: ['web-simple', 'web-whatsapp-boton', 'notif-whatsapp', 'excel-dash-basic'] },
  { id: 'pack-crecer', name: 'Crecer + IA', desc: 'CRM con seguimiento automático, dashboard que se actualiza solo y validación por IA.', icon: Sparkles, ids: ['crm-seguimiento', 'excel-dash-auto', 'ia-valid'] },
];

const freeTools = ['n8n', 'Make', 'Power BI', 'Looker Studio', 'WhatsApp Business', 'Google Calendar', 'Calendly', 'Sheets', 'Formularios públicas', 'OpenAI'];

export default function PreciosClient() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [withSupport, setWithSupport] = useState(false);

  const toggle = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const applyPack = (ids: string[]) => setSelected(new Set(ids));

  const sels = () => services.filter((s) => selected.has(s.id));
  const count = selected.size;
  const subtotal = sels().reduce((acc, s) => acc + s.price, 0);
  const discount = count >= 5 ? 0.15 : count >= 3 ? 0.10 : 0;
  const discountAmt = subtotal * discount;
  const total = subtotal - discountAmt;

  const grouped = cats.map((c) => ({ ...c, items: services.filter((s) => s.cat === c.key) }));

  const sendRequest = () => window.dispatchEvent(new Event('openContactModal'));

  return (
    <MotionConfig reducedMotion="user">
      <main className="grain" style={{ minHeight: '100vh', paddingTop: '7rem', paddingBottom: '6rem' }}>
        <Navbar />

        <div className="container">
          <div className="section-header">
            <span className="eyebrow">Cotiza en un minuto</span>
            <h1 className="heading-l" style={{ marginBottom: '1rem' }}>
              Precios <span className="text-gradient">claros,</span> en pesos.
            </h1>
            <p className="section-sub" style={{ maxWidth: '46rem' }}>
              Selecciona los servicios que necesitas y el costo se suma solo. Precios pensados para
              pequeñas empresas: usamos herramientas gratuitas cuando es posible y <b className="text-gray-300">solo cobramos la mano de obra y la configuración</b>.
            </p>
            <div className="flex flex-wrap gap-3" style={{ marginTop: '1.5rem' }}>
              <span className="chip">Pagos en parcialidades</span>
              <span className="chip">IVA no incluido</span>
              <span className="chip">Cotización sin compromiso</span>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="quote-layout">
            {/* ============ SERVICIOS ============ */}
            <div className="quote-main">
              {/* ============ COMBINACIONES ============ */}
              <section style={{ marginBottom: '3rem' }}>
                <div className="flex items-center gap-3" style={{ marginBottom: '1rem' }}>
                  <Sparkles style={{ width: '1.5rem', height: '1.5rem', color: 'var(--accent)' }} />
                  <h2 className="heading-m" style={{ fontSize: '1.35rem' }}>Combinaciones sugeridas</h2>
                </div>
                <p className="text-sm text-gray-500" style={{ marginBottom: '1.25rem' }}>
                  No sabes por dónde empezar: usa una de estas combinaciones y ajústala después.
                </p>
                <div className="packs-grid">
                  {packs.map((p) => (
                    <div key={p.id} className="bento-item pack-card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
                      <p.icon style={{ width: '2rem', height: '2rem', color: 'var(--accent-3)', marginBottom: '1rem' }} />
                      <h3 className="quote-name">{p.name}</h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', margin: '0.75rem 0 1.25rem' }}>
                        {p.ids.map((id) => {
                          const s = services.find((x) => x.id === id)!;
                          return (
                            <div key={id} className="flex items-start gap-2">
                              <Check style={{ width: '0.9rem', height: '0.9rem', color: 'var(--accent-3)', flexShrink: 0, marginTop: '2px' }} />
                              <span className="text-xs text-gray-300" style={{ lineHeight: '1.4' }}>{s.name}</span>
                            </div>
                          );
                        })}
                      </div>
                      <p className="text-sm text-gray-400" style={{ marginBottom: '1.25rem', lineHeight: '1.5' }}>{p.desc}</p>
                      <button onClick={() => applyPack(p.ids)} className="btn-ghost" style={{ marginTop: 'auto' }}>
                        Usar esta combinación
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              {grouped.map((cat) => (
                <section key={cat.key} style={{ marginBottom: '2.5rem' }}>
                  <div className="flex items-center gap-3" style={{ marginBottom: '1rem' }}>
                    <span className="cat-bar" style={{ background: cat.tint }} />
                    <cat.icon style={{ width: '1.5rem', height: '1.5rem', color: cat.tint }} />
                    <h2 className="heading-m" style={{ fontSize: '1.35rem' }}>{cat.label}</h2>
                  </div>
                  <p className="text-sm text-gray-500" style={{ marginBottom: '1.25rem' }}>{cat.blurb}</p>
                  <div className="quote-grid">
                    {cat.items.map((s) => {
                      const on = selected.has(s.id);
                      return (
                        <button
                          key={s.id}
                          onClick={() => toggle(s.id)}
                          className={`bento-item quote-card ${on ? 'quote-card--on' : ''}`}
                          style={{ textAlign: 'left', cursor: 'pointer', width: '100%', padding: '1.5rem' }}
                          aria-pressed={on}
                        >
                          <div className="flex items-center justify-between" style={{ marginBottom: '1.25rem' }}>
                            <span className="chip" style={{ background: 'rgba(204,255,0,0.1)' }}>{fmt(s.price)}</span>
                            <span className={`quote-check ${on ? 'quote-check--on' : ''}`}>
                              {on ? <Check style={{ width: '1rem', height: '1rem' }} /> : <Plus style={{ width: '1rem', height: '1rem' }} />}
                            </span>
                          </div>
                          <h3 className="quote-name">{s.name}</h3>
                          <p className="text-sm text-gray-400" style={{ lineHeight: '1.6' }}>{s.desc}</p>
                          {s.tools && (
                            <div className="flex flex-wrap gap-2" style={{ marginTop: '1rem' }}>
                              {s.tools.map((t) => (
                                <span key={t} className="quote-tool">{t}</span>
                              ))}
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </section>
              ))}

              {/* ============ CÓMO TRABAJAMOS ============ */}
              <section className="bento-item" id="cotiza-info" style={{ padding: '2rem' }}>
                <div className="flex items-center gap-3" style={{ marginBottom: '1rem' }}>
                  <HeartHandshake style={{ width: '1.5rem', height: '1.5rem', color: 'var(--accent)' }} />
                  <h2 className="heading-m" style={{ fontSize: '1.35rem' }}>Así trabajamos</h2>
                </div>
                <div className="flex flex-wrap gap-3" style={{ marginBottom: '1.5rem' }}>
                  {freeTools.map((t) => (
                    <span key={t} className="chip" style={{ borderColor: 'rgba(255,255,255,0.15)', color: '#d1d5db', background: 'rgba(255,255,255,0.03)' }}>{t}</span>
                  ))}
                </div>
                <ul className="quote-list">
                  <li>Usamos herramientas gratuitas (n8n, Power BI, WhatsApp Business, Calendly…) y <b className="text-gray-200">solo cobras la mano de obra y configuración</b>.</li>
                  <li>Cada solución nueva sale con <b className="text-gray-200">validación humana</b> antes de publicarse, sobre todo los procesos con IA.</li>
                  <li>Precios en pesos mexicanos, IVA no incluido. Aceptamos pagos en parcialidades.</li>
                  <li>Soporte incluido los primeros 30 días; después puedes contratar mantenimiento mensual.</li>
                </ul>
              </section>
            </div>

            {/* ============ RESUMEN ============ */}
            <aside className="quote-aside">
              <div className="bento-item" style={{ padding: '1.75rem' }}>
                <div className="flex items-center justify-between" style={{ marginBottom: '1.25rem' }}>
                  <h2 className="heading-m" style={{ fontSize: '1.25rem' }}>Tu cotización</h2>
                  {count > 0 && (
                    <button onClick={() => setSelected(new Set())} className="quote-clear">Limpiar</button>
                  )}
                </div>

                {count === 0 ? (
                  <p className="text-sm text-gray-500" style={{ lineHeight: '1.6', padding: '1rem 0' }}>
                    Selecciona servicios a la izquierda para calcular tu inversión.
                  </p>
                ) : (
                  <>
                    <div className="quote-list-items">
                      {sels().map((s) => (
                        <div key={s.id} className="quote-row">
                          <span className="text-sm text-gray-300" style={{ lineHeight: '1.4', flex: 1 }}>{s.name}</span>
                          <span className="text-sm font-bold text-gray-200" style={{ whiteSpace: 'nowrap' }}>{fmt(s.price)}</span>
                          <button onClick={() => toggle(s.id)} className="quote-x" aria-label={`Quitar ${s.name}`}>
                            <X style={{ width: '1rem', height: '1rem' }} />
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="quote-divider" />

                    <div className="flex items-center justify-between" style={{ marginBottom: '0.4rem' }}>
                      <span className="text-sm text-gray-400">Subtotal ({count} servicios)</span>
                      <span className="text-sm text-gray-300">{fmt(subtotal)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex items-center justify-between" style={{ marginBottom: '0.4rem' }}>
                        <span className="text-sm text-accent">Descuento por volumen ({Math.round(discount * 100)}%)</span>
                        <span className="text-sm text-accent">− {fmt(discountAmt)}</span>
                      </div>
                    )}

                    <div className="quote-total-line">
                      <span className="quote-total-label">Total a pagar</span>
                      <span className="quote-total-value">{fmt(total)}</span>
                    </div>

                    <label className="quote-support" style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={withSupport}
                        onChange={(e) => setWithSupport(e.target.checked)}
                        style={{ marginTop: '3px', accentColor: 'var(--accent)' }}
                      />
                      <span className="text-sm text-gray-300" style={{ lineHeight: '1.5' }}>
                        Soporte y mantenimiento mensual <span className="quote-rec">+ {fmt(490)}/mes</span>
                        <span className="block text-xs text-gray-500">Ajustes, reportes y soporte después de los 30 días.</span>
                      </span>
                    </label>
                  </>
                )}

                <div className="quote-divider" />

                <button onClick={sendRequest} className="btn-primary w-full" style={{ display: 'block', textAlign: 'center', cursor: 'pointer' }}>
                  Enviar solicitud de cotización
                </button>
                <p className="text-xs text-gray-500" style={{ marginTop: '0.75rem', textAlign: 'center', lineHeight: '1.5' }}>
                  Precios en <b className="text-gray-300">MXN</b> · IVA no incluido · Escríbenos y te detallamos el alcance.
                </p>

                <a
                  className="quote-mailto"
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); sendRequest(); }}
                  style={{ marginTop: '1rem' }}
                >
                  <MessageCircle style={{ width: '1rem', height: '1rem' }} />
                  chatear por el chat de la página
                </a>
              </div>
            </aside>
          </div>

          {/* ============ CTA FINAL ============ */}
          <div className="bento-grid" style={{ paddingTop: '3rem' }}>
            <div className="bento-item span-4" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.25rem', textAlign: 'center', padding: '3.5rem 2rem' }}>
              <Wallet style={{ width: '2.5rem', height: '2.5rem', color: 'var(--accent)' }} />
              <h2 className="section-title">¿No visualizas lo que necesitas?</h2>
              <p className="section-sub" style={{ textAlign: 'center', maxWidth: '38rem' }}>
                Escribenos lo que haces y te proponemos una automatización a la medida — con un precio fijo y claro en pesos.
              </p>
              <div className="flex flex-wrap gap-4" style={{ justifyContent: 'center' }}>
                <button onClick={sendRequest} className="btn-primary" style={{ cursor: 'pointer' }}>Cotizar a la medida</button>
                <a href="#cotiza-info" className="btn-ghost">Ver cómo trabajamos</a>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Barra móvil fija con total */}
      {count > 0 && (
        <div className="quote-mobilebar">
          <div>
            <p className="text-xs uppercase font-bold tracking-widest text-gray-500">Seleccionados · {count}</p>
            <p className="quote-total-value" style={{ fontSize: '1.25rem' }}>{fmt(total)}</p>
          </div>
          <button onClick={sendRequest} className="btn-primary" style={{ padding: '0.85rem 1.5rem', fontSize: '0.8rem', cursor: 'pointer' }}>
            <Send style={{ width: '1rem', height: '1rem', marginRight: '0.5rem', verticalAlign: '-2px' }} />
            Enviar cotización
          </button>
        </div>
      )}
    </MotionConfig>
  );
}