
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
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('header-categorias').addEventListener('click', () => {
        document.getElementById('categorias-lista').classList.toggle('hidden');
    });

    document.getElementById('header-faixa-preco').addEventListener('click', () => {
        document.getElementById('faixa-preco-lista').classList.toggle('hidden');
    });
});