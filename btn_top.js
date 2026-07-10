(function() {
  const btn_srltop = document.createElement('button');
    btn_srltop.className = 'back-to-top';
    btn_srltop.innerHTML = `        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">            <polyline points="18 15 12 9 6 15"></polyline>        </svg>   `;

  document.body.appendChild(btn_srltop);

  document.addEventListener('scroll', () => {
    if (window.scrollY > 120) {
      btn_srltop.display = 'flex';
    } else {
      btn_srltop.display = 'none';
    }
  });

  btn_srltop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  //btn_srltop.onmouseover = () => btn_srltop.style.backgroundColor = '#333';
  //btn_srltop.onmouseout = () => btn_srltop.style.backgroundColor = '#1a1a1a';
})();
