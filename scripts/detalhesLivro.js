import { db } from "./firebase.js";
import {doc, getDoc} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import {carregarLoading, mostrarLoading, esconderLoading} from "./globalFunctions.js";

const parametros = new URLSearchParams(window.location.search);
const livroId = parametros.get("id");

document.addEventListener("DOMContentLoaded", () =>{
    async function dadosLivro(data) {
        const ref = doc(db, "livros", livroId);
        const snap = await getDoc(ref);

        if (!snap.exists()) return alert("Livro não encontrado");

        const livro = snap.data();

        document.getElementById("capa-livro").src = livro.capa;
        document.getElementById("titulo-livro").textContent = livro.titulo;
        document.getElementById("descricao-livro").textContent = livro.descricao;
        /* document.getElementById("valor-livro").textContent = livro.valor; */

        document.getElementById("nome-autor").textContent = livro.autor;
        document.getElementById("ano-lancamento").textContent = livro.ano;
        document.getElementById("num-isbn").textContent = livro.isbn;
        document.getElementById("idioma").textContent = livro.idioma;
        document.getElementById("num-paginas").textContent = livro.paginas;
        document.getElementById("tipo-capa").textContent = livro.tipoCapa;
    }
    dadosLivro();
})
