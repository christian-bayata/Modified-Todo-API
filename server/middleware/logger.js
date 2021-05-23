const {express} = require("express");

var app = express();
//Create a logger file via middleware callback
var logger = app.use((req, res, next) => {
    var timeStamp = new Date().toString();

    console.log( `${timeStamp}: ${req.method}, ${req.url}`)
    fs.appendFile("server.log", timeStamp + "\n" , (err) => {
        if(err) {
            console.log('Unable to load log file');
        }
    })
    next();
});

module.exports = logger;