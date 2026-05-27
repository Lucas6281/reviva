// =======================================================================
//   LÓTUM — LANDING PAGE PÚBLICA
//   Inversión inmobiliaria nueva · La paciencia, paga.
// =======================================================================
import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowRight, ArrowDown, MessageCircle, Check, ChevronDown,
  Home as HomeIcon, TrendingUp, Hammer, Sparkles,
  Shield, FileText, Clock, DollarSign, Users, Heart,
  Smartphone, Apple, Play, Mail,
} from 'lucide-react';

// === Paleta (exactamente la misma que la app) ===
const C = {
  bgDeep: '#0A1628',
  bgMid: '#13243F',
  bgSoft: '#1B2845',
  paper: '#F0EEE6',
  paperSoft: '#C9C8C0',
  muted: '#8A8B87',
  silver1: '#E8E8E8',
  silver2: '#B8B8B8',
  silver3: '#8E8E8E',
  terracotta: '#D9663B',
  terracottaSoft: '#A04826',
  gold: '#C9A961',
  modA: '#D9663B',
  modB: '#5B8BB5',
  modC: '#6FA77F',
  modD: '#C9A961',
  card: '#1B2845',
  cardSoft: '#243456',
  border: '#2D3F5F',
};

const fontDisplay = "'Fraunces', Georgia, serif";
const fontBody = "'Inter', system-ui, sans-serif";

const WHATSAPP_URL = "https://wa.me/5492235834453?text=Hola%20L%C3%B3tum!%20Quiero%20info%20sobre%20c%C3%B3mo%20invertir%2Fvender%20una%20propiedad.";

// =======================================================================
//   COMPONENTES UTILITARIOS
// =======================================================================

// Logo Lótum SVG (reloj de arena)
function LotumLogo({ size = 48 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <defs>
        <linearGradient id={`logo-grad-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={C.terracotta} />
          <stop offset="100%" stopColor={C.gold} />
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="22" stroke={`url(#logo-grad-${size})`} strokeWidth="1.8" fill="none" opacity="0.9" />
      <path d="M14 12 L34 12 L24 24 L34 36 L14 36 L24 24 Z" fill={`url(#logo-grad-${size})`} />
    </svg>
  );
}

// Hook para animaciones al hacer scroll (intersection observer)
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, inView];
}

// Wrapper para animar elementos al entrar en viewport
function Reveal({ children, delay = 0, y = 30 }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : `translateY(${y}px)`,
        transition: `opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform 0.9s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// Botón primario (terracota)
function PrimaryBtn({ children, onClick, href, style = {}, ...rest }) {
  const Tag = href ? 'a' : 'button';
  return (
    <Tag
      href={href}
      onClick={onClick}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem',
        padding: '1rem 1.8rem', background: C.terracotta, color: '#fff',
        border: 'none', borderRadius: 999, fontSize: '1rem', fontWeight: 600,
        fontFamily: fontBody, cursor: 'pointer', textDecoration: 'none',
        boxShadow: `0 12px 30px ${C.terracotta}50, 0 0 0 1px ${C.terracotta}30 inset`,
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        ...style,
      }}
      onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

// Botón secundario (outline)
function GhostBtn({ children, onClick, href, style = {}, ...rest }) {
  const Tag = href ? 'a' : 'button';
  return (
    <Tag
      href={href}
      onClick={onClick}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem',
        padding: '1rem 1.8rem', background: 'transparent', color: C.paper,
        border: `1.5px solid ${C.border}`, borderRadius: 999, fontSize: '1rem', fontWeight: 500,
        fontFamily: fontBody, cursor: 'pointer', textDecoration: 'none',
        transition: 'border-color 0.25s ease, background 0.25s ease',
        ...style,
      }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.paper; e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = 'transparent'; }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

// =======================================================================
//   SECCIÓN: NAVBAR FIJO
// =======================================================================
function Navbar({ onCtaApp }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      padding: '1rem 1.5rem',
      paddingTop: 'calc(1rem + env(safe-area-inset-top, 0px))',
      background: scrolled ? 'rgba(10, 22, 40, 0.85)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px) saturate(160%)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(160%)' : 'none',
      borderBottom: scrolled ? `1px solid ${C.border}60` : '1px solid transparent',
      transition: 'all 0.35s ease',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
        <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', textDecoration: 'none' }}>
          <LotumLogo size={32} />
          <span style={{
            fontFamily: fontDisplay, fontSize: '1.5rem', fontWeight: 500,
            background: `linear-gradient(90deg, ${C.silver1}, ${C.silver3}, ${C.silver1})`,
            WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
          }}>Lótum</span>
        </a>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <a href="#modalidades" className="nav-link-desktop" style={{
            color: C.paperSoft, fontSize: '0.92rem', textDecoration: 'none', fontWeight: 500,
            padding: '0.5rem 0.9rem', borderRadius: 999, transition: 'color 0.2s',
          }}>Modalidades</a>
          <a href="#como-funciona" className="nav-link-desktop" style={{
            color: C.paperSoft, fontSize: '0.92rem', textDecoration: 'none', fontWeight: 500,
            padding: '0.5rem 0.9rem', borderRadius: 999, transition: 'color 0.2s',
          }}>Cómo funciona</a>
          <a href="#faq" className="nav-link-desktop" style={{
            color: C.paperSoft, fontSize: '0.92rem', textDecoration: 'none', fontWeight: 500,
            padding: '0.5rem 0.9rem', borderRadius: 999, transition: 'color 0.2s',
          }}>FAQ</a>
          <PrimaryBtn onClick={onCtaApp} style={{ padding: '0.6rem 1.1rem', fontSize: '0.88rem' }}>
            Probar la app <ArrowRight size={15} />
          </PrimaryBtn>
        </div>
      </div>
      <style>{`
        @media (max-width: 720px) {
          .nav-link-desktop { display: none !important; }
        }
      `}</style>
    </nav>
  );
}

// =======================================================================
//   SECCIÓN 1: HERO
// =======================================================================
function Hero({ onCtaApp }) {
  return (
    <section id="top" style={{
      minHeight: '100vh', position: 'relative', overflow: 'hidden',
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      padding: '8rem 1.5rem 4rem',
      paddingTop: 'calc(8rem + env(safe-area-inset-top, 0px))',
    }}>
      {/* Fondo: gradientes radiales + grano */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        background: `
          radial-gradient(ellipse 80% 60% at 20% 0%, ${C.terracotta}25 0%, transparent 50%),
          radial-gradient(ellipse 60% 50% at 90% 30%, ${C.gold}18 0%, transparent 55%),
          radial-gradient(ellipse 70% 70% at 50% 100%, ${C.modB}15 0%, transparent 55%)
        `,
      }} />
      {/* Grid sutil de fondo */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.4,
        backgroundImage: `linear-gradient(${C.border}30 1px, transparent 1px), linear-gradient(90deg, ${C.border}30 1px, transparent 1px)`,
        backgroundSize: '64px 64px',
        maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 75%)',
        WebkitMaskImage: 'radial-gradient(ellipse at center, black 0%, transparent 75%)',
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1100, margin: '0 auto', width: '100%' }}>
        {/* Pill superior */}
        <Reveal delay={0}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.5rem 1rem',
            background: `${C.terracotta}15`,
            border: `1px solid ${C.terracotta}40`,
            borderRadius: 999,
            color: C.terracotta,
            fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
            marginBottom: '2rem',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: C.terracotta, animation: 'pulse 2s ease-in-out infinite' }} />
            Inversión inmobiliaria nueva
          </div>
        </Reveal>

        {/* Headline gigante */}
        <Reveal delay={120}>
          <h1 style={{
            fontFamily: fontDisplay, fontWeight: 400, fontSize: 'clamp(2.6rem, 7vw, 5.8rem)',
            lineHeight: 1.02, letterSpacing: '-0.025em', color: C.paper, margin: 0,
            marginBottom: '1.5rem', maxWidth: 900,
          }}>
            Propiedades<br />
            que <em style={{ color: C.terracotta, fontStyle: 'italic', fontWeight: 500 }}>vuelven</em>{' '}
            <em style={{ color: C.terracotta, fontStyle: 'italic', fontWeight: 500 }}>a vivir.</em>
          </h1>
        </Reveal>

        {/* Subtítulo */}
        <Reveal delay={250}>
          <p style={{
            fontSize: 'clamp(1.05rem, 1.6vw, 1.3rem)', color: C.paperSoft,
            maxWidth: 620, lineHeight: 1.55, margin: 0, marginBottom: '0.6rem', fontWeight: 400,
          }}>
            La primera plataforma argentina que conecta propietarios,
            inversores y restauradores para devolverle vida a las propiedades olvidadas.
          </p>
        </Reveal>

        <Reveal delay={320}>
          <p style={{
            fontFamily: fontDisplay, fontStyle: 'italic',
            fontSize: 'clamp(1.1rem, 1.5vw, 1.4rem)',
            color: C.gold, margin: 0, marginBottom: '2.6rem', fontWeight: 400,
          }}>
            La paciencia, paga.
          </p>
        </Reveal>

        {/* CTAs */}
        <Reveal delay={420}>
          <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap', marginBottom: '5rem' }}>
            <PrimaryBtn onClick={onCtaApp}>
              Probar la app <ArrowRight size={18} />
            </PrimaryBtn>
            <GhostBtn href="#modalidades">
              Conocer las 4 modalidades <ArrowDown size={17} />
            </GhostBtn>
          </div>
        </Reveal>

        {/* Pills inferiores con stats */}
        <Reveal delay={550}>
          <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap' }}>
            <Stat number="4" label="Modalidades de operación" />
            <Stat number="1,5%" label="Comisión solo al cierre" />
            <Stat number="0" label="Costo para publicar" />
          </div>
        </Reveal>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.3); }
        }
      `}</style>
    </section>
  );
}

function Stat({ number, label }) {
  return (
    <div>
      <div style={{
        fontFamily: fontDisplay, fontSize: '2.2rem', fontWeight: 500,
        background: `linear-gradient(135deg, ${C.silver1}, ${C.gold})`,
        WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
        lineHeight: 1,
      }}>{number}</div>
      <div style={{ color: C.muted, fontSize: '0.82rem', marginTop: '0.4rem', letterSpacing: '0.04em' }}>{label}</div>
    </div>
  );
}

// =======================================================================
//   SECCIÓN 2: ¿QUÉ ES LÓTUM?
// =======================================================================
function QueEsLotum() {
  const items = [
    {
      icon: HomeIcon,
      title: 'Propietarios',
      desc: 'Vendé tu propiedad sin rematarla. Esperá el precio justo o accedé a soluciones creativas.',
      color: C.modA,
    },
    {
      icon: TrendingUp,
      title: 'Inversores',
      desc: 'Accedé a oportunidades únicas: reciclados, compras anticipadas y reventas con alto retorno.',
      color: C.modB,
    },
    {
      icon: Hammer,
      title: 'Restauradores',
      desc: 'Le devolvés vida a propiedades olvidadas. Vos hacés magia con el ladrillo, nosotros conectamos.',
      color: C.modC,
    },
  ];

  return (
    <section style={{ padding: '7rem 1.5rem', position: 'relative' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <Reveal>
          <div style={{
            fontSize: '0.78rem', letterSpacing: '0.18em', textTransform: 'uppercase',
            color: C.terracotta, fontWeight: 600, marginBottom: '1rem',
          }}>· ¿Qué es Lótum?</div>
        </Reveal>

        <Reveal delay={100}>
          <h2 style={{
            fontFamily: fontDisplay, fontWeight: 400, fontSize: 'clamp(2rem, 4.5vw, 3.6rem)',
            lineHeight: 1.1, letterSpacing: '-0.02em', color: C.paper, margin: 0,
            marginBottom: '1.5rem', maxWidth: 800,
          }}>
            Tres jugadores, <em style={{ color: C.gold, fontStyle: 'italic' }}>una sola plataforma</em>.
          </h2>
        </Reveal>

        <Reveal delay={180}>
          <p style={{
            fontSize: '1.1rem', color: C.paperSoft, maxWidth: 680, lineHeight: 1.6,
            margin: 0, marginBottom: '4rem',
          }}>
            Lótum es donde el inversor que tiene capital, el propietario que necesita vender
            y el restaurador que sabe cómo hacerlo se encuentran para crear oportunidades
            que antes no existían.
          </p>
        </Reveal>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem',
        }}>
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 120}>
              <div style={{
                padding: '2rem 1.8rem',
                background: `linear-gradient(180deg, ${C.card} 0%, ${C.bgSoft} 100%)`,
                border: `1px solid ${C.border}`,
                borderRadius: 20,
                height: '100%', boxSizing: 'border-box',
                position: 'relative', overflow: 'hidden',
                transition: 'transform 0.4s ease, border-color 0.4s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.borderColor = item.color; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = C.border; }}
              >
                {/* Glow corner */}
                <div style={{
                  position: 'absolute', top: -40, right: -40, width: 130, height: 130,
                  borderRadius: '50%', background: `${item.color}22`, filter: 'blur(40px)', pointerEvents: 'none',
                }} />
                <div style={{
                  display: 'inline-flex', padding: '0.85rem', borderRadius: 14,
                  background: `${item.color}20`, border: `1px solid ${item.color}40`,
                  marginBottom: '1.4rem',
                }}>
                  <item.icon size={22} color={item.color} strokeWidth={1.6} />
                </div>
                <h3 style={{
                  fontFamily: fontDisplay, fontSize: '1.4rem', fontWeight: 500,
                  margin: 0, marginBottom: '0.7rem', color: C.paper,
                }}>{item.title}</h3>
                <p style={{ color: C.paperSoft, fontSize: '0.95rem', lineHeight: 1.55, margin: 0 }}>
                  {item.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// =======================================================================
//   SECCIÓN 3: LAS 4 MODALIDADES (LA MÁS IMPORTANTE)
// =======================================================================
function Modalidades() {
  const [active, setActive] = useState('A');

  const modalidades = {
    A: {
      letter: 'A',
      title: 'Reciclado a futuro',
      tagline: 'El inversor recicla, vos cobrás más adelante',
      color: C.modA,
      icon: Hammer,
      desc: 'Tenés una propiedad que necesita refacción pero no querés rematarla. Un inversor pone el capital para reciclarla y vos cobrás tu precio cuando se venda, con un plus por esperar.',
      example: {
        title: 'Ejemplo',
        items: [
          'Pedís: US$ 50.000 por tu propiedad',
          'Te ofrecemos: US$ 55.000 (+ 10% por esperar)',
          'El inversor pone US$ 30.000 en la obra',
          'Se vende reciclada por US$ 110.000',
          'Cobrás primero tus US$ 55.000 ✓',
          'El inversor recupera capital + ganancia',
        ],
      },
    },
    B: {
      letter: 'B',
      title: 'Contado + reciclado',
      tagline: 'Vendés al contado, el inversor recicla y revende',
      color: C.modB,
      icon: Sparkles,
      desc: 'Necesitás liquidez ya. El inversor te paga al contado un precio negociado, recicla la propiedad por su cuenta y se queda con la ganancia del reciclado.',
      example: {
        title: 'Ejemplo',
        items: [
          'Pedís: US$ 65.000',
          'El inversor te paga al contado: US$ 50.000',
          'Pone US$ 25.000 en reciclar',
          'Vende terminada por US$ 110.000',
          'Su ganancia neta: ~US$ 35.000',
          'Vos cobraste rápido y sin obras',
        ],
      },
    },
    C: {
      letter: 'C',
      title: 'Compra simple',
      tagline: 'Operación de contado, sin reciclado',
      color: C.modC,
      icon: DollarSign,
      desc: 'Una compraventa tradicional pero sin la comisión del 6% de la inmobiliaria. Conectás directo, escribanía integrada, solo 1,5% por parte al cierre.',
      example: {
        title: 'Ejemplo',
        items: [
          'Publicás tu propiedad sin costo',
          'Un comprador hace oferta directa',
          'Negocian sin intermediarios',
          'Escribanía integrada de Lótum',
          'Solo 1,5% de comisión por parte',
          'Ahorrás miles de dólares vs inmobiliaria',
        ],
      },
    },
    D: {
      letter: 'D',
      title: 'Inversor a futuro',
      tagline: 'Compra anticipada con descuento',
      color: C.modD,
      icon: Clock,
      desc: 'Tenés una oferta como Modalidad A pero no podés esperar. Un inversor te compra hoy a un precio menor pero contado, y proyecta su ganancia para cuando se reciclen y vendan.',
      example: {
        title: 'Ejemplo',
        items: [
          'Oferta A vigente: US$ 55.000 a futuro',
          'No podés esperar, necesitás contado',
          'Inversor ofrece: US$ 40.000 contado',
          'Negocian y cierran en US$ 45.000',
          'Vos cobrás ya, sin esperar',
          'Inversor proyecta ganar US$ 10.000+',
        ],
      },
    },
  };

  const current = modalidades[active];

  return (
    <section id="modalidades" style={{
      padding: '7rem 1.5rem', position: 'relative',
      background: `linear-gradient(180deg, transparent 0%, ${C.bgDeep}80 100%)`,
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <Reveal>
          <div style={{
            fontSize: '0.78rem', letterSpacing: '0.18em', textTransform: 'uppercase',
            color: C.terracotta, fontWeight: 600, marginBottom: '1rem',
          }}>· Las 4 modalidades</div>
        </Reveal>

        <Reveal delay={100}>
          <h2 style={{
            fontFamily: fontDisplay, fontWeight: 400, fontSize: 'clamp(2rem, 4.5vw, 3.6rem)',
            lineHeight: 1.1, letterSpacing: '-0.02em', color: C.paper, margin: 0,
            marginBottom: '1.2rem', maxWidth: 800,
          }}>
            Cada propiedad, <em style={{ color: C.gold, fontStyle: 'italic' }}>su mejor camino</em>.
          </h2>
        </Reveal>

        <Reveal delay={180}>
          <p style={{
            fontSize: '1.1rem', color: C.paperSoft, maxWidth: 680, lineHeight: 1.6,
            margin: 0, marginBottom: '3.5rem',
          }}>
            No todas las operaciones son iguales. Por eso diseñamos cuatro modalidades distintas
            para que cada propietario e inversor encuentre la que mejor le sirve.
          </p>
        </Reveal>

        {/* Tabs */}
        <Reveal delay={250}>
          <div style={{
            display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginBottom: '2.5rem',
          }}>
            {Object.values(modalidades).map((m) => (
              <button
                key={m.letter}
                onClick={() => setActive(m.letter)}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
                  padding: '0.8rem 1.3rem',
                  background: active === m.letter ? `${m.color}25` : 'transparent',
                  border: `1.5px solid ${active === m.letter ? m.color : C.border}`,
                  borderRadius: 12,
                  color: active === m.letter ? m.color : C.paperSoft,
                  fontSize: '0.92rem', fontWeight: 600, cursor: 'pointer',
                  fontFamily: fontBody, transition: 'all 0.25s ease',
                }}
              >
                <span style={{ fontFamily: fontDisplay, fontSize: '1.1rem', fontWeight: 500 }}>{m.letter}</span>
                <span>{m.title}</span>
              </button>
            ))}
          </div>
        </Reveal>

        {/* Card grande modal activa */}
        <Reveal delay={100} key={active}>
          <div style={{
            position: 'relative', overflow: 'hidden',
            background: `linear-gradient(135deg, ${C.card} 0%, ${C.bgSoft} 100%)`,
            border: `1px solid ${current.color}40`,
            borderRadius: 24, padding: 'clamp(2rem, 4vw, 3rem)',
          }}>
            {/* Glow grande */}
            <div style={{
              position: 'absolute', top: -100, right: -100, width: 300, height: 300,
              borderRadius: '50%', background: `${current.color}30`, filter: 'blur(80px)', pointerEvents: 'none',
            }} />

            <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1fr', gap: '2.5rem' }} className="modal-grid">
              {/* Columna izquierda: descripción */}
              <div>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.7rem', marginBottom: '1.5rem',
                }}>
                  <div style={{
                    display: 'inline-flex', padding: '0.7rem', borderRadius: 12,
                    background: `${current.color}20`, border: `1px solid ${current.color}40`,
                  }}>
                    <current.icon size={20} color={current.color} strokeWidth={1.6} />
                  </div>
                  <div style={{
                    fontFamily: fontDisplay, fontSize: '4rem', fontWeight: 500, lineHeight: 1,
                    color: current.color,
                  }}>{current.letter}</div>
                </div>
                <h3 style={{
                  fontFamily: fontDisplay, fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 500,
                  margin: 0, marginBottom: '0.5rem', color: C.paper,
                }}>{current.title}</h3>
                <p style={{
                  color: current.color, fontSize: '1rem', margin: 0, marginBottom: '1.5rem',
                  fontWeight: 500, fontStyle: 'italic', fontFamily: fontDisplay,
                }}>{current.tagline}</p>
                <p style={{
                  color: C.paperSoft, fontSize: '1.02rem', lineHeight: 1.6, margin: 0,
                }}>{current.desc}</p>
              </div>

              {/* Columna derecha: ejemplo numérico */}
              <div style={{
                background: `${C.bgDeep}80`,
                border: `1px solid ${C.border}`,
                borderRadius: 18, padding: '1.8rem',
              }}>
                <div style={{
                  fontSize: '0.74rem', letterSpacing: '0.15em', textTransform: 'uppercase',
                  color: current.color, fontWeight: 600, marginBottom: '1.2rem',
                }}>{current.example.title}</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {current.example.items.map((it, i) => (
                    <li key={i} style={{
                      display: 'flex', gap: '0.7rem', padding: '0.5rem 0',
                      borderBottom: i < current.example.items.length - 1 ? `1px solid ${C.border}80` : 'none',
                      color: C.paper, fontSize: '0.9rem', lineHeight: 1.5,
                    }}>
                      <Check size={16} color={current.color} style={{ marginTop: 3, flexShrink: 0 }} />
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <style>{`
        @media (min-width: 860px) {
          .modal-grid { grid-template-columns: 1.2fr 1fr !important; }
        }
      `}</style>
    </section>
  );
}

// =======================================================================
//   SECCIÓN 4: ¿CÓMO FUNCIONA? (3 pasos)
// =======================================================================
function ComoFunciona() {
  const pasos = [
    {
      n: '01',
      title: 'Publicás',
      desc: 'Cargás tu propiedad en la app y elegís qué modalidades aceptás. Podés aceptar las cuatro o solo una.',
    },
    {
      n: '02',
      title: 'Recibís ofertas',
      desc: 'Inversores verificados te contactan con propuestas. Vos elegís la que mejor te sirve.',
    },
    {
      n: '03',
      title: 'Cerrás',
      desc: 'Firmamos en nuestra escribanía integrada. Sin comisiones ocultas, todo transparente.',
    },
  ];

  return (
    <section id="como-funciona" style={{ padding: '7rem 1.5rem', position: 'relative' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <Reveal>
          <div style={{
            fontSize: '0.78rem', letterSpacing: '0.18em', textTransform: 'uppercase',
            color: C.terracotta, fontWeight: 600, marginBottom: '1rem',
          }}>· Cómo funciona</div>
        </Reveal>

        <Reveal delay={100}>
          <h2 style={{
            fontFamily: fontDisplay, fontWeight: 400, fontSize: 'clamp(2rem, 4.5vw, 3.6rem)',
            lineHeight: 1.1, letterSpacing: '-0.02em', color: C.paper, margin: 0,
            marginBottom: '3.5rem', maxWidth: 800,
          }}>
            Publicás una vez,<br />
            <em style={{ color: C.gold, fontStyle: 'italic' }}>elegís cómo vendés</em>.
          </h2>
        </Reveal>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem',
        }}>
          {pasos.map((paso, i) => (
            <Reveal key={paso.n} delay={i * 150}>
              <div style={{ position: 'relative' }}>
                {/* Conector decorativo */}
                {i < pasos.length - 1 && (
                  <div className="step-connector" style={{
                    position: 'absolute', top: 32, left: '100%', width: '100%', height: 1,
                    background: `linear-gradient(90deg, ${C.terracotta}80, transparent)`,
                    display: 'none',
                  }} />
                )}
                <div style={{
                  fontFamily: fontDisplay, fontSize: '3.5rem', fontWeight: 500, lineHeight: 1,
                  color: C.terracotta, marginBottom: '1.2rem',
                }}>{paso.n}</div>
                <h3 style={{
                  fontFamily: fontDisplay, fontSize: '1.6rem', fontWeight: 500,
                  margin: 0, marginBottom: '0.8rem', color: C.paper,
                }}>{paso.title}</h3>
                <p style={{ color: C.paperSoft, fontSize: '1rem', lineHeight: 1.6, margin: 0 }}>
                  {paso.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <style>{`
        @media (min-width: 760px) {
          .step-connector { display: block !important; }
        }
      `}</style>
    </section>
  );
}

// =======================================================================
//   SECCIÓN 5: ¿POR QUÉ LÓTUM?
// =======================================================================
function PorQueLotum() {
  const items = [
    { icon: DollarSign, title: 'Sin comisión de inmobiliaria', desc: 'Cero costo del 6% tradicional. Solo 1,5% por parte al cierre.' },
    { icon: FileText, title: 'Escribanía integrada', desc: 'Tu operación se cierra con escribanos de confianza de Lótum.' },
    { icon: Shield, title: 'Verificación KYC', desc: 'Todos los usuarios verificados con DNI. Operaciones seguras.' },
    { icon: Users, title: 'Sin intermediarios', desc: 'Hablás directo con propietarios e inversores reales.' },
    { icon: Sparkles, title: '4 modalidades únicas', desc: 'Soluciones creativas que no encontrás en otras plataformas.' },
    { icon: Heart, title: 'Diseñado en Argentina', desc: 'Pensado para el mercado argentino y sus particularidades.' },
  ];

  return (
    <section style={{ padding: '7rem 1.5rem', position: 'relative' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <Reveal>
          <div style={{
            fontSize: '0.78rem', letterSpacing: '0.18em', textTransform: 'uppercase',
            color: C.terracotta, fontWeight: 600, marginBottom: '1rem',
          }}>· ¿Por qué Lótum?</div>
        </Reveal>

        <Reveal delay={100}>
          <h2 style={{
            fontFamily: fontDisplay, fontWeight: 400, fontSize: 'clamp(2rem, 4.5vw, 3.6rem)',
            lineHeight: 1.1, letterSpacing: '-0.02em', color: C.paper, margin: 0,
            marginBottom: '3.5rem', maxWidth: 800,
          }}>
            Lo que <em style={{ color: C.gold, fontStyle: 'italic' }}>no encontrás</em>{' '}
            en una inmobiliaria tradicional.
          </h2>
        </Reveal>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem',
        }}>
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 80}>
              <div style={{
                display: 'flex', gap: '1rem', padding: '1.6rem',
                background: `${C.card}80`,
                border: `1px solid ${C.border}`, borderRadius: 16,
                transition: 'background 0.3s, border-color 0.3s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = C.cardSoft; e.currentTarget.style.borderColor = C.terracotta + '50'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = `${C.card}80`; e.currentTarget.style.borderColor = C.border; }}
              >
                <div style={{ flexShrink: 0 }}>
                  <div style={{
                    padding: '0.7rem', borderRadius: 10,
                    background: `${C.terracotta}15`, border: `1px solid ${C.terracotta}30`,
                  }}>
                    <item.icon size={18} color={C.terracotta} strokeWidth={1.7} />
                  </div>
                </div>
                <div>
                  <h4 style={{
                    fontFamily: fontDisplay, fontSize: '1.1rem', fontWeight: 500,
                    margin: 0, marginBottom: '0.4rem', color: C.paper,
                  }}>{item.title}</h4>
                  <p style={{ color: C.paperSoft, fontSize: '0.92rem', lineHeight: 1.5, margin: 0 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// =======================================================================
//   SECCIÓN 6: DESCARGAR APP
// =======================================================================
function DescargarApp({ onCtaApp }) {
  return (
    <section style={{ padding: '7rem 1.5rem', position: 'relative' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div style={{
          position: 'relative', overflow: 'hidden',
          background: `linear-gradient(135deg, ${C.card} 0%, ${C.bgSoft} 50%, ${C.card} 100%)`,
          border: `1px solid ${C.border}`,
          borderRadius: 28, padding: 'clamp(2.5rem, 5vw, 4.5rem)',
          textAlign: 'center',
        }}>
          {/* Glow */}
          <div style={{
            position: 'absolute', top: '-30%', left: '50%', transform: 'translateX(-50%)',
            width: 500, height: 500, borderRadius: '50%',
            background: `radial-gradient(circle, ${C.terracotta}30, transparent 60%)`,
            filter: 'blur(60px)', pointerEvents: 'none',
          }} />

          <div style={{ position: 'relative' }}>
            <Reveal>
              <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                <LotumLogo size={64} />
              </div>
            </Reveal>
            <Reveal delay={100}>
              <h2 style={{
                fontFamily: fontDisplay, fontWeight: 400, fontSize: 'clamp(1.9rem, 4vw, 3rem)',
                lineHeight: 1.1, letterSpacing: '-0.02em', color: C.paper, margin: 0,
                marginBottom: '1rem',
              }}>
                Llevá Lótum <em style={{ color: C.gold, fontStyle: 'italic' }}>en tu bolsillo</em>.
              </h2>
            </Reveal>
            <Reveal delay={180}>
              <p style={{
                color: C.paperSoft, fontSize: '1.1rem', lineHeight: 1.6, maxWidth: 580,
                margin: '0 auto 2.5rem',
              }}>
                Subí propiedades, recibí ofertas y cerrá operaciones desde el celular.
                Acceso anticipado disponible ahora.
              </p>
            </Reveal>

            {/* Botones */}
            <Reveal delay={260}>
              <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2rem' }}>
                <PrimaryBtn onClick={onCtaApp}>
                  <Smartphone size={18} /> Probar la app web
                </PrimaryBtn>
              </div>
            </Reveal>

            {/* Stores (próximamente) */}
            <Reveal delay={340}>
              <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
                <StoreBtn icon={Apple} title="App Store" subtitle="Próximamente" />
                <StoreBtn icon={Play} title="Google Play" subtitle="Próximamente" />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function StoreBtn({ icon: Icon, title, subtitle }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: '0.8rem',
      padding: '0.8rem 1.4rem',
      background: 'rgba(255,255,255,0.04)',
      border: `1px solid ${C.border}`,
      borderRadius: 14, opacity: 0.6, cursor: 'not-allowed',
    }}>
      <Icon size={22} color={C.paperSoft} />
      <div style={{ textAlign: 'left' }}>
        <div style={{ fontSize: '0.68rem', color: C.muted, letterSpacing: '0.05em' }}>{subtitle}</div>
        <div style={{ fontSize: '1rem', color: C.paperSoft, fontWeight: 500 }}>{title}</div>
      </div>
    </div>
  );
}

// =======================================================================
//   SECCIÓN 7: PROPIETARIOS / INVERSORES
// =======================================================================
function ParaQuien({ onCtaApp }) {
  return (
    <section style={{ padding: '7rem 1.5rem', position: 'relative' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <Reveal>
          <h2 style={{
            fontFamily: fontDisplay, fontWeight: 400, fontSize: 'clamp(2rem, 4.5vw, 3.6rem)',
            lineHeight: 1.1, letterSpacing: '-0.02em', color: C.paper, margin: 0,
            marginBottom: '3rem', textAlign: 'center',
          }}>
            ¿De qué <em style={{ color: C.gold, fontStyle: 'italic' }}>lado</em> estás?
          </h2>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {/* Card Propietario */}
          <Reveal>
            <CardLado
              tag="Soy propietario"
              title="Tengo una propiedad para vender"
              points={[
                'Vendé sin rematarla',
                'Elegí entre 4 modalidades',
                'Recibí ofertas reales y verificadas',
                'Sin comisión de inmobiliaria (6%)',
              ]}
              cta="Publicar mi propiedad"
              color={C.terracotta}
              onClick={onCtaApp}
            />
          </Reveal>

          {/* Card Inversor */}
          <Reveal delay={150}>
            <CardLado
              tag="Soy inversor"
              title="Quiero invertir en inmuebles"
              points={[
                'Acceso a oportunidades únicas',
                'Reciclados con ROI alto',
                'Compras anticipadas con descuento',
                'Diversificación inmobiliaria real',
              ]}
              cta="Ver oportunidades"
              color={C.gold}
              onClick={onCtaApp}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function CardLado({ tag, title, points, cta, color, onClick }) {
  return (
    <div style={{
      position: 'relative', overflow: 'hidden', height: '100%', boxSizing: 'border-box',
      background: `linear-gradient(180deg, ${C.card} 0%, ${C.bgSoft} 100%)`,
      border: `1px solid ${color}30`,
      borderRadius: 24, padding: '2.5rem 2rem',
      display: 'flex', flexDirection: 'column',
      transition: 'transform 0.4s, border-color 0.4s',
    }}
    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.borderColor = color; }}
    onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = `${color}30`; }}
    >
      <div style={{
        position: 'absolute', top: -60, right: -60, width: 200, height: 200,
        borderRadius: '50%', background: `${color}20`, filter: 'blur(60px)', pointerEvents: 'none',
      }} />
      <div style={{ position: 'relative', flex: 1 }}>
        <div style={{
          display: 'inline-block', padding: '0.4rem 0.9rem',
          background: `${color}20`, border: `1px solid ${color}40`,
          borderRadius: 999, color, fontSize: '0.72rem', fontWeight: 600,
          letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '1.5rem',
        }}>{tag}</div>
        <h3 style={{
          fontFamily: fontDisplay, fontSize: '1.7rem', fontWeight: 500,
          margin: 0, marginBottom: '1.5rem', color: C.paper, lineHeight: 1.2,
        }}>{title}</h3>
        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem 0' }}>
          {points.map((p, i) => (
            <li key={i} style={{
              display: 'flex', gap: '0.7rem', padding: '0.55rem 0',
              color: C.paperSoft, fontSize: '0.95rem',
            }}>
              <Check size={18} color={color} style={{ flexShrink: 0, marginTop: 2 }} />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </div>
      <button onClick={onClick} style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
        padding: '0.95rem 1.5rem', background: color, color: '#fff',
        border: 'none', borderRadius: 12, fontSize: '0.95rem', fontWeight: 600,
        fontFamily: fontBody, cursor: 'pointer', position: 'relative', width: '100%',
      }}>
        {cta} <ArrowRight size={17} />
      </button>
    </div>
  );
}

// =======================================================================
//   SECCIÓN 8: FAQ
// =======================================================================
function FAQ() {
  const faqs = [
    {
      q: '¿Cuánto cuesta usar Lótum?',
      a: 'Publicar es gratis. Solo cobramos 1,5% por parte al cierre de la operación. Significativamente menos que el 6% tradicional de las inmobiliarias.',
    },
    {
      q: '¿Cómo verifican a los usuarios?',
      a: 'Antes de operar, todos los usuarios pasan por verificación KYC: validación de DNI, foto en vivo (face scan) y comprobante de domicilio. Esto garantiza operaciones seguras entre partes reales.',
    },
    {
      q: '¿Qué pasa si no me convence ninguna oferta?',
      a: 'Nada. Las ofertas son no vinculantes hasta que firmás. Podés rechazarlas todas y esperar mejores propuestas. Tu propiedad no se compromete sin tu firma.',
    },
    {
      q: '¿Hay escribanía propia?',
      a: 'Sí. Lótum tiene escribanos asociados que gestionan el cierre legal de las operaciones. Vos podés usar tu escribano de confianza si preferís.',
    },
    {
      q: '¿En qué zonas operan?',
      a: 'Por ahora operamos principalmente en CABA y GBA, con expansión a otras ciudades importantes en próximos meses. Te avisamos cuando lleguemos a tu zona.',
    },
    {
      q: '¿Cuándo lanzan oficialmente?',
      a: 'Estamos en fase de pre-lanzamiento con acceso por invitación. Si querés ser de los primeros en usarla, escribinos por WhatsApp y te damos acceso anticipado.',
    },
  ];

  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section id="faq" style={{ padding: '7rem 1.5rem' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <Reveal>
          <div style={{
            fontSize: '0.78rem', letterSpacing: '0.18em', textTransform: 'uppercase',
            color: C.terracotta, fontWeight: 600, marginBottom: '1rem',
          }}>· Preguntas frecuentes</div>
        </Reveal>

        <Reveal delay={100}>
          <h2 style={{
            fontFamily: fontDisplay, fontWeight: 400, fontSize: 'clamp(2rem, 4.5vw, 3.6rem)',
            lineHeight: 1.1, letterSpacing: '-0.02em', color: C.paper, margin: 0,
            marginBottom: '3rem',
          }}>
            Lo que <em style={{ color: C.gold, fontStyle: 'italic' }}>te conviene saber</em>.
          </h2>
        </Reveal>

        <div>
          {faqs.map((faq, i) => (
            <Reveal key={i} delay={i * 60}>
              <div style={{
                borderBottom: `1px solid ${C.border}`,
                padding: '1.3rem 0', cursor: 'pointer',
              }}
              onClick={() => setOpenIdx(openIdx === i ? -1 : i)}
              >
                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem',
                }}>
                  <h4 style={{
                    fontFamily: fontDisplay, fontSize: '1.2rem', fontWeight: 500,
                    margin: 0, color: C.paper, flex: 1,
                  }}>{faq.q}</h4>
                  <ChevronDown
                    size={20}
                    color={C.terracotta}
                    style={{
                      flexShrink: 0,
                      transform: openIdx === i ? 'rotate(180deg)' : 'rotate(0)',
                      transition: 'transform 0.3s ease',
                    }}
                  />
                </div>
                <div style={{
                  maxHeight: openIdx === i ? 300 : 0, overflow: 'hidden',
                  transition: 'max-height 0.4s ease, margin-top 0.4s ease',
                  marginTop: openIdx === i ? '0.9rem' : 0,
                }}>
                  <p style={{
                    color: C.paperSoft, fontSize: '1rem', lineHeight: 1.65,
                    margin: 0, paddingBottom: '0.3rem',
                  }}>{faq.a}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// =======================================================================
//   SECCIÓN 9: FOOTER
// =======================================================================
function Footer() {
  return (
    <footer style={{
      padding: '4rem 1.5rem 2rem',
      borderTop: `1px solid ${C.border}`,
      background: `${C.bgDeep}80`,
    }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2.5rem',
          marginBottom: '3rem',
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', marginBottom: '1rem' }}>
              <LotumLogo size={36} />
              <span style={{
                fontFamily: fontDisplay, fontSize: '1.6rem', fontWeight: 500,
                background: `linear-gradient(90deg, ${C.silver1}, ${C.silver3}, ${C.silver1})`,
                WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
              }}>Lótum</span>
            </div>
            <p style={{
              fontFamily: fontDisplay, fontStyle: 'italic', color: C.gold,
              fontSize: '0.95rem', margin: 0, marginBottom: '0.8rem',
            }}>La paciencia, paga.</p>
            <p style={{ color: C.muted, fontSize: '0.85rem', lineHeight: 1.5, margin: 0 }}>
              Inversión inmobiliaria nueva.<br />
              Hecho con paciencia en Argentina.
            </p>
          </div>

          {/* Producto */}
          <div>
            <h5 style={{
              color: C.paper, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.12em',
              fontWeight: 600, margin: 0, marginBottom: '1rem',
            }}>Producto</h5>
            <FootLink href="#modalidades">Modalidades</FootLink>
            <FootLink href="#como-funciona">Cómo funciona</FootLink>
            <FootLink href="#faq">FAQ</FootLink>
          </div>

          {/* Legal */}
          <div>
            <h5 style={{
              color: C.paper, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.12em',
              fontWeight: 600, margin: 0, marginBottom: '1rem',
            }}>Legal</h5>
            <FootLink href="#">Términos y Condiciones</FootLink>
            <FootLink href="#">Política de Privacidad</FootLink>
            <FootLink href="#">Defensa al consumidor</FootLink>
          </div>

          {/* Contacto */}
          <div>
            <h5 style={{
              color: C.paper, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.12em',
              fontWeight: 600, margin: 0, marginBottom: '1rem',
            }}>Contacto</h5>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              color: '#25D366', fontSize: '0.92rem', textDecoration: 'none', marginBottom: '0.6rem',
            }}>
              <MessageCircle size={15} /> WhatsApp
            </a>
            <br />
            <span style={{ color: C.muted, fontSize: '0.82rem' }}>
              lotum.com.ar
            </span>
          </div>
        </div>

        <div style={{
          borderTop: `1px solid ${C.border}`,
          paddingTop: '1.5rem',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          gap: '1rem', flexWrap: 'wrap',
        }}>
          <span style={{ color: C.muted, fontSize: '0.78rem' }}>
            © 2026 Lótum. Todos los derechos reservados.
          </span>
          <span style={{ color: C.muted, fontSize: '0.78rem' }}>
            Inversión inmobiliaria · Argentina
          </span>
        </div>
      </div>
    </footer>
  );
}

function FootLink({ href, children }) {
  return (
    <a href={href} style={{
      display: 'block', color: C.paperSoft, fontSize: '0.9rem',
      textDecoration: 'none', marginBottom: '0.6rem', transition: 'color 0.2s',
    }}
    onMouseEnter={(e) => e.currentTarget.style.color = C.terracotta}
    onMouseLeave={(e) => e.currentTarget.style.color = C.paperSoft}
    >{children}</a>
  );
}

// =======================================================================
//   FAB DE WHATSAPP (FLOTANTE)
// =======================================================================
function WhatsAppFAB() {
  return (
    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" style={{
      position: 'fixed', bottom: 'calc(1.5rem + env(safe-area-inset-bottom, 0px))', right: '1.5rem',
      width: 58, height: 58, borderRadius: '50%', background: '#25D366',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: '0 12px 30px rgba(37, 211, 102, 0.4), 0 4px 12px rgba(0,0,0,0.2)',
      zIndex: 90, textDecoration: 'none',
      transition: 'transform 0.25s ease',
    }}
    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      <MessageCircle size={26} color="#fff" strokeWidth={1.8} />
    </a>
  );
}

// =======================================================================
//   COMPONENTE PRINCIPAL — LANDING
// =======================================================================
export default function Landing({ onGoToApp }) {
  return (
    <div style={{
      background: `linear-gradient(180deg, ${C.bgDeep} 0%, ${C.bgMid} 50%, ${C.bgSoft} 100%)`,
      minHeight: '100vh', color: C.paper, fontFamily: fontBody,
      overflowX: 'hidden',
    }}>
      <Navbar onCtaApp={onGoToApp} />
      <Hero onCtaApp={onGoToApp} />
      <QueEsLotum />
      <Modalidades />
      <ComoFunciona />
      <PorQueLotum />
      <DescargarApp onCtaApp={onGoToApp} />
      <ParaQuien onCtaApp={onGoToApp} />
      <FAQ />
      <Footer />
      <WhatsAppFAB />
    </div>
  );
}
