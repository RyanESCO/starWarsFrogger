//Enemy object 
var Enemy = function() {
    this.xRange = [-150, 600];
    this.yRange = [60, 140, 220];
    this.speedRange = [150, 600];

    this.sprite = 'images/speeder.png';
    this.reset();
};

//Enemy reset function returns enemy to left side of canvas, in random row, at random speed
Enemy.prototype.reset = function(){
	var startPos = this.xRange[0];
    this.x = startPos;
    this.y = this.getRandomY();
    this.speed = this.getRandomSpeed();
};

//returns random integer within range bounds that will be used for enemy row
Enemy.prototype.getRandomY = function() {
    return this.yRange[Math.floor(Math.random() * this.yRange.length)];
};

//returns random speed within speed range bounds
Enemy.prototype.getRandomSpeed = function() {
    var minSpeed = this.speedRange[0],
        maxSpeed = this.speedRange[1];

    return Math.floor(Math.random() * (maxSpeed - minSpeed)) + minSpeed;
};

//Enemy update calculates new x position based on time elapsed and resets position when necessary
Enemy.prototype.update = function(dt) {
    var maxPos = this.xRange[1];
    this.x += this.speed * dt;

    if (this.x > maxPos) {
        this.reset();
    }
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Gem object can appear on any of the canvas tiles on the top two rows
var Gem = function(){
	this.xRange = [-2, 100, 200, 301, 402];
    this.yRange = [60, 140];
    this.sprite = 'images/Gem Green.png';
    this.reset();
	
};

//draws the Gem on the canvas
Gem.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//places the gem in a random spot on the canvas within the acceptable bounds
Gem.prototype.reset = function(){
	this.x = this.getRandomX();
	this.y = this.getRandomY();
};

//returns random integer within range bounds that will be used for gem row
Gem.prototype.getRandomY = function() {
    return this.yRange[Math.floor(Math.random() * this.yRange.length)];
};

//returns random integer within range bounds that will be used for gem row
Gem.prototype.getRandomX = function() {
    return this.xRange[Math.floor(Math.random() * this.xRange.length)];
};


//Player object
var Player = function(){
	
	this.xRange = [-2, 402];
    this.yRange = [-20, 380];
    this.sprite = 'images/good-guys-0.png';
    this.reset();
	this.level = 0;
};


//update function detects collisions and determines if water is reached which levels up the character
Player.prototype.update = function(){
	
	if (this.y <= 20) {
		//you fell in the water, game over!
        this.reset();
    } 	
};

//draws the player on the canvas
Player.prototype.render = function(){
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//returns the player to the starting position, and resets the sprite to level 1
Player.prototype.reset = function(){
	this.x = 200;
	this.y = 380;
	this.level = 0;
	this.sprite = 'images/good-guys-' + this.level + '.png';
};

//resets the player position and levels up, and assigns new sprite for new level
Player.prototype.levelup = function(){
	this.x = 200;
	this.y = 380;
	this.level += 1;
	this.sprite = 'images/good-guys-' + this.level + '.png';
	
	//Game over if you get passed level 7
	if(this.level > 7) {
		alert("You Win!");
		this.reset();
	}
};

//what to do with key presses, move player, but disallow movement off canvas
Player.prototype.handleInput = function(key){
	if (key === 'left') {
        this.x -= (this.x - 101 < this.xRange[0]) ? 0 : 101;
    } else if (key === 'right') {
        this.x += (this.x + 101 > this.xRange[1]) ? 0 : 101;
    } else if (key === 'up') {
        this.y -= (this.y - 80 < this.yRange[0]) ? 0 : 80;
    } else if (key === 'down') {
        this.y += (this.y + 80 > this.yRange[1]) ? 0 : 80;
    }
	
};

//initialize all characters
var enemy1 = new Enemy();
var enemy2 = new Enemy();
var enemy3 = new Enemy();
var allEnemies = [enemy1, enemy2, enemy3];
var player = new Player();
var gem = new Gem();

//key press listener
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
