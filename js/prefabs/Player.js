// We Hate Mornings
// Daniel Ruderman, Jason Yang, Kelly Huang
// Glowing Abyss
// Player prefab

// create Player constructor
var Player = function(game, speed, key, frame) {
	// new Sprite(game, x, y, key, frame)
	Phaser.Sprite.call(this, game, game.world.width/2, 20, key, frame);
	game.physics.p2.enable(this);
	this.animations.add('swimming', [0, 1, 2, 3]);
	this.body.clearShapes();
	this.body.loadPolygon("physicsFish", "fishPlayer-39x22");
	this.body.damping = damping;
	this.speed = speed;
	this.fx = game.add.audio('move');
	this.fx2 = game.add.audio('move2');
	this.fxTimer = 0;
	this.fxCheck = 1;
	this.boolcounter = 0;
	this.shrimpCounter = 0;
	this.body.angle += 180;
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

	if(game.input.keyboard.isDown(Phaser.Keyboard.A)){
		this.body.rotateRight(75);
	}
	else if(game.input.keyboard.isDown(Phaser.Keyboard.D)){
		this.body.rotateLeft(75);
	}
	else{
		this.body.setZeroRotation();
	}

	if(game.input.keyboard.isDown(Phaser.Keyboard.W)){
		this.body.thrust(this.speed);
		this.animations.play('swimming', 5, true);
		if(game.time.now > this.fxTimer){
			if(this.fxCheck%2==0) {
				this.fx.play();
				this.fxcheck = this.fxcheck/2;
			}
			else{
				this.fx2.play();
			}
			this.fxCheck++;
			this.fxTimer = game.time.now + 400;
		}
	}
	else if(game.input.keyboard.isDown(Phaser.Keyboard.S)){
		this.body.reverse(this.speed/2);
		this.animations.play('swimming', 5, true);
		if(game.time.now > this.fxTimer){
			if(this.fxCheck%2==0) {
				this.fx.play();
				this.fxcheck = this.fxcheck/2;
			}
			else{
				this.fx2.play();
			}
			this.fxCheck++;
			this.fxTimer = game.time.now + 400;
		}
	}
	else{
		this.animations.stop('swimming');
	}

	/*var angle = (this.angle + 450) % 360;
	// P2 logic for angular movement
	if(((angle > 0 && angle < 180) && !((game.input.keyboard.isDown(Phaser.Keyboard.A) || game.input.keyboard.isDown(Phaser.Keyboard.D)) && !this.bool0))){ // weird issued with code bouncing back
		this.bool0 = true;
		if(game.input.keyboard.isDown(Phaser.Keyboard.A)){
			this.body.rotateLeft(75);
		}
		else if(game.input.keyboard.isDown(Phaser.Keyboard.D)){
			this.body.rotateRight(75);
		}
		else{
			this.body.setZeroRotation();
		}
	}
	else if(((angle > 180 && angle < 360) && !((game.input.keyboard.isDown(Phaser.Keyboard.A) || game.input.keyboard.isDown(Phaser.Keyboard.D)) && this.bool0))){
		this.bool0 = false;
		if(game.input.keyboard.isDown(Phaser.Keyboard.A)){
			this.body.rotateRight(75);
		}
		else if(game.input.keyboard.isDown(Phaser.Keyboard.D)){
			this.body.rotateLeft(75);
		}
		else{
			this.body.setZeroRotation();
		}
	}*/
		
	
	/*if((angle > 0 && angle < 180) && !((game.input.keyboard.isDown(Phaser.Keyboard.W) || game.input.keyboard.isDown(Phaser.Keyboard.S)) && !this.bool1) || ((game.input.keyboard.isDown(Phaser.Keyboard.W) || game.input.keyboard.isDown(Phaser.Keyboard.S)) && this.bool1)){
		this.bool1 = true;
		if(game.input.keyboard.isDown(Phaser.Keyboard.W)){
			this.body.thrust(this.speed);
			this.animations.play('swimming', 5, true);
			if(game.time.now > this.fxTimer){
				if(this.fxCheck%2==0) {
					this.fx.play();
					this.fxcheck = this.fxcheck/2;
				}
				else{
					this.fx2.play();
				}
				this.fxCheck++;
				this.fxTimer = game.time.now + 400;
			}
		}
		else if(game.input.keyboard.isDown(Phaser.Keyboard.S)){
			this.body.reverse(this.speed/2);
			this.animations.play('swimming', 5, true);
			if(game.time.now > this.fxTimer){
				if(this.fxCheck%2==0) {
					this.fx.play();
					this.fxcheck = this.fxcheck/2;
				}
				else{
					this.fx2.play();
				}
				this.fxCheck++;
				this.fxTimer = game.time.now + 400;
			}
		}
		else{
			this.animations.stop('swimming');
		}
	}
	else if((angle > 180 && angle < 360) && !((game.input.keyboard.isDown(Phaser.Keyboard.W) || game.input.keyboard.isDown(Phaser.Keyboard.S)) && this.bool1) || ((game.input.keyboard.isDown(Phaser.Keyboard.W) || game.input.keyboard.isDown(Phaser.Keyboard.S)) && !this.bool1)){
		this.bool1 = false;
		if(game.input.keyboard.isDown(Phaser.Keyboard.W)){
			this.body.reverse(this.speed/2);
			this.animations.play('swimming', 5, true);
			if(game.time.now > this.fxTimer){
				if(this.fxCheck%2==0) {
					this.fx.play();
					this.fxcheck = this.fxcheck/2;
				}
				else{
					this.fx2.play();
				}
				this.fxCheck++;
				this.fxTimer = game.time.now + 400;
			}
		}
		else if(game.input.keyboard.isDown(Phaser.Keyboard.S)){
			this.body.thrust(this.speed);
			this.animations.play('swimming', 5, true);
			if(game.time.now > this.fxTimer){
				if(this.fxCheck%2==0) {
					this.fx.play();
					this.fxcheck = this.fxcheck/2;
				}
				else{
					this.fx2.play();
				}
				this.fxCheck++;
				this.fxTimer = game.time.now + 400;
			}
		}
		else{
			this.animations.stop('swimming');
		}
	}
	else{
	}*/
}