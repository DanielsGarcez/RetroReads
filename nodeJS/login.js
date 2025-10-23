/* Bloqueia o botão de 'Recuperar Senha' se o conteúdo estiver vazio ou invalido */

function validarCampo(){
    const emailValido = emailEstaValido();
    document.getElementById('RecuperarSenha').disabled = !emailValido;

    const senhaValida = senhaEstaValida();
    document.getElementById("botãoLogin").disabled = !emailValido || !senhaValida;
}


function emailEstaValido(){    
    const email = document.getElementById("username").value;
    if (!email){
        return false;
    }
    return validarEmail(email);
}

function senhaEstaValida(){
    const senha = document.getElementById("password").value;
    if(!senha){
        return false;
    }
    return true;
}

function validarEmail(email){
    return /\$+@\$+\.\$+/.test(email);
}