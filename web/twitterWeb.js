var userName = null;

$(document).ready(function() {

    $("#login").hide();
    $("#twitterHome").hide();

    $("#loginButton").click(function() {
        userName = $("#login").text();

        $("#login").hide();
        $("#twitterHome").show();
    });

    if (userName === null) {
        $("#login").show();
        $("#twitterHome").hide();
    } else {
        $("#login").hide();
        $("#twitterHome").show();
    }

    $.getJSON( "http://localhost:8080/userfeed/1", function( data ) {
        var items = [];
        $.each( data, function( key, valObj ) {
            addTweetRow(valObj.tweetText, valObj.name, valObj.time);
        });
    });

});

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