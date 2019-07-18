// We Hate Mornings
// Daniel Ruderman, Jason Yang, Kelly Huang
// Glowing Abyss
// Enemy prefab

var Enemy = function(game, x, y, key, frame) {
	// new Sprite(game, x, y, key, frame)
	Phaser.Sprite.call(this, game, x, y, key, frame);
	game.physics.p2.enable(this);
	this.stop = this.animations.add('stop', [0]);
	this.swim = this.animations.add('swim', [0, 1, 2, 3, 4, 5]);
	this.open = this.animations.add('open', [7, 8, 9, 10, 11]);
	this.openSwim = this.animations.add('openSwim', [12, 13, 14, 15, 16, 17]);
	this.bite = this.animations.add('bite', [19, 20, 21]);
	this.biting = this.animations.add('biting', [7, 8, 9, 10, 19, 20, 21]);
	this.body.clearShapes();
	this.body.loadPolygon("physicsEnemy", "Enemy");
	this.body.damping = damping;
	this.body.angularDamping = damping;
};

// inherit prototype from Phaser.Sprite and set constructor to Enemy
// the Object.create method creates a new object w/ the specified prototype object and properties
Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;