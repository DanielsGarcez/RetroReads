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

  const mensagem = document.getElementById("mensagem-login");
  const fazerLogin = document.querySelector("usuario")
  const userLogado = document.querySelector("perfil-mobile")

  onAuthStateChanged(auth, (user) => {
    if (!mensagem) return;

    if (user) {
      console.log(`Logado como: ${user.email}.`);
      fazerLogin.classList.add("conteudo-oculto")
      userLogado.classList.add("conteudo-revelado")
      /* mensagem.textContent = `Logado com: ${user.email}`;
      mensagem.style.color = "green"; */
    } else {
      console.log("Usuário não logado... Faça o login.")
      fazerLogin.classList.add("conteudo-revelado")
      userLogado.classList.add("conteudo-oculto")

      /* mensagem.textContent = "Não foi encontrado usuário";
      mensagem.style.color = "red"; */
    }
  });
}
carregarHeader();

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