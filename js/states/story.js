// We Hate Mornings
// Daniel Ruderman, Jason Yang, Kelly Huang
// Glowing Abyss
// Story state

var Story = function(game) {};
Story.prototype = {
	init: function(fxTheme){
		this.fxTheme = fxTheme;
	},
	create: function() {
		console.log('Story: create');

		// change background color
		game.stage.backgroundColor = '000';

		this.counter = 0;

		this.comic9 = game.add.sprite(0, 0, 'Comic9');

		this.comicAnimated = game.add.sprite(0, 0, 'ComicAnimated', 0);
		this.comicAnimated.animations.add('shake', [0, 1, 3, 4]);
		this.comicAnimated.animations.add('fall', [5, 6, 7]);

		this.comic1 = game.add.sprite(0, 0, 'Comic1');

		this.continue = game.add.sprite(game.world.width/2, game.world.height/2 + 380, 'Continue');
		this.continue.anchor.set(0.5);

		this.fxProceed = game.add.audio('comicProceed');
	},
	update: function() {
		if(game.input.keyboard.justPressed(Phaser.Keyboard.SPACEBAR)){
			this.fxProceed.play();
			if(this.counter == 0){
				this.comic1.destroy();
				this.comicAnimated.animations.play('shake', 20, true);
			}
			else if(this.counter == 1){
				this.comicAnimated.animations.play('fall', 1, false);
			}
			else if(this.counter == 2){
				this.comicAnimated.destroy();
			}
			else{
				this.continue.destroy();
				this.comic1. destroy();
				game.state.start('Play', true, false, this.fxTheme);
			}
			this.counter++;
		}
	}
};