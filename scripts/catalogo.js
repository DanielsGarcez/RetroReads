//---------- ÁREA DE IMPORTAÇÕES ----------

import { db } from './firebase.js';
import {
  collection,
  query,
  orderBy,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Variáveis de Template e Grid da área dos livros
const grid = document.getElementById('grid-catalogo');
const template = document.getElementById('card-template');


const templateCheckbox = document.getElementById("checkbox-template");

const filtroGenero = document.getElementById("filtro-genero");
const filtroIdioma = document.getElementById("filtro-idioma");
const filtroValor = document.getElementById("filtro-valor");
const filtroAcabamento = document.getElementById("filtro-acabamento");
const filtroDisponibilidade = document.getElementById("filtro-disponibilidade");


//---------- ÁREA DE FUNÇÕES ----------

// Funçãõ que carrega a tela de carregameto
async function carregarLoading() {
  //espera o html carregar
  const response = await fetch('/RetroReads/pages/fetch/TelaCarregamento.html');
  const html = await response.text();

  //cria um elemneto no html chamado 'section'
  const container = document.createElement('section');
  //insere o elemento no html
  container.innerHTML = html;

  document.body.appendChild(container);
}

// Função que deixa as letras em maiúsculo
function capitalizarPalavras(str) {
  return str.toLowerCase().replace('-',' ').split(' ').map(function(word) {
    return (word.charAt(0).toUpperCase() + word.slice(1));
  }).join(' ');
}

// Função de mostrar a Tela de Loading
function mostrarLoading() {
  const telaLoading = document.getElementById('sobrepor-carregamento');
  if (telaLoading) telaLoading.style.display = 'flex';
  console.log("Abriu Loading")
}

// Função de esconder a Tela de Loading
function esconderLoading() {
  const telaLoading = document.getElementById('sobrepor-carregamento');
  if (telaLoading) telaLoading.remove(); // remove do DOM
  console.log("Fechou Loading")
}

// Função que renderiza os Cards do Grid com informações do banco de dados
function renderItem(data, id) {
  const clone = template.content.cloneNode(true);

  const imagem = clone.querySelector('.capa-livro');
  const titulo = clone.querySelector('.titulo-livro');
  const autor = clone.querySelector('.autor-livro');

  //mobile:
  const autor2 = clone.querySelector('.autor-livro2');
  const genero = clone.querySelector('.genero-livro');
  const ano = clone.querySelector('.ano-livro');
  const idioma = clone.querySelector('.idioma-livro');

  const valor = clone.querySelector('.valor-livro');

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
  autor.textContent = data.autor || 'Sem título';

  //mobile:
  autor2.textContent = capitalizarPalavras((data.autor || 'Sem título'));
  genero.textContent = capitalizarPalavras((data.idioma || 'Sem título'));
  idioma.textContent = capitalizarPalavras((data.genero || 'Sem título'));
  ano.textContent = (data.ano || 'Sem título');

  clone.querySelector('.item-grid').dataset.id = id;  
  console.log({ grid, template });

  const card = clone.querySelector('.item-grid');

  card.dataset.id = id;
  card.dataset.titulo = data.titulo || 'Sem título';

  return clone;
}


//---------- ÁREA DE INICIALIZAÇÃO ----------

document.addEventListener("DOMContentLoaded", () => {
  (async () =>{
  //espera carregar a função tela de loading
  await carregarLoading();
  //mostra a tela de Loading
  mostrarLoading();

  // Função que simula a tela de carregamento
  setTimeout(function() {

    // Pega as informações do livro no banco de dados
    const livrosRef = collection(db, "livros");
    const q = query(livrosRef, orderBy("criadoEm", "desc"));

    onSnapshot(q, (snapshot) => {
      grid.innerHTML = "";

      snapshot.forEach((doc) => {
        const item = renderItem(doc.data(), doc.id);
        grid.appendChild(item);
      });

      //esconde a tela de Loading
      esconderLoading();
    });


    // Botão que abre a página de detalhes do livro clicado
    grid.addEventListener("click", (event) =>{
      const botao = event.target.closest(".btn-detalhes");
      if (!botao) return;

      const card = event.target.closest(".item-grid");
      if (!card) return;

      const livroNome = card.dataset.titulo;
      const livroId = card.dataset.id;

      if (livroId) {
/*         window.location.href = `detalhes.html?id=${livroId}`; */
        console.log("ID: ",livroId)
        console.log("Título: ",livroNome)
      }
    });

  }, 500);
  })();

});

