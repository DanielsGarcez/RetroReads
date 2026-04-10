//---------- ÁREA DE IMPORTAÇÕES ----------
import { db, auth } from './firebase.js';
import {
  collection,
  query,
  orderBy,
  where,
  getDocs
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import {carregarLoading, mostrarLoading, esconderLoading} from "./globalFunctions.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

import { renderizar } from "/RetroReads/scripts/livroCatalogo.js";

// Variáveis com as informações do livro no banco de dados
const livrosRef = collection(db, "livros");
const queryLivros = query(livrosRef, where("userId", "==", localStorage.getItem("userId")));
// Onde("ID de usuário", "estiver no", "banco de dados, pegueos itens com esse ID")

// Variáveis de Filtros
const btnMostrarFiltro = document.getElementById("btn-mostrar-filtro");
const btnMostrarFiltroIcon = document.getElementById("span-btn-filtro-livro")

const selectGeneroEstante = document.getElementById("filtro-genero-estante");
const selectIdiomaEstante = document.getElementById("filtro-idioma-estante");
const selectAcabamentoEstante = document.getElementById("filtro-acabamento-estante");
const selectDisponibilidadeEstante = document.getElementById("filtro-disponibilidade-estante");

// Função que renderiza os Cards do Grid com informações do banco de dados
function renderItem(data, id) {
  // Variáveis
  const clone = template.content.cloneNode(true);

  const btnEditarLivro = clone.querySelector('.btn-detalhes');
  const itemGrid = clone.querySelector('.item-grid');

  const imagem = clone.querySelector('.capa-livro');
  const titulo = clone.querySelector('.titulo-livro');
  const autor = clone.querySelector('.autor-livro');

  // busca a imagem no firestore
  if (data?.capa && data.capa.trim() !== "") {
    imagem.src = data.capa;
  } else {
    imagem.src = "img/Mockup-Livro.png";
  }

  // define o texto de titulo e autor pego no firestore
  titulo.textContent = capitalizarPalavras(data?.titulo || 'Sem título');
  autor.textContent = data?.autor || 'Sem autor';

  // converte o valor
  let valorReais = parseFloat(data?.valor).toFixed(2);
  clone.querySelector('.valor').textContent = valorReais || 'Sem valor';

  // altera conteudo do item
  itemGrid.dataset.id = id;
  itemGrid.dataset.titulo = data?.titulo || 'Sem título';

  return clone;
}

// ---------------------- JANELA DE ADIÇÃO DE LIVRO ----------------------
const janelaAddContainer = document.getElementById("janela-add-container");
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



// ---------------------- BOTÃO FILTRO ----------------------
btnMostrarFiltro.addEventListener("click", () => {
  const formFiltro = document.getElementById("form-filtro-estante")
  const spanFiltroIcon = document.querySelector(".span-btn-filtro-icon");

  console.log(formFiltro, spanFiltroIcon);

  if (formFiltro.classList.contains("conteudo-oculto-mobile")){
    formFiltro.classList.remove("conteudo-oculto-mobile");

    spanFiltroIcon.classList.add("span-btn-filtro-x");
  } else{
    formFiltro.classList.add("conteudo-oculto-mobile");

    spanFiltroIcon.classList.remove("span-btn-filtro-x");
  }
});

// ------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
    onAuthStateChanged(auth, async (user) => {

    if (user) {
      console.log(`Logado como: ${user.email}.`);
    } else {
      console.log("Usuário não autenticado. Redirecionando para a página de login...");
      window.location.href = "/RetroReads/pages/login.html";
    }

    try {
      document.getElementById("aba-estante-virtual").classList.add("btn-menu-ativo");
    }
    catch (error) {
      console.error("O elemento da aba Estante Virtual não existe:", error);
    }

    (async () =>{
      // espera carregar a função tela de loading
      await carregarLoading();
      // mostra a tela de Loading
      mostrarLoading();
      console.log("### Função mostrarLoading chamada na estante ###");

      // carrega o snapshot inical
      const snapshotInicial = await getDocs(queryLivros);
      renderizar(snapshotInicial);

      const filtros = [
        selectGeneroEstante,
        selectIdiomaEstante,
        selectAcabamentoEstante,
        selectDisponibilidadeEstante
      ];

      filtros.forEach(select => {
        if (select) {
          select.addEventListener("change", aplicarFiltrosEstante);
        }
      });

      async function aplicarFiltrosEstante() {
        console.log("###Função aplicarFiltrosEstante chamada###");

        const genero = selectGeneroEstante.value;
        const idioma = selectIdiomaEstante.value;
        const acabamento = selectAcabamentoEstante.value;
        const disponibilidade = selectDisponibilidadeEstante.value;

        let filtros = [];

        if (genero) filtros.push(where("genero", "==", genero));
        if (idioma) filtros.push(where("idioma", "==", idioma));
        if (acabamento) filtros.push(where("tipoCapa", "==", acabamento));
        if (disponibilidade) filtros.push(where("disponibilidade", "==", disponibilidade));

        const queryFiltros = query(
          collection(db, "livros"),
          where("userId", "==", localStorage.getItem("userId")),
          ...filtros,
          orderBy("criadoEm", "desc")
        );

        console.log("###Função queryFiltros concluida###");


        const snapshot = await getDocs(queryFiltros);
        renderizar(snapshot);
      }
      // --------------------------------------------------------------------------------
    })();
  });
});
