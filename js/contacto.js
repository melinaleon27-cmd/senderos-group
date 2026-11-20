document.addEventListener("DOMContentLoaded", () => {
  const formulario = document.querySelector("#contact-form");
  const feedback = document.querySelector("#form-feedback");

  formulario?.addEventListener("submit", (evento) => {
    evento.preventDefault();

    if (!formulario.checkValidity()) {
      formulario.reportValidity();
      return;
    }

    const nombre = document.querySelector("#name").value.trim();
    feedback.textContent = `¡Gracias, ${nombre}! Tu consulta fue validada correctamente en esta demostración.`;
    formulario.reset();
  });
});
