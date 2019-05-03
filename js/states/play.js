// Play state

var Play = function(game) {};
Play.prototype = {
	create: function() {
		console.log('Play: create');
		speed = 40;
		acceleration = 100;
		aura = 10

		// load background colorfirst
		game.stage.backgroundColor = '#072656';

		// Player(game, speed, aura)
		player = new Player(game, speed, acceleration, aura, 'player', '');
		game.add.existing(player);

		// setup shrimp group
		this.shrimpGroup = game.add.group();
		this.addShrimp(this.shrimpGroup);
	},
	update: function() {
		// collision physics
		game.physics.arcade.overlap(player, this.shrimpGroup, this.collectShrimp, null, this);
	},
	addShrimp: function(group) {
		// populate shrimp
		var shrimp = new Shrimp(game, 'shrimp', '');
		game.add.existing(shrimp);
		group.add(shrimp);
	},
	collectShrimp: function(player, shrimp){
		// disable shrimp
		shrimp.kill();

		// respawn shrimp
		shrimp.reset(game.rnd.between(9, game.width-9), game.rnd.between(9, game.height-9));
	}
};