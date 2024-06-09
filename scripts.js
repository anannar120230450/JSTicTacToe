function GameInit(gridViewItems) {
    let winner = "";
    let gamePlaying = true;
    const players = ["X", "O"];
    let currentTurn = players[0];
    const getCurrentTurn = () => currentTurn;
    const updateCurrentTurn = () => {
        if (currentTurn === players[0]) {
            currentTurn = players[1]
        } else if (currentTurn === players[1]) {
            currentTurn = players[0]
        };
    };
    const gameGridArray = [
        "", "", "",
        "", "", "",
        "", "", "",
    ];
    winningGameGridTrios = [
        // left to right sequences
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        // top to bottom sequences
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        // diagonals
        [0, 4, 8],
        [2, 4, 6],
    ];
    // apply events
    gridViewItems.forEach(squareItem => {
        let squareItemChosen = false;
        squareItem.addEventListener("click", () => {
            if (!squareItemChosen && gamePlaying) {
                // update game grid array
                // find the equivalent index in the gameGridArray to the squareItem being clicked
                gameGridArray[gridViewItems.indexOf(squareItem)] = getCurrentTurn();
                // console.log(gameGridArray[gridViewItems.indexOf(squareItem)]);
                squareItem.innerHTML = getCurrentTurn();
                updateCurrentTurn();
                squareItemChosen = true;
                

                winningGameGridTrios.forEach(gridTrio => {
                    for (let i = 0; i < gridTrio.length; i++) {
                        if (gridTrio[i] === gridViewItems.indexOf(squareItem)) {
                            console.log(gridTrio[i]);
                        }
                    }
                });
            };
        });
    });
};

const ticTacToeGameSquaresGridSquareItems = [...document.querySelectorAll(".tic-tac-toe-game-squares-grid-square-item")];
const Game = GameInit(ticTacToeGameSquaresGridSquareItems);