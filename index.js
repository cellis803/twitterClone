var express = require('express');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('test.db');
var tweeterdb = require('./db.js');
var moment = require('moment');
var app = express();
var path = require("path");


app.get('/', function (request, response) {
    response.sendFile(path.join(__dirname + '/home.html'));

});

app.get('/createUser', function (request, response) {
    tweeterdb.createUser(db, request.query.name);
    response.send('Welcome to Twitter clone, ' + request.query.name + "!");
});

app.get('/home', function (request, response) {
    var userId = 4;
    var p = tweeterdb.getTweetStreamByUser(userId, db);

    p.then(
        val => {
            var textOut = '';
            for (row in val) {
                textOut = textOut + val[row].tweetText;
            }
            response.send(textOut);
        }).catch(
        err => {
            //handle all errors
            console.log(err);
        });
});

app.listen(8080, function () {
    console.log('Example app listening on port 8080...');

    tweeterdb.initDB(db);
    tweeterdb.createUser(db, "Joe");

    var timestamp = moment().format('YYYY-MM-DD H:mm:ss');
    tweeterdb.createTweet(db, 1, "First tweet message", timestamp, null);

});
