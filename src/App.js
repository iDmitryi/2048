import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';

function Tile(props) {
    const colors = {
        0: '#ffff99',
        1: '#ffff33',
        2: '#ffad33',
        4: '#d86400',
        8: '#de4000'
    }

    return (
        <div 
            className="tile" 
            style={{backgroundColor: colors[Math.floor(props.value % 15)]}}>
            {(props.value > 0) ? props.value : ''}
        </div>
    )
}

function GameOverDiv(props) {
    return (
        <div className='gameOver' ><h1>GAME OVER</h1></div>
        )
}

function RestartButton(props) {
        return (
            <button onClick={props.clickHandler}>
                Restart
            </button>
            )
}

function ScoreBoard(props) {
    return (
        <div className="score">
            <div>
                <h3>Score: {props.score}</h3>
            </div>
        </div>
    )
}

function Board(props) {

    const [tiles, setTiles] = useState(initiateBoard());
    const [score, setScore] = useState(0);
    // TODO merge to gameStatus (null, gamoOver, gameWon)
    // const [gameStatus, setStatus] = useState()
    const [gameOver, setGameOver] = useState(false);
    const [youHaveWon, setGameWon] = useState(false);

    useEffect( () => {
        if (gameOver === false){
            document.addEventListener('keydown', keyPressHandler);
        }

        return () => {
            document.removeEventListener('keydown', keyPressHandler);
        }
    })

    useEffect( () => {
      checkGameStatus(tiles);  
    }, [tiles])

   
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

    function increaseScore(value) {
        setScore(score + value);
    }

    function handleCollisions(row, direction) {
        // Iterate over row in opposite direction of player's move. Adjacent 
        // tiles with the same value gets added up and assigned to the tile
        // farthes away in the direction of the move. The other is set to 0.
        
        let dir = 1
        
        if (direction === 'right' || direction === 'down') {
            row.reverse()
            dir = -1
        }

        for (var i = 0; i<row.length; i++) {

            if ((row[i] === row[i+dir]) && (row[i] > 0)) {
                let newValue = row[i] + row[i+dir];
                row[i] = newValue;
                row[i+dir] = 0;
                increaseScore(newValue);
            }
        }

        if (direction === 'right' || direction === 'down') {
            row.reverse()
        }

        return row
    }

    function move(tiles, direction) {

        // Transpose board
        if (direction === 'up' || direction === 'down'){
            tiles = transposeMatrix(tiles)
            }

        // TODO make switch sttement of this...
        if (direction === 'right' || direction === 'down') {
            // Move, collide, move again to cover up empty spaces.
            tiles = tiles.map((row) => {
                row.sort(zerosToBottom);
                let collided = handleCollisions(row, 'right')
                collided.sort(zerosToBottom)
                return collided;
            });
        }

        else if (direction === 'left' || direction === 'up') {
            tiles = tiles.map((row) => {
                // Reverse row first so same sorting algorithm can be used.
                // Move, collide, move again to cover up empty spaces.
                row.reverse();
                row.sort(zerosToBottom);
                let collided = handleCollisions(row, 'left')
                collided.sort(zerosToBottom)
                collided.reverse()
                return collided;
            });
        }

        // Transpose it back again
        if (direction === 'up' || direction === 'down'){
            tiles = transposeMatrix(tiles)
            }

        return tiles;
    }


    function checkGameStatus(tiles) {
        const tilesFlatArray = [].concat(...tiles);
        const emptyTiles = getEmptyTilesIndexes(tilesFlatArray)
        if (emptyTiles.length < 1) {
            setGameOver(true);
        }
        if (tilesFlatArray.includes(2048)) {
            setGameWon(true)
            setGameOver(true)
        }
    }


    function keyPressHandler(e) {
        let newTiles = [];

        switch(e.key) {
            case "ArrowUp":
                newTiles = move(tiles, 'up')
                break;

            case "ArrowDown":
                newTiles = move(tiles, 'down')
                break;

            case "ArrowLeft":
                newTiles = move(tiles, 'left')
                break;

            case "ArrowRight":
                newTiles = move(tiles, 'right')
                break;

            default:
                return;
        }

        newTiles = addRandomTile(newTiles);
        setTiles([...newTiles])
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

    function restartHandler() {
        setGameOver(false);
        setGameWon(false);
        setScore(0);
        setTiles(initiateBoard());
    }


    function renderRow(row) {
        return (
            <tr className="row">
                {row.map((tile, i) => <td key={i.toString()}><Tile value={tile} /></td>)}
            </tr>
        )
    }

    return (
        <div className="container">
            <ScoreBoard score={score} />
            <div className="board">
                {gameOver ? <GameOverDiv /> : null}
                <table className="table">
                <tbody>
                    {tiles.map((row) => renderRow(row))}
                </tbody>
                </table>
            </div>
                {gameOver ? <RestartButton clickHandler={restartHandler} /> : null}
        </div>
    );
}


function App() {
    return (
        <div className="App">
            <Board />
        </div>
    );
}

export default App;
