// Exporta o Menu para a página de perfil do usuário
async function carregarJanelaAdd() {

  const btnAdicionar = document.getElementById("btn-adicionar-livro");

  btnAdicionar.addEventListener("click", async () => {
    try {
      const resposta = await fetch("/RetroReads/pages/fetch/livroCadastro.html");
      const conteudo = await resposta.text();
      const janelaAddContainer = document.querySelector("#janela-add-container");

      janelaAddContainer.innerHTML = conteudo;

    } catch (erro) {
      console.error("Erro ao carregar a janela de adição de livro:", erro);
    }
  });
}

carregarJanelaAdd();