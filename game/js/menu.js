var menuState = {
  create: function () {
      game.add.image(0,0,'background');

      var nameLabel = game.add.text(215,170,'Mega Coin',
          {font: '50px arial black',fill: '#da6a02'});
      nameLabel.anchor.setTo(0.5, 0.5);

      var scoreLabel = game.add.text(game.world.centerX,225, 'score: '+game.global.score,
          {font: '25px arial black',fill: '#da6a02'});
      scoreLabel.anchor.setTo(0.5, 0.5);

      var startLabel = game.add.text(60,game.world.height-30,
          'press Enter key to start', {font: '19px arial black',fill: '#da6a02'});

      var upKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

      upKey.onDown.addOnce(this.start, this);
  },
    
    start:function () {
        game.state.start('play');
    }
};