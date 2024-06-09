function GameInit() {
    const players = ["X", "O"];
    let currentTurn = players[0];
    const getPlayers = () => players;
    const getCurrentTurn = () => currentTurn;
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
        getPlayers, getCurrentTurn
    };
};

const Game = GameInit();

window.addEventListener("DOMContentLoaded", () => {
    const ticTacToeGameSquaresGridSquareItems = [...document.querySelectorAll(".tic-tac-toe-game-squares-grid-square-item")];
});