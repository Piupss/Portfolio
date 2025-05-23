// A funcionalidade de mostrar/ocultar as informações de contato é puramente CSS agora
// com base no hover. As linhas abaixo foram removidas para não conflitar.
 const contactTitle = document.querySelector('.contact-title');
 const contactInfo = document.querySelector('.contact-info');
 
 contactTitle.addEventListener('click', () => {
     contactInfo.classList.toggle('show');
 });

// --- Funcionalidade do Menu Hambúrguer ---
const hamburgerButton = document.querySelector('.hamburger-menu');
const mainNav = document.querySelector('header nav'); // Seleciona a tag <nav> dentro do <header>
const navLinks = document.querySelectorAll('header nav ul li a'); // Seleciona todos os links da navegação

hamburgerButton.addEventListener('click', () => {
    mainNav.classList.toggle('active'); // Alterna a classe 'active' na navegação
    // Opcional: Alternar ícone do hambúrguer (X ou barras)
    const hamburgerIcon = hamburgerButton.querySelector('i');
    if (mainNav.classList.contains('active')) {
        hamburgerIcon.classList.remove('fa-bars');
        hamburgerIcon.classList.add('fa-times'); // Ícone de 'X'
        hamburgerButton.setAttribute('aria-expanded', 'true');
    } else {
        hamburgerIcon.classList.remove('fa-times');
        hamburgerIcon.classList.add('fa-bars'); // Ícone de barras
        hamburgerButton.setAttribute('aria-expanded', 'false');
    }
});

// Fechar o menu ao clicar em um link (para navegação mobile)
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (mainNav.classList.contains('active')) { // Apenas se o menu estiver aberto
            mainNav.classList.remove('active'); // Fecha o menu
            // Retorna o ícone do hambúrguer para barras
            const hamburgerIcon = hamburgerButton.querySelector('i');
            hamburgerIcon.classList.remove('fa-times');
            hamburgerIcon.classList.add('fa-bars');
            hamburgerButton.setAttribute('aria-expanded', 'false');
        }
    });
});


// --- Funcionalidade de Likes, Dislikes e Comentários com persistência e edição ---

// Selecionar os elementos HTML necessários usando os IDs que adicionamos
const likeButton = document.getElementById('like-button');
const likeCountSpan = document.getElementById('like-count');
const dislikeButton = document.getElementById('dislike-button');
const dislikeCountSpan = document.getElementById('dislike-count');
const commentButton = document.getElementById('comment-section');
const commentCountSpan = document.getElementById('comment-count');

const commentsBox = document.getElementById('comments-box');
const newCommentInput = document.getElementById('new-comment-input');
const addCommentButton = document.getElementById('add-comment-button');
const commentsList = document.getElementById('comments-list');

// Variáveis para armazenar as contagens e comentários
let likeCount = 0;
let dislikeCount = 0;
let comments = []; // Array para armazenar os comentários

// Variáveis para controlar se o usuário já curtiu/descurtiu
let hasLiked = false;
let hasDisliked = false;

// --- Funções para LocalStorage ---

function saveCounts() {
    localStorage.setItem('likeCount', likeCount);
    localStorage.setItem('dislikeCount', dislikeCount);
    localStorage.setItem('hasLiked', hasLiked);
    localStorage.setItem('hasDisliked', hasDisliked);
}

function loadCounts() {
    likeCount = parseInt(localStorage.getItem('likeCount')) || 0;
    dislikeCount = parseInt(localStorage.getItem('dislikeCount')) || 0;
    hasLiked = localStorage.getItem('hasLiked') === 'true';
    hasDisliked = localStorage.getItem('hasDisliked') === 'true';

    // Atualiza o estado visual dos botões
    if (hasLiked) {
        likeButton.classList.add('active');
    } else {
        likeButton.classList.remove('active');
    }

    if (hasDisliked) {
        dislikeButton.classList.add('active');
    } else {
        dislikeButton.classList.remove('active');
    }
}

function saveComments() {
    localStorage.setItem('comments', JSON.stringify(comments));
}

function loadComments() {
    const storedComments = localStorage.getItem('comments');
    if (storedComments) {
        comments = JSON.parse(storedComments);
        renderComments(); // Renderiza os comentários carregados
    }
}

// --- Funções de Renderização e Atualização ---

// Função para atualizar o texto das contagens na interface
function updateCountsDisplay() {
    likeCountSpan.innerText = likeCount >= 1000 ? (likeCount / 1000) + 'K' : likeCount;
    dislikeCountSpan.innerText = dislikeCount === 0 ? 'Dislike' : dislikeCount;
    commentCountSpan.innerText = comments.length; // Usa o tamanho do array de comentários
}

// Função para renderizar/re-renderizar a lista de comentários
function renderComments() {
    commentsList.innerHTML = ''; // Limpa a lista antes de renderizar
    comments.forEach((comment, index) => {
        const commentItem = document.createElement('li');
        commentItem.dataset.index = index; // Adiciona um índice para referência

        const commentTextSpan = document.createElement('span');
        commentTextSpan.classList.add('comment-text');
        commentTextSpan.innerText = comment;

        const editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.classList.add('comment-input-edit');
        editInput.value = comment;

        const actionsDiv = document.createElement('div');
        actionsDiv.classList.add('comment-actions');

        const editButton = document.createElement('button');
        editButton.classList.add('edit-button');
        editButton.innerHTML = '<i class="fas fa-edit"></i> Editar';
        editButton.addEventListener('click', () => editComment(index, commentTextSpan, editInput, actionsDiv, commentItem));

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-button');
        deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i> Deletar';
        deleteButton.addEventListener('click', () => deleteComment(index));

        const saveButton = document.createElement('button');
        saveButton.classList.add('save-button');
        saveButton.innerHTML = '<i class="fas fa-save"></i> Salvar';
        saveButton.addEventListener('click', () => saveEdit(index, editInput, commentTextSpan, actionsDiv, commentItem));

        const cancelButton = document.createElement('button');
        cancelButton.classList.add('cancel-button');
        cancelButton.innerHTML = '<i class="fas fa-times-circle"></i> Cancelar';
        cancelButton.addEventListener('click', () => cancelEdit(commentTextSpan, editInput, actionsDiv, commentItem));

        actionsDiv.appendChild(editButton);
        actionsDiv.appendChild(deleteButton);
        actionsDiv.appendChild(saveButton);
        actionsDiv.appendChild(cancelButton);

        commentItem.appendChild(commentTextSpan);
        commentItem.appendChild(editInput);
        commentItem.appendChild(actionsDiv);
        commentsList.appendChild(commentItem);
    });
    updateCountsDisplay(); // Atualiza a contagem de comentários na sidebar
}

// --- Funções de Ação de Comentários ---

function addComment() {
    const newCommentText = newCommentInput.value.trim();

    if (newCommentText !== '') {
        comments.push(newCommentText);
        newCommentInput.value = '';
        saveComments();
        renderComments(); // Re-renderiza para mostrar o novo comentário
        commentsList.scrollTop = commentsList.scrollHeight; // Scroola para o último
    }
}

function deleteComment(index) {
    if (confirm('Tem certeza que deseja deletar este comentário?')) {
        comments.splice(index, 1); // Remove o comentário do array
        saveComments();
        renderComments(); // Re-renderiza a lista
    }
}

function editComment(index, commentTextSpan, editInput, actionsDiv, commentItem) {
    commentItem.classList.add('editing');
    editInput.value = commentTextSpan.innerText; // Coloca o texto atual no input de edição
    editInput.focus(); // Foca no input de edição
}

function saveEdit(index, editInput, commentTextSpan, actionsDiv, commentItem) {
    const updatedText = editInput.value.trim();
    if (updatedText !== '') {
        comments[index] = updatedText; // Atualiza o comentário no array
        saveComments();
        commentItem.classList.remove('editing');
        renderComments(); // Re-renderiza para refletir a mudança
    } else {
        alert('O comentário não pode ser vazio!');
        editInput.focus();
    }
}

function cancelEdit(commentTextSpan, editInput, actionsDiv, commentItem) {
    commentItem.classList.remove('editing');
    // Não precisa renderizar novamente, apenas reverte o estado visual
}


// --- Event Listeners (existente) ---

// Likes e Dislikes
likeButton.addEventListener('click', () => {
    if (hasLiked) {
        likeCount--;
        hasLiked = false;
        likeButton.classList.remove('active');
    } else {
        likeCount++;
        hasLiked = true;
        likeButton.classList.add('active');
        if (hasDisliked) {
            dislikeCount--;
            hasDisliked = false;
            dislikeButton.classList.remove('active');
        }
    }
    updateCountsDisplay();
    saveCounts(); // Salva no localStorage
});

dislikeButton.addEventListener('click', () => {
    if (hasDisliked) {
        dislikeCount--;
        hasDisliked = false;
        dislikeButton.classList.remove('active');
    } else {
        dislikeCount++;
        hasDisliked = true;
        dislikeButton.classList.add('active');
        if (hasLiked) {
            likeCount--;
            hasLiked = false;
            likeButton.classList.remove('active');
        }
    }
    updateCountsDisplay();
    saveCounts(); // Salva no localStorage
});

// Mostrar/Esconder caixa de comentários
commentButton.addEventListener('click', () => {
    commentsBox.style.display = commentsBox.style.display === 'flex' ? 'none' : 'flex';
});

const floatingSidebar = document.querySelector('.floating-sidebar');

document.addEventListener('click', (event) => {
    // Verifica se o clique não foi dentro da sidebar E não foi dentro da commentsBox
    // E se a commentsBox está visível
    if (!floatingSidebar.contains(event.target) && !commentsBox.contains(event.target) && commentsBox.style.display === 'flex') {
        commentsBox.style.display = 'none';
    }
});


// Adicionar Comentário
addCommentButton.addEventListener('click', addComment);
newCommentInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        addComment();
    }
});

// Opcional: Adicionar funcionalidade para os outros projetos serem clicáveis
document.querySelectorAll('.clickable-image').forEach(image => {
    image.addEventListener('click', () => {
        const url = image.dataset.url;
        if (url) {
            window.open(url, '_blank');
        }
    });
});

// --- Inicialização ao carregar a página ---
document.addEventListener('DOMContentLoaded', () => {
    loadCounts(); // Carrega contagens do localStorage
    loadComments(); // Carrega comentários do localStorage
    updateCountsDisplay(); // Atualiza a exibição inicial
});