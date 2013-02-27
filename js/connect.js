// Globals
var NUM_ROWS;
var NUM_COLS;

/* function to create board
/* renamed and added parameters to create 
/* a function that we can reuse later */
function draw_grid(rows,columns){
	NUM_ROWS = rows;
	NUM_COLS = columns;
	var board='';
	for(i = rows-1; i >= 0; i--){
		board+="<div class='row' id='row"+i+"'>";
		for(j = columns-1; j >= 0; j--){
			board+="<div class='cell' id='c"+j+"r"+i+"'></div>";
		}
		board+="</div>";
	}
	$('#board').html(board);
	$('.cell').each(function(){
		$(this).data('player',0);
	});
	$('#player').data( 'player', 1);
}

function changePlayer(){
	var current = $('#player').data( 'player');
	//switch variable
	var newp = (current == 1)?2:1;
	$('#player').data( 'player', newp);
	$('#pname').text('Player '+newp);
	$('#pnum').toggleClass('player1').toggleClass('player2');
}


function setChecker(row, column, player){
	/* Assume Susan gets it to work... */
}
function checkWin(){
	/* Assume Susan gets it to work... */
	return false;
}
function findRow(column){
	//row is 0 - bottomost
	return 0;
}

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
				if(checkWin()){
					endGame();
				}else{
					changePlayer();
					$('.cell').click(function(){
						$('.cell').off('click');
						id = $(this).attr('id');
						column = id.substring(1,id.indexOf("r"));
						animateChecker(column, $('#player').data( 'player'));
					})
				}
			}
		}else{
			alert("That column is full!");
		}
	}
	swap(NUM_ROWS-1);
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

