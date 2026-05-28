// =======================================================================
//   LÓTUM — PANELES INTERNOS DE LA APP
//   Configuración · Ayuda y soporte · Modal Cerrar sesión
// =======================================================================
import React, { useState } from 'react';
import {
  ArrowLeft, Bell, Globe, Moon, Mail, Lock, Trash2, ChevronRight,
  MessageCircle, HelpCircle, FileText, Shield, Phone, Send, LogOut,
  CheckCircle2, ChevronDown, Settings as SettingsIcon, User, CreditCard,
  Eye, Smartphone,
} from 'lucide-react';

const C = {
  bgDeep: '#0A1628', bgMid: '#13243F', bgSoft: '#1B2845',
  paper: '#F0EEE6', paperSoft: '#C9C8C0', muted: '#8A8B87',
  terracotta: '#D9663B', gold: '#C9A961',
  card: '#1B2845', cardSoft: '#243456', border: '#2D3F5F',
  green: '#6FA77F',
};
const fontDisplay = "'Fraunces', Georgia, serif";
const fontBody = "'Inter', system-ui, sans-serif";

const WHATSAPP_NUMBER = '5492235834453';

// =============================================================
//   HEADER INTERNO (con botón atrás)
// =============================================================
function PanelHeader({ title, onBack }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '0.8rem',
      padding: '1.2rem', borderBottom: `1px solid ${C.border}`,
      position: 'sticky', top: 0, zIndex: 10,
      background: 'rgba(10, 22, 40, 0.92)', backdropFilter: 'blur(14px)',
    }}>
      <button onClick={onBack} style={{
        background: C.card, border: `1px solid ${C.border}`,
        borderRadius: 10, width: 40, height: 40, cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: C.paper, flexShrink: 0,
      }}>
        <ArrowLeft size={18} />
      </button>
      <h1 style={{
        fontFamily: fontDisplay, fontSize: '1.3rem', fontWeight: 500,
        color: C.paper, margin: 0,
      }}>{title}</h1>
    </div>
  );
}

// =============================================================
//   TOGGLE SWITCH
// =============================================================
function Toggle({ on, onChange }) {
  return (
    <button
      onClick={() => onChange(!on)}
      style={{
        width: 46, height: 26, borderRadius: 999, border: 'none',
        background: on ? C.terracotta : C.border, cursor: 'pointer',
        position: 'relative', transition: 'background 0.25s ease', flexShrink: 0,
      }}
    >
      <span style={{
        position: 'absolute', top: 3, left: on ? 23 : 3,
        width: 20, height: 20, borderRadius: '50%', background: '#fff',
        transition: 'left 0.25s ease',
        boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
      }} />
    </button>
  );
}

// =============================================================
//   FILA DE OPCIÓN
// =============================================================
function SettingRow({ icon: Icon, label, desc, right, onClick, danger }) {
  return (
    <button
      onClick={onClick}
      disabled={!onClick}
      style={{
        display: 'flex', alignItems: 'center', gap: '0.9rem',
        width: '100%', padding: '1rem', background: 'transparent',
        border: 'none', borderBottom: `1px solid ${C.border}40`,
        cursor: onClick ? 'pointer' : 'default', fontFamily: fontBody,
        textAlign: 'left',
      }}
    >
      <div style={{
        width: 38, height: 38, borderRadius: 10, flexShrink: 0,
        background: danger ? `${C.terracotta}20` : C.card,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Icon size={18} color={danger ? C.terracotta : C.paperSoft} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ color: danger ? C.terracotta : C.paper, fontSize: '0.92rem', fontWeight: 500 }}>{label}</div>
        {desc && <div style={{ color: C.muted, fontSize: '0.78rem', marginTop: 2 }}>{desc}</div>}
      </div>
      {right}
      {onClick && !right && <ChevronRight size={18} color={C.muted} />}
    </button>
  );
}

function SectionLabel({ children }) {
  return (
    <div style={{
      fontSize: '0.72rem', color: C.muted, fontWeight: 600,
      letterSpacing: '0.08em', textTransform: 'uppercase',
      padding: '1.5rem 1rem 0.5rem',
    }}>{children}</div>
  );
}

// =============================================================
//   PANTALLA: CONFIGURACIÓN
// =============================================================
export function SettingsScreen({ onBack }) {
  const [notifPush, setNotifPush] = useState(true);
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifOffers, setNotifOffers] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div style={{ minHeight: '100vh', paddingBottom: '6rem' }}>
      <PanelHeader title="Configuración" onBack={onBack} />

      <SectionLabel>Cuenta</SectionLabel>
      <SettingRow icon={User} label="Datos personales" desc="Nombre, email, teléfono" onClick={() => {}} />
      <SettingRow icon={CreditCard} label="Métodos de pago" desc="Tarjetas, transferencias, cripto" onClick={() => {}} />
      <SettingRow icon={Lock} label="Cambiar contraseña" onClick={() => {}} />

      <SectionLabel>Notificaciones</SectionLabel>
      <SettingRow icon={Bell} label="Notificaciones push" desc="Avisos en el teléfono"
        right={<Toggle on={notifPush} onChange={setNotifPush} />} />
      <SettingRow icon={Mail} label="Notificaciones por email"
        right={<Toggle on={notifEmail} onChange={setNotifEmail} />} />
      <SettingRow icon={Bell} label="Ofertas y novedades" desc="Promos y nuevas propiedades"
        right={<Toggle on={notifOffers} onChange={setNotifOffers} />} />

      <SectionLabel>Preferencias</SectionLabel>
      <SettingRow icon={Moon} label="Modo oscuro" desc="Activado"
        right={<Toggle on={darkMode} onChange={setDarkMode} />} />
      <SettingRow icon={Globe} label="Idioma" desc="Español (Argentina)" onClick={() => {}} />

      <SectionLabel>Privacidad y datos</SectionLabel>
      <SettingRow icon={Eye} label="Privacidad de la cuenta" onClick={() => {}} />
      <SettingRow icon={Smartphone} label="Dispositivos conectados" desc="1 dispositivo activo" onClick={() => {}} />
      <SettingRow icon={Trash2} label="Eliminar mi cuenta" desc="Esta acción es permanente" onClick={() => {}} danger />

      <div style={{
        padding: '2rem 1rem', textAlign: 'center',
        color: C.muted, fontSize: '0.78rem',
      }}>
        Lótum v1.0 — La paciencia, paga.
      </div>
    </div>
  );
}

// =============================================================
//   PANTALLA: AYUDA Y SOPORTE
// =============================================================
const HELP_FAQ = [
  {
    q: '¿Qué es Lótum?',
    a: 'Lótum es una plataforma que conecta propietarios de inmuebles con inversores interesados en financiar, reciclar y revender propiedades. Ofrecemos 4 modalidades distintas según tu necesidad.',
  },
  {
    q: '¿Cuánto cuesta usar Lótum?',
    a: 'Publicar es gratis. Lótum cobra una comisión del 1,5% a cada parte únicamente cuando se cierra una operación con éxito.',
  },
  {
    q: '¿Cómo verifico mi identidad?',
    a: 'Desde el menú o el banner de inicio, accedés a "Verificar identidad". Necesitás tu documento (DNI, pasaporte o licencia), tu rostro para el reconocimiento facial, y un código de verificación.',
  },
  {
    q: '¿Es seguro operar en Lótum?',
    a: 'Sí. Verificamos la identidad de todos los usuarios mediante KYC, ciframos tus datos y cumplimos con la normativa argentina de protección de datos (Ley 25.326).',
  },
  {
    q: '¿Qué pasa si tengo un problema con una operación?',
    a: 'Podés contactarnos por WhatsApp o email. Lótum ofrece canales de mediación, sin perjuicio de los derechos que la ley te reconoce como consumidor.',
  },
];

export function HelpScreen({ onBack }) {
  const [openFaq, setOpenFaq] = useState(null);
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hola Lótum! Necesito ayuda con la app.')}`;

  return (
    <div style={{ minHeight: '100vh', paddingBottom: '6rem' }}>
      <PanelHeader title="Ayuda y soporte" onBack={onBack} />

      {/* Contacto directo */}
      <div style={{ padding: '1.2rem' }}>
        <div style={{
          fontSize: '0.72rem', color: C.muted, fontWeight: 600,
          letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.8rem',
        }}>Contactanos</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
          <a href={waUrl} target="_blank" rel="noopener noreferrer" style={{
            display: 'flex', alignItems: 'center', gap: '0.9rem',
            padding: '1rem', borderRadius: 14, textDecoration: 'none',
            background: '#25D36615', border: '1px solid #25D36640',
          }}>
            <div style={{
              width: 42, height: 42, borderRadius: 10, flexShrink: 0,
              background: '#25D366', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
            }}>
              <MessageCircle size={20} color="#fff" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ color: C.paper, fontSize: '0.92rem', fontWeight: 600 }}>WhatsApp</div>
              <div style={{ color: C.muted, fontSize: '0.78rem', marginTop: 2 }}>Respuesta en minutos</div>
            </div>
            <ChevronRight size={18} color={C.muted} />
          </a>

          <a href="mailto:contacto@lotum.com.ar" style={{
            display: 'flex', alignItems: 'center', gap: '0.9rem',
            padding: '1rem', borderRadius: 14, textDecoration: 'none',
            background: C.card, border: `1px solid ${C.border}`,
          }}>
            <div style={{
              width: 42, height: 42, borderRadius: 10, flexShrink: 0,
              background: C.cardSoft, display: 'flex',
              alignItems: 'center', justifyContent: 'center',
            }}>
              <Mail size={20} color={C.paperSoft} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ color: C.paper, fontSize: '0.92rem', fontWeight: 600 }}>Email</div>
              <div style={{ color: C.muted, fontSize: '0.78rem', marginTop: 2 }}>contacto@lotum.com.ar</div>
            </div>
            <ChevronRight size={18} color={C.muted} />
          </a>
        </div>
      </div>

      {/* FAQ */}
      <div style={{ padding: '0.5rem 1.2rem 1.2rem' }}>
        <div style={{
          fontSize: '0.72rem', color: C.muted, fontWeight: 600,
          letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.8rem',
        }}>Preguntas frecuentes</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {HELP_FAQ.map((item, i) => {
            const open = openFaq === i;
            return (
              <div key={i} style={{
                background: C.card, border: `1px solid ${C.border}`,
                borderRadius: 12, overflow: 'hidden',
              }}>
                <button
                  onClick={() => setOpenFaq(open ? null : i)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.8rem',
                    width: '100%', padding: '1rem', background: 'transparent',
                    border: 'none', cursor: 'pointer', fontFamily: fontBody,
                    textAlign: 'left',
                  }}
                >
                  <span style={{ flex: 1, color: C.paper, fontSize: '0.9rem', fontWeight: 500 }}>{item.q}</span>
                  <ChevronDown size={18} color={C.muted} style={{
                    transform: open ? 'rotate(180deg)' : 'rotate(0)',
                    transition: 'transform 0.25s ease', flexShrink: 0,
                  }} />
                </button>
                {open && (
                  <div style={{
                    padding: '0 1rem 1rem', color: C.paperSoft,
                    fontSize: '0.88rem', lineHeight: 1.6,
                  }}>{item.a}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div style={{
        padding: '1rem 1.2rem 2rem', textAlign: 'center',
        color: C.muted, fontSize: '0.78rem',
      }}>
        ¿No encontrás lo que buscás? Escribinos por WhatsApp y te ayudamos.
      </div>
    </div>
  );
}

// =============================================================
//   MODAL: CERRAR SESIÓN
// =============================================================
export function LogoutModal({ open, onConfirm, onCancel }) {
  const [done, setDone] = useState(false);

  if (!open) return null;

  const handleConfirm = () => {
    setDone(true);
    setTimeout(() => {
      setDone(false);
      onConfirm();
    }, 1400);
  };

  return (
    <>
      <div
        onClick={!done ? onCancel : undefined}
        style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
          zIndex: 300, display: 'flex', alignItems: 'center',
          justifyContent: 'center', padding: '1.5rem',
          backdropFilter: 'blur(4px)',
        }}
      >
        <div
          onClick={e => e.stopPropagation()}
          style={{
            background: C.bgMid, borderRadius: 20, padding: '2rem',
            maxWidth: 340, width: '100%', textAlign: 'center',
            border: `1px solid ${C.border}`,
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            animation: 'modalPop 0.3s ease',
          }}
        >
          {done ? (
            // Estado: sesión cerrada
            <>
              <div style={{
                width: 70, height: 70, margin: '0 auto 1.2rem',
                borderRadius: '50%', background: `${C.green}20`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <CheckCircle2 size={38} color={C.green} />
              </div>
              <h3 style={{
                fontFamily: fontDisplay, fontSize: '1.3rem', fontWeight: 500,
                color: C.paper, margin: '0 0 0.5rem',
              }}>Sesión cerrada</h3>
              <p style={{ color: C.paperSoft, fontSize: '0.9rem', margin: 0 }}>
                Cerraste sesión correctamente. Volviendo al inicio…
              </p>
            </>
          ) : (
            // Estado: confirmación
            <>
              <div style={{
                width: 70, height: 70, margin: '0 auto 1.2rem',
                borderRadius: '50%', background: `${C.terracotta}20`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <LogOut size={32} color={C.terracotta} />
              </div>
              <h3 style={{
                fontFamily: fontDisplay, fontSize: '1.3rem', fontWeight: 500,
                color: C.paper, margin: '0 0 0.5rem',
              }}>¿Cerrar sesión?</h3>
              <p style={{ color: C.paperSoft, fontSize: '0.9rem', lineHeight: 1.5, margin: '0 0 1.8rem' }}>
                Vas a tener que volver a ingresar la próxima vez que quieras usar la app.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                <button
                  onClick={handleConfirm}
                  style={{
                    width: '100%', padding: '0.9rem', borderRadius: 999,
                    background: C.terracotta, color: '#fff', border: 'none',
                    fontSize: '0.95rem', fontWeight: 600, cursor: 'pointer',
                    fontFamily: fontBody,
                  }}
                >
                  Sí, cerrar sesión
                </button>
                <button
                  onClick={onCancel}
                  style={{
                    width: '100%', padding: '0.9rem', borderRadius: 999,
                    background: 'transparent', color: C.paper,
                    border: `1.5px solid ${C.border}`,
                    fontSize: '0.95rem', fontWeight: 500, cursor: 'pointer',
                    fontFamily: fontBody,
                  }}
                >
                  Cancelar
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      <style>{`
        @keyframes modalPop {
          0% { transform: scale(0.9); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </>
  );
}
