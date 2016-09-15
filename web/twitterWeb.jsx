    var userName = "";
    
    var TwitterClone = React.createClass({

        getInitialState: function() {
            return {loggedInUser: ""};
        },

        logMeIn: function(userId) {
            this.setState({loggedInUser : userId});
        },

        render: function() {
            if (this.state.loggedInUser !== "") {
                return (<TweetList user={this.state.loggedInUser} />);
            } else {
                return (<Login setLoggedIn={this.logMeIn} />);
            }
        }

    });

    var Login = React.createClass({
        getInitialState: function() {
            return {error: false};
        },

        handleClick: function(event) {
            userName = $("#nameinput").val();
            var userObj = {
                "name": userName
            };
            var that = this;
            $.post("/login/", userObj, function(data) {
               
            }).done(function(loggedInUser) {
                that.setState({error: false});
                that.props.setLoggedIn(loggedInUser.rowid);

            }).fail(function() {
                $("#twitterHome").hide();   
                that.setState({error: true});
            })
                
        },

        render: function() {
            if (this.state.error) {
                return (
                    <div>
                        Login with your name: <input type="text" id="nameinput" name="name"  />
                        <input id="loginButton" type="submit" value="Login" onClick={this.handleClick} />
                        <h1 style={{color:777}}>Login Failed. Please enter user name again.</h1>
                    </div>
                    
                );
            } else {
                return (
                    <div>
                        Login with your name: <input type="text" id="nameinput" name="name"  />
                        <input id="loginButton" type="submit" value="Login" onClick={this.handleClick} />
                    </div>
                );
            }
        }
    }); 

    var TweetList = React.createClass({
        getInitialState: function() {
            return {tweetList : [] };
        },

        componentWillMount: function() {
                var that = this;
                $.getJSON("/userfeed/" + this.props.user, function( data ) {
                     that.setState({tweetList: data});
                     
                }); 
        },
        
        render: function() {
                    return (
                        <div id="twitterHome">
                            <h1>Welcome to Twitter Clone!</h1>
                            <div className="yui3-g">
                                <div className="yui3-u-1">
                                    welcome
                                </div>
                                <div className="yui3-u-2-3">
                                    <div id="tweetFeed"> 
                                        {
                                            this.state.tweetList.map(function(val, idx) {
                                                    return <Tweet key={val.time} data={val}/>;
                                            })
                                        }
                                    </div>
                                </div>
                            </div>                            
                        </div>
                    );


       
  

    }
    });

    var Tweet = React.createClass({
        getInitialState: function() {
            return {};
        },

        render: function() {
            return (
                <div className="yui3-g">
                    <div className="yui3-u">
                        <div className="yui3-g">
                            <div className="yui3-u-1">
                                {this.props.data.tweetText}
                            </div>
                            <div className="yui3-u-1-2">{this.props.data.name}</div>
                            <div className="yui3-u-1-2">{this.props.data.time}</div>
                        </div>
                    </div> 
                </div>

            );
        }
    });                       

    ReactDOM.render(
        <TwitterClone />,
        document.getElementById('twitterClone')
    );


    function displayTweet(userName){
        $("#newTweetButton").click(function() {
            newTweetText = $("#newTweetText").val();
            if (newTweetText !== null) {
                addNewTweet(newTweetText);
            }
        });
    }   
