# Senderos Group — Proyecto Final Front-End

Sitio web académico para una empresa de servicios y experiencias turísticas.

## Cómo abrir el proyecto
1. Descargá y descomprimí la carpeta.
2. Abrí `senderos_group_final` desde Visual Studio Code.
3. Abrí `index.html` en el navegador. Recomendado: usar la extensión **Live Server** de VS Code.
4. Navegá por las páginas desde el menú principal.

## Estructura
- `index.html`: página de inicio.
- `servicios.html`: descripción de servicios.
- `productos.html`: catálogo dinámico.
- `carrito.html`: selección de productos.
- `contacto.html`: formulario de contacto.
- `css/styles.css`: estilos y diseño responsive.
- `js/productos.js`: arreglo de objetos y renderizado del catálogo.
- `js/carrito.js`: operaciones del carrito.
- `js/contacto.js`: validación e interacción del formulario.
- `js/app.js`: funciones compartidas y menú responsive.
- `assets/`: imágenes SVG de reemplazo.

## Funcionalidades
- Navegación entre cinco páginas HTML.
- Diseño adaptable con CSS Grid, Flexbox y media queries.
- Catálogo generado dinámicamente desde un arreglo de objetos JavaScript.
- Buscador de productos.
- Eventos del DOM para agregar, quitar y modificar cantidades.
- Carrito persistente mediante `localStorage`.
- Formulario con validación HTML y respuesta mediante JavaScript.

## Importante
Los precios son ficticios y se utilizan únicamente para demostrar el funcionamiento del carrito en el trabajo académico. El formulario no envía información a un servidor: valida los campos y muestra un mensaje en pantalla.
