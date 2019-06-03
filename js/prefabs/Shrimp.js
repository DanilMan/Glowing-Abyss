// We Hate Mornings
// Daniel Ruderman, Jason Yang, Kelly Huang
// Glowing Abyss
// Shrimp prefab

var Shrimp = function(game, x, y, key, frame) {
	// new Sprite(game, x, y, key, frame)
	Phaser.Sprite.call(this, game, x, y, key, frame);
	this.animations.add('motion', [0, 1]);
	game.physics.p2.enable(this);
	this.body.damping = damping;
	this.body.angularDamping = damping;
};

// inherit prototype from Phaser.Sprite and set constructor to Shrimp
// the Object.create method creates a new object w/ the specified prototype object and properties
Shrimp.prototype = Object.create(Phaser.Sprite.prototype);
Shrimp.prototype.constructor = Shrimp;

// override the Phaser.Sprite update function
Shrimp.prototype.update = function() {
	this.animations.play('motion', 2.5, true);
}