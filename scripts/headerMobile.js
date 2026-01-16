// Exporta o HeaderMobile para todas as páginas

window.revelarMenu = function (){
  const nav = document.getElementById("nav-mobile");
  const btnIcon = document.getElementById("btn-menu")

  if (nav){
    if (nav.classList.contains('ocultarElemento')){
      console.log("Revelou o objeto")
      nav.classList.toggle("revelarElemento");
      btnIcon.innerHTML = "⨉";
    } 
    else if (nav.classList.contains('revelarElemento')){
      console.log("Ocultou o objeto")
      nav.classList.toggle("ocultarElemento");
      btnIcon.innerHTML = "☰";
    }return
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