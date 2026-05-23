# Reviva — Guía de instalación y deploy

Esta es la app Reviva configurada como **PWA** (Progressive Web App), lista para subir a internet y que se pueda "instalar" desde el celular como cualquier app nativa.

---

## Qué contiene este paquete

```
reviva/
├── public/                  # Assets (iconos, favicon)
│   ├── favicon.svg
│   ├── apple-touch-icon.png
│   ├── pwa-192x192.png
│   ├── pwa-512x512.png
│   └── ...
├── src/                     # Código de la app
│   ├── App.jsx              # Componente principal (todas las pantallas)
│   ├── main.jsx             # Entrypoint
│   └── index.css            # Estilos globales
├── index.html               # HTML raíz
├── package.json             # Dependencias
├── vite.config.js           # Configuración + plugin PWA
└── README.md                # Este archivo
```

---

## Paso 1 — Probarlo localmente (5 minutos)

Si querés ver la app corriendo en tu computadora antes de subirla:

### Requisitos
Necesitás tener instalado **Node.js** (versión 18 o superior). Descargalo de [nodejs.org](https://nodejs.org). Es gratis, lleva 5 minutos instalarlo.

### Pasos
Abrí una terminal (en Mac: "Terminal", en Windows: "PowerShell" o "CMD") y ejecutá uno por uno estos comandos:

```bash
# 1. Entrar a la carpeta del proyecto
cd ruta/donde/descargaste/reviva

# 2. Instalar las dependencias (la primera vez tarda 1-2 minutos)
npm install

# 3. Levantar el servidor de desarrollo
npm run dev
```

La terminal te va a mostrar algo como:
```
  ➜  Local:   http://localhost:5173/
```

Abrí esa URL en tu navegador. Vas a ver Reviva funcionando.

**Para verlo en el celular** (mismo wifi):
1. La terminal también muestra una URL tipo `http://192.168.x.x:5173`
2. Abrí esa URL desde el navegador del celular
3. Ya lo ves en tu celular

---

## Paso 2 — Subirlo a internet (gratis, 20 minutos)

Para que tu Reviva tenga una URL pública y puedas instalarlo en cualquier celular, te recomiendo **Vercel**. Es gratis para arrancar y es lo más simple que existe.

### Opción A — Sin saber código (más fácil)

1. Andá a [vercel.com](https://vercel.com) y creá una cuenta (podés usar tu cuenta de Google o GitHub).
2. En el dashboard, hacé click en "Add New" → "Project".
3. Elegí "Import" → "Browse all templates" → no, mejor:
4. Necesitás subir tu código a **GitHub** primero. Andá a [github.com](https://github.com), creá cuenta gratis.
5. Creá un repositorio nuevo (botón verde "New"), llamalo `reviva`, dejalo público o privado, dale "Create".
6. En la página del repositorio vacío, hacé click en "uploading an existing file" y subí TODA la carpeta `reviva` (todos los archivos y subcarpetas).
7. Volvé a Vercel, hacé click en "Import" sobre tu repositorio `reviva`.
8. Vercel detecta automáticamente que es Vite + React, dale "Deploy".
9. En 1-2 minutos te da una URL pública tipo `reviva-tuusuario.vercel.app`.

### Opción B — Si te animás con la terminal (más rápido)

```bash
# Instalar Vercel CLI (solo la primera vez)
npm install -g vercel

# Desde la carpeta del proyecto
cd ruta/donde/descargaste/reviva
npm install
vercel
```

Te va a pedir login (con email o GitHub), después contestás "yes" a todo y te da la URL pública.

---

## Paso 3 — Instalarlo en tu celular (2 minutos)

Una vez que tenés la URL pública (ej: `reviva-lucas.vercel.app`):

### En iPhone (Safari)
1. Abrí la URL en **Safari** (no funciona en Chrome iOS por restricciones de Apple).
2. Tocá el botón de compartir (cuadrado con flecha hacia arriba, abajo en el centro).
3. Bajá y tocá **"Agregar a inicio"** / **"Add to Home Screen"**.
4. Aceptá. Te queda el ícono de Reviva en tu pantalla principal.
5. Cuando lo abrís desde el ícono, se abre en pantalla completa, sin barra del navegador. Indistinguible de una app nativa.

### En Android (Chrome)
1. Abrí la URL en Chrome.
2. Chrome te muestra automáticamente un cartel "Agregar Reviva a la pantalla principal".
3. Si no aparece, tocá los 3 puntos arriba a la derecha → **"Instalar app"** o **"Agregar a pantalla principal"**.
4. Aceptá. Listo.

---

## Paso 4 — Dominio propio (opcional, US$ 30/año)

Cuando quieras un dominio profesional tipo `reviva.com.ar` en lugar de `reviva-xxx.vercel.app`:

1. Comprá el dominio en [nic.ar](https://nic.ar) (para .com.ar, ~US$ 10/año) o [namecheap.com](https://namecheap.com) (para .com, ~US$ 12/año).
2. En el dashboard de Vercel del proyecto, andá a "Settings" → "Domains" → "Add".
3. Escribí tu dominio. Vercel te dice qué configuración DNS poner en tu proveedor del dominio.
4. Lo configurás (copiar-pegar), esperás 1-24 horas, y listo.

---

## Cómo modificar la app

Si querés cambiar textos, agregar propiedades, cambiar colores, etc:

- **Todo el código está en `src/App.jsx`**. Es un solo archivo grande pero organizado.
- Los colores están al principio en la constante `COLORS`.
- Las propiedades de ejemplo están en `MOCK_PROPERTIES` al principio del archivo.
- Cada pantalla es un componente: `Landing`, `Marketplace`, `PropertyDetail`, `Dashboard`, etc.

Si subiste el proyecto a GitHub y conectaste con Vercel, **cada vez que actualices un archivo en GitHub, Vercel automáticamente actualiza la app en vivo en 1-2 minutos**. Esto es muy poderoso: editás, guardás, y a los pocos minutos el cambio está en producción.

---

## Próximos pasos técnicos

Esta versión es el **frontend del prototipo**. Para que sea un producto real necesitás agregar:

1. **Backend con base de datos** — para que las propiedades publicadas se guarden de verdad. Recomendado: **Supabase** (gratis para empezar, incluye base de datos PostgreSQL + autenticación + storage de imágenes).

2. **Autenticación real** — registro y login de usuarios. Supabase ya lo trae.

3. **Storage de imágenes** — para que las fotos de propiedades se suban y guarden. Supabase Storage o Cloudflare R2.

4. **Notificaciones por email** — cuando alguien manifiesta interés, etc. Resend o SendGrid (planes gratis).

5. **Panel admin** — para que vos puedas ver matches, gestionar contratos, cobrar comisiones.

Cada uno de esos pasos es una iteración. Te conviene empezar con la PWA actual + Supabase como única dependencia, e ir agregando el resto a medida que tengas tracción.

---

## Ayuda

Si te traba algo en el proceso, escribime y vamos resolviendo paso a paso. Lo importante es que ya tenés todo lo necesario para que Reviva exista en tu celular con un ícono real.
