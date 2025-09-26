Bob’s Corn – Frontend (Vite + React + TypeScript + Material UI + Framer Motion)

Interfaz futurista / neon-glass para el reto Bob’s Corn.
Los clientes pueden comprar 🌽 con un solo clic y el sistema muestra el rate-limit (1 compra por minuto) de forma clara y animada.

Backend: Express en /api (se configura vía VITE_API_URL).
Este README cubre solo el frontend.

✨ Características

Stack: Vite + React + TypeScript, Material UI, Framer Motion.

UI Futurista: glassmorphism, bordes neon, fondo con grid animado y partículas 🌽.

Pantallas:

Home: héroe, tarjetas de acción (Comprar / Inventario), logros.

Comprar: botón central, HUD de cooldown (anillo) y feedback con snackbars.

Inventario / Historial: stubs listos para extender.

Accesibilidad: foco visual, ButtonBase/CardActionArea correctos, labels e iconos accesibles.

DX: Vite dev server, proxy a /api en desarrollo, tipado estricto TS.

Listo para prod: variables de entorno, build optimizado, guía de despliegue (Vercel).

📁 Estructura de carpetas
client/
├─ public/
│  └─ favicon.svg
├─ src/
│  ├─ api.ts
│  ├─ App.tsx
│  ├─ main.tsx
│  ├─ components/
│  │  ├─ BottomNav.tsx                 # nav inferior neon/glass
│  │  ├─ NeonStatCard.tsx              # tarjeta clickable con borde gradiente
│  │  └─ FuturaBackground.tsx          # fondo con grid + maíces animados
│  └─ pages/
│     ├─ Home.tsx
│     ├─ Buy.tsx
│     ├─ Inventory.tsx
│     └─ History.tsx
├─ index.html
├─ tsconfig.json
├─ vite.config.ts
└─ package.json

⚙️ Requisitos

Node.js >= 18 (recomendado 20.x)

npm o pnpm o yarn (ejemplos con npm)

🚀 Inicio rápido (desarrollo)
cd client
npm install
npm run dev


Abre: http://localhost:5173

El frontend usa proxy a /api (configurado en vite.config.ts).
En dev, asegúrate que el backend (Express) corre en http://localhost:3001.

🧪 Scripts disponibles
npm run dev       # servidor de desarrollo (Vite)
npm run build     # build de producción (dist/)
npm run preview   # sirve el build localmente
npm run lint      # (si agregas ESLint) revisar código

🔌 Configuración de API y Entornos
src/api.ts
const API_BASE =
  import.meta.env.PROD
    ? (import.meta.env.VITE_API_URL ?? "/api") // prod
    : "/api";                                  // dev (proxy vite)

Desarrollo

No necesitas .env (usa /api y Vite proxeará al backend local).

Producción

Crea una variable de entorno en tu plataforma de hosting:

VITE_API_URL=https://tu-backend-publico.com/api


Si sirves frontend y backend bajo el mismo dominio detrás de Nginx, puedes mantener /api.

🧱 Diseño & componentes clave
Fondo futurista

FuturaBackground.tsx añade:

Grid animado con ::before.

Vignette y radiales de color (teal/yellow/blue).

Partículas de maíz flotando con keyframes y blur sutil.

Está colocado a nivel de la app (o por pantalla) como position: fixed; inset: 0; pointer-events: none;.

Tarjeta neon clickable

NeonStatCard.tsx usa ButtonBase como contenedor clickable completo y un borde gradiente ::before sin padding (no corta el área de click).
Contenido dentro de un Card con glassmorphism y hover glow.

Navegación inferior

BottomNav.tsx: Paper translúcido con blur, marco gradiente ::before, y pill glow bajo el tab activo.

Comprar (rate-limit UX)

Buy.tsx:

Botón central con borde degradado.

Cooldown optimista tras 200 OK (bloquea botón y muestra anillo al instante).

HUD superior derecho con CircularProgress y segundos restantes.

Mensajería animada (success / cooldown / hint) con framer-motion.

🧠 Lógica de negocio (frontend)

Identidad de cliente: se genera un clientId con crypto.randomUUID() y se guarda en localStorage. Se envía como header x-client-id en /api/buy.

Cooldown:

Si el server responde 200, iniciamos cooldown optimista (COOLDOWN_SECONDS = 60).

Si responde 429, usamos Retry-After (header) o retryAfterSeconds del JSON.

El anillo muestra progreso determinista ((total - seconds) / total).

Asegúrate que COOLDOWN_SECONDS en el frontend coincide con la ventana del backend (60s).

🎨 Theming & estilo

MUI theme con primario #F7BF29 + acento teal (#62FFDA en glows).

Tipografía: Inter / SF Pro / system-ui.

Efectos:

glassmorphism: bgcolor: rgba(255,255,255,.04) + backdropFilter: blur(10-12px).

borde neon: ::before con background: linear-gradient(...) y máscara content-box/xor para crear el marco sin afectar layout.

glows: filter: drop-shadow(...) y box-shadow suaves.

🛡️ Accesibilidad

Áreas de click completas con ButtonBase y focusRipple.

Iconos con significado + aria-label en botones clave.

Contraste legible en modo oscuro (texto principal ~rgba(255,255,255,.92)).

Typography con noWrap/line-clamp para evitar overflows.

📦 Build de producción
cd client
npm run build     # genera dist/
npm run preview   # test local del build


Archivos estáticos listos para servir por Nginx/Vercel/Cloudflare Pages, etc.

🌍 Despliegue (Vercel)

Conecta tu repo y selecciona la carpeta client/.

Framework: Vite.

Build Command: npm run build

Output Directory: dist

Variables:

VITE_API_URL=https://tu-backend.onrender.com/api

Deploy y prueba.

Si usas un dominio propio para backend y frontend bajo el mismo host, puedes usar /api sin VITE_API_URL.

🔗 Contrato de API (consumido por el frontend)
POST /api/buy

Headers

x-client-id: string (obligatorio para rate-limit por cliente)

Respuesta 200

{
  "ok": true,
  "message": "¡Compra exitosa! 🌽",
  "boughtAt": 1732659300000
}


Respuesta 429
Headers:

Retry-After: <segundos>


Body:

{
  "ok": false,
  "message": "429 Too Many Requests...",
  "retryAfterSeconds": 42,
  "nextAllowedAt": 1732659360000
}

🧰 Troubleshooting

El botón requiere dos clics para bloquearse
→ Ya está resuelto con cooldown optimista tras 200 OK. Ver Buy.tsx.

El card clickable se “corta”
→ Usa NeonStatCard con ButtonBase y borde ::before sin padding (incluido).

CORS en dev
→ vite.config.ts proxya /api a http://localhost:3001. Mantén el backend corriendo.

Producción no llama al backend correcto
→ Revisa VITE_API_URL en variables de entorno del host (Vercel/Netlify/etc).

Fondo consume GPU
→ Reduce PIECES en FuturaBackground.tsx (cantidad de partículas) o baja opacidades.

🧩 Personalizaciones rápidas

Cambiar paleta: ajusta createTheme en App.tsx.

Menú inferior: añade tabs nuevos en BottomNav.tsx (Inventario/Historial).

Persistir inventario: guarda compras en localStorage o solicita un endpoint /api/me/inventory.

Iconografía: sustituye el emoji 🌽 por SVG monocromo con glow para 100% consistencia.

✅ Checklist antes de producción

 VITE_API_URL apuntando al backend real.

 Node 20.x en CI/host.

 Lighthouse: contraste/perform.

 En backend, considera Redis para rate-limit distribuido si escalas a varias instancias.

📜 Licencia

Uso educativo / de prueba para el reto “Bob’s Corn”. Ajusta a tu licencia preferida si lo publicarás.