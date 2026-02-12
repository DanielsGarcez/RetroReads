import { db } from './firebase.js';
import {
  collection,
  query,
  orderBy,
  where,
  getDocs
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import {carregarLoading, capitalizarPalavras, mostrarLoading, esconderLoading} from "./globalFunctions.js";

const parametros = new URLSearchParams(window.location.search);
const usuarioId = parametros.get("id");

document.addEventListener("DOMContentLoaded", () =>{
    async function dadosUsuario(data) {
        const ref = doc(db, "usuarios", usuarioId)
        const snap = await getDocs(ref);

        if (!snap.exists()) return 
        alert("Usuário não encontrado");

        const usuario = snap.data();

        document.getElementById("dados-user-nome").src = usuario.nome;
        document.getElementById("dados-user-email").src = usuario.email;
        document.getElementById("dados-user-cpf").src = usuario.documento;
    }
    dadosUsuario()
})