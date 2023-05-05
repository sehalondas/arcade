const body = document.getElementsByTagName("body")[0];
const select = document.getElementsByTagName("select")[0];
const board = document.getElementsByClassName("board")[0];
const statusDisplay = document.querySelector('.turn');
const boxSelect = Array.from(document.getElementsByClassName('box'));

let gameMode = "2p";
let gameActive = true;
let currentPlayer = "X";
boxSelect.innerHTML = ["", "", "", "", "", "", "", "", ""];
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let emptyboxes = [];
let random;
let boxChosen;

function numPlayers(e) {
    const target = e.target.value;
    const h2 = document.getElementById("players");
    const h3 = document.getElementById("mode");
    if (target == "one player") {
        const pName = prompt("What is your name?");
        h2.innerHTML = `${pName}(X) Vs Computer(O)`;
        h3.innerHTML = "One Player Mode";
        gameMode = "1p";
    }
    else if (target == "two players") {
        const p1Name = prompt("What is your name Player One?");
        const p2Name = prompt("What is your name Player Two?");
        h2.innerHTML = `${p1Name}(X) vs ${p2Name} (O)`;
        h3.innerHTML = "Two Player Mode";
        gameMode = "2p";
    }
}

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `it's ${currentPlayer}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn();

// At clickedBoxevent, it marks the box that was clicked
function boxClicked(clickedBoxEvent) {
    const clickedBox = clickedBoxEvent.target;
    const clickedBoxIndex = parseInt(clickedBox.getAttribute('data-box-index'));
    if (boxSelect.innerHTML[clickedBoxIndex] !== "" || !gameActive) {
        return;
    }
    boxPlayed(clickedBox, clickedBoxIndex);
    verifyResults();
}

// Marks box with current player
function boxPlayed(clickedBox, clickedBoxIndex) {
    boxSelect.innerHTML[clickedBoxIndex] = currentPlayer;
    clickedBox.innerHTML = currentPlayer;
}

// Verifies a win and changes the player if no winner
function verifyResults() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const windCondition = winningConditions[i];
        let a = boxSelect.innerHTML[windCondition[0]];
        let b = boxSelect.innerHTML[windCondition[1]];
        let c = boxSelect.innerHTML[windCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }
    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }
    let roundDraw = !boxSelect.innerHTML.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }
    playerChange();
}

function playerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
    if (gameMode == "1p" && currentPlayer == "O") {
        emptyboxes = [];
        computerMove();
        emptyboxes = [];
    }
}

function computerMove() {
    for (let i = 0; i < boxSelect.length; i++) {
        if (boxSelect[i].innerHTML == '') {
            emptyboxes.push(boxSelect[i]);
            console.log(emptyboxes);
        }
    }
    random = Math.floor(Math.random() * emptyboxes.length);
    boxChosen = emptyboxes[random];
    boxChosen.innerHTML = currentPlayer;

    // if(boxChosen.innerHTML !== "" || !gameActive) {
    //         return computerMove();
    //     } else if(boxChosen.innerHTML !== "X" && boxChosen.innerHTML !== "O") {
    //         boxChosen.innerHTML = currentPlayer;
    //         console.log("validate space");
    //     }

    // if(document.getElementById(random).innerHTML !== "" || !gameActive) {
    //     return computerMove();
    // } else 

    // if(document.getElementById(random) !== "X" && document.getElementById(random) !== "O") {
    //     document.getElementById(random).innerHTML = currentPlayer;
    // }
    verifyResults();
}

function restartGame() {
    gameActive = true;
    currentPlayer = "X";
    boxSelect.innerHTML = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll(".box").forEach(box => box.innerHTML = "");
}

select.addEventListener("change", numPlayers);

document.querySelectorAll('.box').forEach(box => box.addEventListener("click", boxClicked));
document.querySelector('.restart').addEventListener("click", restartGame);