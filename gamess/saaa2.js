let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let playerDisplay = document.querySelector("#player-display");

let turn0 = true; // true -> "O", false -> "X"
let player1 = "";
let player2 = "";

// Winning Patterns
const winPatterns = [
    [0, 1, 2], [0, 3, 6], [0, 4, 8], [1, 4, 7],
    [2, 5, 8], [2, 4, 6], [3, 4, 5], [6, 7, 8]
];

// Function to Start the Game & Store Player Names
function startGame() {
    player1 = document.getElementById("player-name1").value;
    player2 = document.getElementById("player-name2").value;

    if (player1 && player2) {
        document.getElementById("title").innerText = `Let's Play Tic-Tac-Toe!`;
        playerDisplay.innerText = `Player 1: ${player1} (O) | Player 2: ${player2} (X)`;
    } else {
        alert("Please enter both player names to start the game!");
    }
}

// Function to Reset the Game
const resetGame = () => {
    turn0 = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    playerDisplay.innerText = `Player 1: ${player1} (O) | Player 2: ${player2} (X)`;
};

// Function to Enable All Boxes (Clears the Board)
const enableBoxes = () => {
    boxes.forEach((box) => {
        box.innerText = ""; // Clear text
        box.disabled = false; // Enable box
    });
};

// Function to Disable All Boxes
const disableBoxes = () => {
    boxes.forEach((box) => (box.disabled = true));
};

// Function to Show Winner Message with Player Name
const showWinner = (winner) => {
    let winningPlayer = winner === "O" ? player1 : player2;
    msg.innerText = `🎉 Congratulations, ${winningPlayer}! You won with '${winner}'`;
    msgContainer.classList.remove("hide");
    disableBoxes(); // Stop the game
};

// Function to Check Winner
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos1Val === pos2Val && pos2Val === pos3Val) {
            showWinner(pos1Val);
            return; // Stop checking once a winner is found
        }
    }
};

// Add Event Listeners to Boxes
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turn0) {
            box.innerText = "O";
        } else {
            box.innerText = "X";
        }
        turn0 = !turn0; // Toggle turn
        box.disabled = true; // Disable clicked box

        checkWinner();
    });
});

// Event Listeners for Buttons
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
