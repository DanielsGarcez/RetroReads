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

window.addEventListener("DOMContentLoaded", () =>{
  const mensagem = document.getElementById("mensagem-login")
    // opcional: monitorar estado de autenticação
  onAuthStateChanged(auth, (user) => {
      console.log("onAuthStateChanged:", user);
      if (user) {
      mensagem.textContent = `Logado com: ${user.email}`;
      mensagem.style.color = "green";
      }
  });
})




/* 
  Testes de endereçamento no github pages

  Já tentei:
    ../pages/fetch/HeaderHome.html
    ../../pages/fetch/HeaderHome.html
    ./../pages/fetch/HeaderHome.html
    /pages/fetch/HeaderHome.html
    ./pages/fetch/HeaderHome.html

  Só funcionou:
    /RetroReads/pages/fetch/HeaderHome.html

  porém só funciona no pages, localmente não funciona
*/