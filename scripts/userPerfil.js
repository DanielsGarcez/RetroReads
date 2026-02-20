import { db, auth } from './firebase.js';
import { doc, getDoc, collection, updateDoc  } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

const parametros = new URLSearchParams(window.location.search);
const usuarioId = parametros.get("id");

const btnEditar = document.getElementById("btn-editar-dados");

const btnCancelar = document.getElementById("btn-cancelar-dados");
const btnSalvar = document.getElementById("btn-salvar-dados");

const dadosInput = document.querySelectorAll(".dados-input");
const formDados = document.getElementById("form-dados-user");

// ------------------ Funções ------------------

function modoEdicaoAtivar(){
    btnEditar.classList.add("conteudo-oculto");
    btnSalvar.classList.remove("conteudo-oculto");
    btnCancelar.classList.remove("conteudo-oculto");

    dadosInput.forEach(input => {
        input.classList.remove("input-desativado");
    });
    console.log("Modo de edição ativado");
}

function modoEdicaoDesativar(){
    btnEditar.classList.remove("conteudo-oculto");
    btnSalvar.classList.add("conteudo-oculto");
    btnCancelar.classList.add("conteudo-oculto");

    dadosInput.forEach(input => {
        input.classList.add("input-desativado");
    });
    console.log("Modo de edição desativado");
}

// ------------------ Ativações ------------------

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

    // -------------------------------------------------------------------------

    btnEditar.addEventListener("click", modoEdicaoAtivar);
    btnCancelar.addEventListener("click", modoEdicaoDesativar);

    if (!formDados){
        console.error("Formulário não encontrado");
        return;
    }

    formDados.addEventListener("submit", async (e) =>{
        e.preventDefault();

        // Pega os IDs do formulário "form-dados-user":
        const nomeUser = document.getElementById("dados-user-nome").value;
        const nascUser = document.getElementById("dados-user-nasc").value;
        const telUser = document.getElementById("dados-user-telefone").value;

        // Validação dos campos do Formulário:
        if (
            !nomeUser  ||
            !nascUser  ||
            !telUser
        ){  
            alert("Por favor, preencha todos os campos.");
            return;
        }

        try{
            // Salva no Firebase na coleção
            const docRef = await updateDoc(doc(db, "usuarios", usuarioId),{
                nome: nomeUser,
                nascimento: nascUser,
                telefone: telUser
            });

            btnEditar.classList.remove("conteudo-oculto");
            btnSalvar.classList.add("conteudo-oculto");
            btnCancelar.classList.add("conteudo-oculto");
            
            dadosInput.forEach(input => {
                input.classList.add("input-desativado");
            });

            alert("Dados alterados com sucesso!")
            console.log("Alterou o documento com o ID: ", docRef.id);
            e.target.reset();

        } catch (erro){
            alert("Erro ao alterar dados")
        }

    });
});

