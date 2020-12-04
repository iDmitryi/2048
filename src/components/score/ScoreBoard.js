function ScoreBoard(props) {
    return (
        <div className="score">
            <div>
                <h3>Score: {props.score}</h3>
            </div>
        </div>
    )
}

export default ScoreBoard;