// Player prefab

// create Player constructor
var Player = function(game, speed, aura, key, frame) {
	// new Sprite(game, x, y, key, frame)
	Phaser.Sprite.call(this, game, game.world.width/2, game.world.height/2, key, frame);
	game.physics.p2.enable(this);
	this.body.damping = damping;
	this.aura = aura;
	this.speed = speed;
};

// inherit prototype from Phaser.Sprite and set constructor to Player
// the Object.create method creates a new object w/ the specified prototype object and properties
Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

// override the Phaser.Sprite update function
Player.prototype.update = function() {

	//this.body.setZeroVelocity();

	// P2 logic for updownleftright movement
	/*if(cursor.left.isDown){
		this.body.moveLeft(this.speed);
	}
	else if(cursor.right.isDown){
		this.body.moveRight(this.speed);
	}
	if(cursor.up.isDown){
		this.body.moveUp(this.speed);
	}
	else if(cursor.down.isDown){
		this.body.moveDown(this.speed);
	}*/

	// P2 logic for angular movement
	if(cursor.left.isDown){
		this.body.rotateLeft(70);
	}
	else if(cursor.right.isDown){
		this.body.rotateRight(70);
	}
	else{
		this.body.setZeroRotation();
	}
	if(cursor.up.isDown){
		this.body.thrust(this.speed);
	}

	// ARCADE logic to check if player is touching objects and adds drag
	/*if( this.body.touching.down == true || this.body.touching.up == true || 
		this.body.touching.left == true || this.body.touching.right == true){
		this.body.drag.x = this.drag;
		this.body.drag.y = this.drag;
	}
	else{
		this.body.drag.x = this.drag/2;
		this.body.drag.y = this.drag/2;
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
	*/
}