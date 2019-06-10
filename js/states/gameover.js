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

		this.fxexit = game.add.audio('gameEnd');

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
	},
	update: function() {
		// wait for keyboard input
		if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {
			this.fxTheme.resume();
			game.state.start('Play', true, false, this.fxTheme);
		}
	}
};