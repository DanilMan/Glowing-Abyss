// We Hate Mornings
// Daniel Ruderman, Jason Yang, Kelly Huang
// Glowing Abyss
// A fish trying to survive in darkness
// Updated 5/2/2019

// strict interpretation
"use strict";

// define globals
var game;
var player;
var spit;
var shrimp;
var enemy;
var aura;
var eggs;
var pings;
var enemySpeed;
var speed;
var damping;
var auraTimer;
var spitTimer;
var enemyTimer;
var pingTimer;
var timer;
var forward;

// wait for browser to load before creating Phaser game
window.onload = function() {
	// define game
	game = new Phaser.Game(480, 480, Phaser.AUTO, 'myGame');
	console.log('main.js');
	
	// define states
	game.state.add('Load', Load);
	game.state.add('Menu', Menu);
	game.state.add('Play', Play);
	game.state.add('GameOver', GameOver);
	game.state.start('Load');
}