function GameInit(play1, play2) {
    let cellsArray = [
        new GameCell(1), new GameCell(2), new GameCell(3),
        new GameCell(4), new GameCell(5), new GameCell(6),
        new GameCell(7), new GameCell(8), new GameCell(9),
    ];
    const getCellsArray = () => cellsArray;
    const updateCellsArray = (index, value, selected) => {
        cellsArray[index] = new GameCell(index + 1, value, selected)
    }

    let currentTurn = play1;
    const getCurrentTurn = () => currentTurn;
    const updateCurrentTurn = () => {
        currentTurn === play1 ? currentTurn = play2 : currentTurn = play1;
    };

    return {
        getCellsArray, updateCellsArray,
        getCurrentTurn, updateCurrentTurn
    };
};

function GameCell(id, value = "", selected = false) {
    this.id = id;
    this.value = value;
    this.selected = selected;
}

GameCell.prototype.select = () => {
    this.selected = true;
}

const DOMCellItems = [...document.querySelectorAll(".tic-tac-toe-game-squares-grid-square-item")];
const Game = GameInit("X", "0");

DOMCellItems.forEach((cellItem, index) => {
    cellItem.addEventListener("click", () => {
        cellItem.innerHTML = Game.getCurrentTurn();
        Game.updateCellsArray(index, Game.getCurrentTurn(), true);
        // console.log(Game.getCellsArray());
        Game.updateCurrentTurn();
    });
});