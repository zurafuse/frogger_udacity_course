//Sets up the variables related to direction, score and number of fatalities.
var up = false;
var down = false;
var right = false;
var left = false;
var score = 0;
var deaths = 0;

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
	this.width = 80;
	this.height = 75;
	this.x = this.width * -1;
	this.y = 60;
	this.speed = 50;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += dt * this.speed;
	if (this.x > 540){
		this.x = this.width * -2;
		this.speed = Math.floor((Math.random() * (200)) + 50);
	}
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Creating an array of sprite images so the Math.random function can give the character a different sprite each time the game is reset.
var spriteArray = ["images/char-boy.png", "images/char-cat-girl.png", "images/char-horn-girl.png", "images/char-pink-girl.png", "images/char-princess-girl.png"];

// The playerClass function is used to instantiate the player object. The player's sprite is chosen randomly, so the player might be a different sprite each time. 
var playerClass = function() {
this.sprite = spriteArray[Math.floor((Math.random() * (4)) + 0)];
this.width = 79;
this.height = 60;
this.x = 200;
this.y = 400;
this.speed = 5;
}
/*This is the player class's update function. This is where the x and y coordinates are updated if the user is pressing an arrow key. Refer to the handleInput function to
See how the up, down, left and right variables are updated. The check collision function is called within this function.
Updating the x and/or y coordinates only happens if doing so does not place the player sprite off the boundaries of the screen.*/
playerClass.prototype.update = function() {
	if (up === true){
		if (this.y - this.speed >= 0){
			this.y -= this.speed;
		}
	}
	else if (left === true){
		if (this.x - this.speed >=0){
			this.x -= this.speed;
		}
	}
	else if (right === true){
		if (this.x + this.width <= canvas.width - 20){
			this.x += this.speed;
		}
	}
	else if (down === true){
		if (this.y + this.height <= canvas.height - 120){
		this.y += this.speed;
		}
	}
//check to see if the player is colliding with an enemy.
	checkColl(this.x, this.y, this.width, this.height);
//check to see if player has reached the water at the top. If true, give the player points and restart the game.
	if (this.y <= 64){
		score += 25;
		restart();
	}
};	
//The player's render function draws the player on the screen.
playerClass.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
//As the input parameter, The player's handleInput function receives the results of the keydown event listener. Based on that, the left, up, right, and down variables are 
//updated. The values of those variables are used by the player.update's logic.
playerClass.prototype.handleInput = function(input) {
	
	if (input === "up"){
		up = true;
		down = false;
		right = false;
		left = false;
	}
	else if (input === "left"){
		left = true;
		up = false;
		down = false;
		right = false;
	}
	else if (input === "right"){
		right = true;
		up = false;
		down = false;
		left = false;
	}
	else if (input === "down"){
		down = true;
		up = false;
		right = false;
		left = false;
	}
};
//This function loops through every instance of an enemy and determines if the player is touching any enemy in the allEnemies array.
//If the collision is true, increment the death total and restart the level.
function checkColl(x, y, width, height) {
	for (i = 0; i < allEnemies.length; i++){
		if (x + width >= allEnemies[i].x && x <= allEnemies[i].x + allEnemies[i].width){
			if (y + height >= allEnemies[i].y && y <= allEnemies[i].y + allEnemies[i].height){
				deaths++;
				restart();	
			}
		}
	}
}
//The restart function resets the player object's properties, such as the sprite and location. The allEnemies array is cleared and then recreated.
function restart(){
	player.sprite = spriteArray[Math.floor((Math.random() * (4)) + 0)];
	player.width = 79;
	player.height = 60;
	player.x = 200;
	player.y = 400;
	player.speed = 5;
	allEnemies = [];
	enemyDist = 63;
	for (i = 0; i < 3; i++){
		allEnemies.push(new Enemy);
		allEnemies[i].speed = Math.floor((Math.random() * (200)) + 50);
		allEnemies[i].y = enemyDist * (1 + i);
		if (enemyDist < 75){
			enemyDist = 75;
		}
	}
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [];
var enemyDist = 63;
for (i = 0; i < 3; i++){
	allEnemies.push(new Enemy);
	allEnemies[i].speed = Math.floor((Math.random() * (200)) + 50);
	allEnemies[i].y = enemyDist * (1 + i);
	if (enemyDist < 75){
		enemyDist = 75;
	}
}
// Place the player object in a variable called player
var player = new playerClass();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
document.addEventListener('keyup', function(e) {
	if (e.keyCode === 37){
		left = false;
	}
	else if (e.keyCode === 38){
		up = false;
	}
	else if (e.keyCode === 39){
		right = false;
	}
	else if (e.keyCode === 40){
		down = false;
	}
});