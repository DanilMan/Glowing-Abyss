// We Hate Mornings
// Daniel Ruderman, Jason Yang, Kelly Huang
// Glowing Abyss
// Play state

var Play = function(game) {};
Play.prototype = {
	create: function() {
		console.log('Play: create');
		damping = 0.8;
		aura = 10
		forward = 0;
		auraTimer = 0;
		spitTimer = 0;
		enemyTimer = 0;
		pingTimer = 0;
		shrimpArray = this.create2DArray(100, 2);
		shrimpCursor = new Array(2);
		timer = game.time.create(false);
		this.fxEat = game.add.audio('eat');
		this.fxPing = game.add.audio('ping');
		this.fxDash = game.add.audio('dash');
		this.fxBump = game.add.audio('bump');
		this.fxChase = game.add.audio('chase');
		this.fxCollect = game.add.audio('collect');
		this.fxdie = game.add.audio('die');
		this.fxenter = game.add.audio('gameStart');
		this.fxTheme = game.add.audio('gameTheme');

		// play theme
		this.fxTheme.play('', 0, 1, true);

		// load background colorfirst
		//game.stage.backgroundColor = '#072656';

		// set world bounds
		game.add.tileSprite(0, 0, 3200, 3200, 'background');
		game.world.setBounds(0, 0, 3200, 3200);

		// set physics
		game.physics.startSystem(Phaser.Physics.P2JS);

		// impact events true
		game.physics.p2.setImpactEvents(true);

		// collision groups from https://phaser.io/examples/v2/p2-physics/collision-groups
		playerCollisionGroup = game.physics.p2.createCollisionGroup();
		shrimpCollisionGroup = game.physics.p2.createCollisionGroup();
		shrimpArrayCollisionGroup = game.physics.p2.createCollisionGroup();
		enemyCollisionGroup = game.physics.p2.createCollisionGroup();
		rocksCollisionGroup = game.physics.p2.createCollisionGroup();
		edgeCollisionGroup = game.physics.p2.createCollisionGroup();
		eggsCollisionGroup = game.physics.p2.createCollisionGroup();

		// update collision with bounds
		game.physics.p2.updateBoundsCollisionGroup();

		// spit sprite set up
		spit = game.add.sprite(-20, -20, 'spit', 0);
		spit.animations.add('floating', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27]);
		spit.anchor.set(0.5, 1);
		spit.kill();
		spit.alive = false;

		// setup end hitbox
		end = game.add.sprite(1600, 10, 'End', 0);
		end.anchor.set(0.5);

		// Player(game, speed, key, frame)
		player = new Player(game, 150, 'player', 0);
		game.add.existing(player);
		player.end = false;
		player.collected = false;
		player.firstChase = true;
		player.firstCollected = false;
		player.secondCollected = false;
		player.bool1 = true;
		player.bool2 = true;

		// set player collision group
		player.body.setCollisionGroup(playerCollisionGroup);

		// setup shrimp group
		shrimp = this.addShrimp(playerCollisionGroup, shrimpCollisionGroup, shrimpArrayCollisionGroup, edgeCollisionGroup);

		// setup shrimp group
		shrimpGrid = this.addShrimpGrid(playerCollisionGroup, shrimpArrayCollisionGroup, shrimpCollisionGroup, edgeCollisionGroup);

		// setup enemy group
		enemy = game.add.group();

		// setup rocks
		// top left entrance
		this.addRocks(1400, 180, playerCollisionGroup, enemyCollisionGroup, rocksCollisionGroup);
		this.addRocks(1107, 180, playerCollisionGroup, enemyCollisionGroup, rocksCollisionGroup);
		this.addRocks(1400, 464, playerCollisionGroup, enemyCollisionGroup, rocksCollisionGroup);
		// left upper triangle
		this.addRocks(805, 758, playerCollisionGroup, enemyCollisionGroup, rocksCollisionGroup);
		this.addRocks(512, 758, playerCollisionGroup, enemyCollisionGroup, rocksCollisionGroup);
		this.addRocks(805, 1042, playerCollisionGroup, enemyCollisionGroup, rocksCollisionGroup);
		// top right entrance
		this.addRocks(1800, 180, playerCollisionGroup, enemyCollisionGroup, rocksCollisionGroup);
		this.addRocks(2093, 180, playerCollisionGroup, enemyCollisionGroup, rocksCollisionGroup);
		this.addRocks(1800, 464, playerCollisionGroup, enemyCollisionGroup, rocksCollisionGroup);
		// top right
		this.addRocks(2679, 180, playerCollisionGroup, enemyCollisionGroup, rocksCollisionGroup);
		// right upper flat
		this.addRocks(2093, 1032, playerCollisionGroup, enemyCollisionGroup, rocksCollisionGroup);
		this.addRocks(2386, 1032, playerCollisionGroup, enemyCollisionGroup, rocksCollisionGroup);
		// left mid r
		this.addRocks(512, 1610, playerCollisionGroup, enemyCollisionGroup, rocksCollisionGroup);
		this.addRocks(805, 1610, playerCollisionGroup, enemyCollisionGroup, rocksCollisionGroup);
		this.addRocks(1098, 1610, playerCollisionGroup, enemyCollisionGroup, rocksCollisionGroup);
		this.addRocks(512, 1894, playerCollisionGroup, enemyCollisionGroup, rocksCollisionGroup);
		this.addRocks(512, 2178, playerCollisionGroup, enemyCollisionGroup, rocksCollisionGroup);
		// left bottom I
		this.addRocks(1098, 2746, playerCollisionGroup, enemyCollisionGroup, rocksCollisionGroup);
		this.addRocks(1098, 3030, playerCollisionGroup, enemyCollisionGroup, rocksCollisionGroup);
		// right lower r
		this.addRocks(1800, 2178, playerCollisionGroup, enemyCollisionGroup, rocksCollisionGroup);
		this.addRocks(2093, 2178, playerCollisionGroup, enemyCollisionGroup, rocksCollisionGroup);
		this.addRocks(1800, 2462, playerCollisionGroup, enemyCollisionGroup, rocksCollisionGroup);
		// right lower flat
		this.addRocks(2386, 2746, playerCollisionGroup, enemyCollisionGroup, rocksCollisionGroup);
		this.addRocks(2679, 2746, playerCollisionGroup, enemyCollisionGroup, rocksCollisionGroup);

		// add edges
		this.addEdge(1289, 19, -520, 0, 3, 'TopWall', playerCollisionGroup, edgeCollisionGroup, shrimpCollisionGroup, shrimpArrayCollisionGroup, enemyCollisionGroup);
		this.addEdge(1911, 19, 520, 0, 3, 'TopWall', playerCollisionGroup, edgeCollisionGroup, shrimpCollisionGroup, shrimpArrayCollisionGroup, enemyCollisionGroup);
		this.addEdge(20, 260, 0, 520, 7, 'LeftWall', playerCollisionGroup, edgeCollisionGroup, shrimpCollisionGroup, shrimpArrayCollisionGroup, enemyCollisionGroup);
		this.addEdge(260, 3180, 520, 0, 7, 'BottomWall', playerCollisionGroup, edgeCollisionGroup, shrimpCollisionGroup, shrimpArrayCollisionGroup, enemyCollisionGroup);
		this.addEdge(3181, 260, 0, 520, 7, 'RightWall', playerCollisionGroup, edgeCollisionGroup, shrimpCollisionGroup, shrimpArrayCollisionGroup, enemyCollisionGroup);

		// setup pings
		pings = this.addPings();
		pings.alpha = 0;

		// setup eggs
		eggs = this.addEggs(playerCollisionGroup, shrimpCollisionGroup, rocksCollisionGroup, eggsCollisionGroup);

		// add auradw
		aura = game.add.sprite(player.x, player.y, 'aura');
		aura.anchor.set(0.5);
		aura.scale.set(4.5);

		// bring pings group to top
		game.world.bringToTop(pings);

		// camera fades when player dies
		game.camera.onFadeComplete.add(this.end, this);

		// player collsion with rock group
		player.body.collides(rocksCollisionGroup, this.bumpRock, this);

		// collision logic with shrimpCollisionGroup & shrimpArrayCollisionGroup
		player.body.collides(shrimpCollisionGroup, this.collectShrimp, this);
		player.body.collides(shrimpArrayCollisionGroup, this.collectShrimpGrid, this);

		// collision logic with enemyCollisionGroup
		player.body.collides(enemyCollisionGroup, this.collisionEnemy, this);

		// collision logic with eggCollisionGroup
		player.body.collides(eggsCollisionGroup, this.collectEgg, this);

		// collision logic with edgeCollisionGroup
		player.body.collides(edgeCollisionGroup);

		game.camera.scale.set(1.6);

		// camera edits to make sure it starts where the player is
		game.camera.x = player.x + game.camera.width*11/16;
		game.camera.y = player.y + game.camera.width*11/16;

		// setting up camera.follow(player, follow_type, x_linear_interpolation, y_linear_interpolation)
		game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);

		// create collection bar sprite
		collectBar = game.add.sprite(player.x, player.y, 'collectBar');
		collectBar.fixedToCamera = true;
		collectBar.cameraOffset.setTo(game.camera.width/2, game.camera.height-20);
		collectBar.anchor.set(0.5);
		collectBar.alpha = 0.5;

		// create WAD key sprite
		this.WAD = game.add.sprite(player.x, player.y, 'WASDKeys');
		this.WAD.fixedToCamera = true;
		this.WAD.cameraOffset.setTo(game.camera.width/2 + 10, game.camera.height/2 + 25);
		this.WAD.anchor.set(0.5);
		this.WAD.scale.set(2);
		this.WAD.alive = true;
		this.WADbool = false;

		// Ping set
		this.Shift = game.add.sprite(-100, 0, 'ShiftKey');
		this.Shift.alive = false;
		this.Shiftbool = false;

		// create shift sprite
		this.SpaceBar = game.add.sprite(-100, 0, 'SpacebarKey');
		this.SpaceBar.alive = false;
		this.SpaceBarbool = false;

		// collected group
		collected = this.addCollected();
		

		// start timer
		timer.start();

		this.fxenter.play();
	},
	update: function() {
		if(player.end){
			game.state.start('GameOver', true, false, 0, this.fxTheme);
		}

		if(player.boolcounter > 8 || player.endbool){
			this.fxdie.play();
			game.state.start('GameOver', true, false, 0, this.fxTheme);
		}

		// create key tutorial and delete them on input
		if((this.WAD.alive == true && (game.input.keyboard.isDown(Phaser.Keyboard.A) || game.input.keyboard.isDown(Phaser.Keyboard.D) || game.input.keyboard.isDown(Phaser.Keyboard.W) || game.input.keyboard.isDown(Phaser.Keyboard.S))) || this.WADbool){
			this.WADbool = this.eraseTutorial(this.WAD, this.WADbool);
		}
		if((this.Shift.alive == true && (game.input.keyboard.isDown(Phaser.Keyboard.SHIFT))) || this.Shiftbool){
			this.Shiftbool = this.eraseTutorial(this.Shift, this.Shiftbool);
		}
		if((this.SpaceBar.alive == true && (game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR))) || this.SpaceBarbool){
			this.SpaceBarbool = this.eraseTutorial(this.SpaceBar, this.SpaceBarbool);
		}

		if(!this.WAD.alive){
			// create shift sprite
			this.Shift.x = player.x
			this.Shift.y = player.y
			this.Shift.fixedToCamera = true;
			this.Shift.cameraOffset.setTo(game.camera.width/2, game.camera.height/2 + 300);
			this.Shift.anchor.set(0.5);
			this.Shift.scale.set(2);
			this.Shift.alive = true;
		}
		
		// reset position of aura to player
		aura.position.set(player.x, player.y);

		// reset position of pings to player
		pings.position.set(player.x, player.y);

		// check player's overlap with end
		if(player.collected && this.checkOverlap(player, end)){
			game.state.start('GameOver', true, false, 1, this.fxTheme);
		}

		// checks to see if it is time to shrink aura
		/*if(game.time.now > auraTimer && aura.scale.x > 1.5){ !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
			aura.scale.x -= .02;
			aura.scale.y -= .02;

			auraTimer = game.time.now + 100;
		}*/

		// Endgame for scale being < 1
		if(aura.scale.x <= 1.5){
			this.fade();
		}

		// enemy movement logic
		enemy.forEach(this.enemyMovement, this, true, player, spit);

		// Shrimp movement logic
		shrimp.forEach(this.shrimpMovement, this, true, player);
		shrimpGrid.forEach(this.shrimpGridMovement, this, true, player);

		//check if player is pressing SHIFT && cool down is over (PING)
		if(game.input.keyboard.justPressed(Phaser.Keyboard.SHIFT)){
			// ping alpha
			pings.alpha = 1;
			//play ping sound
			this.fxPing.play();
		}
		if(game.input.keyboard.isDown(Phaser.Keyboard.SHIFT)){
			// ping logic
			this.pingLogic(eggs, enemy, player, pings, aura, end, true);

			// shrink aura
			aura.scale.x -= .008;
			aura.scale.y -= .008;
			
		}
		else if(pings.alpha > 0.0){
			// keep ping logic running
			this.pingLogic(eggs, enemy, player, pings, aura, end, false);

			// keeps shrinking aura
			aura.scale.x -= .008;
			aura.scale.y -= .008;

			// decrease ping alpha
			pings.alpha -= 0.02;
		}

		//check if player is pressing SPACEBAR && cool down is over (SPIT)
		if((game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)) && game.time.now > spitTimer && aura.scale.x > 4){ // 1.5 min aura.scale
			this.fxDash.play();
			spit.animations.play('floating', 8, false);
			var rotate = this.rotation(player.x, player.y, player.x , player.y - 18, player.angle + 2);
			spit.reset(rotate[0], rotate[1]);
			spit.angle = player.angle;
			spit.alive = true;

			// using spit shrinks aura
			if(this.SpaceBar.alive == false){
				aura.scale.x -= (aura.width/2500);
				aura.scale.y -= (aura.height/2500);
			}
			
			// spit cooldown
			spitTimer = game.time.now + 500;
		}

		// check if it is time to kill spit
		if(spit.alive && game.time.now > spitTimer + 3500){
			spit.kill();
			spit.alive = false;
		}

		// resets player's speed
		if(game.time.now > player.timer){
			player.speed = 150;
		}

		// spawn enemies
		if(player.bool1 && player.firstCollected){
			// top right
			this.addEnemy(2657, 436, playerCollisionGroup, enemyCollisionGroup, rocksCollisionGroup, edgeCollisionGroup);
			// top left
			this.addEnemy(960, 727, playerCollisionGroup, enemyCollisionGroup, rocksCollisionGroup, edgeCollisionGroup);
			// mid left
			this.addEnemy(960, 1890, playerCollisionGroup, enemyCollisionGroup, rocksCollisionGroup, edgeCollisionGroup);
			// mid right
			this.addEnemy(2977, 1600, playerCollisionGroup, enemyCollisionGroup, rocksCollisionGroup, edgeCollisionGroup);
			player.bool1 = false;
		}
		if(player.bool2 && player.secondCollected){
			// mid mid
			this.addEnemy(1455, 1309, playerCollisionGroup, enemyCollisionGroup, rocksCollisionGroup, edgeCollisionGroup);
			// bottom left
			this.addEnemy(291, 2473, playerCollisionGroup, enemyCollisionGroup, rocksCollisionGroup, edgeCollisionGroup);
			// bottom right
			this.addEnemy(2357, 2182, playerCollisionGroup, enemyCollisionGroup, rocksCollisionGroup, edgeCollisionGroup);
			// bottom right
			//this.addEnemy(1400, 2477, playerCollisionGroup, enemyCollisionGroup, rocksCollisionGroup, edgeCollisionGroup);
			player.bool2 = false;
		}
	},
	eraseTutorial: function(item, boolT){
		if(item.alpha > 0){
			boolT = true;
			item.alpha -= 0.02;
		}
		else{
			boolT = false;
			item.destroy();
		}
		return boolT;
	},
	fade: function(){
		// fades camera to black when character diesdw
		game.camera.fade(0x000000, 200);
	},
	end: function(){
		// go to GameOver state
		player.end = true;
	},
	addShrimp: function(playerGroup, shrimpGroup, shrimpArrayGroup, edgeGroup) {
		// populate shrimp
		var shrimps = game.add.group();
		var shrimp;
		for(var i = 0; i < 100; i++){
			// makes the first shrimp appear in front of the player, and then randomizes the rest
			if(i == 0){
				shrimp = new Shrimp(game, player.x, player.y + 60, 'shrimp', '');
			}
			else{
				shrimp = new Shrimp(game, game.rnd.between(50, game.world.width-50), game.rnd.between(50, game.world.height-50), 'shrimp', '');
			}
			game.add.existing(shrimp);

			// add shrimp to shrimps group
			shrimps.add(shrimp);

			// shrimp uses shrimpCollisionGroup
			shrimp.body.setCollisionGroup(shrimpGroup);

			// Shrimp collide against themselves and player
			shrimp.body.collides([shrimpGroup, playerGroup, shrimpArrayGroup, edgeGroup]);
		}
		// return shrimp group
		return shrimps;

	},
	addShrimpGrid: function(playerGroup, shrimpArrayGroup, shrimpGroup, edgeGroup) {
		// populate shrimp grid
		var shrimps = game.add.group();
		var shrimp;
		var counter = 0;
		for(var i = 0; i < 16; i++){
			for(var j = 0; j < 16; j++){
				// set shrimp on grid
				shrimp = new Shrimp(game, (100 + (j * 200)), (100 + (i * 200)), 'shrimp', '');

				game.add.existing(shrimp);

				// add shrimp to shrimps group
				shrimps.add(shrimp);

				// shrimp uses shrimpCollisionGroup
				shrimp.body.setCollisionGroup(shrimpArrayGroup);

				// Shrimp collide against themselves and player
				shrimp.body.collides([shrimpArrayGroup, playerGroup, shrimpGroup, edgeGroup]);

				if(counter == 136){
					shrimp.reset(-10,-10);
				}

				// save position in shrimpArray
				var array = new Array(2);
				array[0] = 100 + (j * 200);
				array[1] = 100 + (i * 200);
				shrimpArray[counter] = array;
				counter++;
			}
		}
		// save empty position on cursor array
		var array = shrimpArray[136];
		shrimpCursor[0] = array[0];
		shrimpCursor[1] = array[1];

		// return shrimp group
		return shrimps;
	},
	addEnemy: function(x, y, playerGroup, EnemyGroup, rocksGroup, edgeGroup) {
		// populate enemies
		var enemies;
		enemies = new Enemy(game, x, y, 'enemy', 0);
		game.add.existing(enemies);
		enemies.hitBox = game.add.sprite(x, y, 'hitbox', 0);
		enemies.hitBox.anchor.set(0.5);
		enemies.alive = true;
		enemies.bool = true;
		enemies.speed = 160;

		// add enemies to enemy group
		enemy.add(enemies);

		// enemies uses enemyCollisionGroup
		enemies.body.setCollisionGroup(EnemyGroup);

		// enemies collide against themselves and player
		enemies.body.collides([playerGroup, EnemyGroup, rocksGroup, edgeGroup]);
	},
	addRocks: function(x, y, playerGroup, EnemyGroup, rocksGroup) {
		// populate rocks
		var rock;
		rock = game.add.sprite(x, y, 'rock', '');
		game.physics.p2.enable(rock);
		rock.body.static = true;

		// rocks uses enemyCollisionGroup
		rock.body.setCollisionGroup(rocksGroup);

		// rocks collide against themselves and player
		rock.body.collides([playerGroup, EnemyGroup, rocksGroup]);
	},
	addEdge: function(x, y, multX, multY, num, img, playerGroup, edgeGroup, shrimpGroup, shrimpArrayGroup, enemyGroup){
		var edge;
		for(var i = 0; i < num; i++){
			//edge = game.add.sprite(260 + (520 * i), 20, 'TopWall', '');
			edge = game.add.sprite(x + (multX * i), y + (multY * i), img, '');
			game.physics.p2.enable(edge);
			edge.body.static = true;

			// enemies uses enemyCollisionGroup
			edge.body.setCollisionGroup(edgeGroup);

			// enemies collide against themselves and player
			edge.body.collides([playerGroup, shrimpGroup, shrimpArrayGroup, enemyGroup]);
		}
	},
	bumpRock: function(player, rock) {
		this.fxBump.play();
	},
	addEggs: function(playerGroup, shrimpGroup, rocksGroup, eggsGroup) {
		var eggs = game.add.group();
		var egg;
		var eggArray = ['eggBlue', 'eggGreen', 'eggOrange', 'eggPurple', 'eggRed', 'eggYellow'];
		var eggPos = [[2377, 1263], [771, 3000], [1650, 2477], [551, 321], [120, 1544], [2900, 2800]];
		for(var i = 0; i < 6; i++){
			var pos = eggPos[i];
			egg = game.add.sprite(pos[0], pos[1], eggArray[i], '');
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
		for(var i = 0; i < 14; i++){
			// create ping sprite
			if(i < 13){
				ping = game.add.sprite(0, 0, 'ping', '');
				ping.scale.set(1.2);
			}
			else{
				ping = game.add.sprite(0, 0, 'pingEnd', 0);
				ping.animations.add('Ending', [0, 1, 2, 3, 4, 5, 6, 7, 8]);
			}
			ping.rotation = 90;
			ping.anchor.set(5, 0.5);
			pings.add(ping);
		}
		return pings;
	},
	// adds egg collectables to camera hud
	addCollected: function(){
		var collected = game.add.group();
		var collect;
		var eggArray = ['eggBlue', 'eggGreen', 'eggOrange', 'eggPurple', 'eggRed', 'eggYellow'];
		for(var i = 0; i < 6; i++){
			collect = game.add.sprite(player.x, player.y, eggArray[i]);
			collect.fixedToCamera = true;
			collect.cameraOffset.setTo(320 + (32 * i), game.camera.height-20);
			collect.anchor.set(0.5);
			collect.alpha = .25;
			collected.add(collect);
		}
		return collected;
	},
	collectShrimp: function(player, shrimp){
		
		if(shrimp.sprite.alive){
			// play shrimp collection sound
			this.fxEat.play();

			// respawn shrimp
			shrimp.reset(game.rnd.between(9, game.world.width-9), game.rnd.between(9, game.world.height-9));

			// make shrimp invisible and dead
			shrimp.sprite.visible = false;
			shrimp.sprite.alive = false;

			// increases scale of aura
			if(aura.scale.x < 12){
				aura.scale.x += 1;
				aura.scale.y += 1;
			}

			// increase player speed
			player.sprite.speed = 1000;
			player.sprite.timer = game.time.now + 100;

			player.sprite.shrimpCounter++;
		}
	},
	collectShrimpGrid: function(player, shrimp){
		if(shrimp.sprite.alive){
			// turn off collision
			shrimp.sprite.body.enable = false;

			// play shrimp collection sound
			this.fxEat.play();

			// move to next place on grid.
			this.shrimpGridFix(player, shrimp);
			
			// increases scale of aura
			if(aura.scale.x < 12){
				aura.scale.x += 1;
				aura.scale.y += 1;
			}

			// increase player speed
			player.sprite.speed = 1000;
			player.sprite.timer = game.time.now + 100;

			player.sprite.shrimpCounter++;
		}
	},
	shrimpGridFix: function(player, shrimp){
		// respawn shrimp to empty position
		shrimp.reset(shrimpCursor[0], shrimpCursor[1]);

		shrimp.sprite.visible = false;
		shrimp.sprite.alive = false;

		// get original position of shrimp
		var index = shrimpGrid.getChildIndex(shrimp.sprite);
		var vector = shrimpArray[index];

		// change shrimps position on position array
		var reset = new Array(2);
		reset[0] = shrimpCursor[0];
		reset[1] = shrimpCursor[1];
		shrimpArray[index] = reset;

		// save original position of shrimp as empty position
		shrimpCursor[0] = vector[0];
		shrimpCursor[1] = vector[1];
	},
	collisionEnemy: function(player, enemy){
		// shrink arua when enemy strikes
		if(aura.scale.x > 1.5){
			//aura.scale.x -= 0.5;
			//aura.scale.y -= 0.5;
		}
	},
	collectEgg: function(player, egg){
		//collectBar.alpha = 1;
		this.fxCollect.play();
		egg.sprite.kill();
		egg.sprite.alive = false;
		var index = eggs.getChildIndex(egg.sprite);
		var collect = collected.getAt(index);
		collect.alpha = 1;
		collectBar.alpha = 0.5;
		if(eggs.countDead() == 2){
			player.sprite.secondCollected = true;
		}
		player.sprite.firstCollected = true;
		this.checkCollected();
	},
	checkCollected: function(){
		if(eggs.countDead() == 6){
			player.collected = true;
		}
	},
	// enemy movement logic
	pingLogic: function(eggs, enemies, player, pings, aura, end, bool){
		var length = 210;
		// create ping sprite
		for(var i = 0; i < 6; i++){
			// get sprites in group
			var egg = eggs.getAt(i);
			var ping = pings.getAt(i);
			// checks if egg is alive so it'll ping
			if(egg.alive){
				if(bool){
					// change ping alpha
					this.pingAlpha(player, ping, egg);
				}

				// check if aura is too small
				if((aura.width/length + 1/(aura.width/length + 1000)) + 1 > 2.2){
					// resizes ping to aura
					ping.anchor.x = (aura.width/length + 1/(aura.width/length + 1000)) + 1;
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
		for(var i = 6; i < 13; i++){
			// get sprites in group
			var enemy = enemies.getAt(i-6);
			var ping = pings.getAt(i);

			// checks if enemy is alive so it'll ping
			if(enemy.alive){
				ping.visible = true;
				if(bool){
					// change ping alpha
					this.pingAlpha(player, ping, enemy);
				}

				// check if aura is too small
				if((aura.width/length + 1/(aura.width/length + 1000)) + 1 > 2.2){
					// resizes ping to aura
					ping.anchor.x = (aura.width/length + 1/(aura.width/length + 1000)) + 1;
				}

				// calculate angle of player to enemy
				var angle = Phaser.Math.angleBetween(player.x, player.y, enemy.x, enemy.y);

				// correct angle of enemy
				ping.angle = Phaser.Math.radToDeg(angle) + 180;
			}
			else{
				ping.visible = false;
			}
		}
		length = 1200;
		var ping = pings.getAt(13);
		if(player.collected){
			ping.animations.play('Ending', 6, true);
			// get both sprites
			ping.visible = true;
			if(bool){
				// change ping alpha
				this.pingAlpha(player, ping, end);
			}

			// check if aura is too small
			if((aura.width/length + 1/(aura.width/length + 20000)) + 1 > 2.2){
				// resizes ping to aura
				ping.anchor.x = (aura.width/length + 1/(aura.width/length + 20000)) + 1;
			}

			// calculate angle of player to end
			var angle = Phaser.Math.angleBetween(player.x, player.y, end.x, end.y);

			// correct angle of end
			ping.angle = Phaser.Math.radToDeg(angle) + 180;
		}
		else{
			ping.visible = false;
		}
	},
	pingAlpha: function(player, ping, obj){
		var distance = this.distanceFrom(player, obj);
		ping.alpha = 400/(distance);
		if(ping.alpha > 0.99){
			ping.alpha = 1;
		}
		if(ping.alpha < 0.19){
			ping.alpha = 0.18;
		}
	},
	distanceFrom: function(obj1, obj2){
		return Math.sqrt(Math.pow((obj2.x - obj1.x), 2) + Math.pow((obj2.y - obj1.y), 2));
	},
	distanceFromHead: function(obj1, obj2){
		return Math.sqrt(Math.pow((obj2.x - obj1[0]), 2) + Math.pow((obj2.y - obj1[1]), 2));
	},
	checkDistance: function(obj1, obj2){
		var check = Math.sqrt(Math.pow((obj2.x - obj1[0]), 2) + Math.pow((obj2.y - obj1[1]), 2));
		if(check < aura.width/44){
			return true;
		}
		else{
			return false;
		}
	},
	enemyMovement: function(enemy, player, spit){
		var enemyR = this.rotation(enemy.x, enemy.y, enemy.x , enemy.y - 90, enemy.angle);
		if(spit.alive && this.checkDistance(enemyR, spit)){
			// makes sure that if enemy is already on spit that it stops
			if(!this.checkOverlap(enemy, spit)){
				enemy.animations.play('swim', 12, true);
				this.accelerateToObject(enemy, spit, enemy.speed);
			}
			else{
				enemy.animations.play('stop', 0, false);
			}
		}
		// enemy chases after player
		else if(this.checkDistance(enemyR, player)){
			this.accelerateToObject(enemy, player, enemy.speed);

			var pos = this.rotation(enemy.x, enemy.y, enemy.x, enemy.y - 75, enemy.angle);
			enemy.hitBox.x = pos[0];
			enemy.hitBox.y = pos[1];
			enemy.hitBox.angle = enemy.angle;

			// add spacebar tutorial
			if(player.firstChase){
				this.SpaceBar.x = player.x
				this.SpaceBar.y = player.y
				this.SpaceBar.fixedToCamera = true;
				this.SpaceBar.cameraOffset.setTo(game.camera.width/2, game.camera.height/2 + 300);
				this.SpaceBar.anchor.set(0.5);
				this.SpaceBar.scale.set(2);
				this.SpaceBar.alive = true;
				player.firstChase = false;
			}

			// Chase enemy animation
			if(this.distanceFromHead(enemyR, player) < 18){//24.5
				var biteAnim = enemy.bite;
				var bitingAnim = enemy.biting;
				if(enemy.bool2){
					enemy.animations.play('bite', 6, false);
					enemy.slowTimer = game.time.now + (aura.width/3) + 50;
					enemy.bool2 = false;
					enemy.bool1 = true;
					enemy.speed = 80;
				}
				else if(biteAnim.isPlaying){
					enemy.bit = true;
				}
				else if(!biteAnim.isPlaying || !bitingAnim.isPlaying){
					enemy.slowTimer = game.time.now + (aura.width/3) + 25;
					enemy.animations.play('biting', 16, false);
					enemy.bit = false;
				}

				if(this.checkOverlap(player, enemy.hitBox)){
					if(enemy.bit){
						player.boolcounter++;
					}
					/*if(bitingAnim.frame == 21){
						player.endbool = true;
					}*/
				}
			}
			else if(this.distanceFromHead(enemyR, player) < (aura.width/80)){
				var openAnim = enemy.open;
				var openSwimAnim = enemy.openSwim;
				if(enemy.bool1){
					enemy.animations.play('open', 10, false);
					enemy.bool1 = false;
					enemy.bool2 = true;
					enemy.bit = false;
				}
				else if(!openAnim.isPlaying && !openSwimAnim.isPlaying){
					enemy.animations.play('openSwim', 12, false);
				}
			}
			else{
				enemy.animations.play('swim', 12, true);
				enemy.bool1 = true;
				enemy.bool2 = true;
				enemy.bit = false;
			}
		}
		// random movement for enemy
		else{
			if(enemy.speed  != 160){
				enemy.speed = 160;
			}
			enemy.animations.play('swim', 12, true);
			if(game.time.now > enemyTimer){
				forward = (forward + 1) % 360;
				enemyTimer = game.time.now + 20;
			}
			this.enemyPath(enemy, forward, enemy.speed);
			enemy.slowTimer = 0;
			enemy.bool1 = true;
			enemy.bool2 = true;
		}

		if(game.time.now > enemy.slowTimer){
			enemy.speed = 160;
		}

		// plays chase sound
		if(this.checkDistance(enemyR, player) && this.fxChase.isPlaying == false){
			this.fxChase.play();
		}

		// resets orientation of enemy
		if(enemy.scale.x > 0 && enemy.body.angle > 0 && enemy.body.angle < 180){
			enemy.scale.x *= -1;
		}
		if(enemy.scale.x < 0 && enemy.body.angle < 0 && enemy.body.angle > -180){
			enemy.scale.x *= -1;
		}
	},
	// accelerateToObject found here: https://phaser.io/examples/v2/p2-physics/accelerate-to-object
	accelerateToObject: function(obj1, obj2, speed){
		var angle = Math.atan2(obj2.y - obj1.y, obj2.x - obj1.x);
		// correct angle of enemy
		var angleTo = Phaser.Math.radToDeg(angle);
		var objAngle = ((obj1.angle + 630) % 360);
		var angleCalc = (angleTo + 360) % 360;

		// distance found here: https://stackoverflow.com/questions/7570808/how-do-i-calculate-the-difference-of-two-angle-measures/30887154
		var dist = (objAngle - angleCalc + 360) % 360;
		var distance = dist;
		if(dist > 180){distance = 360 - dist;}
		if(distance > 2){
			this.angleTo(obj1, dist);
		}
		else{
			obj1.body.rotation = angle + game.math.degToRad(90);
		}

		// accelerate to object
		obj1.body.force.x = Math.cos(angle) * speed;
		obj1.body.force.y = Math.sin(angle) * speed;
	},
	enemyPath: function(obj1, obj2, speed){
		var angle =  game.math.degToRad(obj2);
		// correct angle of enemy
		var angleTo = Phaser.Math.radToDeg(angle);
		var objAngle = ((obj1.angle + 630) % 360);
		var angleCalc = (angleTo + 360) % 360;

		// distance found here: https://stackoverflow.com/questions/7570808/how-do-i-calculate-the-difference-of-two-angle-measures/30887154
		var dist = (objAngle - angleCalc + 360) % 360;
		var distance = dist;
		if(dist > 180){distance = 360 - dist;}
		if(distance > 2){
			this.angleTo(obj1, dist);
		}
		else{
			obj1.body.rotation = angle + game.math.degToRad(90);
		}

		// accelerate to object
		obj1.body.force.x = Math.cos(angle) * speed;
		obj1.body.force.y = Math.sin(angle) * speed;
	},
	angleTo: function(obj, dist){
		//var dist = (objAng - angle + 360) % 360;
		if(dist > 180){
			obj.body.angle += 2;
		}
		else{
			obj.body.angle -= 2;
		}
	},
	// random movement logic
	moveEnemy: function(obj, speed, X, Y){
		var angle = Math.atan2(Y - obj.y, X - obj.x);

		// correct angle of enemy
		obj.body.rotation = angle + game.math.degToRad(90);

		// accelerate to object
		obj.body.force.x = Math.cos(angle) * swapeed;
		obj.body.force.y = Math.sin(angle) * speed;
	},
	// found here: https://stackoverflow.com/questions/17410809/how-to-calculate-rotation-in-2d-in-javascript
	rotation: function(cx, cy, x, y, angle){
			angle = ((angle + 360) % 360);
		var radians = game.math.degToRad(angle),
			cos = Math.cos(radians),
			sin = Math.sin(radians),
			nx = (cos * (x - cx)) - (sin * (y - cy)) + cx,
			ny = (cos * (y - cy)) + (sin * (x - cx)) + cy;
		return [nx, ny];
	},
	shrimpMovement: function(shrimp, player){
		// moves shrimp away from player
		if(this.checkDist(shrimp, player, 44)){
			this.accelerateFromObject(shrimp, player, 24);
		}

		// makes shrimp visble while not seen by player
		if(!shrimp.visible){
			if(!this.checkDist(shrimp, player, 42)){
				shrimp.visible = true;
				shrimp.alive = true;
			}
		}
	},
	shrimpGridMovement: function(shrimp, player){
		// moves shrimp away from player
		if(this.checkDist(shrimp, player, 44)){
			this.accelerateFromObject(shrimp, player, 24);
		}

		// makes shrimp visble while not seen by player
		if(!shrimp.visible){
			if(!this.checkDist(shrimp, player, 42)){
				shrimp.visible = true;
				shrimp.alive = true;
				shrimp.body.enable = true;
			}
		}
	},
	checkDist: function(obj1, obj2, radius){
		var check = Math.sqrt(Math.pow((obj2.x - obj1.x), 2) + Math.pow((obj2.y - obj1.y), 2));
		if(check < aura.width/radius){
			return true;
		}
		else{
			return false;
		}
	},
	accelerateFromObject: function(obj1, obj2, speed){
		var angle = Math.atan2(obj2.y - obj1.y, obj2.x - obj1.x);
		angle = (angle + 180) % 360;

		obj1.body.rotation = angle + game.math.degToRad(90);

		// accelerate to object
		obj1.body.force.x = Math.cos(angle) * speed;
		obj1.body.force.y = Math.sin(angle) * speed;
	},
	// basic rectangle overlap here: http://examples.phaser.io/_site/view_full.html?d=sprites&f=overlap+without+physics.js&t=overlap%20without%20physics
	checkOverlap: function(obj1, obj2){
		var boundA = obj1.getBounds();
		var boundB = obj2.getBounds();

		return Phaser.Rectangle.intersects(boundA, boundB);
	},
	create2DArray: function(arraySize, vectorSize){
		var arr = new Array(arraySize);

		for(var i = 0; i < arr.length; i++){
			arr[i] = new Array(vectorSize);
		}
		return arr;
	},
	render: function(){
	}
};