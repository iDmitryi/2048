import React from 'react';
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

function ScoreBoard(props) {
    return (
        <div className="score">
            <div>
                <h3>Score: {props.score}</h3>
            </div>
            <div className="gameStatus">
                <h1>{props.gameOver ? 'GAME OVER!' : ''}</h1>
                <h1>{props.youHaveWon ? 'YOU WON!' : ''}</h1>
            </div>
        </div>
    )
}

class Board extends React.Component {

    constructor(props){
      super(props);

      this.state = {
        tiles: this.initiateBoard(),
        score: 0,
        gameOver: false,
        youHaveWon: false
      }
    }    

    componentDidMount() {
        console.log('SUBSCRIBE')
        document.addEventListener("keydown", this.keyPressHandler.bind(this));
    }

    componentWillUnmount() {
        console.log('UN-SUBSCRIBE')
        document.removeEventListener("keydown", this.keyPressHandler.bind(this));
    } 

    
    initiateBoard() {
        const tiles = Array(4).fill(Array(4).fill(0))
        return this.addRandomTile(tiles, 2)
    }

    
    zerosToBottom(a, b) {
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

    transposeMatrix(arr) {
        return arr[0].map((_,colIndex) => arr.map((row) => row[colIndex]));
    }

    increaseScore(value) {
        this.setState({'score': this.state.score += value});
    }

    handleCollisions(row, direction) {
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
                this.increaseScore(newValue);
            }
        }

        if (direction === 'right' || direction === 'down') {
            row.reverse()
        }

        return row
    }

    move(tiles, direction) {
        tiles = this.state.tiles;

        // Transpose board
        if (direction === 'up' || direction === 'down'){
            tiles = this.transposeMatrix(tiles)
            }

        // TODO make switch sttement of this...
        if (direction === 'right' || direction === 'down') {
            // Move, collide, move again to cover up empty spaces.
            tiles = tiles.map((row) => {
                row.sort(this.zerosToBottom);
                let collided = this.handleCollisions(row, 'right')
                collided.sort(this.zerosToBottom)
                return collided;
            });
        }

        else if (direction === 'left' || direction === 'up') {
            tiles = tiles.map((row) => {
                // Reverse row first so same sorting algorithm can be used.
                // Move, collide, move again to cover up empty spaces.
                row.reverse();
                row.sort(this.zerosToBottom);
                let collided = this.handleCollisions(row, 'left')
                collided.sort(this.zerosToBottom)
                collided.reverse()
                return collided;
            });
        }

        // Transpose it back again
        if (direction === 'up' || direction === 'down'){
            tiles = this.transposeMatrix(tiles)
            }

        return tiles;
    }


    checkGameStatus(tiles) {
        const tilesFlatArray = [].concat(...tiles);
        const emptyTiles = this.getEmptyTilesIndexes(tilesFlatArray)
        if (emptyTiles.length < 1) {
            this.setState({gameOver: true})
        }

        this.setState({youHaveWon: tilesFlatArray.includes(2048)})
    }


    keyPressHandler(e) {
        let tiles = this.state.tiles
        let newTiles = null;

        switch(e.key) {
            case "ArrowUp":
                newTiles = this.move(tiles, 'up')
                break;

            case "ArrowDown":
                newTiles = this.move(tiles, 'down')
                break;

            case "ArrowLeft":
                newTiles = this.move(tiles, 'left')
                break;

            case "ArrowRight":
                newTiles = this.move(tiles, 'right')
                break;

            default:
                return;
        }

        newTiles = this.addRandomTile(newTiles);
        this.setState({'tiles':newTiles})
        this.checkGameStatus(this.state.tiles);

    }


    getEmptyTilesIndexes(tiles) {
        const emptyTilesIndexes = [];

        tiles.forEach((item, index) => {
            if (item === 0) {
                emptyTilesIndexes.push(index);
            }
        });

        return emptyTilesIndexes;
    }


    makeRows(flatArr) {
        const rows = [];
        let i;

        for (i=0; i<flatArr.length; i+=4) {
            rows.push(flatArr.slice(i, i+4));
            }
        return rows;
    }


    getRandom(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }
        

    addRandomTile(tiles, no=1) {        
        const tilesFlatArray = [].concat(...tiles);
        for (let i = 0; i < no; i++){
            const emptyTiles = this.getEmptyTilesIndexes(tilesFlatArray);
            const randTileIndex = this.getRandom(emptyTiles);
            const randValue = this.getRandom([2,4]); // The random added tile should have a value of 2 or 4.

            tilesFlatArray[randTileIndex] = randValue;
        }

        tiles = this.makeRows(tilesFlatArray);


        return tiles;
    }


    renderRow(row) {
        return (
            <tr className="row">
                {row.map((tile, i) => <td key={i.toString()}><Tile value={tile} /></td>)}
            </tr>

        )
    }

    render() {
        return (
            <div className="board">
                <ScoreBoard score={this.state.score} gameOver={this.state.gameOver} youHaveWon={this.state.youHaveWon} />
                <table className="table">
                <tbody>
                    {this.state.tiles.map((row) => this.renderRow(row))}
                </tbody>
                </table>
            </div>
        );
    }   
}


function App() {
    return (
        <div className="App">
            <Board />
        </div>
    );
}

export default App;
