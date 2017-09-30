  "use strict";
var fs = require("fs");
var moment = require("moment");
var inquirer = require("inquirer");
var chalk = require("chalk");

var params;
var search1;
var search2;
var movieName;
var i;
var timestamp = moment().format();
//prep the incoming arguments

if (process.argv[2]) {
  var arg2 = process.argv[2].toLowerCase();
}
if (process.argv[3]) {
  var arg3 = process.argv[3].toLowerCase();
}
if (process.argv[4]) {
  var arg4 = process.argv[4].toLowerCase();
}


//check to make sure there are arguments. if not, return syntax.
if (!arg2) {
  console.log("No arguments detected.  Acceptable syntax is: [spotify artist|track 'search criteria'], [twitter screen_name], [movieinfo 'moviename'], [random]");
} else {
  main(arg2, arg3, arg4);

}


function main(arg2, arg3, arg4) {
  //log this

  "use strict";
  fs.appendFile("output.txt", timestamp + "," + arg2 + "," + arg3 + "," + arg4 + '\n', function(err) {
    if (err) {
      return console.log(err);
    }
  });

  switch (arg2) {
    case "ui":
      getUI();
      break;
    case "twitter":
      //if no screen name exists, set a default'
      if (!arg3) {
        params = {
          screen_name: 'engadget',
          count: 5,
          include_rts: 0
        };
      } else {
        params = {
          screen_name: arg3,
          count: 5,
          include_rts: 0

        };
      }

      getTweets(params);

      break;


    case "spotify":

      if (!arg3) {
        console.log(
          "Invalid Syntax. Acceptable syntax is [ui][spotify artist|track 'artist or track'], [twitter screen_name], [movieinfo 'moviename'], [random]");
      }
      // If No Search Term is given, one will be provided for you"
      else if (!arg4) {
        search1 = "track";
        search2 = "Dirt on my boots";
      } else {

        search1 = arg3;
        search2 = arg4;
      }
      getSpotify(search1, search2);
      break;

    case "movieinfo":
      //making sure arguement 3 exists. if it dosnt, it will default the movie PCU
      if (!arg3) {
        console.log("No movie selected.  You are getting the information for the best movie of all time.");
        movieName = "PCU";
      } else {
        movieName = arg3;
      }
      getMovieInfo(movieName);
      break;


    case "random":
      console.log("DOING RANDOM THINGS.  WARNING. RANDOM THINGS MAY HAPPEN.");
      doRandomStuff();
      break;

    default:
      console.log("Invalid Syntax. Acceptable syntax is [ui],[spotify artist|track 'search criteria'], [twitter screen_name], [movieinfo 'moviename'], [random]");

  }
}


function getMovieInfo(movieName) {

  "use strict";
  var request = require('request');
  request("http://www.omdbapi.com/?t=" + arg3 + "&y=&plot=short&apikey=40e9cece", function(error, response, body) {
    if (!error && response.statusCode === 200) {

      var movieData = JSON.parse(body);
      console.log(
        "Rating: " + movieData.Rated + '\n',
        "IMDB Rating: " + movieData.imdbRating + '\n',
        "Year: " + movieData.Year + '\n',
        "Plot: " + movieData.Plot + '\n',
        "Actors: " + movieData.Actors + '\n',
        "DVD Date: " + movieData.DVD + '\n',
        "Box Office: " + movieData.BoxOffice + '\n',
        "Website: " + movieData.website + '\n',
        "Awards: " + movieData.Awards + '\n',
        "Directed By: " + movieData.Director + '\n',
        "Genre: " + movieData.Genre + '\n',
        "Runtime: " + movieData.Runtime + '\n',
        "Language: " + movieData.Language + '\n',
        "Country: " + movieData.Country + '\n'
      );

    }
  });
}

function getTweets(params) {
  //Keys and Info
  "use strict";
  var twitterkey = require("./keys.js");
  var Twitter = require('twitter');
  var client = new Twitter(twitterkey);

  //poll from twitter
  client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
      for (i = 0; i < tweets.length; i += 1) {
        console.log(
          "Created at: " + tweets[i].created_at + '\n',
          "Created by: " + tweets[i].user.screen_name + '\n',
          "Tweet: " + tweets[i].text
        );
      }
    }

  });

}

function getSpotify(search1, search2) {

  "use strict";
  var Spotify = require("node-spotify-api");
  var spotify = new Spotify({
    id: "544396b737244f97971b4ce32dc2c0ef",
    secret: "728dade36f2a467288a6bb8356846475"
  });
  // seting up the search object, limitted to 5 returns

  spotify.search({
    type: search1,
    query: search2,
    limit: 5
  }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

    //set the correct data type based on search

    if (search1 === "track") {
      var dataReturn = data.tracks;
      for (i = 0; i < dataReturn.items.length; i += 1) {

        console.log(
          "Item #" + i + '\n',
          "Artist: " + dataReturn.items[i].album.artists[0].name + '\n',
          "Album Name: " + dataReturn.items[i].album.name + '\n',
          "Track Name: " + dataReturn.items[i].name + '\n'
        );

      }
    } else {
      dataReturn = data.artists;

      for (i = 0; i < dataReturn.items.length; i += 1) {
        console.log(
          "Item #" + i + '\n',
          "Artist: " + dataReturn.items[i].name + '\n',
          "Popularity: " + dataReturn.items[i].popularity + '\n',
          "Genres: " + JSON.stringify(dataReturn.items[i].genres, '/[//g', null) + '\n'
        );
      }

    }

  });
}

function doRandomStuff() {
  "use strict";
  fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) {
      return console.log(err);
    }
    var randomStuff = data.split("\n");
    var randomIndex = Math.floor(Math.random() * randomStuff.length);
    var randomTask = randomStuff[randomIndex].trim();
    var newArgs = randomTask.split(",");
    console.log(newArgs);
    main(newArgs[0], newArgs[1], newArgs[2]);
  });

}

function getUI() {
  "use strict";
  var appQuestions = {
    whichApp: {
      type: "list",
      message: "Which app would you like to use?",
      choices: ["spotify", "twitter", "OMDB - Online Movie Database", "Do Something Random"],
      name: "appChoice"
    },
    spotifyArtistOrTrackQuestion: {
      type: "list",
      message: "Would you like to search by artist or by track?",
      choices: ["Artist", "Track"],
      name: "spotifyArtistOrTrackChoice"
    },
    spotifyArtistQuestion: {
      type: "input",
      message: "What artist name would you like to search by?",
      name: "artistChoice"
    },
    spotifyTrackQuestion: {
      type: "input",
      message: "What track name would you like to search by?",
      name: "trackChoice"
    },
    twitterQuestion: {
      type: "input",
      message: "What twitter screen name would you like to search by?",
      name: "twitterChoice"
    },
    movieQuestion: {
      type: "input",
      message: "What movie would you like to pull information on?",
      name: "movieChoice"
    }
  };

  inquirer.prompt(appQuestions.whichApp).then(function(answer) {
    switch (answer) {
      case "spotify":
        inquirer.prompt(appQuestions.spotifyArtistOrTrackQuestion).then(function(answer) {
          switch (answer) {
            case "artist":
              inquirer.prompt(appQuestions.spotifyArtistQuestion).then(function(answer) {
                getSpotify("artist", answer);
              });
              break;
            case "track":
              inquirer.prompt(appQuestions.spotifyTrackQuestion).then(function(answer) {
                getSpotify("track", answer);
              });
          }
          break;

          case "twitter":
            inquirer.prompt(appQuestions.twitterQuestion).then(function(answer) {
              params = {
                screen_name: answer,
                count: 5,
                include_rts: 0
              };
              getTweets(params);
            });

            break;

          case "movieinfo":
            inquirer.prompt(appQuestions.movieQuestion).then(function(answer) {
              getMovieInfo(answer);
            });
            break;

          case :"random":
            doRandomStuff();

            break;
        })
    }


  })





}
