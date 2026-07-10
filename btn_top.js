document.addEventListener('DOMContentLoaded', function() {
    
    // 1. CRIA E INJETA O CSS DINAMICAMENTE NA PÁGINA
    const styleTag = document.createElement('style');
    styleTag.textContent = `
        /* Estilos base para o botão (Telas de Computador) */
        .back-to-top {
            position: fixed;
            bottom: 24px;
            right: 24px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background-color: #007bff;
            color: #ffffff;
            border: none;
            cursor: pointer;
            display: none; /* Oculto por padrão, aparece ao rolar */
            justify-content: center;
            align-items: center;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
            z-index: 9999;
            transition: background-color 0.3s, transform 0.2s, opacity 0.3s;
        }

        /* Efeito de hover normal */
        .back-to-top:hover {
            background-color: #0056b3;
            transform: scale(1.1);
        }

        /* Responsividade para Celulares e Telas Menores */
        @media (max-width: 768px) {
            .back-to-top {
                bottom: 16px;
                right: 16px;
                width: 42px;
                height: 42px;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
            }
            .back-to-top svg {
                width: 20px;
                height: 20px;
            }
        }
    `;
    document.head.appendChild(styleTag);

    // 2. CRIA O BOTÃO E O ÍCONE SVG
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = `        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">            <polyline points="18 15 12 9 6 15"></polyline>        </svg>    `;
    
    // 3. INSERE O BOTÃO NO CORPO DA PÁGINA
    document.body.appendChild(backToTopBtn);

    // 4. FUNÇÃO PARA CONTROLAR A EXIBIÇÃO AO ROLAR A PÁGINA
    window.onscroll = function() {
        // Pega a rolagem atual independente do navegador do usuário
        const scrollDoTopo = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;
        
        // Exibe o botão se rolar mais de 300 pixels para baixo
        if (scrollDoTopo > 300) {
            backToTopBtn.style.display = 'flex';
        } else {
            backToTopBtn.style.display = 'none';
        }
    };

    // 5. FUNÇÃO PARA VOLTAR AO TOPO COM ROLAGEM SUAVE
    backToTopBtn.onclick = function() {
        window.scrollTo({ top: 0,  behavior: 'smooth' });
    };
});
