// We Hate Mornings
// Daniel Ruderman, Jason Yang, Kelly Huang
// Glowing Abyss
// Player prefab

// create Player constructor
var Player = function(game, speed, key, frame) {
	// new Sprite(game, x, y, key, frame)
	Phaser.Sprite.call(this, game, game.world.width/2, game.world.height/2, key, frame);
	game.physics.p2.enable(this);
	this.body.damping = damping;
	this.speed = speed;
	this.fx = game.add.audio('move');
	this.fx2 = game.add.audio('move2');
	this.fxTimer = 0;
	this.fxCheck = 1;
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

	if(this.scale.x > 0 && this.body.angle > 0 && this.body.angle < 180){
		this.scale.x *= -1;
	}
	if(this.scale.x < 0 && this.body.angle < 0 && this.body.angle > -180){
		this.scale.x *= -1;
	}

	// P2 logic for angular movement
	if(game.input.keyboard.isDown(Phaser.Keyboard.A)){
		this.body.rotateLeft(75);
	}
	else if(game.input.keyboard.isDown(Phaser.Keyboard.D)){
		this.body.rotateRight(75);
	}
	else{
		this.body.setZeroRotation();
	}
	if(game.input.keyboard.isDown(Phaser.Keyboard.W)){
		this.body.thrust(this.speed);
		if(game.time.now > this.fxTimer){
			if(this.fxCheck%2==0) {
				this.fx.play();
			}
			else{
				this.fx2.play();
			}
			this.fxCheck++;
			this.fxTimer = game.time.now + 400;
		}
		//if(this.fx.isPlaying == false){
		//	this.fx.play();
		//}
	}
}