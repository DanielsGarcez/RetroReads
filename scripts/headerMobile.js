// Exporta o HeaderMobile para todas as páginas

window.revelarMenu = function () {
  const nav = document.getElementById("nav-mobile");
  const btnIcon = document.getElementById("btn-menu");

  if (!nav || !btnIcon) return;

  if (nav.classList.contains("ocultarElemento")) {
    nav.classList.remove("ocultarElemento");
    nav.classList.add("revelarElemento");
    btnIcon.innerHTML = "⨉";
    console.log("Revelou o menu");
  } else {
    nav.classList.remove("revelarElemento");
    nav.classList.add("ocultarElemento");
    btnIcon.innerHTML = "☰";
    console.log("Ocultou o menu");
  }
};


async function carregarHeader() {
  try {
    const resposta = await fetch("/RetroReads/pages/fetch/HeaderMobile.html");
    const conteudo = await resposta.text();
    document.body.insertAdjacentHTML("afterbegin", conteudo);
  } catch (erro) {
    console.error("Erro ao carregar o header:", erro);
  }
}

carregarHeader();