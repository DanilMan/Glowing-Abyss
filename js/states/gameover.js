// Game Over state

var GameOver = function(game) {};
GameOver.prototype = {
	create: function() {
		var playText = game.add.text(game.width/2, game.height/2, 'Press SPACEBAR to Restart', {font: 'Helvetica', fontSize: '24px', fill: '#fff'});
		playText.anchor.set(0.5);
	},
	update: function() {
		// wait for keyboard input
		if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {
			game.state.start('Play');
		}
	}
};