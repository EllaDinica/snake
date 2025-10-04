let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

let width = canvas.width;
let height = canvas.height;

let blockSize = 20;
let widthInBlock = width / blockSize;
let heightInBlock = height / blockSize;



//first
let score = 0;

let drawBorder = function(){
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width, blockSize);
    ctx.fillRect(0, height - blockSize, width, blockSize);
    ctx.fillRect(0, 0, blockSize, height);
    ctx.fillRect(width - blockSize, 0, blockSize, height);
};

let drawScrore = function(){
    ctx.font = "30px Courier";
    ctx.fillStyle = "LimeGreen";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Раxунок:" + score, blockSize, blockSize);
};

let gameOver = function(){
    //clearInterval(intervalId);
    ctx.font = "60px Courier";
    ctx.fillStyle = "Black";
    ctx.textAlign = "center";
    ctx. textBaseline = "middle";
    ctx.fillText("Кінець гри", width / 2, height / 2);
};

let Block = function(col, row){
    this.col = col;
    this.row = row;
};

Block.prototype.drawSquare = function(color){
    let x = this.col * blockSize;
    let y = this.row * blockSize;
    ctx.fillStyle = color;
    ctx.fillRect(x, y, blockSize, blockSize);
};

Block.prototype.drawCircle = function(color){
    let centerX = this.col * blockSize + blockSize / 2;
    let centerY = this.row * blockSize + blockSize / 2;
    ctx.fillStyle = color;
    circle(centerX, centerY, blockSize / 2, true);
};

 // маювання функції circle
let circle = function(x, y, radius, color){
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
};

Block.prototype.equal = function(otherBlock){
    return this.col === otherBlock.col && this.row === otherBlock.row;
};

let Snake = function(){
    this.segments = [
        new Block(7, 5),
        new Block(6, 5),
        new Block(5, 5)
    ];
    this.direction = "right";
    this.nextDirection = "right";
};

Snake.prototype.draw = function(){
    for (let i = 0; i < this.segments.length; i++){
        this.segments[i].drawSquare("LimeGreen");
    }
};

Snake.prototype.move = function(){
    let head = this.segments[0];
    let newHead;

    this.direction = this.nextDirection;

    if(this.direction === "right"){
    newHead = new Block(head.col + 1, head.row);
    } else if (this.direction === "down"){
        newHead = new Block(head.col, head.row + 1);
    } else if (this.direction === "left"){
        newHead = new Block(head.col - 1, head.row);
    } else if (this.direction === "up"){
        newHead = new Block(head.col, head.row - 1);
    } 

    if(this.checkCollision(newHead)){
        gameOver();
        return;
    }

    this.segments.unshift(newHead);

    if(newHead.equal(apple.position)){
        score++;
        apple.move();
    } else {
        this.segments.pop();
    }
};

Snake.prototype.checkCollision = function(head){
    let leftCollision = (head.col === 0);
    let topCollision = (head.row === 0);
    let rightCollision = (head.col === widthInBlock - 1);
    let bottomCollision = (head.row === heightInBlock - 1);
    
    let wallColision = leftCollision || topCollision || rightCollision || bottomCollision;

    let selfCollision = false;

    for(let i = 0; i < this.segments.length; i++){
        if(head.equal(this.segments[i])){
            selfCollision = true;
        }
    }

    return wallColision || selfCollision;
};

Snake.prototype.setDirection = function(newDirection){
    if(this.direction === "up" && newDirection === "down"){
        return;
    } else if(this.direction === "right" && newDirection === "left"){
        return;
    } else if(this.direction === "down" && newDirection === "up"){
        return;
    } else if(this.direction === "left" && newDirection === "right"){
        return;
    }

    this.nextDirection = newDirection;
};

let directions = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
};

$("body").keydown(function(event){
    let newDirection = directions[event.keyCode];
    if(newDirection !== undefined){
        snake.setDirection(newDirection);
    }
});

let Apple = function(){
    this.position = new Block(20, 30);
};

Apple.prototype.draw = function(){
    this.position.drawCircle("LimeGreen");
};

Apple.prototype.move = function(){
    let randomCol = Math.floor(Math.random() * (widthInBlock - 2)) + 1;
    let randomRow = Math.floor(Math.random() * (heightInBlock - 2)) + 1;
    this.position = new Block(randomCol, randomRow);
};

let snake = new Snake();
let apple = new Apple();




//second

let score2 = 0;

let drawScrore2 = function(){
    ctx.font = "30px Courier";
    ctx.fillStyle = "Red";
    ctx.textAlign = "right";
    ctx.textBaseline = "top";
    ctx.fillText("Раxунок:" + score2, width - blockSize, blockSize);
};


Block.prototype.drawSquare2 = function(color){
    let x = this.col * blockSize;
    let y = this.row * blockSize;
    ctx.fillStyle = color;
    ctx.fillRect(x, y, blockSize, blockSize);
};



Block.prototype.drawCircle2 = function(color){
    let centerX = this.col * blockSize + blockSize / 2;
    let centerY = this.row * blockSize + blockSize / 2;
    ctx.fillStyle = color;
    circle(centerX, centerY, blockSize / 2, true);
};


Block.prototype.equal2 = function(otherBlock){
    return this.col === otherBlock.col && this.row === otherBlock.row;
};

let Snake2 = function(){
    this.segments2 = [
        new Block(27, 25),
        new Block(26, 25),
        new Block(25, 25)
    ];
    this.direction = "right";
    this.nextDirection = "right";
};


Snake2.prototype.draw = function(){
    for (let i = 0; i < this.segments.length; i++){
        this.segments2[i].drawSquare("Red");
    }
};


Snake2.prototype.move = function(){
    let head2 = this.segments2[0];
    let newHead2;

    this.direction2 = this.nextDirection2;

    if(this.direction2 === "right"){
    newHead2 = new Block(head2.col + 1, head2.row);
    } else if (this.direction2 === "down"){
        newHead2 = new Block(head2.col, head2.row + 1);
    } else if (this.direction2 === "left"){
        newHead2 = new Block(head2.col - 1, head2.row);
    } else if (this.direction2 === "up"){
        newHead2 = new Block(head2.col, head2.row - 1);
    } 

    if(this.checkCollision2(newHead2)){
        gameOver();
        return;
    }

    this.segments2.unshift(newHead2);

    if(newHead2.equal2(apple2.position)){
        score++;
        apple2.move();
    } else {
        this.segments2.pop();
    }
};


Snake2.prototype.checkCollision2 = function(head2){
    let leftCollision2 = (head2.col === 0);
    let topCollision2 = (head2.row === 0);
    let rightCollision2 = (head2.col === widthInBlock - 1);
    let bottomCollision2 = (head2.row === heightInBlock - 1);
    
    let wallColision2 = leftCollision2 || topCollision2 || rightCollision2 || bottomCollision2;

    let selfCollision2 = false;

    for(let i = 0; i < this.segments2.length; i++){
        if(head2.equal2(this.segments[i])){
            selfCollision2 = true;
        }
    }

    return wallColision2 || selfCollision2;
};

Snake2.prototype.setDirection2 = function(newDirection2){
    if(this.direction2 === "up" && newDirection2 === "down"){
        return;
    } else if(this.direction2 === "right" && newDirection2 === "left"){
        return;
    } else if(this.direction2 === "down" && newDirection2 === "up"){
        return;
    } else if(this.direction2 === "left" && newDirection2 === "right"){
        return;
    }

    this.nextDirection2 = newDirection2;
};

//smt


let directions2 = {
    65: "left",
    87: "up",
    68: "right",
    83: "down"
};

$("body").keydown(function(event){
    let newDirection2 = directions2[event.keyCode];
    if(newDirection2 !== undefined){
        snake2.setDirection2(newDirection2);
    }
});

let Apple2 = function(){
    this.position2 = new Block(20, 30);
};

Apple2.prototype.draw = function(){
    this.position2.drawCircle("Red");
};

Apple2.prototype.move = function(){
    let randomCol = Math.floor(Math.random() * (widthInBlock - 2)) + 1;
    let randomRow = Math.floor(Math.random() * (heightInBlock - 2)) + 1;
    this.position2 = new Block(randomCol, randomRow);
};

let snake2 = new Snake();
let apple2 = new Apple();






let setIntervalId = setInterval(function(){
    ctx.clearRect(0, 0, width, height);
    drawBorder();
    drawScrore();
    drawScrore2();
    snake.move();
    snake.draw();
    apple.draw();
}, 100);

