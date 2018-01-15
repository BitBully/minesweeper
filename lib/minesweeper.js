'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
    function Game(numberOfRows, numberOfColumns, numberOfBombs) {
        _classCallCheck(this, Game);

        this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
    }

    _createClass(Game, [{
        key: 'playMove',
        value: function playMove(rowIndex, colIndex) {
            this._board.flipTile(rowIndex, colIndex);
            if (this._board.playerBoard[rowIndex][colIndex] === 'B') {
                console.log('That was a BOMB! You lose!');
                this._board.print();
            } else if (!this._board.hasSafeTiles()) {
                console.log('You WIN!');
                this._board.print();
            } else {
                console.log('Current board:');
                this._board.print();
            }
        }
    }]);

    return Game;
}();

var Board = function () {
    function Board(numberOfRows, numberOfColumns, numberOfBombs) {
        _classCallCheck(this, Board);

        this._numberOfBombs = numberOfBombs;
        this._numberOfTiles = numberOfColumns * numberOfRows;
        this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
        this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
    }

    _createClass(Board, [{
        key: 'flipTile',
        value: function flipTile(rowIndex, columnIndex) {
            if (this._playerBoard[rowIndex][columnIndex] != ' ') {
                console.log('This tile has already been flipped!');
                return;
            } else if (this._bombBoard[rowIndex][columnIndex] == 'B') {
                this._playerBoard[rowIndex][columnIndex] = 'B';
            } else {
                this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
            }
            this._numberOfTiles--;
        }
    }, {
        key: 'getNumberOfNeighborBombs',
        value: function getNumberOfNeighborBombs(rowIndex, columnIndex) {
            var _this = this;

            var neighborOffsets = [];
            for (var i = 0; i < 8; i++) {
                neighborOffsets.push([]);
            }
            neighborOffsets[0] = [-1, -1];
            neighborOffsets[1] = [-1, 0];
            neighborOffsets[2] = [-1, 1];
            neighborOffsets[3] = [0, -1];
            neighborOffsets[4] = [0, 1];
            neighborOffsets[5] = [1, -1];
            neighborOffsets[6] = [1, 0];
            neighborOffsets[7] = [1, 1];
            // console.log('Neighbor offsets array: ' + neighborOffsets);
            var numberOfRows = this._bombBoard.length;
            var numberOfColumns = this._bombBoard[0].length;
            // console.log('Board size: ' + numberOfRows + ' rows, and ' + numberOfColumns + ' cols');
            var numberOfBombs = 0;
            neighborOffsets.forEach(function (offset) {
                // console.log('Neighbor: ' + offset);
                var neighborRowIndex = rowIndex + offset[0];
                // console.log('nRowIndex: ' + neighborRowIndex);
                var neighborColumnIndex = columnIndex + offset[1];
                // console.log('nColIndex: ' + neighborColumnIndex);
                if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
                    // console.log('Cell to check is: ' + neighborRowIndex + ',' + neighborColumnIndex);
                    if (_this._bombBoard[neighborRowIndex][neighborColumnIndex] == 'B') {
                        numberOfBombs++;
                    }
                }
            });
            return numberOfBombs;
        }
    }, {
        key: 'hasSafeTiles',
        value: function hasSafeTiles() {
            return this._numberOfTiles != this._numberOfBombs;
        }
    }, {
        key: 'print',
        value: function print() {
            console.log(this._playerBoard.map(function (row) {
                return row.join(' | ');
            }).join('\n'));
        }
    }, {
        key: 'playerBoard',
        get: function get() {
            return this._playerBoard;
        }
    }], [{
        key: 'generatePlayerBoard',
        value: function generatePlayerBoard(numberOfRows, numberOfColumns) {
            var board = [];
            for (var rowNumber = 0; rowNumber < numberOfRows; rowNumber++) {
                var row = [];
                for (var colNumber = 0; colNumber < numberOfColumns; colNumber++) {
                    row.push(' ');
                }
                board.push(row);
            }
            return board;
        }
    }, {
        key: 'generateBombBoard',
        value: function generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
            var board = [];
            for (var rowNumber = 0; rowNumber < numberOfRows; rowNumber++) {
                var row = [];
                for (var colNumber = 0; colNumber < numberOfColumns; colNumber++) {
                    row.push(null);
                }
                board.push(row);
            }

            var numberOfBombsPlaced = 0;
            var randomRowIndex = 0;
            var randomColIndex = 0;
            while (numberOfBombsPlaced < numberOfBombs) {
                randomRowIndex = Math.floor(Math.random() * numberOfRows);
                //        console.log('Random Row Index: ' + randomRowIndex);
                randomColIndex = Math.floor(Math.random() * numberOfColumns);
                //        console.log('Random Col Index: ' + randomColIndex);
                if (board[randomRowIndex][randomColIndex] != 'B') {
                    board[randomRowIndex][randomColIndex] = 'B';
                    numberOfBombsPlaced++;
                }
            };
            return board;
        }
    }]);

    return Board;
}();

var g = new Game(3, 3, 8);
g.playMove(0, 0);