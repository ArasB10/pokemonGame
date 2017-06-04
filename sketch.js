var pieces = [];
var pieceSize = 50;
//var backColor = 255;
var clickCount = 0;
var currentScene = 3;

function setup() {
	createCanvas(600,600);
	var img;
	var points = [];
	var xx = 30;

	for(var i=0; i<10; i++){
		img = loadImage("images/image" + i + ".png");
		pieces[i] = new Piece(i,img);
	}
	pieces = duplicate(pieces);

	for(var i=0; i < pieces.length; i++){
		if(i<5){
			points[i] = new Point(xx,100);
			xx = xx + pieceSize +10;
			// 50 110 170 230 290 
		}
		else if(i<10) {
			xx = xx - pieceSize -10;
			points[i] = new Point(xx,200);	
		} 
		else if (i<15) {
			points[i] = new Point(xx,300);
			xx = xx + pieceSize +10;
		}
		else {
			xx = xx - pieceSize -10;
			points[i] = new Point(xx,400);
		}

	}

	points = shuffleArray(points);

	//	Priskiriame taskus
	for(var i=0; i<pieces.length; i++){
		pieces[i].x = points[i].x;
		pieces[i].y = points[i].y;
	}
};

function draw() {
	switch(currentScene){
		case 1:
			drawScene1();
			break;
		case 2:
			drawScene2();
			break;
		case 3: 
			drawScene3();
			break;			
		default:
			break;	
	}
};

function drawScene3(){
	background(255);
	textSize(40);
	fill(51,155,255);
	text("		Pokemon\nmemory game", 200, 100);
	fill(204,255,255);
	rect(250,200,150,50);
	fill(0);
	text("Start",280,240);
	if((mouseX>250 && mouseX<400)&&(mouseY>200 && mouseY<250)){
		fill(0,0,255,100);
		rect(250,200,150,50);
	}
}

function drawScene1(){

	background(220);
	for(var i=0; i<pieces.length; i++){
		drawPiece(pieces[i]);
	}
};

function drawScene2(){

	background(255);
	textSize(60);
	text("Game over",200,200);
};

function mouseClicked(){

	if(currentScene===1){
		if(clickCount===2){
			pieces = checkSame(pieces);
			pieces = closePieces(pieces);
			clickCount=0;

			if(checkIfFinished(pieces)){
				currentScene=2;
			}	
		}

		for(var i=0; i<pieces.length; i++){
			checkClick(pieces[i]);
		}	
	}
	if(currentScene===3){
		if((mouseX>250 && mouseX<400)&&(mouseY>200 && mouseY<250)){
			currentScene=1;
		}
	}
};

function Piece(id, image) {

	this.x = 0;
	this.y = 0;
	this.id = id;
	this.image = image;
	this.ifGuesed = false;
	this.ifVisible = false;
};

function Point(x,y){

	this.x=x;
	this.y=y;
};

function checkClick(Piece) {

	if((mouseX>=Piece.x && mouseX<=Piece.x+pieceSize)&&(mouseY>=Piece.y && mouseY<=Piece.y+pieceSize)) {
		Piece.ifVisible = true;
		clickCount++;
	}
}

function drawPiece(Piece) {

	if(Piece.ifGuesed===false){
		if(Piece.ifVisible) {
			//fill(255,20,20);
			//rect(Piece.x,Piece.y,pieceSize,pieceSize);
			image(Piece.image,Piece.x,Piece.y,pieceSize,pieceSize);
		}
		else {
			// spalva pakeisti
			fill(0);
			rect(Piece.x,Piece.y,pieceSize,pieceSize);
		}
	}
};

function shuffleArray(array) {

    for (var i = array.length - 1; i > 0; i--) {
        var j = floor(random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
};

function duplicate(array){

	var duplicate;
	var length = array.length;
	for(var i=0;i<length;i++){
		duplicate = new Piece(pieces[i].id, pieces[i].image);
		array.push(duplicate);
	}
	return array;
};

function closePieces(array){

	for(var i=0;i<array.length;i++){
		array[i].ifVisible = false;
	}
	return array;
};

function checkSame(array){

	for(var i=0; i<array.length-1; i++){
		for(var j=i+1; j<array.length; j++){
			if((array[i].id===array[j].id)&&(array[i].ifVisible && array[j].ifVisible)){
				array[i].ifGuesed=true;
				array[j].ifGuesed=true;
			}
		}
	}
	return array;
};

function checkIfFinished(array){
	for(var i=0; i<array.length; i++){
		if(array[i].ifGuesed===false)
			return false;
	}
	return true;
}