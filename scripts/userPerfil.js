import { db } from './firebase.js';
import {doc, getDoc} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const parametros = new URLSearchParams(window.location.search);
const usuarioId = parametros.get("id");

document.addEventListener("DOMContentLoaded", () =>{
    async function dadosUsuario(data) {
        const ref = doc(db, "usuarios", usuarioId)
        const snap = await getDoc(ref);

        if (!snap.exists()) return 
        alert("Usuário não encontrado");

        const usuario = snap.data();


        document.getElementById("user-nome").src = usuario.nome;
        document.getElementById("user-plano").src = usuario.plano;

        document.getElementById("dados-user-nome").src = usuario.nome;
        document.getElementById("dados-user-email").src = usuario.email;
        document.getElementById("dados-user-cpf").src = usuario.documento;
    }
    dadosUsuario()
})