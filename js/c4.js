// JavaScript Document for connect 4: S.Schwarz

/* some global parameters for which could be merged intothe GLOBALS array? */

var G_player = {          // player's current board status, 1 bit per square, 64 bits per player
  0: { 0: 0x0, 1: 0x0 },  // player1's board status
  1: { 0: 0x0, 1: 0x0 }   // player2's board status
};

var G_currentPlayer = 0;  // current player
var G_boardColumns = 7;   // board dimansions: number of columns
var G_boardRows = 6;      // board dimaensions: number of rows

/*
******************************************************************************
* this file contains the forllowing routines:
*   function play(column, player) 
*     - called when a column has been selected by the player
*   function findRow(column, player) 
*     - called to determine the row of the checker just played (depends on checkers already in column: ANY player)
*   function placeChecker(row, column, player) 
*     - called to place the player's checker AND to update the player's board status
*   function checkWin(player)
*     - called to check whether the current move causes the current player to win
*   function setBit64(word64, row, column)
*     - called to update the current board status for player based on row and column number (0 relative)
*   function logicalOps64(op1,op2,operator)
*     - called to AND or OR the "64-bit" word (really a 2 32-bit word array [0]) least sig
*    function shiftRight64(word, nshift)
*     - called to shift the "64-bit" word the specified number of bits to the right
******************************************************************************
*/

/*
******************************************************************************
* page load and begin (sample... should be replaced)
******************************************************************************
*/

$(document).ready(function(){   // page loaded begin here

/*
******************************************************************************
* start Game (button) click event
******************************************************************************
*/

  $("#startGame").click(function() {
    var places=[];
  
    $("svg").each(function() {          // hide the checkers
      $(this).css("visibility","hidden");
    });

    G_currentPlayer = 0;               // start with player 0
    $("#currentPlayer").css("background-color",G_color[G_currentPlayer]);
    $("#currentPlayer").css("visibility","visible");
    
    G_player[0][0]=0x0;   // initialize the "board" for each player
    G_player[0][1]=0x0;
    G_player[1][0]=0x0;
    G_player[1][1]=0x0;
 
  });
    
  $("#button0").click(function() {     // sample column click event handling
    play(0,G_currentPlayer); 
  });
  
  $("#button1").click(function() {
    play(1,G_currentPlayer);
  });
  
  $("#button2").click(function() {
    play(2,G_currentPlayer); 
  });
  
  $("#button3").click(function() {
    play(3,G_currentPlayer);
  });

  $("#button4").click(function() {
    play(4,G_currentPlayer);
  });
  
  $("#button5").click(function() {
    if (G_debugFlg)window.alert("column5 clicked! "); 
    play(5,G_currentPlayer); 
  });
  
  $("#button6").click(function() {
    play(6,G_currentPlayer);
  });
});

/*
******************************************************************************
* play: called after column button is clicked to place a checker
*       inputs: column clicked
*               player whose turn it is (0 or 1)
*               GLOBAL current player (0 or 1)
*       it calls the functions: findRow: to determine the next free row
*                               placeChecker: to show the player his checker
*                               winCheck: to see if the currentplayer has won
******************************************************************************
*/

function play(column, player) {

  var row;
  row = findRow(column, player);
  
  placeChecker(row, column, player);
  
  var win;
  win = checkWin(player);
  if (win) {
    window.alert("you win!!!");  
  }
  else {
     G_currentPlayer = (G_currentPlayer + 1) % 2;
     $("#currentPlayer").css("background-color",G_color[G_currentPlayer]);
  }  
}

/*
******************************************************************************
* function findRow determines the next available row for the checker just played
*                 inputs: column clicked by current player
*                         current player (0 or 1)
*                         GLOBAL current board position for current player
*                         GLOBAL number of rows and columns on the board 
*                             (constants)
*                 output: row number (0 relative)
******************************************************************************
*/
  
function findRow(column, player) {
  var currentBoard = [];
  var startBit;
  var mask;
  var temp64 = [];
  var temp;
  
  startBit = column * G_boardColumns;       // find start square number for column
  currentBoard = logicalOps64(G_player[0],G_player[1],'or');   // find current board status with all checkers
  
  temp64 = shiftRight64(currentBoard, startBit);   // shift the coumns bits to least sig position
  temp=temp64[0];
  
  mask = Math.pow(2, (G_boardRows)) - 1;
  temp = temp & mask;                  // mask the least sig boardRows bits
  
  return(Math.log(temp+1)/Math.LN2);   // next avail row is next sig bit NOT used!
}

/*
******************************************************************************
* function placeChecker: updates the display with the checker
*                   input: row
*                           column
*                           current player (0 or 1)
*                           GLOBAL player's current board position
*                   no return value
******************************************************************************
*/

function placeChecker(row, column, player) {

// fill in the code to place checker/ make checker visible/ etc.
  
  G_player[player] = setBit64(G_player[player],row, column);  // call to update current board status

}
/*
******************************************************************************
* function checkWin: check if the current player has won
*               inputs: player (0,1)
*                       GLOBAL player's current board word (64-bit unsigned)
*                       GLOBAL board dimensions number of rows/columns
*                return: true/false (boolean) win/no win
******************************************************************************
*/
   
function checkWin(player) {
  var temp=[];
  var temp2=[];      
                                   // the pesky algorithm that really works!!
  temp = shiftRight64(G_player[player], G_boardRows);  // diagonal down
  temp = logicalOps64(G_player[player], temp,'and');
  temp2 = shiftRight64(temp, 2*G_boardRows);
  temp2 = logicalOps64(temp, temp2, 'and');
  if (temp2[0] | temp2[1]) return(true);
  
  temp = shiftRight64(G_player[player], G_boardColumns);  //horizontal
  temp = logicalOps64(G_player[player], temp, 'and');
  temp2 = shiftRight64(temp, 2*G_boardColumns);
  temp2 = logicalOps64(temp,temp2,'and');
  if (temp2[0] | temp2[1]) return(true);
  
  temp = shiftRight64(G_player[player], (G_boardColumns + 1));  // diagonal up
  temp = logicalOps64(G_player[player],temp,'and');
  temp2 = shiftRight64(temp, 2*(G_boardColumns + 1));
  temp2 = logicalOps64(temp,temp2,'and');
  if (temp2[0] | temp2[1]) return(true);
  
  temp = shiftRight64(G_player[player], 1);      // vertical
  temp = logicalOps64(G_player[player], temp,'and');
  temp2 = shiftRight64(temp, 2);
  temp2 = logicalOps64(temp,temp2,'and');
  if (temp2[0] | temp2[1]) return(true);
  
  return(false);
}

/*
******************************************************************************
* function: setBit64 sets the appropriate bit in the "64-word" based on the row and column number
*          inputs: word - array with 2 32-bit words [0] is least sig
*                  row - 0 relative row number
*                  column - 0 relative column number
*                  GLOBAL - number of rows the board has
*          return: result "64-bit" board status updated appropriately (also 2 32-bit words [0] least sig)
******************************************************************************
*/
function setBit64(word, row, column) {
  var bitn;
  var useix;
  var result = [];
  
  result[0] = word[0];      // save off the input board status
  result[1] = word[1];
  
  bitn = column * (G_boardRows + 1) + row;    // find the square number = bit number
  
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
  var result=[];
  
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
     
