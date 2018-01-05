const printBoard = (board) => {
    console.log(board.map( row => row.join(' | ')).join('\n'));
};

const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
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

const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
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
        // this loop has the potential to place bombs on top of bombs,
        // but this will be fixed later...
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

const getNumberOfNeighborBombs = (bombBoard, rowIndex, columnIndex) => {
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
    const numberOfRows = bombBoard.length;
    const numberOfColumns = bombBoard[0].length;
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
                if (bombBoard[neighborRowIndex][neighborColumnIndex] == 'B'){
                    numberOfBombs++;
                }
            }
    });
    return numberOfBombs;
};

const flipTile = (playerBoard, bombBoard, rowIndex, columnIndex) => {
    if (playerBoard[rowIndex][columnIndex] != ' '){
        console.log('This tile has already been flipped!');
        return;
    } else if (bombBoard[rowIndex][columnIndex] == 'B') {
        playerBoard[rowIndex][columnIndex] = 'B';
    } else {
        playerBoard[rowIndex][columnIndex] = getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex);
    }
};

const playerBoard = generatePlayerBoard(10,10);
const bombBoard = generateBombBoard(10,10,10);

console.log('Player Board: ');
printBoard(playerBoard);

console.log('Bomb Board: ');
printBoard(bombBoard);

// console.log('Number of bombs adjacent to (1,1) is: ' + getNumberOfNeighborBombs(bombBoard, 0, 0));
flipTile(playerBoard, bombBoard, 0, 0);
console.log('Updated Player Board: ');
printBoard(playerBoard);

