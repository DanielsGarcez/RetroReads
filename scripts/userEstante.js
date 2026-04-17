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

// Variáveis com as informações do livro no banco de dados
let grid;
let template;

const livrosRef = collection(db, "livros");
const queryLivros = query(livrosRef, where("userId", "==", localStorage.getItem("userId")));
// Onde("ID de usuário", "estiver no", "banco de dados, pegueos itens com esse ID")

// Variáveis de Filtros
const btnMostrarFiltro = document.getElementById("btn-mostrar-filtro");

let selectGeneroEstante;
let selectIdiomaEstante;
let selectAcabamentoEstante;
let selectDisponibilidadeEstante;

// Função que renderiza os Cards do Grid com informações do banco de dados
function renderItemEstante(data, id) {
  const clone = template.content.cloneNode(true);

  const imagem = clone.querySelector('.capa-livro');
  const titulo = clone.querySelector('.titulo-livro');
  const autor = clone.querySelector('.autor-livro');

  imagem.src = data?.capa || "img/Mockup-Livro.png";
  titulo.textContent = data?.titulo || 'Sem título';
  autor.textContent = data?.autor || 'Sem autor';

  return clone;
}

function renderizarEstante(snapshot) {
  grid.innerHTML = "";

  snapshot.forEach(doc => {
    const item = renderItemEstante(doc.data(), doc.id);
    grid.appendChild(item);
  });
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
if (btnMostrarFiltro) {
  btnMostrarFiltro.addEventListener("click", () => {
    const formFiltro = document.getElementById("form-filtro-estante");
    const spanFiltroIcon = document.querySelector(".span-btn-filtro-icon");

    console.log(formFiltro, spanFiltroIcon);

    if (formFiltro.classList.contains("conteudo-oculto-mobile")){
      formFiltro.classList.remove("conteudo-oculto-mobile");

      if (spanFiltroIcon) {
        spanFiltroIcon.classList.add("span-btn-filtro-x");
      }
    } else{
      formFiltro.classList.add("conteudo-oculto-mobile");

      if (spanFiltroIcon) {
        spanFiltroIcon.classList.remove("span-btn-filtro-x");
      }
    }
  });
};
// ------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
    grid = document.getElementById("grid-estante");
    template = document.getElementById("card-template");  

    selectGeneroEstante = document.getElementById("filtro-genero-estante");
    selectIdiomaEstante = document.getElementById("filtro-idioma-estante");
    selectAcabamentoEstante = document.getElementById("filtro-acabamento-estante");
    selectDisponibilidadeEstante = document.getElementById("filtro-disponibilidade-estante");

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

      // carrega o snapshot inical
      const snapshotInicial = await getDocs(queryLivros);
      
      try {
        renderizarEstante(snapshotInicial);
      } catch (e) {
        console.error("Erro ao renderizar:", e);
      }

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
          livrosRef,
          where("userId", "==", user.uid),
          ...filtros,
          orderBy("criadoEm", "desc")
        );

        const snapshot = await getDocs(queryFiltros);
        renderizarEstante(snapshot);
      }

    })();
  });
});
