/* objects.js
 * Zach Dziura <zcdziura@mail.plymouth.edu>
 * Object prototype & methods for game objects 
 */

"use strict";

/********** Board Object **********/
function Board(rows, columns) {
    /* Defines the game board which users interact
     *
     * Variables:
     * - (int) rows: The number of rows on the board
     * - (int) columns: The number of columns on the board
     */

	this.rows = rows;
	this.columns = columns;
	this.grid = [];
}
Board.prototype.newBoard = function () {
	/* Resets the game board for new game play */

	var self = this;
	var board = '';
	for(var i = this.rows - 1; i >= 0; i--){
		// Create the new row
		var newRow = new $("<div />")
			.attr("id", "row"+i)
			.addClass("row");
		for(var j = this.columns - 1; j >= 0; j--){
			// Create the columns in the row
			var newSquare = new $("<div />")
				.attr("id", "c"+j+"r"+i)
				.addClass("square")
		}
		console.log(newRow);
	}
	//$('#board').html(board);
}

/********** Square Object **********/
function Square() {
	/* Represents the individual squares on the board
	 *
	 * Variables:
	 * - (int) player: 0 for Player1, 1 for Player2
	 * - (int) column: Column in which the square is located
	 * - (int) row: Row in which the square is located
	 * - (array) surroundings: Array of pointers to surrounding Square objects
	 */

	var player;
	var column;
	var row;
	var surroundings = [];
}
Square.prototype.setSurroundings = function () {
	/* Save pointers to surrounding squares into Square object's "surroundings" array
	 * 
	 * Parameters: None
	 * Returns: None
	 */

	var self = this;
	// Logic goes here
}

/********** Player Object **********/
function Player() {
	/* Represents the player playing the game
	 *
	 */
}

/********** Game Object **********/
function Game() {
	/* Global object to control game logic 
	 *
	 * Variables:
	 * - (Board) gameBoard: Game board object
	 * - (Player[]) players: Array of players
	 * - (Player) currentPlayer: The current player
	 */

	var gameBoard = new Board();
	var players = [new Player(1), new Player(2)];
	var currentPlayer;
}
Game.prototype.newGame = function () {
	/* Initializes the game for the first time */

}
Game.prototype.setCurrentPlayer = function(player){
	/* Set current player for turn */

	this.currentPlayer = player;
}
