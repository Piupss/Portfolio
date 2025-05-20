// Seleciona o título e o contêiner das informações de contato
const contactTitle = document.querySelector('.contact-title');
const contactInfo = document.querySelector('.contact-info');

// Adiciona um ouvinte de evento de clique ao título
contactTitle.addEventListener('click', () => {
    contactInfo.style.display = contactInfo.style.display === 'none' ? 'block' : 'none';
});

// --- Funcionalidade de Likes, Dislikes e Comentários na Sidebar ---

// 1. Selecionar os elementos HTML necessários usando os IDs que adicionamos
const likeButton = document.getElementById('like-button');
const likeCountSpan = document.getElementById('like-count');
const dislikeButton = document.getElementById('dislike-button');
const dislikeCountSpan = document.getElementById('dislike-count'); // Corrigido para refletir o ID no HTML
const commentButton = document.getElementById('comment-section'); // O botão de comentar é o item inteiro
const commentCountSpan = document.getElementById('comment-count');

const commentsBox = document.getElementById('comments-box'); // O contêiner principal da caixa de comentários
const newCommentInput = document.getElementById('new-comment-input'); // O campo de texto para novo comentário
const addCommentButton = document.getElementById('add-comment-button'); // O botão para adicionar comentário
const commentsList = document.getElementById('comments-list'); // A lista onde os comentários serão exibidos

// 2. Inicializar as contagens
// Vamos ler os valores iniciais do HTML. "11K" será tratado como 11000.
let likeCount = parseInt(likeCountSpan.innerText.replace('K', '')) * 1000;
let dislikeCount = dislikeCountSpan.innerText === 'Dislike' ? 0 : parseInt(dislikeCountSpan.innerText); // Se for "Dislike", começa com 0
let commentCount = parseInt(commentCountSpan.innerText);

// Variáveis para controlar se o usuário já curtiu/descurtiu (apenas nesta sessão)
let hasLiked = false;
let hasDisliked = false;

// Função para atualizar o texto das contagens na interface
function updateCountsDisplay() {
    // Exibe likeCount formatado se for >= 1000, senão exibe o número exato
    likeCountSpan.innerText = likeCount >= 1000 ? (likeCount / 1000) + 'K' : likeCount;
    // Exibe dislikeCount, se 0 exibe 'Dislike', senão exibe o número
    dislikeCountSpan.innerText = dislikeCount === 0 ? 'Dislike' : dislikeCount;
    // Exibe commentCount
    commentCountSpan.innerText = commentCount;
}

// 3. Adicionar Event Listeners para Like e Dislike
likeButton.addEventListener('click', () => {
    if (hasLiked) {
        // Se já curtiu, remove a curtida
        likeCount--;
        hasLiked = false;
        likeButton.classList.remove('active'); // Remove a classe 'active' visual
    } else {
        // Se não curtiu, adiciona a curtida
        likeCount++;
        hasLiked = true;
        likeButton.classList.add('active'); // Adiciona a classe 'active' visual

    // Se tinha descurtido antes, remove o deslike
    if (hasDisliked) {
        dislikeCount--;
        hasDisliked = false;
        dislikeButton.classList.remove('active'); // Remove a classe 'active' visual
    }
}
    updateCountsDisplay(); // Atualiza a exibição dos números
});

dislikeButton.addEventListener('click', () => {
    if (hasDisliked) {
        // Se já descurtiu, remove o deslike
        dislikeCount--;
        hasDisliked = false;
        dislikeButton.classList.remove('active'); // Remove a classe 'active' visual
    } else {
        // Se não descurtiu, adiciona o deslike
        dislikeCount++;
        hasDisliked = true;
        dislikeButton.classList.add('active'); // Adiciona a classe 'active' visual

    // Se tinha curtido antes, remove o like
    if (hasLiked) {
        likeCount--;
        hasLiked = false;
    likeButton.classList.remove('active'); // Remove a classe 'active' visual
    }
}
    updateCountsDisplay(); // Atualiza a exibição dos números
});


// 4. Adicionar Event Listener para o Botão de Comentário (mostrar/esconder caixa)
commentButton.addEventListener('click', () => {
    // Alterna a visibilidade da caixa de comentários
        if (commentsBox.style.display === 'flex') {
    commentsBox.style.display = 'none'; // Esconde se estiver visível
        } else {
    commentsBox.style.display = 'flex'; // Mostra se estiver escondido
    }
});

// Opcional: Fechar a caixa de comentários clicando fora dela
document.addEventListener('click', (event) => {
    // Verifica se o clique não foi dentro da sidebar OU dentro da commentsBox
        if (!floatingSidebar.contains(event.target) && !commentsBox.contains(event.target) && commentsBox.style.display === 'flex') {
    commentsBox.style.display = 'none'; // Esconde a caixa de comentários
}
});

// Precisamos selecionar a floatingSidebar para a lógica acima funcionar
const floatingSidebar = document.querySelector('.floating-sidebar');


// 5. Adicionar Event Listener para o Botão "Enviar" Comentário
addCommentButton.addEventListener('click', () => {
    const newCommentText = newCommentInput.value.trim(); // Pega o texto do input e remove espaços extras

    if (newCommentText !== '') { // Verifica se o campo não está vazio
        // Cria um novo elemento <li> para o comentário
        const newCommentItem = document.createElement('li');
        newCommentItem.innerText = newCommentText; // Define o texto do comentário

    // Adiciona o novo comentário à lista de comentários
    commentsList.appendChild(newCommentItem);

    // Limpa o campo de input
    newCommentInput.value = '';

    // Incrementa a contagem de comentários e atualiza a exibição
    commentCount++;
    updateCountsDisplay();

    // Opcional: Scroolar para o último comentário adicionado
    commentsList.scrollTop = commentsList.scrollHeight;
    }
});

// Opcional: Adicionar comentário ao pressionar Enter no campo de input
newCommentInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault(); // Previne a quebra de linha padrão
        addCommentButton.click(); // Simula o clique no botão "Enviar"
    }
});


// --- Funcionalidade existente (remover ou integrar se necessário) ---
// Seleciona o título e o contêiner das informações de contato
// const contactTitle = document.querySelector('.contact-title'); // Já selecionado no HTML
// const contactInfo = document.querySelector('.contact-info'); // Esta classe não existe no HTML fornecido

// Adiciona um ouvinte de evento de clique ao título (Manter se contactTitle existir no HTML)
// if (contactTitle) {
//     contactTitle.addEventListener('click', () => {
//         // Esta lógica assumia que havia um .contact-info para mostrar/esconder
//         // Se o objetivo é rolar para a seção de contato, o link href="#contact" já faz isso.
//         // Se precisar de uma funcionalidade diferente, me diga.
//     });
// }


// Inicializa a exibição das contagens ao carregar a página
updateCountsDisplay();