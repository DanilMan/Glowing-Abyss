// Player prefab

// create Player constructor
var Player = function(game, speed, acceleration, aura, key, frame) {
	// new Sprite(game, x, y, key, frame)
	Phaser.Sprite.call(this, game, game.width/2, game.height/2, key, frame);
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.anchor.set(0.5);
	this.aura = aura;
	this.speed = speed;
	this.acceleration = acceleration;
	this.drag = 50;
};

// inherit prototype from Phaser.Sprite and set constructor to Player
// the Object.create method creates a new object w/ the specified prototype object and properties
Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

// override the Phaser.Sprite update function
Player.prototype.update = function() {

	// logic to check if player is touching objects and adds drag
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
		this.body.maxVelocity.x = this.speed;
		this.body.maxVelocity.y = this.speed;

		// player acceleration
		this.body.acceleration.y = -this.acceleration;
		this.body.acceleration.x = -this.acceleration;
	}
	else if(game.input.keyboard.isDown(Phaser.Keyboard.UP) && game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
		// cap player's max velocity
		this.body.maxVelocity.x = this.speed;
		this.body.maxVelocity.y = this.speed;

		// player acceleration
		this.body.acceleration.y = -this.acceleration;
		this.body.acceleration.x = this.acceleration;
	}
	else if(game.input.keyboard.isDown(Phaser.Keyboard.DOWN) && game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
		// cap player's max velocity
		this.body.maxVelocity.x = this.speed;
		this.body.maxVelocity.y = this.speed;

		// player acceleration
		this.body.acceleration.y = this.acceleration;
		this.body.acceleration.x = -this.acceleration;
	}
	else if(game.input.keyboard.isDown(Phaser.Keyboard.DOWN) && game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
		// cap player's max velocity
		this.body.maxVelocity.x = this.speed;
		this.body.maxVelocity.y = this.speed;

		// player acceleration
		this.body.acceleration.y = this.acceleration;
		this.body.acceleration.x = this.acceleration;
	}
	else if(game.input.keyboard.isDown(Phaser.Keyboard.UP)){
		// cap player's max velocity
		this.body.maxVelocity.x = this.speed;
		this.body.maxVelocity.y = this.speed;

		// player acceleration
		this.body.acceleration.y = -this.acceleration;
		this.body.acceleration.x = 0;
	}
	else if(game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
		// cap player's max velocity
		this.body.maxVelocity.x = this.speed;
		this.body.maxVelocity.y = this.speed;

		// player acceleration
		this.body.acceleration.y = this.acceleration;
		this.body.acceleration.x = 0;
	}
	else if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
		// cap player's max velocity
		this.body.maxVelocity.x = this.speed;
		this.body.maxVelocity.y = this.speed;

		// player acceleration
		this.body.acceleration.x = -this.acceleration;
		this.body.acceleration.y = 0;
	}
	else if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
		// cap player's max velocity
		this.body.maxVelocity.x = this.speed;
		this.body.maxVelocity.y = this.speed;

		// player acceleration
		this.body.acceleration.x = this.acceleration;
		this.body.acceleration.y = 0;
	}
	else{
		// cap player's max velocity
		this.body.acceleration.x = 0;
		this.body.acceleration.y = 0;
	}
}