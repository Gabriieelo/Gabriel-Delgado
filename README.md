# Portfolio de Gabriel Delgado

Portfolio bilingüe (español/inglés) construido con React y Vite. El contenido está en `data/portfolio.json` y se incluye en la compilación para que también funcione en alojamientos estáticos como Vercel.

## Verlo en desarrollo

Requiere Node.js 20.19+ o 22.12+.

```bash
npm install
npm run dev
```

Abre la dirección que muestra Vite, normalmente `http://localhost:5173`. Al editar `data/portfolio.json`, recarga la página para ver el contenido nuevo.

## Producción local

```bash
npm run build
npm start
```

Abre `http://localhost:3001`. La variable `PORT` permite cambiar el puerto.

## Contenido

Edita `data/portfolio.json` para actualizar presentación, enlaces, habilidades, experiencia y proyectos. Los campos terminados en `En` son las versiones en inglés. Cada proyecto puede tener `title`, `description`, `descriptionEn`, `url` y `technologies` (lista de textos). `linkedin` se muestra solo cuando tiene un valor.

El contenido profesional inicial se preparó a partir de los CV proporcionados por Gabriel. Los proyectos permanecen pendientes hasta contar con detalles y enlaces verificables.
