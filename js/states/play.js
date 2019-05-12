// Play state

var Play = function(game) {};
Play.prototype = {
	create: function() {
		console.log('Play: create');
		speed = 150;
		damping = 0.8;
		aura = 10
		auraTimer = 0;
		this.fxEat = game.add.audio('eat');


		// load background colorfirst
		game.stage.backgroundColor = '#072656';

		// set world bounds
		game.add.tileSprite(0, 0, 1600, 1600, 'background')
		game.world.setBounds(0, 0, 1600, 1600);

		game.camera.x = game.world.width/2;
		game.camera.y = game.world.height/2;

		// set physics
		game.physics.startSystem(Phaser.Physics.P2JS);

		// impact events true
		game.physics.p2.setImpactEvents(true);

		// collision groups from https://phaser.io/examples/v2/p2-physics/collision-groups
		var playerCollisionGroup = game.physics.p2.createCollisionGroup();
		var shrimpCollisionGroup = game.physics.p2.createCollisionGroup();

		// update collision with bounds
		game.physics.p2.updateBoundsCollisionGroup();

		// set game cursor
		cursor =  game.input.keyboard.createCursorKeys();

		// Player(game, speed, aura)
		player = new Player(game, speed, aura, 'player', '');
		game.add.existing(player);

		player.body.setCollisionGroup(playerCollisionGroup);

		// setup shrimp group
		this.shrimp = game.add.group();
		this.addShrimp(playerCollisionGroup, shrimpCollisionGroup);

		// add aura
		aura = game.add.sprite(player.x, player.y, 'aura')
		aura.anchor.set(0.5);
		aura.scale.set(4);

		game.camera.onFadeComplete.add(this.end, this);

		// collision logic with shrimpCollsionGroup
		player.body.collides(shrimpCollisionGroup, this.collectShrimp, this);

		// setting up camera.follow(player, follow_type, x_linear_interpolation, y_linear_interpolation)
		game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);
	},
	update: function() {
		// reset position of arua to player
		aura.position.set(player.x,player.y);

		// checks to see if it is time to shrink aura
		if(game.time.now > auraTimer && aura.scale.x > 1.25){
			aura.scale.x -= .02;
			aura.scale.y -= .02;

			auraTimer = game.time.now + 100;
		}

		// Endgame for scale being < 1
		if(aura.scale.x <= 1.25){
			this.fade();
		}

	},
	fade: function(){
		// fades camera to black when character dies
		game.camera.fade(0x000000, 200);
	},
	end: function(){
		// go to GameOver state
		game.state.start('GameOver');
	},
	addShrimp: function(playerGroup, shrimpGroup) {
		// populate 10 shrimp
		var shrimp;
		for(var i = 0; i < 100; i++){
			// makes the first shrimp appear in front of the player, and then randomizes the rest
			if(i == 0){
				shrimp = new Shrimp(game, player.x, player.y - 70, 'shrimp', '');
			}
			else{
				shrimp = new Shrimp(game, game.rnd.between(9, game.world.width-9), game.rnd.between(9, game.world.height-9), 'shrimp', '');
			}
			game.add.existing(shrimp);
			// shrimp uses shrimpCollisionGroup
			shrimp.body.setCollisionGroup(shrimpGroup);

			// Shrimp collide against themselves and player
			shrimp.body.collides([shrimpGroup, playerGroup]);
		}

	},
	collectShrimp: function(player, shrimp){
		// increases scale of aura
		if(aura.scale.x < 10){
			// respawn shrimp
			shrimp.reset(game.rnd.between(9, game.world.width-9), game.rnd.between(9, game.world.height-9));
			this.fxEat.play();
			aura.scale.x += 0.6;
			aura.scale.y += 0.6;
		}
	},
	render: function(){
		//game.debug.cameraInfo(game.camera, 32, 32);
	}
};