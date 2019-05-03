function bullets(game, x, y, speedX, speedY, key){
	Phaser.Sprite.call(this, game, x, y, key, '');

	// add properties
	this.anchor.set(0.5);
	this.maxspeed = 800;
	this.speedX = speedX;
	this.speedY = speedY;
	this.posx = x;
	this.posy = y;
	this.spread = 60;
	this.angle = 52;

	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.body.bounce.set(0.2);
}

bullets.prototype = Object.create(Phaser.Sprite.prototype);
bullets.prototype.constructor = bullets;

bullets.prototype.update = function(){

	// bullet direction logic
	if(this.speedX == -1 && this.speedY == -1){
		this.world.x = this.posx + (Math.floor(Math.random() * this.spread) - this.spread/2);
		this.world.y = this.posy + (Math.floor(Math.random() * this.spread) - this.spread/2);
		this.body.velocity.y = this.maxspeed/2 + Math.floor(Math.random() * this.angle) - this.angle/2;
		this.body.velocity.x = this.maxspeed/2 + Math.floor(Math.random() * this.angle) - this.angle/2;
	}
	else if(this.speedX == 1 && this.speedY == -1){
		this.world.x = this.posx + (Math.floor(Math.random() * this.spread) - this.spread/2);
		this.world.y = this.posy + (Math.floor(Math.random() * this.spread) - this.spread/2);
		this.body.velocity.y = this.maxspeed/2 + Math.floor(Math.random() * this.angle) - this.angle/2;
		this.body.velocity.x = -this.maxspeed/2 + Math.floor(Math.random() * this.angle) - this.angle/2;
	}
	else if(this.speedX == -1 && this.speedY == 1){
		this.world.x = this.posx + (Math.floor(Math.random() * this.spread) - this.spread/2);
		this.world.y = this.posy + (Math.floor(Math.random() * this.spread) - this.spread/2);
		this.body.velocity.y = -this.maxspeed/2 + Math.floor(Math.random() * this.angle) - this.angle/2;
		this.body.velocity.x = this.maxspeed/2 + Math.floor(Math.random() * this.angle) - this.angle/2;
	}
	else if(this.speedX == 1 && this.speedY == 1){
		this.world.x = this.posx + (Math.floor(Math.random() * this.spread) - this.spread/2);
		this.world.y = this.posy + (Math.floor(Math.random() * this.spread) - this.spread/2);
		this.body.velocity.y = -this.maxspeed/2 + Math.floor(Math.random() * this.angle) - this.angle/2;
		this.body.velocity.x = -this.maxspeed/2 + Math.floor(Math.random() * this.angle) - this.angle/2;
	}
	else if(this.speedX == 0 && this.speedY == -1){
		this.world.x = this.posx + (Math.floor(Math.random() * this.spread) - this.spread/2);
		this.body.velocity.y = this.maxspeed;
		this.body.velocity.x = Math.floor(Math.random() * this.angle) - this.angle/2;
	}
	else if(this.speedX == 0 && this.speedY == 1){
		this.world.x = this.posx + (Math.floor(Math.random() * this.spread) - this.spread/2);
		this.body.velocity.y = -this.maxspeed;
		this.body.velocity.x = Math.floor(Math.random() * this.angle) - this.angle/2;
	}
	else if(this.speedX == -1 && this.speedY == 0){
		this.world.y = this.posy + (Math.floor(Math.random() * this.spread) - this.spread/2);
		this.body.velocity.x = this.maxspeed;
		this.body.velocity.y = Math.floor(Math.random() * this.angle) - this.angle/2;
	}
	else{
		this.world.y = this.posy + (Math.floor(Math.random() * this.spread) - this.spread/2);
		this.body.velocity.x = -this.maxspeed;
		this.body.velocity.y = Math.floor(Math.random() * this.angle) - this.angle/2;
	}

	// check if out of bounds
	if ((this.world.x > game.world.width + 30) || (this.world.x < -30) || 
		(this.world.y > game.world.height + 30) || (this.world.y < -30)){
		this.destroy();
	}
}