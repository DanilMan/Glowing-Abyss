// We Hate Mornings
// Daniel Ruderman, Jason Yang, Kelly Huang
// Glowing Abyss
// Load state
var Load = function(game) {};
Load.prototype = {
	preload: function() {
		console.log('Load: preload');

		// load graphics assets
		game.load.path = 'assets/img/';
		game.load.image('background', 'background.png');
		game.load.image('player', 'fishPlayer-39x22.png');
		game.load.image('shrimp', 'shrimp1-18x17.png');
		game.load.image('enemy', 'Enemy.png');
		game.load.image('spit', 'spit.png');
		game.load.image('aura', 'Aura-3.png');
		game.load.image('rock', 'SquareRock1.png');
		game.load.image('eggBlue', 'eggBlue.png');
		game.load.image('eggGreen', 'eggGreen.png');
		game.load.image('eggOrange', 'eggOrange.png');
		game.load.image('eggPurple', 'eggPurple.png');
		game.load.image('eggRed', 'eggRed.png');
		game.load.image('eggYellow', 'eggYellow.png');
		game.load.image('ping', 'ping.png');

		// load audio assets
		game.load.path = 'assets/audio/';
		game.load.audio('move', 'fish move 3.mp3');
		game.load.audio('move2', 'fish move 4.mp3');
		game.load.audio('dash', 'dash effect.mp3');
		game.load.audio('eat', 'eat.mp3');
	},
	create: function() {
		console.log('Load: create');
		// go to Menu state
		game.state.start('Menu');
	}
};