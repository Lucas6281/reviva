// =======================================================================
//   LÓTUM — PÁGINA DE MODALIDADES
//   Tabs interactivas A/B/C/D con descripción + cuándo conviene +
//   ventajas + pasos del proceso + ejemplo numérico real
// =======================================================================
import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, MessageCircle, Hammer, Zap, Wallet, Briefcase, CheckCircle2, AlertCircle, ChevronUp } from 'lucide-react';

const C = {
  bgDeep: '#0A1628', bgMid: '#13243F', bgSoft: '#1B2845',
  paper: '#F0EEE6', paperSoft: '#C9C8C0', muted: '#8A8B87',
  silver1: '#E8E8E8', silver3: '#8E8E8E',
  terracotta: '#D9663B', gold: '#C9A961',
  card: '#1B2845', cardSoft: '#243456', border: '#2D3F5F',
  // Colores específicos de cada modalidad (matching con la app)
  modA: '#D9663B',    // terracota — Reciclado a futuro
  modB: '#5B8BB5',    // azul claro — Contado + reciclado
  modC: '#6FA77F',    // verde claro — Compra simple
  modD: '#C9A961',    // dorado — Inversor a futuro
};
const fontDisplay = "'Fraunces', Georgia, serif";
const fontBody = "'Inter', system-ui, sans-serif";

const WHATSAPP_URL = "https://wa.me/5492235834453?text=Hola%20L%C3%B3tum!%20Quiero%20info%20sobre%20las%20modalidades.";

// =============================================================
//   DATOS DE LAS 4 MODALIDADES
// =============================================================
const MODALIDADES = [
  {
    id: 'A',
    code: 'Modalidad A',
    name: 'Reciclado a futuro',
    short: 'Reciclado',
    color: '#D9663B',
    icon: Hammer,
    tagline: 'El inversor financia la obra. El propietario cobra un 10% más por esperar el proceso completo.',
    forOwner: 'Cobrás un 10% más por esperar',
    forInvestor: 'No comprás la propiedad, ganás con la obra y la venta',
    summary: 'El propietario sigue siendo dueño durante todo el proceso. Acepta esperar el reciclado y la venta a cambio de cobrar un 10% más sobre lo que pedía. El inversor pone toda la inversión de obra, decide el precio de venta final, y se queda con todo el excedente que supere lo pactado.',
    whenItFits: [
      'Tenés una propiedad que necesita reciclado pero no tenés capital para hacerlo.',
      'No necesitás la plata urgente — podés esperar 6 a 12 meses.',
      'Querés cobrar más que el precio de mercado actual de tu propiedad "tal como está".',
      'Preferís no perder la titularidad hasta que se concrete la venta final.',
    ],
    howItWorks: [
      'El propietario publica su propiedad indicando el precio que quiere recibir.',
      'Lótum proyecta el valor post-reciclado y el costo aproximado de obra.',
      'Se le ofrece al propietario su precio + 10% extra por aceptar esperar el proceso.',
      'Si acepta, se firma contrato: precio final al propietario queda fijo desde el día 1.',
      'El inversor ejecuta la obra (materiales + mano de obra) por su cuenta.',
      'El inversor decide el precio de venta final (el propietario ya no tiene incidencia).',
      'Cuando se vende: PRIMERO cobra el propietario su precio pactado, después el inversor se queda con todo lo demás (su inversión recuperada + ganancia).',
    ],
    example: {
      title: 'Ejemplo numérico real',
      rows: [
        ['Propietario pide', 'US$ 50.000', 'neutral'],
        ['Se le ofrece (+10%)', 'US$ 55.000', 'positive'],
        ['Inversión en obra (inversor)', 'US$ 30.000', 'neutral'],
        ['Venta post-reciclado', 'US$ 110.000', 'positive'],
        ['Cobra primero propietario', 'US$ 55.000', 'positive'],
        ['Recupera inversor su obra', 'US$ 30.000', 'neutral'],
        ['Ganancia inversor (excedente)', 'US$ 25.000', 'positive'],
      ],
    },
    benefitsOwner: [
      'No invertís nada de tu plata',
      'Cobrás 10% más que lo que pedías',
      'Tu precio queda fijo desde el día 1',
      'Cobrás antes que el inversor cuando se vende',
    ],
    benefitsInvestor: [
      'No comprás la propiedad, solo invertís en obra',
      'Vos decidís el precio de venta final',
      'Te quedás con todo el excedente sobre lo pactado',
      'Ganancia proyectada sobre datos reales',
    ],
    risks: [
      'Si no se vende en el plazo, se renegocia o se cede según contrato',
      'Caída de mercado puede demorar venta o achicar ganancia del inversor',
      'El propietario tiene su precio garantizado por contrato',
    ],
    typicalTime: '6 a 12 meses',
  },
  {
    id: 'B',
    code: 'Modalidad B',
    name: 'Compra de contado + reciclado',
    short: 'Contado + obra',
    color: '#5B8BB5',
    icon: Zap,
    tagline: 'El inversor compra la propiedad de contado y se queda con el reciclado.',
    forOwner: 'Cobrás ya, aceptando un valor menor',
    forInvestor: 'Comprás barato, reciclás y revendés',
    summary: 'El propietario vende ahora a un precio con descuento. El inversor se queda con la propiedad, la recicla por su cuenta, y revende quedándose con toda la ganancia.',
    whenItFits: [
      'Necesitás liquidez inmediata y no querés esperar el proceso de reciclado.',
      'Estás dispuesto a resignar parte del valor de mercado a cambio de cobrar al instante.',
      'No querés ningún tipo de responsabilidad post-venta.',
      'Tu propiedad necesita reciclado y vos no querés ocuparte.',
    ],
    howItWorks: [
      'El propietario necesita liquidez inmediata y acepta un descuento.',
      'Un inversor le ofrece un precio de contado (menor al de mercado).',
      'Si llegan a un acuerdo, se firma escritura. Propietario cobra al instante.',
      'El inversor pasa a ser dueño y financia toda la obra.',
      'Cuando termina la obra, vende la propiedad al precio actualizado de mercado.',
      'La ganancia entre compra + obra vs venta final es 100% del inversor.',
    ],
    example: {
      title: 'Ejemplo numérico real',
      rows: [
        ['Propietario pedía', 'US$ 65.000', 'neutral'],
        ['Inversor compró en', 'US$ 50.000 (contado)', 'positive'],
        ['Inversión en obra', 'US$ 25.000', 'neutral'],
        ['Venta post-reciclado', 'US$ 110.000', 'positive'],
        ['Ganancia inversor', 'US$ 35.000', 'positive'],
        ['Tiempo total', '6-8 meses', 'neutral'],
      ],
    },
    benefitsOwner: [
      'Cobrás todo al instante',
      'No esperás obras ni ventas',
      'Ideal si necesitás la plata ya',
      'Sin responsabilidad post-venta',
    ],
    benefitsInvestor: [
      'Te quedás con toda la ganancia',
      'Sos único dueño desde día 1',
      'Controlás 100% del proceso',
      'Comprás barato y revendés a precio de mercado',
    ],
    risks: [
      'Propietario resigna parte del valor por la liquidez',
      'Inversor asume todo el riesgo de obra y venta',
      'Volatilidad del mercado durante el proceso',
    ],
    typicalTime: '6 a 8 meses',
  },
  {
    id: 'C',
    code: 'Modalidad C',
    name: 'Compra simple de contado',
    short: 'Solo contado',
    color: '#6FA77F',
    icon: Wallet,
    tagline: 'El inversor compra al contado. No hay obra de por medio.',
    forOwner: 'Cobrás ya, valor de contado',
    forInvestor: 'Comprás esperando revalorización del mercado',
    summary: 'Compra-venta tradicional pero sin inmobiliarias. El propietario vende, el inversor compra. Ahorran el 6% de comisión que cobran las inmobiliarias.',
    whenItFits: [
      'Tu propiedad no necesita obra ni reciclado.',
      'Querés vender directo, sin intermediarios y sin comisiones inmobiliarias.',
      'Buscás ahorrar el 6% de comisión que cobran las inmobiliarias tradicionales.',
      'Tenés un comprador o querés conectar con inversores directamente.',
    ],
    howItWorks: [
      'El propietario publica la propiedad al precio que quiere obtener.',
      'Un inversor (o comprador final) hace una oferta.',
      'Negocian directamente, sin intermediarios.',
      'Se firma escritura con escribanía integrada de Lótum.',
      'Propietario cobra, inversor toma posesión. Listo.',
      'Sin comisión inmobiliaria del 6%. Solo 1,5% de Lótum a cada parte.',
    ],
    example: {
      title: 'Ejemplo numérico real',
      rows: [
        ['Propietario publica en', 'US$ 80.000', 'neutral'],
        ['Compra inversor a', 'US$ 75.000 (negociado)', 'positive'],
        ['Comisión Lótum (1,5%)', 'US$ 1.125 cada parte', 'neutral'],
        ['Vs inmobiliaria 6%', 'US$ 4.500', 'negative'],
        ['Ahorro propietario', 'US$ 3.375', 'positive'],
        ['Tiempo de cierre', '15-30 días', 'neutral'],
      ],
    },
    benefitsOwner: [
      'Cobrás al instante',
      'Ahorrás hasta 75% en comisiones',
      'Sin agentes que demoran',
      'Trato directo con el comprador',
    ],
    benefitsInvestor: [
      'Comprás directo, sin intermediarios',
      'Apostás a revalorización del mercado',
      'Ideal para inversión a mediano plazo',
      'Sin pagar comisión inmobiliaria',
    ],
    risks: [
      'Necesitás liquidez completa al firmar',
      'No hay garantía de revalorización rápida',
      'Dependencia del mercado',
    ],
    typicalTime: '15 a 30 días',
  },
  {
    id: 'D',
    code: 'Modalidad D',
    name: 'Inversor a futuro',
    short: 'A futuro',
    color: '#C9A961',
    icon: Briefcase,
    tagline: 'El propietario no puede esperar el proceso. Un inversor le compra hoy a precio negociado, sabiendo el valor post-reciclado.',
    forOwner: 'Cobrás ya, sin esperar todo el proceso',
    forInvestor: 'Comprás con ganancia ya proyectada al cierre',
    summary: 'El propietario tiene una oferta de reciclado a futuro pero no puede esperar los meses del proceso. Un inversor entra y le compra al contado a un valor negociado, sabiendo cuánto valdrá la propiedad post-reciclado. Ganancia proyectada con bajo riesgo.',
    whenItFits: [
      'Ya recibiste una oferta de "Reciclado a futuro" (Modalidad A) pero te surgió una urgencia.',
      'Necesitás cobrar antes de que termine el proceso de obra y venta.',
      'Sos inversor y querés entrar a una operación con datos reales y proyección clara.',
      'Querés bajo riesgo porque ya hay un valor post-reciclado estimado por Lótum.',
    ],
    howItWorks: [
      'El propietario tiene una propiedad que ya fue cotizada con valor post-reciclado.',
      'Recibió una oferta de "Reciclado a futuro" (modalidad A) pero no puede esperar.',
      'Un inversor entra a hacer una oferta de compra inmediata.',
      'El inversor sabe el valor post-reciclado, entonces puede calcular su ganancia con precisión.',
      'Propietario e inversor negocian un precio de contado.',
      'Inversor pasa a ser propietario y continúa con el proceso de reciclado y venta.',
    ],
    example: {
      title: 'Ejemplo numérico real',
      rows: [
        ['Propietario publica en', 'US$ 50.000', 'neutral'],
        ['Oferta original (con espera)', 'US$ 55.000', 'neutral'],
        ['No puede esperar el proceso', '—', 'negative'],
        ['Inversor ofrece', 'US$ 40.000', 'neutral'],
        ['Cierran negociación en', 'US$ 45.000', 'positive'],
        ['Ganancia proyectada inversor', 'US$ 10.000', 'positive'],
      ],
    },
    benefitsOwner: [
      'Cobrás todo hoy mismo',
      'No dependés del proceso de obra ni venta',
      'Solución rápida ante urgencia',
      'Sin responsabilidad post-venta',
    ],
    benefitsInvestor: [
      'Ganancia calculada con precisión',
      'Bajo riesgo porque ya hay valor post-reciclado estimado',
      'Entrás a una operación con datos reales',
      'Te quedás con la propiedad y decidís el proceso',
    ],
    risks: [
      'Propietario cede parte del valor por la urgencia',
      'Inversor asume riesgo de obra y mercado',
      'Negociación depende del nivel de urgencia del propietario',
    ],
    typicalTime: 'Negociación en días, proceso completo 6-12 meses',
  },
];

// =============================================================
//   LOGO LÓTUM
// =============================================================
function LotumLogo({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <defs>
        <linearGradient id={`mods-grad-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={C.terracotta} />
          <stop offset="100%" stopColor={C.gold} />
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="22" stroke={`url(#mods-grad-${size})`} strokeWidth="1.8" fill="none" opacity="0.9" />
      <path d="M14 12 L34 12 L24 24 L34 36 L14 36 L24 24 Z" fill={`url(#mods-grad-${size})`} />
    </svg>
  );
}

// =============================================================
//   ANIMACIÓN REVEAL
// =============================================================
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
//   CARD DE MODALIDAD (contenido del tab activo)
// =============================================================
function ModalidadCard({ mod, onGoToApp }) {
  const Icon = mod.icon;
  const accent = mod.color;

  return (
    <div style={{ marginTop: '2rem' }}>
      {/* HERO de la modalidad */}
      <Reveal>
        <div style={{
          padding: 'clamp(1.5rem, 4vw, 2.5rem)',
          background: `linear-gradient(135deg, ${accent}25, ${accent}08)`,
          border: `1px solid ${accent}50`,
          borderRadius: 20,
          marginBottom: '2rem',
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.7rem',
            marginBottom: '1rem',
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12,
              background: accent, display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              boxShadow: `0 8px 20px ${accent}50`,
            }}>
              <Icon size={22} color="#fff" />
            </div>
            <div>
              <div style={{
                fontSize: '0.72rem', letterSpacing: '0.14em',
                textTransform: 'uppercase', color: accent, fontWeight: 700,
              }}>{mod.code}</div>
            </div>
          </div>
          <h2 style={{
            fontFamily: fontDisplay, fontWeight: 400,
            fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', lineHeight: 1.1,
            color: C.paper, margin: '0 0 0.8rem', letterSpacing: '-0.01em',
          }}>{mod.name}</h2>
          <p style={{
            color: C.paperSoft, fontSize: '1rem', lineHeight: 1.6,
            margin: 0, maxWidth: 700,
          }}>{mod.tagline}</p>

          {/* Subcards Propietario/Inversor/Tiempo */}
          <div className="modhero-grid" style={{
            display: 'grid', gridTemplateColumns: '1fr', gap: '0.8rem',
            marginTop: '1.5rem',
          }}>
            <div style={{
              padding: '0.9rem 1rem',
              background: `${C.bgDeep}80`, border: `1px solid ${C.border}`,
              borderRadius: 12,
            }}>
              <div style={{
                fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase',
                color: C.muted, fontWeight: 600, marginBottom: '0.3rem',
              }}>Para el propietario</div>
              <div style={{ color: C.paper, fontSize: '0.95rem', fontWeight: 500 }}>{mod.forOwner}</div>
            </div>
            <div style={{
              padding: '0.9rem 1rem',
              background: `${C.bgDeep}80`, border: `1px solid ${C.border}`,
              borderRadius: 12,
            }}>
              <div style={{
                fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase',
                color: C.muted, fontWeight: 600, marginBottom: '0.3rem',
              }}>Para el inversor</div>
              <div style={{ color: C.paper, fontSize: '0.95rem', fontWeight: 500 }}>{mod.forInvestor}</div>
            </div>
            <div style={{
              padding: '0.9rem 1rem',
              background: `${C.bgDeep}80`, border: `1px solid ${C.border}`,
              borderRadius: 12,
            }}>
              <div style={{
                fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase',
                color: C.muted, fontWeight: 600, marginBottom: '0.3rem',
              }}>Tiempo típico</div>
              <div style={{ color: C.paper, fontSize: '0.95rem', fontWeight: 500 }}>{mod.typicalTime}</div>
            </div>
          </div>
          <style>{`
            @media (min-width: 720px) {
              .modhero-grid {
                grid-template-columns: 1fr 1fr 1fr;
              }
            }
          `}</style>
        </div>
      </Reveal>

      {/* DESCRIPCIÓN */}
      <Reveal>
        <Section title="Cómo funciona en breve" accent={accent}>
          <p style={{
            color: C.paperSoft, fontSize: '1rem', lineHeight: 1.7,
            margin: 0,
          }}>{mod.summary}</p>
        </Section>
      </Reveal>

      {/* CUÁNDO CONVIENE */}
      <Reveal>
        <Section title="Cuándo conviene esta modalidad" accent={accent}>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
            {mod.whenItFits.map((item, i) => (
              <li key={i} style={{
                display: 'flex', gap: '0.8rem', padding: '0.6rem 0',
                color: C.paperSoft, fontSize: '0.98rem', lineHeight: 1.6,
                borderBottom: i < mod.whenItFits.length - 1 ? `1px solid ${C.border}40` : 'none',
              }}>
                <span style={{
                  flexShrink: 0, width: 24, height: 24, borderRadius: '50%',
                  background: `${accent}25`, color: accent,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.75rem', fontWeight: 700, marginTop: 2,
                }}>{i + 1}</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Section>
      </Reveal>

      {/* VENTAJAS PROPIETARIO + INVERSOR */}
      <Reveal>
        <Section title="Ventajas" accent={accent}>
          <div className="benefits-grid" style={{
            display: 'grid', gridTemplateColumns: '1fr', gap: '1rem',
          }}>
            {/* Propietario */}
            <div style={{
              padding: '1.2rem',
              background: `${C.bgDeep}80`,
              border: `1px solid ${C.border}`,
              borderRadius: 14,
            }}>
              <div style={{
                fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase',
                color: accent, fontWeight: 700, marginBottom: '0.8rem',
              }}>Para el propietario</div>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                {mod.benefitsOwner.map((item, i) => (
                  <li key={i} style={{
                    display: 'flex', gap: '0.6rem', padding: '0.4rem 0',
                    color: C.paperSoft, fontSize: '0.92rem', lineHeight: 1.5,
                  }}>
                    <CheckCircle2 size={16} color={accent} style={{ flexShrink: 0, marginTop: 3 }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Inversor */}
            <div style={{
              padding: '1.2rem',
              background: `${C.bgDeep}80`,
              border: `1px solid ${C.border}`,
              borderRadius: 14,
            }}>
              <div style={{
                fontSize: '0.7rem', letterSpacing: '0.14em', textTransform: 'uppercase',
                color: accent, fontWeight: 700, marginBottom: '0.8rem',
              }}>Para el inversor</div>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                {mod.benefitsInvestor.map((item, i) => (
                  <li key={i} style={{
                    display: 'flex', gap: '0.6rem', padding: '0.4rem 0',
                    color: C.paperSoft, fontSize: '0.92rem', lineHeight: 1.5,
                  }}>
                    <CheckCircle2 size={16} color={accent} style={{ flexShrink: 0, marginTop: 3 }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <style>{`
            @media (min-width: 720px) {
              .benefits-grid {
                grid-template-columns: 1fr 1fr;
              }
            }
          `}</style>
        </Section>
      </Reveal>

      {/* PASOS DEL PROCESO */}
      <Reveal>
        <Section title="Pasos del proceso" accent={accent}>
          <ol style={{ margin: 0, padding: 0, listStyle: 'none', counterReset: 'step' }}>
            {mod.howItWorks.map((step, i) => (
              <li key={i} style={{
                position: 'relative', paddingLeft: '3rem', paddingBottom: '1.2rem',
                marginBottom: i < mod.howItWorks.length - 1 ? '0.3rem' : 0,
                borderLeft: i < mod.howItWorks.length - 1 ? `2px solid ${accent}30` : '2px solid transparent',
                marginLeft: '1.1rem',
              }}>
                <span style={{
                  position: 'absolute', left: '-1.15rem', top: '-0.1rem',
                  width: 36, height: 36, borderRadius: '50%',
                  background: accent, color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.85rem', fontWeight: 700,
                  boxShadow: `0 4px 12px ${accent}60`,
                  fontFamily: fontDisplay,
                }}>{i + 1}</span>
                <p style={{
                  color: C.paperSoft, fontSize: '0.96rem', lineHeight: 1.6,
                  margin: 0, paddingTop: '0.3rem',
                }}>{step}</p>
              </li>
            ))}
          </ol>
        </Section>
      </Reveal>

      {/* EJEMPLO NUMÉRICO */}
      <Reveal>
        <Section title={mod.example.title} accent={accent}>
          <div style={{
            background: `${C.bgDeep}80`,
            border: `1px solid ${accent}40`,
            borderRadius: 14,
            overflow: 'hidden',
          }}>
            <table style={{
              width: '100%', borderCollapse: 'collapse',
              fontSize: '0.95rem',
            }}>
              <tbody>
                {mod.example.rows.map(([label, value, type], i) => {
                  const valueColor = type === 'positive' ? accent : type === 'negative' ? '#E07A5F' : C.paper;
                  return (
                    <tr key={i} style={{
                      borderBottom: i < mod.example.rows.length - 1 ? `1px solid ${C.border}60` : 'none',
                    }}>
                      <td style={{
                        padding: '0.85rem 1.1rem',
                        color: C.paperSoft, fontSize: '0.92rem',
                        verticalAlign: 'middle',
                      }}>{label}</td>
                      <td style={{
                        padding: '0.85rem 1.1rem',
                        color: valueColor, fontWeight: 600,
                        textAlign: 'right', fontFamily: fontDisplay,
                        fontSize: '1.05rem',
                        verticalAlign: 'middle', whiteSpace: 'nowrap',
                      }}>{value}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p style={{
            color: C.muted, fontSize: '0.78rem', lineHeight: 1.5,
            margin: '0.8rem 0 0', fontStyle: 'italic',
          }}>Los valores son orientativos a modo ejemplo. Cada operación se evalúa individualmente.</p>
        </Section>
      </Reveal>

      {/* RIESGOS */}
      <Reveal>
        <Section title="A tener en cuenta" accent="#E07A5F" icon={AlertCircle}>
          <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
            {mod.risks.map((item, i) => (
              <li key={i} style={{
                display: 'flex', gap: '0.7rem', padding: '0.5rem 0',
                color: C.paperSoft, fontSize: '0.95rem', lineHeight: 1.6,
              }}>
                <span style={{
                  flexShrink: 0, width: 6, height: 6, borderRadius: '50%',
                  background: '#E07A5F', marginTop: 10,
                }} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Section>
      </Reveal>

      {/* CTA al final de cada modalidad */}
      <Reveal>
        <div style={{
          marginTop: '2.5rem',
          padding: 'clamp(1.5rem, 4vw, 2.2rem)',
          background: `linear-gradient(135deg, ${accent}25, ${accent}08)`,
          border: `1px solid ${accent}50`,
          borderRadius: 18, textAlign: 'center',
        }}>
          <h3 style={{
            fontFamily: fontDisplay, fontSize: 'clamp(1.3rem, 2.5vw, 1.6rem)',
            fontWeight: 500, color: C.paper, margin: '0 0 0.6rem',
            letterSpacing: '-0.01em',
          }}>¿Te interesa esta modalidad?</h3>
          <p style={{
            color: C.paperSoft, fontSize: '0.95rem', lineHeight: 1.5,
            margin: '0 0 1.5rem', maxWidth: 500, marginLeft: 'auto', marginRight: 'auto',
          }}>Ingresá a la app de Lótum y publicá tu propiedad indicando que aceptás esta modalidad.</p>
          <div style={{
            display: 'flex', gap: '0.8rem', justifyContent: 'center', flexWrap: 'wrap',
          }}>
            <button onClick={onGoToApp} style={{
              padding: '0.85rem 1.6rem', borderRadius: 999,
              background: accent, color: '#fff', border: 'none',
              fontSize: '0.95rem', fontWeight: 600, cursor: 'pointer',
              fontFamily: fontBody, display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              boxShadow: `0 8px 20px ${accent}50`,
            }}>
              Ingresar a la app <ArrowRight size={16} />
            </button>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" style={{
              padding: '0.85rem 1.6rem', borderRadius: 999,
              background: 'transparent', color: '#25D366',
              border: '1.5px solid #25D366',
              fontSize: '0.95rem', fontWeight: 600, textDecoration: 'none',
              fontFamily: fontBody, display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            }}>
              <MessageCircle size={16} /> Consultar
            </a>
          </div>
        </div>
      </Reveal>
    </div>
  );
}

// =============================================================
//   COMPONENTE SECCIÓN (helper)
// =============================================================
function Section({ title, accent, icon: Icon, children }) {
  return (
    <div style={{ marginBottom: '2.2rem' }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: '0.6rem',
        marginBottom: '1rem', paddingBottom: '0.8rem',
        borderBottom: `1px solid ${C.border}`,
      }}>
        {Icon && <Icon size={18} color={accent} />}
        <h3 style={{
          fontFamily: fontDisplay, fontSize: '1.3rem',
          fontWeight: 500, color: C.paper, margin: 0,
        }}>{title}</h3>
      </div>
      {children}
    </div>
  );
}

// =============================================================
//   COMPONENTE PRINCIPAL — PÁGINA DE MODALIDADES
// =============================================================
export default function Modalidades({ onGoBack, onGoToApp }) {
  const [activeId, setActiveId] = useState('A');
  const activeMod = MODALIDADES.find(m => m.id === activeId);

  // Scroll suave al cambiar de tab
  const handleTabClick = (id) => {
    setActiveId(id);
    // Scroll al contenido del tab
    setTimeout(() => {
      const el = document.getElementById('mod-content');
      if (el) {
        const offset = 120;
        const top = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }, 50);
  };

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
        <div style={{
          maxWidth: 1100, margin: '0 auto',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem',
        }}>
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

      {/* HERO */}
      <section style={{ padding: '4rem 1.5rem 2rem', position: 'relative', overflow: 'hidden' }}>
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
            }}>4 modalidades · 1 plataforma</div>
          </Reveal>
          <Reveal delay={100}>
            <h1 style={{
              fontFamily: fontDisplay, fontWeight: 400, fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
              lineHeight: 1.05, letterSpacing: '-0.02em', color: C.paper,
              margin: 0, marginBottom: '1rem',
            }}>
              Las <em style={{ color: C.gold, fontStyle: 'italic' }}>modalidades</em> de Lótum
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p style={{
              color: C.paperSoft, fontSize: '1.05rem', lineHeight: 1.6,
              margin: '0 auto', maxWidth: 600,
            }}>
              Cada propiedad y cada propietario es distinto. Por eso ofrecemos cuatro modalidades para que elijas la que mejor se adapte a tu necesidad.
            </p>
          </Reveal>
        </div>
      </section>

      {/* TABS DE MODALIDADES */}
      <section style={{ padding: '0 1.5rem' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <Reveal>
            <div className="tabs-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '0.6rem',
            }}>
              {MODALIDADES.map((mod) => {
                const Icon = mod.icon;
                const isActive = mod.id === activeId;
                return (
                  <button
                    key={mod.id}
                    onClick={() => handleTabClick(mod.id)}
                    style={{
                      padding: '1rem 0.9rem',
                      background: isActive ? `${mod.color}25` : `${C.card}60`,
                      border: isActive ? `1.5px solid ${mod.color}` : `1px solid ${C.border}`,
                      borderRadius: 14, cursor: 'pointer',
                      fontFamily: fontBody, textAlign: 'left',
                      transition: 'all 0.25s ease',
                      display: 'flex', flexDirection: 'column', gap: '0.4rem',
                      transform: isActive ? 'translateY(-2px)' : 'translateY(0)',
                      boxShadow: isActive ? `0 10px 25px ${mod.color}30` : 'none',
                    }}
                  >
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: '0.5rem',
                    }}>
                      <div style={{
                        width: 28, height: 28, borderRadius: 8,
                        background: mod.color,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <Icon size={14} color="#fff" />
                      </div>
                      <span style={{
                        color: isActive ? mod.color : C.paperSoft,
                        fontSize: '0.7rem', fontWeight: 700,
                        letterSpacing: '0.1em', textTransform: 'uppercase',
                      }}>Mod. {mod.id}</span>
                    </div>
                    <div style={{
                      color: C.paper, fontSize: '0.92rem', fontWeight: 600,
                      lineHeight: 1.25, fontFamily: fontDisplay,
                    }}>{mod.name}</div>
                  </button>
                );
              })}
            </div>
            <style>{`
              @media (min-width: 720px) {
                .tabs-grid {
                  grid-template-columns: repeat(4, 1fr);
                }
              }
            `}</style>
          </Reveal>
        </div>
      </section>

      {/* CONTENIDO DEL TAB ACTIVO */}
      <section id="mod-content" style={{ padding: '0 1.5rem 5rem' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <ModalidadCard key={activeMod.id} mod={activeMod} onGoToApp={onGoToApp} />
        </div>
      </section>

      {/* NAVEGACIÓN ENTRE MODALIDADES */}
      <section style={{ padding: '0 1.5rem 5rem' }}>
        <div style={{
          maxWidth: 1000, margin: '0 auto',
          padding: '1.5rem',
          background: `${C.card}40`,
          border: `1px solid ${C.border}`,
          borderRadius: 16,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          gap: '1rem', flexWrap: 'wrap',
        }}>
          <div>
            <div style={{
              fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase',
              color: C.muted, fontWeight: 600, marginBottom: '0.2rem',
            }}>Explorar otra modalidad</div>
            <div style={{ color: C.paper, fontSize: '0.95rem' }}>
              Tocá una de las pestañas arriba para ver otra modalidad.
            </div>
          </div>
          <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{
            padding: '0.7rem 1.3rem', borderRadius: 999,
            background: 'transparent', color: C.terracotta,
            border: `1.5px solid ${C.terracotta}`,
            fontSize: '0.88rem', fontWeight: 600, cursor: 'pointer',
            fontFamily: fontBody,
          }}>
            ↑ Subir y elegir
          </button>
        </div>
      </section>

      {/* Footer */}
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
