/* 
 * File: Grid.js
 * Description: Contains all functions used to draw the game board, grid, and individual pieces.
 * 		Does NOT include game logic!
 * Owner: Zach Dziura
 * Created On: 2/12/13
 * Functions:
 * 		drawGrid()
 */

$(document).ready(function() {

	/* Grid Functions */
	function drawGrid() {
	
		/*
		 * Draws the grid lines into the #board div
		 *
		 * Parameters: None
		 *
		 * Returns: None
		 */

		var board = $("#board");
		for (var column=0; column<7; column++) {
			var column = $("<div />", {
				"class": "column"	
			});

			for (var row=0; row<6; row++) {
				var grid = $("<div />", {
					"class": "grid"	
				});
				column.append(grid);
			}

			board.append(column);
		}
	}

	/* Execute the code */
	drawGrid();
});
