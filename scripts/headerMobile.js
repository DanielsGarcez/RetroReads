async function carregarHeader() {
  try {
    const resposta = await fetch(
      window.location.origin + "/RetroReads/pages/fetch/HeaderHome.html"
    );

    const conteudo = await resposta.text();
    document.body.insertAdjacentHTML("afterbegin", conteudo);

    ativarMenuMobile();
  } catch (erro) {
    console.error("Erro ao carregar header:", erro);
  }
}

function ativarMenuMobile() {
  const menuBtn = document.getElementById("btn-menu");
  const menuMobile = document.getElementById("btnMenu");

  if (!menuBtn || !menuMobile) return;

  menuBtn.addEventListener("click", () => {
    menuMobile.classList.toggle("ativo");
    document.body.classList.toggle("no-scroll");
  });

  // Fecha ao clicar em um link
  menuMobile.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      menuMobile.classList.remove("ativo");
      document.body.classList.remove("no-scroll");
    });
  });
}

carregarHeader();
