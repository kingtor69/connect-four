# Connect Four
## Springboard Project Unit 11


### Ready for some future development:
- full mobile compatibility has not been tested
- localStorage is ready, just needs some debugging in restoring the saved game (which is why the function call for that is commented out)
- variables are being used in several places that could be user-selectable via a to-be-written settings page (the code as written can support up to 6 players in a game of any size with any number of connections--I am planning on setting some limits on the number of connections required to win and on the board size, but there's nothing in the code that sets any limit, other than more than 6 players will cause errors)
- it would be nice for the program to draw line over the winning connection, or to mute the colors of everything else and leave those at full color. needs some logic to keep track of the winning spaces when checking for wins
