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

// Variáveis de Template e Grid da área dos livros
const grid = document.getElementById('grid-catalogo');
const template = document.getElementById('card-template');

// Variáveis de Filtros
const selectGenero = document.getElementById("filtro-genero");
const selectIdioma = document.getElementById("filtro-idioma");
const selectAcabamento = document.getElementById("filtro-acabamento");
const selectDisponibilidade = document.getElementById("filtro-disponibilidade");

// Variáveis com as informações do livro no banco de dados
const livrosRef = collection(db, "livros");
const queryLivros = query(livrosRef, orderBy("criadoEm", "desc"));

// -------------------- ÁREA DE FUNÇÕES --------------------

// Função que renderiza os Cards do Grid com informações do banco de dados
function renderItem(data, id) {
  const clone = template.content.cloneNode(true);

  const imagem = clone.querySelector('.capa-livro');
  const titulo = clone.querySelector('.titulo-livro');
  const autor = clone.querySelector('.autor-livro');

  // Busaca no banco de dados e carega-os no grid
  if (data.capa && data.capa.trim() !== "") {
    imagem.src = data.capa;
  } else {
    imagem.src = "img/Mockup-Livro.png";
  }

  imagem.onerror = () => {
    imagem.src = "../img/Mockup-Livro.png";
  };
  
  titulo.textContent = capitalizarPalavras(data.titulo || 'Sem título');
  autor.textContent = data.autor || 'Sem autor';

  // Conversor para Reais
  let valorReais = parseFloat(data.valor).toFixed(2);
  const valor = clone.querySelector('.valor');

  valor.textContent = valorReais || 'Sem valor'

  clone.querySelector('.item-grid').dataset.id = id;  
  console.log({ grid, template });

  const card = clone.querySelector('.item-grid');

  card.dataset.id = id;
  card.dataset.titulo = data.titulo || 'Sem título';

  return clone;
}

// Função que renderiza os cards do grid
function renderizar(snapshot){

  grid.innerHTML = "";

  snapshot.forEach((doc) => {
    const item = renderItem(doc.data(), doc.id);
    grid.appendChild(item);
  });

  //esconde a tela de Loading
  esconderLoading();
}


// -------------------- ÁREA DE INICIALIZAÇÃO --------------------

document.addEventListener("DOMContentLoaded", () => {
  (async () =>{
  // espera carregar a função tela de loading
  await carregarLoading();
  // mostra a tela de Loading
  mostrarLoading();
  
  // carrega o snapshot inical
  const snapshotInicial = await getDocs(queryLivros);
  renderizar(snapshotInicial);

  // ------------------------------------------------------------
  
  // Botão Mobile que abre o filtro
  const btnDropdown = document.getElementById('btn-dropdown');
  const dropdownContent = document.getElementById('dropdown-content');

  btnDropdown.addEventListener('click', (e) => {
      e.stopPropagation();
      
      if (dropdownContent.style.display === 'inline-flex') {
          dropdownContent.style.display = 'none';
          btnDropdown.classList.toggle("btn-dropdown-ativo");
          console.log('Fechou o Filtro');
      } else {
          dropdownContent.style.display = 'inline-flex';
          btnDropdown.classList.toggle("btn-dropdown-ativo");
          console.log('Abriu o Filtro');
      }
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown')) {
        dropdownContent.style.display = 'none';
        dropdownContent.style.display = 'none';
        btnDropdown.classList.toggle("btn-dropdown-ativo");
        console.log('Fechou o Filtro');
    }
  });

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

    // botão que abre a página de detalhes do livro clicado
    grid.addEventListener("click", (event) =>{
      const botao = event.target.closest(".btn-detalhes");
      if (!botao) return;

      const card = event.target.closest(".item-grid");
      if (!card) return;

      const livroNome = card.dataset.titulo;
      const livroId = card.dataset.id;

      if (livroId) {
        window.location.href = `/RetroReads/pages/detalhesLivro.html?id=${livroId}`; 
        console.log("ID: ",livroId)
        console.log("Título: ",livroNome)
      }
    });

  }, 500);
  })();

});

