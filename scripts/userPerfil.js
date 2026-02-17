import { db } from './firebase.js';
import {doc, getDoc} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { auth } from "./firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

const parametros = new URLSearchParams(window.location.search);
const usuarioId = parametros.get("id");

document.addEventListener("DOMContentLoaded", () =>{

    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log(`Logado como: ${user.email}.`);
        }
        
        if (!user) {
            alert("ID do usuário não encontrado na URL.");
            window.location.href = "/RetroReads/pages/login.html";
        }

        async function dadosUsuario() {
            const ref = doc(db, "usuarios", usuarioId)
            const snap = await getDoc(ref);

            if (!snap.exists()){
                alert("Usuário não encontrado");
                return;
            }

            const usuario = snap.data();

            document.getElementById("user-nome").textContent  = usuario.nome;
            document.getElementById("user-plano").textContent  = usuario.plano;

            document.getElementById("dados-user-nome").placeholder  = usuario.nome;
            document.getElementById("dados-user-email").placeholder  = usuario.email;
            document.getElementById("dados-user-cpf").placeholder  = usuario.documento;
            document.getElementById("dados-user-assinatura").placeholder  = usuario.plano;
        }
        dadosUsuario()

        
    });

})

// ------------------------------------------------------------------------------------

document.getElementById("form-dados-user").addEventListener("submit", (e) => {
    e.preventDefault();

    const btnEditar = document.getElementById("btn-editar-dados");
    const btnSalvar = document.getElementById("btn-salvar-dados");
    const btnCancelar = document.getElementById("btn-cancelar-dados");
    const areaInputs = document.querySelector(".dados-input");

    // alternar botões
    btnEditar.classList.add("conteudo-oculto");
    btnSalvar.classList.add("conteudo-revelado");
    btnCancelar.classList.add("conteudo-revelado");

    // liberar edição
    areaInputs.style.pointerEvents = 'auto';

    console.log("Modo edição ativado");
});
