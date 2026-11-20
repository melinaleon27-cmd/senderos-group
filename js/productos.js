// Catálogo: los productos se almacenan en un arreglo de objetos.
const productos = [
  { id: 1, nombre: "Traslado aeropuerto", categoria: "Traslados", descripcion: "Servicio de traslado coordinado desde o hacia el aeropuerto.", precio: 45000, imagen: "assets/Auto 1.webp" },
  { id: 2, nombre: "Traslado privado", categoria: "Traslados", descripcion: "Movilidad privada para recorrer tu destino con comodidad.", precio: 60000, imagen: "assets/minivan 1.webp" },
  { id: 3, nombre: "Visita a Bodega Bouza", categoria: "Enoturismo", descripcion: "Una propuesta para conocer una bodega y descubrir su identidad.", precio: 50000, imagen: "assets/bodega Bouza.jpg" },
  { id: 4, nombre: "Visita a Bodega Pizzorno", categoria: "Enoturismo", descripcion: "Un recorrido para disfrutar sabores y productos regionales.", precio: 40000, imagen: "assets/bodega pizzorno.jpg" },  
  { id: 5, nombre: "Cena Show Primuseum", categoria: "Cena Show", descripcion: "Consultá por un recorrido que combine distintas bodegas.", precio: 105000, imagen: "assets/primuseum.jpg" },
  { id: 6, nombre: "Cena Show Milongon", categoria: "Cena Show", descripcion: "Contanos qué te gustaría conocer y armamos una propuesta.", precio: 85000, imagen: "assets/milongon.jpg" }
];

const formatoPrecio = (valor) => new Intl.NumberFormat("es-AR", {
  style: "currency", currency: "ARS", maximumFractionDigits: 0
}).format(valor);

function obtenerCarrito() {
  return JSON.parse(localStorage.getItem("senderosCarrito")) || [];
}

function guardarCarrito(carrito) {
  localStorage.setItem("senderosCarrito", JSON.stringify(carrito));
}

function renderizarProductos(lista) {
  const contenedor = document.querySelector("#product-list");
  const mensajeVacio = document.querySelector("#empty-search");
  if (!contenedor) return;

  contenedor.innerHTML = lista.map(producto => `
    <article class="product-card">
      <img src="${producto.imagen}" alt="${producto.nombre}" class="product-image">
      <div class="product-info">
        <p class="eyebrow">${producto.categoria}</p>
        <h3>${producto.nombre}</h3>
        <p>${producto.descripcion}</p>
        <div class="product-bottom">
          <strong>${formatoPrecio(producto.precio)}</strong>
          <button class="button button-dark add-to-cart" data-id="${producto.id}">Agregar</button>
        </div>
      </div>
    </article>
  `).join("");

  if (mensajeVacio) mensajeVacio.hidden = lista.length > 0;
}

document.addEventListener("DOMContentLoaded", () => {
  renderizarProductos(productos);

  const buscador = document.querySelector("#product-search");
  if (buscador) {
    buscador.addEventListener("input", (evento) => {
      const termino = evento.target.value.toLowerCase().trim();
      const filtrados = productos.filter(producto =>
        `${producto.nombre} ${producto.categoria} ${producto.descripcion}`.toLowerCase().includes(termino)
      );
      renderizarProductos(filtrados);
    });
  }

  const contenedor = document.querySelector("#product-list");
  if (contenedor) {
    contenedor.addEventListener("click", (evento) => {
      const boton = evento.target.closest(".add-to-cart");
      if (!boton) return;
      const id = Number(boton.dataset.id);
      const carrito = obtenerCarrito();
      const productoExistente = carrito.find(item => item.id === id);

      if (productoExistente) productoExistente.cantidad += 1;
      else carrito.push({ ...productos.find(item => item.id === id), cantidad: 1 });

      guardarCarrito(carrito);
      actualizarContadores();
      boton.textContent = "Agregado ✓";
      setTimeout(() => { boton.textContent = "Agregar"; }, 900);
    });
  }
});
