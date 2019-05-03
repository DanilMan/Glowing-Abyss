// Load state
var Load = function(game) {};
Load.prototype = {
	preload: function() {
		console.log('Load: preload');
		// load graphics assets
		game.load.path = 'assets/img/';
		game.load.image('player', 'player.png');
		game.load.image('shrimp', 'shrimp.png')

		// load audio assets
		game.load.path = 'assets/audio/';

	},
	create: function() {
		console.log('Load: create');
		// go to Menu state
		game.state.start('Menu');
	}
};