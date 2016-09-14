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
   checkUser(userName).done(function(loggedInUser) {
                       var userId = loggedInUser.rowid;
        $.getJSON("http://localhost:8080/userfeed/" + userId, function( data ) {
            var items = [];
            $.each( data, function( key, valObj ) {
                addTweetRow(valObj.tweetText, valObj.name, valObj.time);
            });
        });
        $("#twitterHome").show();
        $("#userError").hide(); 
   });

}

function checkUser(userName) {
    var userObj = {
        "name": userName
    };

    return $.post("http://localhost:8080/login/", userObj, function(data) {
        console.log("returned data: " + data);
    }).done(function(data) {
        console.log("In done: " + data);
    }).fail(function() {
        $("#twitterHome").hide();   
        $("#userError").show();
        $("#login").show();   
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