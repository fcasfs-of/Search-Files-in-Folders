  let currentLang = 'pt'; 

  const body = document.body;

  const appTcss = document.getElementById('csscustom');
  const appnames = document.getElementById('nameapp');

  const titleEl = document.getElementById('title');
  const messageEl = document.getElementById('message');
  const homeLinkEl = document.getElementById('home-link');
  const iconContainer = document.getElementById('error-icon');
  
  function setLanguage(lang) {
    if (iconContainer && homeLinkEl && messageEl && titleEl && appnames && appTcss){
    currentLang = lang;
    const msg = messages[lang];
    if (msg && messages && translations){  
    localStorage.setItem("lang", currentLang);

    appnames.innerHTML = ""+translations[currentLang].appTitle+"";
    appTcss.innerHTML = "<style> [data-lang=\""+lang+"\"] {  background: #e0e0e0 !important;   opacity:0.7;  pointer-events:none;  }  </style>";

    titleEl.innerHTML = msg.title;
    messageEl.innerHTML = msg.message;
    homeLinkEl.innerHTML = msg.home;
    iconContainer.innerHTML = "<br/><br/>"+msg.icon;
      }  else {  setLanguage("pt");   }   }
  }

  document.querySelectorAll('.language-selector button').forEach(btn => {
    if(btn){
    btn.addEventListener('click', () => {
      setLanguage(btn.dataset.lang);
    });   }
  });

  if(localStorage.getItem("lang")!=""){  setLanguage(localStorage.getItem("lang"));  }  else {  setLanguage(currentLang);   }


if(body){   if(localStorage.getItem('tema') === 'escuro') {   body.classList.add('dark');       } else {   body.classList.remove('dark');      }    }



