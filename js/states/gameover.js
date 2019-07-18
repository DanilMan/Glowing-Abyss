// We Hate Mornings
// Daniel Ruderman, Jason Yang, Kelly Huang
// Glowing Abyss
// Game Over state

var GameOver = function(game) {};
GameOver.prototype = {
	init: function(end, fxTheme){
		this.end = end;
		this.fxTheme = fxTheme;
	},
	create: function() {
		// set camera back to normal
		console.log('GameOver: create');
		game.camera.scale.set(1);

		// set up audio
		this.fxexit = game.add.audio('gameEnd');
		this.fxEat = game.add.audio('eat');

		// change background color
		game.stage.backgroundColor = '000';

		// game over text
		if(this.end == 0){
			this.fxTheme.pause();
			this.gameover = game.add.sprite(0, 0, 'GameOverScreen');
		}
		else{
			game.add.audio('gameStart');
			this.fxTheme.pause();
			this.fxexit.play();
			this.gameover = game.add.sprite(0, 0, 'WinScreen');
		}

		// set up text
		this.shrimpText = game.add.text(game.width/2, game.height * 13 /24, 'SHRIMP EATEN: 0', {font: 'Impact', fontSize: '24px', fill: '#b7c5d5'});
		this.shrimpText.anchor.set(0.5);

		// set up time variable
		this.time = game.time.now + 1000;

		// set up counter
		this.counter = 0;
		
	},
	update: function() {
		// wait for keyboard input
		if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {
			this.fxTheme.resume();
			game.state.start('Play', true, false, this.fxTheme);
		}

		if(game.time.now > this.time && player.shrimpCounter > this.counter){
			this.fxEat.play();

			this.counter++;
			this.shrimpText.setText('SHRIMP EATEN: ' + this.counter);
			

			this.time = game.time.now + (player.shrimpCounter/this.counter) * (100/player.shrimpCounter);
		}
	}
};