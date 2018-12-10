
require("dotenv").config();
var keys = require('./keys.js').spotify;
// Variables for the required packages.
var Spotify = require('node-spotify-api');
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
//this stores the key to a variable.
var spotify = new Spotify(keys.spotify);
// variables for the arguments
var liriCommand = process.argv[2];
var userSearch = process.argv.slice(3).join(" ");
//console.log("userSearch: " + userSearch);

//using switch statement for the commands
function runLiri(liriCommand, userSearch){
  switch(liriCommand){
    case "spotify-this-song":
    getSpotify(userSearch);
    break;

    case "concert-this":
    getBandsInTown(userSearch);
    break;

    case "movie-this":
    getOMDB(userSearch);
    break;

    case "do-what-it-says":
    getRandom();
    break;
    default:
      console.log("Enter the commands: 'concert-this', 'spotify-this-song', 'movie-this', 'do-what-it-says'")
  }
};

// searching Spotify API
function getSpotify(songName){
  var spotify = new Spotify(keys.spotify);
  if(songName){
    songName = "Girl on Fire";
  };
  spotify.search({type: 'track', query: songName}, function (err, data){
    if(err) {
      return console.log('Error occured: ' + err);
    }
    console.log("=======================");
    //return Artist
    console.log("Artist Name: " + data.tracks.items[0].album.artist[0].name + "\r\n");
    console.log("song Name: " + data.tracks.items[0].name + "\r\n");
    console.log("song preview: " + data.tracks.items[0].href + "\r\n");
    console.log("Album: " + data.tracks.items[0].album.name + "\r\n");
//appending text into log.txt file
var attachSong = "=====log Entry=====" + "\nArtist: " + data.tracks.items[0].album.artist[0].name
fs.appendFile("log.txt", attachSong, function (err){
  if (err) throw err;
});
  });
};
//function to search Bands In Town API
function getBandsInTown(artist) {
  var artist = userSearch;
  var bandQueryURL = " https://app.swaggerhub.com/apis/Bandsintown/PublicAPI/3.0.0" + "8a169a51ee2266327f25b18b73b86e"
  axios.get(bandQueryURL).then(
    function (response) {
      console.log("====================");
      console.log("Name of the venue: " + response.data[0].venue.name + "\r\n");
      console.log("Venue Location: " + response.data[0].venue.city + "\r\n");
      console.log("Date of event: " +moment(response.data[0].datetime).format("MM-DD-YYYY") + "\r\n");
var concertLog = "====Concert log entry======" + "\nName of the musician: " + artist + "\nName of the venue:";
fs.appendFile("log.txt", concertLog, function (err){
  if (err) throw err;
})

})
  
};
//function to search OMDB API
function getOMDB(movie) {
  if (!movie){
    movie = "Mr. Nobody";
  }
  var movieQueryURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

  axios.request(movieQueryUrl).then(
    function (response) {

      console.log("=================");
      console.log("Title: " + response.data.Title + "\r\n");
      console.log("Year Released: " + response.data.Year + "\r\n");
      console.log("IMDB Rating: " + response.data.imbdRating + "\r\n");
      console.log("Rotten Tomatoes Rating: " + response.data.Rating[1].value + "\r\n");
      console.log("Country Where Produced: " + response.data.Country + "\r\n");
      console.log("Language: " + response.data.Language + "\r\n");
      console.log("Plot: " + response.data.Plot + "\r\n");
      console.log("Actors: " + response.data.Actors + "\r\n");
      //logResults(response)
      var movieLog = "=====Movie log entry=====" + "\nMovie title: " + response.data.Title + "\nYear released: "+ response.data.Year;
            fs.appendFile("log.txt", movieLog,function (err){
        if (err) throw err;
      });
    });
};

function getRandom(){
  fs.readFile("random.txt", "utf8", function (error,data){
    if (error) {
      return console.log(error);
    }else {
      console.log(data);

      var randomData = data.split(".");
      runLiri(randomData[0], randomData[i]);
    }
    //console.log("\r\n" + "testing: " + randomDate[0] + randomData[i]);
    });
  };

 function logresults(data){
   fs.appendFile("log.txt", data, function(err){
     if(err) throw err;
   });
 };

 runLiri(liriCommand,userSearch);

   
  
