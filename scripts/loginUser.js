import { auth } from "./firebase.js";
import { signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

console.log("loginUser.js carregado");

// Espera o DOM carregar 
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form-login-user");
    if (!form){
        console.error("Formulário não encontrado");
        return;
    }

    // Pega o conteúdo do fomulário
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Pega os IDs dos formulário "form-login-user"
        const emailLogin = document.getElementById("email-login").value;
        const senhaLogin = document.getElementById("senha-login").value;

        // Validação dos campos do Formulário:
        console.log("if - validação de campos")
        if (
            !emailLogin       ||
            !senhaLogin
        ){  
            alert("Por favor, preencha todos os campos.");
            return;
        }
        
        // Validação de Email
        console.log("if - validação de emails")
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailLogin)) {
            alert("E-mail inválido.");
            return;
        }

        // Testa o Login
        try{
            console.log("Tentando signInWithEmailAndPassword", emailLogin);
            const userCredencial= await signInWithEmailAndPassword(
                auth, 
                emailLogin,
                senhaLogin
            );
            console.log("Login ok: ", userCredencial);

            // define o endereçamento da pagina por id de usuário
            const userId = userCredencial.user.uid;
            if (!userId) {
                alert("UID do usuário inválido.");
                return;
            }
            console.log("Credencial encontrada: ", userCredencial);

            // Abre essa página após efetuar o login
            window.location.href = `/RetroReads/pages/detalhesLivro.html?id=${userId}`
            console.log("Redirecionou:", userId);

        } catch (error){
            if (error.code == "auth/user-not-found"){
                alert("Usuário não encontrado.")
            } else if (error.code === "auth/wrong-password") {
                alert("Senha incorreta.");
            } else {
                alert("Erro: " + error.code);
            }
        }
    })

})