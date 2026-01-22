import { db } from "./firebase";
import {doc, getDoc} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const parametros = new URLSearchParams(window.location.search);
const livroId = parametros.get("id");

async function dadosLivro() {
    const ref = doc(db, "livros", livroId);
    const snap = await getDoc(ref);

    if (!snap.exists()) return alert("Livro não encontrado");

    const livro = snap.data();

    document.getElementById("capa").src = livro.capa;
    document.getElementById("titulo").textContent = livro.titulo;
    document.getElementById("descricao").textContent = livro.descricao;

    document.getElementById("nome-autor").textContent = livro.autor;
    document.getElementById("ano-lancamento").textContent = livro.ano;
    document.getElementById("num-isbn").textContent = livro.isbn;
    document.getElementById("idioma").textContent = livro.idioma;
    document.getElementById("num-pagina").textContent = livro.paginas;
    document.getElementById("tipo-capa").textContent = livro.tipoCapa;
}
carregarLivro();
