//---------- ÁREA DE IMPORTAÇÕES ----------
import { db } from './firebase.js';
import {
  collection,
  query,
  orderBy,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import {carregarLoading, capitalizarPalavras, mostrarLoading, esconderLoading} from "./globalFunctions.js";

// Variáveis de Template e Grid da área dos livros
const grid = document.getElementById('grid-catalogo');
const template = document.getElementById('card-template');

// -------------------- ÁREA DE FUNÇÕES --------------------

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

  const valor = clone.querySelector('.valor');


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
  valor.textContent = data.valor || 'Sem título';


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
        window.location.href = `/RetroReads/pages/detalhesLivro.html?id=${livroId}`; 
        console.log("ID: ",livroId)
        console.log("Título: ",livroNome)
      }
      });

  }, 500);
  })();

});

