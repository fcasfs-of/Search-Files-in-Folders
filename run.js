function carregarTudo(listaRecursos) {   if(listaRecursos){
    listaRecursos.forEach(item => {
        const destinoStr = item.destino; 
        const tag = item.tag;           
        const atributos = item.atributos; 
        const elementoPai = document.getElementsByTagName(destinoStr)[0];
        if (!elementoPai) {            return;        }
        const elemento = document.createElement(tag);
        for (const chave in atributos) {
            if (atributos.hasOwnProperty(chave)) {                elemento.setAttribute(chave, atributos[chave]);            }
        }
        elementoPai.appendChild(elemento);
    });     }
}



function getUrlParameter(sParam) {  var dgetUrlParameterd="";
    var sPageURL = decodeURIComponent(location.href);//window.location.search.substring(1));
   if(sPageURL.split('?')){
       var sURLVariables = sPageURL.split('?')[1].split('&');
       if(sPageURL.split('?')[1].split('&')){
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if(sURLVariables[i].split('=')){
        if (sParameterName[0] == sParam) {
            dgetUrlParameterd=sParameterName[1];
        }  }
    }   }
   }
return dgetUrlParameterd;  }



// --- CONFIGURAÇÕES E ESTADO GLOBAL ---
const body = document.body;
let currentTranslation = translations["pt"];

// Desativa o clique direito do mouse
body.oncontextmenu = () => false;

// --- ELEMENTOS DO DOM ---
const elements = {
  appTcss: document.getElementById('csscustom'),
  appTitle: document.getElementById('app-title'),
  downloadText: document.getElementById('downloadText'),
  versionText: document.getElementById('version'),
  screenshotsTitle: document.getElementById('screenshots-title'),
  resourcesTitle: document.getElementById('resources-title'),
  aboutTitle: document.getElementById('about-title'),
  aboutText: document.getElementById('about-text'),
  resourceslistText: document.getElementById('resources-list'),
  newslistText: document.getElementById('news-list'),
  newslistTtitle: document.getElementById('news-title'),
  langPtBtn: document.getElementById('lang-pt'),
  langEsBtn: document.getElementById('lang-es'),
  langEnBtn: document.getElementById('lang-en'),
  modal: document.getElementById('modal'),
  modalImg: document.getElementById('modal-img'),
  modalTxt: document.getElementById('modal-txt'),
  closeModal: document.getElementById('closeModal'),
  galleryImages: document.querySelectorAll('#gallery img'),
  tabs: document.querySelectorAll('.tab'),
  contents: document.querySelectorAll('.tab-content')
};

// --- SISTEMA DE IDIOMAS (INTERNACIONAlIZAÇÃO) ---
function setLanguage(lang) {
  const t = translations[lang];
  
  if (!t) {
    return setLanguage("pt");
  }

  currentTranslation = t;
  localStorage.setItem("lang", lang);

  // Injeta o estilo para destacar o botão do idioma ativo
  if (elements.appTcss) {
    elements.appTcss.innerHTML = `
      <style> 
        #lang-${lang} { 
          background: #fff; 
          color: #007BFF; 
          opacity: 0.7; 
          pointer-events: none; 
        } 
      </style>`;
  }

  // Atualiza os textos da interface de forma segura
  if (elements.appTitle) elements.appTitle.textContent = t.appTitle;
  if (elements.downloadText) elements.downloadText.textContent = t.downloadText;
  if (elements.versionText) elements.versionText.textContent = t.version;
  if (elements.screenshotsTitle) elements.screenshotsTitle.textContent = t.screenshotsTitle;
  if (elements.resourcesTitle) elements.resourcesTitle.textContent = t.resourcesTitle;
  if (elements.aboutTitle) elements.aboutTitle.textContent = t.aboutTitle;
  if (elements.aboutText) elements.aboutText.textContent = t.aboutText;
  if (elements.resourceslistText) elements.resourceslistText.innerHTML = t.resourceslistText;
  if (elements.newslistText) elements.newslistText.innerHTML = t.NewslistText;
  if (elements.newslistTtitle) elements.newslistTtitle.textContent = t.NewslistTitle;
}

// Ouvintes de clique para troca de idioma
if (elements.langPtBtn) elements.langPtBtn.addEventListener('click', () => setLanguage('pt'));
if (elements.langEsBtn) elements.langEsBtn.addEventListener('click', () => setLanguage('es'));
if (elements.langEnBtn) elements.langEnBtn.addEventListener('click', () => setLanguage('en'));

// --- CONTROLE DO MODAL DA GALERIA ---
function openModal(img) {
  if (!elements.modal) return;

  elements.modal.style.display = 'block';
  body.style.overflow = "hidden";

  if (elements.modalImg) {
    elements.modalImg.src = img.dataset.full || img.src;
    elements.modalImg.alt = img.alt;
  }

  if (elements.modalTxt && currentTranslation) {
    const title = currentTranslation["screenshotsTitle"] || "";
    const info = img.dataset.ig || "";
    elements.modalTxt.innerHTML = `<br/>${title}: ${info}<br/><br/>`;
  }
}

function closeModal() {
  if (!elements.modal) return;

  elements.modal.style.display = 'none';
  body.style.overflow = "auto";

  if (elements.modalImg) {
    elements.modalImg.src = "";
    elements.modalImg.alt = "";
  }
  if (elements.modalTxt) {
    elements.modalTxt.innerHTML = "";
  }
}

// Configura os eventos do modal
elements.galleryImages.forEach(img => {
  img.addEventListener('click', () => openModal(img));
});

if (elements.closeModal) {
  elements.closeModal.addEventListener('click', closeModal);
}

window.addEventListener('click', (event) => {
  if (event.target === elements.modal) {
    closeModal();
  }
});

// --- SISTEMA DE ABAS (TABS) ---
elements.tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.getAttribute('data-tab');

    // Remove classe ativa de todas as abas
    elements.tabs.forEach(t => t.classList.remove('active'));
    // Ativa a aba atual
    tab.classList.add('active');

    // Mostra/Oculta os conteúdos correspondentes
    elements.contents.forEach(content => {
      if (content.id === target) {
        content.classList.add('active');
      } else {
        content.classList.remove('active');
      }
    });
  });
});

// --- INICIALIZAÇÃO DA APLICAÇÃO ---
function init() {
carregarTudo([
	{
        destino: 'body',  tag: 'script',   
        atributos: {    
            'src': 'btn_top.js'
        }
    }
]);

	
  // Inicializa o Tema (Claro/Escuro)
  const savedTheme = localStorage.getItem('tema');
  body.classList.toggle('dark', savedTheme === 'escuro');

  // Inicializa o Idioma
  const savedLang = localStorage.getItem("lang");
  setLanguage(savedLang && savedLang !== "" ? savedLang : 'pt');
}

// Executa a inicialização
init();


