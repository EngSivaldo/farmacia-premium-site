document.getElementById("form").addEventListener("submit", function (e) {
  e.preventDefault();

  let nome = document.getElementById("nome").value;
  let email = document.getElementById("email").value;
  let msg = document.getElementById("msg").value;

  if (!nome || !email || !msg) {
    alert("Preencha todos os campos");
    return;
  }

  alert("Mensagem enviada com sucesso!");
});
