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
		game.load.image('TitleScreen', 'GlowingAbyssTitleScreen.png');
		game.load.image('GameOverScreen', 'GlowingAbyssGameOverScreen.png');
		game.load.image('WinScreen', 'GlowingAbyssWinScreen.png');
		game.load.image('Comic1', 'Comic1.png');
		game.load.image('Comic9', 'Comic9.png');
		game.load.image('Continue', 'Continue.png');
		game.load.image('background', 'WaterBackground.png');
		game.load.image('collectBar', 'collectionBar.png');
		game.load.image('hitbox', 'hitbox.png');
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
		game.load.image('WASDKeys', 'WASDKeys.png');
		game.load.image('ping', 'ping2.png');
		game.load.image('BottomWall', 'BottomWall.png');
		game.load.image('TopWall', 'TopWall.png');
		game.load.image('LeftWall', 'LeftWall.png');
		game.load.image('RightWall', 'RightWall.png');
		game.load.image('End', 'End.png');
		game.load.spritesheet('pingEnd', 'ping.png', 25, 26, 9);
		game.load.spritesheet('ComicAnimated', 'ComicAnimated.png', 800, 800, 8);
		game.load.spritesheet('enemy', 'EnemySpriteSheet.png', 84, 181, 22);
		game.load.spritesheet('spit', 'spit.png', 24, 48, 28);
		game.load.spritesheet('player', 'fishPlayer-39x22.png', 24, 44.5, 4);
		game.load.spritesheet('shrimp', 'shrimp1-18x17.png', 18.5, 19, 2);

		// load audio assets
		game.load.path = 'assets/audio/';
		game.load.audio('comicProceed', 'comicProceed.mp3');
		game.load.audio('gameStart', 'gameStart.mp3');
		game.load.audio('gameTheme', 'Main theme.mp3');
		game.load.audio('gameEnd', 'gameExit.mp3');
		game.load.audio('move', 'fish move 3.mp3');
		game.load.audio('move2', 'fish move 4.mp3');
		game.load.audio('dash', 'dash effect.mp3');
		game.load.audio('eat', 'eat.mp3');
		game.load.audio('bump', 'bump.mp3');
		game.load.audio('ping', 'ping.mp3');
		game.load.audio('chase', 'chase.mp3');
		game.load.audio('collect', 'collect.mp3');
		game.load.audio('die', 'die.mp3');

		// load json assets
		game.load.path = 'assets/json/';
		game.load.physics("physicsEnemy", "Enemy.json");
		game.load.physics("physicsFish", "Fish.json");
	},
	create: function() {
		console.log('Load: create');
		// go to Menu state
		game.state.start('Menu');
	}
};