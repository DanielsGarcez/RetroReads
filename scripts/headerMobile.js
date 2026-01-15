// Exporta o HeaderMobile para todas as páginas

window.revelarMenu = function (){
  const nav = document.getElementById("nav-mobile");

  if (!nav){
    if (nav.classList.contains('ocultarElemento')){
      menu.classList.toggle("revelarElemento");
    } 
    menu.classList.toggle("ocultarElemento");

  } return;
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