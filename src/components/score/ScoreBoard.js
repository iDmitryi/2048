function ScoreBoard( {score, highscore} ) {
    return (
        <div className="score">
            <div style={{'float':'left'}}>
                <h3>Score: {score}</h3>
            </div>
            <div style={{'float':'right'}}>
            	<h3>Highscore: {highscore}</h3>
            </div>
        </div>
    )
}

export default ScoreBoard;