'use strict'
const MINE = '<img src="img/mine.png" />';
const FLAG = '<img src="img/flag.png" />';
const EMPTY = ' '

var gBoard;
var gBoardSize = 10
var gGame = {
    score: 0,
    isOn: false
}
var gMinesNum = 10


function initGame() {
    gBoard = buildBoard(gBoardSize);
    // console.log(gBoard);
    printMat(gBoard, '.board-container');
}

function buildBoard(size) {
    var board = [];
    for (var i = 0; i < size; i++) {
        board.push([]);
        for (var j = 0; j < size; j++) {
            board[i][j] = {
                isShown: false,
                isMine: false,
                isMarked: false,
                minesAroundCount: 0
            }
        }
    }
    return board;
}

function cellClicked(elCell) {
    var currCell = getCellCoord(elCell.id)
    if (gGame.isOn) {
        gBoard[currCell.i][currCell.j].isShown = true
        return cellClickedGame(elCell,currCell.i,currCell.j)
    }
    gBoard[currCell.i][currCell.j].isShown = true
    gGame.isOn = true
    setMines(gMinesNum);
    setMinesNegsCount(gBoard);
    cellClickedGame(elCell,currCell.i,currCell.j);
}

function cellClickedGame(elCell,i,j) {
    elCell.classList.add('selected');
    if (gBoard[i][j].isMine) return gameOver();
    if (gBoard[i][j].isMine === false && gBoard[i][j].isMarked === false
        && gBoard[i][j].minesAroundCount === 0) return expandShown(gBoard, elCell, i, j)

}

function setMines(minesNum) {
    var emptyCells = getEmptyCells(gBoard)
    for (var i = 0; i < minesNum; i++) {
        var randCell = emptyCells[getRandomIntInt(0, emptyCells.length)]
        gBoard[randCell.i][randCell.j].isMine = true

    }
}

function setMinesNegsCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board.length; j++) {
            var minesCount = countMinesAround(board, i, j)
            board[i][j].minesAroundCount = minesCount
        }
    }
}

function countMinesAround(mat, rowIdx, colIdx) {
    var count = 0;
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i > mat.length - 1) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j > mat[0].length - 1) continue
            if (i === rowIdx && j === colIdx) continue
            var cell = mat[i][j].isMine;
            if (cell) count++
        }
    }
    return count
}

function gameOver() {
    console.log('game over');
}

function expandShown(board, elCell, rowIdx, colIdx) {
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i > board.length - 1) continue
        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j > board[0].length - 1) continue
            if (i === rowIdx && j === colIdx) continue
            board[i][j].isShown = true
            // var elCell2= document.querySelector(`td #cell-${i}-${j}`) 
            // console.log(elCell2)
        }
    }
    
}