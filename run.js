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



// Elementos
  const appTcss = document.getElementById('csscustom');

  const appTitle = document.getElementById('app-title');
  const downloadText = document.getElementById('downloadText');
  const versionText = document.getElementById('version');
  const screenshotsTitle = document.getElementById('screenshots-title');
  const resourcesTitle = document.getElementById('resources-title');
  const aboutTitle = document.getElementById('about-title');
  const aboutText = document.getElementById('about-text');
  const resourceslistText = document.getElementById('resources-list');

  const newslistText = document.getElementById('news-list');
  const newslistTtitle = document.getElementById('news-title');

  const langPtBtn = document.getElementById('lang-pt');
  const langEsBtn = document.getElementById('lang-es');
  const langEnBtn = document.getElementById('lang-en');


var t_lanf=translations["pt"];

const body = document.body;
body.oncontextmenu=function() { return false; };


  // Função para trocar idioma
  function setLanguage(lang) {
    t_lanf = translations[lang];
    const t = translations[lang];
     if (t){  
   localStorage.setItem("lang", lang);
appTcss.innerHTML = "<style> #lang-"+lang+" {  background: #fff;    color: #007BFF;   opacity:0.7;  pointer-events:none;  }  </style>";
         
    appTitle.textContent = t.appTitle;
    downloadText.textContent = t.downloadText;
    versionText.textContent = t.version;
    screenshotsTitle.textContent = t.screenshotsTitle;
    resourcesTitle.textContent = t.resourcesTitle;
    aboutTitle.textContent = t.aboutTitle;
    aboutText.textContent = t.aboutText;
    resourceslistText.innerHTML = t.resourceslistText;
    newslistText.innerHTML = t.NewslistText;
    newslistTtitle.textContent = t.NewslistTitle;
     }    else {  setLanguage("pt");   }
  }

  // Event listeners
  langPtBtn.onclick = () => setLanguage('pt');
  langEsBtn.onclick = () => setLanguage('es');
  langEnBtn.onclick = () => setLanguage('en');


  // Inicializa em português
if(localStorage.getItem("lang")!=""){  setLanguage(localStorage.getItem("lang"));  }  else {  setLanguage('pt');   }  


  // Modal
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modal-img');
  const modalTxt = document.getElementById('modal-txt');
  const closeModal = document.getElementById('closeModal');

  document.querySelectorAll('#gallery img').forEach(img => {
    img.onclick = () => {
      modal.style.display = 'block';
      modalImg.src = img.dataset.full || img.src;
      modalImg.alt = img.alt;
      modalTxt.innerHTML="";
      body.style.overflow="hidden";
        if (t_lanf){
          modalTxt.innerHTML="<br/>"+t_lanf["screenshotsTitle"]+": "+img.dataset.ig+"<br/><br/>";
        }
   };
  });

  closeModal.onclick = () => {
    modal.style.display = 'none';
      modalImg.src = "";
      modalImg.alt = "";
      modalTxt.innerHTML="";
      body.style.overflow="auto";
  };

  window.onclick = (event) => {
    if (event.target == modal) {
      modal.style.display = 'none';
       modalImg.src = "";
      modalImg.alt = "";
       modalTxt.innerHTML="";
        body.style.overflow="auto";
  }
  };


if(localStorage.getItem('tema') === 'escuro') {   body.classList.add('dark');       } else {   body.classList.remove('dark');      }




  // Seleciona todas as abas
  const tabs = document.querySelectorAll('.tab');
  // Seleciona todas as áreas de conteúdo
  const contents = document.querySelectorAll('.tab-content');

if (tabs){
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove a classe ativa de todas as abas
      tabs.forEach(t => t.classList.remove('active'));
      // Adiciona a classe ativa na aba clicada
      tab.classList.add('active');

      const target = tab.getAttribute('data-tab');

      // Oculta todas as abas de conteúdo
     if(contents){
     contents.forEach(content => {
        content.classList.remove('active');
        if(content.id === target){
          content.classList.add('active');
        }
      });
      }
    });
  });
  
  }



