import { db } from "./firebase.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { auth } from "./firebase.js";
import { onAuthStateChanged } from 
  "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";


document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form-cadastroLivro");

    // Verifica se há formulário
    if (!form){
        console.error("Formulário não encontrado");
        return;
    }

    // Preview da Imagem enviada pelo usuário
    const inputCapa = document.getElementById("capa-livro");
    const preview = document.getElementById("preview-capa");

    inputCapa.addEventListener("input", () => {
    const url = inputCapa.value.trim();

    if (!url) {
        preview.src = "img/Mockup-Livro.png";
        return;
    }

    preview.src = url;
    });

    // fallback se a URL quebrar
    preview.onerror = () => {
    preview.src = "img/Mockup-Livro.png";
    };



    // Verifica se o usuário está logado
    let usuarioLogado = null;

    onAuthStateChanged(auth,(user) => {
        usuarioLogado = user;

        if(!user){
            alert("Você precisa estar logado para adicionar livros");
            
        }
    })


    form.addEventListener("submit", async (e) =>{
        e.preventDefault();

        // Pega os IDs do formulário "form-cadastroLivro":
        const capaLivro = document.getElementById("capa-livro").value;

        const tituloLivro = document.getElementById("titulo-livro").value;
        const autorLivro = document.getElementById("autor-livro").value;
        const descricaoLivro = document.getElementById("descricao-livro").value;

        const generoLivro = document.getElementById("genero-livro").value;
        const anoLivro = document.getElementById("ano-livro").value;
        const isbn = document.getElementById("ISBN").value;
        const idiomaLivro = document.getElementById("idioma-livro").value;
        const tipoCapa = document.getElementById("tipos-capa").value;
        const numPaginas = document.getElementById("paginas-livro").value;
        const valorLivro = document.getElementById("valor-livro").value;

        // Validação dos campos do Formulário:
        if(
            !capaLivro      ||
            !descricaoLivro ||
            !tituloLivro    ||
            !autorLivro     ||
            !generoLivro    ||
            !anoLivro       ||
            !isbn           ||
            !idiomaLivro    ||
            !tipoCapa       ||
            !numPaginas     ||
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
        console.log("Cadastro válido! Enviando dados...");

        try{
            // Salva no Firebase em outra coleção
            const docRef = await addDoc(collection(db, "livros"),{
                capa: capaLivro,
                
                titulo: tituloLivro,
                autor: autorLivro,
                descricao: descricaoLivro,

                genero: generoLivro,
                ano: anoLivro,
                isbn: isbn,
                idioma: idiomaLivro,
                tipoCapa: tipoCapa,
                paginas: numPaginas,
                valor: parseFloat(valorLivro),
                disponibilidade: 'Disponivel',

                criadoPor: {
                    uid: usuarioLogado.uid,
                    //name: nomeusuário.name,
                    email: usuarioLogado.email
                },

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

function validarISBN(isbn) {
  // Remove hífens e espaços
  const limpo = isbn.replace(/[-\s]/g, '');

  // Apenas números
  if (!/^\d+$/.test(limpo)) return false;

  // Deve ter 10 ou 13 dígitos
  if (limpo.length !== 10 && limpo.length !== 13) return false;

  // Não permitir números repetidos (ex: 1111111111)
  if (/^(\d)\1+$/.test(limpo)) return false;

  // ISBN-10
  if (limpo.length === 10) {
    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += (10 - i) * parseInt(limpo[i]);
    }
    const digito = (11 - (soma % 11)) % 11;
    return digito === parseInt(limpo[9]);
  }

  // ISBN-13
  if (limpo.length === 13) {
    let soma = 0;
    for (let i = 0; i < 12; i++) {
      soma += parseInt(limpo[i]) * (i % 2 === 0 ? 1 : 3);
    }
    const digito = (10 - (soma % 10)) % 10;
    return digito === parseInt(limpo[12]);
  }

  return false;
}
