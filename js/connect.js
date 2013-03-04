// Globals
var PLAY_BOARD = {          // player's current board status, 1 bit per square, 64 bits per player
	1: { 0: 0x0, 1: 0x0 },  // player1's board status
	2: { 0: 0x0, 1: 0x0 }   // player2's board status
};

var CURR_PLAYER = 1;  // current player
var NUM_COLS = 7;   // board dimansions: number of columns
var NUM_ROWS = 6;      // board dimaensions: number of rows

/* function to create board
/* renamed and added parameters to create 
/* a function that we can reuse later */
function draw_grid(rows,columns){
	NUM_ROWS = rows;
	NUM_COLS = columns;
	var board='';
	for(i = rows-1; i >= 0; i--){
		board+="<div class='row' id='row"+i+"'>";
		for(j = 0; j <= columns-1; j++){
			board+="<div class='cell' id='c"+j+"r"+i+"'><img class='square' src='img/square0.png'/></div>";
		}
		board+="</div>";
	}
	$('#board').html(board);
	$('.cell').each(function(){
		$(this).data('player',0);
	});
	$('#player').data( 'player', 1);
	PLAY_BOARD[1][0]=0x0;   // initialize the "board" for each player
	PLAY_BOARD[1][1]=0x0;
	PLAY_BOARD[2][0]=0x0;
	PLAY_BOARD[2][1]=0x0;
}

function changePlayer(){
	var current = $('#player').data( 'player');
	//switch variable
	var newp = (current == 1)?2:1;
	$('#player').data( 'player', newp);
	$('#pname').text('Player '+newp);
	$('#pnum').toggleClass('player1').toggleClass('player2');
	CURR_PLAYER = current;
	$('#c0r0 > img.square').attr('src','img/square'+newp+'.png');
	$('#c0r5 > img.square').attr('src','img/square'+newp+'.png').css('transform','rotate(90deg)');
	$('#c6r5 > img.square').attr('src','img/square'+newp+'.png').css('transform','rotate(180deg)');
	$('#c6r0 > img.square').attr('src','img/square'+newp+'.png').css('transform','rotate(270deg)');
}

function setChecker(row, column, player){
	PLAY_BOARD[player] = setBit64(PLAY_BOARD[player],row, column);  // call to update current board status
	animateChecker(column, player);
}

function checkWin(player) {
	var temp = [];
	var temp2 = [];      
	// the pesky algorithm that really works!!
	temp = shiftRight64(PLAY_BOARD[player], NUM_ROWS);  // diagonal down
	temp = logicalOps64(PLAY_BOARD[player], temp,'and');
	temp2 = shiftRight64(temp, 2*NUM_ROWS);
	temp2 = logicalOps64(temp, temp2, 'and');
	if (temp2[0] | temp2[1]) return(true);

	temp = shiftRight64(PLAY_BOARD[player], NUM_COLS);  //horizontal
	temp = logicalOps64(PLAY_BOARD[player], temp, 'and');
	temp2 = shiftRight64(temp, 2*NUM_COLS);
	temp2 = logicalOps64(temp,temp2,'and');
	if (temp2[0] | temp2[1]) return(true);

	temp = shiftRight64(PLAY_BOARD[player], (NUM_COLS + 1));  // diagonal up
	temp = logicalOps64(PLAY_BOARD[player],temp,'and');
	temp2 = shiftRight64(temp, 2*(NUM_COLS + 1));
	temp2 = logicalOps64(temp,temp2,'and');
	if (temp2[0] | temp2[1]) return(true);

	temp = shiftRight64(PLAY_BOARD[player], 1);      // vertical
	temp = logicalOps64(PLAY_BOARD[player], temp,'and');
	temp2 = shiftRight64(temp, 2);
	temp2 = logicalOps64(temp,temp2,'and');
	if (temp2[0] | temp2[1]) return(true);

	return(false);
}

function findRow(column, player) {
	var currentBoard = [];
	var startBit;
	var mask;
	var temp64 = [];
	var temp;

	startBit = column * NUM_COLS;       // find start square number for column
	currentBoard = logicalOps64(PLAY_BOARD[1],PLAY_BOARD[2],'or');   // find current board status with all checkers

	temp64 = shiftRight64(currentBoard, startBit);   // shift the coumns bits to least sig position
	temp=temp64[0];

	mask = Math.pow(2, (NUM_ROWS)) - 1;
	temp = temp & mask;                  // mask the least sig boardRows bits

	return(Math.log(temp+1)/Math.LN2);   // next avail row is next sig bit NOT used!
}

/**
* Handles the animation of the checker down the board.
* Please note: this IS NOT tied to the array used to check
* winning conditions - only to the physical board!!!
*/
function animateChecker(column, player){
	var ckrClass = 'player'+player;
	function swap(i){
		var cell='#c'+column+'r'+i;
		var last='#c'+column+'r'+(i+1);
		var next='#c'+column+'r'+(i-1);
		if($(cell).data('player')==0){			
			$(cell).addClass(ckrClass,100,"linear");
			$(last).removeClass(ckrClass,100,"linear");
			i--;
			if($(next).data('player')==0){
				window.setTimeout(function(){swap(i)},50);
			}else{
				$(cell).data('player', player);					
				if(checkWin(player)){
					endGame();
				}else{
					changePlayer();
					$('.cell').click(function(){
						$('.cell').off('click');
						id = $(this).attr('id');
						column = id.substring(1,id.indexOf("r"));
						var row=findRow(column, player);
						setChecker(row, column, $('#player').data( 'player'));
					});
				}
			}
		}else{
			alert("That column is full!");
		}
	}
	swap(NUM_ROWS-1);
}

function setBit64(word, row, column) {
	var bitn;
	var useix;
	var result = [];

	result[0] = word[0];      // save off the input board status
	result[1] = word[1];

	bitn = column * (NUM_ROWS + 1) + row;    // find the square number = bit number

	useix = 0;            // set the bit in the least or most sig 32-bit piece of the "64-bit word"
	if (bitn > 31) {      // need to set bit in most sig pieces
		useix = 1;
		bitn = bitn - 32;
	}
	result[useix] = word[useix] + Math.pow(2, bitn);   // set the bit use add since two checkers can not occupy the same square.
	return(result);
}            

/*
******************************************************************************
* function logicalOps64: ANDs or ORs the "64-bit word" which is really a 2 32-bit word array
*         inputs: op1 - first operand a "64 bit" word really a 2 32-bit array [0] least sig
*                 op2 - second operand, sam description as op1
*                 operator - either 'and' or 'or' (CAREFUL!!! defaults to or!!!!!)
*          return: result: the "64-bit" result (really a 2 32-bit word array [0] least sig)
******************************************************************************
*/

function logicalOps64(op1,op2,operator) {
	var result = [];

	if (operator == 'and') {
		result[0] = op1[0] & op2[0];     // just AND the pieces
		result[1] = op1[1] & op2[1];  
	}
	else {
		result[0] = op1[0] | op2[0];     // just OR the pieces
		result[1] = op1[1] | op2[1];  
	}

	return(result);
}

/*
******************************************************************************
* function shiftRight64 - to shift the "64-bit" word to the right the specified number of bits
*       inputs: word64 - "64-bit" word really a 2 32-bit word array [0] least sig
*               nshft - number of bits to shift to the right
*       return: result: the "64-bit" result (really a 2 32-bit word array [0] least sig) 
******************************************************************************
*/

function shiftRight64(word, nshift) {
	var temp;
	var result = [];

	if (nshift < 32) {
		result[0] = word[0] >>> nshift;
		temp = word[1] & (Math.pow(2, nshift) - 1);
		result[0] = result[0] | (temp << (32 - nshift));
		result[1] = word[1] >>> nshift;
	}
	else {
		result[0] = word[1] >>> (nshift - 32);
		result[1] = 0;
	}

	return(result);
}

function endGame(){
	var player = (CURR_PLAYER == 1)?2:1;
	if (confirm("Player "+player+" wins! New game?")){
		draw_grid(6,7);
		$('.cell').click(function(){
			$('.cell').off('click');
			id = $(this).attr('id');
			column = id.substring(1,id.indexOf("r"));
			var row=findRow(column, player);
			setChecker(row, column, $('#player').data( 'player'));
		});
	}else{
		alert("You pressed Cancel! We should redirect...somewhere...Kansas?");
	} 
}

function displayTabs() {
	var tabPanes = $('div.tabPanel > div');
	$('div.tabPanel ul.tabs a').click(function () {
		tabPanes.hide().filter(this.hash).show();

		$('div.tabPanel ul.tabs a').removeClass('selected');
		$(this).addClass('selected');

		return false;
	}).filter(':first').click();
}
