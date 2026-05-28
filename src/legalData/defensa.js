// =======================================================================
//   LÓTUM — DEFENSA DEL CONSUMIDOR (datos)
// =======================================================================
const DEFENSA_DATA = {
  meta: {
    version: 'Versión 1.0',
    note: 'Documento de trabajo para revisión legal',
    updatedAt: '27 de noviembre de 2026',
    jurisdiction: 'Ley 24.240 — Argentina',
  },
  preamble: `La presente Política de Defensa del Consumidor (en adelante, la "Política") tiene por objeto informar a los Usuarios de la plataforma LÓTUM sobre sus derechos como consumidores y/o usuarios de servicios, los mecanismos de protección previstos por la normativa argentina, y los canales de atención, reclamo y resolución de conflictos disponibles.

LÓTUM se compromete a cumplir íntegramente con la normativa de defensa del consumidor vigente, a brindar información clara, veraz, completa, gratuita y oportuna, y a respetar el trato digno, equitativo y no discriminatorio que la Constitución Nacional y la ley garantizan a los consumidores.

El responsable es LUCAS ANDRADE (responsable provisorio en proceso de constitución de Lótum S.R.L.), CUIT en trámite, con domicilio legal en Mar del Plata, Provincia de Buenos Aires, República Argentina. Correo de atención al consumidor: contacto@lotum.com.ar. WhatsApp: +54 9 223 583 4453.`,
  preambleTitle: 'Objeto y alcance',
  sections: [
    {
      id: 'marco-legal',
      number: '1',
      title: 'Marco legal aplicable',
      content: [
        { type: 'p', text: 'Esta Política se rige por la siguiente normativa, sin perjuicio de otras disposiciones aplicables:' },
        { type: 'ul', items: [
          'Artículo 42 de la Constitución Nacional.',
          'Ley N° 24.240 de Defensa del Consumidor y sus modificatorias (especialmente Ley N° 26.361).',
          'Decreto Reglamentario N° 1798/1994.',
          'Código Civil y Comercial de la Nación (artículos 1092 a 1122 — contratos de consumo).',
          'Ley N° 26.993 — Sistema de Resolución de Conflictos en las Relaciones de Consumo (COPREC).',
          'Resolución N° 1/2020 de la Secretaría de Comercio Interior (Servicio de Conciliación Previa en Relaciones de Consumo).',
          'Resolución N° 271/2023 SCT (Botón de Arrepentimiento y Botón de Baja).',
          'Resolución N° 139/2020 SCT (Información en operaciones a distancia y por medios electrónicos).',
          'Ley N° 25.065 — Tarjetas de Crédito (en lo aplicable).',
          'Ley N° 26.951 — Registro "No Llame".',
          'Disposiciones de la Dirección Nacional de Defensa del Consumidor y autoridades locales.',
        ]},
      ],
    },
    {
      id: 'concepto-consumidor',
      number: '2',
      title: 'Concepto de consumidor y relación de consumo',
      content: [
        { type: 'p', text: 'A los efectos de la Ley 24.240, se considera consumidor a la persona humana o jurídica que adquiere o utiliza, en forma gratuita u onerosa, bienes o servicios como destinatario final, en beneficio propio o de su grupo familiar o social.' },
        { type: 'p', text: 'La relación de consumo se configura cuando el Usuario contrata los Servicios de LÓTUM como destinatario final, sin propósito de reventa o integración en una cadena productiva.' },
        { type: 'highlight', text: 'Importante: los vínculos celebrados entre Propietarios e Inversores en el marco de Operaciones de inversión inmobiliaria pueden NO constituir relaciones de consumo, dado que típicamente involucran actividad económica con ánimo de lucro. La calificación dependerá de cada caso concreto. LÓTUM informa esta circunstancia con fines de transparencia, sin perjuicio de los derechos que la ley reconozca a quienes efectivamente revistan calidad de consumidores.' },
      ],
    },
    {
      id: 'derechos-consumidor',
      number: '3',
      title: 'Derechos del consumidor',
      content: [
        { type: 'p', text: 'LÓTUM reconoce y respeta los siguientes derechos esenciales del consumidor, en los términos del artículo 42 de la Constitución Nacional y de la Ley 24.240:' },
        { type: 'h3', text: '3.1. Derecho a la información' },
        { type: 'p', text: 'El consumidor tiene derecho a recibir información cierta, clara, detallada, eficaz y suficiente sobre las características esenciales del servicio, su precio total, condiciones de comercialización, formas de pago, plazos y demás circunstancias relevantes, en forma previa al perfeccionamiento del contrato.' },
        { type: 'h3', text: '3.2. Derecho a la protección de la salud, seguridad e intereses económicos' },
        { type: 'p', text: 'Los servicios prestados a través de la Plataforma no deben presentar riesgo alguno para la salud o integridad del consumidor, debiendo prestarse en condiciones que protejan sus intereses económicos.' },
        { type: 'h3', text: '3.3. Derecho a un trato digno, equitativo y no discriminatorio' },
        { type: 'p', text: 'LÓTUM se compromete a brindar a todo consumidor un trato respetuoso, sin discriminación por razones de raza, género, edad, religión, orientación sexual, nacionalidad, condición social, discapacidad o cualquier otra circunstancia.' },
        { type: 'h3', text: '3.4. Derecho a la libertad de elección' },
        { type: 'p', text: 'El consumidor podrá elegir libremente, sin coacción, los servicios que mejor se ajusten a sus necesidades, contando con información suficiente para comparar alternativas.' },
        { type: 'h3', text: '3.5. Derecho a la educación para el consumo' },
        { type: 'p', text: 'LÓTUM provee información orientativa sobre el funcionamiento de las inversiones inmobiliarias y los procesos de reciclado, sin perjuicio de que el consumidor pueda acceder a asesoramiento profesional independiente.' },
        { type: 'h3', text: '3.6. Derecho a condiciones de trato equitativo y digno (Art. 8 bis Ley 24.240)' },
        { type: 'p', text: 'Queda prohibido todo trato vejatorio, vergonzante o intimidatorio. LÓTUM capacita a su personal de atención al consumidor para garantizar este derecho.' },
      ],
    },
    {
      id: 'informacion-previa',
      number: '4',
      title: 'Información previa al contrato',
      content: [
        { type: 'p', text: 'Antes de utilizar los Servicios, LÓTUM pone a disposición del consumidor, de manera clara y accesible, la siguiente información, conforme a las Resoluciones SCT 139/2020 y 271/2023:' },
        { type: 'ul', items: [
          'Identificación completa de LÓTUM (razón social, CUIT, domicilio legal, datos de contacto).',
          'Descripción detallada de los Servicios ofrecidos.',
          'Precio total de los Servicios, incluyendo impuestos, tasas y cargos adicionales.',
          'Modalidades, formas y medios de pago aceptados.',
          'Plazos de prestación y entrega.',
          'Existencia y alcance de garantías.',
          'Derecho de revocación o arrepentimiento, cuando corresponda.',
          'Canales de atención al consumidor.',
          'Identidad del proveedor de los procesadores de pago.',
          'Modalidades de presentación de reclamos y plazos de respuesta.',
        ]},
      ],
    },
    {
      id: 'arrepentimiento',
      number: '5',
      title: 'Derecho de revocación (botón de arrepentimiento)',
      content: [
        { type: 'h3', text: '5.1. Plazo y alcance' },
        { type: 'p', text: 'Conforme al artículo 34 de la Ley 24.240, el consumidor que contrate servicios por medios electrónicos o a distancia tiene derecho a revocar la aceptación durante el plazo de DIEZ (10) días corridos contados a partir de la fecha de celebración del contrato o de la prestación del servicio, lo que ocurra después, sin necesidad de invocar causa alguna y sin penalidad.' },
        { type: 'h3', text: '5.2. Forma de ejercicio — Botón de Arrepentimiento' },
        { type: 'p', text: 'LÓTUM pone a disposición un "Botón de Arrepentimiento" visible y de fácil acceso desde la página principal de la Plataforma, conforme a la Resolución 271/2023 SCT, que permite al consumidor ejercer este derecho de manera ágil, gratuita y sin obstáculos.' },
        { type: 'p', text: 'También podrá ejercerse mediante:' },
        { type: 'ul', items: [
          'Correo electrónico a contacto@lotum.com.ar.',
          'Comunicación escrita al domicilio legal de LÓTUM.',
          'Formulario web disponible en la Plataforma.',
        ]},
        { type: 'h3', text: '5.3. Efectos de la revocación' },
        { type: 'p', text: 'Recibida la revocación dentro del plazo legal, LÓTUM reintegrará al consumidor las sumas abonadas, sin retenciones, en un plazo razonable y por el mismo medio de pago utilizado, cuando ello sea posible. Los gastos directos de devolución serán a cargo de LÓTUM.' },
        { type: 'h3', text: '5.4. Excepciones' },
        { type: 'p', text: 'El derecho de revocación no se aplica, entre otros supuestos previstos por ley, a: (i) servicios cuya prestación haya comenzado con el consentimiento expreso del consumidor antes del vencimiento del plazo; (ii) servicios cuyo precio dependa de fluctuaciones del mercado financiero ajenas al proveedor; (iii) servicios personalizados o confeccionados conforme a las especificaciones del consumidor.' },
      ],
    },
    {
      id: 'boton-baja',
      number: '6',
      title: 'Botón de baja',
      content: [
        { type: 'p', text: 'Conforme a la Resolución 271/2023 SCT, LÓTUM pone a disposición del consumidor un "Botón de Baja" visible y accesible desde la página principal de la Plataforma, que permite solicitar la cancelación, rescisión o baja del Servicio contratado, sin trámites complejos.' },
        { type: 'p', text: 'La solicitud de baja se procesará de manera inmediata. LÓTUM enviará un comprobante por correo electrónico dentro de las SETENTA Y DOS (72) horas, indicando el código de baja, fecha de efectividad y demás datos relevantes.' },
      ],
    },
    {
      id: 'contratos-consumo',
      number: '7',
      title: 'Características de los contratos de consumo',
      content: [
        { type: 'h3', text: '7.1. Lengua y claridad' },
        { type: 'p', text: 'Los contratos están redactados en idioma español, en forma clara, completa y fácilmente legible. LÓTUM evita el uso de términos ambiguos o tecnicismos que dificulten la comprensión.' },
        { type: 'h3', text: '7.2. Cláusulas abusivas' },
        { type: 'p', text: 'Conforme al artículo 37 de la Ley 24.240, se tendrán por no convenidas:' },
        { type: 'ul', items: [
          'Las cláusulas que desnaturalicen las obligaciones o limiten la responsabilidad de LÓTUM por daños.',
          'Las cláusulas que importen renuncia o restricción de los derechos del consumidor o amplíen los derechos de LÓTUM.',
          'Las cláusulas que contengan cualquier precepto que imponga la inversión de la carga de la prueba en perjuicio del consumidor.',
        ]},
        { type: 'p', text: 'La interpretación de los contratos se hará siempre en el sentido más favorable al consumidor (principio in dubio pro consumidor).' },
        { type: 'h3', text: '7.3. Acceso a los contratos' },
        { type: 'p', text: 'El consumidor podrá acceder, descargar e imprimir en cualquier momento copia de los Términos y Condiciones, la Política de Privacidad y la presente Política, desde la Plataforma.' },
      ],
    },
    {
      id: 'precio-pagos',
      number: '8',
      title: 'Precio, formas de pago y comprobantes',
      content: [
        { type: 'p', text: 'LÓTUM informa al consumidor de manera clara y previa al contrato:' },
        { type: 'ul', items: [
          'El precio total final del Servicio, en pesos argentinos (ARS), incluyendo todos los impuestos, tasas y cargos.',
          'Cuando el precio se exprese en moneda extranjera (USD) o criptoactivos, se indicará la cotización de referencia utilizada y el método de conversión.',
          'Las formas de pago aceptadas conforme la cláusula 7 de los Términos y Condiciones (tarjetas, transferencias, USD, criptoactivos, etc.).',
          'La existencia o no de recargos por financiación, cuotas o por la utilización de determinados medios de pago.',
          'La emisión de factura electrónica conforme a la normativa AFIP, que será enviada al correo electrónico registrado por el consumidor.',
        ]},
      ],
    },
    {
      id: 'canales-atencion',
      number: '9',
      title: 'Canales de atención al consumidor',
      content: [
        { type: 'p', text: 'LÓTUM dispone de los siguientes canales gratuitos de atención al consumidor:' },
        { type: 'table',
          headers: ['Canal', 'Datos de contacto'],
          rows: [
            ['Correo electrónico', 'contacto@lotum.com.ar'],
            ['WhatsApp', '+54 9 223 583 4453'],
            ['Formulario web', 'Disponible en la Plataforma, sección "Atención al Consumidor"'],
            ['Domicilio postal', 'Mar del Plata, Provincia de Buenos Aires'],
            ['Botón de Arrepentimiento', 'Acceso directo en la página principal'],
            ['Botón de Baja', 'Acceso directo en la página principal'],
          ],
        },
      ],
    },
    {
      id: 'reclamo-interno',
      number: '10',
      title: 'Procedimiento interno de reclamo',
      content: [
        { type: 'h3', text: '10.1. Presentación del reclamo' },
        { type: 'p', text: 'El consumidor podrá presentar su reclamo por cualquiera de los canales indicados en la cláusula anterior, debiendo proveer la siguiente información mínima:' },
        { type: 'ul', items: [
          'Nombre completo y datos de contacto.',
          'Número de Cuenta o identificación dentro de la Plataforma.',
          'Descripción clara del hecho que motiva el reclamo.',
          'Documentación o capturas de pantalla que respalden el reclamo, cuando estén disponibles.',
          'Pretensión concreta del consumidor.',
        ]},
        { type: 'h3', text: '10.2. Constancia y número de reclamo' },
        { type: 'p', text: 'Recibido el reclamo, LÓTUM emitirá automáticamente una constancia con un número único de seguimiento, que será enviada al correo electrónico del consumidor dentro de las VEINTICUATRO (24) horas hábiles.' },
        { type: 'h3', text: '10.3. Plazo de respuesta' },
        { type: 'p', text: 'LÓTUM se compromete a responder los reclamos dentro de un plazo máximo de DIEZ (10) días hábiles desde su recepción, sin perjuicio de los plazos legales específicos que pudieran resultar aplicables (por ejemplo, los previstos por la Ley 25.065 para tarjetas de crédito).' },
        { type: 'h3', text: '10.4. Escalamiento' },
        { type: 'p', text: 'Si el consumidor no quedara conforme con la respuesta brindada, podrá: (i) solicitar la revisión del reclamo a un responsable superior dentro de LÓTUM; (ii) acudir a las instancias previstas en la siguiente cláusula.' },
      ],
    },
    {
      id: 'instancias-externas',
      number: '11',
      title: 'Instancias externas de resolución de conflictos',
      content: [
        { type: 'p', text: 'Si el consumidor no obtuviere una respuesta satisfactoria a su reclamo interno, podrá recurrir a las siguientes instancias:' },
        { type: 'h3', text: '11.1. Ventanilla Única Federal de Defensa del Consumidor' },
        { type: 'p', text: 'Permite presentar denuncias o reclamos en línea contra proveedores de bienes y servicios. Sitio web: argentina.gob.ar/produccion/defensadelconsumidor.' },
        { type: 'h3', text: '11.2. Servicio de Conciliación Previa en las Relaciones de Consumo (COPREC)' },
        { type: 'p', text: 'Conforme a la Ley 26.993, antes de iniciar acciones judiciales, el consumidor puede ingresar un reclamo gratuito ante el COPREC. La audiencia de conciliación se celebra ante un conciliador habilitado, en un plazo no superior a DIEZ (10) días hábiles. Sitio web: argentina.gob.ar/produccion/defensadelconsumidor/coprec.' },
        { type: 'h3', text: '11.3. Direcciones provinciales y municipales de Defensa del Consumidor' },
        { type: 'p', text: 'Cada provincia y, en muchos casos, cada municipio cuenta con una oficina de defensa del consumidor en la que el consumidor puede presentar denuncias. La presentación es gratuita y no requiere patrocinio letrado.' },
        { type: 'h3', text: '11.4. Auditoría en las Relaciones de Consumo' },
        { type: 'p', text: 'Para conflictos de menor cuantía, podrá recurrirse al procedimiento administrativo previsto por la Ley 26.993.' },
        { type: 'h3', text: '11.5. Justicia Nacional o Provincial en las Relaciones de Consumo' },
        { type: 'p', text: 'El consumidor podrá iniciar acciones judiciales ante los tribunales competentes. Conforme al artículo 36 de la Ley 24.240, el consumidor puede demandar ante el juez del lugar del consumo o del uso, el del lugar de celebración del contrato, el del domicilio del consumidor, o el del domicilio del demandado, a su elección.' },
      ],
    },
    {
      id: 'gratuidad',
      number: '12',
      title: 'Beneficio de gratuidad',
      content: [
        { type: 'p', text: 'Conforme al artículo 53 de la Ley 24.240, las actuaciones judiciales iniciadas por los consumidores en defensa de sus intereses gozan del beneficio de justicia gratuita (que comprende tasa de justicia, sellados y demás contribuciones). La parte demandada (LÓTUM) podrá acreditar la solvencia del consumidor para enervar este beneficio en los términos previstos por la jurisprudencia.' },
      ],
    },
    {
      id: 'dano-directo',
      number: '13',
      title: 'Daño directo',
      content: [
        { type: 'p', text: 'Conforme al artículo 40 bis de la Ley 24.240, la autoridad de aplicación podrá determinar la existencia de daño directo al consumidor y ordenar el resarcimiento correspondiente, sin perjuicio de las acciones judiciales que pudieran corresponder.' },
      ],
    },
    {
      id: 'sanciones',
      number: '14',
      title: 'Sanciones administrativas',
      content: [
        { type: 'p', text: 'LÓTUM informa que el incumplimiento de las normas de defensa del consumidor puede dar lugar a las siguientes sanciones administrativas, conforme al artículo 47 de la Ley 24.240: apercibimiento, multa, decomiso, clausura del establecimiento, suspensión en registros de proveedores del Estado y pérdida de concesiones o privilegios. LÓTUM declara su voluntad de cumplir íntegramente con la normativa para evitar tales sanciones y, sobre todo, para proteger a sus consumidores.' },
      ],
    },
    {
      id: 'publicidad-ofertas',
      number: '15',
      title: 'Publicidad y ofertas',
      content: [
        { type: 'p', text: 'Conforme al artículo 7 de la Ley 24.240, los términos de la oferta publicitaria obligan a LÓTUM y se consideran incluidos en el contrato con el consumidor.' },
        { type: 'p', text: 'LÓTUM se compromete a:' },
        { type: 'ul', items: [
          'Realizar publicidad veraz, no engañosa, no abusiva.',
          'Cumplir con todas las promociones, descuentos y ofertas anunciadas.',
          'Indicar de manera clara las condiciones, vigencia y limitaciones de cada oferta.',
          'Respetar la Ley 22.802 de Lealtad Comercial.',
        ]},
      ],
    },
    {
      id: 'medios-electronicos',
      number: '16',
      title: 'Contratación por medios electrónicos',
      content: [
        { type: 'p', text: 'Conforme a los artículos 1104 a 1116 del Código Civil y Comercial y la Resolución 139/2020 SCT, LÓTUM informa que la contratación se realiza por medios electrónicos. El consumidor:' },
        { type: 'ul', items: [
          'Recibe información clara sobre los pasos a seguir para celebrar el contrato.',
          'Puede identificar y corregir errores antes de confirmar la operación.',
          'Recibe confirmación inmediata de la operación celebrada, por correo electrónico.',
          'Puede acceder, descargar e imprimir el contrato en cualquier momento.',
          'Conserva el derecho de revocación previsto en la cláusula 5 de la presente Política.',
        ]},
      ],
    },
    {
      id: 'hipervulnerables',
      number: '17',
      title: 'Consumidores hipervulnerables',
      content: [
        { type: 'p', text: 'Conforme a la Resolución 139/2020 SCT y demás normativa aplicable, se consideran consumidores hipervulnerables las personas humanas que, por razón de su edad, género, estado físico o mental, o por circunstancias sociales, económicas, étnicas y/o culturales, se encuentren en situación de especial vulnerabilidad.' },
        { type: 'p', text: 'LÓTUM brinda un trato preferente a los consumidores hipervulnerables, ofreciendo: (i) atención prioritaria; (ii) información reforzada y simplificada; (iii) canales accesibles para consultas y reclamos; (iv) personal capacitado para asistirlos.' },
      ],
    },
    {
      id: 'relacion-privacidad',
      number: '18',
      title: 'Relación con la política de privacidad',
      content: [
        { type: 'p', text: 'Los derechos del consumidor en materia de protección de sus datos personales se rigen por la Política de Privacidad de LÓTUM y por la Ley 25.326 de Protección de Datos Personales. Sin perjuicio de ello, el consumidor tiene derecho a la confidencialidad y al uso adecuado de su información personal en el marco de la relación de consumo.' },
      ],
    },
    {
      id: 'trato-digno',
      number: '19',
      title: 'Normas internas de trato digno',
      content: [
        { type: 'p', text: 'LÓTUM ha adoptado un Código Interno de Trato Digno al Consumidor, de cumplimiento obligatorio para todo su personal y proveedores, que establece, entre otros principios:' },
        { type: 'ul', items: [
          'Saludar al consumidor con respeto y cordialidad.',
          'Escuchar activamente al consumidor sin interrumpirlo.',
          'No utilizar lenguaje técnico, ambiguo o intimidatorio.',
          'Brindar respuestas concretas y verificables.',
          'No realizar prácticas de cobranza abusivas, vejatorias o intimidatorias.',
          'No discriminar por ningún motivo.',
          'Capacitar periódicamente al personal en materia de defensa del consumidor.',
        ]},
      ],
    },
    {
      id: 'modificaciones',
      number: '20',
      title: 'Modificaciones a la política',
      content: [
        { type: 'p', text: 'LÓTUM podrá actualizar la presente Política para adaptarla a cambios normativos u operativos. Las modificaciones serán notificadas con un preaviso mínimo de DIEZ (10) días corridos a través de la Plataforma y/o por correo electrónico. En ningún caso las modificaciones podrán afectar derechos adquiridos del consumidor, ni desmejorar las condiciones de servicios ya contratados.' },
      ],
    },
    {
      id: 'prelacion',
      number: '21',
      title: 'Prelación normativa y orden público',
      content: [
        { type: 'p', text: 'Los derechos reconocidos a los consumidores por la Ley 24.240 y demás normativa de orden público de protección al consumidor prevalecen sobre cualquier disposición de los Términos y Condiciones o de cualquier otro documento contractual que pueda resultarles contraria. En caso de conflicto, se aplicará la disposición más favorable al consumidor.' },
      ],
    },
    {
      id: 'jurisdiccion',
      number: '22',
      title: 'Jurisdicción',
      content: [
        { type: 'p', text: 'Sin perjuicio de las disposiciones generales de los Términos y Condiciones, los Usuarios que revistan calidad de consumidores podrán optar, conforme al artículo 36 in fine de la Ley 24.240, por el tribunal correspondiente al:' },
        { type: 'ul', items: [
          'Lugar del consumo o uso del servicio.',
          'Lugar de celebración del contrato.',
          'Domicilio real del consumidor.',
          'Domicilio del demandado.',
        ]},
      ],
    },
    {
      id: 'contacto',
      number: '23',
      title: 'Contacto de atención al consumidor',
      content: [
        { type: 'p', text: 'Para consultas, reclamos o cualquier gestión vinculada a la presente Política, el consumidor podrá contactarse a través de:' },
        { type: 'ul', items: [
          'Correo electrónico: contacto@lotum.com.ar',
          'WhatsApp: +54 9 223 583 4453',
          'Formulario web disponible en la Plataforma.',
          'Domicilio postal: Mar del Plata, Provincia de Buenos Aires.',
        ]},
      ],
    },
  ],
  closingBox: {
    title: 'Declaración final',
    text: 'LÓTUM DECLARA SU FIRME COMPROMISO CON LOS DERECHOS DE LOS CONSUMIDORES Y USUARIOS, CON EL CUMPLIMIENTO INTEGRAL DE LA LEY 24.240 Y SUS MODIFICATORIAS, Y CON LA BÚSQUEDA PERMANENTE DE LA EXCELENCIA EN LA ATENCIÓN Y EN LA CALIDAD DE LOS SERVICIOS PRESTADOS A TRAVÉS DE LA PLATAFORMA.',
  },
};

export default DEFENSA_DATA;
