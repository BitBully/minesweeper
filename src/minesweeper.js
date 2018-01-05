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

const playerBoard = generatePlayerBoard(3,4);
const bombBoard = generateBombBoard(3,4,5);

console.log('Player Board: ');
printBoard(playerBoard);

console.log('Bomb Board: ');
printBoard(bombBoard);
