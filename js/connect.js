/* function to create board
/* renamed and added parameters to create 
/* a function that we can reuse later */
function draw_grid(rows,cols){
	var board='';
	for(i = 0; i < rows; i++){
		board+="<div class='row' id='row"+i+"'>";
		for(j = 0; j < cols; j++){
			/* Added text here to "fill" the grid boxes so we can see them for now 
			also changed the class to an id based on row/column
			*/
			board+="<div class='cell' id='c"+j+"r"+i+"'>Cell</div>";
		}
		board+="</div>";
	}
	$('body').html(board);
}