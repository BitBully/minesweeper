// To play Minesweeper, we will create instances of MineSweeperGame in command line.
// For example:
// In the command line, navigate to the lib directory and run `node`
// Run `.load game.js` to load the contents of this file.
// Then create a Game instance and run commands like so:
// let game = new Game(3, 3, 3);
// game.playMove(0, 1);
// game.playMove(1, 2);
// When done run `.exit`

import { Board } from './board';

class Game {
    constructor(numberOfRows, numberOfColumns, numberOfBombs){
        this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
    }

    playMove(rowIndex, colIndex){
        this._board.flipTile(rowIndex, colIndex);
        if (this._board.playerBoard[rowIndex][colIndex] === 'B'){
            console.log('That was a BOMB! You lose!');
            this._board.print();
        } else if (!this._board.hasSafeTiles()){
            console.log('You WIN!');
            this._board.print();
        } else {
            console.log('Current board:');
            this._board.print();
        }
    }
}

// const g = new Game(3, 3, 8);
// g.playMove(0,0);
