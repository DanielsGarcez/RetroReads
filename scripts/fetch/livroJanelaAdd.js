/* // Exporta o Menu para a página de perfil do usuário
async function carregarJanelaAdd() {

  const btnAdicionar = document.getElementById("btn-adicionar-livro");
  
  let controle; // Variável para armazenar o controlador de abortamento

  btnAdicionar.addEventListener("click", async () => {

    // Cancela requisições anteriores se houver
    if (controle) controle.abort();

    // Cria um novo controller para a nova requisição
    controle = new AbortController();

    try {
      const resposta = await fetch("/RetroReads/pages/fetch/livroCadastro.html");
      const conteudo = await resposta.text();
      const janelaAddContainer = document.querySelector("#janela-add-container");

      janelaAddContainer.innerHTML = conteudo;

    } catch (erro) {
      console.error("Erro ao carregar a janela de adição de livro:", erro);
    }

    document.querySelector('.btn-fechar-janela').addEventListener('click', () => {
      if (controle) {
        controle.abort(); // <--- FECHA O FETCH AQUI
      }
    });
  });
}

carregarJanelaAdd(); */