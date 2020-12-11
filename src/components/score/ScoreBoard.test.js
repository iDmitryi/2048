import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import ScoreBoard from './ScoreBoard';


describe('ScoreBoard', () => {
	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<ScoreBoard />, div);
	});

	it('shows score and highscore', () => {
		const tree = renderer.create(<ScoreBoard score={8} highscore={256}/>).toJSON();
		expect(tree).toMatchSnapshot();
	});

});