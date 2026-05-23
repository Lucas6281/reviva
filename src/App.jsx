import React, { useState } from 'react';
import { Home, ArrowRight, MapPin, Ruler, DollarSign, Hammer, CheckCircle2, ArrowLeft, Camera, FileText, ChevronRight, Eye, Menu, Bell, Search, Plus, Heart, User, Zap, Wallet } from 'lucide-react';

const COLORS = {
  olive: '#3D4A2A',
  cream: '#F5F1E8',
  creamDark: '#EBE5D3',
  paper: '#FAF7EE',
  terracotta: '#C2542C',
  ink: '#1A1A17',
  muted: '#6B6B5E',
  blue: '#3A5A7C',
  green: '#4A7C59',
};

const fontDisplay = "'Fraunces', Georgia, serif";
const fontBody = "'Inter', system-ui, sans-serif";

const MODALITIES = {
  A: {
    id: 'A', name: 'Reciclado a futuro', short: 'Reciclado',
    icon: <Hammer size={14} />, color: COLORS.terracotta,
    desc: 'El inversor financia la obra. El propietario cobra cuando se venda.',
    forOwner: 'Cobrás más, pero esperás a que se venda',
    forInvestor: 'No comprás la propiedad, solo invertís en la obra',
  },
  B: {
    id: 'B', name: 'Compra de contado + reciclado', short: 'Contado + obra',
    icon: <Zap size={14} />, color: COLORS.blue,
    desc: 'El inversor compra la propiedad de contado y se queda con el reciclado.',
    forOwner: 'Cobrás ya, aceptando un valor menor',
    forInvestor: 'Comprás barato, reciclás y revendés',
  },
  C: {
    id: 'C', name: 'Compra simple de contado', short: 'Solo contado',
    icon: <Wallet size={14} />, color: COLORS.green,
    desc: 'El inversor compra al contado. No hay obra de por medio.',
    forOwner: 'Cobrás ya, valor de contado',
    forInvestor: 'Comprás esperando revalorización del mercado',
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
  <div style={{ background: COLORS.paper, minHeight: '100vh', position: 'relative',
    backgroundImage: `radial-gradient(at 20% 10%, ${COLORS.terracotta}10 0px, transparent 50%), radial-gradient(at 80% 90%, ${COLORS.olive}12 0px, transparent 50%)` }}>
    {children}
  </div>
);

function Logo({ withSlogan }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: withSlogan ? 'flex-start' : 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <div style={{ width: 24, height: 24, background: COLORS.terracotta, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 2px 8px ${COLORS.terracotta}40` }}>
          <div style={{ width: '55%', height: '55%', background: COLORS.paper, borderRadius: '50%' }} />
        </div>
        <span style={{ fontFamily: fontDisplay, fontSize: '1.25rem', fontWeight: 600, letterSpacing: '-0.02em', color: COLORS.ink }}>Reviva</span>
      </div>
    </div>
  );
}

const iconBtn = { background: 'transparent', border: 'none', cursor: 'pointer', padding: '0.4rem', borderRadius: '8px', color: COLORS.ink, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36 };

function TopBar({ title, onBack, showLogo }) {
  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(250, 247, 238, 0.94)', backdropFilter: 'blur(14px)', borderBottom: `1px solid ${COLORS.creamDark}80`, padding: '0.9rem 1.2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '56px', boxSizing: 'border-box' }}>
      {onBack ? <button onClick={onBack} style={iconBtn}><ArrowLeft size={20} /></button> : (showLogo ? <Logo /> : <div style={{ width: 36 }} />)}
      {title && (<div style={{ fontFamily: fontDisplay, fontSize: '1.05rem', fontWeight: 500, color: COLORS.ink, position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>{title}</div>)}
      <div style={{ display: 'flex', gap: '0.3rem' }}>
        <button style={iconBtn}><Bell size={20} /></button>
        <button style={iconBtn}><Menu size={20} /></button>
      </div>
    </div>
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
    <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: 'rgba(250, 247, 238, 0.96)', backdropFilter: 'blur(14px)', borderTop: `1px solid ${COLORS.creamDark}80`, padding: '0.5rem 0.5rem calc(0.5rem + env(safe-area-inset-bottom))', display: 'flex', justifyContent: 'space-around', alignItems: 'center', zIndex: 100, maxWidth: '430px', margin: '0 auto' }}>
      {items.map(item => (
        <button key={item.id} onClick={() => onNav(item.id)} style={{ background: item.primary ? COLORS.terracotta : 'transparent', border: 'none', cursor: 'pointer', padding: item.primary ? '0.7rem' : '0.5rem', borderRadius: item.primary ? '50%' : '8px', color: item.primary ? COLORS.paper : (current === item.id ? COLORS.terracotta : COLORS.muted), display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.2rem', transform: item.primary ? 'translateY(-12px)' : 'none', boxShadow: item.primary ? `0 6px 16px ${COLORS.terracotta}50` : 'none' }}>
          {item.icon}
          {!item.primary && (<span style={{ fontFamily: fontBody, fontSize: '0.65rem', fontWeight: 500, color: current === item.id ? COLORS.terracotta : COLORS.muted }}>{item.label}</span>)}
        </button>
      ))}
    </div>
  );
}

const primaryBtn = { background: COLORS.ink, color: COLORS.paper, border: 'none', padding: '1rem 1.4rem', borderRadius: '999px', fontFamily: fontBody, fontSize: '0.95rem', fontWeight: 500, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', width: '100%', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' };
const secondaryBtn = { background: 'transparent', color: COLORS.ink, border: `1.5px solid ${COLORS.ink}`, padding: '0.95rem 1.4rem', borderRadius: '999px', fontFamily: fontBody, fontSize: '0.95rem', fontWeight: 500, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', width: '100%' };
const chipStyle = { padding: '0.5rem 0.9rem', borderRadius: '999px', border: `1px solid ${COLORS.creamDark}`, background: 'transparent', fontFamily: fontBody, fontSize: '0.8rem', fontWeight: 500, color: COLORS.ink, cursor: 'pointer' };
const titleStyle = { fontFamily: fontDisplay, fontSize: '1.6rem', fontWeight: 500, letterSpacing: '-0.02em', margin: '0 0 0.4rem', color: COLORS.ink, lineHeight: 1.15 };
const subtitleStyle = { fontFamily: fontBody, fontSize: '0.95rem', color: COLORS.muted, margin: '0 0 1.5rem', lineHeight: 1.5 };
const sectionTitleStyle = { fontFamily: fontDisplay, fontSize: '1.2rem', fontWeight: 500, letterSpacing: '-0.01em', margin: '0 0 0.9rem', color: COLORS.ink };
const fieldLabelStyle = { display: 'block', fontFamily: fontBody, fontSize: '0.85rem', fontWeight: 500, color: COLORS.ink, marginBottom: '0.45rem' };
const inputStyle = { width: '100%', padding: '0.85rem 1rem', borderRadius: '12px', border: `1px solid ${COLORS.creamDark}`, background: COLORS.paper, fontFamily: fontBody, fontSize: '1rem', color: COLORS.ink, outline: 'none', boxSizing: 'border-box', WebkitAppearance: 'none' };
const checkboxStyle = { display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.7rem 0.9rem', background: COLORS.paper, border: `1px solid ${COLORS.creamDark}`, borderRadius: '10px', fontFamily: fontBody, fontSize: '0.85rem', color: COLORS.ink, cursor: 'pointer' };

function ModalityBadge({ modality, small }) {
  const mod = MODALITIES[modality];
  if (!mod) return null;
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', padding: small ? '0.2rem 0.5rem' : '0.3rem 0.65rem', background: `${mod.color}15`, border: `1px solid ${mod.color}40`, borderRadius: '999px', fontFamily: fontBody, fontSize: small ? '0.65rem' : '0.7rem', fontWeight: 600, color: mod.color, letterSpacing: '0.02em' }}>
      {mod.icon} {mod.short}
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
    <div style={{ border: `2px dashed ${COLORS.creamDark}`, borderRadius: '14px', padding: '1.5rem', textAlign: 'center', cursor: 'pointer', marginBottom: '0.8rem', background: COLORS.paper }}>
      <div style={{ color: COLORS.terracotta, marginBottom: '0.6rem', display: 'flex', justifyContent: 'center' }}>{icon}</div>
      <div style={{ fontFamily: fontBody, fontSize: '0.9rem', fontWeight: 500, color: COLORS.ink, marginBottom: '0.2rem' }}>{label}</div>
      <div style={{ fontFamily: fontBody, fontSize: '0.75rem', color: COLORS.muted }}>{hint}</div>
    </div>
  );
}

function Landing({ onNav }) {
  return (
    <div style={{ paddingBottom: '100px' }}>
      {/* Hero con logo grande y slogan */}
      <section style={{ padding: '2rem 1.2rem 1rem', textAlign: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div style={{ width: 64, height: 64, background: COLORS.terracotta, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 4px 20px ${COLORS.terracotta}50`, marginBottom: '0.8rem' }}>
            <div style={{ width: '55%', height: '55%', background: COLORS.paper, borderRadius: '50%' }} />
          </div>
          <h1 style={{ fontFamily: fontDisplay, fontSize: '2.8rem', fontWeight: 600, letterSpacing: '-0.03em', color: COLORS.ink, margin: '0 0 0.3rem', lineHeight: 1 }}>Reviva</h1>
          <div style={{ fontFamily: fontDisplay, fontSize: '1.1rem', fontStyle: 'italic', color: COLORS.terracotta, fontWeight: 500, letterSpacing: '-0.01em' }}>
            La paciencia, paga.
          </div>
        </div>
      </section>

      <section style={{ padding: '0.5rem 1.2rem 2.5rem' }}>
        <div style={{ display: 'inline-block', padding: '0.35rem 0.8rem', background: `${COLORS.terracotta}15`, borderRadius: '999px', fontSize: '0.7rem', fontFamily: fontBody, fontWeight: 600, color: COLORS.terracotta, marginBottom: '1.2rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>◯ Inversión inmobiliaria nueva</div>
        <h2 style={{ fontFamily: fontDisplay, fontSize: 'clamp(2rem, 8vw, 2.6rem)', fontWeight: 500, lineHeight: 1.05, letterSpacing: '-0.03em', color: COLORS.ink, margin: '0 0 1.2rem' }}>
          Propiedades que <em style={{ fontStyle: 'italic', color: COLORS.terracotta }}>vuelven a vivir</em>.
        </h2>
        <p style={{ fontFamily: fontBody, fontSize: '1.05rem', lineHeight: 1.55, color: COLORS.muted, margin: '0 0 2rem' }}>
          Tres formas de invertir y vender. Vos elegís cómo.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
          <button onClick={() => onNav('onboarding-owner')} style={primaryBtn}>Tengo una propiedad <ArrowRight size={18} /></button>
          <button onClick={() => onNav('onboarding-investor')} style={secondaryBtn}>Quiero invertir <ArrowRight size={18} /></button>
        </div>
      </section>

      <section style={{ padding: '1rem 1.2rem 2rem' }}>
        <div style={{ fontFamily: fontBody, fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: COLORS.terracotta, marginBottom: '0.5rem', fontWeight: 600 }}>Tres modalidades</div>
        <h2 style={{ fontFamily: fontDisplay, fontSize: '1.5rem', fontWeight: 500, letterSpacing: '-0.02em', margin: '0 0 1.5rem', color: COLORS.ink, lineHeight: 1.15 }}>
          Cada propiedad, su mejor camino.
        </h2>
        {Object.values(MODALITIES).map(mod => (
          <div key={mod.id} style={{ background: COLORS.paper, border: `1px solid ${COLORS.creamDark}80`, borderRadius: '14px', padding: '1.1rem', marginBottom: '0.7rem', borderLeft: `4px solid ${mod.color}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <div style={{ color: mod.color }}>{mod.icon}</div>
              <h3 style={{ fontFamily: fontDisplay, fontSize: '1.05rem', fontWeight: 600, margin: 0, color: COLORS.ink }}>{mod.name}</h3>
            </div>
            <p style={{ fontFamily: fontBody, fontSize: '0.85rem', color: COLORS.muted, margin: '0 0 0.6rem', lineHeight: 1.5 }}>{mod.desc}</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginTop: '0.7rem' }}>
              <div style={{ fontSize: '0.7rem', fontFamily: fontBody }}>
                <div style={{ color: COLORS.muted, marginBottom: '0.2rem', letterSpacing: '0.03em', textTransform: 'uppercase', fontWeight: 600, fontSize: '0.6rem' }}>Propietario</div>
                <div style={{ color: COLORS.ink, lineHeight: 1.4 }}>{mod.forOwner}</div>
              </div>
              <div style={{ fontSize: '0.7rem', fontFamily: fontBody }}>
                <div style={{ color: COLORS.muted, marginBottom: '0.2rem', letterSpacing: '0.03em', textTransform: 'uppercase', fontWeight: 600, fontSize: '0.6rem' }}>Inversor</div>
                <div style={{ color: COLORS.ink, lineHeight: 1.4 }}>{mod.forInvestor}</div>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section style={{ padding: '1rem 0 2rem' }}>
        <div style={{ padding: '0 1.2rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <h2 style={{ fontFamily: fontDisplay, fontSize: '1.4rem', fontWeight: 500, letterSpacing: '-0.01em', margin: 0, color: COLORS.ink }}>Disponibles ahora</h2>
          <button onClick={() => onNav('marketplace')} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: fontBody, fontSize: '0.85rem', fontWeight: 500, color: COLORS.terracotta, display: 'flex', alignItems: 'center', gap: '0.2rem' }}>Ver todas <ChevronRight size={14} /></button>
        </div>
        <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', padding: '0 1.2rem 0.5rem', WebkitOverflowScrolling: 'touch' }}>
          {MOCK_PROPERTIES.slice(0, 3).map(p => {
            const firstMod = Object.keys(p.modalities)[0];
            const modData = p.modalities[firstMod];
            return (
              <div key={p.id} onClick={() => onNav('detail', p)} style={{ minWidth: '260px', background: COLORS.paper, borderRadius: '16px', overflow: 'hidden', border: `1px solid ${COLORS.creamDark}80`, cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <div style={{ height: '140px', background: p.image, position: 'relative' }}>
                  <div style={{ position: 'absolute', top: '0.7rem', left: '0.7rem', display: 'flex', gap: '0.3rem' }}>
                    {Object.keys(p.modalities).map(m => <ModalityBadge key={m} modality={m} small />)}
                  </div>
                </div>
                <div style={{ padding: '1rem' }}>
                  <h3 style={{ fontFamily: fontDisplay, fontSize: '1rem', fontWeight: 500, margin: '0 0 0.3rem', color: COLORS.ink }}>{p.title}</h3>
                  <div style={{ fontFamily: fontBody, fontSize: '0.75rem', color: COLORS.muted, marginBottom: '0.8rem' }}>{p.location}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.7rem', borderTop: `1px solid ${COLORS.creamDark}` }}>
                    <div>
                      <div style={{ fontSize: '0.65rem', color: COLORS.muted, fontFamily: fontBody }}>Desde</div>
                      <div style={{ fontFamily: fontDisplay, fontSize: '1.1rem', fontWeight: 600, color: COLORS.ink, lineHeight: 1 }}>{fmt(modData.cashPrice || modData.estimatedInvestment)}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.65rem', color: COLORS.muted, fontFamily: fontBody }}>ROI máx.</div>
                      <div style={{ fontFamily: fontDisplay, fontSize: '1.2rem', fontWeight: 600, color: COLORS.terracotta, lineHeight: 1 }}>{Math.max(...Object.values(p.modalities).map(m => m.roi))}%</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section style={{ background: COLORS.ink, color: COLORS.paper, padding: '3rem 1.2rem 2rem', borderRadius: '24px 24px 0 0', margin: '0 0.6rem' }}>
        <div style={{ fontFamily: fontBody, fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: COLORS.terracotta, marginBottom: '0.8rem' }}>Cómo funciona</div>
        <h2 style={{ fontFamily: fontDisplay, fontSize: '1.8rem', fontWeight: 500, lineHeight: 1.1, letterSpacing: '-0.02em', margin: '0 0 2rem' }}>Publicás una vez,<br />elegís cómo vendés.</h2>
        {[
          { n: '01', title: 'Publicás', desc: 'Subís tu propiedad y elegís qué modalidades aceptás. Podés aceptar las tres o solo una.' },
          { n: '02', title: 'Recibís ofertas', desc: 'Inversores te contactan con propuestas. Vos aceptás la que mejor te sirva.' },
          { n: '03', title: 'Cerrás', desc: 'Firmás contrato modelo según la modalidad. Reviva cobra 1,5% a cada parte al cierre.' },
        ].map(step => (
          <div key={step.n} style={{ padding: '1.5rem 0', borderTop: `1px solid ${COLORS.paper}25` }}>
            <div style={{ fontFamily: fontDisplay, fontSize: '2rem', fontWeight: 400, color: COLORS.terracotta, marginBottom: '0.5rem', lineHeight: 1 }}>{step.n}</div>
            <h3 style={{ fontFamily: fontDisplay, fontSize: '1.2rem', fontWeight: 500, margin: '0 0 0.5rem' }}>{step.title}</h3>
            <p style={{ fontFamily: fontBody, fontSize: '0.9rem', lineHeight: 1.55, color: `${COLORS.paper}cc`, margin: 0 }}>{step.desc}</p>
          </div>
        ))}
      </section>

      <section style={{ padding: '2rem 1.2rem 3rem', background: COLORS.ink, color: COLORS.paper, margin: '0 0.6rem', borderRadius: '0 0 24px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          {[
            { val: '3', label: 'modalidades posibles según tu necesidad' },
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
  const [modalitiesAccepted, setModalitiesAccepted] = useState({ A: true, B: false, C: false });
  const totalSteps = 5;
  const toggleModality = (key) => setModalitiesAccepted(prev => ({ ...prev, [key]: !prev[key] }));
  const atLeastOne = Object.values(modalitiesAccepted).some(v => v);

  return (
    <div style={{ paddingBottom: '120px' }}>
      <div style={{ padding: '1rem 1.2rem 1.5rem' }}>
        <div style={{ display: 'flex', gap: '0.3rem', marginBottom: '1.5rem' }}>
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div key={i} style={{ flex: 1, height: '3px', background: i < step ? COLORS.terracotta : COLORS.creamDark, borderRadius: '999px' }} />
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
          <p style={subtitleStyle}>Podés aceptar una, dos o las tres modalidades. Cuantas más aceptes, más ofertas vas a recibir.</p>
          {Object.values(MODALITIES).map(mod => (
            <div key={mod.id} onClick={() => toggleModality(mod.id)} style={{ background: modalitiesAccepted[mod.id] ? `${mod.color}10` : COLORS.paper, border: `2px solid ${modalitiesAccepted[mod.id] ? mod.color : COLORS.creamDark}`, borderRadius: '14px', padding: '1.1rem', marginBottom: '0.7rem', cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem' }}>
                <div style={{ width: 22, height: 22, borderRadius: '6px', border: `2px solid ${modalitiesAccepted[mod.id] ? mod.color : COLORS.creamDark}`, background: modalitiesAccepted[mod.id] ? mod.color : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                  {modalitiesAccepted[mod.id] && <CheckCircle2 size={14} style={{ color: COLORS.paper }} />}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
                    <div style={{ color: mod.color }}>{mod.icon}</div>
                    <h3 style={{ fontFamily: fontDisplay, fontSize: '1rem', fontWeight: 600, margin: 0, color: COLORS.ink }}>{mod.name}</h3>
                  </div>
                  <p style={{ fontFamily: fontBody, fontSize: '0.82rem', color: COLORS.muted, margin: '0 0 0.4rem', lineHeight: 1.5 }}>{mod.desc}</p>
                  <div style={{ fontFamily: fontBody, fontSize: '0.78rem', color: COLORS.ink, fontWeight: 500 }}>Para vos: {mod.forOwner}</div>
                </div>
              </div>
            </div>
          ))}
          {!atLeastOne && (<div style={{ background: `${COLORS.terracotta}15`, padding: '0.8rem', borderRadius: '10px', fontFamily: fontBody, fontSize: '0.8rem', color: COLORS.terracotta, marginTop: '0.5rem' }}>Tenés que elegir al menos una modalidad.</div>)}
        </>)}

        {step === 4 && (<>
          <h2 style={titleStyle}>Estado actual</h2>
          <p style={subtitleStyle}>Qué hay que reciclar.</p>
          <Field label="Descripción del estado" placeholder="Estructura sólida, baño y cocina desactualizados..." textarea />
          <div style={{ fontFamily: fontBody, fontSize: '0.85rem', fontWeight: 500, color: COLORS.ink, marginTop: '1rem', marginBottom: '0.6rem' }}>Qué necesita reciclado</div>
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
            <div style={{ fontFamily: fontBody, fontSize: '0.85rem', fontWeight: 600, color: COLORS.ink, marginBottom: '0.5rem' }}>Vas a publicar con:</div>
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {Object.keys(modalitiesAccepted).filter(k => modalitiesAccepted[k]).map(k => <ModalityBadge key={k} modality={k} />)}
            </div>
          </div>
        </>)}
      </div>

      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, padding: '1rem 1.2rem calc(1rem + env(safe-area-inset-bottom))', background: 'rgba(250, 247, 238, 0.96)', backdropFilter: 'blur(14px)', borderTop: `1px solid ${COLORS.creamDark}80`, display: 'flex', gap: '0.7rem', maxWidth: '430px', margin: '0 auto' }}>
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
    <div onClick={onClick} style={{ background: COLORS.paper, border: `1px solid ${COLORS.creamDark}80`, borderRadius: '16px', overflow: 'hidden', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
      <div style={{ height: '180px', background: prop.image, position: 'relative' }}>
        <div style={{ position: 'absolute', top: '0.8rem', left: '0.8rem', display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
          {mods.map(m => <ModalityBadge key={m} modality={m} small />)}
        </div>
        {prop.status === 'En obra' && (<div style={{ position: 'absolute', top: '0.8rem', right: '0.8rem', background: COLORS.terracotta, color: COLORS.paper, padding: '0.25rem 0.6rem', borderRadius: '999px', fontFamily: fontBody, fontSize: '0.7rem', fontWeight: 500 }}>{prop.status}</div>)}
      </div>
      <div style={{ padding: '1.1rem' }}>
        <h3 style={{ fontFamily: fontDisplay, fontSize: '1.15rem', fontWeight: 500, margin: '0 0 0.3rem', letterSpacing: '-0.01em', color: COLORS.ink }}>{prop.title}</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontFamily: fontBody, fontSize: '0.8rem', color: COLORS.muted, marginBottom: '1rem' }}>
          <MapPin size={12} /> {prop.location} · {prop.surface}m² · {prop.rooms} amb.
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.5rem', padding: '0.8rem', background: COLORS.creamDark, borderRadius: '10px' }}>
          <div>
            <div style={{ fontFamily: fontBody, fontSize: '0.65rem', color: COLORS.muted, marginBottom: '0.15rem' }}>Desde</div>
            <div style={{ fontFamily: fontDisplay, fontSize: '0.9rem', fontWeight: 600, color: COLORS.ink, lineHeight: 1 }}>{fmt(lowestPrice).replace('US$ ', '$')}</div>
          </div>
          <div>
            <div style={{ fontFamily: fontBody, fontSize: '0.65rem', color: COLORS.muted, marginBottom: '0.15rem' }}>Modalidades</div>
            <div style={{ fontFamily: fontDisplay, fontSize: '0.9rem', fontWeight: 600, color: COLORS.ink, lineHeight: 1 }}>{mods.length}</div>
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
        <h1 style={{ fontFamily: fontDisplay, fontSize: '1.8rem', fontWeight: 500, lineHeight: 1.1, letterSpacing: '-0.02em', margin: '0 0 1.2rem', color: COLORS.ink }}>Propiedades disponibles</h1>
        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', marginBottom: '1.2rem', paddingBottom: '0.3rem', WebkitOverflowScrolling: 'touch' }}>
          {['Todas', 'Reciclado', 'Contado + obra', 'Solo contado', 'CABA', 'ROI +80%'].map((f, i) => (
            <button key={f} style={{ ...chipStyle, whiteSpace: 'nowrap', flexShrink: 0, background: i === 0 ? COLORS.ink : 'transparent', color: i === 0 ? COLORS.paper : COLORS.ink, borderColor: i === 0 ? COLORS.ink : COLORS.creamDark }}>{f}</button>
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
    <div style={{ background: COLORS.creamDark, padding: '0.9rem', borderRadius: '12px' }}>
      <div style={{ color: COLORS.terracotta, marginBottom: '0.4rem' }}>{icon}</div>
      <div style={{ fontFamily: fontBody, fontSize: '0.7rem', color: COLORS.muted, marginBottom: '0.1rem' }}>{label}</div>
      <div style={{ fontFamily: fontDisplay, fontSize: '1.05rem', fontWeight: 600, color: COLORS.ink, lineHeight: 1.1 }}>{value}</div>
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
    <div style={{ background: COLORS.ink, color: COLORS.paper, borderRadius: '16px', padding: '1.3rem', marginBottom: '1rem', borderTop: `4px solid ${mod.color}` }}>
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
          <input type="number" value={offerAmount} onChange={(e) => setOfferAmount(e.target.value)} placeholder={`${data.cashPrice || data.proposedPrice}`} style={{ ...inputStyle, background: COLORS.paper, marginBottom: '0.7rem' }} />
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
        <h1 style={{ fontFamily: fontDisplay, fontSize: '1.8rem', fontWeight: 500, margin: '0 0 0.4rem', letterSpacing: '-0.02em', color: COLORS.ink }}>{prop.title}</h1>
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
        <p style={{ fontFamily: fontBody, fontSize: '0.95rem', lineHeight: 1.65, color: COLORS.ink, marginBottom: '2rem' }}>{prop.description}</p>
        <h3 style={sectionTitleStyle}>Modalidades disponibles</h3>
        <p style={{ fontFamily: fontBody, fontSize: '0.85rem', color: COLORS.muted, marginBottom: '1.5rem', lineHeight: 1.5 }}>
          El propietario aceptó {availableMods.length === 1 ? 'esta modalidad' : `estas ${availableMods.length} modalidades`}. Elegí la que mejor te sirva.
        </p>
        {availableMods.length > 1 && (
          <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1rem', overflowX: 'auto', paddingBottom: '0.3rem' }}>
            {availableMods.map(m => (
              <button key={m} onClick={() => setSelectedMod(m)} style={{ background: selectedMod === m ? MODALITIES[m].color : 'transparent', color: selectedMod === m ? COLORS.paper : COLORS.ink, border: `1.5px solid ${selectedMod === m ? MODALITIES[m].color : COLORS.creamDark}`, padding: '0.5rem 0.9rem', borderRadius: '999px', fontFamily: fontBody, fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0, display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
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
    <div style={{ background: highlight ? COLORS.ink : COLORS.creamDark, color: highlight ? COLORS.paper : COLORS.ink, padding: '1.2rem', borderRadius: '14px' }}>
      <div style={{ fontFamily: fontBody, fontSize: '0.75rem', color: highlight ? `${COLORS.paper}aa` : COLORS.muted, marginBottom: '0.4rem' }}>{label}</div>
      <div style={{ fontFamily: fontDisplay, fontSize: '1.5rem', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1, color: highlight ? COLORS.terracotta : COLORS.ink }}>{value}</div>
      {sub && <div style={{ fontFamily: fontBody, fontSize: '0.7rem', color: highlight ? `${COLORS.paper}80` : COLORS.muted, marginTop: '0.4rem' }}>{sub}</div>}
    </div>
  );
}

function InvestmentRow({ prop }) {
  const progress = prop.status === 'En obra' ? 45 : 15;
  const firstMod = Object.keys(prop.modalities)[0];
  return (
    <div style={{ background: COLORS.paper, border: `1px solid ${COLORS.creamDark}80`, borderRadius: '14px', padding: '1rem', display: 'flex', gap: '0.9rem', alignItems: 'center' }}>
      <div style={{ width: '60px', height: '60px', background: prop.image, borderRadius: '10px', flexShrink: 0 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <h3 style={{ fontFamily: fontDisplay, fontSize: '0.95rem', fontWeight: 500, margin: 0, color: COLORS.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', marginBottom: '0.2rem' }}>{prop.title}</h3>
        <div style={{ marginBottom: '0.4rem' }}><ModalityBadge modality={firstMod} small /></div>
        <div style={{ height: '4px', background: COLORS.creamDark, borderRadius: '999px', overflow: 'hidden' }}>
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
      <h1 style={{ fontFamily: fontDisplay, fontSize: '1.8rem', fontWeight: 500, lineHeight: 1.1, letterSpacing: '-0.02em', margin: '0 0 1.5rem', color: COLORS.ink }}>Hola, Lucas</h1>
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
      <div style={{ background: COLORS.paper, border: `1px solid ${COLORS.creamDark}80`, borderRadius: '16px', overflow: 'hidden' }}>
        {[
          { icon: <Hammer size={14} />, text: 'Avance de obra en PH Villa Crespo', time: '2h' },
          { icon: <CheckCircle2 size={14} />, text: 'Oferta aceptada en Boedo', time: '1d' },
          { icon: <DollarSign size={14} />, text: 'Pago a proveedores procesado', time: '3d' },
        ].map((a, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.9rem 1rem', borderBottom: i < 2 ? `1px solid ${COLORS.creamDark}` : 'none' }}>
            <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: COLORS.creamDark, display: 'flex', alignItems: 'center', justifyContent: 'center', color: COLORS.terracotta }}>{a.icon}</div>
            <div style={{ flex: 1, fontFamily: fontBody, fontSize: '0.85rem', color: COLORS.ink }}>{a.text}</div>
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
      <h1 style={{ fontFamily: fontDisplay, fontSize: '1.8rem', fontWeight: 500, lineHeight: 1.1, letterSpacing: '-0.02em', margin: '0 0 1.5rem', color: COLORS.ink }}>Mis favoritos</h1>
      <div style={{ textAlign: 'center', padding: '3rem 1rem', color: COLORS.muted, fontFamily: fontBody }}>
        <Heart size={40} style={{ marginBottom: '1rem', opacity: 0.3 }} />
        <div style={{ fontSize: '0.95rem', marginBottom: '0.5rem' }}>Sin propiedades guardadas todavía</div>
        <div style={{ fontSize: '0.85rem', opacity: 0.7 }}>Tocá el corazón en una propiedad para guardarla acá.</div>
      </div>
    </div>
  );
}

export default function App() {
  const [view, setView] = useState('landing');
  const [selectedProp, setSelectedProp] = useState(null);

  const navigate = (v, payload) => {
    if (v === 'detail' && payload) setSelectedProp(payload);
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
    return null;
  };

  const showBack = ['onboarding-owner', 'onboarding-investor', 'detail'].includes(view);

  return (
    <PaperBg>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400;1,9..144,500&family=Inter:wght@400;500;600&display=swap');
        * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
        body { margin: 0; }
        input::placeholder, textarea::placeholder { color: ${COLORS.muted}; opacity: 0.55; }
        input:focus, textarea:focus { border-color: ${COLORS.terracotta} !important; }
        button:active { opacity: 0.7; }
        div::-webkit-scrollbar { display: none; }
        div { scrollbar-width: none; }
      `}</style>
      <div style={{ maxWidth: '430px', margin: '0 auto', minHeight: '100vh', background: 'transparent', position: 'relative', fontFamily: fontBody, color: COLORS.ink }}>
        <TopBar showLogo={view === 'landing'} title={getTitle()} onBack={showBack ? () => navigate(view === 'detail' ? 'marketplace' : 'landing') : null} />
        {view === 'landing' && <Landing onNav={navigate} />}
        {view === 'onboarding-owner' && <OnboardingOwner onFinish={() => navigate('marketplace')} />}
        {view === 'onboarding-investor' && <OnboardingInvestor onFinish={() => navigate('marketplace')} />}
        {view === 'marketplace' && <Marketplace onSelect={handleSelectProp} />}
        {view === 'detail' && selectedProp && <PropertyDetail prop={selectedProp} />}
        {view === 'dashboard' && <Dashboard />}
        {view === 'favorites' && <Favorites />}
        {view !== 'detail' && <BottomNav current={view} onNav={navigate} />}
      </div>
    </PaperBg>
  );
}
