import { db } from "./firebase.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form-cadastroLivro");

    if (!form){
        console.error("Formulário não encontrado");
        return;
    }

    form.addEventListener("submit", async (e) =>{
        e.preventDefault();

        // Pega os IDs do formulário "form-cadastroLivro":
        const capaLivro = document.getElementById("capa-livro").value;
        const tipoCapa = document.getElementById("tipos-capa").value;
        const tituloLivro = document.getElementById("titulo-livro").value;
        const autorLivro = document.getElementById("autor-livro").value;
        const generoLivro = document.getElementById("genero-livro").value;
        const anoLivro = document.getElementById("ano-livro").value;
        const isbn = document.getElementById("ISBN").value;
        const idiomaLivro = document.getElementById("idioma-livro").value;
        const numPaginas = document.getElementById("paginas-livro").value;
        const valorLivro = document.getElementById("valor-livro").value;

        // Validação dos campos do Formulário:
        if(
            !capaLivro  ||
            !tipoCapa   ||
            !tituloLivro||
            !autorLivro ||
            !generoLivro||
            !anoLivro   ||
            !isbn       ||
            !idiomaLivro||
            !numPaginas ||
            !valorLivro
        ){
            alert("Por favor, preencha todos os campos.");
            return
        };

        // valida ISBN
            if (!validarISBN(isbn)) {
            alert("ISBN inválido. Verifique o número informado.");
            return;
            }

            const isbnLimpo = isbn.replace(/[-\s]/g, '');
            
        console.log("Cadastro válido! Enviando dados...");

        try{
            // Salva no Firebase em outra coleção
            const docRef = await addDoc(collection(db, "livros"),{
                capa: capaLivro,
                tipoCapa: tipoCapa,
                titulo: tituloLivro,
                autor: autorLivro,
                genero: generoLivro,
                ano: anoLivro,
                isbn: isbn,
                idioma: idiomaLivro,
                paginas: numPaginas,
                valor: valorLivro,

                criadoEm: new Date()
            });
        
            alert("Livro cadastrado com sucesso!")
            console.log("Cadastrou com o ID: ", docRef.id);
            e.target.reset();

        } catch (erro){
            console.error("Erro ao cadastrar livro:", erro);
            alert("Erro ao cadastrar livro")
        }

    });
});

