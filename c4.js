// JavaScript Document for connect 4: S.Schwarz

/* some global parameters for the font size, color, and background color */
var G_player = [];           // array with player checkers on the board
G_player[0]=0x0;
G_player[1]=0x0;

var G_currentPlayer = 0;
var G_boardColumns = 7;
var G_boardRows = 6;
var G_color = ["yellow","green"];

var G_debugFlg = false;

/*
******************************************************************************
* hook buttons/options to routines  NOT NECESSARY!!!!!
******************************************************************************
*/

$(document).ready(function(){

  if (G_debugFlg) window.alert("ready! " + G_player[0] +" " + G_player[1]);

/*
******************************************************************************
* column click, call placeChecker to update the board
******************************************************************************
*/

  $("#startGame").click(function() {
    var places=[];
  
    if (G_debugFlg) window.alert("startGame clicked! "); 
    
    $("svg").each(function() {
      $(this).css("visibility","hidden");
    });

    G_currentPlayer = 0;
    $("#currentPlayer").css("background-color",G_color[G_currentPlayer]);
    $("#currentPlayer").css("visibility","visible");
    
    G_player[0]=0x0;
    G_player[1]=0x0;
 
  });
    
  $("#button0").click(function() {
    if (G_debugFlg) window.alert("column0 clicked! "); 
    win = play(0,G_currentPlayer); 
  });
  
  $("#button1").click(function() {
    if (G_debugFlg) window.alert("column1 clicked! "); 
    play(1,G_currentPlayer);
  });
  
  $("#button2").click(function() {
    if (G_debugFlg) window.alert("column2 clicked! "); 
    play(2,G_currentPlayer); 
  });
  
  $("#button3").click(function() {
    if (G_debugFlg) window.alert("column3 clicked! "); 
    play(3,G_currentPlayer);
  });

  $("#button4").click(function() {
    if (G_debugFlg) window.alert("column4 clicked! "); 
    play(4,G_currentPlayer);
  });
  
  $("#button5").click(function() {
    if (G_debugFlg)window.alert("column5 clicked! "); 
    play(5,G_currentPlayer); 
  });
  
  $("#button6").click(function() {
    if (G_debugFlg)window.alert("column6 clicked! "); 
    play(6,G_currentPlayer);
  });
});

/*
******************************************************************************
* play: called after column button is clicked to place a checker
*       inputs: column clicked
*               player whose turn it is
*       it calls the functions: findRow: to determine the next free row
*                               placeChecker: to show the player his checker
*                               winCheck: to see if the currentplayer has won
******************************************************************************
*/

function play(column, player) {
  if (G_debugFlg) window.alert("play " + column + " " + player);
  
  var row;
  row = findRow(column, player);
  
  if (G_debugFlg) window.alert("play row =" + row);
  
  placeChecker(row, column, player);
  
  if (G_debugFlg) window.alert("play checker placed");
  
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
* function findRow determines the next vailable row for the checker just played
*                 inputs: column clicked by current player
*                         current player
*                         GLOBAL current board position for current player
*                         GLOBAL number of rows and columns on the board 
*                             (constants)
*                 output: row number (0 relative)
******************************************************************************
*/
  
function findRow(column, player) {
  var currentBoard;
  var startBit;
  var mask;
  var temp;
  
  if (G_debugFlg) window.alert("findRow " + column + " " + player);
  
  startBit = column * G_boardColumns;
  currentBoard = G_player[0] | G_player[1];
  temp = (currentBoard >>> startBit) 
  
  mask = Math.pow(2, (G_boardRows)) - 1;
  temp = temp & mask;   
  
  if (G_debugFlg) window.alert("findRow currentBoard=" + currentBoard + " mask=" + mask + " temp=" + temp);
  
  return(Math.log(temp+1)/Math.LN2);
  
}

/*
******************************************************************************
* function placeChecker: updates the display with the checker
*                   input: row
*                           column
*                           current player
*                           GLOBAL user's current board position
*                   no return value
******************************************************************************
*/

function placeChecker(row, column, player) {
  var columnName;
  var places = [];
  
  columnName = "#column" + column; 
  if (G_debugFlg) window.alert("placeChecker row, column, player, col name " + row + " " + column + " " + player + " " + columnName);
  
  G_player[player] = G_player[player] | Math.pow(2, column*G_boardColumns+row);
  if (G_debugFlg) window.alert("placeCheker new board, player, color " + G_player[player] + " " + player + " " + G_color[player]);
  
  places = $(columnName).children("svg");
/*  $(places[G_boardRows-row-1]).html('<circle cx="41" cy="41" r="40" stroke="black" stroke-width="2" fill="' + G_color[G_currentPlayer] + '" />'); */
/*  $(places[G_boardRows-row-1]>"circle").attr("fill",G_color[player]); */
  $(places[G_boardRows-row-1]).css("background-color",G_color[player]);
  $(places[G_boardRows-row-1]).css("visibility","visible");
}

/*
******************************************************************************
* function checkWin: check if the current player has won
*               inputs: global currentplayer
*                       global player's current board word (64-bit unsigned)
*                return: true/false win/no win
******************************************************************************
*/
   
function checkWin(player) {
  var y;
  
  if (G_debugFlg) window.alert("checkWin board for player " + player + "=" + G_player[player]);
  
  y = G_player[player] & (G_player[player] >> G_boardRows);
  if (y & (y >> (2*G_boardRows))) return(true);
  
  y = G_player[player] & (G_player[player] >> G_boardColumns);
  if (y & (y >> (2*G_boardColumns))) return(true); 
 
  y = G_player[player] & (G_player[player] >> (G_boardColumns + 1));
  if (y & y >> (2*(G_boardColumns + 1))) return(true);
  
  y = G_player[player] & (G_player[player] >> 1);
  if (y & (y >> 2)) return(true);
  
  return(false);
}   