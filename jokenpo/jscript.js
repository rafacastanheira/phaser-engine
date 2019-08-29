var jogadorPts = 0;
var computadorPts = 0;
//
document.getElementById('pedra').onclick=opcaoPedra;
document.getElementById('papel').onclick=opcaoPapel;
document.getElementById('tesoura').onclick=opcaoTesoura;
document.getElementById('reset').onclick=resetGame;


//
function opcaoPedra() {
    play('Pedra');
}

function opcaoPapel() {
    play('Papel');
}

function opcaoTesoura() {
    play('Tesoura');
}

//Função randomica
function getCompChoice() {
    var choices = ['Pedra', 'Papel', 'Tesoura'];
    var compChooses = choices[Math.floor(Math.random() * choices.length)];
    return compChooses;
}

//Inicia o jogo
function play(userPlay) {

    //Pega a função random
    var compChoice = getCompChoice();


    document.getElementById('resultadoJogador').innerHTML = 'Você jogou ' + userPlay + '.';
    document.getElementById('resultadoComputador').innerHTML = 'O computador jogou ' +  compChoice + '.';

    //Determina o resultado
    if (userPlay == 'Pedra') {
        if (compChoice == 'Pedra') {
            document.getElementById('vencedor').innerHTML = "Deu empate!";
        }



        else if (compChoice == 'Papel') {
            document.getElementById('vencedor').innerHTML = 'Computador venceu!';
            document.getElementById('imgVencedor').innerHTML = '<img class="btn" src="img/papelPedra.png">';
            computadorPts++;
        }

        else if (compChoice == 'Tesoura') {
            document.getElementById('vencedor').innerHTML = "Você venceu!";
            document.getElementById('imgVencedor').innerHTML = '<img class="btn" src="img/pedraTesoura.png">';
            jogadorPts++;
        }

    }

    else if (userPlay == 'Papel') {
        if (compChoice == 'Papel') {
            document.getElementById('vencedor').innerHTML = "Deu empate!";
        }

        else if (compChoice == 'Pedra') {
            document.getElementById('vencedor').innerHTML = "Você venceu!";
            document.getElementById('imgVencedor').innerHTML = '<img class="btn" src="img/papelPedra.png">';
            jogadorPts++;
        }

        else if (compChoice == 'Tesoura') {
            document.getElementById('vencedor').innerHTML = "Computador Venceu!";
            document.getElementById('imgVencedor').innerHTML = '<img class="btn" src="img/tesouraPapel.png">';
            computadorPts++;
        }
    }

    else if (userPlay == 'Tesoura') {
        if (compChoice == 'Tesoura') {
            document.getElementById('vencedor').innerHTML = "Deu empate!";
        }

        else if (compChoice == 'Pedra') {
            document.getElementById('vencedor').innerHTML = "Computador venceu!";
            document.getElementById('imgVencedor').innerHTML = '<img class="btn" src="img/pedraTesoura.png">';
            computadorPts++;
        }

        else if (compChoice == 'Papel') {
            document.getElementById('vencedor').innerHTML = "You venceu!";
            document.getElementById('imgVencedor').innerHTML = '<img class="btn" src="img/tesouraPapel.png">';
            jogadorPts++;
        }
    }

//Placar
    document.getElementById('placarJogador').innerHTML = jogadorPts;
    document.getElementById('placarComputador').innerHTML = computadorPts;

};

//Reseta o jogo
function resetGame () {
    jogadorPts = 0;
    computadorPts= 0;
    document.getElementById('placarJogador').innerHTML = jogadorPts;
    document.getElementById('placarComputador').innerHTML = computadorPts;
    document.getElementById('imgVencedor').innerHTML = "";
};