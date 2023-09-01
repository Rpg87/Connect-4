'use strict';
const btn = document.querySelector('.btn');
const playerRed = 'R';
const playerYellow = 'Y';
let currentPlayer = playerRed;
let gameOver = false;

let board;


const rows = 6;
const columns = 7;
let currColumns = [];

const audioRed = new Audio('audio/red.mp3');
const audioYellow = new Audio('audio/yellow.mp3');

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
            row.push(' ');

            //HTML
            let tile = document.createElement('div');
            tile.id = r.toString() + '-' + c.toString();
            tile.classList.add('tile');
            console.log(this);
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
    // r = currColumns

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

function checkWinner() {
    //horizontally
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r][c + 1]
                    && board[r][c + 1] == board[r][c + 2] && board[r][c + 2] == board[r][c + 3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }
    // vertically
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 3; r++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r + 1][c] && board[r + 1][c] == board[r + 2][c] && board[r + 2][c] == board[r + 3][c]) {
                    setWinner(r, c);
                    return;
                }

            }

        }
    }
    //diagonally
    for (let r = 0; r < rows - 3; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r + 1][c + 1] && board[r + 1][c + 1] == board[r + 2][c + 2] && board[r + 2][c + 2] == board[r + 3][c + 3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }
    //up diagonally
    for (let r = 3; r < rows; r++) {
        for (let c = 0; c < columns - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r - 1][c + 1] && board[r - 1][c + 1] == board[r - 2][c + 2] && board[r - 2][c + 2] == board[r - 3][c + 3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

}

function setWinner(r, c) {
    let winner = document.getElementById('winner');
    if (board[r][c] == playerRed) {
        winner.innerHTML = 'Red Wins';
        winner.classList.add('red')
        audioRed.play();
    } else {
        winner.innerHTML = 'Yellow wins';
        audioYellow.play();
        winner.classList.add('yellow')
    }
    gameOver = true;
    btn.style.display = 'inline';

}

function resetGame() {
    currentPlayer = playerRed;
    gameOver = false;
    currColumns = [5, 5, 5, 5, 5, 5, 5]; // Configura todas las columnas en la primera fila

    // Limpia el tablero y elimina las clases CSS
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            board[r][c] = ' ';
            let tile = document.getElementById(r.toString() + '-' + c.toString());
            tile.classList.remove('red-piece', 'yellow-piece');
        }
    }

    // Oculta el botón
    btn.style.display = 'none';

    // Limpia el mensaje de ganador
    let winner = document.getElementById('winner');
    winner.innerHTML = 'Who will win?';
    winner.classList.remove('red', 'yellow');
}

btn.addEventListener('click', resetGame)