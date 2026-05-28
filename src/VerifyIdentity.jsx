// =======================================================================
//   LÓTUM — VERIFICACIÓN DE IDENTIDAD (KYC)
//   Flujo de 3 pasos: Documento → Face ID → Código
//   DEMO funcional con simulación (sin backend real todavía)
// =======================================================================
import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowLeft, ArrowRight, Camera, CheckCircle2, Shield, CreditCard,
  Scan, RotateCcw, X, Check, Upload, ScanFace, KeyRound, AlertCircle,
  ChevronRight, Loader,
} from 'lucide-react';

const C = {
  bgDeep: '#0A1628', bgMid: '#13243F', bgSoft: '#1B2845',
  paper: '#F0EEE6', paperSoft: '#C9C8C0', muted: '#8A8B87',
  silver1: '#E8E8E8', silver3: '#8E8E8E',
  terracotta: '#D9663B', terracottaSoft: '#A04826', gold: '#C9A961',
  card: '#1B2845', cardSoft: '#243456', border: '#2D3F5F',
  green: '#6FA77F', blue: '#5B8BB5',
};
const fontDisplay = "'Fraunces', Georgia, serif";
const fontBody = "'Inter', system-ui, sans-serif";

// Tipos de documento aceptados
const DOC_TYPES = [
  { id: 'dni', label: 'DNI', desc: 'Documento Nacional de Identidad', icon: CreditCard, sides: 2 },
  { id: 'passport', label: 'Pasaporte', desc: 'Pasaporte argentino o extranjero', icon: CreditCard, sides: 1 },
  { id: 'license', label: 'Licencia de conducir', desc: 'Licencia nacional de conducir', icon: CreditCard, sides: 2 },
];

// =============================================================
//   BARRA DE PROGRESO (3 pasos)
// =============================================================
function StepProgress({ current }) {
  const steps = ['Documento', 'Face ID', 'Código'];
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '2rem' }}>
      {steps.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <React.Fragment key={i}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.35rem', flex: 1 }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%',
                background: done ? C.green : active ? C.terracotta : C.card,
                border: `2px solid ${done ? C.green : active ? C.terracotta : C.border}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.3s ease', flexShrink: 0,
              }}>
                {done
                  ? <Check size={16} color="#fff" />
                  : <span style={{ color: active ? '#fff' : C.muted, fontSize: '0.8rem', fontWeight: 700, fontFamily: fontBody }}>{i + 1}</span>
                }
              </div>
              <span style={{
                fontSize: '0.68rem', fontWeight: 600, fontFamily: fontBody,
                color: done ? C.green : active ? C.paper : C.muted,
                letterSpacing: '0.02em', textAlign: 'center',
              }}>{label}</span>
            </div>
            {i < steps.length - 1 && (
              <div style={{
                height: 2, flex: 0.5, marginBottom: '1.1rem',
                background: i < current ? C.green : C.border,
                transition: 'background 0.3s ease',
              }} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

// =============================================================
//   PASO 1 — SELECCIÓN Y CAPTURA DE DOCUMENTO
// =============================================================
function StepDocument({ onComplete }) {
  const [docType, setDocType] = useState(null);
  const [captures, setCaptures] = useState({ front: null, back: null });
  const [capturing, setCapturing] = useState(null); // 'front' | 'back' | null
  const [processing, setProcessing] = useState(false);

  const selectedDoc = DOC_TYPES.find(d => d.id === docType);
  const needsBack = selectedDoc?.sides === 2;
  const frontDone = !!captures.front;
  const backDone = !needsBack || !!captures.back;
  const allCaptured = frontDone && backDone;

  // Simula la captura de cámara
  const simulateCapture = (side) => {
    setCapturing(side);
    // Simula 2 segundos de "escaneo"
    setTimeout(() => {
      setCaptures(prev => ({ ...prev, [side]: true }));
      setCapturing(null);
    }, 2000);
  };

  const handleContinue = () => {
    setProcessing(true);
    // Simula verificación del documento (OCR + validación)
    setTimeout(() => {
      setProcessing(false);
      onComplete({ docType, captures });
    }, 1800);
  };

  // Pantalla de captura activa (simulación de cámara)
  if (capturing) {
    return (
      <div style={{ textAlign: 'center', padding: '1rem 0' }}>
        <div style={{
          fontSize: '0.8rem', color: C.terracotta, fontWeight: 600,
          letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '1.5rem',
        }}>Escaneando {capturing === 'front' ? 'frente' : 'dorso'}…</div>
        <div style={{
          position: 'relative', width: '100%', maxWidth: 320, margin: '0 auto',
          aspectRatio: '1.586', borderRadius: 16, overflow: 'hidden',
          background: `linear-gradient(135deg, ${C.cardSoft}, ${C.card})`,
          border: `2px solid ${C.terracotta}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          {/* Línea de escaneo animada */}
          <div style={{
            position: 'absolute', left: 0, right: 0, height: 3,
            background: `linear-gradient(90deg, transparent, ${C.terracotta}, transparent)`,
            animation: 'scanline 2s ease-in-out infinite',
            boxShadow: `0 0 12px ${C.terracotta}`,
          }} />
          <CreditCard size={56} color={C.muted} style={{ opacity: 0.4 }} />
          {/* Esquinas */}
          {['tl', 'tr', 'bl', 'br'].map(pos => (
            <div key={pos} style={{
              position: 'absolute', width: 24, height: 24,
              borderColor: C.terracotta, borderStyle: 'solid', borderWidth: 0,
              ...(pos.includes('t') ? { top: 12, borderTopWidth: 3 } : { bottom: 12, borderBottomWidth: 3 }),
              ...(pos.includes('l') ? { left: 12, borderLeftWidth: 3 } : { right: 12, borderRightWidth: 3 }),
              borderTopLeftRadius: pos === 'tl' ? 8 : 0,
              borderTopRightRadius: pos === 'tr' ? 8 : 0,
              borderBottomLeftRadius: pos === 'bl' ? 8 : 0,
              borderBottomRightRadius: pos === 'br' ? 8 : 0,
            }} />
          ))}
        </div>
        <p style={{ color: C.paperSoft, fontSize: '0.85rem', marginTop: '1.2rem' }}>
          Mantené el documento dentro del recuadro
        </p>
        <style>{`
          @keyframes scanline {
            0% { top: 10%; } 50% { top: 90%; } 100% { top: 10%; }
          }
        `}</style>
      </div>
    );
  }

  // Pantalla de procesamiento
  if (processing) {
    return <ProcessingScreen label="Verificando documento…" subtitle="Estamos validando los datos de tu documento" />;
  }

  return (
    <div>
      <h2 style={{
        fontFamily: fontDisplay, fontSize: '1.5rem', fontWeight: 500,
        color: C.paper, margin: '0 0 0.5rem', letterSpacing: '-0.01em',
      }}>Verificá tu documento</h2>
      <p style={{ color: C.paperSoft, fontSize: '0.92rem', lineHeight: 1.5, margin: '0 0 1.5rem' }}>
        Elegí el tipo de documento que querés usar para verificar tu identidad.
      </p>

      {/* Selección de tipo de documento */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem', marginBottom: '1.8rem' }}>
        {DOC_TYPES.map(doc => {
          const Icon = doc.icon;
          const isSelected = docType === doc.id;
          return (
            <button
              key={doc.id}
              onClick={() => { setDocType(doc.id); setCaptures({ front: null, back: null }); }}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.9rem',
                padding: '1rem', borderRadius: 14, cursor: 'pointer',
                background: isSelected ? `${C.terracotta}18` : C.card,
                border: isSelected ? `1.5px solid ${C.terracotta}` : `1px solid ${C.border}`,
                transition: 'all 0.2s ease', textAlign: 'left', width: '100%',
                fontFamily: fontBody,
              }}
            >
              <div style={{
                width: 42, height: 42, borderRadius: 10, flexShrink: 0,
                background: isSelected ? C.terracotta : C.cardSoft,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Icon size={20} color={isSelected ? '#fff' : C.paperSoft} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ color: C.paper, fontSize: '0.98rem', fontWeight: 600 }}>{doc.label}</div>
                <div style={{ color: C.muted, fontSize: '0.8rem', marginTop: 2 }}>{doc.desc}</div>
              </div>
              <div style={{
                width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                border: isSelected ? `none` : `2px solid ${C.border}`,
                background: isSelected ? C.terracotta : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {isSelected && <Check size={14} color="#fff" />}
              </div>
            </button>
          );
        })}
      </div>

      {/* Captura de fotos del documento */}
      {docType && (
        <div style={{ marginBottom: '1.8rem' }}>
          <div style={{
            fontSize: '0.75rem', color: C.muted, fontWeight: 600,
            letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '0.8rem',
          }}>
            {needsBack ? 'Tomá foto de ambos lados' : 'Tomá foto de la página principal'}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
            <CaptureBox
              label={needsBack ? 'Frente del documento' : 'Página del documento'}
              done={frontDone}
              onClick={() => simulateCapture('front')}
            />
            {needsBack && (
              <CaptureBox
                label="Dorso del documento"
                done={backDone}
                disabled={!frontDone}
                onClick={() => simulateCapture('back')}
              />
            )}
          </div>
        </div>
      )}

      {/* Botón continuar */}
      <button
        onClick={handleContinue}
        disabled={!allCaptured || !docType}
        style={{
          width: '100%', padding: '1rem', borderRadius: 999,
          background: (allCaptured && docType) ? C.terracotta : C.card,
          color: (allCaptured && docType) ? '#fff' : C.muted,
          border: 'none', fontSize: '0.98rem', fontWeight: 600,
          cursor: (allCaptured && docType) ? 'pointer' : 'not-allowed',
          fontFamily: fontBody, display: 'flex', alignItems: 'center',
          justifyContent: 'center', gap: '0.5rem',
          boxShadow: (allCaptured && docType) ? `0 6px 20px ${C.terracotta}50` : 'none',
          transition: 'all 0.2s ease',
        }}
      >
        Continuar <ArrowRight size={18} />
      </button>
    </div>
  );
}

// Caja de captura individual
function CaptureBox({ label, done, disabled, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || done}
      style={{
        display: 'flex', alignItems: 'center', gap: '0.9rem',
        padding: '1rem', borderRadius: 14, width: '100%',
        background: done ? `${C.green}15` : disabled ? `${C.card}80` : C.card,
        border: done ? `1.5px solid ${C.green}` : `1px dashed ${disabled ? C.border : C.terracotta}80`,
        cursor: (disabled || done) ? 'default' : 'pointer',
        textAlign: 'left', fontFamily: fontBody,
        opacity: disabled ? 0.5 : 1, transition: 'all 0.2s ease',
      }}
    >
      <div style={{
        width: 42, height: 42, borderRadius: 10, flexShrink: 0,
        background: done ? C.green : C.cardSoft,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {done ? <Check size={20} color="#fff" /> : <Camera size={20} color={C.paperSoft} />}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ color: C.paper, fontSize: '0.92rem', fontWeight: 500 }}>{label}</div>
        <div style={{ color: done ? C.green : C.muted, fontSize: '0.78rem', marginTop: 2 }}>
          {done ? 'Capturado ✓' : disabled ? 'Completá el anterior primero' : 'Tocá para tomar la foto'}
        </div>
      </div>
      {!done && !disabled && <ChevronRight size={18} color={C.muted} />}
    </button>
  );
}

// =============================================================
//   PASO 2 — FACE ID (reconocimiento facial + prueba de vida)
// =============================================================
function StepFaceID({ onComplete }) {
  const [stage, setStage] = useState('intro'); // intro | scanning | processing
  const [progress, setProgress] = useState(0);

  const startScan = () => {
    setStage('scanning');
    setProgress(0);
  };

  // Anima el progreso del escaneo facial
  useEffect(() => {
    if (stage !== 'scanning') return;
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setStage('processing');
          setTimeout(() => onComplete(), 1800);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [stage, onComplete]);

  if (stage === 'processing') {
    return <ProcessingScreen label="Verificando tu rostro…" subtitle="Comparando con la foto de tu documento" />;
  }

  if (stage === 'scanning') {
    return (
      <div style={{ textAlign: 'center', padding: '1rem 0' }}>
        <div style={{
          fontSize: '0.8rem', color: C.terracotta, fontWeight: 600,
          letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '1.5rem',
        }}>Detectando rostro…</div>

        {/* Círculo con progreso */}
        <div style={{ position: 'relative', width: 220, height: 220, margin: '0 auto' }}>
          <svg width="220" height="220" style={{ transform: 'rotate(-90deg)' }}>
            <circle cx="110" cy="110" r="100" fill="none" stroke={C.border} strokeWidth="6" />
            <circle
              cx="110" cy="110" r="100" fill="none" stroke={C.terracotta} strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 100}`}
              strokeDashoffset={`${2 * Math.PI * 100 * (1 - progress / 100)}`}
              style={{ transition: 'stroke-dashoffset 0.1s linear' }}
            />
          </svg>
          <div style={{
            position: 'absolute', inset: 20, borderRadius: '50%',
            background: `linear-gradient(135deg, ${C.cardSoft}, ${C.card})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexDirection: 'column', gap: '0.5rem',
          }}>
            <ScanFace size={64} color={C.terracotta} style={{ opacity: 0.6 + (progress / 250) }} />
            <span style={{ color: C.paper, fontSize: '1.4rem', fontWeight: 700, fontFamily: fontDisplay }}>{progress}%</span>
          </div>
        </div>

        <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.6rem', maxWidth: 280, margin: '2rem auto 0' }}>
          <LiveCheckItem label="Rostro detectado" done={progress > 20} />
          <LiveCheckItem label="Movimiento natural" done={progress > 50} />
          <LiveCheckItem label="Prueba de vida superada" done={progress > 80} />
        </div>
      </div>
    );
  }

  // intro
  return (
    <div>
      <h2 style={{
        fontFamily: fontDisplay, fontSize: '1.5rem', fontWeight: 500,
        color: C.paper, margin: '0 0 0.5rem', letterSpacing: '-0.01em',
      }}>Reconocimiento facial</h2>
      <p style={{ color: C.paperSoft, fontSize: '0.92rem', lineHeight: 1.5, margin: '0 0 2rem' }}>
        Vamos a comparar tu rostro con la foto de tu documento para confirmar que sos vos.
      </p>

      {/* Ilustración facial */}
      <div style={{
        width: 180, height: 180, margin: '0 auto 2rem',
        borderRadius: '50%', position: 'relative',
        background: `radial-gradient(circle, ${C.terracotta}20, transparent 70%)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '50%',
          border: `2px dashed ${C.terracotta}60`,
          animation: 'rotate 20s linear infinite',
        }} />
        <ScanFace size={80} color={C.terracotta} />
      </div>

      {/* Tips */}
      <div style={{
        background: C.card, border: `1px solid ${C.border}`,
        borderRadius: 14, padding: '1.1rem', marginBottom: '1.8rem',
      }}>
        <div style={{
          fontSize: '0.75rem', color: C.muted, fontWeight: 600,
          letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '0.7rem',
        }}>Para que funcione bien</div>
        {[
          'Buscá un lugar bien iluminado',
          'Sacate lentes, gorra o barbijo',
          'Mantené el rostro centrado',
          'Seguí las instrucciones en pantalla',
        ].map((tip, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: '0.6rem',
            padding: '0.35rem 0', color: C.paperSoft, fontSize: '0.88rem',
          }}>
            <CheckCircle2 size={15} color={C.green} style={{ flexShrink: 0 }} />
            {tip}
          </div>
        ))}
      </div>

      <button
        onClick={startScan}
        style={{
          width: '100%', padding: '1rem', borderRadius: 999,
          background: C.terracotta, color: '#fff', border: 'none',
          fontSize: '0.98rem', fontWeight: 600, cursor: 'pointer',
          fontFamily: fontBody, display: 'flex', alignItems: 'center',
          justifyContent: 'center', gap: '0.5rem',
          boxShadow: `0 6px 20px ${C.terracotta}50`,
        }}
      >
        <Camera size={18} /> Iniciar escaneo facial
      </button>
      <style>{`
        @keyframes rotate { from { transform: rotate(0); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

function LiveCheckItem({ label, done }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '0.6rem',
      padding: '0.5rem 0.8rem', borderRadius: 10,
      background: done ? `${C.green}15` : C.card,
      border: `1px solid ${done ? C.green : C.border}`,
      transition: 'all 0.3s ease',
    }}>
      <div style={{
        width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
        background: done ? C.green : 'transparent',
        border: done ? 'none' : `2px solid ${C.border}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {done && <Check size={12} color="#fff" />}
      </div>
      <span style={{
        color: done ? C.paper : C.muted, fontSize: '0.85rem',
        fontWeight: done ? 500 : 400,
      }}>{label}</span>
    </div>
  );
}

// =============================================================
//   PASO 3 — CÓDIGO DE VERIFICACIÓN (6 dígitos)
// =============================================================
function StepCode({ onComplete }) {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const inputsRef = useRef([]);

  // El código "correcto" para la demo es 123456
  const DEMO_CODE = '123456';

  useEffect(() => {
    if (resendTimer <= 0) return;
    const t = setTimeout(() => setResendTimer(prev => prev - 1), 1000);
    return () => clearTimeout(t);
  }, [resendTimer]);

  useEffect(() => {
    // Focus en el primer input al montar
    if (inputsRef.current[0]) inputsRef.current[0].focus();
  }, []);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; // solo números
    setError(false);
    const newCode = [...code];
    newCode[index] = value.slice(-1); // último dígito tipeado
    setCode(newCode);

    // Avanza al siguiente input
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }

    // Si se completaron los 6 dígitos, verifica
    if (newCode.every(d => d !== '') && newCode.join('').length === 6) {
      verifyCode(newCode.join(''));
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pasted.length === 6) {
      const newCode = pasted.split('');
      setCode(newCode);
      verifyCode(pasted);
    }
  };

  const verifyCode = (fullCode) => {
    setVerifying(true);
    setTimeout(() => {
      if (fullCode === DEMO_CODE) {
        setVerifying(false);
        onComplete();
      } else {
        setVerifying(false);
        setError(true);
        setCode(['', '', '', '', '', '']);
        inputsRef.current[0]?.focus();
      }
    }, 1200);
  };

  const resend = () => {
    if (resendTimer > 0) return;
    setResendTimer(30);
    setError(false);
  };

  if (verifying) {
    return <ProcessingScreen label="Verificando código…" subtitle="Un momento por favor" />;
  }

  return (
    <div>
      <h2 style={{
        fontFamily: fontDisplay, fontSize: '1.5rem', fontWeight: 500,
        color: C.paper, margin: '0 0 0.5rem', letterSpacing: '-0.01em',
      }}>Ingresá el código</h2>
      <p style={{ color: C.paperSoft, fontSize: '0.92rem', lineHeight: 1.5, margin: '0 0 0.5rem' }}>
        Te enviamos un código de 6 dígitos por SMS y email para confirmar tu identidad.
      </p>
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
        padding: '0.4rem 0.8rem', background: `${C.gold}15`,
        border: `1px solid ${C.gold}40`, borderRadius: 999,
        marginBottom: '2rem',
      }}>
        <KeyRound size={13} color={C.gold} />
        <span style={{ color: C.gold, fontSize: '0.78rem', fontWeight: 500 }}>
          Para la demo, usá el código 123456
        </span>
      </div>

      {/* Inputs del código */}
      <div
        onPaste={handlePaste}
        style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', marginBottom: '1.5rem' }}
      >
        {code.map((digit, i) => (
          <input
            key={i}
            ref={el => inputsRef.current[i] = el}
            type="tel"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={e => handleChange(i, e.target.value)}
            onKeyDown={e => handleKeyDown(i, e)}
            style={{
              width: 48, height: 58, textAlign: 'center',
              fontSize: '1.5rem', fontWeight: 700, fontFamily: fontDisplay,
              color: C.paper, background: C.card,
              border: `2px solid ${error ? C.terracotta : digit ? C.terracotta : C.border}`,
              borderRadius: 12, outline: 'none',
              transition: 'border-color 0.2s ease',
              WebkitAppearance: 'none',
            }}
          />
        ))}
      </div>

      {/* Error */}
      {error && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          justifyContent: 'center', color: C.terracotta, fontSize: '0.85rem',
          marginBottom: '1.5rem',
        }}>
          <AlertCircle size={15} /> Código incorrecto. Probá de nuevo.
        </div>
      )}

      {/* Reenviar */}
      <div style={{ textAlign: 'center' }}>
        <button
          onClick={resend}
          disabled={resendTimer > 0}
          style={{
            background: 'transparent', border: 'none',
            color: resendTimer > 0 ? C.muted : C.terracotta,
            fontSize: '0.88rem', fontWeight: 500,
            cursor: resendTimer > 0 ? 'default' : 'pointer',
            fontFamily: fontBody,
          }}
        >
          {resendTimer > 0 ? `Reenviar código en ${resendTimer}s` : 'Reenviar código'}
        </button>
      </div>
    </div>
  );
}

// =============================================================
//   PANTALLA DE PROCESAMIENTO (reutilizable)
// =============================================================
function ProcessingScreen({ label, subtitle }) {
  return (
    <div style={{ textAlign: 'center', padding: '3rem 0' }}>
      <div style={{
        width: 70, height: 70, margin: '0 auto 1.5rem',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '50%',
          border: `3px solid ${C.border}`,
          borderTopColor: C.terracotta,
          animation: 'spin 0.8s linear infinite',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Shield size={28} color={C.terracotta} />
        </div>
      </div>
      <h3 style={{
        fontFamily: fontDisplay, fontSize: '1.2rem', fontWeight: 500,
        color: C.paper, margin: '0 0 0.4rem',
      }}>{label}</h3>
      <p style={{ color: C.muted, fontSize: '0.88rem', margin: 0 }}>{subtitle}</p>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

// =============================================================
//   PANTALLA DE ÉXITO FINAL
// =============================================================
function SuccessScreen({ onFinish }) {
  return (
    <div style={{ textAlign: 'center', padding: '2rem 0' }}>
      <div style={{
        width: 100, height: 100, margin: '0 auto 1.8rem',
        borderRadius: '50%', background: `${C.green}20`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        animation: 'popIn 0.5s ease',
      }}>
        <div style={{
          width: 70, height: 70, borderRadius: '50%', background: C.green,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: `0 8px 24px ${C.green}60`,
        }}>
          <Check size={40} color="#fff" strokeWidth={3} />
        </div>
      </div>
      <h2 style={{
        fontFamily: fontDisplay, fontSize: '1.6rem', fontWeight: 500,
        color: C.paper, margin: '0 0 0.6rem', letterSpacing: '-0.01em',
      }}>¡Identidad verificada!</h2>
      <p style={{
        color: C.paperSoft, fontSize: '0.95rem', lineHeight: 1.55,
        margin: '0 auto 2rem', maxWidth: 320,
      }}>
        Tu identidad fue verificada con éxito. Ya podés operar en Lótum con tu cuenta verificada.
      </p>

      {/* Badge de verificado */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
        padding: '0.6rem 1.2rem', background: `${C.green}15`,
        border: `1px solid ${C.green}40`, borderRadius: 999,
        marginBottom: '2rem',
      }}>
        <Shield size={16} color={C.green} />
        <span style={{ color: C.green, fontSize: '0.88rem', fontWeight: 600 }}>
          Cuenta verificada
        </span>
      </div>

      <button
        onClick={onFinish}
        style={{
          width: '100%', padding: '1rem', borderRadius: 999,
          background: C.terracotta, color: '#fff', border: 'none',
          fontSize: '0.98rem', fontWeight: 600, cursor: 'pointer',
          fontFamily: fontBody, display: 'flex', alignItems: 'center',
          justifyContent: 'center', gap: '0.5rem',
          boxShadow: `0 6px 20px ${C.terracotta}50`,
        }}
      >
        Empezar a usar Lótum <ArrowRight size={18} />
      </button>
      <style>{`
        @keyframes popIn {
          0% { transform: scale(0); opacity: 0; }
          60% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

// =============================================================
//   COMPONENTE PRINCIPAL — FLUJO COMPLETO KYC
// =============================================================
export default function VerifyIdentity({ onClose }) {
  const [step, setStep] = useState(0); // 0=doc, 1=face, 2=code, 3=success
  const [docData, setDocData] = useState(null);

  const handleDocComplete = (data) => {
    setDocData(data);
    setStep(1);
    window.scrollTo(0, 0);
  };
  const handleFaceComplete = () => { setStep(2); window.scrollTo(0, 0); };
  const handleCodeComplete = () => { setStep(3); window.scrollTo(0, 0); };

  return (
    <div style={{
      minHeight: '100vh', background: 'transparent',
      padding: '1.5rem 1.2rem 6rem', fontFamily: fontBody,
    }}>
      {/* Header del flujo */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '0.8rem',
        marginBottom: '1.8rem',
      }}>
        {step < 3 && (
          <button
            onClick={() => {
              if (step === 0) onClose();
              else setStep(step - 1);
            }}
            style={{
              background: C.card, border: `1px solid ${C.border}`,
              borderRadius: 10, width: 40, height: 40, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: C.paper, flexShrink: 0,
            }}
          >
            <ArrowLeft size={18} />
          </button>
        )}
        <div style={{ flex: 1 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
            color: C.terracotta, fontSize: '0.72rem', fontWeight: 600,
            letterSpacing: '0.08em', textTransform: 'uppercase',
          }}>
            <Shield size={13} /> Verificación de identidad
          </div>
        </div>
        {step < 3 && (
          <button
            onClick={onClose}
            style={{
              background: 'transparent', border: 'none', cursor: 'pointer',
              color: C.muted, padding: '0.5rem',
            }}
          >
            <X size={20} />
          </button>
        )}
      </div>

      {/* Barra de progreso (no en success) */}
      {step < 3 && <StepProgress current={step} />}

      {/* Contenido del paso actual */}
      {step === 0 && <StepDocument onComplete={handleDocComplete} />}
      {step === 1 && <StepFaceID onComplete={handleFaceComplete} />}
      {step === 2 && <StepCode onComplete={handleCodeComplete} />}
      {step === 3 && <SuccessScreen onFinish={onClose} />}

      {/* Nota de seguridad al pie */}
      {step < 3 && (
        <div style={{
          display: 'flex', alignItems: 'flex-start', gap: '0.6rem',
          marginTop: '2rem', padding: '0.9rem 1rem',
          background: `${C.card}80`, border: `1px solid ${C.border}`,
          borderRadius: 12,
        }}>
          <Shield size={16} color={C.muted} style={{ flexShrink: 0, marginTop: 2 }} />
          <p style={{
            color: C.muted, fontSize: '0.78rem', lineHeight: 1.5, margin: 0,
          }}>
            Tus datos están protegidos y cifrados. Solo se usan para verificar tu identidad conforme a la Ley 25.326 de Protección de Datos Personales.
          </p>
        </div>
      )}
    </div>
  );
}
