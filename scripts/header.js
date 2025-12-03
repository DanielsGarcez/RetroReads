// Exporta o Header para todas as páginas
async function carregarHeader() {
  try {
    const resposta = await fetch("../pages/header.html");
    const conteudo = await resposta.text();
    document.body.insertAdjacentHTML("afterbegin", conteudo);
    iniciarMenuHamburguer();
  } catch (erro) {
    console.error("Erro ao carregar o header:", erro);
  }
}

carregarHeader();

function iniciarMenuHamburguer() {
  const hamburger = document.getElementById("hamburger");
  const navbar = document.getElementById("navbar");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navbar.classList.toggle("open");
  });
}

