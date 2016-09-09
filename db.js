var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('test.db');

module.exports = {
    initDB: function () {

        return new Promise(
            (resolve, reject) => {
                db.serialize(function () {
                    db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='tweet'", 
                        function (error, row) {                        
                        if (row !== undefined) {  
                            console.log("tables exist. drop existing tables");  
                            var tableNamesArr = ["tweet","tweetLikes","tweetReplies","user","userFollows"];                             
                            for(var i = 0; i < tableNamesArr.length; i++){
                                db.exec('DROP TABLE IF EXISTS ' + tableNamesArr[i]);
                            }
                            if (error) {
                                console.log(error);
                                reject(error);
                            }  
                        }
                        console.log("creating tables");

                        db.run("CREATE TABLE IF NOT EXISTS user (name TEXT NOT NULL)");
                        db.run("CREATE TABLE IF NOT EXISTS tweet (userId INTEGER NOT NULL, tweetText TEXT NOT NULL, time DATETIME NOT NULL, parentTweetId INTEGER, FOREIGN KEY(userId) REFERENCES user(rowid))");
                        db.run("CREATE TABLE IF NOT EXISTS userFollows (followsUserId INTEGER NOT NULL, followerUserId INTEGER NOT NULL, PRIMARY KEY (followsUserId, followerUserId), FOREIGN KEY(followsUserId) REFERENCES user(rowid), FOREIGN KEY(followerUserId) REFERENCES user(rowid)) WITHOUT ROWID");
                        db.run("CREATE TABLE IF NOT EXISTS tweetReplies (tweetId INTEGER NOT NULL, replyText TEXT NOT NULL, replyUserId INTEGER NOT NULL, FOREIGN KEY(tweetId) REFERENCES tweet(rowid), FOREIGN KEY(replyUserId) REFERENCES user(rowid))");
                        db.run("CREATE TABLE IF NOT EXISTS tweetLikes (tweetId INTEGER NOT NULL, likeUserId INTEGER NOT NULL, FOREIGN KEY(tweetId) REFERENCES tweet(rowid), FOREIGN KEY(likeUserId) REFERENCES user(rowid))");

                        console.log("tables have been created");
                        resolve();
                    });  
                         
                        // console.log("creating tables");

                        // db.run("CREATE TABLE IF NOT EXISTS user (name TEXT NOT NULL)");
                        // db.run("CREATE TABLE IF NOT EXISTS tweet (userId INTEGER NOT NULL, tweetText TEXT NOT NULL, time DATETIME NOT NULL, parentTweetId INTEGER, FOREIGN KEY(userId) REFERENCES user(rowid))");
                        // db.run("CREATE TABLE IF NOT EXISTS userFollows (followsUserId INTEGER NOT NULL, followerUserId INTEGER NOT NULL, PRIMARY KEY (followsUserId, followerUserId), FOREIGN KEY(followsUserId) REFERENCES user(rowid), FOREIGN KEY(followerUserId) REFERENCES user(rowid)) WITHOUT ROWID");
                        // db.run("CREATE TABLE IF NOT EXISTS tweetReplies (tweetId INTEGER NOT NULL, replyText TEXT NOT NULL, replyUserId INTEGER NOT NULL, FOREIGN KEY(tweetId) REFERENCES tweet(rowid), FOREIGN KEY(replyUserId) REFERENCES user(rowid))");
                        // db.run("CREATE TABLE IF NOT EXISTS tweetLikes (tweetId INTEGER NOT NULL, likeUserId INTEGER NOT NULL, FOREIGN KEY(tweetId) REFERENCES tweet(rowid), FOREIGN KEY(likeUserId) REFERENCES user(rowid))");

                        // console.log("tables have been created");
                                                
                    // resolve();

                });

            });
    },

    
    createUser: function (name) {
        return new Promise(
            (resolve, reject) => {
                db.serialize(function () {
                    var stmt = db.prepare("INSERT INTO user VALUES (?)");

                    stmt.run(name, function (error) {
                        if (error) {
                            console.log(error);
                            reject(error);
                        }

                    });

                    stmt.finalize();
                    resolve();
                });
            });
    },

    createTweet: function (userid, text, timestamp, parentid) {
        return new Promise(
            (resolve, reject) => {
                db.serialize(function () {
                    var stmt = db.prepare("INSERT INTO tweet VALUES (?, ?, ?, ?)");

                    stmt.run(userid, text, timestamp, parentid, function (error) {
                        if (error) {
                            console.log(error);
                            reject(error);
                        }
                    });

                    stmt.finalize();
                    resolve();
                });
            });

    },

    addFollow: function (userid, followerid) {
        return new Promise(
            (resolve, reject) => {
                db.serialize(function () {
                    var stmt = db.prepare("INSERT INTO userFollows VALUES (?, ?)");

                    stmt.run(userid, followerid, function (error) {
                        if (error) {
                            console.log(error);
                            reject(error);
                        }
                    });

                    stmt.finalize();
                    resolve();
                });
            });
    },

    getTweetStreamByUser: function (userId) {
        return new Promise(
            (resolve, reject) => {
                db.serialize(function () {
                    db.all("SELECT t.rowId as rowid, t.tweetText as tweetText, u.name as name, t.time as time " +
                        ", (select count(*) from tweetLikes tl where tl.tweetId = t.rowid) as likeCount " +
                        "FROM tweet t " +
                        "inner join user u on u.rowid = t.userId " +
                        "where t.userId = " + userId + " or t.userId in (" +
                        "select f.followsUserId from userFollows f where f.followerUserId = " + userId +
                        ")", function (err, rows) {
                            resolve(rows);
                        });
                });
            });
    },

    replyToTweet: function (tweetId, replyText, userId) {
        return new Promise(
            (resolve, reject) => {
                db.serialize(function () {
                    var stmt = db.prepare("INSERT INTO tweetReplies VALUES (?, ?, ?)");

                    stmt.run(tweetId, replyText, userId, function (error) {
                        if (error) {
                            console.log(error);
                            reject(error);
                        }
                    });

                    stmt.finalize();
                    resolve();
                });
            });

    },

    getReplies: function (tweetId) {
        return new Promise(
            (resolve, reject) => {
                db.serialize(function () {
                    db.all("SELECT r.rowId as rowid, r.replyText as tweetText, replyUserId as id " +
                        "FROM tweetReplies r " +
                        "where r.rowid = " + tweetId, function (err, rows) {
                            resolve(rows);
                        });
                });
            });
    },

    likeTweet: function (tweetId, userId) {
        return new Promise(
            (resolve, reject) => {
                db.serialize(function () {
                    var stmt = db.prepare("INSERT INTO tweetLikes VALUES (?, ?)");

                    stmt.run(tweetId, userId, function (error) {
                        if (error) {
                            console.log(error);
                            reject(error);
                        }
                    });

                    stmt.finalize();
                    resolve();
                });
            });

    }
}
// module.exports.initDB = initDB;
// module.exports.createUser = createUser;
// module.exports.createTweet = createTweet;
// module.exports.addFollow = addFollow;
// module.exports.getTweetStreamByUser = getTweetStreamByUser;
// module.exports.replyToTweet = replyToTweet;
// module.exports.likeTweet = likeTweet;