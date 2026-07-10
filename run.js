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


    function downloadBtn(idDoElemento) {
        const elementoBotao = document.getElementById(idDoElemento);
          if (elementoBotao && elementoBotao.getAttribute('href')) {
            const hrefValido = elementoBotao.getAttribute('href').trim();
            if (hrefValido !== "") {                return hrefValido;             }
        }
        return ""; 
    }


function formatarTamanho(bytes) {
        let numeroBytes = parseInt(bytes);
        if (isNaN(numeroBytes) || numeroBytes < 0) return "";
        if (numeroBytes === 0) return " (0 B)";
        // Unidades de armazenamento suportadas
        const unidades = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
        // Encontra o índice da unidade dividindo sucessivamente por 1024
        const indice = Math.floor(Math.log(numeroBytes) / Math.log(1024));
        // Calcula o valor final baseado no índice encontrado
        const valorCalculado = (numeroBytes / Math.pow(1024, indice)).toFixed(2);
        return ` (${valorCalculado} ${unidades[indice]})`;
 }




function verificarListaVazia(texto) {
    const textoMinusculo = texto.toLowerCase().trim();
    const termos = [  "lista vazia.",  "empty list",   "lista vacia."  ];
    if (termos.includes(textoMinusculo)) {        return `    <div class="aviso-vazio">      <svg xmlns="http://w3.org" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>    <span> ${texto} </span>    </div>`;    }
return texto;}



// --- CONFIGURAÇÕES E ESTADO GLOBAL ---
const body = document.body;
let currentTranslation = translations["pt"];

// Desativa o clique direito do mouse
body.oncontextmenu = () => false;

// --- ELEMENTOS DO DOM ---
const elements = {
  appTcss: document.getElementById('csscustom'),
  appCardInfo: document.getElementById('card_linkinf'),
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


    const icones = {
        nuvem: `<svg viewBox="0 0 24 24"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3z"/></svg>`,
        sucesso: `<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>`,
        erro: `<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>`
    };

    const traducoes = {
        pt: { disponivel: 'Disponível para download', indisponivel: 'Indisponível', erroRede: 'Erro de rede ou CORS', urlVazia: 'Link não informado' },
        en: { disponivel: 'Available for download', indisponivel: 'Unavailable', erroRede: 'Network error or CORS', urlVazia: 'URL not provided' },
        es: { disponivel: 'Disponible para descargar', indisponivel: 'No disponible', erroRede: 'Error de red o CORS', urlVazia: 'Enlace no informado' }
    };

    const card = elements.appCardInfo;
    card.className = 'card';
    card.innerHTML = `
        <div id="resultado" class="resultado-container">
            <div class="spinner"></div>
        </div>
    `;


    function verificarLink(iconeSugerido, idiomaSugerido, urlArquivo) {
        const elemento = document.getElementById('resultado');
        
        const lang = traducoes[idiomaSugerido] ? idiomaSugerido : 'pt';
        const texto = traducoes[lang];

        if (!urlArquivo || urlArquivo.trim() === "") {
            elemento.setAttribute('data-link', "");
			elemento.innerHTML = `<span class="status-erro">${icones.erro} ${texto.urlVazia}</span>`;
            return;
        }

		elemento.setAttribute('data-link', urlArquivo);
		
        fetch(urlArquivo, { method: 'HEAD' })
            .then(function(resposta) {
                if (resposta.ok) {
                     // Captura e calcula o tamanho usando a nova função com todas as escalas
                    const tamanhoBytes = resposta.headers.get('content-length');
                    const textoTamanho = formatarTamanho(tamanhoBytes);

					const iconeSucesso = icones[iconeSugerido] || icones.sucesso;
                    elemento.innerHTML = `<span class="status-sucesso">${iconeSucesso} ${texto.disponivel} <br/> ${textoTamanho}</span>`;
                } else {
                    elemento.innerHTML = `<span class="status-erro">${icones.erro} ${texto.indisponivel} (Erro ${resposta.status})</span>`;
                }
            })
            .catch(function(erro) {
                elemento.innerHTML = `<span class="status-erro">${icones.erro} ${texto.erroRede}</span>`;
            });
    }


// --- SISTEMA DE IDIOMAS (INTERNACIONAlIZAÇÃO) ---
function setLanguage(lang) {
  const t = translations[lang];
  
  if (!t) {
    return setLanguage("pt");
  }

  currentTranslation = t;
  localStorage.setItem("lang", lang);

verificarLink('nuvem', lang, downloadBtn('downloadBtn'));
	
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
  if (elements.newslistText) elements.newslistText.innerHTML = verificarListaVazia(t.NewslistText);
  if (elements.newslistTtitle) elements.newslistTtitle.textContent = verificarListaVazia(t.NewslistTitle);
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


