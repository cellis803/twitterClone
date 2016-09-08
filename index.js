var express = require('express');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('test.db');
var initDB = require('./db').initDB;
var createUser = require('./db').createUser;
var getTweetStreamByUser = require('./db').getTweetStreamByUser;
var app = express();
var path = require("path");

app.get('/', function (request, response) {
    response.sendFile(path.join(__dirname + '/home.html'));
});

app.get('/createUser', function (request, response) {
    createUser(db, request.query.name);
    response.send('Welcome to Twitter clone, ' + request.query.name + "!");
});

app.get('/home', function (request, response) {
    var userId = 4;
    var p = getTweetStreamByUser(userId, db);

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
    initDB(db);

});
