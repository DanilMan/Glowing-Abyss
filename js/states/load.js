// Load state
var Load = function(game) {};
Load.prototype = {
	preload: function() {
		// load graphics assets
		game.load.path = 'assets/img/';

		// load audio assets
		game.load.path = 'assets/audio/';

	},
	create: function() {
		// go to Menu state
		game.state.start('Menu');
	}
};