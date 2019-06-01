// We Hate Mornings
// Daniel Ruderman, Jason Yang, Kelly Huang
// Glowing Abyss
// Game Over state

var GameOver = function(game) {};
GameOver.prototype = {
	create: function() {
		// set camera back to normal
		game.camera.scale.set(1);

		// change background color
		game.stage.backgroundColor = '000';

		// game over text
		var titleText = game.add.text(game.width/2, game.height/2, 'Game Over', {font: 'Helvetica', fontSize: '48px', fill: '#fff'});
		titleText.anchor.set(0.5);

		var playText = game.add.text(game.width/2, game.height*.6, 'Press SPACEBAR to Restart', {font: 'Helvetica', fontSize: '24px', fill: '#fff'});
		playText.anchor.set(0.5);
	},
	update: function() {
		// wait for keyboard input
		if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {
			game.state.start('Play');
		}
	}
};