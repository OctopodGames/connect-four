/* objects.js
 * Zach Dziura <zcdziura@mail.plymouth.edu>
 * Object prototype & methods for game objects 
 */

var Square = function(player) {
	/* Square objects represent the individual squares on the board
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