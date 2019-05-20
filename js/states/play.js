// We Hate Mornings
// Daniel Ruderman, Jason Yang, Kelly Huang
// Glowing Abyss
// Play state

var Play = function(game) {};
Play.prototype = {
	create: function() {
		console.log('Play: create');
		speed = 150;
		damping = 0.8;
		enemySpeed = 140;
		aura = 10
		auraTimer = 0;
		spitTimer = 0;
		this.fxEat = game.add.audio('eat');


		// load background colorfirst
		game.stage.backgroundColor = '#072656';

		// set world bounds
		game.add.tileSprite(0, 0, 1600, 1600, 'background');
		game.world.setBounds(0, 0, 1600, 1600);

		// set physics
		game.physics.startSystem(Phaser.Physics.P2JS);

		// impact events true
		game.physics.p2.setImpactEvents(true);

		// collision groups from https://phaser.io/examples/v2/p2-physics/collision-groups
		var playerCollisionGroup = game.physics.p2.createCollisionGroup();
		var shrimpCollisionGroup = game.physics.p2.createCollisionGroup();
		var enemyCollisionGroup = game.physics.p2.createCollisionGroup();

		// update collision with bounds
		game.physics.p2.updateBoundsCollisionGroup();

		// set game cursor
		cursor =  game.input.keyboard.createCursorKeys();

		// spit sprite set up
		spit = game.add.sprite(-20, -20, 'spit', '');
		spit.kill();
		spit.alive = false;

		// Player(game, speed, key, frame)
		player = new Player(game, speed, 'player', '');
		game.add.existing(player);

		// set player collision group
		player.body.setCollisionGroup(playerCollisionGroup);

		// setup shrimp group
		this.addShrimp(playerCollisionGroup, shrimpCollisionGroup);

		// setup enemy group
		enemy = this.addEnemy(playerCollisionGroup, enemyCollisionGroup);

		// add aura
		aura = game.add.sprite(player.x, player.y, 'aura')
		aura.anchor.set(0.5);
		aura.scale.set(4.5);

		// create emitter & logic
		/*spitEmit = game.add.emitter(0,0,1000);
		spitEmit.makeParticles('spit');
		spitEmit.minParticleSpeed.setTo(-200, -200);
		spitEmit.maxParticleSpeed.setTo(200, 200);
		spitEmit.gravity = 0;*/

		game.camera.onFadeComplete.add(this.end, this);

		// collision logic with shrimpCollisionGroup
		player.body.collides(shrimpCollisionGroup, this.collectShrimp, this);
		// collision logic with enemyCollisionGroup
		player.body.collides(enemyCollisionGroup, this.collisionEnemy, this);

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

			auraTimer = game.time.now + 200;
		}

		// Endgame for scale being < 1
		if(aura.scale.x <= 1.25){
			this.fade();
		}

		// enemy movement logic
		enemy.forEach(this.enemyMovement, this, true, player, spit, enemySpeed);
		
		//check if player is pressing SPACEBAR && cool down is over
		if((game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) && game.time.now > spitTimer){
			spit.reset(player.x, player.y);
			spit.alive = true;

			// spit cooldown
			spitTimer = game.time.now + 4000;
		}

		// check if it is time to kill spit
		if(spit.alive && game.time.now > spitTimer - 1000){
			spit.kill();
			spit.alive = false;
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
		for(var i = 0; i < 50; i++){
			// makes the first shrimp appear in front of the player, and then randomizes the rest
			if(i == 0){
				shrimp = new Shrimp(game, player.x, player.y - 50, 'shrimp', '');
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
	addEnemy: function(playerGroup, EnemyGroup) {
		// populate enemies]
		var enemy = game.add.group();
		var enemies;
		for(var i = 0; i < 10; i++){
			enemies = new Enemy(game, game.rnd.between(9, game.world.width-9), game.rnd.between(9, game.world.height-9), 'enemy', '');
			game.add.existing(enemies);

			// add enemies to enemy group
			enemy.add(enemies);

			// enemies uses enemyCollisionGroup
			enemies.body.setCollisionGroup(EnemyGroup);

			// enemies collide against themselves and player
			enemies.body.collides([playerGroup, EnemyGroup]);
		}
		return enemy;
	},
	collectShrimp: function(player, shrimp){
		// increases scale of aura
		if(aura.scale.x < 12){
			// respawn shrimp
			shrimp.reset(game.rnd.between(9, game.world.width-9), game.rnd.between(9, game.world.height-9));
			this.fxEat.play();
			aura.scale.x += 1;
			aura.scale.y += 1;
		}
	},
	collisionEnemy: function(player, enemy){
		// shrink arua when enemy strikes
		aura.scale.x -= 0.5;
		aura.scale.y -= 0.5;
	},
	checkDistance: function(obj1, obj2){
		var check = Math.sqrt(Math.pow((obj2.x - obj1.x), 2) + Math.pow((obj2.y - obj1.y), 2));
		if(check < aura.width/50){ // CHANGE TO AURA SIZE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
			return true;
		}
		else{
			return false;
		}
	},
	enemyMovement: function(enemy, player, spit, enemySpeed){
		if(spit.alive){
			if(this.checkDistance(enemy, spit)){
				this.accelerateToObject(enemy, spit, enemySpeed);
			}
		}
		else{
			if(this.checkDistance(enemy, player)){
				this.accelerateToObject(enemy, player, enemySpeed);
			}
		}
	},
	// accelerateToObject found here: https://phaser.io/examples/v2/p2-physics/accelerate-to-object
	accelerateToObject: function(obj1, obj2, speed){
		var angle = Math.atan2(obj2.y - obj1.y, obj2.x - obj1.x);

		// correct angle of enemy
		obj1.body.rotation = angle + game.math.degToRad(90);

		// accelerate to object
		obj1.body.force.x = Math.cos(angle) * speed;
		obj1.body.force.y = Math.sin(angle) * speed;
	},
	emitSpit: function(player, emit){
		// emit from here: https://phaser.io/examples/v2/particles/click-burst
		emit.x = player.x;
		emit.y = player.y;

		// start(explode, ms lifespan, ignored when using bust/explode,  particles emitted)
		emit.start(false, 2000, null, 100);
	},
	render: function(){
		//game.debug.cameraInfo(game.camera, 32, 32);
	}
};