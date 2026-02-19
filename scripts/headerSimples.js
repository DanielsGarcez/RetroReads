import { auth } from './firebase.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// Exporta o Header para todas as páginas
async function carregarHeader() {
  try {
    const resposta = await fetch("/RetroReads/pages/fetch/HeaderSimples.html");
    const conteudo = await resposta.text();
    document.body.insertAdjacentHTML("afterbegin", conteudo);
  } catch (erro) {
    console.error("Erro ao carregar o header:", erro);
  }
}
carregarHeader();

const linkPerfilUser = document.getElementById("header-simples-user");

document.addEventListener("DOMContentLoaded", () => {

  linkPerfilUser.addEventListener("click", (e) => {
    onAuthStateChanged(auth, (user) => {
      const iconPerfil = document.querySelector(".user-perfil");

      if (user) {
        console.log(`HeaderSimples: Logado como: ${user.email}.`);
        iconPerfil.href = `/RetroReads/pages/userPerfil.html?id=${user.uid}`;

      } else {
        console.log("Usuário não logado.");
        iconPerfil.href = "/RetroReads/pages/login.html";
      }
    });
  });
});