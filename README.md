TIC TAC TOE
Set Up
////-have board
    ////-3x3 grid
////-have players

The Game
-player makes move
        -x goes first
        -
    -is game over?
        -No: cont
        -yes: declare winner
-next player makes move
-repeat until game is over

Rubric
TIC-TAC-TOE
As users playing a two player game we want to:
////-enter our names and have them displayed
////-have our order chosen for us by the game
////-take turns placing our marks in empty spaces
////-not be able to place our marks in an occupied space
////-be told when a move causes a player to win, or to draw
////-start the game over without having to reset the browser

As a user playing a one player game I want to:
////-see the name 'Computer' displayed as my opponent
//XX-have the Computer player make moves as if it were a human player with the correct mark in an empty space

As a user playing a single player game I would be delighted to:
-have the Computer make 'better-than-guessing' choices when placing a mark on the board
-set the board size myself ("wider" or "taller" than 3x3)

Rubic Strech Goals
Smart" computer player
-Brainy (Instead of randomly picking an empty spot): the "easy version" of this is to look at all empty spaces, and -ask if any of them get you a win, if so, choose it, otherwise choose randomly

SUPER BRAINY
-for each look ahead, see if there's a win for the human player, if so, eliminate those from the possible choices
-Board Size Change (n-by-n)
  -Here you could switch to either checking for 3-of-a-kind still, or for n-of-a-kind (row, horizonal, diagonal)


  SNAKE
As a user playing the game I want to:

-start the game by pressing a Start button
-use my arrow keys to change the direction of the snake
-have the snake grow correctly when it eats the apple
-have the game end if the snake tries to eat itself
-have the game end if the snake runs into a wall
-see how long my snake was when the game ended
-start the game over without having to reset the browser

As a user playing a single player game I would be delighted if:

-can set the difficulty (speed of snake)
-can keep track of my stats (maximum points, average points, etc.) between games