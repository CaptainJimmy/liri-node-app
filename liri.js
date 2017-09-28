var fs = require('fs');
var twitterkey = require('./keys.js');
var arg2 = process.argv[2].toLowerCase();
var arg3 = process.argv[3].toLowerCase();
var arg4 = process.argv[4].toLowerCase();

//check to make sure there are arguments. if not, return syntax.
if (!arg2) {
    console.log("No arguments detected.  Acceptable syntax is: [spotify artist|track 'search criteria'], [twitter screen_name], [movieinfo 'moviename'], [dostuff]");
} else {
    switch (arg2) {

        case "twitter":
        	//if no screen name exists, set a default'
        	var params;
        	if (!arg3) { params = {screen_name: 'engadget'}; }
        	else { params = {screen_name: arg3}};

        	getTweets(params);
        	
            break;


        case "spotify":
        	var search1;
        	var search2;
        	if (arg3 !==  "artist" || arg3 !== "track" ){
        		console.log("Syntax Error: use proper syntax [spotify artist|track 'search criteria']. For example: spotify search 'Born to Run'");
        		return;
        	}
            //making sure argument 3 exists else it will assign a default
            else if (!arg3) { 
            	search1="artist";
            	search2="Rick Springfield";
            	}
            else {
            	search1=arg3;
            	search2=arg4;
            }  
			getSpotify(search1, search2)
            break;

        case "movieinfo":
        	var movieName;
        	//making sure arguement 3 exists. if it dosnt, it will default the movie PCU
        	if (!arg3) {
        		console.log("No movie selected.  You are getting the information for the best movie of all time.");
        		movieName="PCU"
        	}
        	else { movieName=arg3;}
        	getMovieInfo(movieName);
        	break;


        case "dorandomstuff":
        		doRandomStuff();
        	break;

        	default:
        	doRandomStuff();
    }
}

function myTweets(params){
        	
        	myTweets()
        	var Twitter = require('twitter');
			var client = new Twitter(twitterkey);

			client.get('statuses/user_timeline', params, function(error, tweets, response) {
  			if (!error) {
   			 console.log(tweets);
 			 }
			});

}
function getSpotify(search1, search2){
                var Spotify = require('node-spotify-api');
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
            }

}

function getMovieInfo(movieName){


        	var request = require('request');
        	request("http://www.omdbapi.com/?t="+arg3+"&y=&plot=short&apikey=40e9cece", function(error, response, body) {
			  if (!error && response.statusCode === 200) {
	    			console.log(body);
	    			var movieData=JSON.parse(body);
			    console.log(
			    	"IMDB Rating: " + movieData.imdbRating,
			    	"Year: "+ movieData.Year,
			    	"Plot: " + movieData.plot,
			    	);

  				}
				});
}


function doRandomStuff(){

	console.log("doing random things");
	
}