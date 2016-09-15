"use strict";

var userName = "";

var TwitterClone = React.createClass({

    getInitialState: function getInitialState() {
        return { loggedInUser: "" };
    },

    logMeIn: function logMeIn(userId) {
        this.setState({ loggedInUser: userId });
    },

    render: function render() {
        if (this.state.loggedInUser !== "") {
            return React.createElement(TweetList, { user: this.state.loggedInUser });
        } else {
            return React.createElement(Login, { setLoggedIn: this.logMeIn });
        }
    }

});

var Login = React.createClass({
    getInitialState: function getInitialState() {
        return { error: false };
    },

    handleClick: function handleClick(event) {
        userName = $("#nameinput").val();
        var userObj = {
            "name": userName
        };
        var that = this;
        $.post("/login/", userObj, function (data) {}).done(function (loggedInUser) {
            that.setState({ error: false });
            that.props.setLoggedIn(loggedInUser.rowid);
        }).fail(function () {
            $("#twitterHome").hide();
            that.setState({ error: true });
        });
    },

    render: function render() {
        if (this.state.error) {
            return React.createElement(
                "div",
                null,
                "Login with your name: ",
                React.createElement("input", { type: "text", id: "nameinput", name: "name" }),
                React.createElement("input", { id: "loginButton", type: "submit", value: "Login", onClick: this.handleClick }),
                React.createElement(
                    "h1",
                    { style: { color: 777 } },
                    "Login Failed. Please enter user name again."
                )
            );
        } else {
            return React.createElement(
                "div",
                null,
                "Login with your name: ",
                React.createElement("input", { type: "text", id: "nameinput", name: "name" }),
                React.createElement("input", { id: "loginButton", type: "submit", value: "Login", onClick: this.handleClick })
            );
        }
    }
});

var TweetList = React.createClass({
    getInitialState: function getInitialState() {
        return {};
    },

    render: function render() {

        // $.getJSON("/userfeed/" + this.props.loggedInUser, function( data ) {
        //    $.each( data, function( key, valObj ) {
        //    <Tweet />
        //    })
        // });                                  


        return React.createElement(
            "div",
            { id: "twitterHome" },
            React.createElement(
                "h1",
                null,
                "Welcome to Twitter Clone!"
            ),
            React.createElement(
                "div",
                { className: "yui3-g" },
                React.createElement(
                    "div",
                    { className: "yui3-u-1" },
                    "welcome"
                ),
                React.createElement(
                    "div",
                    { className: "yui3-u-2-3" },
                    React.createElement(
                        "div",
                        { id: "tweetFeed" },
                        React.createElement(Tweet, null),
                        React.createElement(Tweet, null),
                        React.createElement(Tweet, null)
                    )
                )
            )
        );
    }
});

var Tweet = React.createClass({
    getInitialState: function getInitialState() {
        return {};
    },

    render: function render() {
        return React.createElement(
            "div",
            { className: "yui3-g" },
            React.createElement(
                "div",
                { className: "yui3-u" },
                React.createElement(
                    "div",
                    { className: "yui3-g" },
                    React.createElement(
                        "div",
                        { className: "yui3-u-1" },
                        "tweetText"
                    ),
                    React.createElement(
                        "div",
                        { className: "yui3-u-1-2" },
                        "tweetAuthor"
                    ),
                    React.createElement(
                        "div",
                        { className: "yui3-u-1-2" },
                        "tweetDate"
                    )
                )
            )
        );
    }
});

ReactDOM.render(React.createElement(TwitterClone, null), document.getElementById('twitterClone'));

function displayTweet(userName) {
    $("#newTweetButton").click(function () {
        newTweetText = $("#newTweetText").val();
        if (newTweetText !== null) {
            addNewTweet(newTweetText);
        }
    });
}
