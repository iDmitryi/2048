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

export default Tile;