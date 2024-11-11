document.addEventListener('DOMContentLoaded', () => {
    // Elementos das categorias e faixa de preço
    const categoriaHeader = document.querySelector('.categoria h3');
    const faixaPrecoHeader = document.querySelector('.faixa-preco h3');

    // Elementos das listas de categorias e faixa de preço
    const categoriasLista = document.querySelector('.categorias-lista');
    const faixaPrecoLista = document.querySelector('.faixa-preco-lista');

    // Elementos das setas
    const setaCategoria = categoriaHeader.querySelector('.seta');
    const setaFaixaPreco = faixaPrecoHeader.querySelector('.seta');

    // Função para alternar a visibilidade das listas
    const toggleLista = (lista, seta) => {
        lista.classList.toggle('mostrar');
        seta.classList.toggle('abrir'); // Alterna a rotação da seta
    };

    // Evento de clique nas categorias
    categoriaHeader.addEventListener('click', () => {
        toggleLista(categoriasLista, setaCategoria);
    });

    // Evento de clique na faixa de preço
    faixaPrecoHeader.addEventListener('click', () => {
        toggleLista(faixaPrecoLista, setaFaixaPreco);
    });
});




// Icon checkbox
document.addEventListener('DOMContentLoaded', () => {
    // Elementos das categorias (checkboxes)
    const checkboxes = document.querySelectorAll('.categoria-checkbox');
    
    checkboxes.forEach(checkbox => {
        const icon = checkbox.nextElementSibling; // Seleciona o ícone ao lado do checkbox

        // Função para atualizar o ícone conforme o estado do checkbox
        const updateIcon = () => {
            if (checkbox.checked) {
                icon.classList.remove('fa-thin', 'fa-circle-check');
                icon.classList.add('fa-solid', 'fa-circle-check');
            } else {
                icon.classList.remove('fa-solid', 'fa-circle-check');
                icon.classList.add('fa-thin', 'fa-circle-check');
            }
        };

        // Verifica o estado do checkbox no carregamento
        updateIcon();

        // Evento para alterar o ícone quando o checkbox for clicado
        checkbox.addEventListener('change', () => {
            // Desmarcar todas as outras categorias
            checkboxes.forEach(otherCheckbox => {
                if (otherCheckbox !== checkbox) {
                    otherCheckbox.checked = false;  // Desmarca as outras
                    const otherIcon = otherCheckbox.nextElementSibling;
                    otherIcon.classList.remove('fa-solid', 'fa-circle-check');
                    otherIcon.classList.add('fa-thin', 'fa-circle-check');
                }
            });

            // Atualiza o ícone da categoria atual
            updateIcon();
        });
    });
});


// Elementos da faixa de preço (checkboxes)
const faixaPrecoCheckboxes = document.querySelectorAll('.faixa-preco-checkbox');

faixaPrecoCheckboxes.forEach(checkbox => {
    const label = checkbox.parentElement; // Pega o label da faixa de preço
    const icon = label.querySelector('i'); // Seleciona o ícone ao lado do checkbox

    // Função para atualizar o ícone conforme o estado do checkbox
    const updateFaixaPrecoIcon = () => {
        if (checkbox.checked) {
            icon.classList.remove('fa-thin', 'fa-circle-check');
            icon.classList.add('fa-solid', 'fa-circle-check');
        } else {
            icon.classList.remove('fa-solid', 'fa-circle-check');
            icon.classList.add('fa-thin', 'fa-circle-check');
        }
    };

    // Verifica o estado do checkbox no carregamento
    updateFaixaPrecoIcon();

    // Evento para alterar o ícone quando o checkbox for clicado
    checkbox.addEventListener('change', () => {
        // Desmarcar todas as outras faixas de preço
        faixaPrecoCheckboxes.forEach(otherCheckbox => {
            if (otherCheckbox !== checkbox) {
                otherCheckbox.checked = false;  // Desmarca as outras
                const otherIcon = otherCheckbox.parentElement.querySelector('i');
                otherIcon.classList.remove('fa-solid', 'fa-circle-check');
                otherIcon.classList.add('fa-thin', 'fa-circle-check');
            }
        });

        // Atualiza o ícone da faixa de preço atual
        updateFaixaPrecoIcon();
    });
});