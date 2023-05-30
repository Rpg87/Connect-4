'use strict';



const playerRed = 'R';
const playerYellow = 'Y';
const currentPlayer = playerRed;
const gameOver = false;

let board;
let currColumns;

const rows = 6;
const columns = 7;

window.onload = function () {
    setGame();
}

function setGame() {
    board = [];
    currColumns = [5, 5, 5, 5, 5, 5, 5];

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            //JS
            row.push(' ')

            //HTML
            let tile = document.createElement('div');
            tile.id = r.toString() + - + c.toString();
            tile.classList.add('tile');
            tile.addEventListener('click', setPiece);
            document.getElementById('board').append(tile);
            // Con estas líneas estamos creando un div, le añadimos ID ejemplo 0-0 (c=0 r=0), le añadimos una clase y por último lo añadimos a nuestro board gracias a append
        }
        board.push(row);
    }
}

function setPiece() {
    if (gameOver) {
        return
    }

    let coords = this.id.split('-'); //'0-0' -> ['0', '0']
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);
    r = currColumns

    r = currColumns[c];
    if (r < 0) {
        return;
    }

    board[r][c] = currentPlayer;
    let tile = document.getElementById(r.toString() + '-' + c.toString());
    if (currentPlayer == playerRed) {
        tile.classList.add('red-piece')
        currentPlayer = playerYellow;
    } else {
        tile.classList.add('yellow-piece')
        currentPlayer = playerRed;
    }
    r -= 1; //update row height for the C
    currColumns[c] = r; //update the array
    checkWinner();

}