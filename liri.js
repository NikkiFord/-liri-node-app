require("dotenv").config();
const keys = require("./keys.js");
const axios = require("axios");
const moment = require("moment");
//var spotify = new Spotify(keys.spotify);

let command = process.argv[2];

switch (command) {
    case "concert-this":
        let artist = process.argv[3];
        let queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
        axios.get(queryURL).then(function (response) {
             response.data.forEach(function (item){
                 console.log(item.venue.name);
                 let address = `${item.venue.city}, ${item.venue.region}`;
                 console.log(address);
                 console.log(moment(item.datetime).format("MM/DD/YYYY"));
                 console.log();
             })
        });
     case "spotify-this-song":   
}