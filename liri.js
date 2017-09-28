var fs = require("fs");
if (process.argv[2]){
var arg2 = process.argv[2].toLowerCase();
};
if (process.argv[3]){
	var arg3 = process.argv[3].toLowerCase();
};
if (process.argv[4]){
var arg4 = process.argv[4].toLowerCase();
};
if (process.argv[5]){
var arg5= process.argv[5].toLowerCase();
};

//check to make sure there are arguments. if not, return syntax.
if (!arg2) {
    console.log("No arguments detected.  Acceptable syntax is: [spotify artist|track 'search criteria'], [twitter screen_name], [movieinfo 'moviename'], [dostuff]");
} else {

    switch (arg2) {

        case "twitter":
            //if no screen name exists, set a default'
            var params;
            if (!arg3) {
                params = {
                    screen_name: 'engadget',
                    count: 3,
                    include_rts: 1
                };
            } else {
                params = {
                    screen_name: arg3,
                    count: 3,
                    include_rts: 1

                }
            }

            getTweets(params);

            break;


        case "spotify":
            var search1;
            var search2;
            console.log(arg3);
            // if (arg3 !== "artist" && arg3 !== "track") {
            //     console.log("Syntax Error: use proper syntax [spotify artist|track 'search criteria']. For example: spotify track 'Born to Run'");
            //     return
            // }
            //making sure argument 3 exists else it will assign a default
            if (!arg4) {
                search1 = "track";
                search2 = "Dirt on my boots";
            } else {
                search1 = arg4;
                search2 = arg5;
            }
            console.log("got here");
            getSpotify(search1, search2)
            break;

        case "movieinfo":
            var movieName;
            //making sure arguement 3 exists. if it dosnt, it will default the movie PCU
            if (!arg3) {
                console.log("No movie selected.  You are getting the information for the best movie of all time.");
                movieName = "PCU"
            } else {
                movieName = arg3;
            }
            getMovieInfo(movieName);
            break;


        case "dorandomstuff":
        console.log("foo");
            //doRandomStuff();
            break;

        default:
        console.log("foo2");
           // doRandomStuff();
    }
}


function getMovieInfo(movieName) {

    var request = require('request');
    request("http://www.omdbapi.com/?t=" + arg3 + "&y=&plot=short&apikey=40e9cece", function(error, response, body) {
        if (!error && response.statusCode === 200) {
           
            var movieData = JSON.parse(body);
           // console.log(movieData);
            console.log(
            	"Rating: " + movieData.Rated+'\n',
                "IMDB Rating: " + movieData.imdbRating+'\n',
                "Year: " + movieData.Year+'\n',
                "Plot: " + movieData.Plot+'\n',
                "Actors: "+ movieData.Actors+'\n',
                "DVD Date: "+ movieData.DVD+'\n',
                "Box Office: " + movieData.BoxOffice+'\n',
                "Website: " + movieData.website+'\n',
                "Awards: " + movieData.Awards+'\n'
            );

        }
    });
}

function getTweets(params) {
	var twitterkey = require("./keys.js");
    var Twitter = require('twitter');
    var client = new Twitter(twitterkey);

    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            console.log(tweets);
        }
    });

}

function getSpotify(search1, search2) {
	console.log(search1+"   "+search2);
    var Spotify = require("node-spotify-api");
    var spotify = new Spotify({
        id: "544396b737244f97971b4ce32dc2c0ef",
        secret: "728dade36f2a467288a6bb8356846475"
    });

    spotify.search({
        type: search1,
        query: search2
    }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(data);
    });
};

