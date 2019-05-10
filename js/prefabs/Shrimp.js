// Shrimp prefab

var Shrimp = function(game, key, frame) {
	// new Sprite(game, x, y, key, frame)
	Phaser.Sprite.call(this, game, game.rnd.between(9, game.world.width-9), game.rnd.between(9, game.world.height-9), key, frame);
	game.physics.p2.enable(this);
	this.body.damping = damping;
};

// inherit prototype from Phaser.Sprite and set constructor to Shrimp
// the Object.create method creates a new object w/ the specified prototype object and properties
Shrimp.prototype = Object.create(Phaser.Sprite.prototype);
Shrimp.prototype.constructor = Shrimp;