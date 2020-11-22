2048

A React App made by Peter Ahlstrom in November 2020.



SUMMARY

This app is a React implementation of the game 2048.
It consists of a Board with multiple Tiles. The Board's state holds the values of all Tiles in a 2D-array and the Tiles a rendered accordingly. The player make moves using the arrow keys. After every move a new Tile is placed in a random free spot with a value of 2 or 4.



INSTALL

Prerequisites
Node >= 10
npm >= 5.2

In the root directory run:
npm install

RUN

In the root directory run:
npm start

This will start the app in development mode.

In your web browser got to http://localhost:3000




THE GAME


Moving

When the player makes a move to the right (only left and right is yet implemented) the app iterates over every row in the Board and sorts them with array.sort() and a custom callback function. The callback function allows all Tiles with a value greater than zero to keep their internal order and move them to the far end, while the zero values travel the other direction. 
Left move is done in the same way, but an array.reverse() is done before and after the sort.
When moving up and done (not yet fully implemented) at first an array of the column to be sorted is made from the Board array. It can then be used with the same approach as above.
The new state is set to Board and triggers a re-render.



Placing random tile

The random Tile placed after every move is done by pulling out the indexes of all Tiles with the value 0, choosing a random index and use it to change the corresponding Tile in the Boards state.

This feature has a bug causing the newly placed Tile to disappear when player makes the next move. Press the same direction multiple times to see the bug in action.




GOOD TO KNOW

Because the app is not fully functional it will start with a Board state that allows it to show how moving left and right works.

The test-file is named fake_tests.js because they are not real and should not be run. It cause no harm doing so, that's why i have kept the .js extension for better readability. More info is found in the file.

