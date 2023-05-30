'use strict';



const playerRed = 'R';
const playerYellow = 'Y';
const currentPlayer = playerRed;
const gameOver = false;

let board;

const rows = 6;
const columns = 7;

window.onload = function () {
    setGame();
}

function setGame() {
    board = [];

    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            //JS
            row.push(' ')

            //HTML
            let tile = document.createElement('div');
            tile.id = r.toString() + - + c.toString();
            tile.classList.add('tile');
            document.getElementById('board').append(tile);
            // Con estas líneas estamos creando un div, le añadimos ID ejemplo 0-0 (c=0 r=0), le añadimos una clase y por último lo añadimos a nuestro board gracias a append
        }
        board.push(row);
    }
}