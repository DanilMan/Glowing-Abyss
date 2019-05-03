function Player(game, key, frame){
	Phaser.Sprite.call(this, game, game.world.width/2, game.world.height, key, frame);

	// add properties
	this.anchor.set(0.5);
	this.maxspeed = 350;
	this.acceleration = 1500;
	this.drag = 1100;
	this.bullet = null;

	// set up player physics
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.body.collideWorldBounds = true;
	this.body.bounce.set(0.25);
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function(){

	if( this.body.touching.down == true || this.body.touching.up == true || 
		this.body.touching.left == true || this.body.touching.right == true){
		this.body.drag.x = this.drag;
	}
	else{
		this.body.drag.x = 0;
	}
	
	// keypress logic
	if(game.input.keyboard.isDown(Phaser.Keyboard.UP) && game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
		// cap player's max velocity
		this.body.maxVelocity.x = this.maxspeed * 1.2;
		this.body.maxVelocity.y = this.maxspeed;

		// player acceleration
		this.body.acceleration.y = -this.acceleration;
		this.body.acceleration.x = -this.acceleration;
		// bullets(game, x, y, speedX, speedY, key)
		this.bullet = new bullets(game, this.world.x + this.width/2, this.world.y + this.height/2, -1, -1, 'bullet');
		game.add.existing(this.bullet);
	}
	else if(game.input.keyboard.isDown(Phaser.Keyboard.UP) && game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
		// cap player's max velocity
		this.body.maxVelocity.x = this.maxspeed * 1.2;
		this.body.maxVelocity.y = this.maxspeed;

		// player acceleration
		this.body.acceleration.y = -this.acceleration;
		this.body.acceleration.x = this.acceleration;
		// bullets(game, x, y, speedX, speedY, key)
		this.bullet = new bullets(game, this.world.x - this.width/2, this.world.y + this.height/2, 1, -1, 'bullet');
		game.add.existing(this.bullet);
	}
	else if(game.input.keyboard.isDown(Phaser.Keyboard.DOWN) && game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
		// cap player's max velocity
		this.body.maxVelocity.x = this.maxspeed * 1.2;
		this.body.maxVelocity.y = this.maxspeed * 1.2;

		// player acceleration
		this.body.acceleration.y = this.acceleration;
		this.body.acceleration.x = -this.acceleration;
		// bullets(game, x, y, speedX, speedY, key)
		this.bullet = new bullets(game, this.world.x + this.width/2, this.world.y - this.height/2, -1, 1, 'bullet');
		game.add.existing(this.bullet);
	}
	else if(game.input.keyboard.isDown(Phaser.Keyboard.DOWN) && game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
		// cap player's max velocity
		this.body.maxVelocity.x = this.maxspeed * 1.2;
		this.body.maxVelocity.y = this.maxspeed * 1.2;

		// player acceleration
		this.body.acceleration.y = this.acceleration;
		this.body.acceleration.x = this.acceleration;
		// bullets(game, x, y, speedX, speedY, key)
		this.bullet = new bullets(game, this.world.x - this.width/2, this.world.y - this.height/2, 1, 1, 'bullet');
		game.add.existing(this.bullet);
	}
	else if(game.input.keyboard.isDown(Phaser.Keyboard.UP)){
		// cap player's max velocity
		this.body.maxVelocity.x = this.maxspeed;
		this.body.maxVelocity.y = this.maxspeed;

		// player acceleration
		this.body.acceleration.y = -this.acceleration;
		// bullets(game, x, y, speedX, speedY, key)
		this.bullet = new bullets(game, this.world.x, this.world.y + this.height/2, 0, -1, 'bullet');
		game.add.existing(this.bullet);
	}
	else if(game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
		// cap player's max velocity
		this.body.maxVelocity.x = this.maxspeed;
		this.body.maxVelocity.y = this.maxspeed * 2;

		// player acceleration
		this.body.acceleration.y = this.acceleration;
		// bullets(game, x, y, speedX, speedY, key)
		this.bullet = new bullets(game, this.world.x, this.world.y - this.height/2, 0, 1, 'bullet');
		game.add.existing(this.bullet);
	}
	else if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
		// cap player's max velocity
		this.body.maxVelocity.x = this.maxspeed * 1.5;
		this.body.maxVelocity.y = this.maxspeed;

		// player acceleration
		this.body.acceleration.x = -this.acceleration;
		// bullets(game, x, y, speedX, speedY, key)
		this.bullet = new bullets(game, this.world.x + this.width/2, this.world.y, -1, 0, 'bullet');
		game.add.existing(this.bullet);
	}
	else if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
		// cap player's max velocity
		this.body.maxVelocity.x = this.maxspeed * 1.5;
		this.body.maxVelocity.y = this.maxspeed;

		// player acceleration
		this.body.acceleration.x = this.acceleration;
		// bullets(game, x, y, speedX, speedY, key)
		this.bullet = new bullets(game, this.world.x - this.width/2, this.world.y, 1, 0, 'bullet');
		game.add.existing(this.bullet);
	}
	else{
		this.body.acceleration.x = 0;
		this.body.acceleration.y = 0;
		// cap player's max velocity
		this.body.maxVelocity.y = this.maxspeed * 2;

		// player acceleration
	}
}