// Exporta o Header para todas as páginas
async function carregarHeader() {
  try {
    const resposta = await fetch("/RetroReads/pages/fetch/HeaderHome.html");
    const conteudo = await resposta.text();
    document.body.insertAdjacentHTML("afterbegin", conteudo);
  } catch (erro) {
    console.error("Erro ao carregar o header:", erro);
  }
}

carregarHeader();

/* 
  Já tentei:
    ../pages/fetch/HeaderHome.html
    ../../pages/fetch/HeaderHome.html
    ./../pages/fetch/HeaderHome.html
    /pages/fetch/HeaderHome.html
    ./pages/fetch/HeaderHome.html

*/