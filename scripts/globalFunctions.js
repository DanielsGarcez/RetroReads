// Funçãõ que carrega a tela de carregameto
export async function carregarLoading() {
  //espera o html carregar
  const response = await fetch('/RetroReads/pages/fetch/TelaCarregamento.html');
  const html = await response.text();

  //cria um elemneto no html chamado 'section'
  const container = document.createElement('section');
  //insere o elemento no html
  container.innerHTML = html;

  document.body.appendChild(container);
}

// Função que deixa as letras em maiúsculo
export function capitalizarPalavras(str) {
  return str.toLowerCase().replace('-',' ').split(' ').map(function(word) {
    return (word.charAt(0).toUpperCase() + word.slice(1));
  }).join(' ');
}

// Função de mostrar a Tela de Loading
export function mostrarLoading() {
  const telaLoading = document.getElementById('sobrepor-carregamento');
  if (telaLoading) telaLoading.style.display = 'flex';
  console.log("Abriu Loading")
}

// Função de esconder a Tela de Loading
export function esconderLoading() {
  const telaLoading = document.getElementById('sobrepor-carregamento');
  if (telaLoading) telaLoading.remove(); // remove do DOM
  console.log("Fechou Loading")
}


