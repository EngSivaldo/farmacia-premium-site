/* ====================
   DADOS E PERSISTÊNCIA (LEAN & AUTOMATION)
==================== */
let products = JSON.parse(localStorage.getItem("products")) || [
  {
    id: 1,
    name: "Vitamina C",
    price: 29.9,
    img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae",
  },
  {
    id: 2,
    name: "Shampoo",
    price: 24.9,
    img: "https://images.unsplash.com/photo-1594824476967-48c8b964273f",
  },
  {
    id: 3,
    name: "Sabonete",
    price: 9.9,
    img: "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2",
  },
];

function save() {
  localStorage.setItem("products", JSON.stringify(products));
}

/* ====================
 REVEAL SCROLL
==================== */
const revealObserver = () => {
  document.querySelectorAll(".reveal").forEach((el) => {
    let top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      el.classList.add("active");
    }
  });
};
window.addEventListener("scroll", revealObserver);
window.addEventListener("load", revealObserver);

/* ====================
 FORM CONTATO
==================== */
const form = document.getElementById("form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Mensagem enviada com sucesso!");
    form.reset();
  });
}

/* ====================
 INTERAÇÃO DE PRODUTOS
==================== */
document.querySelectorAll(".product-card").forEach((card) => {
  card.onclick = () => {
    let name = card.dataset.name;
    window.location = `produto.html?produto=${encodeURIComponent(name)}`;
  };
});

/* ====================
 ADMIN (CONTROLE E MONITORAMENTO)
==================== */
function login() {
  let user = prompt("Usuário:");
  let pass = prompt("Senha:");
  if (user === "admin" && pass === "123") {
    document.getElementById("adminPanel").style.display = "block";
    renderAdmin();
    alert("Bem-vindo Admin!");
  } else {
    alert("Acesso negado!");
  }
}

function addProduct() {
  let name = document.getElementById("name").value;
  let price = parseFloat(document.getElementById("price").value);
  let img = document.getElementById("img").value;

  if (!name || isNaN(price) || !img) {
    alert("Preencha todos os campos corretamente!");
    return;
  }

  products.push({ id: Date.now(), name, price, img });
  save();
  renderAdmin();
  alert("Produto adicionado com sucesso!");
  document.getElementById("name").value = "";
  document.getElementById("price").value = "";
  document.getElementById("img").value = "";
}

function renderAdmin() {
  let div = document.getElementById("list");
  if (!div) return;
  div.innerHTML = "";
  products.forEach((p) => {
    div.innerHTML += `
          <div style="display:flex; justify-content:space-between; margin-bottom:10px; padding:5px; border-bottom:1px solid #eee">
              <span>${p.name} - R$ ${p.price.toFixed(2)}</span>
              <button class="btn primary" style="padding:5px 10px; margin:0" onclick="deleteProduct(${
                p.id
              })">Excluir</button>
          </div>`;
  });
}

function deleteProduct(id) {
  products = products.filter((p) => p.id !== id);
  save();
  renderAdmin();
}
