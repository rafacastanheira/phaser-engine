var loadState = {
    preload: function () {
        var loadingLabel = game.add.text(game.world.centerX,150, 'loading...',
            {font: '30px Arial', fill: '#ffffff'});
        loadingLabel.anchor.setTo(0.5, 0.5);

        var progressBar = game.add.sprite(game.world.centerX,200,'progressBar');
        progressBar.anchor.setTo(0.5,0.5);
        game.load.setPreloadSprite(progressBar);

        game.load.spritesheet('player','../assets/char.png',30,30);
        game.load.image('wallV', '../assets/wallVertical.png');
        game.load.image('wallH', '../assets/wallHorizontal.png');
        game.load.spritesheet('coin', '../assets/coin2.png',25,25);
        game.load.spritesheet('enemy', '../assets/enemy2.png',30,30);
        game.load.image('background', '../assets/background2.png');

        game.load.audio('jump', '../assets/jump.mp3');
        game.load.audio('coin', '../assets/coin.mp3');
        game.load.audio('dead', '../assets/dead.mp3');

    },
    
    create: function () {
        game.state.start('menu');

    }
};