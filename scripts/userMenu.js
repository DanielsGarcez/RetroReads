import { auth } from './firebase.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

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

document.addEventListener("DOMContentLoaded", () =>{
    
    const userId = new URLSearchParams(window.location.search).get("id");

    const abaDadosPessoais = document.getElementById("aba-dados-pessoais");
    const abaEstanteVirtual = document.getElementById("aba-estante-virtual");
    const abaLivrosReservados = document.getElementById("aba-suas-reservas");
    const abaLivrosAnunciados = document.getElementById("aba-seus-anuncios");

    onAuthStateChanged(auth, (user) => {
        if (!userId) {
            alert("ID do usuário não encontrado na URL.");
            window.location.href = "/RetroReads/pages/login.html";
        }
        
        if (!userId) {
            alert("UID do usuário inválido.");
            return;
        }
        
        abaDadosPessoais.addEventListener("click", () => {
            window.location.href = `/RetroReads/pages/userPerfil.html?id=${userId}`;
        });

        abaEstanteVirtual.addEventListener("click", () => {
            window.location.href = `/RetroReads/pages/userEstante.html?id=${userId}`;
        });

        abaLivrosReservados.addEventListener("click", () => {
            window.location.href = `/RetroReads/pages/userReservados.html?id=${userId}`;
        });

        abaLivrosAnunciados.addEventListener("click", () => {
            window.location.href = `/RetroReads/pages/userAnunciados.html?id=${userId}`;
        });

    });

});
