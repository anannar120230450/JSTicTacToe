function GameInit(player1, player2) {
    let play1Score = 0;
    let play2Score = 0;
    const getPlayerScore = (player) => {
        if (player === 1) {
            return play1Score;
        } else if (player === 2) {
            return play2Score;
        };
    }
    const updatePlayerScore = (player) => {
        if (player === 1) {
            play1Score++;
        } else if (player === 2) {
            play2Score++;
        };
    };
    let cellsArray = [
        new GameCell(1), new GameCell(2), new GameCell(3),
        new GameCell(4), new GameCell(5), new GameCell(6),
        new GameCell(7), new GameCell(8), new GameCell(9),
    ];
    const getCellsArray = () => cellsArray;
    const updateCellsArray = (index, value, selected) => {
        cellsArray[index] = new GameCell(index + 1, value, selected)
    };
    const resetCellsArray = () => {
        cellsArray = [
            new GameCell(1), new GameCell(2), new GameCell(3),
            new GameCell(4), new GameCell(5), new GameCell(6),
            new GameCell(7), new GameCell(8), new GameCell(9),
        ];
    };

    let currentTurn = player1;
    const getCurrentPlayer = () => currentTurn;
    const updateCurrentPlayer = () => {
        currentTurn === player1 ? currentTurn = player2 : currentTurn = player1;
    };

    const getPlayers = () => {
        return {
            player1: player1,
            player2: player2,
        };
    };

    const reset = () => {
        currentTurn = "X";
        cellsArray = [
            new GameCell(1), new GameCell(2), new GameCell(3),
            new GameCell(4), new GameCell(5), new GameCell(6),
            new GameCell(7), new GameCell(8), new GameCell(9),
        ];
    };
    const bruteReset = () => {
        currentTurn = "X";
        cellsArray = [
            new GameCell(1), new GameCell(2), new GameCell(3),
            new GameCell(4), new GameCell(5), new GameCell(6),
            new GameCell(7), new GameCell(8), new GameCell(9),
        ];
        play1Score = 0;
        play2Score = 0;
    };

    return {
        getCellsArray, updateCellsArray, resetCellsArray,
        getCurrentPlayer, updateCurrentPlayer,
        getPlayerScore, updatePlayerScore,
        getPlayers, reset, bruteReset,
    };
};

function GameCell(id, value = "", selected = false) {
    this.id = id;
    this.value = value;
    this.selected = selected;
}

const DOMCellItems = [...document.querySelectorAll(".tic-tac-toe-game-squares-grid-square-item")];
const Game = GameInit("X", "O");

DOMCellItems.forEach((cellItem, index) => {
    cellItem.addEventListener("mouseenter", () => {
        const currentCellArray1 = Game.getCellsArray();
        if (!currentCellArray1[index].selected) {
            cellItem.innerHTML = `<span class="tic-tac-toe-game-squares-grid-square-item-preview-action">${Game.getCurrentPlayer()}</span>`
        }
    });
    cellItem.addEventListener("mouseleave", () => {
        const currentCellArray1 = Game.getCellsArray();
        if (!currentCellArray1[index].selected) {
            cellItem.innerHTML = "";
        }
    });
    cellItem.addEventListener("click", () => {
        const currentCellArray1 = Game.getCellsArray();
        const players = Game.getPlayers();
        if (!currentCellArray1[index].selected) {
            cellItem.innerHTML = Game.getCurrentPlayer();
            Game.updateCellsArray(index, Game.getCurrentPlayer(), true);
            // console.log(Game.getCellsArray());
            // check winner
            const currentCellArray = Game.getCellsArray();
            const winningCellSequences = [
                // left to right
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                // top to bottom
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                // diagonals
                [0, 4, 8], // top left to bottom right
                [2, 4, 6], // top right to bottom left
            ]

            let didAnyWin = false;
            for (cellSequence of winningCellSequences) {
                const [a, b, c] = cellSequence;
                if (currentCellArray[a].value && currentCellArray[a].value === currentCellArray[b].value && currentCellArray[a].value === currentCellArray[c].value) {
                    DOMCellItems.forEach(item => {
                        item.innerHTML = "";
                    });
                    if (Game.getCurrentPlayer() === players.player1) {
                        Game.updatePlayerScore(1);
                        document.querySelector(".game-info-toolbar-player-scores-player-1-score").innerHTML = Game.getPlayerScore(1);

                        // check if won
                        if (Game.getPlayerScore(1) === 3) {
                            document.querySelector("#winning-message-text").innerHTML = `${players.player1} Wins!`;
                            document.querySelector(".winning-message-backdrop").style.display = "flex";
                        }
                    } else if (Game.getCurrentPlayer() === players.player2) {
                        Game.updatePlayerScore(2);
                        document.querySelector(".game-info-toolbar-player-scores-player-2-score").innerHTML = Game.getPlayerScore(2);

                        // check if won
                        if (Game.getPlayerScore(2) === 3) {
                            document.querySelector("#winning-message-text").innerHTML = `${players.player2} Wins!`;
                            document.querySelector(".winning-message-backdrop").style.display = "flex";
                        }
                    };
                    Game.reset();
                    didAnyWin = true;
                    break;

                    /* document.getElementById("winning-message-text").innerHTML = `${Game.getCurrentPlayer()} Wins`;
                    document.querySelector(".winning-message-backdrop").style.display = "flex"; */
                }
            }

            if (!didAnyWin) {
                const currentCellArray = Game.getCellsArray();
                let allSelected = false;
                let tie = true;
                for (let i = 0; i < currentCellArray.length; i++) {
                    if (currentCellArray[i].selected) {
                        allSelected = true;
                        tie = true;
                    } else {
                        allSelected = false;
                        tie = false;
                        break;
                    }
                }
                if (tie) {
                    DOMCellItems.forEach(item => {
                        item.innerHTML = "";
                    });
                    Game.resetCellsArray();
                } else {
                    Game.updateCurrentPlayer();
                }
            }
            /*if (currentCellArray[0].value && currentCellArray[0].value === currentCellArray[1].value && currentCellArray[0].value === currentCellArray[2].value) {
                DOMCellItems.forEach(item => {
                    item.innerHTML = "";
                });
                if (Game.getCurrentPlayer() === "X") {
                    Game.updatePlayerScore(1);
                    document.querySelector(".game-info-toolbar-player-scores-player-1-score").innerHTML = Game.getPlayerScore(1);
                } else if (Game.getCurrentPlayer() === "0") {
                    Game.updatePlayerScore(2);
                    document.querySelector(".game-info-toolbar-player-scores-player-2-score").innerHTML = Game.getPlayerScore(2);
                };
                Game.reset();
     
                /// document.getElementById("winning-message-text").innerHTML = `${Game.getCurrentPlayer()} Wins`;
                document.querySelector(".winning-message-backdrop").style.display = "flex"; ///
            } else {
                Game.updateCurrentPlayer();
            };*/
        };
    });
});

// restart
document.getElementById("winning-message-popup-restart-btn").addEventListener("click", () => {
    Game.bruteReset();
    document.querySelector(".game-info-toolbar-player-scores-player-1-score").innerHTML = Game.getPlayerScore(1);
    document.querySelector(".game-info-toolbar-player-scores-player-2-score").innerHTML = Game.getPlayerScore(2);
    document.querySelector("#winning-message-text").innerHTML = "";
    document.querySelector(".winning-message-backdrop").style.display = "none";
});