function initiateBoard() {
    const tiles = Array(4).fill(Array(4).fill(0))
    return addRandomTile(tiles, 2)
}


function zerosToBottom(a, b) {
    // Callback-function for array.sort()
    // If a tile value is greater than 0, it gets sorted to a higher index,
    // and vice versa. 
    if (a !== 0 && b === 0) {
        return 1;
    }
    else if (a === 0 && b !== 0) {
        return -1;
    }
    else {
        return 0;
    }
}


function transposeMatrix(arr) {
    return arr[0].map((_,colIndex) => arr.map((row) => row[colIndex]));
}


function move(tiles, direction, increaseScoreFunction) {
    let collided = [];
    let tempScore = 0;
    let moveScore = 0;
    
    // Transpose board
    if (direction === 'ArrowUp' || direction === 'ArrowDown'){
        tiles = transposeMatrix(tiles)
        }

    if (direction === 'ArrowRight' || direction === 'ArrowDown') {
        // Move, collide, move again to cover up empty spaces.
        tiles = tiles.map((row) => {
            row.sort(zerosToBottom);
            [collided, tempScore] = handleCollisions(row, 'ArrowRight', increaseScoreFunction)
            moveScore += tempScore;
            collided.sort(zerosToBottom)
            return collided;
        });
    }

    else if (direction === 'ArrowLeft' || direction === 'ArrowUp') {
        tiles = tiles.map((row) => {
            // Reverse row first so same sorting algorithm can be used.
            // Move, collide, move again to cover up empty spaces.
            row.reverse();
            row.sort(zerosToBottom);
            [collided, tempScore] = handleCollisions(row, 'ArrowLeft', increaseScoreFunction)
            moveScore += tempScore;
            collided.sort(zerosToBottom)
            collided.reverse()
            return collided;
        });
    }

    // Transpose it back again
    if (direction === 'ArrowUp' || direction === 'ArrowDown'){
        tiles = transposeMatrix(tiles)
        }

    return [tiles, moveScore];
}


function handleCollisions(row, direction) {
    // Iterate over row in opposite direction of player's move. Adjacent 
    // tiles with the same value gets added up and assigned to the tile
    // farthes away in the direction of the move. The other is set to 0.
    let dir = 1;
    let score = 0;
    
    if (direction === 'ArrowRight' || direction === 'ArrowDown') {
        row.reverse()
        dir = -1
    }

    for (var i = 0; i<row.length; i++) {

        if ((row[i] === row[i+dir]) && (row[i] > 0)) {
            let newValue = row[i] + row[i+dir];
            row[i] = newValue;
            row[i+dir] = 0;
            score += newValue;
        }
    }

    if (direction === 'ArrowRight' || direction === 'ArrowDown') {
        row.reverse()
    }

    return [row, score];
}


function getEmptyTilesIndexes(tiles) {
    const emptyTilesIndexes = [];

    tiles.forEach((item, index) => {
        if (item === 0) {
            emptyTilesIndexes.push(index);
        }
    });

    return emptyTilesIndexes;
}


function makeRows(flatArr) {
    const rows = [];
    let i;

    for (i=0; i<flatArr.length; i+=4) {
        rows.push(flatArr.slice(i, i+4));
        }
    return rows;
}


function getRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
    

function addRandomTile(tiles, no=1) {        
    const tilesFlatArray = [].concat(...tiles);
    for (let i = 0; i < no; i++){
        const emptyTiles = getEmptyTilesIndexes(tilesFlatArray);
        const randTileIndex = getRandom(emptyTiles);
        const randValue = getRandom([2,4]); // The random added tile should have a value of 2 or 4.

        tilesFlatArray[randTileIndex] = randValue;
    }

    tiles = makeRows(tilesFlatArray);

    return tiles;
}


export {
    initiateBoard,
    zerosToBottom,
    transposeMatrix,
    move,
    handleCollisions,
    getEmptyTilesIndexes,
    makeRows,
    getRandom,
    addRandomTile
}
