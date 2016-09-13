var userName = null;
var errorPage = $("#userError");

$(document).ready(function() {

    $("#login").show();
    $("#twitterHome").hide();
    $("#userError").hide();

    $("#loginButton").click(function() {
        userName = $("#nameinput").val();

        if (userName === null) {
            $("#login").show();
            $("#twitterHome").hide();
            $("#userError").hide();
        }
        else {
            $("#login").hide();
            displayTweet(userName);
        }
    });    
});

function displayTweet(userName){
    checkUser(userName).then(
        (data) => {
            $.getJSON( "http://localhost:8080/userfeed/1", function( data ) {
                var items = [];
                $.each( data, function( key, valObj ) {
                    addTweetRow(valObj.tweetText, valObj.name, valObj.time);
                });
            });
            $("#twitterHome").show();
            $("#userError").hide();
        }).catch(err => {    
            console.log(err);        
            $("#twitterHome").hide();   
            $("#userError").show();
            $("#login").show();        
        });    
}

function checkUser(userName) {
    var userObj = {
        "name": userName
    };
    return new Promise(
        (resolve, reject) => {
            $.post( "http://localhost:8080/login/", userObj, function( data ) {
                console.log("returned data: " + data);
                    resolve(data);
            }).fail(function() {
                reject(this);
            });
        });
}    


function addTweetRow(tweetText, tweetAuthor, tweetDate) {
        var strVar="";
        strVar += "                <div class=\"yui3-g\">";
        strVar += "                        <div class=\"yui3-u\">";
        strVar += "                            <div class=\"yui3-g\">";
        strVar += "                                <div class=\"yui3-u-1\">";
        strVar += tweetText;
        strVar += "                                <\/div>";
        strVar += "                                <div class=\"yui3-u-1-2\">" + tweetAuthor + "<\/div>";
        strVar += "                                <div class=\"yui3-u-1-2\">" + tweetDate + "<\/div>";
        strVar += "                            <\/div>";
        strVar += "                        <\/div>     ";
        strVar += "                <\/div>  ";

       $("#tweetFeed").append(strVar);
}