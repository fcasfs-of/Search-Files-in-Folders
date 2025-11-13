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




  // Variáveis de suporte
  const translations = {
    pt: {
      appTitle: "Buscar Arquivo em Pastas",
      downloadText: "Baixar o Aplicativo",
      version: "Versão atual: "+dversion,
      screenshotsTitle: "Capturas de Tela",
      resourcesTitle: "Recursos",
      aboutTitle: "Sobre o Aplicativo",
      aboutText: "O aplicativo permite selecionar uma pasta, escolher o formato do arquivo, inserir um texto e buscar os arquivos correspondentes na pasta.",
      resourceslistText:"<li>Escolha uma pasta</li><li>Selecione o formato do arquivo</li><li>Insira o texto desejado</li><li>Clique no botão Buscar</li>",
      NewslistText:"",
      NewslistTitle:"Novas Funcionalidades da Nova Versão"
    },
    es: {
      appTitle: "Buscar Archivo en Carpetas",
      downloadText: "Descargar la Aplicación",
      version: "Versión actual: "+dversion,
      screenshotsTitle: "Capturas de Pantalla",
      resourcesTitle: "Recursos",
      aboutTitle: "Acerca de la Aplicación",
      aboutText: "La aplicación permite seleccionar una carpeta, elegir el formato del archivo, ingresar un texto y buscar los archivos correspondientes en la carpeta.",
      resourceslistText:"<li>Elige una carpeta</li><li>Selecciona el formato de archivo</li><li>Introduce el texto deseado</li><li>Haz clic en el botón Examinar</li>",
      NewslistText:"",
      NewslistTitle:"Nuevas Características de la Nueva Versión"
    },
    en: {
      appTitle: "Search Files in Folders",
      downloadText: "Download App",
      version: "Current version: "+dversion,
      screenshotsTitle: "Screenshots",
      resourcesTitle: "Features",
      aboutTitle: "About the App",
      aboutText: "The app allows selecting a folder, choosing the file format, entering text, and searching files in the folder.",
      resourceslistText:"<li>Choose a folder</li><li>Select the file format</li><li>Enter the desired text</li><li>Click the Browse button</li>",
      NewslistText:"",
      NewslistTitle:"New Features of the New Version"
    }
  };

  // Elementos
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

