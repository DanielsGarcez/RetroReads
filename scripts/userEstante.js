//---------- ÁREA DE IMPORTAÇÕES ----------
import { db, auth } from './firebase.js';
import {
  collection,
  query,
  orderBy,
  where,
  getDocs
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import {carregarLoading, capitalizarPalavras, mostrarLoading, esconderLoading} from "./globalFunctions.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

import { renderizar, renderItem } from "/RetroReads/scripts/livroCatalogo.js";

// Variáveis com as informações do livro no banco de dados
const livrosRef = collection(db, "livros");
const queryLivros = query(livrosRef, where("userId", "==", localStorage.getItem("userId")));
                                    // Onde("ID de usuário", "estiver no", "banco de dados, pegueos itens com esse ID")
// espera carregar a função tela de loading
await carregarLoading();
mostrarLoading();

renderItem(doc.data(), doc.id);

esconderLoading();

// ---------------------- JANELA DE ADIÇÃO DE LIVRO ----------------------
const janelaAddContainer = document.querySelector("#janela-add-container");
const btnAdicionar = document.getElementById("btn-adicionar-livro");
const btnFechar = document.getElementById("btn-fechar-janela");

btnAdicionar.addEventListener("click", () => {
    janelaAddContainer.classList.remove("conteudo-oculto");
    document.body.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--cor-fundo-escuro');
    document.body.style.overflow = "hidden";
});

btnFechar.addEventListener("click", () => {
    janelaAddContainer.classList.add("conteudo-oculto");
    document.body.style.backgroundColor = "transparent";
    document.body.style.overflow = "auto";
});
// ------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {

  onAuthStateChanged(auth, (user) => {

    if (user) {
        console.log(`Logado como: ${user.email}.`);
    }
    
    if (!user) {
        alert("ID do usuário não encontrado na URL.");
        window.location.href = "/RetroReads/pages/login.html";
    }

    (async () =>{
      
      // carrega o snapshot inical
      const snapshotInicial = await getDocs(queryLivros);
      renderizar(snapshotInicial);

      // --------------------------------------------------------------------------------

      // função que filtra as categorias
/*         [selectGenero, selectIdioma, selectAcabamento, selectDisponibilidade].forEach(select => {
          select.addEventListener("change", aplicarFiltros);
        });


        async function aplicarFiltros() {
          const genero = selectGenero.value;
          const idioma = selectIdioma.value;
          const acabamento = selectAcabamento.value;
          const disponibilidade = selectDisponibilidade.value;
    
          let filtros = [];
    
          if (genero) filtros.push(where("genero", "==", genero));
          if (idioma) filtros.push(where("idioma", "==", idioma));
          if (acabamento) filtros.push(where("tipoCapa", "==", acabamento));
          if (disponibilidade) filtros.push(where("disponibilidade", "==", disponibilidade));
    
          const queryFiltros = query(
            collection(db, "livros"),
            ...filtros,
            orderBy("criadoEm", "desc")
          );
    
          const snapshot = await getDocs(queryFiltros);
          renderizar(snapshot);
        } */
    });
  });
});
