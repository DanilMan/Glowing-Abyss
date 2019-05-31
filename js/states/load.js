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
		game.load.image('aura', 'Aura-3.png');
		game.load.image('rock', 'SquareRock1.png');
		game.load.image('eggBlue', 'eggBlue.png');
		game.load.image('eggGreen', 'eggGreen.png');
		game.load.image('eggOrange', 'eggOrange.png');
		game.load.image('eggPurple', 'eggPurple.png');
		game.load.image('eggRed', 'eggRed.png');
		game.load.image('eggYellow', 'eggYellow.png');
		game.load.image('ShiftKey', 'ShiftKey.png');
		game.load.image('SpacebarKey', 'SpacebarKey.png');
		game.load.image('WADKeys', 'WADKeys.png');
		game.load.spritesheet('ping', 'ping.png', 25, 26, 9);
		game.load.spritesheet('spit', 'spit.png', 24, 48, 28);

		// load audio assets
		game.load.path = 'assets/audio/';
		game.load.audio('move', 'fish move 3.mp3');
		game.load.audio('move2', 'fish move 4.mp3');
		game.load.audio('dash', 'dash effect.mp3');
		game.load.audio('eat', 'eat.mp3');
		game.load.audio('bump', 'bump.mp3');
		game.load.audio('ping', 'ping.mp3');
		game.load.audio('chase', 'chase.mp3');
		game.load.audio('collect', 'collect.mp3');

		// load json assets
		game.load.path = 'assets/json/';
		game.load.physics("physics", "Enemy.json");
		game.load.physics("physics", "Fish.json");
	},
	create: function() {
		console.log('Load: create');
		// go to Menu state
		game.state.start('Menu');
	}
};