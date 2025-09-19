(function () {
    const MIN_NUMERO = 1;
    const MAX_NUMERO = 50;

    const jogo = criarJogoDoNumeroSecreto(MIN_NUMERO, MAX_NUMERO);
    const inputChute = document.querySelector('input');
    const btnChutar = document.getElementById('chutar');
    const btnReiniciar = document.getElementById('reiniciar');

    function exibirMensagem(seletor, mensagem) {
        document.querySelector(seletor).textContent = mensagem;
        //responsiveVoice.speak(mensagem, 'Brazilian Portuguese Female', {rate:1.2}); //biblioteca do responsive voice
        
        if ('speechSynthesis' in window) {
            let utterance = new SpeechSynthesisUtterance(mensagem); //Web Speech API
            utterance.lang = 'pt-BR'; 
            utterance.rate = 1.2; 
            window.speechSynthesis.speak(utterance); 
        } else {
            console.log("Web Speech API não suportada neste navegador.");
        }
    }

    function exibirMensagemInicial() {
        exibirMensagem('h1', 'Jogo do Número Secreto');    
        exibirMensagem('p', `Escolha um número entre ${MIN_NUMERO} e ${MAX_NUMERO}`);        
    }

    function limparCampo() {
        inputChute.value = '';
    }

    function iniciarJogo() {
        jogo.reiniciar();        
        exibirMensagemInicial();
        limparCampo();
        btnReiniciar.disabled = true;
        btnChutar.disabled = false;
        console.log("(DEBUG) Número secreto:", jogo.getNumeroSecreto());
        console.log("(DEBUG) Lista de números sorteados:", jogo.getListaNumerosSorteados());
    }

    btnChutar.addEventListener('click', function() {
        const chute = Number(inputChute.value);
        const resultado = jogo.verificarChute(chute);

        if (resultado.acertou) {
            exibirMensagem('h1', 'Acertou!');
            exibirMensagem('p', resultado.mensagem);
            btnReiniciar.disabled = false;
            btnChutar.disabled = true;
        } else {
            exibirMensagem('p', `O número secreto é ${resultado.dica}!`);
            limparCampo();
        }
    });

    btnReiniciar.addEventListener('click', iniciarJogo);

    iniciarJogo();
})();