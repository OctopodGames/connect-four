/* objects.js
 * Zach Dziura <zcdziura@mail.plymouth.edu>
 * Object prototype & methods for game objects 
 */

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
Game.prototype.create() {
	/* Initializes the game for the first time */

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
Game.prototype.setCurrentPlayer(player) {
	this.currentPlayer = player;
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
Square.prototype.setSurroundings() {
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
