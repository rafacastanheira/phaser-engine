var playState = {
    create: function(){

        this.cursor = game.input.keyboard.createCursorKeys();
        this.player = game.add.sprite(game.world.centerX, game.world.centerY, 'player');
        this.player.anchor.setTo(0.5, 0.5);
        game.physics.arcade.enable(this.player);
        this.player.body.gravity.y = 600;
        this.player.animations.add('right', [1,2,3], 8, true);
        this.player.animations.add('left', [4,5,6], 8, true);



        this.coin = game.add.sprite(60,140,'coin');
        game.physics.arcade.enable(this.coin);
        this.coin.anchor.setTo(0.5,0.5);
        this.coin.animations.add('right', [0,1,2,3,4,5,6,7,8,9], 8, true);

        this.enemies = game.add.group();
        this.enemies.enableBody = true;
        this.enemies.createMultiple(10, 'enemy');/* cria 10 inimigos com o 'enemy' sprite no grupo
        Os inimigos são criados já mortos, então não ficam visíveis no jogo */



        // Display the score
        this.scoreLabel = game.add.text(30,30,'score:0',{font: '18px Arial', fill: '#ffffff'});
        game.global.score = 0;


        this.createWorld();
        game.time.events.loop(2200,this.addEnemy,this); // chama 1 inimigo a cada 2.2 sec


        this.jumpSound = game.add.audio('jump');
        this.coinSound = game.add.audio('coin');
        this.deadSound = game.add.audio('dead');





    },
    update: function(){
        game.physics.arcade.collide(this.player, this.walls);
        game.physics.arcade.overlap(this.player, this.coin, this.takeCoin, null, this);
        game.physics.arcade.overlap(this.player, this.enemies, this.playerDie, null, this);
        game.physics.arcade.collide(this.enemies, this.walls);

        this.coin.animations.play('right');





        if (!this.player.inWorld){
            this.playerDie();
        }

        this.movePlayer();
        this.enemy = new Array(10);

        for (i=0; i<10; i++)
        {
            this.enemy[i] = this.enemies.getAt(i);

        }
        for (i=0; i<10; i++)
        {
            if (this.enemy[i].body.velocity.x<100){

                this.enemy[i].animations.play('left');

            }
            else
            {
                this.enemy[i].animations.play('right');
            }
        }
    },

    movePlayer: function(){
        if (this.cursor.left.isDown){
            this.player.body.velocity.x = -200;
            this.player.animations.play('left');
        }
        else if (this.cursor.right.isDown){
            this.player.body.velocity.x = 200;
            this.player.animations.play('right');
        }
        else{
            this.player.body.velocity.x = 0;
            this.player.animations.stop();
            this.player.frame = 0;
        }

        if (this.cursor.up.isDown && this.player.body.touching.down ){
            this.player.body.velocity.y = -320;
            this.jumpSound.play();
        }
        if (this.cursor.down.isDown && !this.player.body.touching.down ){
            this.player.body.velocity.y = -320;
            this.jumpSound.play();
        }
    },

    createWorld: function () {

        this.walls = game.add.group();
        this.walls.enableBody = true; // Add Arcade physics to the whole group

        game.add.sprite(0,0,'wallV',0,this.walls); //Left Wall
        game.add.sprite(480,0,'wallV',0,this.walls); //Right
        game.add.sprite(0,0,'wallH',0,this.walls); // Top Left
        game.add.sprite(300,0,'wallH',0,this.walls); //Top Right
        game.add.sprite(0,320,'wallH',0,this.walls); //Bottom Left
        game.add.sprite(300,320,'wallH',0,this.walls); //Bottom Right

        game.add.sprite(-100,160,'wallH',0,this.walls); //Middle Left
        game.add.sprite(400,160,'wallH',0,this.walls); //Middle Right

        var middleTop = game.add.sprite(100,80,'wallH',0,this.walls);
        middleTop.scale.setTo(1.5,1);
        var middleBottom = game.add.sprite(100,240,'wallH',0,this.walls);
        middleBottom.scale.setTo(1.5,1);


        this.walls.setAll('body.immovable',true);
    },

    playerDie: function () {
        this.deadSound.play();
        game.state.start('menu');
    },

    takeCoin: function(){
        game.global.score += 5;
        this.scoreLabel.text = 'score: '+game.global.score;
        this.updateCoinPosition();
        this.coinSound.play();
    },

    updateCoinPosition: function () {
        // Store all the possible coin positions in an array
        var coinPosition = [
            {x: 140, y: 60}, {x: 360, y: 60}, //Top Row
            {x: 60, y: 140}, {x: 400, y: 140}, //Middle Row
            {x: 130, y: 300}, {x: 370, y: 300} //Bottom Row

        ];

        // Remove the current coin position from the array

        for (var i=0; i<coinPosition.length; i++){
            if (coinPosition[i].x === this.coin.x){
                coinPosition.splice(i,1);
            }
        }

        var newPosition = coinPosition[game.rnd.integerInRange(0, coinPosition.length-1)];
        // Set the new position of the coin
        this.coin.reset(newPosition.x,newPosition.y );

    },

    addEnemy: function() {

        this.enemy = this.enemies.getFirstDead();

        this.enemy.animations.add('left', [0,1,2], 8, true);
        this.enemy.animations.add('right', [3,4,5], 8, true);


        if (!this.enemy){
            return;
        }

        this.enemy.anchor.setTo(0.5,1);
        this.enemy.reset(game.world.centerX,0);
        this.enemy.body.gravity.y = 500;
        this.enemy.body.velocity.x = 100 * Phaser.Math.randomSign();
        this.enemy.body.bounce.x = 1;
        this.enemy.checkWorldBounds = true;
        this.enemy.outOfBoundsKill = true;



    }



};

