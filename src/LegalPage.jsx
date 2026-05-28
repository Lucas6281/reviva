// =======================================================================
//   LÓTUM — LEGAL PAGE
//   Componente reutilizable para renderizar documentos legales
//   (Términos, Privacidad, Defensa del Consumidor, Publicidad)
// =======================================================================
import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, MessageCircle, FileText, ChevronUp } from 'lucide-react';

const C = {
  bgDeep: '#0A1628', bgMid: '#13243F', bgSoft: '#1B2845',
  paper: '#F0EEE6', paperSoft: '#C9C8C0', muted: '#8A8B87',
  silver1: '#E8E8E8', silver3: '#8E8E8E',
  terracotta: '#D9663B', gold: '#C9A961',
  card: '#1B2845', cardSoft: '#243456', border: '#2D3F5F',
};
const fontDisplay = "'Fraunces', Georgia, serif";
const fontBody = "'Inter', system-ui, sans-serif";

const WHATSAPP_URL = "https://wa.me/5492235834453?text=Hola%20L%C3%B3tum!%20Tengo%20una%20consulta%20legal.";

function LotumLogo({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <defs>
        <linearGradient id={`legal-grad-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={C.terracotta} />
          <stop offset="100%" stopColor={C.gold} />
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="22" stroke={`url(#legal-grad-${size})`} strokeWidth="1.8" fill="none" opacity="0.9" />
      <path d="M14 12 L34 12 L24 24 L34 36 L14 36 L24 24 Z" fill={`url(#legal-grad-${size})`} />
    </svg>
  );
}

function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(15px)',
      transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
    }}>{children}</div>
  );
}

// =============================================================
//   BLOQUE DE CONTENIDO: renderiza diferentes tipos de contenido
// =============================================================
function ContentBlock({ block }) {
  if (block.type === 'p') {
    return <p style={{ color: C.paperSoft, fontSize: '1rem', lineHeight: 1.75, margin: '0 0 1.1rem' }}>{block.text}</p>;
  }
  if (block.type === 'h3') {
    return (
      <h3 style={{
        fontFamily: fontDisplay, fontSize: '1.25rem', fontWeight: 500,
        color: C.paper, margin: '2rem 0 1rem', lineHeight: 1.3,
      }}>{block.text}</h3>
    );
  }
  if (block.type === 'ul') {
    return (
      <ul style={{ margin: '0 0 1.2rem', padding: 0, listStyle: 'none' }}>
        {block.items.map((item, i) => (
          <li key={i} style={{
            display: 'flex', gap: '0.7rem', padding: '0.4rem 0',
            color: C.paperSoft, fontSize: '0.98rem', lineHeight: 1.65,
          }}>
            <span style={{
              flexShrink: 0, width: 5, height: 5, borderRadius: '50%',
              background: C.terracotta, marginTop: 11,
            }} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  }
  if (block.type === 'definitions') {
    return (
      <dl style={{ margin: '0 0 1.2rem' }}>
        {block.items.map(([term, def], i) => (
          <div key={i} style={{
            padding: '0.85rem 1rem', marginBottom: '0.5rem',
            background: `${C.bgDeep}60`, border: `1px solid ${C.border}80`,
            borderRadius: 10,
          }}>
            <dt style={{
              fontFamily: fontDisplay, fontStyle: 'italic', fontWeight: 500,
              color: C.gold, fontSize: '0.98rem', marginBottom: '0.3rem',
            }}>"{term}"</dt>
            <dd style={{ margin: 0, color: C.paperSoft, fontSize: '0.92rem', lineHeight: 1.6 }}>{def}</dd>
          </div>
        ))}
      </dl>
    );
  }
  if (block.type === 'table') {
    return (
      <div style={{
        margin: '0 0 1.5rem',
        background: `${C.bgDeep}60`,
        border: `1px solid ${C.border}`,
        borderRadius: 12,
        overflow: 'hidden',
      }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{
            width: '100%', borderCollapse: 'collapse',
            fontSize: '0.92rem', lineHeight: 1.5,
          }}>
            <thead>
              <tr style={{ background: `${C.terracotta}15` }}>
                {block.headers.map((header, i) => (
                  <th key={i} style={{
                    padding: '0.85rem 1rem', textAlign: 'left',
                    color: C.terracotta, fontWeight: 600,
                    fontSize: '0.78rem', letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    borderBottom: `1px solid ${C.border}`,
                  }}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i} style={{
                  borderBottom: i < block.rows.length - 1 ? `1px solid ${C.border}60` : 'none',
                }}>
                  {row.map((cell, j) => (
                    <td key={j} style={{
                      padding: '0.85rem 1rem', color: C.paperSoft,
                      verticalAlign: 'top',
                    }}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  if (block.type === 'highlight') {
    return (
      <div style={{
        margin: '1rem 0 1.5rem',
        padding: '1rem 1.2rem',
        background: `${C.gold}10`,
        border: `1px solid ${C.gold}40`,
        borderRadius: 10,
      }}>
        <p style={{
          color: C.paper, fontSize: '0.95rem', lineHeight: 1.65, margin: 0,
          fontWeight: 500,
        }}>{block.text}</p>
      </div>
    );
  }
  return null;
}

// =============================================================
//   META ITEM (Versión / Actualizado / Jurisdicción)
// =============================================================
function MetaItem({ label, value }) {
  return (
    <div style={{ textAlign: 'left' }}>
      <div style={{
        fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase',
        color: C.muted, fontWeight: 600, marginBottom: '0.25rem',
      }}>{label}</div>
      <div style={{
        color: C.paper, fontSize: '0.88rem', fontWeight: 500,
        fontFamily: fontBody,
      }}>{value}</div>
    </div>
  );
}

// =============================================================
//   SCROLL TOP
// =============================================================
function ScrollTopBtn() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  if (!visible) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      style={{
        position: 'fixed', bottom: 'calc(6rem + env(safe-area-inset-bottom, 0px))', right: '1.5rem',
        width: 48, height: 48, borderRadius: '50%',
        background: C.terracotta, border: 'none', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: `0 10px 25px ${C.terracotta}50`, zIndex: 90,
      }}
      aria-label="Volver arriba"
    >
      <ChevronUp size={22} color="#fff" />
    </button>
  );
}

// =============================================================
//   COMPONENTE PRINCIPAL
//   props:
//   - data: objeto con meta, preamble, acceptanceWarning, sections, annexes
//   - onGoBack: callback para volver al inicio
//   - badge: texto del pill superior (ej: "Documento legal")
//   - titlePrefix, titleHighlight: para mostrar "Título y <em>resaltado</em>"
//   - subtitle: descripción debajo del título
// =============================================================
export default function LegalPage({ data, onGoBack, badge, titlePrefix, titleHighlight, subtitle }) {
  return (
    <div style={{
      background: `linear-gradient(180deg, ${C.bgDeep} 0%, ${C.bgMid} 50%, ${C.bgSoft} 100%)`,
      minHeight: '100vh', color: C.paper, fontFamily: fontBody,
      paddingTop: 'env(safe-area-inset-top, 0px)',
      paddingBottom: 'env(safe-area-inset-bottom, 0px)',
    }}>
      {/* Header */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(10, 22, 40, 0.85)',
        backdropFilter: 'blur(20px) saturate(160%)',
        WebkitBackdropFilter: 'blur(20px) saturate(160%)',
        borderBottom: `1px solid ${C.border}60`,
        padding: '1rem 1.5rem',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={onGoBack}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: 'transparent', border: 'none', color: C.paperSoft,
              cursor: 'pointer', fontSize: '0.92rem', fontFamily: fontBody, padding: '0.3rem',
            }}
          >
            <ArrowLeft size={18} /> <span className="back-label">Volver al inicio</span>
          </button>
          <a href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none' }}>
            <LotumLogo size={30} />
            <span style={{
              fontFamily: fontDisplay, fontSize: '1.3rem', fontWeight: 500,
              background: `linear-gradient(90deg, ${C.silver1}, ${C.silver3}, ${C.silver1})`,
              WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
            }}>Lótum</span>
          </a>
        </div>
        <style>{`
          @media (max-width: 600px) { .back-label { display: none; } }
        `}</style>
      </header>

      {/* Hero del documento */}
      <section style={{ padding: '4rem 1.5rem 3rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
          background: `radial-gradient(ellipse 60% 50% at 50% 0%, ${C.terracotta}15 0%, transparent 60%)`,
        }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <Reveal>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.5rem 1rem', background: `${C.terracotta}15`,
              border: `1px solid ${C.terracotta}40`, borderRadius: 999,
              color: C.terracotta, fontSize: '0.74rem', fontWeight: 600,
              letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '2rem',
            }}>
              <FileText size={13} /> {badge || 'Documento legal'}
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h1 style={{
              fontFamily: fontDisplay, fontWeight: 400, fontSize: 'clamp(2rem, 4.5vw, 3.6rem)',
              lineHeight: 1.05, letterSpacing: '-0.02em', color: C.paper,
              margin: 0, marginBottom: '1rem',
            }}>
              {titlePrefix} <em style={{ color: C.gold, fontStyle: 'italic' }}>{titleHighlight}</em>
            </h1>
          </Reveal>
          {subtitle && (
            <Reveal delay={180}>
              <p style={{
                color: C.paperSoft, fontSize: '1.05rem', lineHeight: 1.6,
                margin: '0 auto', maxWidth: 600,
              }}>{subtitle}</p>
            </Reveal>
          )}
          <Reveal delay={260}>
            <div style={{
              display: 'inline-flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1.2rem',
              marginTop: '2rem', padding: '1rem 1.5rem',
              background: `${C.card}80`, border: `1px solid ${C.border}`,
              borderRadius: 14,
            }}>
              <MetaItem label="Versión" value={data.meta.version} />
              <MetaItem label="Actualizado" value={data.meta.updatedAt} />
              <MetaItem label="Jurisdicción" value={data.meta.jurisdiction || 'República Argentina'} />
            </div>
          </Reveal>
          {data.meta.note && (
            <Reveal delay={340}>
              <div style={{
                marginTop: '1.5rem',
                padding: '0.9rem 1.2rem',
                background: `${C.gold}10`, border: `1px solid ${C.gold}30`,
                borderRadius: 10, color: C.gold,
                fontSize: '0.85rem', fontStyle: 'italic',
                fontFamily: fontDisplay,
                maxWidth: 600, margin: '1.5rem auto 0',
              }}>
                {data.meta.note}. Sujeto a revisión legal antes del lanzamiento oficial.
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* Layout principal: índice lateral + contenido */}
      <section style={{ padding: '2rem 1.5rem 5rem', position: 'relative' }}>
        <div className="legal-layout" style={{ maxWidth: 1100, margin: '0 auto' }}>
          {/* Índice (sticky en desktop) */}
          <aside className="legal-index" style={{
            background: `${C.card}80`,
            border: `1px solid ${C.border}`,
            borderRadius: 16, padding: '1.4rem',
            marginBottom: '2rem',
          }}>
            <div style={{
              fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase',
              color: C.terracotta, fontWeight: 600, marginBottom: '1rem',
            }}>Índice</div>
            <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {data.sections.map((s) => (
                <li key={s.id} style={{ marginBottom: '0.35rem' }}>
                  <a href={`#${s.id}`} style={{
                    display: 'flex', gap: '0.6rem',
                    color: C.paperSoft, textDecoration: 'none',
                    fontSize: '0.88rem', lineHeight: 1.4, padding: '0.3rem 0',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.color = C.terracotta}
                  onMouseLeave={(e) => e.currentTarget.style.color = C.paperSoft}
                  >
                    <span style={{
                      color: C.gold, fontFamily: fontDisplay,
                      fontWeight: 500, minWidth: 22, fontSize: '0.95rem',
                    }}>{s.number}.</span>
                    <span>{s.title}</span>
                  </a>
                </li>
              ))}
            </ol>
            {data.annexes && data.annexes.length > 0 && (
              <>
                <hr style={{ border: 'none', borderTop: `1px solid ${C.border}`, margin: '1rem 0' }} />
                <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {data.annexes.map((a) => (
                    <li key={a.id} style={{ marginBottom: '0.35rem' }}>
                      <a href={`#${a.id}`} style={{
                        display: 'block', color: C.paperSoft, textDecoration: 'none',
                        fontSize: '0.85rem', lineHeight: 1.4, padding: '0.3rem 0',
                        transition: 'color 0.2s',
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = C.terracotta}
                      onMouseLeave={(e) => e.currentTarget.style.color = C.paperSoft}
                      >{a.title}</a>
                    </li>
                  ))}
                </ol>
              </>
            )}
          </aside>

          {/* Contenido */}
          <article className="legal-content" style={{
            background: `${C.card}60`,
            border: `1px solid ${C.border}`,
            borderRadius: 18, padding: 'clamp(1.5rem, 4vw, 3rem)',
          }}>
            {/* Preámbulo */}
            {data.preamble && (
              <Reveal>
                <div style={{ marginBottom: '2rem' }}>
                  <div style={{
                    fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase',
                    color: C.terracotta, fontWeight: 600, marginBottom: '0.8rem',
                  }}>{data.preambleTitle || 'Preámbulo'}</div>
                  {data.preamble.split('\n\n').map((para, i) => (
                    <p key={i} style={{
                      color: C.paperSoft, fontSize: '1rem', lineHeight: 1.75,
                      margin: '0 0 1.1rem',
                    }}>{para}</p>
                  ))}
                  {data.acceptanceWarning && (
                    <div style={{
                      marginTop: '1.5rem', padding: '1.1rem 1.3rem',
                      background: `${C.terracotta}12`, border: `1px solid ${C.terracotta}40`,
                      borderRadius: 12,
                    }}>
                      <p style={{
                        color: C.paper, fontSize: '0.88rem', lineHeight: 1.6,
                        margin: 0, fontWeight: 500, letterSpacing: '0.01em',
                      }}>{data.acceptanceWarning}</p>
                    </div>
                  )}
                </div>
              </Reveal>
            )}

            {/* Secciones */}
            {data.sections.map((section) => (
              <section key={section.id} id={section.id} style={{ scrollMarginTop: 90, marginTop: '3rem' }}>
                <Reveal>
                  <div style={{
                    display: 'flex', alignItems: 'baseline', gap: '0.7rem',
                    marginBottom: '1.5rem', paddingBottom: '0.9rem',
                    borderBottom: `1px solid ${C.border}`,
                  }}>
                    <span style={{
                      fontFamily: fontDisplay, fontSize: '2rem', fontWeight: 500,
                      color: C.gold, lineHeight: 1,
                    }}>{section.number}.</span>
                    <h2 style={{
                      fontFamily: fontDisplay, fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)',
                      fontWeight: 500, color: C.paper, margin: 0, lineHeight: 1.2,
                    }}>{section.title}</h2>
                  </div>
                  {section.content.map((block, i) => (
                    <ContentBlock key={i} block={block} />
                  ))}
                </Reveal>
              </section>
            ))}

            {/* Box de cierre (Aceptación expresa o Declaración final) */}
            {data.closingBox && (
              <Reveal>
                <div style={{
                  marginTop: '4rem',
                  padding: '1.8rem',
                  background: `linear-gradient(135deg, ${C.terracotta}20, ${C.gold}15)`,
                  border: `1px solid ${C.terracotta}50`,
                  borderRadius: 16,
                }}>
                  <div style={{
                    fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase',
                    color: C.terracotta, fontWeight: 600, marginBottom: '0.8rem',
                  }}>{data.closingBox.title}</div>
                  <p style={{
                    color: C.paper, fontSize: '0.95rem', lineHeight: 1.65,
                    margin: 0, fontWeight: 500,
                  }}>{data.closingBox.text}</p>
                </div>
              </Reveal>
            )}

            {/* Anexos */}
            {data.annexes && data.annexes.length > 0 && (
              <div style={{ marginTop: '4rem' }}>
                <h2 style={{
                  fontFamily: fontDisplay, fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                  fontWeight: 500, color: C.paper, margin: '0 0 2rem',
                  lineHeight: 1.2,
                }}>Anexos</h2>
                {data.annexes.map((annex) => (
                  <section key={annex.id} id={annex.id} style={{ scrollMarginTop: 90, marginBottom: '2.5rem' }}>
                    <Reveal>
                      <h3 style={{
                        fontFamily: fontDisplay, fontSize: '1.3rem', fontWeight: 500,
                        color: C.gold, margin: '0 0 1.2rem',
                      }}>{annex.title}</h3>
                      {annex.content.map((block, i) => (
                        <ContentBlock key={i} block={block} />
                      ))}
                    </Reveal>
                  </section>
                ))}
              </div>
            )}

            {/* Cierre */}
            <Reveal>
              <div style={{
                marginTop: '4rem', paddingTop: '2rem',
                borderTop: `1px solid ${C.border}`, textAlign: 'center',
              }}>
                <p style={{
                  fontFamily: fontDisplay, fontStyle: 'italic',
                  color: C.muted, fontSize: '0.9rem', margin: 0,
                }}>— Fin del documento —</p>
                <p style={{
                  color: C.muted, fontSize: '0.78rem', margin: '0.6rem 0 0',
                }}>
                  Documento de trabajo sujeto a revisión legal antes de su publicación.
                </p>
              </div>
            </Reveal>
          </article>
        </div>

        <style>{`
          @media (min-width: 920px) {
            .legal-layout {
              display: grid;
              grid-template-columns: 260px 1fr;
              gap: 2.5rem;
              align-items: start;
            }
            .legal-index {
              position: sticky;
              top: 90px;
              margin-bottom: 0 !important;
              max-height: calc(100vh - 110px);
              overflow-y: auto;
            }
          }
        `}</style>
      </section>

      {/* Footer simple */}
      <footer style={{
        padding: '2.5rem 1.5rem',
        borderTop: `1px solid ${C.border}`,
        background: `${C.bgDeep}80`,
      }}>
        <div style={{
          maxWidth: 1100, margin: '0 auto',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          gap: '1rem', flexWrap: 'wrap',
        }}>
          <a href="/" style={{
            display: 'flex', alignItems: 'center', gap: '0.6rem', textDecoration: 'none',
          }}>
            <LotumLogo size={28} />
            <span style={{ color: C.paperSoft, fontSize: '0.92rem' }}>
              Volver a lotum.com.ar
            </span>
          </a>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            color: '#25D366', textDecoration: 'none', fontSize: '0.92rem', fontWeight: 500,
          }}>
            <MessageCircle size={16} /> Consultas por WhatsApp
          </a>
        </div>
        <p style={{
          textAlign: 'center', color: C.muted, fontSize: '0.78rem',
          margin: '1.5rem 0 0',
        }}>© 2026 Lótum · Inversión inmobiliaria · Argentina</p>
      </footer>

      <ScrollTopBtn />
    </div>
  );
}
