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

        
        if (!usuarioId) {
        alert("ID do usuário não encontrado na URL.");
        return;
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
        }
    dadosUsuario()

    } else {
        console.log("Usuário não encontrado")
        alert("Usuário não logado... Efetue o login.")
        
        window.location.href = "/RetroReads/pages/login.html";
    }
});

    // Função que insere os dados do banco nos inputs



/*     const formUser = getElementById("form-dados-user");

    if (!form){
        console.error("Formulário não encontrado");
        return;
    }

    formUser.addEventListener("click", async(e) =>{
        e.perventDefault();

        const btnEditar = document.getElementById("btn-editar-dados")
        if (!btnEditar) return;

        const btnSalvar = document.getElementById("btn-salvar-dados")
        const btnCancelar = document.getElementById("btn-cancelar-dados")


        if (btnEditar){

            // alterações nos botões
            btnEditar.classList.add("conteudo-oculto")
            btnSalvar.classList.add("conteudo-revelado")
            btnCancelar.classList.add("conteudo-revelado")

            

            console.log("Entrou no modo edição")
        }

    }) */
})