import { auth, db } from "./firebase.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { collection, doc, setDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () =>{
    const form = document.getElementById("form-cadastro-user")

    if (!form){
        console.error("Formulário não encontrado");
        return;
    }

    form.addEventListener("submit", async (e) =>{
        e.preventDefault();

        // Pega os IDs do formulário "form-cadastroUser":
        const nomeUser = document.getElementById("nome-user").value;
        const documentoUser = document.getElementById("documento-user").value;
        const emailUser = document.getElementById("email-user").value;
        const senhaUser = document.getElementById("senha-user").value;
        const senhaUserConfirmar = document.getElementById("senha-user-confirmar").value;

        // Validação dos campos do Formulário:
        console.log("if - validação de campos")
        if (
            !nomeUser       ||
            !documentoUser  ||
            !emailUser      ||
            !senhaUser      ||
            !senhaUserConfirmar
        ){  
            alert("Por favor, preencha todos os campos.");
            return;
        }

        // Validação de Email
        console.log("if - validação de emails")
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailUser)) {
            alert("E-mail inválido.");
            return;
        }

        // Validação de senha
        console.log("if - validação de senha")
        if (senhaUser.length < 6) {
            alert("A senha deve ter pelo menos 6 caracteres.");
            return;
        }

        // Confirmação de senha
        console.log("if - confirmação de senhas")
        if (senhaUser.trim()  !=  senhaUserConfirmar.trim()){
            alert("As senhas não correspondem. Os campos devem ter a mesma senha!")
            return;
        }

        console.log("Cadastro válido! Enviando dados...");

        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                emailUser,
                senhaUser
            );

            // DEBUG OBRIGATÓRIO (remova depois)
            console.log("userCredential:", userCredential);

            if (!userCredential || !userCredential.user) {
                alert("Firebase não retornou o usuário.");
                return;
            }

            const uid = userCredential.user.uid;

            if (!uid) {
                alert("UID do usuário inválido.");
                return;
            }

            console.log("UID OK:", uid);

            await setDoc(doc(db, "usuarios", uid), {
                nome: nomeUser,
                documento: documentoUser,
                email: emailUser,
                criadoEm: new Date()
            });

            alert("Cadastro realizado com sucesso!");
            e.target.reset();

            } catch (error) {
                console.error("Erro ao cadastrar:", error);

                if (error.code === "auth/email-already-in-use") {
                    alert("Este e-mail já está em uso.");
                } else {
                    alert("Erro ao cadastrar.");
                }
            }
    })
})