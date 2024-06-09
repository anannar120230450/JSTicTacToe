function GameInit() {
    const players = ["X", "O"];
    let currentTurn = players[0];
    const getPlayers = () => players;
    const getCurrentTurn = () => currentTurn;
    const updateCurrentTurn = () => {
        if (currentTurn === players[0]) {
            currentTurn = players[1]
        } else if (currentTurn === players[1]) {
            currentTurn = players[0]
        };
    }
    const gameGridArray = [
        "", "", "",
        "", "", "",
        "", "", "",
    ];
    winnigGameGridTrios = [
        // left to right sequences
        [gameGridArray[0], gameGridArray[1], gameGridArray[2]],
        [gameGridArray[3], gameGridArray[4], gameGridArray[5]],
        [gameGridArray[6], gameGridArray[7], gameGridArray[8]],
        // top to bottom sequences
        [gameGridArray[0], gameGridArray[3], gameGridArray[6]],
        [gameGridArray[1], gameGridArray[4], gameGridArray[7]],
        [gameGridArray[2], gameGridArray[5], gameGridArray[8]],
        // diagonals
        [gameGridArray[0], gameGridArray[4], gameGridArray[8]],
        [gameGridArray[2], gameGridArray[4], gameGridArray[6]],
        [gameGridArray[6], gameGridArray[7], gameGridArray[8]],
    ];
    return {
        getPlayers, getCurrentTurn,
        updateCurrentTurn
    };
};

const Game = GameInit();

window.addEventListener("DOMContentLoaded", () => {
    const ticTacToeGameSquaresGridSquareItems = [...document.querySelectorAll(".tic-tac-toe-game-squares-grid-square-item")];

    ticTacToeGameSquaresGridSquareItems.forEach(squareItem => {
        let squareItemChosen = false;
        squareItem.addEventListener("click", () => {
            if (!squareItemChosen) {
                squareItem.innerHTML = Game.getCurrentTurn();
                Game.updateCurrentTurn();
                squareItemChosen = true;
            };
        });
    });
});