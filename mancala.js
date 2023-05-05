const board = [
  4, 4, 4, 4, 4, 4, 0, /* player 1 */ 4, 4, 4, 4, 4, 4, 0 /* player 2 */
];

const gameState = {
  board: board, // from above
  currentPlayer: 0 // switch to 1 when the player swaps
}