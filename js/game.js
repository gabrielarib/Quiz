/* VARIAVEIS DE CONTROLE DO NOSSO JOGO */
let perguntasFeitas = [];
var pontuacao=0;

//PERGUNTAS DO JOGO
const perguntas = [
  //PERGUNTA 0
  {
    pergunta:
      "Quantas Copas do Mundo o Brasil já disputou?",
    respostas: ["22", "20", "17", "24"],
    correta: "resp0"
  },
  //PERGUNTA 1
  {
    pergunta: "Na Copa de 2022, qual animal é estampado no uniforme dos jogadores brasileiros?",
    respostas: ["Onça-Pintada", "Mico-leão-dourado", "Lobo-Guará", "Tamanduá-Bandeira"],
    correta: "resp0"
  },
  //PERGUNTA 2
  {
    pergunta: "Quais países da chave de grupo do Brasil (Sérvia, Suiça e Camarões) jogaram contra ele na Copa de 2018?",
    respostas: [
      "Sérvia e Suiça",
      "Sérvia e Camarões",
      "Suiça e Camarões",
      "Todos os países"
    ],
    correta: "resp0"
  },
  //PERGUNTA 3
  {
    pergunta:
      "Quantas copas o Brasil ganhou?",
    respostas: ["5", "4", "6", "3"],
    correta: "resp0"
  },
  //PERGUNTA 4
  {
    pergunta: "Quantas vezes o Brasil não foi para copa?",
    respostas: ["Sempre foi", "2", "3", "1"],
    correta: "resp0"
  },
  {
    pergunta: "Com quantos anos Pelé ganhou sua primeira Copa?",
    respostas: ["21", "17", "22", "24"],
    correta: "resp1"
  },
  {
    pergunta: "A quantos gols Neymar está para se igualar a Pelé -com 77 gols pela seleção brasileira?",
    respostas: ["7", "6", "4", "3"],
    correta: "resp2"
  },
  {
    pergunta: "Quando se inicia a Copa do Mundo 2022?",
    respostas: ["20 de novembro", "18 de novembro", "18 de dezembro", "22 de novembro"],
    correta: "resp0"
  },
  {
    pergunta: "Quem é o jogador com mais número de jogos pela seleção brasileira?",
    respostas: ["Ronaldo", "Neymar", "Pelé", "Cafu"],
    correta: "resp3"
  },
  {
    pergunta: "Onde o Brasil conquistou o Penta?",
    respostas: ["Coreia do Sul e Japão", "África do Sul", "Alemanha", "França"],
    correta: "resp0"
  }
];

var qtdPerguntas = perguntas.length - 1;

gerarPergunta(qtdPerguntas);

function gerarPergunta(maxPerguntas) {
  //GERAR UM NUMERO ALEATORIO
  let aleatorio = (Math.random() * maxPerguntas).toFixed();
  //CONVERTER PARA NUMERO
  aleatorio = Number(aleatorio);
  //MOSTRAR NO CONSOLE QUAL FOI A PERGUNTA SORTEADA
  console.log("A pergunta sorteado foi a: " + aleatorio);

  //VERIFICAR SE A PERGUNTA SORTEADA JÁ FOI FEITA
  if (!perguntasFeitas.includes(aleatorio)) {
    //COLOCAR COMO PERGUNTA FEITA
    perguntasFeitas.push(aleatorio);

    //PREENCHER O HTML COM OS DADOS DA QUESTAO SORTEADA
    var p_selecionada = perguntas[aleatorio].pergunta;
    console.log(p_selecionada);

    //ALIMENTAR A PERGUNTA VINDA DO SORTEIO
    $("#pergunta").html(p_selecionada);
    $("#pergunta").attr("data-indice", aleatorio);

    //COLOCAR AS RESPOSTAS
    for (var i = 0; i < 4; i++) {
      $("#resp" + i).html(perguntas[aleatorio].respostas[i]);
    }

    /*var resp0 = perguntas[aleatorio].respostas[0];
          var resp1 = perguntas[aleatorio].respostas[1];
          var resp2 = perguntas[aleatorio].respostas[2];
          var resp3 = perguntas[aleatorio].respostas[3];
  
          $("#resp0").html(resp0);
          $("#resp1").html(resp1);
          $("#resp2").html(resp2);
          $("#resp3").html(resp3); */

    //EMBARALHAR AS RESPOSTAS
    var pai = $("#respostas");
    var botoes = pai.children();

    for (var i = 1; i < botoes.length; i++) {
      pai.append(botoes.eq(Math.floor(Math.random() * botoes.length)));
    }
  } else {
    //SE A PERGUNTA JÁ FOI FEITA
    console.log("A pergunta já foi feita. Sorteando novamente...");
    if (perguntasFeitas.length < qtdPerguntas + 1) {
      return gerarPergunta(maxPerguntas);
    } else {
      var audiotetra = document.getElementById("audiotetra");
	  audiotetra.play();
      $("#novoJogo").addClass("oculto");

      setTimeout(function () {
        $("#novoJogo").removeClass("oculto");
    }, 9000);

      $("#quiz").addClass("oculto");
      $("#mensagem").html("Parabéns você acertou " +pontuacao +"/" +perguntas.length +" perguntas!");
      $("#status").removeClass("oculto");
    }
  }
}

$(".resposta").click(function () {
  if ($("#quiz").attr("data-status") !== "travado") {
    //PERCORRER TODAS AS RESPOSTAS E DESMARCAR A CLASSE SELECIONADA
    resetaBotoes();

    //ADICIONAR A CLASSE SELECIONADA
    $(this).addClass("selecionada");
  }
});

$("#confirm").click(function () {
  //PEGAR O INDICE DA PERGUNTA
  var indice = $("#pergunta").attr("data-indice");

  //QUAL É A RESPOSTA CERTA
  var respCerta = perguntas[indice].correta;

  //QUAL FOI A RESPOSTA QUE O USUARIO SELECIONOU
  $(".resposta").each(function () {
    if ($(this).hasClass("selecionada")) {
      var respostaEscolhida = $(this).attr("id");

      if (respCerta == respostaEscolhida) {
        $("#quiz").attr("data-status", "travado");
        $("#confirm").addClass("oculto");
        $("#" + respostaEscolhida).removeClass("selecionada");
        $("#" + respCerta).addClass("correta");
        var audio = document.getElementById("audio");
		audio.play();
        

        setTimeout(function () {
            pontuacao++;
            proximaPergunta();
            $("#quiz").attr("data-status", "ok");
            $("#confirm").removeClass("oculto");
        }, 1000);

      } else {
        $("#quiz").attr("data-status", "travado");
        $("#confirm").addClass("oculto");
        $("#" + respCerta).addClass("correta");
        $("#" + respostaEscolhida).removeClass("selecionada");
        $("#" + respostaEscolhida).addClass("errada");

        setTimeout(function () {
            proximaPergunta();
            $("#quiz").attr("data-status", "ok");
            $("#confirm").removeClass("oculto");
        }, 2000);


      }
    }
  });
});

function newGame() {
    pontuacao=0;
  $("#confirm").removeClass("oculto");
  $("#quiz").attr("data-status", "ok");
  perguntasFeitas = [];
  resetaBotoes();
  gerarPergunta(qtdPerguntas);
  $("#quiz").removeClass("oculto");
  $("#status").addClass("oculto");
}

function proximaPergunta() {
  resetaBotoes();
  gerarPergunta(qtdPerguntas);
}

function resetaBotoes() {
  //PERCORRER TODAS AS RESPOSTAS E DESMARCAR A CLASSE SELECIONADA
  $(".resposta").each(function () {
    if ($(this).hasClass("selecionada")) {
      $(this).removeClass("selecionada");
    }
    if ($(this).hasClass("correta")) {
      $(this).removeClass("correta");
    }
    if ($(this).hasClass("errada")) {
      $(this).removeClass("errada");
    }
  });
}


$("#novoJogo").click(function () {
  newGame();
});
