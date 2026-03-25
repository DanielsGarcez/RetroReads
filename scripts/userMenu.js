import { db, auth } from './firebase.js';
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

export { carregarMenu };

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

document.addEventListener("DOMContentLoaded", async () => {

    await carregarMenu();

    const userId = new URLSearchParams(window.location.search).get("id");

    if (!userId) {
        alert("ID do usuário não encontrado.");
        
        window.location.href = "/RetroReads/pages/login.html";
        return;
    }

    // Variáveis das abas de menu
    const abaDadosPessoais = document.getElementById("aba-dados-pessoais");
    const abaEstanteVirtual = document.getElementById("aba-estante-virtual");
    const abaLivrosReservas = document.getElementById("aba-suas-reservas");
    //const abaLivrosAnunciados = document.getElementById("aba-seus-anuncios");

    onAuthStateChanged(auth, async (user) => {

        if (!user) {
            window.location.href = "/RetroReads/pages/login.html";
            return;
        }

        const ref = doc(db, "usuarios", userId);
        const snap = await getDoc(ref);

        if (!snap.exists()){
            alert("Usuário não encontrado");
            return;
        }

        const usuario = snap.data();

        document.getElementById("user-nome").textContent = usuario.nome;
        document.getElementById("user-plano").textContent = "Usuário " + usuario.plano;

        // ------------ Funções dos botões do menu  ------------
        abaDadosPessoais.addEventListener("click", () => {
            window.location.href = `/RetroReads/pages/userPerfil.html?id=${userId}`;

            abaDadosPessoais.classList.add("btn-menu-ativo");
            abaEstanteVirtual.classList.remove("btn-menu-ativo");
            abaLivrosReservas.classList.remove("btn-menu-ativo");
        });

        abaEstanteVirtual.addEventListener("click", () => {
            window.location.href = `/RetroReads/pages/userEstante.html?id=${userId}`;

            abaDadosPessoais.classList.remove("btn-menu-ativo");
            abaEstanteVirtual.classList.add("btn-menu-ativo");
            abaLivrosReservas.classList.remove("btn-menu-ativo");
        });

        abaLivrosReservas.addEventListener("click", () => {
            window.location.href = `/RetroReads/pages/userReservas.html?id=${userId}`;

            abaDadosPessoais.classList.remove("btn-menu-ativo");
            abaEstanteVirtual.classList.remove("btn-menu-ativo");
            abaLivrosReservas.classList.add("btn-menu-ativo");
        });
        /* 
        abaLivrosAnunciados.addEventListener("click", () => {
            window.location.href = `/RetroReads/pages/userAnunciados.html?id=${userId}`; 
        }); 
        */
    });

});