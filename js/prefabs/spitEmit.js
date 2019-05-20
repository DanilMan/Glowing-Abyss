// We Hate Mornings
// Daniel Ruderman, Jason Yang, Kelly Huang
// Glowing Abyss
// spitEmit prefab

var Shrimp = function(game, x, y, key, frame) {
	// new Sprite(game, x, y, key, frame)
	Phaser.Sprite.call(this, game, x, y, key, frame);
	game.physics.p2.enable(this);
	this.body.damping = damping;
};

// inherit prototype from Phaser.Sprite and set constructor to Shrimp
// the Object.create method creates a new object w/ the specified prototype object and properties
Shrimp.prototype = Object.create(Phaser.Sprite.prototype);
Shrimp.prototype.constructor = Shrimp;