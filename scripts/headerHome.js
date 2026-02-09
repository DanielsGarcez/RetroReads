import { auth } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

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

// solicita o html do headerHome
fetch("/RetroReads/components/headerHome.html")
  // recebe o "r" (conteudo bruto) e converte em conteúdo de txt(string)
  .then(r => r.text())
  // Conteúdo já convertido
  .then(html => {
    // 
    const header = document.querySelector(".header-home")
    if (!header) return; // segurança
    header.innerHTML = html;

    iniciarHeader(); // só agora o DOM existe
  });



// verificação de autenticação
function iniciarHeader() {
  const mensagem = document.getElementById("mensagem-login");

  onAuthStateChanged(auth, (user) => {
    if (!mensagem) return;

    if (user) {
      mensagem.textContent = `Logado com: ${user.email}`;
      mensagem.style.color = "green";
    } else {
      mensagem.textContent = "Não foi encontrado usuário";
      mensagem.style.color = "red";
    }
  });
}

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