var mainState = {
    preload : function (){
        game.load.image('player','assets/player.png');
        game.load.image('wallV', 'assets/wallVertical.png');
        game.load.image('wallH', 'assets/wallHorizontal.png');
        game.load.image('coin', 'assets/coin.png');
        game.load.image('enemy', 'assets/enemy.png');
    },
    create: function(){
        game.stage.backgroundColor = '#3490db';
        game.physics.startSystem(Phaser.Physics.ARCADE);

        this.cursor = game.input.keyboard.createCursorKeys();
        this.player = game.add.sprite(game.world.centerX, game.world.centerY, 'player');
        this.player.anchor.setTo(0.5, 0.5);
        game.physics.arcade.enable(this.player);
        this.player.body.gravity.y = 500;


        this.coin = game.add.sprite(60,140,'coin');
        game.physics.arcade.enable(this.coin);
        this.coin.anchor.setTo(0.5,0.5);

        this.enemies = game.add.group();
        this.enemies.enableBody = true;
        this.enemies.createMultiple(10, 'enemy');/* Create 10 enemies with the 'enemy' image in the group
        The enemies are "dead" by default, so they are not visible in the game */

        // Display the score
        this.scoreLabel = game.add.text(30,30,'score:0',{font: '18px Arial', fill: '#ffffff'});
        this.score = 0;


        this.createWorld();
        game.time.events.loop(2200,this.addEnemy,this); // call addEnemy every 2.2 seconds

    },
    update: function(){
        game.physics.arcade.collide(this.player, this.walls);
        game.physics.arcade.overlap(this.player, this.coin, this.takeCoin, null, this);
        game.physics.arcade.overlap(this.player, this.enemies, this.playerDie, null, this);
        game.physics.arcade.collide(this.enemies, this.walls);

        if (!this.player.inWorld){
            this.playerDie();
        }

        this.movePlayer();

    },

    movePlayer: function(){
        if (this.cursor.left.isDown){
            this.player.body.velocity.x = -200;
        }
        else if (this.cursor.right.isDown){
            this.player.body.velocity.x = 200;
        }
        else{
            this.player.body.velocity.x = 0;
        }

        if (this.cursor.up.isDown && this.player.body.touching.down ){
            this.player.body.velocity.y = -320;
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
        game.state.start('main');
    },

    takeCoin: function(){
        this.score += 5;
        this.scoreLabel.text = 'score: '+this.score;
        this.updateCoinPosition();
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

        var enemy = this.enemies.getFirstDead();

        if (!enemy){
            return;
        }

        enemy.anchor.setTo(0.5,1);
        enemy.reset(game.world.centerX,0);
        enemy.body.gravity.y = 500;
        enemy.body.velocity.x = 100 * Phaser.Math.randomSign();
        enemy.body.bounce.x = 1;
        enemy.checkWorldBounds = true;
        enemy.outOfBoundsKill = true;

    }
};

var game = new Phaser.Game (500, 340, Phaser.AUTO, 'gameDiv');
game.state.add('main', mainState);
game.state.start('main');