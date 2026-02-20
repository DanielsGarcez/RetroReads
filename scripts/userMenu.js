// Exporta o Menu para a página de perfil do usuário
async function carregarMenu() {
  try {
    const resposta = await fetch("/RetroReads/pages/fetch/PerfilMenu.html");
    const conteudo = await resposta.text();
    const menuContainer = document.querySelector(".menu-perfil-user");

    menuContainer.innerHTML = conteudo;

  } catch (erro) {
    console.error("Erro ao carregar o menu:", erro);
  }
}
carregarMenu();