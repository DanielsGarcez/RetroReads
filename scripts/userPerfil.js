import { db, auth } from './firebase.js';
import { doc, getDoc, updateDoc  } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

const parametros = new URLSearchParams(window.location.search);
const usuarioId = parametros.get("id");

// ------------------ Variáveis Dados ------------------
const btnEditarDados = document.getElementById("btn-editar-dados");

const btnCancelarDados = document.getElementById("btn-cancelar-dados");
const btnSalvarDados = document.getElementById("btn-salvar-dados");

const inputDados = document.querySelectorAll(".dados-input");
const formDados = document.getElementById("form-dados-user");



// ------------------ Variáveis Endereços ------------------
const btnEditarEndereco = document.getElementById("btn-editar-endereco");

const btnCancelarEndereco = document.getElementById("btn-cancelar-endereco");
const btnSalvarEndereco = document.getElementById("btn-salvar-endereco");

const inputEndereco = document.querySelectorAll(".endereco-input");
const formEndereco = document.getElementById("form-endereco-user");



// ------------------ Funções Dados ------------------

function ativarModoEdicaoDados(){
    btnEditarDados.classList.add("conteudo-oculto");
    btnSalvarDados.classList.remove("conteudo-oculto");
    btnCancelarDados.classList.remove("conteudo-oculto");

    inputDados.forEach(input => {
        input.classList.remove("input-desativado");
    });
    console.log("Modo de edição ativado");
}

function desativarModoEdicaoDados(){
    btnEditarDados.classList.remove("conteudo-oculto");
    btnSalvarDados.classList.add("conteudo-oculto");
    btnCancelarDados.classList.add("conteudo-oculto");

    inputDados.forEach(input => {
        input.classList.add("input-desativado");
    });
    console.log("Modo de edição desativado");
}




// ------------------ Funções Endereços ------------------

function ativarModoEdicaoEndereco(){
    btnEditarEndereco.classList.add("conteudo-oculto");
    btnSalvarEndereco.classList.remove("conteudo-oculto");
    btnCancelarEndereco.classList.remove("conteudo-oculto");

    inputEndereco.forEach(input => {
        input.classList.remove("input-desativado");
    });
    console.log("Modo de edição ativado");
}

function modoEdicaoDesativarEndereco(){
    btnEditarEndereco.classList.remove("conteudo-oculto");
    btnSalvarEndereco.classList.add("conteudo-oculto");
    btnCancelarEndereco.classList.add("conteudo-oculto");

    inputEndereco.forEach(input => {
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

            // DADOS DO USUÁRIO
            document.getElementById("dados-user-nome").placeholder  = usuario.nome || " ";
            document.getElementById("dados-user-email").placeholder  = usuario.email || " ";
            document.getElementById("dados-user-nasc").placeholder  = usuario.nascimento || " ";
            
            document.getElementById("dados-user-cpf").placeholder  = usuario.documento || " ";
            document.getElementById("dados-user-telefone").placeholder  = usuario.telefone || " ";
            document.getElementById("dados-user-assinatura").placeholder  = usuario.plano || " ";

            //ENDEREÇO DO USUÁRIO
            document.getElementById("endereco-user-logradouro").placeholder  = usuario.endereco.logradouro || " ";
            document.getElementById("endereco-user-numero").placeholder  = usuario.endereco.numero || " ";
            document.getElementById("endereco-user-complemento").placeholder  = usuario.endereco.complemento || " ";

            document.getElementById("endereco-user-estado").placeholder  = usuario.endereco.estado || " ";
            document.getElementById("endereco-user-cidade").placeholder  = usuario.endereco.cidade || " ";
            document.getElementById("endereco-user-cep").placeholder  = usuario.endereco.cep || " ";
        }
        dadosUsuario()
    });



    // ------------------ Ativações Dados ------------------

    btnEditarDados.addEventListener("click", ativarModoEdicaoDados);
    btnCancelarDados.addEventListener("click", desativarModoEdicaoDados);

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
            await updateDoc(doc(db, "usuarios", usuarioId),{
                nome: nomeUser,
                nascimento: nascUser,
                telefone: telUser
            });

            btnEditarDados.classList.remove("conteudo-oculto");
            btnSalvarDados.classList.add("conteudo-oculto");
            btnCancelarDados.classList.add("conteudo-oculto");

            inputDados.forEach(input => {
                input.classList.add("input-desativado");
            });

            alert("Dados alterados com sucesso!")
            console.log("Alterou o documento com o ID: ", usuarioId);
            e.target.reset();

        } catch (erro){
            alert("Erro ao alterar dados")
        }

    });




    // ------------------ Ativações Endereços ------------------

    btnEditarEndereco.addEventListener("click", ativarModoEdicaoEndereco);
    btnCancelarEndereco.addEventListener("click", modoEdicaoDesativarEndereco);

    if (!formEndereco){
        console.error("Formulário de endereço não encontrado");
        return;
    }

    formEndereco.addEventListener("submit", async (e) =>{
        e.preventDefault();

        // Pega os IDs do formulário "form-endereco-user":
        const logradouroUser = document.getElementById("endereco-user-logradouro").value;
        const numeroUser = document.getElementById("endereco-user-numero").value;
        const complementoUser = document.getElementById("endereco-user-complemento").value;
        
        const estadoUser = document.getElementById("endereco-user-estado").value;
        const cidadeUser = document.getElementById("endereco-user-cidade").value;
        const cepUser = document.getElementById("endereco-user-cep").value;

        // Validação dos campos do Formulário:
        if (
            !logradouroUser  ||
            !numeroUser  ||
            !complementoUser  ||
            !estadoUser  ||
            !cidadeUser  ||
            !cepUser
        ){  
            alert("Por favor, preencha todos os campos.");
            return;
        }

        try{
            // Salva no Firebase na coleção
            await updateDoc(doc(db, "usuarios", usuarioId),{
                endereco: {
                    logradouro: logradouroUser,
                    numero: numeroUser,
                    complemento: complementoUser,
                    estado: estadoUser,
                    cidade: cidadeUser,
                    cep: cepUser
                }
            });

            btnEditarEndereco.classList.remove("conteudo-oculto");
            btnSalvarEndereco.classList.add("conteudo-oculto");
            btnCancelarEndereco.classList.add("conteudo-oculto");

            inputEndereco.forEach(input => {
                input.classList.add("input-desativado");
            });

            alert("Dados alterados com sucesso!")
            console.log("Alterou o documento com o ID: ", usuarioId);
            e.target.reset();

        } catch (erro){
            alert("Erro ao alterar dados")
        }

    });
});

