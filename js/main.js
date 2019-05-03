// Daniel Ruderman
// Glowing Abyss
// A fish trying to survive in darkness
// Updated 5/2/2019

// strict interpretation
"use strict";

// define globals
var game;

// wait for browser to load before creating Phaser game
window.onload = function() {
	// define game
	game = new Phaser.Game(800, 800, Phaser.AUTO, 'myGame');
	
	// define states
	game.state.add('Load', Load);
	game.state.add('Menu', Menu);
	game.state.add('Play', Play);
	game.state.add('GameOver', GameOver);
	game.state.start('Load');
}