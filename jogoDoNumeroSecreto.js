function criarJogoDoNumeroSecreto(min = 1, max = 10) {
    let listaDeNumerosSorteados = [];
    let numeroSecreto = gerarNumeroAleatorio(min, max);
    let tentativas = 0;

    function gerarNumeroSecreto(min, max) {
        let numeroAleatorio = gerarNumeroAleatorio(min, max);
        if(listaDeNumerosSorteados.length == max - min + 1){
            listaDeNumerosSorteados = [];
        }
        
        if(listaDeNumerosSorteados.includes(numeroAleatorio)){
            return gerarNumeroSecreto(min, max);
        }
        listaDeNumerosSorteados.push(numeroAleatorio);
        return numeroAleatorio;
    }

    function gerarNumeroAleatorio(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;  
    }

    function pluralizarTentativa(qtd) {
        return qtd > 1 ? 'tentativas' : 'tentativa';
    }

    return {
        verificarChute: function(chute) {
            tentativas++;
            if (chute === numeroSecreto) {
                return {
                    acertou: true,
                    mensagem: `Você descobriu o número secreto com ${tentativas} ${pluralizarTentativa(tentativas)}!`
                };
            }
            return {
                acertou: false,
                dica: chute > numeroSecreto ? 'menor' : 'maior'
            };
        },
        reiniciar: function() {
            numeroSecreto = gerarNumeroSecreto(min, max);
            tentativas = 0;
        },
        getTentativas: () => tentativas,
        getNumeroSecreto: () => numeroSecreto, // útil para debug
        getListaNumerosSorteados: () => listaDeNumerosSorteados
    };
}
