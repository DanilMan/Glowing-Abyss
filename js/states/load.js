// Load state
var Load = function(game) {};
Load.prototype = {
	preload: function() {
		console.log('Load: preload');

		// load graphics assets
		game.load.path = 'assets/img/';
		game.load.image('background', 'm75.png');
		game.load.image('player', 'fishPlayer-39x22.png');
		game.load.image('shrimp', 'shrimp.png');
		game.load.image('aura', 'aura.png');

		// load audio assets
		game.load.path = 'assets/audio/';
		game.load.audio('dash', 'dash effect.mp3');
	},
	create: function() {
		console.log('Load: create');
		// go to Menu state
		game.state.start('Menu');
	}
};