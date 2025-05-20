// Espera o DOM carregar completamente antes de executar o script
document.addEventListener('DOMContentLoaded', () => {

    // Obtém referências para os elementos usando seus IDs
    const likeItem = document.getElementById('like-item');
    const likeCountSpan = document.getElementById('like-count');
    const dislikeItem = document.getElementById('dislike-item');
    const commentItem = document.getElementById('comment-item');
    const commentCountSpan = document.getElementById('comment-count');

    // --- Variáveis de Contagem ---
    // Inicializa as contagens em zero
    let currentLikes = 0;
    let currentDislikes = 0;
    let currentComments = 0; // Variável declarada

    // --- Funções Auxiliares ---

    // Função para formatar a contagem de volta para string (ex: "11K")
    function formatLikeCount(count) {
        if (count >= 1000) {
            return (count / 1000).toFixed(1) + 'K';
        }
        return count.toString();
    }

    // Função para atualizar a exibição da contagem de likes no HTML
    function updateLikeDisplay() {
        likeCountSpan.textContent = formatLikeCount(currentLikes);
    }

     // Função para atualizar a exibição da contagem de comentários no HTML
    function updateCommentDisplay() {
        commentCountSpan.textContent = currentComments.toString();
    }

    // --- Inicialização ---
    updateLikeDisplay();
    updateCommentDisplay();

    // --- Event Listeners ---

    // Adiciona evento de clique para o item de Like
    likeItem.addEventListener('click', () => {
        if (likeItem.classList.contains('liked')) {
            currentLikes--;
            likeItem.classList.remove('liked');
            console.log('Like removido!');
        } else {
            currentLikes++;
            likeItem.classList.add('liked');
            console.log('Like adicionado!');

            if (dislikeItem.classList.contains('disliked')) {
                currentDislikes--;
                dislikeItem.classList.remove('disliked');
                console.log('Dislike removido ao curtir!');
            }
        }
        updateLikeDisplay();
    });

    // Adiciona evento de clique para o item de Dislike
    dislikeItem.addEventListener('click', () => {
         if (dislikeItem.classList.contains('disliked')) {
             currentDislikes--;
             dislikeItem.classList.remove('disliked');
             console.log('Dislike removido!');
         } else {
              currentDislikes++;
              dislikeItem.classList.add('disliked');
              console.log('Dislike adicionado!');

             if (likeItem.classList.contains('liked')) {
                currentLikes--;
                likeItem.classList.remove('liked');
                console.log('Like removido ao descurtir!');
             }
         }
         updateLikeDisplay();
    });

    // Adiciona evento de clique para o item de Comentário
    commentItem.addEventListener('click', () => {
        // --- Lógica para a barra de comentários ---
        // Implemente aqui a funcionalidade desejada, por exemplo:
        // - Mostrar/Esconder uma seção de comentários na página.
        // - Abrir um modal de comentários.
        // - Redirecionar para uma página de comentários.

        // Exemplo simples: Apenas loga no console e adiciona/remove classe visual
        console.log('Botão de Comentários clicado! Implemente a lógica aqui.');

        // Opcional: Adiciona uma classe para feedback visual (alterna a classe)
        commentItem.classList.toggle('commenting');

        // Se você quiser que a contagem de comentários seja interativa (apenas visualmente aqui):
        currentComments++;
        updateCommentDisplay();
    });

}); // Fim do DOMContentLoaded
