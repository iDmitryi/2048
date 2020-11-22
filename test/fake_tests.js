// The following tests does not work. 
// I have little or no experience any JS unit test frameworks but still 
// wanted to show how I would go about testing my app.


function setUp() {
	const arr = [ [0, 1, 2, 3], [0, 1, 2, 3], [0, 1, 2, 3], [0, 1, 2, 3] ]

	const initialState = getStatefromSomewhere()

}


 // UTILS

test('sort callback function', () => {

	assertEqual( zerosToBottom(4,0), 1 )
	assertEqual( zerosToBottom(0,2), -1 )
	assertEqual( zerosToBottom(4,2), 0 )
});

test('getColumn returns correct column from 2D-array.', () => {
	
	assertEqual( typeof(getColumn(arr, 0), 'object' )
	assertEqual( getColumn(arr, 0), [ 0, 0, 0, 0 ])
	assertEqual( getColumn(arr, 2), [ 2, 2, 2, 2 ])

});

test('makeRows returns correct rows from 1D-array', () => {
	const origArray = [ 10, 11, 12, 13, 20, 21, 22, 23, 30, 31, 32, 33]

	const targetArray = [ [10, 11, 12, 13], 
						[20, 21, 22, 23], 
						[30, 31, 32, 33] ]

	assertEqual( origArray, targetArray )
});

test('getEmptyTilesIndexes returns correct indexes', () => {

	const origArray = [0, 1, 0, 1, 0, 1, 0, 1, 0, 1]
	const targetArray = [0, 2, 4, 6, 8]

	assertEqual( getEmptyTilesIndexes(origArray), targetArray )
});

test('move function', () => {
	const origArray = [ 	[2, 2, 2, 2], 
						[4, 0, 2, 8], 
						[0, 4, 2, 0], 
						[0, 2, 0, 0] ]

	const targetLeft = [ 	[2, 2, 2, 2], 
						[4, 2, 8, 0], 
						[4, 2, 0, 0], 
						[2, 0, 0, 0] ]

	const targetRight = [ [2, 2, 2, 2], 
						[0, 4, 2, 8], 
						[0, 0, 4, 2], 
						[0, 0, 0, 2] ]

	assertEqual( move(origArray, 'left'), targetLeft )
	assertEqual( move(origArray, 'right'), targetRight )
	
});

test('keypress event subscribed', () => {
	return;
});

test('keypress event', () => {
	// fire keypress and see what happens.
	return;
});

test('keyPressHandler changes state', () => {
	targetState = [ [2, 2, 2, 2], 
					[4, 0, 2, 8], 
					[0, 4, 2, 0], 
					[0, 2, 0, 0] ]
	
	setTiles(targetState)
	const state = getStatefromSomewhere()

	assertEqual(state, targetState)

});

test('adding of random tile', () => {
	// Test if one of the empty tiles has changed from 0 to 2 or 4.
	return;
})

test('colliding logic') ...

test('scoring') ...

test('App knows when game is won and tells the player.') ...





// COMPONENTS

test('App component mounts') ...

test('Board conponent mounts') ...

test('Board initial state') ...

test('Tile conponent mounts') ...

test('Tiles get rendered correctly on Board') ...

test('Tile get colored corresponding to its value.') ...
