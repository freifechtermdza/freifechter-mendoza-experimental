# Freifechter Mendoza — sitio web

Sitio estático (HTML/CSS/JS puro, sin frameworks) listo para publicar en **GitHub Pages**.

## Publicar en GitHub Pages

1. Creá un repositorio en GitHub (por ejemplo `freifechter-mendoza`).
2. Subí **todo el contenido de esta carpeta** (no la carpeta en sí, sino lo que está adentro: `index.html`, `assets/`, etc.) a la rama `main`.
3. En el repo: **Settings → Pages → Source** → elegí la rama `main` y la carpeta `/ (root)`.
4. En un par de minutos el sitio queda publicado en `https://tu-usuario.github.io/freifechter-mendoza/`.
5. Si más adelante comprás un dominio propio (por ejemplo `freifechtermendoza.com.ar`), se configura en la misma sección de **Pages** con un archivo `CNAME`.

## Qué tenés que reemplazar antes de publicar

- **Formulario de contacto** (`contacto.html`): el formulario usa [Formspree](https://formspree.io) (gratis) para recibir los mensajes por mail sin necesidad de un servidor propio. Creá una cuenta, generá un formulario y reemplazá `TU_ID_DE_FORMSPREE` en la línea `action="https://formspree.io/f/TU_ID_DE_FORMSPREE"` por el ID que te dan.
- **WhatsApp**: todavía no hay número cargado. Cuando lo tengas, se agrega un botón en `contacto.html`, `index.html` y en el pie de página de todas las páginas — avisame o hacelo vos agregando un link `<a href="https://wa.me/549XXXXXXXXXX">WhatsApp</a>` donde quieras que aparezca.
- **Fotos y videos**: en `galeria.html` (y en la sección de galería de `index.html`) hay bloques `.gallery-item` de marcador de posición. Para poner una foto real, reemplazá el contenido de un bloque por:
  ```html
  <div class="gallery-item reveal">
    <img src="assets/img/tu-foto.jpg" alt="Descripción de la foto">
  </div>
  ```
  Subí las fotos a `assets/img/`. Elegí las mejores 8 — mejor pocas y buenas que muchas mediocres.
- **Eventos**: agregá bloques `.event-card` en `eventos.html` a medida que tengas fechas confirmadas.
- **Fotos por disciplina** (`disciplinas.html`): cada arma tiene hoy un ícono dibujado; si conseguís fotos de entrenamiento de dussack, daga, bastón/pica o ringen, se pueden reemplazar por esas fotos apenas empiecen a dictarse regularmente.

## Ya cargado con datos reales

- Email: `hema.meyer.mza@gmail.com`
- Instagram: `@freifechtermendoza`
- Ubicación: mapa embebido + botón a Google Maps
- Cuota mensual: $42.000
- Horario: Martes, jueves y viernes de 18:00 a 20:00 — actualmente se dicta espada larga; el resto de las armas del corpus de Meyer (dussack, daga, bastón/pica, ringen) se suman progresivamente a medida que el club incorpora equipo.



## Identidad de marca

- **Paleta**: negro/tinta (`#0e0d0b`), dorado (`#b8862f` / `#d9b45c`) y rojo lacre (`#7a1620`). Están definidos como variables CSS al inicio de `assets/css/style.css` (`:root`).
- **Tipografías**: Cinzel (títulos) + EB Garamond (texto).
- **Logo**: `assets/img/logo.png` es tu logo final (calavera con laurel, libro abierto, espada y lemas en latín), con el fondo removido para que se integre en cualquier color de fondo. Se usa en el header, el pie de página y en Nosotros.
- **Ilustraciones de armas**: `espada-larga.png`, `dussack.png`, `daga.png`, `baston-pica.png`, `ringen.png` y `rapier.png` en `assets/img/` — se usan en la sección "¿Qué es HEMA?" del Inicio. Si querés usarlas también en `disciplinas.html` en vez de los íconos de línea dibujados, decime y las reemplazo ahí también.

## Estructura de archivos

```
index.html        → Inicio
nosotros.html      → Quiénes somos
disciplinas.html   → Espada larga, dussack y daga, ringen
horarios.html      → Horarios y aranceles
galeria.html       → Fotos y videos
eventos.html       → Seminarios y torneos
contacto.html      → Formulario de contacto / inscripción
assets/css/style.css → Sistema de diseño (colores, tipografía, componentes)
assets/js/main.js    → Menú móvil, header y animaciones al hacer scroll
assets/img/          → Emblema del club
```

## Probarlo en tu computadora

No necesitás instalar nada: abrí `index.html` con doble clic, o si querés ver las rutas exactamente como en producción, corré un servidor simple desde esta carpeta:

```bash
python3 -m http.server 8000
```

y visitá `http://localhost:8000`.
