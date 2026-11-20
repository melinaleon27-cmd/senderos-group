// Funciones compartidas por todas las páginas.
function actualizarContadores() {
  const carrito = JSON.parse(localStorage.getItem("senderosCarrito")) || [];
  const cantidad = carrito.reduce((total, item) => total + item.cantidad, 0);
  document.querySelectorAll(".cart-count").forEach(elemento => {
    elemento.textContent = cantidad;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  actualizarContadores();

  document.querySelectorAll(".current-year").forEach(elemento => {
    elemento.textContent = new Date().getFullYear();
  });

  const botonMenu = document.querySelector(".menu-toggle");
  const navegacion = document.querySelector(".main-nav");
  botonMenu?.addEventListener("click", () => {
    const abierto = navegacion.classList.toggle("is-open");
    botonMenu.setAttribute("aria-expanded", abierto);
    botonMenu.textContent = abierto ? "✕" : "☰";
  });
});
