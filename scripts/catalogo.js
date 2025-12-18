import { db } from './firebase.js';
import {
  collection,
  query,
  orderBy,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const grid = document.getElementById('grid-catalogo');
const template = document.getElementById('card-template');

// ------------------------

function renderItem(data, id) {
  const clone = template.content.cloneNode(true);

  const imagem = clone.querySelector('.capa-livro');
  const titulo = clone.querySelector('.titulo-livro');
  const autor = clone.querySelector('.autor-livro');

/*   imagem.src = data.capa || 'https://via.placeholder.com/400x225?text=Sem+imagem'; */
  imagem.alt = data.titulo || 'Item';
  titulo.textContent = data.titulo || 'Sem título';
  autor.textContent = data.autor || 'Sem título';

  clone.querySelector('.item-grid').dataset.id = id;
  return clone;
}



const livrosRef = collection(db, "livros");
const q = query(livrosRef, orderBy("criadoEm", "desc"));

onSnapshot(q, (snapshot) => {
  grid.innerHTML = "";

  snapshot.forEach((doc) => {
    const item = renderItem(doc.data(), doc.id);
    grid.appendChild(item);
  });
});

