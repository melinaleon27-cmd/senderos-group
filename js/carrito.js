function leerCarrito() {
  return JSON.parse(localStorage.getItem("senderosCarrito")) || [];
}

function guardarCarrito(carrito) {
  localStorage.setItem("senderosCarrito", JSON.stringify(carrito));
}

function precioARS(valor) {
  return new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(valor);
}

function dibujarCarrito() {
  const contenedor = document.querySelector("#cart-items");
  if (!contenedor) return;
  const carrito = leerCarrito();

  if (carrito.length === 0) {
    contenedor.innerHTML = `<div class="empty-cart"><h2>Tu selección está vacía.</h2><p>Explorá nuestras experiencias y agregá las que te interesen.</p><a class="button button-dark" href="productos.html">Ver experiencias</a></div>`;
  } else {
    contenedor.innerHTML = carrito.map(item => `
      <article class="cart-item">
        <div><p class="eyebrow">${item.categoria}</p><h3>${item.nombre}</h3><p>${precioARS(item.precio)} por persona/servicio</p></div>
        <div class="quantity-control">
          <button class="quantity-btn" data-action="decrease" data-id="${item.id}" aria-label="Restar una unidad">−</button>
          <span>${item.cantidad}</span>
          <button class="quantity-btn" data-action="increase" data-id="${item.id}" aria-label="Sumar una unidad">+</button>
        </div>
        <strong>${precioARS(item.precio * item.cantidad)}</strong>
        <button class="remove-btn" data-action="remove" data-id="${item.id}">Quitar</button>
      </article>
    `).join("");
  }

  const cantidad = carrito.reduce((total, item) => total + item.cantidad, 0);
  const subtotal = carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);
  document.querySelector("#cart-total-items").textContent = cantidad;
  document.querySelector("#cart-subtotal").textContent = precioARS(subtotal);
  actualizarContadores();
}

document.addEventListener("DOMContentLoaded", () => {
  dibujarCarrito();

  const contenedor = document.querySelector("#cart-items");
  contenedor?.addEventListener("click", (evento) => {
    const boton = evento.target.closest("[data-action]");
    if (!boton) return;

    const id = Number(boton.dataset.id);
    const accion = boton.dataset.action;
    let carrito = leerCarrito();
    const producto = carrito.find(item => item.id === id);
    if (!producto) return;

    if (accion === "increase") producto.cantidad += 1;
    if (accion === "decrease") producto.cantidad -= 1;
    if (accion === "remove") producto.cantidad = 0;

    carrito = carrito.filter(item => item.cantidad > 0);
    guardarCarrito(carrito);
    dibujarCarrito();
  });

  document.querySelector("#clear-cart")?.addEventListener("click", () => {
    guardarCarrito([]);
    dibujarCarrito();
  });
});
