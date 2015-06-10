// Enemies our player must avoid
var Enemy = function() {
    this.xRange = [-150, 600];
    this.yRange = [60, 140, 220];
    this.speedRange = [150, 600];

    this.sprite = 'images/speeder.png';
    this.reset();
	}

Enemy.prototype.reset = function(){
	var startPos = this.xRange[0];
    this.x = startPos;
    this.y = this.getRandomY();
    this.speed = this.getRandomSpeed();
}

Enemy.prototype.update = function(dt) {
    var maxPos = this.xRange[1];
    this.x += this.speed * dt;

    if (this.x > maxPos) {
        this.reset();
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Enemy.prototype.getRandomY = function() {
    return this.yRange[Math.floor(Math.random() * this.yRange.length)];
}

Enemy.prototype.getRandomSpeed = function() {
    var minSpeed = this.speedRange[0],
        maxSpeed = this.speedRange[1];

    return Math.floor(Math.random() * (maxSpeed - minSpeed)) + minSpeed;
}

var Player = function(){
	
	this.xRange = [-2, 402];
    this.yRange = [-20, 380];
    this.sprite = 'images/good-guys-0.png';
    this.reset();
	this.level = 0;
}

Player.prototype.update = function(dt){
	
	if (this.y <= 20) {
        this.levelup();
    } else if (this.y <= 220 & this.x >= 0) {
        var heroes = this;
        allEnemies.forEach(function(enemy) {
            if (enemy.y == heroes.y) {
                if (enemy.x >= heroes.x - 30 && enemy.x <= heroes.x + 30) {
					//collision
                    //heroes.fails++;
                    //$("#fails").append("Fails: " + charBoy.fails);
                    heroes.reset();
                }
            }
        });
    }
	
}

Player.prototype.render = function(dt){
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.reset = function(){
	this.x = 200;
	this.y = 380;
	this.level = 0;
	this.sprite = 'images/good-guys-' + this.level + '.png';
}

Player.prototype.levelup = function(){
	this.x = 200;
	this.y = 380;
	this.level += 1;
	this.sprite = 'images/good-guys-' + this.level + '.png';
	
	if(this.level > 7) {
		alert("You Win!");
		this.reset();
	}
}

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
	
}

var enemy1 = new Enemy();
var enemy2 = new Enemy();
var enemy3 = new Enemy();
var allEnemies = [enemy1, enemy2, enemy3];
var player = new Player();

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
