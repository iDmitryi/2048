
import { initiateBoard,
		zerosToBottom,
		transposeMatrix,
		move,
		handleCollisions,
		getEmptyTilesIndexes,
		makeRows,
		getRandom,
		addRandomTile } from './board_functions'


describe('initiateBoard', () => {
	it('returns an array of length 4', () =>{
		let arr = initiateBoard();
		expect(typeof(arr)).toBe('object');
		expect(arr).toHaveLength(4);
	});
});


describe('transposeMatrix', () => {
	it('returns a transposed array', () =>{
		let input = [
			[0,1,2,3],
			[0,1,2,3],
			[0,1,2,3],
			[0,1,2,3]
		]
		
		let expected = [
			[0,0,0,0],
			[1,1,1,1],
			[2,2,2,2],
			[3,3,3,3]
		]

		expect(transposeMatrix(input)).toStrictEqual(expected);
	});
});

describe('getEmptyTilesIndexes', () => {
	it('returns an array with the right indexes', () => {
		let input = [0,1,1,0,0,0,1,1,1,1,0,1,1,1,1,0]

		let expected = [0,3,4,5,10,15]

		expect(getEmptyTilesIndexes(input)).toStrictEqual(expected);
	});
});

describe('makeRows', () => {
	it('returns a 4 by 4 matrix', () => {
		let input = [0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3]

		let expected = [
			[0,0,0,0],
			[1,1,1,1],
			[2,2,2,2],
			[3,3,3,3]
		]

		expect(makeRows(input)).toStrictEqual(expected);
	});
});

describe('addRandomTile', () => {
	let input = Array(4).fill(Array(4).fill(0));

	it('returns an 4 by 4 matrix with one element of value 2 or 4', () => {
		let output = addRandomTile(input)
		// Matrix with all zeroes
		// Flatten and srtringify output to make test easier
		let flatOutput = [].concat(...output);
		flatOutput = flatOutput.map(e => e.toString())
		// Test if array contains any elements of value 2 or 4
		expect(flatOutput).toEqual(
			expect.arrayContaining(
				[expect.stringMatching(/[2|4]/)]))
	});
});
