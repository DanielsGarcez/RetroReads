//---------- ÁREA DE IMPORTAÇÕES ----------
import { db } from './firebase.js';
import {
  collection,
  query,
  orderBy,
  where,
  getDocs
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import {carregarLoading, capitalizarPalavras, mostrarLoading, esconderLoading} from "./globalFunctions.js";

export { renderizar };

// Variáveis de Template e Grid da área dos livros
let grid, template;

// Variáveis de Filtros
let selectGenero, selectIdioma, selectAcabamento, selectDisponibilidade;

// Variáveis com as informações do livro no banco de dados
const livrosRef = collection(db, "livros");
const queryLivros = query(livrosRef, orderBy("criadoEm", "desc"));

// Variáveis do Dropdown dos filtros
const btnFiltros = document.getElementById("btn-dropdown");

let selectGeneroCatalogo;
let selectIdiomaCatalogo;
let selectAcabamentoCatalogo;
let selectDisponibilidadeCatalogo;

// -------------------- ÁREA DE FUNÇÕES --------------------

// Função do botão de dropdown dos filtros

try {
  btnFiltros.addEventListener("click", () => {
    const formFiltro = document.getElementById("form-filtro-catalogo")

    if (formFiltro.classList.contains("conteudo-oculto-mobile")){
      formFiltro.classList.remove("conteudo-oculto-mobile");
      btnFiltros.classList.add("btn-dropdown-ativo");

    } else {
      formFiltro.classList.add("conteudo-oculto-mobile");
      btnFiltros.classList.remove("btn-dropdown-ativo");

    }
  });
} catch (error) {
  console.log("O elemento não existe nessa página, prosseguindo...");
}

// Função que desativa o card do livro caso ele esteja reservado
function desativarItem(data, btnDetalhes, itemGrid){

  if (!data) return;

  if (data.disponibilidade === "Reservado") {
    btnDetalhes.classList.add("btn-desativado");
    btnDetalhes.textContent = "Reservado";
    itemGrid.classList.add("conteudo-desativado");

    console.log("Desativado:", itemGrid);
  }
}

// Função que renderiza os Cards do Grid com informações do banco de dados
function renderItemCatalogo(data, id) {
  // Variáveis
  const clone = template.content.cloneNode(true);

  const btnDetalhes = clone.querySelector('.btn-detalhes');
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
  let valorReais = data?.valor
  ? parseFloat(data.valor).toFixed(2)
  : '0.00';

  clone.querySelector('.valor').textContent = valorReais || 'Sem valor';

  // altera conteudo do item
  itemGrid.dataset.id = id;
  itemGrid.dataset.titulo = data?.titulo || 'Sem título';

  // chamada da função que desativa o card caso o livro esteja reservado
  desativarItem(data, btnDetalhes, itemGrid);

  return clone;
}


// Função que renderiza os cards do grid
function renderizar(snapshot){
  
  grid.innerHTML = "";

  snapshot.forEach((doc) => {
    const item = renderItemCatalogo(doc.data(), doc.id);
    grid.appendChild(item);
  });

  //esconde a tela de Loading
  esconderLoading();
}


// -------------------- ÁREA DE INICIALIZAÇÃO --------------------

document.addEventListener("DOMContentLoaded", () => {
  grid = document.getElementById('grid-catalogo');
  template = document.getElementById('card-template');

  selectGeneroCatalogo = document.getElementById("filtro-genero-catalogo");
  selectIdiomaCatalogo = document.getElementById("filtro-idioma-catalogo");
  selectAcabamentoCatalogo = document.getElementById("filtro-acabamento-catalogo");
  selectDisponibilidadeCatalogo = document.getElementById("filtro-disponibilidade-catalogo");

  (async () =>{
  // espera carregar a função tela de loading
  await carregarLoading();
  // mostra a tela de Loading
  mostrarLoading();
  
  // carrega o snapshot inical
  const snapshotInicial = await getDocs(queryLivros);
  renderizar(snapshotInicial);
    
  // ------------------------------------------------------------
  // função que filtra as categorias
    const filtros = [
        selectGeneroCatalogo,
        selectIdiomaCatalogo,
        selectAcabamentoCatalogo,
        selectDisponibilidadeCatalogo
    ];

    filtros.forEach(select => {
      if (select) {
        select.addEventListener("change", aplicarFiltrosCatalogo);
      }
    });

    async function aplicarFiltrosCatalogo() {
      const genero = selectGeneroCatalogo?.value;
      const idioma = selectIdiomaCatalogo?.value;
      const acabamento = selectAcabamentoCatalogo?.value;
      const disponibilidade = selectDisponibilidadeCatalogo?.value;

      let filtros = [];

      if (genero) filtros.push(where("genero", "==", genero));
      if (idioma) filtros.push(where("idioma", "==", idioma));
      if (acabamento) filtros.push(where("tipoCapa", "==", acabamento));
      if (disponibilidade) filtros.push(where("disponibilidade", "==", disponibilidade));

      const queryFiltros = query(
        livrosRef,
        ...filtros,
        orderBy("criadoEm", "desc")
      );

      const snapshot = await getDocs(queryFiltros);
      renderizar(snapshot);
    }

    // --------------------------------------------------------------------------------
    // botão que abre a página de detalhes do livro clicado
    grid.addEventListener("click", (event) =>{
      const botao = event.target.closest(".btn-detalhes");
      if (!botao) return; // evita crash (boas práticas)

      const card = event.target.closest(".item-grid");
      if (!card) return; // evita crash (boas práticas)

      const livroNome = card.dataset.titulo;
      const livroId = card.dataset.id;

      if (livroId) {
        window.location.href = `/RetroReads/pages/livroDetalhes.html?id=${livroId}`; 
        console.log("ID: ",livroId)
        console.log("Título: ",livroNome)
      }
    });
  })();

});