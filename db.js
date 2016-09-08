function initDB(db) {
    db.serialize(function() {
        db.run("CREATE TABLE user (name TEXT)");
        db.run("CREATE TABLE tweet (userId INTEGER, tweetText TEXT, time DATETIME, parentTweetId INTEGER)");
        db.run("CREATE TABLE userFollows (followsUserId INTEGER)");
        db.run("CREATE TABLE tweetReplies (tweetId INTEGER, replyText TEXT, replyUserId INTEGER)");
        db.run("CREATE TABLE tweetLikes (likeUserId INTEGER)");


    });
}

exports.initDB = initDB;