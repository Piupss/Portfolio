// Seleciona o título e o contêiner das informações de contato
const contactTitle = document.querySelector('.contact-title');
const contactInfo = document.querySelector('.contact-info');

// Adiciona um ouvinte de evento de clique ao título
contactTitle.addEventListener('click', () => {
    contactInfo.style.display = contactInfo.style.display === 'none' ? 'block' : 'none';
});