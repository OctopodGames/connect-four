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
