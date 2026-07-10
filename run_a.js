// --- CONFIGURAÇÕES E ESTADO GLOBAL ---
const body = document.body;
let currentLang = 'pt';

// --- ELEMENTOS DO DOM ---
const elements = {
  appTcss: document.getElementById('csscustom'),
  appnames: document.getElementById('nameapp'),
  titleEl: document.getElementById('title'),
  messageEl: document.getElementById('message'),
  homeLinkEl: document.getElementById('home-link'),
  iconContainer: document.getElementById('error-icon'),
  langButtons: document.querySelectorAll('.language-selector button')
};

// --- SISTEMA DE IDIOMAS ---
function setLanguage(lang) {
  // Garante que os objetos de tradução existam antes de prosseguir
  if (typeof messages === 'undefined' || typeof translations === 'undefined') return;

  const msg = messages[lang];
  const translation = translations[lang];

  // Se o idioma não existir, força o retorno para português de forma limpa
  if (!msg || !translation) {
    return setLanguage("pt");
  }

  currentLang = lang;
  localStorage.setItem("lang", currentLang);

  // Injeta o estilo do botão ativo usando Template Strings
  if (elements.appTcss) {
    elements.appTcss.innerHTML = `
      <style> 
        [data-lang="${lang}"] { 
          background: #e0e0e0 !important; 
          opacity: 0.7; 
          pointer-events: none; 
        } 
      </style>`;
  }

  // Atualiza a interface de forma segura (apenas se os elementos existirem)
  if (elements.appnames) elements.appnames.textContent = translation.appTitle;
  if (elements.titleEl) elements.titleEl.innerHTML = msg.title;
  if (elements.messageEl) elements.messageEl.innerHTML = msg.message;
  if (elements.homeLinkEl) elements.homeLinkEl.innerHTML = msg.home;
  if (elements.iconContainer) elements.iconContainer.innerHTML = `<br/><br/>${msg.icon}`;
}

// --- EVENTOS ---
// Configura o clique em todos os botões de idioma encontrados
elements.langButtons.forEach(btn => {
  btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
});

// --- INICIALIZAÇÃO DA APLICAÇÃO ---
function init() {
  // Inicializa o Tema (Claro/Escuro)
  if (body) {
    const savedTheme = localStorage.getItem('tema');
    body.classList.toggle('dark', savedTheme === 'escuro');
  }

  // Inicializa o Idioma salvo ou usa o padrão
  const savedLang = localStorage.getItem("lang");
  setLanguage(savedLang && savedLang !== "" ? savedLang : currentLang);


  (function() {
    // 1. Cria o botão dinamicamente
    const backToTopBtn = document.createElement('button');
    
    // 2. Adiciona a classe CSS estrutural
    backToTopBtn.className = 'back-to-top';
    
    // 3. Insere o ícone SVG nativo
    backToTopBtn.innerHTML = `
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
    `;
    
    // 4. Insere o botão no corpo da página
    document.body.appendChild(backToTopBtn);

    // 5. Função para controlar a exibição ao rolar a página
    window.onscroll = function() {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            backToTopBtn.style.display = 'flex';
        } else {
            backToTopBtn.style.display = 'none';
        }
    };

    // 6. Função para voltar ao topo com rolagem suave
    backToTopBtn.onclick = function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
})();

  
}

// Executa a inicialização
init();
