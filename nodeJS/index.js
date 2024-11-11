
// Alteração de Login/Cadastro

var btnSignin = document.querySelector("#signin");
var btnSignup = document.querySelector("#signup");

var body = document.querySelector("body");


btnSignin.addEventListener("click", function () {
   body.className = "sign-in-js"; 
});

btnSignup.addEventListener("click", function () {
    body.className = "sign-up-js";
});


/*visibilidade senha */
document.querySelectorAll('.olho-senha').forEach(item => {
    item.addEventListener('click', function() {
        const passwordField = document.getElementById(this.getAttribute('data-target'));
        
        if (passwordField.type === "password") {
            passwordField.type = "text";
            this.classList.remove("fa-eye");
            this.classList.add("fa-eye-slash");
        } else {
            passwordField.type = "password";
            this.classList.remove("fa-eye-slash");
            this.classList.add("fa-eye");
        }
    });
});




/* Filtros */
document.addEventListener("DOMContentLoaded", function() {
    // Seleciona as seções de Categorias e Faixa de Preço
    const categoria = document.querySelector('.categoria');
    const faixaPreco = document.querySelector('.faixa-preco');

    // Seleciona as listas dentro dessas seções
    const categoriasLista = categoria.querySelector('.categorias-lista');
    const faixaPrecoLista = faixaPreco.querySelector('.faixa-preco-lista');

    // Seleciona as setas dentro dos elementos h3
    const setaCategoria = categoria.querySelector('.seta');
    const setaFaixaPreco = faixaPreco.querySelector('.seta');

    // Função para alternar a visibilidade da lista de categorias e rotacionar a seta
    categoria.addEventListener('click', () => {
        categoriasLista.classList.toggle('mostrar'); // Alterna a classe mostrar
        setaCategoria.style.transform = categoriasLista.classList.contains('mostrar') ? 'rotate(180deg)' : 'rotate(0deg)'; // Rotaciona a seta
    });

    // Função para alternar a visibilidade da lista de faixa de preço e rotacionar a seta
    faixaPreco.addEventListener('click', () => {
        faixaPrecoLista.classList.toggle('mostrar'); // Alterna a classe mostrar
        setaFaixaPreco.style.transform = faixaPrecoLista.classList.contains('mostrar') ? 'rotate(180deg)' : 'rotate(0deg)'; // Rotaciona a seta
    });
});