// Exporta o HeaderMobile para todas as páginas

window.revelarMenu = function (){
  const menu = document.querySelector("#menuMobile");

  if (!menu) return;
  
  menu.classList.toggle("revelarElemento");
}

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