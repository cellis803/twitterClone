var express = require('express');
var tweeterdb = require('./db.js');
var moment = require('moment');
var app = express();
var path = require("path");
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true  
}));
app.use('/', express.static('web'));

app.get('/', function (request, response) {
    response.sendFile(path.join(__dirname + '/login.html'));

});

app.post('/login', function(request, response) {
  
    tweeterdb.loginUser(request.body.name).then(
        user => {
            response.send(user);
        }).catch(err => {
                console.log(err);
                response.status(500);
                response.send(err);                
        });
});

app.get('/userfeed/:userid', function (request, response) {
    console.log("I'm getting the tweet feed");
    var userId = request.params.userid;
    tweeterdb.getTweetStreamByUser(userId).then(
        tweets => {
            response.send(tweets);

        }).catch(
        err => {
            //handle all errors
            console.log(err);
            response.status(500);
            response.send();
        });
});

app.listen(8080, function () {
    console.log('Example app listening on port 8080...');

    var p = tweeterdb.initDB();
    p.then(
        val => {
            //tweeterdb.createUser("Chris");

            //var timestamp = moment().format('YYYY-MM-DD H:mm:ss');
            //tweeterdb.createTweet(1, "this is my new tweet message", timestamp, null);

        }).catch(
        err => {
            //handle all errors
            console.log(err);
        });

});
