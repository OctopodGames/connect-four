var NUM_ROWS, NUM_COLS;

/* function to create board
/* renamed and added parameters to create 
/* a function that we can reuse later */
function draw_grid(rows,cols){
	NUM_ROWS = rows-1;
	NUM_COLS = cols-1;
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
	$('#player').data( 'player', 1);
	$('.cell').each(function(){
		$(this).data({
			'P': 0, //player
			'TL':0, //top-left
			'T':0, //top-center
			'TR':0, //top-right
			'L':0, //center-left
			'R':0, //center-left
			'BL':0, //bottom-left
			'B':0, //bottom-left
			'BR':0 //bottom-left
		});
	})
}

function changePlayer(){
	var current = $('#player').data( 'player');
	//switch variable
	var newp = (current == 1)?2:1;
	$('#player').data( 'player', newp);
	$('#pname').text('Player '+newp);
	$('#pnum').toggleClass('player1').toggleClass('player2');
}

/**
*  Call this and it will
*  update the cell data to match (for Joe)
* @param: cell - the cell DOM id
* @param: o - origin - either the parent cell (C)
* or the direction we're headed
*/
function updateCell(cell,o){
	var r = cell.substring(cell.indexOf("r")+1);
	var c = cell.substring(1,cell.indexOf("r"));
	var p = $('#player').data('player');
	o = typeof o !== 'undefined' ? o : 'C';
	var ck = o == 'C';

	
	if(c>0){//check cells to the left
		if((ck || o=='L')){

		}
		if(r<NUM_ROWS && (ck || o=="TL")){

		}
		if(r>0 && (ck || o=="BL")){

		}
	}
	if(c<NUM_COLS){//check cells to the right
		if(ck || o=='R'){

		}
		if(r<NUM_ROWS && (ck || o=="TR") ){

		}
		if(r>0 && (ck || o=="BR") ){

		}
	}
	if(r>0){//check cell below
		if(ck || o=="B"){

		}
	}
	if(r<NUM_ROWS){//check cell above
		if(ck || o=="T"){

		}
	}
}

function setChecker(row, column, player){
	/* Assume Susan gets it to work... */
}

function checkWin(){
	/* Assume Susan gets it to work... */
	return false;
}

function findRow(col){
	//default row is 0 - bottomost
	return 0;
}

function animateChecker(col, player){
	var ckrClass = 'player'+player;
	function swap(i){
		var cell='#c'+col+'r'+i;
		var last='#c'+col+'r'+(i+1);
		var next='#c'+col+'r'+(i-1);
		if($(cell).data('P')==0){			
			$(cell).addClass(ckrClass,100,"linear");
			$(last).removeClass(ckrClass,100,"linear");
			i--;
			if($(next).data('P')==0){
				window.setTimeout(function(){swap(i)},50);
			}else{
				$(cell).data('P',player);					
				if(checkWin()){
					endGame();
				}else{
					changePlayer();
				}
			}
		}else{
			alert("That column is full!");
		}
	}
	swap(NUM_ROWS);
}