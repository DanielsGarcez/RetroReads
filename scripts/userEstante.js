//---------- ÁREA DE IMPORTAÇÕES ----------
import { db, auth } from './firebase.js';
import {
  collection,
  getDocs,
  query,
  where
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import {carregarLoading, capitalizarPalavras, mostrarLoading, esconderLoading} from "./globalFunctions.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

import { renderizar } from "/RetroReads/scripts/livroCatalogo.js";
import { carregarMenu } from "/RetroReads/scripts/userMenu.js";
import { dadosMenuUser } from "/RetroReads/scripts/userMenu.js";

// Variáveis de Template e Grid da área dos livros
const grid = document.getElementById('grid-estante');
const template = document.getElementById('card-template');

// Variáveis com as informações do livro no banco de dados
const livrosRef = collection(db, "livros");
const queryLivros = query(livrosRef, where("userId", "==", localStorage.getItem("userId")));
                                    // Onde("ID de usuário", "estiver no", "banco de dados, pegueos itens com esse ID")

carregarMenu();

function renderItem(data, id) {
    const clone = template.content.cloneNode(true);

    const imagem = clone.querySelector('.capa-livro');
    const titulo = clone.querySelector('.titulo-livro');
    const autor = clone.querySelector('.autor-livro');

    const itemGrid = clone.querySelector('.item-grid');

      // busca a imagem no firestore
    if (data.capa && data.capa.trim() !== "") {
        imagem.src = data.capa;
    } else {
        imagem.src = "img/Mockup-Livro.png";
    }

    // define o texto de titulo e autor pego no firestore
    titulo.textContent = capitalizarPalavras(data.titulo || 'Sem título');
    autor.textContent = data.autor || 'Sem autor';

    // converte o valor
    let valorReais = parseFloat(data.valor).toFixed(2);
    clone.querySelector('.valor').textContent = valorReais || 'Sem valor';

    // altera conteudo do item
    itemGrid.dataset.id = id;
    itemGrid.dataset.titulo = data.titulo || 'Sem título';

    return clone;
}

renderizar();

esconderLoading();

document.addEventListener("DOMContentLoaded", () => {

  onAuthStateChanged(auth, (user) => {

    if (user) {
        console.log(`Logado como: ${user.email}.`);
    }
    
    if (!user) {
        alert("ID do usuário não encontrado na URL.");
        window.location.href = "/RetroReads/pages/login.html";
    }

    dadosMenuUser();

    (async () =>{
      // espera carregar a função tela de loading
      await carregarLoading();
      // mostra a tela de Loading
      mostrarLoading();
      
      // carrega o snapshot inical
      const snapshotInicial = await getDocs(queryLivros);
      renderizar(snapshotInicial);

      // ------------------------------------------------------------

      // função que simula a tela de carregamento
      setTimeout(function() {

      // --------------------------------------------------------------------------------

      // função que filtra as categorias
        [selectGenero, selectIdioma, selectAcabamento, selectDisponibilidade].forEach(select => {
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
        }

        // --------------------------------------------------------------------------------

      }, 500);
    })();
  });
});
