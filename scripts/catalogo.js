import { db } from './firebase.js';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  getDocs
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const grid = document.getElementById('grid-catalogo');
const template = document.getElementById('card-template');

//------------------------------------------------------

function renderItem(data, id) {
  const clone = template.content.cloneNode(true); // - Clona o conteúdo da Template

  const imagem = clone.querySelector('.capa-livro'); // querySelector - Dentro do clone pega referências aos elementos do card
  const titulo = clone.querySelector('.titulo-livro');
  const autor = clone.querySelector('.autor-livro');
  
  imagem.src = data.imageURL || 'https://via.placeholder.com/400x225?text=Sem+imagem';
  imagem.alt = data.title || 'Item';
  titulo.textContent = data.title || 'Sem título';
  autor.textContent = data.description || '';

  const article = clone.querySelector('.item-grid');
  article.dataset.id = id;

  return clone;
}
