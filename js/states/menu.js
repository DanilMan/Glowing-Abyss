// We Hate Mornings
// Daniel Ruderman, Jason Yang, Kelly Huang
// Glowing Abyss
// Menu state

var Menu = function(game) {};
Menu.prototype = {
	create: function() {
		console.log('Menu: create');

		// change background color
		game.stage.backgroundColor = '000';

		// add Menu screen text
		var titleText = game.add.text(game.width/2, game.height/2, 'Glowing Abyss', {font: 'Helvetica', fontSize: '48px', fill: '#fff'});
		titleText.anchor.set(0.5);

		var playText = game.add.text(game.width/2, game.height*.8, 'Press SPACEBAR to Start', {font: 'Helvetica', fontSize: '24px', fill: '#fff'});
		playText.anchor.set(0.5);

		newHighScore = false;
	},
	update: function() {
		// check for UP input
		if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {
			game.state.start('Play');
		}
	}
};