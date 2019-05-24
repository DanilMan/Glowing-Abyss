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
		enemySpeed = 160;
		aura = 10
		auraTimer = 0;
		spitTimer = 0;
		enemyTimer = 0;
		pingTimer = 0;
		timer = game.time.create(false);
		this.fxEat = game.add.audio('eat');


		// load background colorfirst
		game.stage.backgroundColor = '#072656';

		// set world bounds
		game.add.tileSprite(0, 0, 3200, 3200, 'background');
		game.world.setBounds(0, 0, 3200, 3200);

		// set physics
		game.physics.startSystem(Phaser.Physics.P2JS);

		// impact events true
		game.physics.p2.setImpactEvents(true);

		// collision groups from https://phaser.io/examples/v2/p2-physics/collision-groups
		var playerCollisionGroup = game.physics.p2.createCollisionGroup();
		var shrimpCollisionGroup = game.physics.p2.createCollisionGroup();
		var enemyCollisionGroup = game.physics.p2.createCollisionGroup();
		var rocksCollisionGroup = game.physics.p2.createCollisionGroup();
		var eggsCollisionGroup = game.physics.p2.createCollisionGroup();

		// update collision with bounds
		game.physics.p2.updateBoundsCollisionGroup();

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
		this.addShrimp(playerCollisionGroup, shrimpCollisionGroup, rocksCollisionGroup);

		// setup enemy group
		enemy = this.addEnemy(playerCollisionGroup, enemyCollisionGroup, rocksCollisionGroup);

		// setup rock
		this.addRocks(playerCollisionGroup, shrimpCollisionGroup, enemyCollisionGroup, rocksCollisionGroup);

		// setup pings
		pings = this.addPings();
		pings.alpha = 0;

		// setup eggs
		eggs = this.addEggs(playerCollisionGroup, shrimpCollisionGroup, rocksCollisionGroup, eggsCollisionGroup);

		// add aura
		aura = game.add.sprite(player.x, player.y, 'aura')
		aura.anchor.set(0.5);
		aura.scale.set(4.5);

		// bring pings group to top
		game.world.bringToTop(pings);

		// camera fades when player dies
		game.camera.onFadeComplete.add(this.end, this);

		// player collsion with rock group
		player.body.collides([rocksCollisionGroup]);

		// collision logic with shrimpCollisionGroup
		player.body.collides(shrimpCollisionGroup, this.collectShrimp, this);

		// collision logic with enemyCollisionGroup
		player.body.collides(enemyCollisionGroup, this.collisionEnemy, this);

		// collision logic with eggCollisionGroup
		player.body.collides(eggsCollisionGroup, this.collectEgg, this);

		// setting up camera.follow(player, follow_type, x_linear_interpolation, y_linear_interpolation)
		game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);

		// start timer
		timer.start();
	},
	update: function() {
		// reset position of aura to player
		aura.position.set(player.x,player.y);

		// reset position of pings to player
		pings.position.set(player.x, player.y); 

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

		//check if player is pressing SHIFT && cool down is over (PING)
		if((game.input.keyboard.justPressed(Phaser.Keyboard.SHIFT)) && game.time.now > pingTimer){
			// change group alpha
			pings.alpha = 1;
			// ping cooldown
			pingTimer = game.time.now + 5000;
		}
		if(game.time.now == pingTimer){
			pings.alpha = 0;
		}
		if(game.time.now < pingTimer){
			// ping logic
			this.pingLogic(eggs, player, pings, aura);
		}
		if(game.time.now < pingTimer && game.time.now > pingTimer - 4000){
			// decrease opacity movement logic
			pings.alpha -= 0.01;
		}

		//check if player is pressing SPACEBAR && cool down is over (SPIT)
		if((game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) && game.time.now > spitTimer){
			spit.reset(player.x, player.y);
			spit.alive = true;

			// spit cooldown
			spitTimer = game.time.now + 8000;
		}

		// check if it is time to kill spit
		if(spit.alive && game.time.now > spitTimer - 4000){
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
	addShrimp: function(playerGroup, shrimpGroup, rocksGroup) {
		// populate 10 shrimp
		var shrimp;
		for(var i = 0; i < 200; i++){
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
			shrimp.body.collides([shrimpGroup, playerGroup, rocksGroup]);
		}

	},
	addEnemy: function(playerGroup, EnemyGroup, rocksGroup) {
		// populate enemies
		var enemy = game.add.group();
		var enemies;
		for(var i = 0; i < 20; i++){
			enemies = new Enemy(game, game.rnd.between(9, game.world.width-9), game.rnd.between(9, game.world.height-9), 'enemy', '');
			game.add.existing(enemies);

			// add enemies to enemy group
			enemy.add(enemies);

			// enemies uses enemyCollisionGroup
			enemies.body.setCollisionGroup(EnemyGroup);

			// enemies collide against themselves and player
			enemies.body.collides([playerGroup, EnemyGroup, rocksGroup]);
		}
		return enemy;
	},
	addRocks: function(playerGroup, shrimpGroup, EnemyGroup, rocksGroup) {
		// populate rocks
		//var rocks = game.add.group();
		var rock;
		for(var i = 0; i < 8; i++){
			rock = game.add.sprite(game.rnd.between(100, game.world.width-200), game.rnd.between(100, game.world.height-200), 'rock', '');
			game.physics.p2.enable(rock);
			rock.body.static = true;

			// enemies uses enemyCollisionGroup
			rock.body.setCollisionGroup(rocksGroup);

			// enemies collide against themselves and player
			rock.body.collides([playerGroup, shrimpGroup, EnemyGroup, rocksGroup]);
		}
		//return rocks;
	},
	addEggs: function(playerGroup, shrimpGroup, rocksGroup, eggsGroup) {
		var eggs = game.add.group();
		var egg;
		var eggArray = ['eggBlue', 'eggGreen', 'eggOrange', 'eggPurple', 'eggRed', 'eggYellow'];
		for(var i = 0; i < 6; i++){
			egg = game.add.sprite(game.rnd.between(9, game.world.width-9), game.rnd.between(9, game.world.height-9), eggArray[i], '');
			game.physics.p2.enable(egg);
			egg.alive = true;
			
			// add egg to eggs group
			eggs.add(egg);

			// enemies uses enemyCollisionGroup
			egg.body.setCollisionGroup(eggsGroup);

			// enemies collide against themselves and player
			egg.body.collides([playerGroup, shrimpGroup, rocksGroup, eggsGroup]);
		}
		return eggs;
	},
	addPings: function() {
		var pings = game.add.group();
		var ping;
		for(var i = 0; i < 6; i++){
			// create ping sprite
			ping = game.add.sprite(0, 0, 'ping', '');
			ping.anchor.set(5, 0.5);
			pings.add(ping);
		}
		return pings;
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

		// set timer directions
		timer.add(500, this.resetSpeed, this);

		// slow down enemy for half a second
		enemySpeed = -10;
	},
	collectEgg: function(player, egg){
		egg.sprite.kill();
		egg.sprite.alive = false;  // EVENTUALLY MAKE A NEW FUNCTION THAT SETS PING
	},
	resetSpeed: function(){
		// reset speed
		enemySpeed = 160;
	},
	// enemy movement logic
	pingLogic: function(eggs, player, pings, aura){
		// create ping sprite
		for(var i = 0; i < 6; i++){
			// get both sprites in group
			var egg = eggs.getAt(i);
			var ping = pings.getAt(i); 

			// checks if egg is alive so it'll ping
			if(egg.alive){
				// check if aura is too small
				if(aura.width/1250 + 1/(aura.width/1300) > 2.2){
					// resizes ping to aura
					ping.anchor.x = aura.width/1250 + 1/(aura.width/1250);
				}

				// calculate angle of player to egg
				var angle = Phaser.Math.angleBetween(player.x, player.y, egg.x, egg.y);

				// correct angle of enemy
				ping.angle = Phaser.Math.radToDeg(angle) + 180;
			}
			else{
				ping.visible = false;
			}
		}
	},
	checkDistance: function(obj1, obj2){
		var check = Math.sqrt(Math.pow((obj2.x - obj1.x), 2) + Math.pow((obj2.y - obj1.y), 2));
		if(check < aura.width/44){
			return true;
		}
		else{
			return false;
		}
	},
	enemyMovement: function(enemy, player, spit, enemySpeed){
		if(spit.alive && this.checkDistance(enemy, spit)){
			// makes sure that if enemy is already on spit that it stops
			if(!this.checkOverlap(enemy, spit)){
				this.accelerateToObject(enemy, spit, enemySpeed);
			}
		}
		// enemy chases after player
		else if(this.checkDistance(enemy, player)){
				this.accelerateToObject(enemy, player, enemySpeed);
		}
		// possible random movement for enemy
		else{
			/*else{
				// input random movement with timer
			}*/
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
	// random movement logic
	moveEnemy: function(obj, speed, X, Y){
		var angle = Math.atan2(Y - obj.y, X - obj.x);

		// correct angle of enemy
		obj.body.rotation = angle + game.math.degToRad(90);

		// accelerate to object
		obj.body.force.x = Math.cos(angle) * speed;
		obj.body.force.y = Math.sin(angle) * speed;
	},
	emitSpit: function(player, emit){
		// emit from here: https://phaser.io/examples/v2/particles/click-burst
		emit.x = player.x;
		emit.y = player.y;

		// start(explode, ms lifespan, ignored when using bust/explode,  particles emitted)
		emit.start(false, 2000, null, 100);
	},
	// basic rectangle overlap here: http://examples.phaser.io/_site/view_full.html?d=sprites&f=overlap+without+physics.js&t=overlap%20without%20physics
	checkOverlap: function(obj1, obj2){
		var boundA = obj1.getBounds();
		var boundB = obj2.getBounds();

		return Phaser.Rectangle.intersects(boundA, boundB);
	},
	render: function(){
		game.debug.physicsGroup(eggs);
		//game.debug.cameraInfo(game.camera, 32, 32);
	}
};