var animal = ["COELHO", "CACHORRO", "CAVALO", "PATO", "RINOCERONTE"];
var fruta = ["LARANJA", "KIWI", "BANANA", "MELANCIA", "ABACATE"];
var pais= ["BRASIL", "CHILE", "ARGENTINA", "ALEMANHA", "ANGOLA"];
var palavraLength = 0;
var rand = 0;
var palavraString = "";
var encontrou = false;
var erros = 0;
var x = "";



//Verifica a opção clicada e define a variavel x para a categoria selecionada
function categoriaOpcao() {
    if (document.getElementById("rad1").checked)
    {
        x = animal;
        document.getElementById("menuInicial").innerHTML = document.getElementById("telaJogo").innerHTML;
        start()
    }
    else if (document.getElementById("rad2").checked)
    {
        x = fruta;
        document.getElementById("menuInicial").innerHTML = document.getElementById("telaJogo").innerHTML;
        start()
    }
    else if (document.getElementById("rad3").checked)
    {
        x = pais;
        document.getElementById("menuInicial").innerHTML = document.getElementById("telaJogo").innerHTML;
        start()
    }

}



//Inicia a função do inicio do jogo com a variável x definida
function start() {

    document.getElementById("tecladoBtnA").style.display = "block";
    document.getElementById("tecladoBtnB").style.display = "block";
    document.getElementById("tecladoBtnC").style.display = "block";
    document.getElementById("fimJogo").style.display = "none";
    gerateclado();
    erros = 0;
    pontosFuncao();

    if (x[0] != null) //Enquanto a categoria não for vazia, gerar palavras aleatória dentro do array
    {
        rand = Math.floor(Math.random()*x.length);
        palavraLength = x[rand].length;
        palavraString = x[rand].toString();
    }
    else    //Caso vazia, limpa a tela e envia a mensagem
    {
        limpaTela();
        document.getElementById("tela").innerHTML = "Fim de Palavras";

    }

    for (i=0; i<14; i++) //Limpa as palavras da ID letra
    {
        document.getElementById("letra"+i).innerHTML = "";
    }

    for (i=0; i<palavraLength; i++) //Gera a quantidade de traços para a quantidade de letras da palavra gerada
    {
        document.getElementById("letra"+i).innerHTML = "___";
    }

    if (x.length>=0)
    {
        deletaPalavra();
    }
}

//inicia a função de limpeza de tela
function limpaTela() {

    for (i=0; i<14; i++)
    {
        document.getElementById("tela").innerHTML = "";

    }
    document.getElementById("tecladoBtnA").innerHTML = "";
    document.getElementById("tecladoBtnB").innerHTML = "";
    document.getElementById("tecladoBtnC").innerHTML = "";
}

//inicia a função de gerar teclado na tela

function gerateclado()
{
    document.getElementById("Q").style.display = "inline-block";
    document.getElementById("W").style.display = "inline-block";
    document.getElementById("E").style.display = "inline-block";
    document.getElementById("R").style.display = "inline-block";
    document.getElementById("T").style.display = "inline-block";
    document.getElementById("Y").style.display = "inline-block";
    document.getElementById("U").style.display = "inline-block";
    document.getElementById("I").style.display = "inline-block";
    document.getElementById("O").style.display = "inline-block";
    document.getElementById("P").style.display = "inline-block";

    document.getElementById("A").style.display = "inline-block";
    document.getElementById("S").style.display = "inline-block";
    document.getElementById("D").style.display = "inline-block";
    document.getElementById("F").style.display = "inline-block";
    document.getElementById("G").style.display = "inline-block";
    document.getElementById("H").style.display = "inline-block";
    document.getElementById("J").style.display = "inline-block";
    document.getElementById("K").style.display = "inline-block";
    document.getElementById("L").style.display = "inline-block";

    document.getElementById("Z").style.display = "inline-block";
    document.getElementById("X").style.display = "inline-block";
    document.getElementById("C").style.display = "inline-block";
    document.getElementById("V").style.display = "inline-block";
    document.getElementById("B").style.display = "inline-block";
    document.getElementById("N").style.display = "inline-block";
    document.getElementById("M").style.display = "inline-block";
}

//inicia a função de deletar a palavra do array para cada rodada
function deletaPalavra() {
    x.splice(rand,1);
}


//inicia a função de preencher as letras clicadas em suas respectivas posições
function cliqueLetra(lt) {

    for (i=0; i<palavraLength; i++)
    {

        if (palavraString.charAt(i) == lt)
        {
            document.getElementById("letra"+i).innerHTML = lt;
            encontrou = true;

        }
        else
        {
            document.getElementById(lt).style.display = "none";

        }
    }

    //Para cada letra clicada incorreta, gera uma contagem de erros
    if (encontrou==false)
    {
        erros++;
        console.log(erros);
    }
    encontrou = false;
    pontosFuncao();



}

//inicia a função de mensagem de fim de jogo na tela

function fimJogo(){
    document.getElementById("fimJogo").style.display = "block";

}


//inicia a função de animação conforme ocorre a contagem de erros
function pontosFuncao() {

    document.getElementById("pontos").innerHTML = "Erros: "+erros;

        switch (erros){
            case 0:document.getElementById("animacaoImg").src = "img/imgInicio.png";
                break;
            case 1: document.getElementById("animacaoImg").src = "img/imgCabeca.png";
                break;
            case 2: document.getElementById("animacaoImg").src = "img/imgTronco.png";
                break;
            case 3: document.getElementById("animacaoImg").src = "img/imgBracoEsq.png";
                break;
            case 4: document.getElementById("animacaoImg").src = "img/imgBracoInteiro.png";
                break;
            case 5: document.getElementById("animacaoImg").src = "img/imgPernaEsq.png";
                break;
            case 6: document.getElementById("animacaoImg").src = "img/imgCorpoInteiro.png";
                break;
            case 7: document.getElementById("animacaoImg").src = "img/imgFim.png";
                fimJogo();
                document.getElementById("tecladoBtnA").style.display = "none";
                document.getElementById("tecladoBtnB").style.display = "none";
                document.getElementById("tecladoBtnC").style.display = "none";
                break;
        }

}

