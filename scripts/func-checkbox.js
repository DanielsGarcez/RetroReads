import { db } from './firebase.js';
import {
    doc,
    getDoc,
    collection,
    query,
    where,
    orderBy,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const filtrosContainer = document.getElementById('filtro-catalogo');
const templateCheckbox = document.getElementById('checkbox-categoria-template');

let reiniciarListener = null;

function aplicarFiltros() {
  const categoriasSelecionadas = [
    //procura quais inputs estão marcados (checked)
    ...document.querySelectorAll('#filtro-catalogo input:checked')

    //pega o valor de cada Checkbox Marcada
  ].map(checkboxMarcada => checkboxMarcada.value);

  // remove listener antigo
  if (reiniciarListener) reiniciarListener();

  let q;

  // verifica se há conteúdo nas categorias selecionadas
  if (categoriasSelecionadas.length > 0) {
    q = query(
        //busca no banco de dados os livros            
        collection(db, 'livros'),

        // onde ele vai pegar os dados
        where('categoria', 'in', categoriasSelecionadas),
    );
  } else {
    q = query(
        //busca no banco de dados os livros        
        collection(db, 'livros'),
    );
  }

  // reinicia o listener para "" (nada)
  reiniciarListener = onSnapshot(q, snapshot => {
    grid.innerHTML = "";

    //
    snapshot.forEach(doc => {
      grid.appendChild(renderItem(doc.data(), doc.id));
    });
  });
}


// ---------- Funções Automáticas ----------
async function carregarCategorias() {
    const ref = doc(db, 'categorias', 'generos');
    const snapshot = await getDoc(ref);

    // verifica se o documento carrega
    if (!snapshot.exists()) return;

    const generos = snapshot.data();

    // transforma o Objeto em uma Array com varias Arrays
    Object.entries(generos)
        // ordena pelo nome
        .sort((a, b) => a[1].localeCompare(b[1])) 
        .forEach(([slug, nome])=>{
        
        const clone = templateCheckbox.content.cloneNode(true);

        const checkbox = clone.querySelector('input');
        const span = clone.querySelector('.span-categoria');

        checkbox.value = slug;
        checkbox.id = `cat-${slug}`;
        checkbox.addEventListener('change', aplicarFiltros);

        span.textContent = nome;
        span.setAttribute ('for', checkbox.id);

        filtrosContainer.appendChild(clone);
    })
};

carregarCategorias();
