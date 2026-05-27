// =======================================================================
//   LÓTUM — TÉRMINOS Y CONDICIONES
//   Versión 1.1 — Documento de trabajo para revisión legal
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

const WHATSAPP_URL = "https://wa.me/5492235834453?text=Hola%20L%C3%B3tum!%20Tengo%20una%20consulta%20sobre%20los%20T%C3%A9rminos%20y%20Condiciones.";

function LotumLogo({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      <defs>
        <linearGradient id={`tyc-grad-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={C.terracotta} />
          <stop offset="100%" stopColor={C.gold} />
        </linearGradient>
      </defs>
      <circle cx="24" cy="24" r="22" stroke={`url(#tyc-grad-${size})`} strokeWidth="1.8" fill="none" opacity="0.9" />
      <path d="M14 12 L34 12 L24 24 L34 36 L14 36 L24 24 Z" fill={`url(#tyc-grad-${size})`} />
    </svg>
  );
}

// =============================================================
//   DATOS DE LOS T&C — todo el texto estructurado
// =============================================================
const TYC_DATA = {
  meta: {
    version: 'Versión 1.1',
    note: 'Documento de trabajo para revisión legal',
    updatedAt: '27 de noviembre de 2026',
    jurisdiction: 'República Argentina',
    legalEntity: 'Lucas Andrade (responsable provisorio)',
    cuit: 'En trámite — pendiente de constitución de Lótum S.R.L.',
    address: 'Mar del Plata, Provincia de Buenos Aires, República Argentina',
    contactEmail: 'contacto@lotum.com.ar',
    legalJurisdiction: 'Tribunales Ordinarios de Mar del Plata, Provincia de Buenos Aires',
  },
  preamble: `Los presentes Términos y Condiciones Generales (en adelante, los "Términos" o "T&C") regulan el acceso, registro, navegación y uso de la plataforma digital LÓTUM, en sus versiones web y/o mobile (en adelante, la "Plataforma" o "LÓTUM"), titularidad de LUCAS ANDRADE (responsable provisorio en proceso de constitución de Lótum S.R.L.), CUIT en trámite, con domicilio legal en Mar del Plata, Provincia de Buenos Aires, República Argentina (en adelante, "LÓTUM", "la Empresa" o "nosotros").

LÓTUM es una plataforma tecnológica que actúa como nexo y facilitador entre Propietarios de inmuebles e Inversores interesados en financiar, gestionar y ejecutar obras de reciclado, refacción y puesta en valor de dichos inmuebles, con el objeto último de su comercialización y venta a terceros, conforme al modelo contractual descripto en el Anexo I.`,
  acceptanceWarning: 'EL USO DE LA PLATAFORMA IMPLICA EL CONOCIMIENTO, ACEPTACIÓN PLENA, EXPRESA Y SIN RESERVAS DE TODAS Y CADA UNA DE LAS CLÁUSULAS DE LOS PRESENTES TÉRMINOS Y CONDICIONES, ASÍ COMO DE LA POLÍTICA DE PRIVACIDAD Y DEMÁS POLÍTICAS COMPLEMENTARIAS QUE LOS INTEGRAN. SI EL USUARIO NO ESTÁ DE ACUERDO CON ALGUNA DE SUS DISPOSICIONES, DEBE ABSTENERSE DE UTILIZAR LA PLATAFORMA.',
  sections: [
    {
      id: 'definiciones',
      number: '1',
      title: 'Definiciones',
      content: [
        { type: 'p', text: 'A los efectos de los presentes Términos, los siguientes términos tendrán el significado que se les asigna:' },
        { type: 'definitions', items: [
          ['Usuario', 'toda persona humana o jurídica que acceda, se registre y/o utilice la Plataforma, en cualquiera de sus roles (Propietario, Inversor, Visitante o Tercero).'],
          ['Propietario', 'Usuario titular registral del inmueble que ofrece a través de la Plataforma para su reciclado y posterior venta.'],
          ['Inversor', 'Usuario que financia, gestiona y/o ejecuta las obras de reciclado y comercialización del inmueble.'],
          ['Operación', 'vínculo contractual celebrado entre un Propietario y un Inversor a través de la Plataforma, conforme al modelo contractual del Anexo I.'],
          ['Cuenta', 'espacio personal de cada Usuario en la Plataforma, accesible mediante credenciales únicas.'],
          ['KYC (Know Your Customer)', 'proceso de verificación de identidad mediante documento de identidad y reconocimiento facial (biometría).'],
          ['Contenido', 'toda información, documentación, imagen, dato o material cargado, transmitido o generado en la Plataforma.'],
          ['Servicios', 'funcionalidades ofrecidas por LÓTUM, incluyendo matchmaking, gestión documental, verificación de identidad, seguimiento de obra, herramientas de comercialización y soporte.'],
          ['Medios de Pago', 'instrumentos habilitados por LÓTUM para el pago de comisiones, aranceles y demás conceptos, conforme la cláusula 7 y el Anexo II.'],
          ['Criptoactivos', 'representaciones digitales de valor que pueden ser objeto de transferencia y almacenamiento electrónico, incluyendo entre otras Bitcoin (BTC) y stablecoins como USDT, USDC, DAI.'],
        ]},
      ],
    },
    {
      id: 'objeto',
      number: '2',
      title: 'Objeto y naturaleza jurídica del servicio',
      content: [
        { type: 'h3', text: '2.1. Objeto' },
        { type: 'p', text: 'LÓTUM pone a disposición de los Usuarios una plataforma tecnológica destinada a facilitar el encuentro entre Propietarios e Inversores, la documentación de Operaciones, el seguimiento de obras y la comercialización de inmuebles reciclados.' },
        { type: 'h3', text: '2.2. Naturaleza de intermediario tecnológico' },
        { type: 'p', text: 'LÓTUM actúa exclusivamente como intermediario tecnológico. LÓTUM NO es parte de las Operaciones celebradas entre Propietarios e Inversores, NO es propietario, comprador, vendedor, inversor, constructor, corredor inmobiliario, escribano, asesor financiero, asesor legal, ni representante de ninguna de las partes.' },
        { type: 'p', text: 'LÓTUM no garantiza la concreción, viabilidad, rentabilidad, calidad, legalidad ni resultado económico de las Operaciones, ni la veracidad, exactitud o integridad de la información provista por los Usuarios.' },
        { type: 'h3', text: '2.3. Servicios provistos' },
        { type: 'p', text: 'Los Servicios incluyen, de manera enunciativa y no limitativa:' },
        { type: 'ul', items: [
          'Registro y verificación de identidad de Usuarios (KYC).',
          'Publicación de inmuebles y oportunidades de inversión.',
          'Herramientas de matchmaking entre Propietarios e Inversores.',
          'Provisión de modelos contractuales sugeridos (sujetos a revisión legal independiente por las partes).',
          'Gestión y resguardo digital de documentación.',
          'Seguimiento del avance de obra y de la comercialización.',
          'Canales de comunicación entre Usuarios.',
          'Procesamiento de pagos de comisiones y aranceles a través de los Medios de Pago habilitados.',
          'Soporte técnico de la Plataforma.',
        ]},
      ],
    },
    {
      id: 'capacidad',
      number: '3',
      title: 'Capacidad legal y registro de usuarios',
      content: [
        { type: 'h3', text: '3.1. Capacidad' },
        { type: 'p', text: 'Sólo podrán registrarse en LÓTUM personas humanas mayores de DIECIOCHO (18) años con plena capacidad civil de hecho y de derecho conforme al Código Civil y Comercial de la Nación, y personas jurídicas debidamente constituidas e inscriptas, representadas por quien acredite facultades suficientes.' },
        { type: 'p', text: 'Se prohíbe expresamente el registro a personas que: (i) hayan sido inhabilitadas judicialmente; (ii) estén incluidas en listas de Personas Expuestas Políticamente (PEP) sin la debida declaración; (iii) figuren en listas de sanciones internacionales (ONU, OFAC, UE, etc.); (iv) hayan tenido cuentas previamente suspendidas en LÓTUM; (v) actúen en nombre de terceros sin acreditar representación válida.' },
        { type: 'h3', text: '3.2. Información del registro' },
        { type: 'p', text: 'Al registrarse, el Usuario declara bajo juramento que toda la información provista es verdadera, exacta, vigente y completa, y se compromete a mantenerla actualizada. La información falsa, inexacta o desactualizada constituirá causal de suspensión o baja inmediata, sin perjuicio de las acciones civiles y/o penales que correspondan.' },
        { type: 'h3', text: '3.3. Cuenta única e intransferible' },
        { type: 'p', text: 'La Cuenta es personal, única e intransferible. Cada Usuario podrá tener una sola Cuenta activa. Las credenciales de acceso (usuario, contraseña, biometría) son de uso exclusivo del titular, quien será responsable de su confidencialidad y de toda actividad realizada bajo su Cuenta. El Usuario notificará inmediatamente a LÓTUM cualquier uso no autorizado o sospecha de vulneración.' },
      ],
    },
    {
      id: 'kyc',
      number: '4',
      title: 'Verificación de identidad (KYC) y prevención de fraude',
      content: [
        { type: 'h3', text: '4.1. Verificación obligatoria' },
        { type: 'p', text: 'Como condición esencial y excluyente para operar en la Plataforma, todo Usuario deberá someterse a un proceso de verificación de identidad (KYC) que incluye:' },
        { type: 'ul', items: [
          'Carga de fotografía clara del documento nacional de identidad (DNI) o documento equivalente vigente, anverso y reverso.',
          'Prueba de vida y reconocimiento facial biométrico (selfie en vivo).',
          'Cotejo automatizado entre la imagen del documento y la imagen biométrica.',
          'Verificación contra bases de datos públicas y privadas autorizadas (RENAPER y/u otras).',
        ]},
        { type: 'h3', text: '4.2. Finalidad del KYC' },
        { type: 'p', text: 'La verificación tiene por finalidad: prevenir suplantación de identidad, fraude, estafas, lavado de activos y financiamiento del terrorismo; proteger al resto de los Usuarios; cumplir con la normativa vigente (Ley 25.246 y modificatorias, Resoluciones UIF aplicables, Ley 25.326 de Protección de Datos Personales, normativa AFIP, BCRA y CNV en lo pertinente).' },
        { type: 'h3', text: '4.3. Consentimiento expreso para tratamiento biométrico' },
        { type: 'p', text: 'El Usuario presta consentimiento libre, expreso, previo e informado para que LÓTUM recolecte, almacene, procese y coteje sus datos biométricos faciales y la imagen de su documento de identidad, con la finalidad exclusiva indicada en el punto 4.2 y conforme a la Política de Privacidad.' },
        { type: 'p', text: 'El Usuario podrá revocar el consentimiento en cualquier momento, lo que implicará la baja automática de la Cuenta y la imposibilidad de continuar operando en la Plataforma, sin perjuicio de la conservación de los datos por los plazos legales de archivo obligatorio.' },
        { type: 'h3', text: '4.4. Reverificación periódica' },
        { type: 'p', text: 'LÓTUM se reserva el derecho de exigir nuevas verificaciones biométricas, documentales o complementarias en cualquier momento, incluyendo de manera previa a cada Operación, ante operaciones de monto significativo, o cuando se detecten indicios de actividad sospechosa.' },
        { type: 'h3', text: '4.5. Limitaciones del KYC' },
        { type: 'p', text: 'El Usuario reconoce y acepta que el proceso de KYC es una herramienta de mitigación de riesgo, pero no puede garantizar de manera absoluta la veracidad de la identidad declarada ni eliminar por completo el riesgo de fraude. LÓTUM no será responsable por fallas tecnológicas, alteraciones documentales sofisticadas o ataques que excedan los estándares razonables de la industria.' },
      ],
    },
    {
      id: 'roles',
      number: '5',
      title: 'Roles y obligaciones de los usuarios',
      content: [
        { type: 'h3', text: '5.1. Obligaciones generales de todos los Usuarios' },
        { type: 'ul', items: [
          'Utilizar la Plataforma de buena fe, con lealtad y conforme a su destino.',
          'Abstenerse de cargar contenido falso, engañoso, ofensivo, ilícito o que vulnere derechos de terceros.',
          'No suplantar la identidad de otra persona ni crear cuentas falsas, duplicadas o automatizadas.',
          'No utilizar la Plataforma para fines ilícitos, fraudulentos, de lavado de activos, financiamiento del terrorismo o cualquier actividad sancionada por la legislación vigente.',
          'Respetar la confidencialidad de la información de otros Usuarios.',
          'No realizar ingeniería inversa, scraping, web crawling automatizado, ni vulnerar las medidas de seguridad de la Plataforma.',
          'Mantener actualizada la información de su Cuenta y notificar cambios relevantes.',
          'Cumplir íntegramente las obligaciones asumidas frente a otros Usuarios.',
        ]},
        { type: 'h3', text: '5.2. Obligaciones específicas del Propietario' },
        { type: 'ul', items: [
          'Acreditar la titularidad registral del inmueble mediante título de propiedad y/o informe de dominio vigente.',
          'Garantizar que el inmueble se encuentra libre de gravámenes, embargos, inhibiciones, ocupantes o reclamos no declarados, salvo expresa manifestación en contrario.',
          'Entregar toda la documentación dominial, fiscal, catastral y técnica requerida para la comercialización.',
          'Otorgar el poder especial irrevocable previsto contractualmente, conforme al art. 380 CCyCN.',
          'Mantener al día impuestos, tasas, contribuciones y expensas a su cargo conforme al contrato.',
          'Abstenerse de realizar actos de disposición sobre el inmueble durante la vigencia de la Operación.',
          'Informar fielmente el estado del inmueble, ocupación, vicios conocidos y todo dato relevante.',
        ]},
        { type: 'h3', text: '5.3. Obligaciones específicas del Inversor' },
        { type: 'ul', items: [
          'Acreditar capacidad económica y origen lícito de los fondos cuando le sea requerido.',
          'Ejecutar las obras conforme a las normas técnicas, edilicias, de seguridad e higiene aplicables.',
          'Contratar bajo su exclusiva responsabilidad personal, contratistas, subcontratistas y profesionales, asumiendo íntegramente las obligaciones laborales, previsionales, sindicales, fiscales y de aseguramiento (ART, seguros de responsabilidad civil, etc.).',
          'Mantener indemne al Propietario y a LÓTUM respecto de cualquier reclamo derivado de las obras.',
          'Documentar el avance de obra y la inversión efectivamente realizada.',
          'Actuar con transparencia en la comercialización del inmueble y rendir cuentas conforme al contrato.',
          'Cumplir con la normativa de prevención de lavado de activos y financiamiento del terrorismo.',
        ]},
      ],
    },
    {
      id: 'operaciones',
      number: '6',
      title: 'Operaciones entre usuarios',
      content: [
        { type: 'h3', text: '6.1. Vínculo directo entre partes' },
        { type: 'p', text: 'Las Operaciones se celebran y ejecutan directamente entre Propietario e Inversor. LÓTUM no es parte del contrato, no garantiza su cumplimiento, ni asume responsabilidad por los resultados económicos, técnicos, legales o de cualquier otra índole de la Operación.' },
        { type: 'h3', text: '6.2. Asesoramiento independiente' },
        { type: 'p', text: 'Los modelos contractuales sugeridos por LÓTUM son meramente orientativos. Cada parte declara haber tenido la posibilidad de obtener asesoramiento legal, contable, fiscal y técnico independiente antes de suscribir cualquier contrato. LÓTUM recomienda enfáticamente la intervención de profesionales matriculados.' },
        { type: 'h3', text: '6.3. Instrumentación notarial' },
        { type: 'p', text: 'Los actos que requieran escritura pública (poderes especiales, hipotecas, escrituras traslativas de dominio, cesiones de derechos, etc.) deberán otorgarse ante escribano público con competencia territorial, siendo los gastos de escrituración a cargo de las partes conforme lo pactado contractualmente y la normativa vigente.' },
        { type: 'h3', text: '6.4. Comisiones y aranceles de LÓTUM' },
        { type: 'p', text: 'Por la prestación de los Servicios, LÓTUM percibirá las comisiones, aranceles, fees de éxito o cargos que se detallen en el Anexo II — Tarifario, el cual forma parte integrante de los presentes Términos. LÓTUM podrá modificar el tarifario con un preaviso mínimo de TREINTA (30) días corridos, notificado a través de la Plataforma.' },
      ],
    },
    {
      id: 'pagos',
      number: '7',
      title: 'Formas de pago aceptadas',
      content: [
        { type: 'h3', text: '7.1. Medios de Pago habilitados' },
        { type: 'p', text: 'LÓTUM acepta el pago de comisiones, aranceles y demás conceptos a través de los siguientes Medios de Pago, sin perjuicio de aquellos que en el futuro la Empresa pueda incorporar, modificar o discontinuar a su exclusivo criterio:' },
        { type: 'ul', items: [
          'Tarjetas de crédito y/o débito de las principales marcas (Visa, Mastercard, American Express, Cabal, Naranja, entre otras), procesadas a través de proveedores de servicios de pago habilitados (Mercado Pago, Stripe, MODO, dLocal, PayU o equivalentes).',
          'Transferencias bancarias en pesos argentinos (ARS), a través del Sistema Nacional de Pagos, mediante CBU, CVU o alias bancario que LÓTUM oportunamente informe.',
          'Transferencias en dólares estadounidenses (USD), tanto en cuentas locales como en cuentas del exterior habilitadas por LÓTUM, sujetas a la normativa cambiaria vigente del Banco Central de la República Argentina (BCRA).',
          'Criptoactivos, incluyendo de manera enunciativa y no limitativa: Bitcoin (BTC), Ether (ETH) y stablecoins denominadas en dólares estadounidenses tales como USDT (Tether), USDC (USD Coin) y DAI, en las redes blockchain que LÓTUM oportunamente habilite (Ethereum, Tron, Bitcoin, Polygon, Arbitrum, Optimism, entre otras).',
          'Efectivo, únicamente cuando lo autorice expresamente LÓTUM y conforme a los límites previstos en la normativa de prevención de lavado de activos.',
          'Cualquier otro medio de pago electrónico o digital que LÓTUM habilite oportunamente.',
        ]},
        { type: 'h3', text: '7.2. Pagos en moneda extranjera' },
        { type: 'p', text: 'Cuando los pagos se realicen en una moneda distinta al peso argentino, se aplicará la cotización vigente al momento del pago, conforme al tipo de cambio que LÓTUM establezca razonablemente, tomando como referencia las cotizaciones del Banco de la Nación Argentina, exchanges de criptoactivos reconocidos o el tipo de cambio implícito de mercado, según corresponda.' },
        { type: 'p', text: 'El Usuario asume íntegramente el riesgo cambiario, las diferencias de cotización, comisiones bancarias, comisiones de red blockchain ("gas fees"), spreads y cualquier otro costo asociado a la operatoria en moneda extranjera o criptoactivos.' },
        { type: 'h3', text: '7.3. Pagos en criptoactivos' },
        { type: 'p', text: 'Los pagos en criptoactivos se realizarán exclusivamente a las direcciones de billetera (wallets) que LÓTUM informe oficialmente a través de la Plataforma o por canales de comunicación verificados. LÓTUM NO se responsabiliza por transferencias realizadas a direcciones incorrectas, redes blockchain equivocadas, errores de tipeo, robos, hackeos, pérdida de claves privadas o cualquier otro evento imputable al Usuario.' },
        { type: 'p', text: 'El Usuario reconoce y acepta expresamente que: (i) las operaciones con criptoactivos son irreversibles y no admiten contracargos ("chargebacks"); (ii) la volatilidad del valor de los criptoactivos puede generar diferencias de cotización entre el momento de la facturación y el momento del pago efectivo; (iii) LÓTUM podrá exigir un mínimo de confirmaciones de red antes de considerar acreditado el pago; (iv) los criptoactivos no constituyen moneda de curso legal en la República Argentina; (v) el Usuario es responsable exclusivo del cumplimiento de sus obligaciones tributarias derivadas del uso de criptoactivos.' },
        { type: 'p', text: 'LÓTUM podrá rechazar pagos en criptoactivos provenientes de wallets vinculadas a actividades ilícitas, mixers, tumblers, sanciones internacionales (OFAC, UE, ONU) o direcciones marcadas como riesgosas por proveedores de análisis on-chain (Chainalysis, TRM Labs, Elliptic o similares), exigiendo en su caso documentación adicional sobre el origen de los fondos.' },
        { type: 'h3', text: '7.4. Pagos con tarjeta de crédito o débito' },
        { type: 'p', text: 'Los pagos con tarjeta son procesados por procesadores de pago externos. LÓTUM no almacena los datos completos de las tarjetas, los cuales son resguardados por dichos procesadores bajo estándares PCI-DSS. El Usuario garantiza ser titular o usuario autorizado de la tarjeta utilizada. Los contracargos injustificados, fraudulentos o de mala fe facultarán a LÓTUM a suspender la Cuenta y reclamar los daños correspondientes.' },
        { type: 'h3', text: '7.5. Facturación' },
        { type: 'p', text: 'LÓTUM emitirá la factura electrónica correspondiente conforme a la normativa de AFIP. El Usuario deberá proveer datos fiscales correctos y completos (CUIT/CUIL, condición frente al IVA, razón social, domicilio fiscal). LÓTUM no será responsable por las consecuencias derivadas de información fiscal errónea suministrada por el Usuario.' },
        { type: 'h3', text: '7.6. Mora y falta de pago' },
        { type: 'p', text: 'La falta de pago en tiempo y forma de cualquier suma adeudada a LÓTUM generará la mora automática del Usuario, sin necesidad de interpelación previa, devengando un interés moratorio equivalente a UNA VEZ Y MEDIA (1,5) la tasa activa del Banco de la Nación Argentina para operaciones de descuento a treinta (30) días. LÓTUM podrá, asimismo, suspender preventivamente la Cuenta hasta la regularización del pago, ejecutar las garantías existentes y/o iniciar las acciones de cobro pertinentes.' },
        { type: 'h3', text: '7.7. Prevención de lavado de activos' },
        { type: 'p', text: 'Todos los pagos efectuados a través de la Plataforma están sujetos a los controles de prevención de lavado de activos y financiamiento del terrorismo (Ley 25.246 y modificatorias, Resoluciones UIF). LÓTUM podrá requerir documentación adicional sobre el origen de los fondos, retener pagos sospechosos, reportar operaciones inusuales a la Unidad de Información Financiera (UIF) y dar de baja Cuentas vinculadas a operatorias irregulares, sin que ello genere derecho a indemnización alguna a favor del Usuario.' },
        { type: 'h3', text: '7.8. Devoluciones y reembolsos' },
        { type: 'p', text: 'Salvo disposición legal en contrario o decisión discrecional de LÓTUM, los pagos efectuados son no reembolsables una vez que el Servicio ha sido prestado o que la comisión se ha devengado. Las solicitudes de reembolso serán evaluadas caso por caso. En el caso de criptoactivos, los reembolsos —cuando correspondan— se efectuarán en la misma criptomoneda y red utilizada en el pago original, al valor del momento del reembolso, no asumiendo LÓTUM la diferencia de cotización.' },
      ],
    },
    {
      id: 'prohibiciones',
      number: '8',
      title: 'Prohibiciones y conductas sancionables',
      content: [
        { type: 'p', text: 'El Usuario se compromete a NO realizar, directa o indirectamente, las siguientes conductas, sin perjuicio de cualquier otra que resulte contraria a la buena fe, la moral, las buenas costumbres o la legislación aplicable:' },
        { type: 'ul', items: [
          'Suplantar la identidad de terceros o utilizar documentación apócrifa, adulterada o ajena.',
          'Cargar imágenes, videos o datos biométricos de terceros sin su consentimiento.',
          'Eludir o intentar eludir los procesos de verificación de identidad.',
          'Concretar Operaciones por fuera de la Plataforma con el fin de evadir comisiones ("by-pass").',
          'Realizar publicaciones falsas, duplicadas o engañosas sobre inmuebles.',
          'Ofrecer inmuebles sobre los que no se tiene titularidad o legitimación.',
          'Utilizar la Plataforma para lavado de activos, financiamiento del terrorismo, fraude o cualquier delito.',
          'Realizar pagos con fondos de origen ilícito o desde wallets de criptoactivos vinculadas a actividades sancionadas.',
          'Hostigar, amenazar, discriminar o injuriar a otros Usuarios o al personal de LÓTUM.',
          'Difundir contenido protegido por derechos de propiedad intelectual sin autorización.',
          'Introducir virus, malware, código malicioso o realizar ataques de cualquier tipo contra la Plataforma.',
          'Recolectar datos de otros Usuarios mediante medios automatizados o no autorizados.',
          'Utilizar la Plataforma para realizar publicidad no autorizada, spam o esquemas piramidales.',
        ]},
      ],
    },
    {
      id: 'suspension',
      number: '9',
      title: 'Suspensión, inhabilitación y baja de cuenta',
      content: [
        { type: 'h3', text: '9.1. Facultades de LÓTUM' },
        { type: 'p', text: 'LÓTUM podrá, a su exclusivo criterio y sin necesidad de previo aviso, suspender preventivamente, inhabilitar de forma temporaria o definitiva, o dar de baja cualquier Cuenta cuando:' },
        { type: 'ul', items: [
          'Existan indicios razonables de incumplimiento de los presentes T&C.',
          'Se detecten conductas potencialmente fraudulentas, sospechosas o riesgosas.',
          'Falle o sea revocada la verificación de identidad.',
          'Se reciban reclamos fundados de otros Usuarios o de terceros.',
          'Lo requiera una autoridad administrativa, judicial o regulatoria competente.',
          'El Usuario figure en listas restrictivas (PEP, sanciones internacionales, etc.).',
          'Lo exija el cumplimiento normativo vigente.',
        ]},
        { type: 'h3', text: '9.2. Efectos' },
        { type: 'p', text: 'La suspensión o baja no genera derecho a indemnización alguna a favor del Usuario. LÓTUM podrá retener fondos, información y documentación por los plazos legales de archivo, y colaborará con las autoridades competentes cuando corresponda.' },
        { type: 'h3', text: '9.3. Baja voluntaria' },
        { type: 'p', text: 'El Usuario podrá solicitar la baja voluntaria de su Cuenta en cualquier momento desde la Plataforma o por los canales habilitados, sin perjuicio de las obligaciones pendientes de cumplimiento y de la conservación de datos por motivos legales o regulatorios.' },
      ],
    },
    {
      id: 'propiedad-intelectual',
      number: '10',
      title: 'Propiedad intelectual',
      content: [
        { type: 'p', text: 'Todos los derechos de propiedad intelectual e industrial sobre la Plataforma, su software, código fuente, código objeto, diseños, marcas, logotipos (incluyendo la marca "LÓTUM"), nombres comerciales, textos, imágenes, bases de datos, algoritmos y cualquier otro elemento que la integre son de titularidad exclusiva de LÓTUM o de sus licenciantes.' },
        { type: 'p', text: 'Se otorga al Usuario una licencia limitada, personal, no exclusiva, intransferible, revocable y gratuita para utilizar la Plataforma exclusivamente conforme a los presentes T&C. Queda prohibida toda reproducción, copia, distribución, modificación, ingeniería inversa, descompilación, comercialización o explotación no autorizada.' },
        { type: 'p', text: 'El Usuario otorga a LÓTUM una licencia gratuita, mundial, no exclusiva y por el plazo máximo legal para utilizar el contenido que cargue en la Plataforma con la finalidad de prestar los Servicios, incluyendo su almacenamiento, indexación, exhibición y comunicación a otros Usuarios autorizados.' },
      ],
    },
    {
      id: 'datos-personales',
      number: '11',
      title: 'Protección de datos personales y privacidad',
      content: [
        { type: 'h3', text: '11.1. Marco legal' },
        { type: 'p', text: 'El tratamiento de datos personales se rige por la Política de Privacidad de LÓTUM, la Ley 25.326 de Protección de Datos Personales, su Decreto Reglamentario 1558/2001, las Disposiciones de la Agencia de Acceso a la Información Pública (AAIP) y la normativa complementaria.' },
        { type: 'h3', text: '11.2. Datos sensibles y biométricos' },
        { type: 'p', text: 'LÓTUM tratará los datos biométricos faciales y la imagen del documento de identidad como datos personales sujetos a especial protección, aplicando medidas técnicas y organizativas de seguridad apropiadas (cifrado, control de acceso, registro de auditoría, etc.).' },
        { type: 'h3', text: '11.3. Derechos del titular de los datos' },
        { type: 'p', text: 'El Usuario podrá ejercer los derechos de acceso, rectificación, actualización, supresión y oposición conforme a la normativa vigente, dirigiéndose a contacto@lotum.com.ar. La AAIP es el órgano de control con facultad para atender reclamos y denuncias.' },
        { type: 'h3', text: '11.4. Cesión a terceros' },
        { type: 'p', text: 'LÓTUM podrá compartir datos con: (i) proveedores tecnológicos, de KYC y de procesamiento de pagos bajo acuerdos de confidencialidad; (ii) autoridades judiciales o administrativas cuando lo requiera la ley; (iii) entidades del grupo empresario; (iv) terceros con consentimiento expreso del Usuario.' },
      ],
    },
    {
      id: 'limitacion',
      number: '12',
      title: 'Limitación y exención de responsabilidad',
      content: [
        { type: 'h3', text: '12.1. Provisión "tal cual"' },
        { type: 'p', text: 'La Plataforma se provee "tal cual" ("AS IS") y "según disponibilidad" ("AS AVAILABLE"). LÓTUM no garantiza la ausencia de errores, interrupciones, fallas, virus o demoras, ni que la Plataforma sea apta para una finalidad particular del Usuario.' },
        { type: 'h3', text: '12.2. Exenciones específicas' },
        { type: 'p', text: 'En la máxima medida permitida por la ley, LÓTUM NO será responsable por:' },
        { type: 'ul', items: [
          'Daños derivados de Operaciones celebradas entre Usuarios, incluyendo incumplimientos contractuales, vicios redhibitorios, problemas dominiales, ocultamiento de información, etc.',
          'Pérdidas económicas, lucro cesante, pérdida de chance, daño moral o reputacional derivados del uso o imposibilidad de uso de la Plataforma.',
          'Estafas, fraudes o engaños perpetrados por Usuarios contra otros Usuarios, sin perjuicio de las medidas de prevención implementadas.',
          'Resultados económicos, rentabilidad, valuación o liquidez de los inmuebles.',
          'Demoras, paralizaciones o sobrecostos de obra.',
          'Decisiones tomadas por los Usuarios con base en información, recomendaciones o sugerencias provistas por la Plataforma.',
          'Hechos de terceros, caso fortuito, fuerza mayor, hecho del príncipe, paros, conflictos sociales, pandemias o emergencias sanitarias.',
          'Fallas de conectividad, hosting, energía eléctrica, ataques cibernéticos o cualquier evento ajeno al control razonable de LÓTUM.',
          'Pérdidas, robos o errores en operaciones con criptoactivos imputables al Usuario, incluyendo envíos a direcciones incorrectas, redes equivocadas o pérdida de claves privadas.',
          'Volatilidad o fluctuaciones del valor de criptoactivos o monedas extranjeras.',
          'Contenido cargado por los Usuarios.',
        ]},
        { type: 'h3', text: '12.3. Límite cuantitativo' },
        { type: 'p', text: 'En cualquier caso, y en la máxima medida permitida por la ley, la responsabilidad total y agregada de LÓTUM frente a un Usuario, por cualquier concepto y por todo el período contractual, quedará limitada al monto efectivamente percibido por LÓTUM en concepto de comisiones por dicho Usuario en los DOCE (12) meses anteriores al hecho generador del reclamo.' },
      ],
    },
    {
      id: 'indemnidad',
      number: '13',
      title: 'Indemnidad',
      content: [
        { type: 'p', text: 'El Usuario se obliga a mantener indemne y libre de toda responsabilidad a LÓTUM, sus accionistas, directores, empleados, agentes, proveedores y representantes, frente a cualquier reclamo, demanda, acción, juicio, multa, sanción, pérdida, daño, costo, gasto u honorario (incluyendo honorarios legales razonables) que tenga origen en: (i) el incumplimiento de los presentes T&C; (ii) la violación de derechos de terceros; (iii) el contenido cargado por el Usuario; (iv) las Operaciones que celebre; (v) la falsedad de las declaraciones efectuadas; (vi) el uso indebido de la Plataforma; (vii) el origen ilícito o irregular de los fondos utilizados para los pagos.' },
      ],
    },
    {
      id: 'modificaciones',
      number: '14',
      title: 'Modificaciones a los términos',
      content: [
        { type: 'p', text: 'LÓTUM podrá modificar los presentes T&C en cualquier momento. Las modificaciones serán notificadas con un preaviso mínimo de DIEZ (10) días corridos a través de la Plataforma y/o por correo electrónico. Si el Usuario continúa utilizando la Plataforma con posterioridad a la entrada en vigencia, se considerará que acepta las modificaciones. En caso contrario, podrá dar de baja su Cuenta sin penalidad.' },
      ],
    },
    {
      id: 'notificaciones',
      number: '15',
      title: 'Notificaciones y domicilios',
      content: [
        { type: 'p', text: 'Todas las notificaciones derivadas de los presentes T&C se cursarán por medios electrónicos a las direcciones registradas en la Cuenta, las que se considerarán domicilios electrónicos válidos a todos los efectos legales. El Usuario deberá mantener actualizada su dirección de correo electrónico y se considera notificado al momento de envío del mensaje.' },
        { type: 'p', text: 'Los domicilios constituidos para notificaciones judiciales o extrajudiciales formales son: LÓTUM: Mar del Plata, Provincia de Buenos Aires, República Argentina. Usuario: el declarado en su Cuenta.' },
      ],
    },
    {
      id: 'jurisdiccion',
      number: '16',
      title: 'Ley aplicable y jurisdicción',
      content: [
        { type: 'p', text: 'Los presentes T&C se rigen por las leyes de la República Argentina. Para toda cuestión, controversia o reclamo derivado de los presentes Términos, su existencia, validez, interpretación, alcance, cumplimiento o resolución, las partes se someten a la jurisdicción exclusiva de los Tribunales Ordinarios de Mar del Plata, Provincia de Buenos Aires, renunciando expresamente a cualquier otro fuero o jurisdicción que pudiera corresponder, incluido el federal.' },
        { type: 'p', text: 'Sin perjuicio de lo anterior, los Usuarios que revistan el carácter de consumidores conforme a la Ley 24.240 conservan los derechos previstos en dicha norma, incluyendo el acceso al Servicio de Conciliación Previa en Relaciones de Consumo (COPREC) y a los tribunales de su domicilio real.' },
      ],
    },
    {
      id: 'conflictos',
      number: '17',
      title: 'Resolución de conflictos entre usuarios',
      content: [
        { type: 'p', text: 'LÓTUM podrá, a su exclusivo criterio y a modo de cortesía, ofrecer canales de mediación o conciliación entre Usuarios en conflicto, sin que ello implique reconocimiento de responsabilidad alguna ni obligación de resolver el conflicto. La decisión definitiva corresponderá a las partes y, en su defecto, a la autoridad judicial competente.' },
      ],
    },
    {
      id: 'disposiciones',
      number: '18',
      title: 'Disposiciones generales',
      content: [
        { type: 'h3', text: '18.1. Independencia de cláusulas' },
        { type: 'p', text: 'Si alguna cláusula de los presentes T&C fuera declarada nula, inválida o inejecutable, dicha circunstancia no afectará la validez del resto de las disposiciones, que continuarán en plena vigencia.' },
        { type: 'h3', text: '18.2. Tolerancia' },
        { type: 'p', text: 'La no exigencia por parte de LÓTUM del estricto cumplimiento de alguna disposición no se interpretará como renuncia al derecho de exigirlo en el futuro.' },
        { type: 'h3', text: '18.3. Cesión' },
        { type: 'p', text: 'LÓTUM podrá ceder los presentes T&C y la posición contractual a cualquier sociedad controlante, controlada, vinculada o sucesora, sin necesidad de consentimiento del Usuario. El Usuario no podrá ceder su posición contractual sin previa autorización escrita de LÓTUM.' },
        { type: 'h3', text: '18.4. Integridad del acuerdo' },
        { type: 'p', text: 'Los presentes T&C, junto con la Política de Privacidad, el Tarifario y demás documentos referenciados, constituyen el acuerdo íntegro entre las partes respecto del uso de la Plataforma, y reemplazan cualquier acuerdo, entendimiento o comunicación previa.' },
        { type: 'h3', text: '18.5. Idioma' },
        { type: 'p', text: 'El idioma oficial de los presentes T&C es el español. Cualquier traducción se realiza a título informativo, prevaleciendo la versión en castellano en caso de discrepancia.' },
      ],
    },
    {
      id: 'contacto',
      number: '19',
      title: 'Contacto',
      content: [
        { type: 'p', text: 'Para consultas, reclamos o ejercicio de derechos, los Usuarios podrán contactar a LÓTUM a través de:' },
        { type: 'ul', items: [
          'Correo electrónico: contacto@lotum.com.ar',
          'Formulario de contacto disponible en la Plataforma.',
          'WhatsApp: +54 9 223 583 4453',
          'Domicilio postal: Mar del Plata, Provincia de Buenos Aires.',
        ]},
      ],
    },
  ],
  annexes: [
    {
      id: 'anexo-1',
      title: 'Anexo I — Modelo contractual de operación',
      content: [
        { type: 'p', text: 'Las Operaciones celebradas a través de LÓTUM se instrumentan, en principio, conforme al modelo contractual denominado "Contrato de Inversión, Reciclado, Comercialización y Venta de Inmueble", que regula entre otros aspectos: identificación del inmueble; objeto; precio garantizado al Propietario; inversión del Inversor; plazos de obra y de venta; modalidad de venta; distribución del producido; ventas financiadas; otorgamiento de poder especial irrevocable; tenencia del inmueble; impuestos y gastos; responsabilidad laboral; prohibiciones al Propietario; reembolso de la inversión; cláusula penal del 30%; cesión o venta obligatoria; garantía real; autorización de comercialización; documentación dominial; y jurisdicción.' },
        { type: 'p', text: 'Dicho modelo es orientativo y deberá ser revisado, ajustado y suscripto por las partes con asesoramiento legal independiente. LÓTUM no es parte del mismo.' },
      ],
    },
    {
      id: 'anexo-2',
      title: 'Anexo II — Tarifario y medios de pago',
      content: [
        { type: 'p', text: 'Tarifario: a completar conforme política comercial (comisiones del 1,5% por parte al cierre, fees de éxito, cargos por servicios premium, costos de KYC, etc.).' },
        { type: 'p', text: 'Medios de Pago habilitados: tarjetas de crédito y débito; transferencias bancarias en pesos (ARS); transferencias en dólares estadounidenses (USD); criptoactivos (BTC, ETH, USDT, USDC, DAI y otros que se incorporen); efectivo en los supuestos autorizados; otros medios electrónicos que se habiliten oportunamente.' },
      ],
    },
    {
      id: 'anexo-3',
      title: 'Anexo III — Política de privacidad',
      content: [
        { type: 'p', text: 'A desarrollar como documento separado y referenciado, conforme Ley 25.326 y normativa AAIP. Próximamente disponible en lotum.com.ar/privacidad' },
      ],
    },
  ],
};

// =============================================================
//   COMPONENTES VISUALES
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

// Renderiza un bloque de contenido según su tipo
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
  return null;
}

// Botón "scroll arriba"
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
// =============================================================
export default function Terminos({ onGoBack, onGoToApp }) {
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
              <FileText size={13} /> Documento legal
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h1 style={{
              fontFamily: fontDisplay, fontWeight: 400, fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
              lineHeight: 1.05, letterSpacing: '-0.02em', color: C.paper,
              margin: 0, marginBottom: '1rem',
            }}>
              Términos y <em style={{ color: C.gold, fontStyle: 'italic' }}>Condiciones</em>
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p style={{
              color: C.paperSoft, fontSize: '1.05rem', lineHeight: 1.6,
              margin: '0 auto', maxWidth: 600,
            }}>
              Plataforma de inversión, reciclado, comercialización y venta de inmuebles.
            </p>
          </Reveal>
          <Reveal delay={260}>
            <div style={{
              display: 'inline-flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1.2rem',
              marginTop: '2rem', padding: '1rem 1.5rem',
              background: `${C.card}80`, border: `1px solid ${C.border}`,
              borderRadius: 14,
            }}>
              <MetaItem label="Versión" value={TYC_DATA.meta.version} />
              <MetaItem label="Actualizado" value={TYC_DATA.meta.updatedAt} />
              <MetaItem label="Jurisdicción" value="República Argentina" />
            </div>
          </Reveal>
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
              {TYC_DATA.meta.note}. Sujeto a revisión legal antes del lanzamiento oficial.
            </div>
          </Reveal>
        </div>
      </section>

      {/* Layout principal: índice lateral + contenido */}
      <section style={{ padding: '2rem 1.5rem 5rem', position: 'relative' }}>
        <div className="tyc-layout" style={{ maxWidth: 1100, margin: '0 auto' }}>
          {/* Índice (sticky en desktop) */}
          <aside className="tyc-index" style={{
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
              {TYC_DATA.sections.map((s) => (
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
            <hr style={{ border: 'none', borderTop: `1px solid ${C.border}`, margin: '1rem 0' }} />
            <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {TYC_DATA.annexes.map((a, i) => (
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
          </aside>

          {/* Contenido */}
          <article className="tyc-content" style={{
            background: `${C.card}60`,
            border: `1px solid ${C.border}`,
            borderRadius: 18, padding: 'clamp(1.5rem, 4vw, 3rem)',
          }}>
            {/* Preámbulo */}
            <Reveal>
              <div style={{ marginBottom: '2rem' }}>
                <div style={{
                  fontSize: '0.72rem', letterSpacing: '0.14em', textTransform: 'uppercase',
                  color: C.terracotta, fontWeight: 600, marginBottom: '0.8rem',
                }}>Preámbulo</div>
                {TYC_DATA.preamble.split('\n\n').map((para, i) => (
                  <p key={i} style={{
                    color: C.paperSoft, fontSize: '1rem', lineHeight: 1.75,
                    margin: '0 0 1.1rem',
                  }}>{para}</p>
                ))}
                <div style={{
                  marginTop: '1.5rem', padding: '1.1rem 1.3rem',
                  background: `${C.terracotta}12`, border: `1px solid ${C.terracotta}40`,
                  borderRadius: 12,
                }}>
                  <p style={{
                    color: C.paper, fontSize: '0.88rem', lineHeight: 1.6,
                    margin: 0, fontWeight: 500, letterSpacing: '0.01em',
                  }}>{TYC_DATA.acceptanceWarning}</p>
                </div>
              </div>
            </Reveal>

            {/* Secciones */}
            {TYC_DATA.sections.map((section) => (
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

            {/* Aceptación */}
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
                }}>Aceptación expresa</div>
                <p style={{
                  color: C.paper, fontSize: '0.95rem', lineHeight: 1.65,
                  margin: 0, fontWeight: 500,
                }}>
                  AL HACER CLIC EN "ACEPTO", AL CREAR UNA CUENTA, O AL UTILIZAR LA PLATAFORMA DE CUALQUIER MODO,
                  EL USUARIO DECLARA Y MANIFIESTA, BAJO JURAMENTO, HABER LEÍDO ÍNTEGRAMENTE, COMPRENDIDO Y ACEPTADO
                  SIN RESERVAS LOS PRESENTES TÉRMINOS Y CONDICIONES, ASÍ COMO LA POLÍTICA DE PRIVACIDAD Y DEMÁS
                  DOCUMENTOS COMPLEMENTARIOS, OTORGÁNDOLES EL CARÁCTER DE INSTRUMENTO PRIVADO EN LOS TÉRMINOS
                  DEL CÓDIGO CIVIL Y COMERCIAL DE LA NACIÓN.
                </p>
              </div>
            </Reveal>

            {/* Anexos */}
            <div style={{ marginTop: '4rem' }}>
              <h2 style={{
                fontFamily: fontDisplay, fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
                fontWeight: 500, color: C.paper, margin: '0 0 2rem',
                lineHeight: 1.2,
              }}>Anexos</h2>
              {TYC_DATA.annexes.map((annex) => (
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
            .tyc-layout {
              display: grid;
              grid-template-columns: 260px 1fr;
              gap: 2.5rem;
              align-items: start;
            }
            .tyc-index {
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
