var express = require('express');
var tweeterdb = require('./db.js');
var moment = require('moment');
var app = express();
var path = require("path");


app.get('/', function (request, response) {
    response.sendFile(path.join(__dirname + '/home.html'));

});

app.get('/createUser', function (request, response) {
    tweeterdb.createUser(request.query.name);
    response.send('Welcome to Twitter clone, ' + request.query.name + "!");
});

app.get('/home', function (request, response) {
    var userId = 1;
    var p = tweeterdb.getTweetStreamByUser(userId);

    p.then(
        val => {
            var textOut = '';
            for (row in val) {
                textOut = textOut + val[row].tweetText + " - " + val[row].name + " - " + val[row].time + " (" + val[row].likeCount + ") <a href='/like'>Like</a><br/>";
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

    var p = tweeterdb.initDB();
    p.then(
        val => {
            tweeterdb.createUser("Joe");

            var timestamp = moment().format('YYYY-MM-DD H:mm:ss');
            tweeterdb.createTweet(1, "First tweet message", timestamp, null);

            tweeterdb.addFollow(1, 2);
        }).catch(
        err => {
            //handle all errors
            console.log(err);
        });

    tweeterdb.addFollow(1, 2);

    tweeterdb.replyToTweet(1, 'this is my reply', 3);
    tweeterdb.likeTweet(1, 3);
});
