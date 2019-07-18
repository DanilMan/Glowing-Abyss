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
		
		game.add.sprite(0, 0, 'TitleScreen');
	},
	update: function() {
		// check for UP input
		if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) {
			game.state.start('Story', true, false, this.fxTheme);
		}
	}
};