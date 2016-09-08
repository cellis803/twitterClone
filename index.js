var express = require('express');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('test.db');
var tweeterdb = require('./db.js');
var moment = require('moment');
var app = express();


app.get('/', function(request, response) {
    response.send('Hello World!');
});

app.get('/foo*', function(request,response) {
    response.send('foo!!');
});

app.get('/foo', function(request,response) {
    response.send('foo2!!');
});

app.listen(8080, function() {
    console.log('Example app listening on port 8080...');
    tweeterdb.initDB(db);
    tweeterdb.createUser(db, "Joe");

    var timestamp = moment().format('YYYY-MM-DD H:mm:ss');
    tweeterdb.createTweet(db, 1, "First tweet message", timestamp, null);
});
