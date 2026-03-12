  let currentLang = 'pt'; 

  const body = document.body;

  const appTcss = document.getElementById('csscustom');

  const titleEl = document.getElementById('title');
  const messageEl = document.getElementById('message');
  const homeLinkEl = document.getElementById('home-link');
  const iconContainer = document.getElementById('error-icon');
  
  function setLanguage(lang) {
    currentLang = lang;
    const msg = messages[lang];
    if (msg && messages){  
    localStorage.setItem("lang", currentLang);

    appTcss.innerHTML = "<style> [data-lang=\""+lang+"\"] {  background: #e0e0e0 !important;   opacity:0.7;  pointer-events:none;  }  </style>";

    titleEl.innerHTML = msg.title;
    messageEl.innerHTML = msg.message;
    homeLinkEl.innerHTML = msg.home;
    iconContainer.innerHTML = msg.icon;
      }  else {  setLanguage("pt");   }
  }

  document.querySelectorAll('.language-selector button').forEach(btn => {
    if(btn){
    btn.addEventListener('click', () => {
      setLanguage(btn.dataset.lang);
    });   }
  });

  if(localStorage.getItem("lang")!=""){  setLanguage(localStorage.getItem("lang"));  }  else {  setLanguage(currentLang);   }


if(localStorage.getItem('tema') === 'escuro') {   body.classList.add('dark');       } else {   body.classList.remove('dark');      }



