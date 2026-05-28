import React, { useState, useEffect } from 'react';
import { Home, ArrowRight, MapPin, Ruler, DollarSign, Hammer, CheckCircle2, ArrowLeft, Camera, FileText, ChevronRight, Eye, Menu, Bell, Search, Plus, Heart, User, Zap, Wallet, X, Settings, LogOut, HelpCircle, Shield, MessageCircle, Briefcase } from 'lucide-react';
import Landing from './Landing';
import Terminos from './Terminos';
import Modalidades from './Modalidades';
import LegalPage from './LegalPage';
import PRIVACIDAD_DATA from './legalData/privacidad';
import DEFENSA_DATA from './legalData/defensa';
import PUBLICIDAD_DATA from './legalData/publicidad';

// === LÓTUM — Paleta azul marino oscuro con acentos plateados y terracota ===
const COLORS = {
  // Fondo principal — degradado azul marino oscuro
  bgDeep: '#0A1628',
  bgMid: '#13243F',
  bgSoft: '#1B2845',

  // Texto sobre fondo oscuro
  paper: '#F0EEE6',         // crema claro para texto principal
  paperSoft: '#C9C8C0',     // gris claro para texto secundario
  muted: '#8A8B87',         // gris medio para labels

  // Plata tornasolada (para el título "Lótum")
  silver1: '#E8E8E8',
  silver2: '#B8B8B8',
  silver3: '#8E8E8E',

  // Acentos
  terracotta: '#D9663B',    // un poco más vibrante sobre fondo oscuro
  terracottaSoft: '#A04826',
  ink: '#0A1628',           // mantenemos por compatibilidad con código viejo

  // Modalidades (más vibrantes para resaltar sobre fondo oscuro)
  modA: '#D9663B',          // terracota — Reciclado a futuro
  modB: '#5B8BB5',          // azul claro — Contado + reciclado
  modC: '#6FA77F',          // verde claro — Compra simple
  modD: '#C9A961',          // dorado — Inversor a futuro (nueva)

  // Cards / superficies sobre el fondo oscuro
  card: '#1B2845',
  cardSoft: '#243456',
  border: '#2D3F5F',

  // Compat con código viejo
  olive: '#3D4A2A',
  cream: '#F5F1E8',
  creamDark: '#2D3F5F',
  blue: '#5B8BB5',
  green: '#6FA77F',
};

const fontDisplay = "'Fraunces', Georgia, serif";
const fontBody = "'Inter', system-ui, sans-serif";

const MODALITIES = {
  A: {
    id: 'A', name: 'Reciclado a futuro', short: 'Reciclado',
    icon: <Hammer size={14} />, color: COLORS.modA,
    desc: 'El inversor financia la obra. El propietario cobra un 10% más por esperar el proceso completo.',
    forOwner: 'Cobrás un 10% más por esperar',
    forInvestor: 'No comprás la propiedad, ganás con la obra y la venta',
    detail: {
      summary: 'El propietario sigue siendo dueño durante todo el proceso. Acepta esperar el reciclado y la venta a cambio de cobrar un 10% más sobre lo que pedía. El inversor pone toda la inversión de obra, decide el precio de venta final, y se queda con todo el excedente que supere lo pactado.',
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
        title: 'Ejemplo real',
        rows: [
          ['Propietario pide', 'US$ 50.000'],
          ['Se le ofrece (+10%)', 'US$ 55.000'],
          ['Inversión en obra (inversor)', 'US$ 30.000'],
          ['Venta post-reciclado', 'US$ 110.000'],
          ['Cobra primero propietario', 'US$ 55.000'],
          ['Recupera inversor su obra', 'US$ 30.000'],
          ['Ganancia inversor (excedente)', 'US$ 25.000'],
        ],
      },
      benefitsOwner: ['No invertís nada de tu plata', 'Cobrás 10% más que lo que pedías', 'Tu precio queda fijo desde el día 1', 'Cobrás antes que el inversor cuando se vende'],
      benefitsInvestor: ['No comprás la propiedad, solo invertís en obra', 'Vos decidís el precio de venta final', 'Te quedás con todo el excedente sobre lo pactado', 'Ganancia proyectada sobre datos reales'],
      risks: ['Si no se vende en el plazo, se renegocia o se cede según contrato', 'Caída de mercado puede demorar venta o achicar ganancia del inversor', 'El propietario tiene su precio garantizado por contrato'],
    },
  },
  B: {
    id: 'B', name: 'Compra de contado + reciclado', short: 'Contado + obra',
    icon: <Zap size={14} />, color: COLORS.modB,
    desc: 'El inversor compra la propiedad de contado y se queda con el reciclado.',
    forOwner: 'Cobrás ya, aceptando un valor menor',
    forInvestor: 'Comprás barato, reciclás y revendés',
    detail: {
      summary: 'El propietario vende ahora a un precio con descuento. El inversor se queda con la propiedad, la recicla por su cuenta, y revende quedándose con toda la ganancia.',
      howItWorks: [
        'El propietario necesita liquidez inmediata y acepta un descuento.',
        'Un inversor le ofrece un precio de contado (menor al de mercado).',
        'Si llegan a un acuerdo, se firma escritura. Propietario cobra al instante.',
        'El inversor pasa a ser dueño y financia toda la obra.',
        'Cuando termina la obra, vende la propiedad al precio actualizado de mercado.',
        'La ganancia entre compra + obra vs venta final es 100% del inversor.',
      ],
      example: {
        title: 'Ejemplo real',
        rows: [
          ['Propietario pedía', 'US$ 65.000'],
          ['Inversor compró en', 'US$ 50.000 (contado)'],
          ['Inversión en obra', 'US$ 25.000'],
          ['Venta post-reciclado', 'US$ 110.000'],
          ['Ganancia inversor', 'US$ 35.000'],
          ['Tiempo total', '6-8 meses'],
        ],
      },
      benefitsOwner: ['Cobrás todo al instante', 'No esperás obras ni ventas', 'Ideal si necesitás la plata ya'],
      benefitsInvestor: ['Te quedás con toda la ganancia', 'Sos único dueño desde día 1', 'Controlás 100% del proceso'],
      risks: ['Propietario resigna parte del valor por la liquidez', 'Inversor asume todo el riesgo de obra y venta'],
    },
  },
  C: {
    id: 'C', name: 'Compra simple de contado', short: 'Solo contado',
    icon: <Wallet size={14} />, color: COLORS.modC,
    desc: 'El inversor compra al contado. No hay obra de por medio.',
    forOwner: 'Cobrás ya, valor de contado',
    forInvestor: 'Comprás esperando revalorización del mercado',
    detail: {
      summary: 'Compra-venta tradicional pero sin inmobiliarias. El propietario vende, el inversor compra. Ahorran el 6% de comisión que cobran las inmobiliarias.',
      howItWorks: [
        'El propietario publica la propiedad al precio que quiere obtener.',
        'Un inversor (o comprador final) hace una oferta.',
        'Negocian directamente, sin intermediarios.',
        'Se firma escritura con escribanía integrada de Lótum.',
        'Propietario cobra, inversor toma posesión. Listo.',
        'Sin comisión inmobiliaria del 6%. Solo 1,5% de Lótum a cada parte.',
      ],
      example: {
        title: 'Ejemplo real',
        rows: [
          ['Propietario publica en', 'US$ 80.000'],
          ['Compra inversor a', 'US$ 75.000 (negociado)'],
          ['Comisión Lótum (1,5%)', 'US$ 1.125 cada parte'],
          ['Vs inmobiliaria 6%', 'US$ 4.500'],
          ['Ahorro propietario', 'US$ 3.375'],
          ['Tiempo de cierre', '15-30 días'],
        ],
      },
      benefitsOwner: ['Cobrás al instante', 'Ahorrás hasta 75% en comisiones', 'Sin agentes que demoran'],
      benefitsInvestor: ['Comprás directo, sin intermediarios', 'Apostás a revalorización del mercado', 'Ideal para inversión a mediano plazo'],
      risks: ['Necesitás liquidez completa al firmar', 'No hay garantía de revalorización rápida'],
    },
  },
  D: {
    id: 'D', name: 'Inversor a futuro', short: 'A futuro',
    icon: <Briefcase size={14} />, color: COLORS.modD,
    desc: 'El propietario no puede esperar el proceso de reciclado. El inversor le compra hoy a un precio negociado, sabiendo el valor de venta post-reciclado.',
    forOwner: 'Cobrás ya, sin esperar todo el proceso',
    forInvestor: 'Comprás con ganancia ya proyectada al cierre',
    detail: {
      summary: 'El propietario tiene una oferta de reciclado a futuro pero no puede esperar los meses del proceso. Un inversor entra y le compra al contado a un valor negociado, sabiendo cuánto valdrá la propiedad post-reciclado. Ganancia proyectada con bajo riesgo.',
      howItWorks: [
        'El propietario tiene una propiedad que ya fue cotizada con valor post-reciclado.',
        'Recibió una oferta de "Reciclado a futuro" (modalidad A) pero no puede esperar.',
        'Un inversor entra a hacer una oferta de compra inmediata.',
        'El inversor sabe el valor post-reciclado, entonces puede calcular su ganancia con precisión.',
        'Propietario e inversor negocian un precio de contado.',
        'Inversor pasa a ser propietario y continúa con el proceso de reciclado y venta.',
      ],
      example: {
        title: 'Ejemplo real',
        rows: [
          ['Propietario publica en', 'US$ 50.000'],
          ['Oferta original (con espera)', 'US$ 55.000'],
          ['No puede esperar el proceso', '—'],
          ['Inversor ofrece', 'US$ 40.000'],
          ['Cierran negociación en', 'US$ 45.000'],
          ['Ganancia proyectada inversor', 'US$ 10.000'],
        ],
      },
      benefitsOwner: ['Cobrás todo hoy mismo', 'No dependés del proceso de obra ni venta', 'Solución rápida ante urgencia'],
      benefitsInvestor: ['Ganancia calculada con precisión', 'Bajo riesgo porque ya hay valor post-reciclado estimado', 'Entrás a una operación con datos reales'],
      risks: ['Propietario cede parte del valor por la urgencia', 'Inversor asume riesgo de obra y mercado'],
    },
  },
};

const MOCK_PROPERTIES = [
  { id: 1, title: 'Casa Chorizo en Almagro', location: 'Almagro, CABA', surface: 120, rooms: 3, askingPrice: 95000,
    modalities: {
      A: { proposedPrice: 105000, estimatedInvestment: 45000, projectedSale: 185000, investorReturn: 35000, roi: 78, months: 8 },
      B: { cashPrice: 78000, estimatedInvestment: 45000, projectedSale: 185000, investorReturn: 62000, roi: 50, months: 8, acceptsOffers: true },
    },
    status: 'Disponible', image: 'linear-gradient(135deg, #8B6F47 0%, #C2542C 50%, #3D4A2A 100%)',
    description: 'Casa de 3 ambientes con patio. Estructura sólida, requiere reciclado integral de baño y cocina, pisos y pintura general.'
  },
  { id: 2, title: 'PH en Villa Crespo', location: 'Villa Crespo, CABA', surface: 85, rooms: 2, askingPrice: 72000,
    modalities: { A: { proposedPrice: 80000, estimatedInvestment: 32000, projectedSale: 145000, investorReturn: 28000, roi: 87, months: 6 } },
    status: 'Disponible', image: 'linear-gradient(135deg, #3D4A2A 0%, #6B7548 50%, #C2542C 100%)',
    description: 'PH al frente con terraza. Necesita actualización de instalaciones, baño y cocina nuevos.'
  },
  { id: 3, title: 'Depto en Caballito', location: 'Caballito, CABA', surface: 65, rooms: 2, askingPrice: 58000,
    modalities: {
      A: { proposedPrice: 64000, estimatedInvestment: 22000, projectedSale: 108000, investorReturn: 19000, roi: 86, months: 5 },
      B: { cashPrice: 48000, estimatedInvestment: 22000, projectedSale: 108000, investorReturn: 35000, roi: 50, months: 5, acceptsOffers: true },
      C: { cashPrice: 52000, projectedSale: 65000, investorReturn: 11000, roi: 21, acceptsOffers: false },
    },
    status: 'En obra', image: 'linear-gradient(135deg, #C2542C 0%, #8B6F47 50%, #3D4A2A 100%)',
    description: 'Departamento en edificio bajo. Cocina y baño desactualizados, pisos originales en buen estado.'
  },
  { id: 4, title: 'Casa en Flores', location: 'Flores, CABA', surface: 140, rooms: 4, askingPrice: 110000,
    modalities: {
      A: { proposedPrice: 120000, estimatedInvestment: 55000, projectedSale: 215000, investorReturn: 40000, roi: 73, months: 9 },
      B: { cashPrice: 92000, estimatedInvestment: 55000, projectedSale: 215000, investorReturn: 68000, roi: 46, months: 9, acceptsOffers: true },
      C: { cashPrice: 95000, projectedSale: 118000, investorReturn: 18000, roi: 19, acceptsOffers: true },
    },
    status: 'Disponible', image: 'linear-gradient(135deg, #6B7548 0%, #C2542C 50%, #2A3520 100%)',
    description: 'Casa amplia con jardín. Requiere reciclado mayor, oportunidad de ampliación en planta alta.'
  },
  { id: 5, title: 'PH en Boedo', location: 'Boedo, CABA', surface: 78, rooms: 2, askingPrice: 65000,
    modalities: {
      B: { cashPrice: 54000, estimatedInvestment: 28000, projectedSale: 128000, investorReturn: 46000, roi: 56, months: 7, acceptsOffers: true },
      C: { cashPrice: 58000, projectedSale: 72000, investorReturn: 11000, roi: 19, acceptsOffers: true },
    },
    status: 'Disponible', image: 'linear-gradient(135deg, #2A3520 0%, #C2542C 50%, #8B6F47 100%)',
    description: 'PH en planta baja con patio cubierto. Instalaciones a renovar. Propietario necesita vender rápido.'
  },
];

const fmt = (n) => `US$ ${n.toLocaleString('es-AR')}`;

const PaperBg = ({ children }) => (
  <div style={{
    background: `linear-gradient(180deg, ${COLORS.bgDeep} 0%, ${COLORS.bgMid} 50%, ${COLORS.bgSoft} 100%)`,
    minHeight: '100vh', position: 'relative',
    backgroundAttachment: 'fixed',
    // Safe area: respeta notch/Dynamic Island arriba y home indicator abajo
    paddingTop: 'env(safe-area-inset-top, 0px)',
    paddingBottom: 'env(safe-area-inset-bottom, 0px)',
  }}>
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none',
      backgroundImage: `radial-gradient(at 20% 10%, ${COLORS.terracotta}15 0px, transparent 50%), radial-gradient(at 80% 90%, ${COLORS.modD}10 0px, transparent 50%)`,
    }} />
    {children}
  </div>
);

function LotumIcon({ size = 24 }) {
  // Reloj de arena estilizado — simboliza "la paciencia, paga"
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="lotumGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={COLORS.terracotta} />
          <stop offset="100%" stopColor={COLORS.modD} />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="11" stroke="url(#lotumGrad)" strokeWidth="1.5" fill="none" />
      <path d="M7 6 L17 6 L12 12 L17 18 L7 18 L12 12 Z" fill="url(#lotumGrad)" />
    </svg>
  );
}

function Logo({ withSlogan }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: withSlogan ? 'flex-start' : 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <LotumIcon size={26} />
        <span style={{
          fontFamily: fontDisplay, fontSize: '1.35rem', fontWeight: 600, letterSpacing: '-0.02em',
          background: `linear-gradient(135deg, ${COLORS.silver1} 0%, ${COLORS.silver2} 50%, ${COLORS.silver1} 100%)`,
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}>Lótum</span>
      </div>
    </div>
  );
}

const iconBtn = { background: 'transparent', border: 'none', cursor: 'pointer', padding: '0.4rem', borderRadius: '8px', color: COLORS.paper, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, position: 'relative' };

function TopBar({ title, onBack, showLogo, onOpenNotifications, onOpenMenu, hasNotifications }) {
  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(10, 22, 40, 0.85)', backdropFilter: 'blur(14px)', borderBottom: `1px solid ${COLORS.border}80`, padding: '0.9rem 1.2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '56px', boxSizing: 'border-box' }}>
      {onBack ? <button onClick={onBack} style={iconBtn}><ArrowLeft size={20} /></button> : (showLogo ? <Logo /> : <div style={{ width: 36 }} />)}
      {title && (<div style={{ fontFamily: fontDisplay, fontSize: '1.05rem', fontWeight: 500, color: COLORS.paper, position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>{title}</div>)}
      <div style={{ display: 'flex', gap: '0.3rem' }}>
        <button style={iconBtn} onClick={onOpenNotifications} aria-label="Notificaciones">
          <Bell size={20} />
          {hasNotifications && (
            <span style={{ position: 'absolute', top: 6, right: 6, width: 8, height: 8, background: COLORS.terracotta, borderRadius: '50%', boxShadow: `0 0 0 2px ${COLORS.bgDeep}` }} />
          )}
        </button>
        <button style={iconBtn} onClick={onOpenMenu} aria-label="Menú"><Menu size={20} /></button>
      </div>
    </div>
  );
}

// Panel deslizable de Notificaciones
function NotificationsPanel({ open, onClose }) {
  const items = [
    { icon: <CheckCircle2 size={16} />, text: 'Bienvenido a Lótum. Verificá tu identidad para empezar.', time: 'Ahora', unread: true },
    { icon: <Bell size={16} />, text: 'Nueva propiedad disponible en tu zona.', time: 'Hace 2h', unread: true },
    { icon: <Eye size={16} />, text: 'Un inversor vio tu propiedad en Almagro.', time: 'Ayer', unread: false },
  ];
  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 200, opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none', transition: 'opacity 0.25s' }} />
      <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: 'min(360px, 90vw)', background: COLORS.bgMid, zIndex: 201, transform: open ? 'translateX(0)' : 'translateX(100%)', transition: 'transform 0.3s ease', boxShadow: '-8px 0 32px rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '1.2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${COLORS.border}` }}>
          <h3 style={{ fontFamily: fontDisplay, fontSize: '1.15rem', color: COLORS.paper, margin: 0, fontWeight: 600 }}>Notificaciones</h3>
          <button onClick={onClose} style={{ ...iconBtn, color: COLORS.paper }}><X size={20} /></button>
        </div>
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {items.map((it, i) => (
            <div key={i} style={{ padding: '1rem 1.2rem', borderBottom: `1px solid ${COLORS.border}40`, display: 'flex', gap: '0.8rem', alignItems: 'flex-start', background: it.unread ? `${COLORS.terracotta}08` : 'transparent' }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: it.unread ? `${COLORS.terracotta}30` : `${COLORS.border}80`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: COLORS.terracotta, flexShrink: 0 }}>{it.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: fontBody, fontSize: '0.88rem', color: COLORS.paper, lineHeight: 1.4 }}>{it.text}</div>
                <div style={{ fontFamily: fontBody, fontSize: '0.72rem', color: COLORS.muted, marginTop: '0.3rem' }}>{it.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// Panel lateral de Menú principal
function SideMenu({ open, onClose, onNav }) {
  const items = [
    { icon: <User size={18} />, label: 'Mi cuenta', action: 'dashboard' },
    { icon: <Shield size={18} />, label: 'Verificar identidad', action: 'verify' },
    { icon: <Settings size={18} />, label: 'Configuración', action: 'settings' },
    { icon: <HelpCircle size={18} />, label: 'Ayuda y soporte', action: 'help' },
    { icon: <FileText size={18} />, label: 'Términos y condiciones', action: 'terms' },
    { icon: <Shield size={18} />, label: 'Política de privacidad', action: 'privacy' },
    { icon: <LogOut size={18} />, label: 'Cerrar sesión', action: 'logout', danger: true },
  ];
  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 200, opacity: open ? 1 : 0, pointerEvents: open ? 'auto' : 'none', transition: 'opacity 0.25s' }} />
      <div style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: 'min(320px, 85vw)', background: COLORS.bgMid, zIndex: 201, transform: open ? 'translateX(0)' : 'translateX(100%)', transition: 'transform 0.3s ease', boxShadow: '-8px 0 32px rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '1.2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${COLORS.border}` }}>
          <Logo />
          <button onClick={onClose} style={{ ...iconBtn, color: COLORS.paper }}><X size={20} /></button>
        </div>
        <div style={{ padding: '1.2rem', borderBottom: `1px solid ${COLORS.border}` }}>
          <div style={{ fontFamily: fontBody, fontSize: '0.75rem', color: COLORS.muted, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Hola</div>
          <div style={{ fontFamily: fontDisplay, fontSize: '1.1rem', color: COLORS.paper, fontWeight: 500 }}>Iniciar sesión</div>
          <div style={{ fontFamily: fontBody, fontSize: '0.8rem', color: COLORS.paperSoft, marginTop: '0.2rem' }}>Para acceder a todas las funciones</div>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '0.5rem 0' }}>
          {items.map((it, i) => (
            <button key={i} onClick={() => { onClose(); if (it.action === 'dashboard') onNav('dashboard'); }} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '0.9rem', padding: '0.9rem 1.2rem', background: 'transparent', border: 'none', cursor: 'pointer', color: it.danger ? COLORS.terracotta : COLORS.paper, fontFamily: fontBody, fontSize: '0.95rem', textAlign: 'left' }}>
              <span style={{ color: it.danger ? COLORS.terracotta : COLORS.paperSoft }}>{it.icon}</span>
              <span>{it.label}</span>
              <ChevronRight size={16} style={{ marginLeft: 'auto', color: COLORS.muted }} />
            </button>
          ))}
        </div>
        <div style={{ padding: '1rem 1.2rem', borderTop: `1px solid ${COLORS.border}`, fontFamily: fontBody, fontSize: '0.72rem', color: COLORS.muted, textAlign: 'center' }}>
          Lótum v1.0 — La paciencia, paga.
        </div>
      </div>
    </>
  );
}

// Botón flotante de WhatsApp
const WHATSAPP_NUMBER = '5492235834453';
const WHATSAPP_MESSAGE = 'Hola Lótum! Quiero info sobre cómo invertir/vender una propiedad.';

function WhatsAppFAB({ hidden }) {
  if (hidden) return null;
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" style={{
      position: 'fixed', bottom: 'calc(90px + env(safe-area-inset-bottom))', right: '1rem',
      width: 56, height: 56, borderRadius: '50%', background: '#25D366',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: '0 6px 20px rgba(37, 211, 102, 0.45)', zIndex: 90,
      textDecoration: 'none',
    }}>
      <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    </a>
  );
}

function BottomNav({ current, onNav }) {
  const items = [
    { id: 'landing', icon: <Home size={22} />, label: 'Inicio' },
    { id: 'marketplace', icon: <Search size={22} />, label: 'Explorar' },
    { id: 'onboarding-owner', icon: <Plus size={26} />, label: 'Publicar', primary: true },
    { id: 'favorites', icon: <Heart size={22} />, label: 'Guardados' },
    { id: 'dashboard', icon: <User size={22} />, label: 'Panel' },
  ];
  return (
    <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: 'rgba(10, 22, 40, 0.92)', backdropFilter: 'blur(14px)', borderTop: `1px solid ${COLORS.border}80`, padding: '0.5rem 0.5rem calc(0.5rem + env(safe-area-inset-bottom))', display: 'flex', justifyContent: 'space-around', alignItems: 'center', zIndex: 100, maxWidth: '430px', margin: '0 auto' }}>
      {items.map(item => (
        <button key={item.id} onClick={() => onNav(item.id)} style={{ background: item.primary ? COLORS.terracotta : 'transparent', border: 'none', cursor: 'pointer', padding: item.primary ? '0.7rem' : '0.5rem', borderRadius: item.primary ? '50%' : '8px', color: item.primary ? COLORS.paper : (current === item.id ? COLORS.terracotta : COLORS.paperSoft), display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.2rem', transform: item.primary ? 'translateY(-12px)' : 'none', boxShadow: item.primary ? `0 6px 16px ${COLORS.terracotta}80` : 'none' }}>
          {item.icon}
          {!item.primary && (<span style={{ fontFamily: fontBody, fontSize: '0.65rem', fontWeight: 500, color: current === item.id ? COLORS.terracotta : COLORS.paperSoft }}>{item.label}</span>)}
        </button>
      ))}
    </div>
  );
}

const primaryBtn = { background: COLORS.terracotta, color: COLORS.paper, border: 'none', padding: '1rem 1.4rem', borderRadius: '999px', fontFamily: fontBody, fontSize: '0.95rem', fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', width: '100%', boxShadow: `0 6px 20px ${COLORS.terracotta}55` };
const secondaryBtn = { background: 'transparent', color: COLORS.paper, border: `1.5px solid ${COLORS.paper}`, padding: '0.95rem 1.4rem', borderRadius: '999px', fontFamily: fontBody, fontSize: '0.95rem', fontWeight: 500, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', width: '100%' };
const chipStyle = { padding: '0.5rem 0.9rem', borderRadius: '999px', border: `1px solid ${COLORS.border}`, background: 'transparent', fontFamily: fontBody, fontSize: '0.8rem', fontWeight: 500, color: COLORS.paper, cursor: 'pointer' };
const titleStyle = { fontFamily: fontDisplay, fontSize: '1.6rem', fontWeight: 500, letterSpacing: '-0.02em', margin: '0 0 0.4rem', color: COLORS.paper, lineHeight: 1.15 };
const subtitleStyle = { fontFamily: fontBody, fontSize: '0.95rem', color: COLORS.paperSoft, margin: '0 0 1.5rem', lineHeight: 1.5 };
const sectionTitleStyle = { fontFamily: fontDisplay, fontSize: '1.2rem', fontWeight: 500, letterSpacing: '-0.01em', margin: '0 0 0.9rem', color: COLORS.paper };
const fieldLabelStyle = { display: 'block', fontFamily: fontBody, fontSize: '0.85rem', fontWeight: 500, color: COLORS.paper, marginBottom: '0.45rem' };
const inputStyle = { width: '100%', padding: '0.85rem 1rem', borderRadius: '12px', border: `1px solid ${COLORS.border}`, background: COLORS.card, fontFamily: fontBody, fontSize: '1rem', color: COLORS.paper, outline: 'none', boxSizing: 'border-box', WebkitAppearance: 'none' };
const checkboxStyle = { display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.7rem 0.9rem', background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: '10px', fontFamily: fontBody, fontSize: '0.85rem', color: COLORS.paper, cursor: 'pointer' };

function ModalityBadge({ modality, small }) {
  const mod = MODALITIES[modality];
  if (!mod) return null;
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', padding: small ? '0.2rem 0.5rem' : '0.3rem 0.65rem', background: `${mod.color}15`, border: `1px solid ${mod.color}40`, borderRadius: '999px', fontFamily: fontBody, fontSize: small ? '0.65rem' : '0.7rem', fontWeight: 600, color: mod.color, letterSpacing: '0.02em' }}>
      {mod.icon} {mod.short}
    </div>
  );
}

// Pantalla de detalle profundo de una modalidad
function ModalityDetail({ modalityId, onBack, onNav }) {
  const mod = MODALITIES[modalityId];
  if (!mod || !mod.detail) return null;
  const d = mod.detail;

  return (
    <div style={{ paddingBottom: '120px' }}>
      {/* Hero de la modalidad */}
      <section style={{ padding: '1.5rem 1.2rem 2rem', background: `linear-gradient(180deg, ${mod.color}25 0%, transparent 100%)`, borderBottom: `1px solid ${COLORS.border}` }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.4rem 0.8rem', background: `${mod.color}25`, border: `1px solid ${mod.color}50`, borderRadius: '999px', marginBottom: '1rem' }}>
          <div style={{ color: mod.color }}>{mod.icon}</div>
          <span style={{ fontFamily: fontBody, fontSize: '0.75rem', fontWeight: 600, color: mod.color, letterSpacing: '0.03em', textTransform: 'uppercase' }}>Modalidad</span>
        </div>
        <h1 style={{ fontFamily: fontDisplay, fontSize: '2rem', fontWeight: 600, letterSpacing: '-0.02em', color: COLORS.paper, margin: '0 0 0.6rem', lineHeight: 1.1 }}>{mod.name}</h1>
        <p style={{ fontFamily: fontBody, fontSize: '1rem', color: COLORS.paperSoft, lineHeight: 1.55, margin: 0 }}>{d.summary}</p>
      </section>

      {/* Cómo funciona */}
      <section style={{ padding: '2rem 1.2rem 1rem' }}>
        <div style={{ fontFamily: fontBody, fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: mod.color, marginBottom: '0.6rem', fontWeight: 700 }}>Cómo funciona</div>
        <h2 style={{ fontFamily: fontDisplay, fontSize: '1.4rem', fontWeight: 500, letterSpacing: '-0.01em', color: COLORS.paper, margin: '0 0 1.2rem', lineHeight: 1.2 }}>Paso a paso</h2>
        {d.howItWorks.map((step, i) => (
          <div key={i} style={{ display: 'flex', gap: '0.9rem', marginBottom: '1rem', alignItems: 'flex-start' }}>
            <div style={{ minWidth: 28, width: 28, height: 28, borderRadius: '50%', background: `${mod.color}30`, border: `1.5px solid ${mod.color}`, color: mod.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: fontDisplay, fontSize: '0.85rem', fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
            <div style={{ fontFamily: fontBody, fontSize: '0.92rem', color: COLORS.paper, lineHeight: 1.5, paddingTop: '0.2rem' }}>{step}</div>
          </div>
        ))}
      </section>

      {/* Ejemplo numérico */}
      <section style={{ padding: '1rem 1.2rem 1rem' }}>
        <div style={{ background: COLORS.card, border: `1px solid ${mod.color}40`, borderRadius: '16px', padding: '1.3rem', borderLeft: `4px solid ${mod.color}` }}>
          <div style={{ fontFamily: fontBody, fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: mod.color, marginBottom: '0.5rem', fontWeight: 700 }}>{d.example.title}</div>
          <h3 style={{ fontFamily: fontDisplay, fontSize: '1.15rem', fontWeight: 600, color: COLORS.paper, margin: '0 0 1rem' }}>Caso real con números</h3>
          {d.example.rows.map(([label, value], i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.7rem 0', borderBottom: i < d.example.rows.length - 1 ? `1px solid ${COLORS.border}60` : 'none' }}>
              <div style={{ fontFamily: fontBody, fontSize: '0.88rem', color: COLORS.paperSoft }}>{label}</div>
              <div style={{ fontFamily: fontDisplay, fontSize: '1rem', fontWeight: 600, color: i === d.example.rows.length - 1 ? mod.color : COLORS.paper, textAlign: 'right' }}>{value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Beneficios para cada parte */}
      <section style={{ padding: '1.5rem 1.2rem 1rem' }}>
        <div style={{ fontFamily: fontBody, fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: mod.color, marginBottom: '0.6rem', fontWeight: 700 }}>Beneficios</div>
        <h2 style={{ fontFamily: fontDisplay, fontSize: '1.4rem', fontWeight: 500, letterSpacing: '-0.01em', color: COLORS.paper, margin: '0 0 1.2rem', lineHeight: 1.2 }}>Lo que ganás</h2>

        <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: '14px', padding: '1.1rem', marginBottom: '0.8rem' }}>
          <div style={{ fontFamily: fontBody, fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: COLORS.muted, marginBottom: '0.6rem', fontWeight: 700 }}>Si sos propietario</div>
          {d.benefitsOwner.map((b, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
              <CheckCircle2 size={16} style={{ color: mod.color, flexShrink: 0, marginTop: '2px' }} />
              <div style={{ fontFamily: fontBody, fontSize: '0.88rem', color: COLORS.paper, lineHeight: 1.45 }}>{b}</div>
            </div>
          ))}
        </div>

        <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: '14px', padding: '1.1rem' }}>
          <div style={{ fontFamily: fontBody, fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: COLORS.muted, marginBottom: '0.6rem', fontWeight: 700 }}>Si sos inversor</div>
          {d.benefitsInvestor.map((b, i) => (
            <div key={i} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
              <CheckCircle2 size={16} style={{ color: mod.color, flexShrink: 0, marginTop: '2px' }} />
              <div style={{ fontFamily: fontBody, fontSize: '0.88rem', color: COLORS.paper, lineHeight: 1.45 }}>{b}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Riesgos a considerar */}
      <section style={{ padding: '1.5rem 1.2rem 1rem' }}>
        <div style={{ background: `${COLORS.terracotta}12`, border: `1px solid ${COLORS.terracotta}40`, borderRadius: '14px', padding: '1.1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem' }}>
            <Shield size={16} style={{ color: COLORS.terracotta }} />
            <div style={{ fontFamily: fontBody, fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: COLORS.terracotta, fontWeight: 700 }}>A considerar</div>
          </div>
          {d.risks.map((r, i) => (
            <div key={i} style={{ fontFamily: fontBody, fontSize: '0.85rem', color: COLORS.paper, lineHeight: 1.5, marginBottom: i < d.risks.length - 1 ? '0.4rem' : 0 }}>• {r}</div>
          ))}
        </div>
      </section>

      {/* CTAs finales */}
      <section style={{ padding: '1.5rem 1.2rem 2rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
          <button onClick={() => onNav('onboarding-owner')} style={{ ...primaryBtn, background: mod.color, boxShadow: `0 6px 20px ${mod.color}55` }}>
            Publicar con esta modalidad <ArrowRight size={18} />
          </button>
          <button onClick={() => onNav('marketplace')} style={secondaryBtn}>
            Ver propiedades disponibles <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
}

function Field({ label, placeholder, prefix, textarea }) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label style={fieldLabelStyle}>{label}</label>
      <div style={{ position: 'relative' }}>
        {prefix && <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', fontFamily: fontBody, fontSize: '0.95rem', color: COLORS.muted, pointerEvents: 'none' }}>{prefix}</span>}
        {textarea ? <textarea placeholder={placeholder} rows={3} style={{ ...inputStyle, paddingLeft: '1rem', resize: 'vertical', minHeight: '80px' }} /> : <input placeholder={placeholder} style={{ ...inputStyle, paddingLeft: prefix ? '2.8rem' : '1rem' }} />}
      </div>
    </div>
  );
}

function UploadBox({ icon, label, hint }) {
  return (
    <div style={{ border: `2px dashed ${COLORS.border}`, borderRadius: '14px', padding: '1.5rem', textAlign: 'center', cursor: 'pointer', marginBottom: '0.8rem', background: COLORS.card }}>
      <div style={{ color: COLORS.terracotta, marginBottom: '0.6rem', display: 'flex', justifyContent: 'center' }}>{icon}</div>
      <div style={{ fontFamily: fontBody, fontSize: '0.9rem', fontWeight: 500, color: COLORS.paper, marginBottom: '0.2rem' }}>{label}</div>
      <div style={{ fontFamily: fontBody, fontSize: '0.75rem', color: COLORS.muted }}>{hint}</div>
    </div>
  );
}

function AppHome({ onNav }) {
  return (
    <div style={{ paddingBottom: '100px' }}>
      {/* Hero con logo grande y slogan */}
      <section style={{ padding: '2rem 1.2rem 1rem', textAlign: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div style={{ marginBottom: '1rem' }}>
            <LotumIcon size={72} />
          </div>
          <h1 style={{
            fontFamily: fontDisplay, fontSize: '3.5rem', fontWeight: 700, letterSpacing: '-0.04em',
            margin: '0 0 0.4rem', lineHeight: 1,
            background: `linear-gradient(135deg, ${COLORS.silver1} 0%, ${COLORS.silver2} 30%, ${COLORS.silver3} 50%, ${COLORS.silver2} 70%, ${COLORS.silver1} 100%)`,
            backgroundSize: '200% 100%',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'shimmer 6s ease-in-out infinite',
            textShadow: '0 2px 20px rgba(255,255,255,0.1)',
          }}>Lótum</h1>
          <div style={{ fontFamily: fontDisplay, fontSize: '1.15rem', fontStyle: 'italic', color: COLORS.terracotta, fontWeight: 500, letterSpacing: '-0.01em' }}>
            La paciencia, paga.
          </div>
        </div>
      </section>

      <section style={{ padding: '0.5rem 1.2rem 2.5rem' }}>
        <div style={{ display: 'inline-block', padding: '0.35rem 0.8rem', background: `${COLORS.terracotta}25`, borderRadius: '999px', fontSize: '0.7rem', fontFamily: fontBody, fontWeight: 600, color: COLORS.terracotta, marginBottom: '1.2rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>◯ Inversión inmobiliaria nueva</div>
        <h2 style={{ fontFamily: fontDisplay, fontSize: 'clamp(2rem, 8vw, 2.6rem)', fontWeight: 500, lineHeight: 1.05, letterSpacing: '-0.03em', color: COLORS.paper, margin: '0 0 1.2rem' }}>
          Propiedades que <em style={{ fontStyle: 'italic', color: COLORS.terracotta }}>vuelven a vivir</em>.
        </h2>
        <p style={{ fontFamily: fontBody, fontSize: '1.05rem', lineHeight: 1.55, color: COLORS.paperSoft, margin: '0 0 2rem' }}>
          Cuatro formas de invertir y vender. Vos elegís cómo.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
          <button onClick={() => onNav('onboarding-owner')} style={primaryBtn}>Tengo una propiedad <ArrowRight size={18} /></button>
          <button onClick={() => onNav('onboarding-investor')} style={secondaryBtn}>Quiero invertir <ArrowRight size={18} /></button>
        </div>
      </section>

      <section style={{ padding: '1rem 1.2rem 2rem' }}>
        <div style={{ fontFamily: fontBody, fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: COLORS.terracotta, marginBottom: '0.5rem', fontWeight: 600 }}>Cuatro modalidades</div>
        <h2 style={{ fontFamily: fontDisplay, fontSize: '1.5rem', fontWeight: 500, letterSpacing: '-0.02em', margin: '0 0 1.5rem', color: COLORS.paper, lineHeight: 1.15 }}>
          Cada propiedad, su mejor camino.
        </h2>
        {Object.values(MODALITIES).map(mod => (
          <div key={mod.id} onClick={() => onNav('modality-detail', mod.id)} style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: '14px', padding: '1.1rem', marginBottom: '0.7rem', borderLeft: `4px solid ${mod.color}`, cursor: 'pointer', transition: 'transform 0.15s ease', position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <div style={{ color: mod.color }}>{mod.icon}</div>
              <h3 style={{ fontFamily: fontDisplay, fontSize: '1.05rem', fontWeight: 600, margin: 0, color: COLORS.paper, flex: 1 }}>{mod.name}</h3>
              <ChevronRight size={18} style={{ color: mod.color }} />
            </div>
            <p style={{ fontFamily: fontBody, fontSize: '0.85rem', color: COLORS.paperSoft, margin: '0 0 0.6rem', lineHeight: 1.5 }}>{mod.desc}</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginTop: '0.7rem' }}>
              <div style={{ fontSize: '0.7rem', fontFamily: fontBody }}>
                <div style={{ color: COLORS.muted, marginBottom: '0.2rem', letterSpacing: '0.03em', textTransform: 'uppercase', fontWeight: 600, fontSize: '0.6rem' }}>Propietario</div>
                <div style={{ color: COLORS.paper, lineHeight: 1.4 }}>{mod.forOwner}</div>
              </div>
              <div style={{ fontSize: '0.7rem', fontFamily: fontBody }}>
                <div style={{ color: COLORS.muted, marginBottom: '0.2rem', letterSpacing: '0.03em', textTransform: 'uppercase', fontWeight: 600, fontSize: '0.6rem' }}>Inversor</div>
                <div style={{ color: COLORS.paper, lineHeight: 1.4 }}>{mod.forInvestor}</div>
              </div>
            </div>
            <div style={{ marginTop: '0.9rem', paddingTop: '0.7rem', borderTop: `1px solid ${COLORS.border}80`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: fontBody, fontSize: '0.78rem', fontWeight: 600, color: mod.color, letterSpacing: '0.02em' }}>Ver cómo funciona</span>
              <span style={{ fontFamily: fontBody, fontSize: '0.7rem', color: COLORS.muted }}>Con ejemplo real</span>
            </div>
          </div>
        ))}
      </section>

      <section style={{ padding: '1rem 0 2rem' }}>
        <div style={{ padding: '0 1.2rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <h2 style={{ fontFamily: fontDisplay, fontSize: '1.4rem', fontWeight: 500, letterSpacing: '-0.01em', margin: 0, color: COLORS.paper }}>Disponibles ahora</h2>
          <button onClick={() => onNav('marketplace')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: fontBody, fontSize: '0.85rem', fontWeight: 500, color: COLORS.terracotta, display: 'flex', alignItems: 'center', gap: '0.2rem' }}>Ver todas <ChevronRight size={14} /></button>
        </div>
        <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', padding: '0 1.2rem 0.5rem', WebkitOverflowScrolling: 'touch' }}>
          {MOCK_PROPERTIES.slice(0, 3).map(p => {
            const firstMod = Object.keys(p.modalities)[0];
            const modData = p.modalities[firstMod];
            return (
              <div key={p.id} onClick={() => onNav('detail', p)} style={{ minWidth: '260px', background: COLORS.card, borderRadius: '16px', overflow: 'hidden', border: `1px solid ${COLORS.border}`, cursor: 'pointer', boxShadow: '0 4px 16px rgba(0,0,0,0.3)' }}>
                <div style={{ height: '140px', background: p.image, position: 'relative' }}>
                  <div style={{ position: 'absolute', top: '0.7rem', left: '0.7rem', display: 'flex', gap: '0.3rem' }}>
                    {Object.keys(p.modalities).map(m => <ModalityBadge key={m} modality={m} small />)}
                  </div>
                </div>
                <div style={{ padding: '1rem' }}>
                  <h3 style={{ fontFamily: fontDisplay, fontSize: '1rem', fontWeight: 500, margin: '0 0 0.3rem', color: COLORS.paper }}>{p.title}</h3>
                  <div style={{ fontFamily: fontBody, fontSize: '0.75rem', color: COLORS.paperSoft, marginBottom: '0.8rem' }}>{p.location}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.7rem', borderTop: `1px solid ${COLORS.border}` }}>
                    <div>
                      <div style={{ fontSize: '0.65rem', color: COLORS.muted, fontFamily: fontBody }}>Desde</div>
                      <div style={{ fontFamily: fontDisplay, fontSize: '1.1rem', fontWeight: 600, color: COLORS.paper, lineHeight: 1 }}>{fmt(modData.cashPrice || modData.estimatedInvestment)}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.65rem', color: COLORS.muted, fontFamily: fontBody }}>ROI máx.</div>
                      <div style={{ fontFamily: fontDisplay, fontSize: '1.2rem', fontWeight: 600, color: COLORS.terracotta, lineHeight: 1 }}>{Math.max(...Object.values(p.modalities).map(m => m.roi || 0))}%</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section style={{ background: COLORS.bgDeep, color: COLORS.paper, padding: '3rem 1.2rem 2rem', borderRadius: '24px 24px 0 0', margin: '0 0.6rem', border: `1px solid ${COLORS.border}` }}>
        <div style={{ fontFamily: fontBody, fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: COLORS.terracotta, marginBottom: '0.8rem' }}>Cómo funciona</div>
        <h2 style={{ fontFamily: fontDisplay, fontSize: '1.8rem', fontWeight: 500, lineHeight: 1.1, letterSpacing: '-0.02em', margin: '0 0 2rem' }}>Publicás una vez,<br />elegís cómo vendés.</h2>
        {[
          { n: '01', title: 'Publicás', desc: 'Subís tu propiedad y elegís qué modalidades aceptás. Podés aceptar las cuatro o solo una.' },
          { n: '02', title: 'Recibís ofertas', desc: 'Inversores te contactan con propuestas. Vos aceptás la que mejor te sirva.' },
          { n: '03', title: 'Cerrás', desc: 'Firmás contrato modelo según la modalidad. Lótum cobra 1,5% a cada parte al cierre.' },
        ].map(step => (
          <div key={step.n} style={{ padding: '1.5rem 0', borderTop: `1px solid ${COLORS.paper}25` }}>
            <div style={{ fontFamily: fontDisplay, fontSize: '2rem', fontWeight: 400, color: COLORS.terracotta, marginBottom: '0.5rem', lineHeight: 1 }}>{step.n}</div>
            <h3 style={{ fontFamily: fontDisplay, fontSize: '1.2rem', fontWeight: 500, margin: '0 0 0.5rem' }}>{step.title}</h3>
            <p style={{ fontFamily: fontBody, fontSize: '0.9rem', lineHeight: 1.55, color: `${COLORS.paper}cc`, margin: 0 }}>{step.desc}</p>
          </div>
        ))}
      </section>

      <section style={{ padding: '2rem 1.2rem 3rem', background: COLORS.bgDeep, color: COLORS.paper, margin: '0 0.6rem', borderRadius: '0 0 24px 24px', border: `1px solid ${COLORS.border}`, borderTop: 'none' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          {[
            { val: '4', label: 'modalidades posibles según tu necesidad' },
            { val: '50-90%', label: 'ROI proyectado del inversor' },
            { val: '6-12', label: 'meses por ciclo (modalidad reciclado)' },
            { val: 'Inmediato', label: 'cobro con modalidad contado' },
          ].map((s, i) => (
            <div key={i}>
              <div style={{ fontFamily: fontDisplay, fontSize: '1.8rem', fontWeight: 500, color: COLORS.terracotta, lineHeight: 1, marginBottom: '0.3rem', letterSpacing: '-0.02em' }}>{s.val}</div>
              <div style={{ fontFamily: fontBody, fontSize: '0.8rem', color: `${COLORS.paper}aa`, lineHeight: 1.4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function OnboardingOwner({ onFinish }) {
  const [step, setStep] = useState(1);
  const [modalitiesAccepted, setModalitiesAccepted] = useState({ A: true, B: false, C: false, D: false });
  const totalSteps = 5;
  const toggleModality = (key) => setModalitiesAccepted(prev => ({ ...prev, [key]: !prev[key] }));
  const atLeastOne = Object.values(modalitiesAccepted).some(v => v);

  return (
    <div style={{ paddingBottom: '120px' }}>
      <div style={{ padding: '1rem 1.2rem 1.5rem' }}>
        <div style={{ display: 'flex', gap: '0.3rem', marginBottom: '1.5rem' }}>
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div key={i} style={{ flex: 1, height: '3px', background: i < step ? COLORS.terracotta : COLORS.border, borderRadius: '999px' }} />
          ))}
        </div>
        <div style={{ fontFamily: fontBody, fontSize: '0.75rem', color: COLORS.muted, marginBottom: '0.7rem', letterSpacing: '0.05em', fontWeight: 500 }}>PASO {step} DE {totalSteps}</div>

        {step === 1 && (<>
          <h2 style={titleStyle}>Contanos sobre tu propiedad</h2>
          <p style={subtitleStyle}>Datos básicos para empezar.</p>
          <Field label="Dirección" placeholder="Av. Corrientes 1234" />
          <Field label="Barrio / Localidad" placeholder="Almagro, CABA" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.7rem' }}>
            <Field label="Superficie (m²)" placeholder="120" />
            <Field label="Ambientes" placeholder="3" />
          </div>
        </>)}

        {step === 2 && (<>
          <h2 style={titleStyle}>¿Cuánto pedís?</h2>
          <p style={subtitleStyle}>Tu precio de referencia. Sobre esto se arman las modalidades.</p>
          <Field label="Precio actual de venta" placeholder="95000" prefix="US$" />
        </>)}

        {step === 3 && (<>
          <h2 style={titleStyle}>¿Cómo querés vender?</h2>
          <p style={subtitleStyle}>Podés aceptar una, dos, tres o las cuatro modalidades. Cuantas más aceptes, más ofertas vas a recibir.</p>
          {Object.values(MODALITIES).map(mod => (
            <div key={mod.id} onClick={() => toggleModality(mod.id)} style={{ background: modalitiesAccepted[mod.id] ? `${mod.color}15` : COLORS.card, border: `2px solid ${modalitiesAccepted[mod.id] ? mod.color : COLORS.border}`, borderRadius: '14px', padding: '1.1rem', marginBottom: '0.7rem', cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem' }}>
                <div style={{ width: 22, height: 22, borderRadius: '6px', border: `2px solid ${modalitiesAccepted[mod.id] ? mod.color : COLORS.border}`, background: modalitiesAccepted[mod.id] ? mod.color : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                  {modalitiesAccepted[mod.id] && <CheckCircle2 size={14} style={{ color: COLORS.paper }} />}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                    <div style={{ color: mod.color }}>{mod.icon}</div>
                    <h3 style={{ fontFamily: fontDisplay, fontSize: '1rem', fontWeight: 600, margin: 0, color: COLORS.paper }}>{mod.name}</h3>
                  </div>
                  <p style={{ fontFamily: fontBody, fontSize: '0.82rem', color: COLORS.paperSoft, margin: '0 0 0.4rem', lineHeight: 1.5 }}>{mod.desc}</p>
                  <div style={{ fontFamily: fontBody, fontSize: '0.78rem', color: COLORS.paper, fontWeight: 500 }}>Para vos: {mod.forOwner}</div>
                </div>
              </div>
            </div>
          ))}
          {!atLeastOne && (<div style={{ background: `${COLORS.terracotta}25`, padding: '0.8rem', borderRadius: '10px', fontFamily: fontBody, fontSize: '0.8rem', color: COLORS.terracotta, marginTop: '0.5rem' }}>Tenés que elegir al menos una modalidad.</div>)}
        </>)}

        {step === 4 && (<>
          <h2 style={titleStyle}>Estado actual</h2>
          <p style={subtitleStyle}>Qué hay que reciclar.</p>
          <Field label="Descripción del estado" placeholder="Estructura sólida, baño y cocina desactualizados..." textarea />
          <div style={{ fontFamily: fontBody, fontSize: '0.85rem', fontWeight: 500, color: COLORS.paper, marginTop: '1rem', marginBottom: '0.6rem' }}>Qué necesita reciclado</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
            {['Baño', 'Cocina', 'Pisos', 'Pintura', 'Instalaciones', 'Techos'].map(item => (
              <label key={item} style={checkboxStyle}>
                <input type="checkbox" style={{ accentColor: COLORS.terracotta }} />
                {item}
              </label>
            ))}
          </div>
        </>)}

        {step === 5 && (<>
          <h2 style={titleStyle}>Fotos y documentación</h2>
          <p style={subtitleStyle}>Subí lo que tengas a mano.</p>
          <UploadBox icon={<Camera size={26} />} label="Fotos de la propiedad" hint="Hasta 20 imágenes" />
          <UploadBox icon={<FileText size={26} />} label="Título y documentación" hint="PDF · opcional ahora" />
          <div style={{ marginTop: '1.5rem', padding: '1rem', background: `${COLORS.olive}10`, border: `1px solid ${COLORS.olive}30`, borderRadius: '12px' }}>
            <div style={{ fontFamily: fontBody, fontSize: '0.85rem', fontWeight: 600, color: COLORS.paper, marginBottom: '0.5rem' }}>Vas a publicar con:</div>
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {Object.keys(modalitiesAccepted).filter(k => modalitiesAccepted[k]).map(k => <ModalityBadge key={k} modality={k} />)}
            </div>
          </div>
        </>)}
      </div>

      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, padding: '1rem 1.2rem calc(1rem + env(safe-area-inset-bottom))', background: 'rgba(10, 22, 40, 0.96)', backdropFilter: 'blur(14px)', borderTop: `1px solid ${COLORS.border}80`, display: 'flex', gap: '0.7rem', maxWidth: '430px', margin: '0 auto' }}>
        {step > 1 && <button onClick={() => setStep(step - 1)} style={{ ...secondaryBtn, flex: 1 }}>Atrás</button>}
        <button onClick={() => step < totalSteps ? setStep(step + 1) : onFinish()} disabled={step === 3 && !atLeastOne} style={{ ...primaryBtn, flex: 2, opacity: (step === 3 && !atLeastOne) ? 0.5 : 1 }}>
          {step < totalSteps ? 'Siguiente' : 'Publicar'} <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}

function OnboardingInvestor({ onFinish }) {
  return (
    <div style={{ padding: '1rem 1.2rem 120px' }}>
      <div style={{ fontFamily: fontBody, fontSize: '0.75rem', color: COLORS.muted, marginBottom: '0.7rem', letterSpacing: '0.05em', fontWeight: 500, textTransform: 'uppercase' }}>Perfil de inversor</div>
      <h2 style={titleStyle}>Creá tu perfil</h2>
      <p style={subtitleStyle}>Configurá tus preferencias para ver oportunidades a medida.</p>
      <Field label="Nombre completo" placeholder="Lucas González" />
      <Field label="Capital disponible" placeholder="50000" prefix="US$" />
      <div style={{ marginTop: '1.5rem' }}>
        <label style={fieldLabelStyle}>¿Qué modalidades te interesan?</label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {Object.values(MODALITIES).map(mod => (
            <label key={mod.id} style={{ ...checkboxStyle, padding: '0.9rem' }}>
              <input type="checkbox" defaultChecked style={{ accentColor: mod.color }} />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.15rem' }}>
                  <span style={{ color: mod.color }}>{mod.icon}</span>
                  <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>{mod.name}</span>
                </div>
                <div style={{ fontSize: '0.72rem', color: COLORS.muted, lineHeight: 1.4 }}>{mod.forInvestor}</div>
              </div>
            </label>
          ))}
        </div>
      </div>
      <div style={{ marginTop: '1.5rem' }}>
        <label style={fieldLabelStyle}>Zonas de interés</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
          {['CABA Norte', 'CABA Sur', 'CABA Centro', 'GBA Norte', 'GBA Oeste', 'GBA Sur', 'La Plata', 'Otra'].map(z => <button key={z} style={chipStyle}>{z}</button>)}
        </div>
      </div>
      <button onClick={onFinish} style={{ ...primaryBtn, marginTop: '2rem' }}>Ver oportunidades <ArrowRight size={16} /></button>
    </div>
  );
}

function PropertyCardMobile({ prop, onClick }) {
  const mods = Object.keys(prop.modalities);
  const lowestPrice = Math.min(...Object.values(prop.modalities).map(m => m.cashPrice || m.estimatedInvestment));
  const highestROI = Math.max(...Object.values(prop.modalities).map(m => m.roi));
  return (
    <div onClick={onClick} style={{ background: COLORS.card, border: `1px solid ${COLORS.border}80`, borderRadius: '16px', overflow: 'hidden', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
      <div style={{ height: '180px', background: prop.image, position: 'relative' }}>
        <div style={{ position: 'absolute', top: '0.8rem', left: '0.8rem', display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
          {mods.map(m => <ModalityBadge key={m} modality={m} small />)}
        </div>
        {prop.status === 'En obra' && (<div style={{ position: 'absolute', top: '0.8rem', right: '0.8rem', background: COLORS.terracotta, color: COLORS.paper, padding: '0.25rem 0.6rem', borderRadius: '999px', fontFamily: fontBody, fontSize: '0.7rem', fontWeight: 500 }}>{prop.status}</div>)}
      </div>
      <div style={{ padding: '1.1rem' }}>
        <h3 style={{ fontFamily: fontDisplay, fontSize: '1.15rem', fontWeight: 500, margin: '0 0 0.3rem', letterSpacing: '-0.01em', color: COLORS.paper }}>{prop.title}</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontFamily: fontBody, fontSize: '0.8rem', color: COLORS.muted, marginBottom: '1rem' }}>
          <MapPin size={12} /> {prop.location} · {prop.surface}m² · {prop.rooms} amb.
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem', padding: '0.8rem', background: COLORS.border, borderRadius: '10px' }}>
          <div>
            <div style={{ fontFamily: fontBody, fontSize: '0.65rem', color: COLORS.muted, marginBottom: '0.15rem' }}>Desde</div>
            <div style={{ fontFamily: fontDisplay, fontSize: '0.9rem', fontWeight: 600, color: COLORS.paper, lineHeight: 1 }}>{fmt(lowestPrice).replace('US$ ', '$')}</div>
          </div>
          <div>
            <div style={{ fontFamily: fontBody, fontSize: '0.65rem', color: COLORS.muted, marginBottom: '0.15rem' }}>Modalidades</div>
            <div style={{ fontFamily: fontDisplay, fontSize: '0.9rem', fontWeight: 600, color: COLORS.paper, lineHeight: 1 }}>{mods.length}</div>
          </div>
          <div>
            <div style={{ fontFamily: fontBody, fontSize: '0.65rem', color: COLORS.muted, marginBottom: '0.15rem' }}>ROI máx.</div>
            <div style={{ fontFamily: fontDisplay, fontSize: '0.9rem', fontWeight: 600, color: COLORS.terracotta, lineHeight: 1 }}>{highestROI}%</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Marketplace({ onSelect }) {
  return (
    <div style={{ paddingBottom: '100px' }}>
      <div style={{ padding: '1rem 1.2rem' }}>
        <div style={{ fontFamily: fontBody, fontSize: '0.75rem', color: COLORS.muted, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.3rem', fontWeight: 500 }}>Marketplace</div>
        <h1 style={{ fontFamily: fontDisplay, fontSize: '1.8rem', fontWeight: 500, lineHeight: 1.1, letterSpacing: '-0.02em', margin: '0 0 1.2rem', color: COLORS.paper }}>Propiedades disponibles</h1>
        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', marginBottom: '1.2rem', paddingBottom: '0.3rem', WebkitOverflowScrolling: 'touch' }}>
          {['Todas', 'Reciclado', 'Contado + obra', 'Solo contado', 'A futuro', 'CABA', 'ROI +80%'].map((f, i) => (
            <button key={f} style={{ ...chipStyle, whiteSpace: 'nowrap', flexShrink: 0, background: i === 0 ? COLORS.terracotta : 'transparent', color: i === 0 ? COLORS.paper : COLORS.paper, borderColor: i === 0 ? COLORS.terracotta : COLORS.border }}>{f}</button>
          ))}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {MOCK_PROPERTIES.map(p => <PropertyCardMobile key={p.id} prop={p} onClick={() => onSelect(p)} />)}
        </div>
      </div>
    </div>
  );
}

function DetailStat({ icon, label, value }) {
  return (
    <div style={{ background: COLORS.border, padding: '0.9rem', borderRadius: '12px' }}>
      <div style={{ color: COLORS.terracotta, marginBottom: '0.4rem' }}>{icon}</div>
      <div style={{ fontFamily: fontBody, fontSize: '0.7rem', color: COLORS.muted, marginBottom: '0.1rem' }}>{label}</div>
      <div style={{ fontFamily: fontDisplay, fontSize: '1.05rem', fontWeight: 600, color: COLORS.paper, lineHeight: 1.1 }}>{value}</div>
    </div>
  );
}

function DealRow({ label, value, sub, accent, last }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', padding: '0.8rem 0', borderBottom: last ? 'none' : `1px solid ${COLORS.paper}20` }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: fontBody, fontSize: '0.85rem', color: COLORS.paper }}>{label}</div>
        {sub && <div style={{ fontFamily: fontBody, fontSize: '0.72rem', color: `${COLORS.paper}80`, marginTop: '0.1rem' }}>{sub}</div>}
      </div>
      <div style={{ fontFamily: fontDisplay, fontSize: '1.05rem', fontWeight: 600, color: accent ? COLORS.terracotta : COLORS.paper, letterSpacing: '-0.01em', marginLeft: '0.5rem' }}>{value}</div>
    </div>
  );
}

function ModalitySection({ modality, data, prop }) {
  const mod = MODALITIES[modality];
  const [showOffer, setShowOffer] = useState(false);
  const [offerAmount, setOfferAmount] = useState('');

  return (
    <div style={{ background: COLORS.card, color: COLORS.paper, borderRadius: '16px', padding: '1.3rem', marginBottom: '1rem', borderTop: `4px solid ${mod.color}` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.3rem' }}>
        <div style={{ color: mod.color }}>{mod.icon}</div>
        <h3 style={{ fontFamily: fontDisplay, fontSize: '1.05rem', fontWeight: 600, margin: 0 }}>{mod.name}</h3>
      </div>
      <p style={{ fontFamily: fontBody, fontSize: '0.8rem', color: `${COLORS.paper}aa`, margin: '0 0 1rem', lineHeight: 1.5 }}>{mod.desc}</p>

      {modality === 'A' && (<>
        <DealRow label="Precio al propietario" value={fmt(data.proposedPrice)} sub={`Pide ${fmt(prop.askingPrice)}`} />
        <DealRow label="Inversión en obra" value={fmt(data.estimatedInvestment)} sub="Materiales + mano de obra" />
        <DealRow label="Venta proyectada" value={fmt(data.projectedSale)} sub="Tasación post-obra" />
        <DealRow label="Ganancia inversor" value={fmt(data.investorReturn)} sub={`ROI ${data.roi}% · ${data.months} meses`} accent last />
      </>)}
      {modality === 'B' && (<>
        <DealRow label="Precio de contado" value={fmt(data.cashPrice)} sub={`Descuento sobre ${fmt(prop.askingPrice)}`} />
        <DealRow label="Inversión en obra" value={fmt(data.estimatedInvestment)} sub="A cargo del inversor" />
        <DealRow label="Total inversor" value={fmt(data.cashPrice + data.estimatedInvestment)} sub="Compra + reciclado" />
        <DealRow label="Venta proyectada" value={fmt(data.projectedSale)} sub="Tasación post-obra" />
        <DealRow label="Ganancia inversor" value={fmt(data.investorReturn)} sub={`ROI ${data.roi}% · ${data.months} meses`} accent last />
      </>)}
      {modality === 'C' && (<>
        <DealRow label="Precio de contado" value={fmt(data.cashPrice)} sub={`Descuento sobre ${fmt(prop.askingPrice)}`} />
        <DealRow label="Venta proyectada" value={fmt(data.projectedSale)} sub="Espera de revalorización" />
        <DealRow label="Ganancia inversor" value={fmt(data.investorReturn)} sub={`ROI ${data.roi}%`} accent last />
      </>)}

      {!showOffer ? (
        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.2rem' }}>
          <button style={{ background: mod.color, color: COLORS.paper, border: 'none', padding: '0.8rem', borderRadius: '999px', fontFamily: fontBody, fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', flex: 1 }}>Aceptar términos</button>
          {data.acceptsOffers && (
            <button onClick={() => setShowOffer(true)} style={{ background: 'transparent', color: COLORS.paper, border: `1.5px solid ${COLORS.paper}60`, padding: '0.8rem', borderRadius: '999px', fontFamily: fontBody, fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', flex: 1 }}>Hacer oferta</button>
          )}
        </div>
      ) : (
        <div style={{ marginTop: '1.2rem', padding: '1rem', background: `${mod.color}20`, borderRadius: '12px', border: `1px solid ${mod.color}40` }}>
          <div style={{ fontFamily: fontBody, fontSize: '0.8rem', color: COLORS.paper, marginBottom: '0.6rem', fontWeight: 500 }}>Tu contraoferta (US$)</div>
          <input type="number" value={offerAmount} onChange={(e) => setOfferAmount(e.target.value)} placeholder={`${data.cashPrice || data.proposedPrice}`} style={{ ...inputStyle, background: COLORS.card, marginBottom: '0.7rem' }} />
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button onClick={() => setShowOffer(false)} style={{ background: 'transparent', color: COLORS.paper, border: `1.5px solid ${COLORS.paper}60`, padding: '0.7rem', borderRadius: '999px', fontFamily: fontBody, fontSize: '0.8rem', fontWeight: 500, cursor: 'pointer', flex: 1 }}>Cancelar</button>
            <button style={{ background: mod.color, color: COLORS.paper, border: 'none', padding: '0.7rem', borderRadius: '999px', fontFamily: fontBody, fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', flex: 1 }}>Enviar oferta</button>
          </div>
        </div>
      )}
    </div>
  );
}

function PropertyDetail({ prop }) {
  const [selectedMod, setSelectedMod] = useState(Object.keys(prop.modalities)[0]);
  const availableMods = Object.keys(prop.modalities);

  return (
    <div style={{ paddingBottom: '40px' }}>
      <div style={{ height: '280px', background: prop.image, position: 'relative' }}>
        <div style={{ position: 'absolute', bottom: '1rem', left: '1rem', background: 'rgba(26,26,23,0.85)', backdropFilter: 'blur(8px)', color: COLORS.paper, padding: '0.35rem 0.8rem', borderRadius: '999px', fontFamily: fontBody, fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Eye size={12} /> Render proyectado
        </div>
      </div>
      <div style={{ padding: '1.5rem 1.2rem' }}>
        <h1 style={{ fontFamily: fontDisplay, fontSize: '1.8rem', fontWeight: 500, margin: '0 0 0.4rem', letterSpacing: '-0.02em', color: COLORS.paper }}>{prop.title}</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: fontBody, color: COLORS.muted, fontSize: '0.85rem', marginBottom: '1rem' }}>
          <MapPin size={14} /> {prop.location}
        </div>
        <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          {availableMods.map(m => <ModalityBadge key={m} modality={m} />)}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.6rem', marginBottom: '2rem' }}>
          <DetailStat icon={<Ruler size={16} />} label="Superficie" value={`${prop.surface}m²`} />
          <DetailStat icon={<Home size={16} />} label="Ambientes" value={prop.rooms} />
          <DetailStat icon={<DollarSign size={16} />} label="Pide" value={fmt(prop.askingPrice).replace('US$ ', '$')} />
        </div>
        <h3 style={sectionTitleStyle}>Sobre la propiedad</h3>
        <p style={{ fontFamily: fontBody, fontSize: '0.95rem', lineHeight: 1.65, color: COLORS.paper, marginBottom: '2rem' }}>{prop.description}</p>
        <h3 style={sectionTitleStyle}>Modalidades disponibles</h3>
        <p style={{ fontFamily: fontBody, fontSize: '0.85rem', color: COLORS.muted, marginBottom: '1.5rem', lineHeight: 1.5 }}>
          El propietario aceptó {availableMods.length === 1 ? 'esta modalidad' : `estas ${availableMods.length} modalidades`}. Elegí la que mejor te sirva.
        </p>
        {availableMods.length > 1 && (
          <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1rem', overflowX: 'auto', paddingBottom: '0.3rem' }}>
            {availableMods.map(m => (
              <button key={m} onClick={() => setSelectedMod(m)} style={{ background: selectedMod === m ? MODALITIES[m].color : 'transparent', color: selectedMod === m ? COLORS.paper : COLORS.paper, border: `1.5px solid ${selectedMod === m ? MODALITIES[m].color : COLORS.border}`, padding: '0.5rem 0.9rem', borderRadius: '999px', fontFamily: fontBody, fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0, display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                {MODALITIES[m].icon} {MODALITIES[m].short}
              </button>
            ))}
          </div>
        )}
        <ModalitySection modality={selectedMod} data={prop.modalities[selectedMod]} prop={prop} />
        <div style={{ background: `${COLORS.olive}10`, padding: '1rem', borderRadius: '12px', fontFamily: fontBody, fontSize: '0.8rem', color: COLORS.muted, lineHeight: 1.5, marginTop: '1rem', border: `1px solid ${COLORS.olive}20` }}>
          Al aceptar términos o enviar oferta, iniciás el proceso de due diligence con nuestro equipo. Sin compromiso hasta firmar contrato.
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, sub, highlight }) {
  return (
    <div style={{ background: COLORS.card, border: highlight ? `2px solid ${COLORS.terracotta}` : `1px solid ${COLORS.border}`, padding: '1.2rem', borderRadius: '14px' }}>
      <div style={{ fontFamily: fontBody, fontSize: '0.75rem', color: COLORS.muted, marginBottom: '0.4rem' }}>{label}</div>
      <div style={{ fontFamily: fontDisplay, fontSize: '1.5rem', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1, color: highlight ? COLORS.terracotta : COLORS.paper }}>{value}</div>
      {sub && <div style={{ fontFamily: fontBody, fontSize: '0.7rem', color: COLORS.muted, marginTop: '0.4rem' }}>{sub}</div>}
    </div>
  );
}

function InvestmentRow({ prop }) {
  const progress = prop.status === 'En obra' ? 45 : 15;
  const firstMod = Object.keys(prop.modalities)[0];
  return (
    <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}80`, borderRadius: '14px', padding: '1rem', display: 'flex', gap: '0.9rem', alignItems: 'center' }}>
      <div style={{ width: '60px', height: '60px', background: prop.image, borderRadius: '10px', flexShrink: 0 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <h3 style={{ fontFamily: fontDisplay, fontSize: '0.95rem', fontWeight: 500, margin: 0, color: COLORS.paper, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: '0.2rem' }}>{prop.title}</h3>
        <div style={{ marginBottom: '0.4rem' }}><ModalityBadge modality={firstMod} small /></div>
        <div style={{ height: '4px', background: COLORS.border, borderRadius: '999px', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${progress}%`, background: COLORS.terracotta, borderRadius: '999px' }} />
        </div>
        <div style={{ fontFamily: fontBody, fontSize: '0.65rem', color: COLORS.muted, marginTop: '0.2rem' }}>{progress}% · {prop.status}</div>
      </div>
    </div>
  );
}

function Dashboard() {
  return (
    <div style={{ padding: '1rem 1.2rem 100px' }}>
      <div style={{ fontFamily: fontBody, fontSize: '0.75rem', color: COLORS.muted, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.3rem', fontWeight: 500 }}>Mi panel</div>
      <h1 style={{ fontFamily: fontDisplay, fontSize: '1.8rem', fontWeight: 500, lineHeight: 1.1, letterSpacing: '-0.02em', margin: '0 0 1.5rem', color: COLORS.paper }}>Hola, Lucas</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.7rem', marginBottom: '2rem' }}>
        <StatCard label="Inversiones" value="2" sub="En obra" />
        <StatCard label="Capital invertido" value={fmt(77000)} />
        <StatCard label="Ganancia proy." value={fmt(63000)} highlight />
        <StatCard label="ROI promedio" value="82%" highlight />
      </div>
      <h2 style={sectionTitleStyle}>Mis inversiones</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '2rem' }}>
        {MOCK_PROPERTIES.slice(0, 2).map(p => <InvestmentRow key={p.id} prop={p} />)}
      </div>
      <h2 style={sectionTitleStyle}>Actividad reciente</h2>
      <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}80`, borderRadius: '16px', overflow: 'hidden' }}>
        {[
          { icon: <Hammer size={14} />, text: 'Avance de obra en PH Villa Crespo', time: '2h' },
          { icon: <CheckCircle2 size={14} />, text: 'Oferta aceptada en Boedo', time: '1d' },
          { icon: <DollarSign size={14} />, text: 'Pago a proveedores procesado', time: '3d' },
        ].map((a, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.9rem 1rem', borderBottom: i < 2 ? `1px solid ${COLORS.border}` : 'none' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: COLORS.border, display: 'flex', alignItems: 'center', justifyContent: 'center', color: COLORS.terracotta }}>{a.icon}</div>
            <div style={{ flex: 1, fontFamily: fontBody, fontSize: '0.85rem', color: COLORS.paper }}>{a.text}</div>
            <div style={{ fontFamily: fontBody, fontSize: '0.7rem', color: COLORS.muted }}>{a.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Favorites() {
  return (
    <div style={{ padding: '1rem 1.2rem 100px' }}>
      <div style={{ fontFamily: fontBody, fontSize: '0.75rem', color: COLORS.muted, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.3rem', fontWeight: 500 }}>Guardados</div>
      <h1 style={{ fontFamily: fontDisplay, fontSize: '1.8rem', fontWeight: 500, lineHeight: 1.1, letterSpacing: '-0.02em', margin: '0 0 1.5rem', color: COLORS.paper }}>Mis favoritos</h1>
      <div style={{ textAlign: 'center', padding: '3rem 1rem', color: COLORS.muted, fontFamily: fontBody }}>
        <Heart size={40} style={{ marginBottom: '1rem', opacity: 0.3 }} />
        <div style={{ fontSize: '0.95rem', marginBottom: '0.5rem' }}>Sin propiedades guardadas todavía</div>
        <div style={{ fontSize: '0.85rem', opacity: 0.7 }}>Tocá el corazón en una propiedad para guardarla acá.</div>
      </div>
    </div>
  );
}

// === PASSWORD GATE — Pantalla de acceso privado (pre-lanzamiento) ===
// Para cambiar la clave, modificá la constante ACCESS_KEY abajo.
const ACCESS_KEY = 'lotum2026';
const STORAGE_KEY = 'lotum_access_granted';
const ACCESS_DAYS = 30; // duración del acceso antes de pedir clave de nuevo

function PasswordGate({ children }) {
  const [unlocked, setUnlocked] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return false;
      const { granted, expires } = JSON.parse(stored);
      if (granted && expires && new Date(expires) > new Date()) return true;
      localStorage.removeItem(STORAGE_KEY);
      return false;
    } catch { return false; }
  });
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (input.trim().toLowerCase() === ACCESS_KEY.toLowerCase()) {
      const expires = new Date();
      expires.setDate(expires.getDate() + ACCESS_DAYS);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ granted: true, expires: expires.toISOString() }));
      } catch {}
      setUnlocked(true);
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setTimeout(() => setError(false), 2500);
    }
  };

  if (unlocked) return children;

  return (
    <div style={{
      minHeight: '100vh',
      background: `linear-gradient(180deg, ${COLORS.bgDeep} 0%, ${COLORS.bgMid} 50%, ${COLORS.bgSoft} 100%)`,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      padding: 'max(2rem, env(safe-area-inset-top, 0px)) 1.5rem max(2rem, env(safe-area-inset-bottom, 0px))',
      fontFamily: fontBody, color: COLORS.paper,
    }}>
      <style>{`
        @keyframes shimmer { 0%,100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        @keyframes shake { 0%,100% { transform: translateX(0); } 25% { transform: translateX(-8px); } 75% { transform: translateX(8px); } }
        .lotum-title { background: linear-gradient(90deg, ${COLORS.silver1} 0%, ${COLORS.silver3} 25%, ${COLORS.silver1} 50%, ${COLORS.silver3} 75%, ${COLORS.silver1} 100%); background-size: 200% 100%; -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; animation: shimmer 4s ease-in-out infinite; }
      `}</style>

      {/* Logo reloj de arena */}
      <div style={{ marginBottom: '2rem' }}>
        <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
          <defs>
            <linearGradient id="hourglass-gate" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={COLORS.terracotta} />
              <stop offset="100%" stopColor="#C9A961" />
            </linearGradient>
          </defs>
          <circle cx="36" cy="36" r="33" stroke="url(#hourglass-gate)" strokeWidth="2.5" fill="none" opacity="0.9" />
          <path d="M22 18 L50 18 L36 36 L50 54 L22 54 L36 36 Z" fill="url(#hourglass-gate)" />
        </svg>
      </div>

      <h1 className="lotum-title" style={{ fontFamily: fontDisplay, fontSize: '3rem', fontWeight: 500, letterSpacing: '-0.02em', margin: 0, marginBottom: '0.5rem' }}>
        Lótum
      </h1>
      <p style={{ fontFamily: fontDisplay, fontStyle: 'italic', color: COLORS.terracotta, fontSize: '1rem', margin: 0, marginBottom: '3rem' }}>
        La paciencia, paga.
      </p>

      <div style={{
        background: 'rgba(255,255,255,0.04)', border: `1px solid ${COLORS.border}`, borderRadius: 16,
        padding: '1.5rem', width: '100%', maxWidth: 360, animation: shake ? 'shake 0.5s' : 'none',
      }}>
        <div style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: COLORS.muted, marginBottom: '0.4rem', fontWeight: 500 }}>
          Acceso privado
        </div>
        <h2 style={{ fontFamily: fontDisplay, fontSize: '1.3rem', fontWeight: 500, margin: 0, marginBottom: '1.2rem', color: COLORS.paper, lineHeight: 1.3 }}>
          Lótum está en pre-lanzamiento
        </h2>
        <p style={{ fontSize: '0.9rem', color: COLORS.paperSoft, margin: 0, marginBottom: '1.5rem', lineHeight: 1.5 }}>
          Si tenés la clave de acceso, ingresala abajo. Si no, escribinos por WhatsApp y te contamos cuándo lanzamos.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={input}
            onChange={(e) => { setInput(e.target.value); setError(false); }}
            placeholder="Clave de acceso"
            autoFocus
            style={{
              width: '100%', boxSizing: 'border-box', padding: '0.9rem 1rem',
              background: COLORS.bgDeep, border: `1px solid ${error ? '#E74C3C' : COLORS.border}`,
              borderRadius: 10, color: COLORS.paper, fontSize: '1rem', fontFamily: fontBody,
              outline: 'none', marginBottom: '0.6rem', transition: 'border 0.2s',
            }}
          />
          {error && (
            <div style={{ color: '#E74C3C', fontSize: '0.85rem', marginBottom: '0.6rem' }}>
              Clave incorrecta. Probá de nuevo.
            </div>
          )}
          <button type="submit" style={{
            width: '100%', padding: '0.95rem 1rem', background: COLORS.terracotta, color: '#fff',
            border: 'none', borderRadius: 10, fontSize: '1rem', fontWeight: 600, fontFamily: fontBody,
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
          }}>
            Ingresar <ArrowRight size={18} />
          </button>
        </form>

        <a
          href="https://wa.me/5492235834453?text=Hola%20L%C3%B3tum!%20Quiero%20info%20sobre%20el%20lanzamiento."
          target="_blank" rel="noopener noreferrer"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
            marginTop: '1.2rem', padding: '0.7rem', color: '#25D366', fontSize: '0.9rem',
            textDecoration: 'none', border: `1px solid ${COLORS.border}`, borderRadius: 10, fontWeight: 500,
          }}
        >
          <MessageCircle size={16} /> Escribinos por WhatsApp
        </a>
      </div>

      <p style={{ fontSize: '0.75rem', color: COLORS.muted, marginTop: '2rem', textAlign: 'center', maxWidth: 320 }}>
        © 2026 Lótum · Inversión inmobiliaria nueva
      </p>
    </div>
  );
}

function LotumApp() {
  const [view, setView] = useState('landing');
  const [selectedProp, setSelectedProp] = useState(null);
  const [selectedModality, setSelectedModality] = useState(null);
  const [notifOpen, setNotifOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = (v, payload) => {
    if (v === 'detail' && payload) setSelectedProp(payload);
    if (v === 'modality-detail' && payload) setSelectedModality(payload);
    setView(v);
    window.scrollTo(0, 0);
  };

  const handleSelectProp = (prop) => {
    setSelectedProp(prop);
    setView('detail');
    window.scrollTo(0, 0);
  };

  const getTitle = () => {
    if (view === 'onboarding-owner') return 'Publicar';
    if (view === 'onboarding-investor') return 'Perfil inversor';
    if (view === 'modality-detail' && selectedModality) return MODALITIES[selectedModality]?.short || '';
    return null;
  };

  const showBack = ['onboarding-owner', 'onboarding-investor', 'detail', 'modality-detail'].includes(view);

  const handleBack = () => {
    if (view === 'detail') navigate('marketplace');
    else if (view === 'modality-detail') navigate('landing');
    else navigate('landing');
  };

  return (
    <PasswordGate>
    <PaperBg>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;0,9..144,700;1,9..144,400;1,9..144,500&family=Inter:wght@400;500;600&display=swap');
        * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
        body { margin: 0; background: ${COLORS.bgDeep}; }
        input::placeholder, textarea::placeholder { color: ${COLORS.muted}; opacity: 0.7; }
        input:focus, textarea:focus { border-color: ${COLORS.terracotta} !important; }
        button:active { opacity: 0.7; }
        div::-webkit-scrollbar { display: none; }
        div { scrollbar-width: none; }
        @keyframes shimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
      <div style={{ maxWidth: '430px', margin: '0 auto', minHeight: '100vh', background: 'transparent', position: 'relative', fontFamily: fontBody, color: COLORS.paper }}>
        <TopBar
          showLogo={view === 'landing'}
          title={getTitle()}
          onBack={showBack ? handleBack : null}
          onOpenNotifications={() => setNotifOpen(true)}
          onOpenMenu={() => setMenuOpen(true)}
          hasNotifications={true}
        />
        {view === 'landing' && <AppHome onNav={navigate} />}
        {view === 'onboarding-owner' && <OnboardingOwner onFinish={() => navigate('marketplace')} />}
        {view === 'onboarding-investor' && <OnboardingInvestor onFinish={() => navigate('marketplace')} />}
        {view === 'marketplace' && <Marketplace onSelect={handleSelectProp} />}
        {view === 'detail' && selectedProp && <PropertyDetail prop={selectedProp} />}
        {view === 'modality-detail' && selectedModality && <ModalityDetail modalityId={selectedModality} onBack={() => navigate('landing')} onNav={navigate} />}
        {view === 'dashboard' && <Dashboard />}
        {view === 'favorites' && <Favorites />}
        {!['detail', 'modality-detail', 'onboarding-owner', 'onboarding-investor'].includes(view) && <BottomNav current={view} onNav={navigate} />}
        <WhatsAppFAB hidden={['onboarding-owner', 'onboarding-investor', 'detail'].includes(view)} />
        <NotificationsPanel open={notifOpen} onClose={() => setNotifOpen(false)} />
        <SideMenu open={menuOpen} onClose={() => setMenuOpen(false)} onNav={navigate} />
      </div>
    </PaperBg>
    </PasswordGate>
  );
}

// =======================================================================
//   ROUTER PRINCIPAL
//   "/" → Landing pública
//   "/terminos" → Términos y Condiciones
//   "/privacidad" → Política de Privacidad
//   "/defensa-consumidor" → Defensa del Consumidor
//   "/politica-publicidad" → Política de Publicidad
//   "/app" o cualquier otra ruta → App con clave (LotumApp + PasswordGate)
// =======================================================================
export default function App() {
  const [route, setRoute] = useState(() => {
    if (typeof window === 'undefined') return '/';
    return window.location.pathname || '/';
  });

  // Escucha cambios de navegación (back/forward del navegador)
  useEffect(() => {
    const onPopState = () => setRoute(window.location.pathname || '/');
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Función helper para crear navegadores
  const makeNav = (path) => () => {
    window.history.pushState({}, '', path);
    setRoute(path);
    window.scrollTo(0, 0);
  };

  const goToApp = makeNav('/app');
  const goToHome = makeNav('/');
  const goToTerminos = makeNav('/terminos');
  const goToModalidades = makeNav('/modalidades');
  const goToPrivacidad = makeNav('/privacidad');
  const goToDefensa = makeNav('/defensa-consumidor');
  const goToPublicidad = makeNav('/politica-publicidad');

  // Función para limpiar el path (sin trailing slash)
  const cleanPath = route.replace(/\/$/, '') || '/';

  // App con clave
  if (cleanPath === '/app' || cleanPath.startsWith('/app/')) {
    return <LotumApp />;
  }

  // Términos y Condiciones
  if (cleanPath === '/terminos') {
    return <Terminos onGoBack={goToHome} onGoToApp={goToApp} />;
  }

  // Modalidades
  if (cleanPath === '/modalidades') {
    return <Modalidades onGoBack={goToHome} onGoToApp={goToApp} />;
  }

  // Política de Privacidad
  if (cleanPath === '/privacidad') {
    return (
      <LegalPage
        data={PRIVACIDAD_DATA}
        onGoBack={goToHome}
        badge="Política de Privacidad"
        titlePrefix="Política de"
        titleHighlight="Privacidad"
        subtitle="Protección de datos personales conforme a la Ley 25.326."
      />
    );
  }

  // Defensa del Consumidor
  if (cleanPath === '/defensa-consumidor') {
    return (
      <LegalPage
        data={DEFENSA_DATA}
        onGoBack={goToHome}
        badge="Defensa del Consumidor"
        titlePrefix="Defensa del"
        titleHighlight="Consumidor"
        subtitle="Información al consumidor y usuario conforme a la Ley 24.240."
      />
    );
  }

  // Política de Publicidad
  if (cleanPath === '/politica-publicidad') {
    return (
      <LegalPage
        data={PUBLICIDAD_DATA}
        onGoBack={goToHome}
        badge="Política de Publicidad"
        titlePrefix="Política de"
        titleHighlight="Publicidad"
        subtitle="Publicidad propia, contenido de usuarios, marketing e influencers."
      />
    );
  }

  // Landing pública por defecto
  return (
    <Landing
      onGoToApp={goToApp}
      onGoToTerminos={goToTerminos}
      onGoToModalidades={goToModalidades}
      onGoToPrivacidad={goToPrivacidad}
      onGoToDefensa={goToDefensa}
      onGoToPublicidad={goToPublicidad}
    />
  );
}
