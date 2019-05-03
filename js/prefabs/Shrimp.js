// Shrimp prefab

var Shrimp = function(game, key, frame) {
	// new Sprite(game, x, y, key, frame)
	Phaser.Sprite.call(this, game, game.rnd.between(9, game.width-9), game.rnd.between(9, game.height-9), key, frame);
	game.physics.enable(this, Phaser.Physics.ARCADE);
	this.anchor.set(0.5);
};

// inherit prototype from Phaser.Sprite and set constructor to Shrimp
// the Object.create method creates a new object w/ the specified prototype object and properties
Shrimp.prototype = Object.create(Phaser.Sprite.prototype);
Shrimp.prototype.constructor = Shrimp;