export class Board {
    constructor(numberOfRows, numberOfColumns, numberOfBombs){
        this._numberOfBombs = numberOfBombs;
        this._numberOfTiles = numberOfColumns * numberOfRows;
        this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
        this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
    }

    get playerBoard(){
        return this._playerBoard;
    }

    flipTile(rowIndex, columnIndex) {
        if (this._playerBoard[rowIndex][columnIndex] != ' '){
            console.log('This tile has already been flipped!');
            return;
        } else if (this._bombBoard[rowIndex][columnIndex] == 'B') {
            this._playerBoard[rowIndex][columnIndex] = 'B';
        } else {
            this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
        }
        this._numberOfTiles--;
    };

    getNumberOfNeighborBombs(rowIndex, columnIndex) {
        const neighborOffsets = [];
        for (var i=0; i<8; i++){ neighborOffsets.push([]); }
        neighborOffsets[0] = [-1,-1];
        neighborOffsets[1] = [-1,0];
        neighborOffsets[2] = [-1,1];
        neighborOffsets[3] = [0,-1];
        neighborOffsets[4] = [0,1];
        neighborOffsets[5] = [1,-1];
        neighborOffsets[6] = [1,0];
        neighborOffsets[7] = [1,1];
        // console.log('Neighbor offsets array: ' + neighborOffsets);
        const numberOfRows = this._bombBoard.length;
        const numberOfColumns = this._bombBoard[0].length;
        // console.log('Board size: ' + numberOfRows + ' rows, and ' + numberOfColumns + ' cols');
        let numberOfBombs = 0;
        neighborOffsets.forEach((offset) => {
            // console.log('Neighbor: ' + offset);
            const neighborRowIndex = rowIndex + offset[0];
            // console.log('nRowIndex: ' + neighborRowIndex);
            const neighborColumnIndex = columnIndex + offset[1];
            // console.log('nColIndex: ' + neighborColumnIndex);
            if (neighborRowIndex >= 0 && 
                neighborRowIndex < numberOfRows &&
                neighborColumnIndex >= 0 &&
                neighborColumnIndex < numberOfColumns) {
                    // console.log('Cell to check is: ' + neighborRowIndex + ',' + neighborColumnIndex);
                    if (this._bombBoard[neighborRowIndex][neighborColumnIndex] == 'B'){
                        numberOfBombs++;
                    }
                }
        });
        return numberOfBombs;
    };

    hasSafeTiles(){
        return (this._numberOfTiles != this._numberOfBombs);
    }

    print() {
        console.log(this._playerBoard.map( row => row.join(' | ')).join('\n'));
    };

    static generatePlayerBoard(numberOfRows, numberOfColumns) {
        let board = [];
        for (var rowNumber=0; rowNumber<numberOfRows; rowNumber++){
            let row = [];
            for (var colNumber=0; colNumber<numberOfColumns; colNumber++){
                row.push(' ');
            }
            board.push(row);
        }
        return board;
    };

    static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
        let board = [];
        for (var rowNumber=0; rowNumber<numberOfRows; rowNumber++){
            let row = [];
            for (var colNumber=0; colNumber<numberOfColumns; colNumber++){
                row.push(null);
            }
            board.push(row);
        }
    
        let numberOfBombsPlaced = 0;
        let randomRowIndex = 0;
        let randomColIndex = 0;
        while(numberOfBombsPlaced < numberOfBombs){
            randomRowIndex = Math.floor(Math.random() * numberOfRows);
    //        console.log('Random Row Index: ' + randomRowIndex);
            randomColIndex = Math.floor(Math.random() * numberOfColumns);
    //        console.log('Random Col Index: ' + randomColIndex);
            if (board[randomRowIndex][randomColIndex] != 'B'){
                board[randomRowIndex][randomColIndex] = 'B';
                numberOfBombsPlaced++;
            }
        };
        return board;
    };
}

