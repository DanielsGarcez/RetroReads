/* Bloqueia o botão de 'Recuperar Senha' e 'Entrar' se o conteúdo estiver vazio ou invalido */

function validarCampo(){
    const emailValido = validarUsuario();
    document.getElementById('RecuperarSenha').disabled = !emailValido;

    const senhaValida = validarSenha();
    document.getElementById("botãoLogin").disabled = !senhaValida;
}


function validarUsuario(){    
    const email = document.getElementById("username").value;
    if (!email){
        return false;
    }
    return validarEmail(email);
}

function validarSenha(){
    const senha = document.getElementById("password").value;
    return senha.length > 0;
}

function validarEmail(email){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}