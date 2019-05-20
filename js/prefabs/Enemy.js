// We Hate Mornings
// Daniel Ruderman, Jason Yang, Kelly Huang
// Glowing Abyss
// Enemy prefab

var Enemy = function(game, x, y, key, frame) {
	// new Sprite(game, x, y, key, frame)
	Phaser.Sprite.call(this, game, x, y, key, frame);
	game.physics.p2.enable(this);
	this.body.damping = damping;
};

// inherit prototype from Phaser.Sprite and set constructor to Enemy
// the Object.create method creates a new object w/ the specified prototype object and properties
Enemy.prototype = Object.create(Phaser.Sprite.prototype);
Enemy.prototype.constructor = Enemy;