require("dotenv").config();
const keys = require("./keys.js");
const axios = require("axios");
const moment = require("moment");
const Spotify = require("node-spotify-api");
const OmdbApi = require('omdb-api-pt');
const fs = require("fs");

let commandName = process.argv[2];

const commands = {
    "concert-this":function(artist){
        let queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
        axios.get(queryURL).then(function (response) {
            response.data.forEach(function (item) {
                console.log(item.venue.name);
                let address = `${item.venue.city}, ${item.venue.region}`;
                console.log(address);
                console.log(moment(item.datetime).format("MM/DD/YYYY"));
                console.log();
            })
        }); 
    },
    "spotify-this-song":function(song){
        let spotify = new Spotify(keys.spotify);
        spotify.search({ type: 'track', query: song })
            .then(function (response) {
                response.tracks.items.forEach(function (item) {
                    item.artists.forEach(function (artist) {
                        console.log(artist.name);
                    });
                    console.log(item.name);
                    console.log(item.href);
                    console.log(item.album.name);
                    console.log();
                });
            })
            .catch(function (err) {
                console.log(err);
            });

    },
    "movie-this":function(movie){
        const omdb = new OmdbApi({
            apiKey: "trilogy",
            baseUrl: "https://omdbapi.com/"
        });
        omdb.byId({
            title: movie
        }).then(function(response){
            console.log(response.Title);
            console.log(response.Year);
            response.Ratings.forEach(function(rating){
                    switch(rating.Source){
                        case 'Internet Movie Database':
                            console.log(`IMDB: ${rating.Value}`);
                            break;

                        case 'Rotten Tomatoes':
                            console.log(`Rotten Tomatoes: ${rating.Value}`);
                            break;
                    }
                    
            })
            console.log(response.Country);
            console.log(response.Language);
            console.log(response.Plot);
            console.log(response.Actors);
        });

    },
    "do-what-it-says":function(){
        fs.readFile("random.txt", function(err, fileContents){
            if(err) return console.log(err);
            fileContents = fileContents.toString().split(",");
            commands[fileContents[0]](fileContents[1]);
        })
    }
};
        
commands[commandName](process.argv[3]);