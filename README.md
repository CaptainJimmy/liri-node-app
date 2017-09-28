# liri-node-app
Language Interpretive Recognition Interface - A node app that interfaces APIs from the CLI


## Syntax:
*Usage: `node liri.js <command> [arguments]`*

Commands:

*spotify:* Use the spotify API.  Requires Search-By (artist or track) and Search-Term. 
	`Example:  spotify artist "Garth Brooks"`

*twitter* Uses twitter _get statuses/user_timeline_ Get the 5 latest tweets from a screen-name.  Requires screen-name
	`Example: twitter github`

*movieinfo* Uses OMDB API to retrieve data on a movie. Requires movie-name.
	`Example: movieinfo clerks`

*random* Pulls randomly from a textfile with entries in it, and calls the above APIs

Also logs each API call to and a timestamp to a logfile, _output.txt_

## Technologies Used:
* Node.js
* JavaScript
* npm
* moment.js
* twitter api for node
* omdb api for node
* spotify api for node
* JSON
* github
