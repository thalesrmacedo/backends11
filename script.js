document.getElementById("meuFormulario").addEventListener("submit", function (e) {
  const response = grecaptcha.getResponse();
  if (!response) {
    e.preventDefault();
    alert("Por favor, confirme o reCAPTCHA.");
  }
});
