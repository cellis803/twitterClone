var express = require('express');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('test.db');
var initDB = require('./db').initDB;
var createUser = require('./db').createUser;
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
    initDB(db);
    createUser(db, "Chris");
    
});
