/* Bloqueia o botão de 'Recuperar Senha' e 'Entrar' se o conteúdo estiver vazio ou invalido */
function validarCampo(){
    const emailValido = validarUsuario();
    document.getElementById('RecuperarSenha').disabled = !emailValido;

    const senhaValida = validarSenha();
    document.getElementById("botãoLogin").disabled = !senhaValida;
}

// Função que verifica se o usuário inseriu um email
function validarUsuario(){    
    const email = document.getElementById("username").value;
    if (!email){
        return false;
    }
    return validarEmail(email);
}

// Função que valida a senha
function validarSenha(){
    const senha = document.getElementById("password").value;
    return senha.length > 0;
}

// Função que valida o email
function validarEmail(email){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Função de login do usuário
function login(){
    firebase.auth().signInWithEmailAndPassword("any@email.com", "123456").then(response =>{
        console.log('Sucesso!', response)
    }).catch(error =>{
        console.log('Erro', error)
    })
}