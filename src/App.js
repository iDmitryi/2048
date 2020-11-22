import { useState, useEffect } from 'react';
import './App.css';


function Board() {

    // Setup
    const [tiles, setTiles] = useState( [ [0, 2, 0, 2], [4, 0, 0, 8], [0, 4, 2, 0], [0, 2, 0, 0] ] );

    useEffect(() => {
            document.body.addEventListener('keydown', keyPressHandler);
            setTiles(addRandomTile(tiles))

            return () => {
                document.body.removeEventListener('keydown', keyPressHandler);
            }
        }, []);


    function Tile(props) {
        const colors = {
            0: '#ffff99',
            1: '#ffff33',
            2: '#ffad33',
            4: '#d86400'
        }

        return (
            <div 
                className="tile" 
                style={{backgroundColor: colors[Math.floor(props.value / 2)]}}>
                {(props.value > 0) ? props.value : ''}
            </div>
        )
    }


    function renderTile(row, col) {
        return (
            <Tile value={tiles[row][col]} />
        )
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


    function getColumn(tiles, column_index) {
        const column = [];
        tiles.forEach((row) => {column.push(row[column_index])});
        return column;

    }


    function move(tiles, direction) {

        if (direction === 'right') {
            tiles.forEach((row) => {
                row.sort(zerosToBottom);
            });
        }

        else if (direction === 'left') {
            tiles.forEach((row) => {
                row.reverse();
                row.sort(zerosToBottom);
                row.reverse();
            });
        }

        return tiles;
    }


    function keyPressHandler(e) {

        switch(e.key) {
            case "ArrowUp":
                setTiles(move(tiles,'up'))
                break;

            case "ArrowDown":
                setTiles(move(tiles,'down'))
                break;

            case "ArrowLeft":
                setTiles(move(tiles,'left'))
                break;

            case "ArrowRight":
                setTiles(move(tiles,'right'))
                break;

            default:
                return;
        }

         setTiles( addRandomTile(tiles) )

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
        

    function addRandomTile(tiles) {        
        const tilesFlatArray = [].concat(...tiles);
        const emptyTiles = getEmptyTilesIndexes(tilesFlatArray);
        const randTileIndex = getRandom(emptyTiles);
        const randValue = getRandom([2,4]); // The random added tile should have a value of 2 or 4.

        tilesFlatArray[randTileIndex] = randValue;
        tiles = makeRows(tilesFlatArray);

        return tiles;
    }


    return (
        <div className="board">
            <table className="table">
            <tbody>
            <tr className="row">
                <td>{renderTile(0,0)}</td>
                <td>{renderTile(0,1)}</td>
                <td>{renderTile(0,2)}</td>
                <td>{renderTile(0,3)}</td>
            </tr>
            <tr className="row">
                <td>{renderTile(1,0)}</td>
                <td>{renderTile(1,1)}</td>
                <td>{renderTile(1,2)}</td>
                <td>{renderTile(1,3)}</td>
            </tr>            
            <tr className="row">
                <td>{renderTile(2,0)}</td>
                <td>{renderTile(2,1)}</td>
                <td>{renderTile(2,2)}</td>
                <td>{renderTile(2,3)}</td>
            </tr>            
            <tr className="row">
                <td>{renderTile(3,0)}</td>
                <td>{renderTile(3,1)}</td>
                <td>{renderTile(3,2)}</td>
                <td>{renderTile(3,3)}</td>
            </tr>
            </tbody>
            </table>
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
