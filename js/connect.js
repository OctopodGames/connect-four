// Constants
var PLAYER_ONE = 0;
var PLAYER_TWO = 1;
var NUM_ROWS = 6;
var NUM_COLS = 7;

/* function to create board
/* renamed and added parameters to create 
/* a function that we can reuse later */
function draw_grid(rows,cols){
	var board='';
	for(i = rows-1; i >= 0; i--){
		board+="<div class='row' id='row"+i+"'>";
		for(j = cols-1; j >= 0; j--){
			/* Added text here to "fill" the grid boxes so we can see them for now 
			also changed the class to an id based on row/column
			*/
			board+="<div class='cell' id='c"+j+"r"+i+"'></div>";
		}
		board+="</div>";
	}
	$('#board').html(board);
}

function changePlayer(){
	var current = $('#player').data( 'player');
	if(current==1){
		$('#player').data( 'player', 0);
		$('#pname').text('Player 1');
	}else{
		$('#player').data( 'player', 1);
		$('#pname').text('Player 2');
	}
	$('#pnum').toggleClass('player1').toggleClass('player2');
}

function initPlayer(){
	$('#player').data( 'player', PLAYER_ONE);
	$('#pname').text('Player 1');
	$('#pnum').addClass('player1').removeClass('player2');
}

function setChecker(row, column, player){
	/* Assume Susan gets it to work... */
}
function checkWin(){
	/* Assume Susan gets it to work... */
	return false;
}
function findRow(col){
	//row is 0 - bottomost
	return 0;
}
function tempClass(cell,tclass){
	$(cell).addClass(ckrClass,1000,"swing",function(){
		$(cell).removeClass(ckrClass,300);
	});
}

function animateChecker(row, col, player){
	player+=1;
	var ckrClass = 'player'+player;
	function swap(i){
		var cell='#c'+col+'r'+i;
		var last='#c'+col+'r'+(i+1);
		$(cell).addClass(ckrClass,100,"swing");
		$(last).removeClass(ckrClass,100,"swing");
		i--;
		if(i>=row){
			window.setTimeout(function(){swap(i)},50);
		}
	}
	swap(6);
}

// resets board and player
function newGame() {
	initPlayer();
	/*
	$('#player').data( 'player', PLAYER_ONE);
	$('#pname').text('Player 1');
	$('#pnum').addClass('player1').removeClass('player2');
	*/
	draw_grid(NUM_ROWS,NUM_COLS);
	
	$(".cell").click(function() {
		var id = $(this).attr("id");
		column = id.substring(1,id.indexOf("r"));
		//we'll get this from findRow later - stub for now
		row = id.substring(id.indexOf("r")+1);
		//var row=findRow(column);
		if(row%7!==0||row==0){
			//alert("ready!");
			var player = $('#player').data( 'player');
			//alert("set!");
			setChecker(row, column, player);
			//alert("go!");
			animateChecker(row, column, player);
			if(checkWin()){
				endGame();
			}else{
				var current = $('#player').data( 'player');
				changePlayer();
			}
		}
	})
}
