function initDB(db) {
    db.serialize(function () {
        db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='user'", function (error, row) {
            if (row !== undefined) {
                console.log("table exists. cleaning existing records");
                // db.run("DELETE FROM lorem", function (error) {
                //     if (error)
                //         console.log(error);
                // });
            }
            else {
                console.log("creating tables");

                db.run("CREATE TABLE user (name TEXT)");
                db.run("CREATE TABLE tweet (userId INTEGER, tweetText TEXT, time DATETIME, parentTweetId INTEGER)");
                db.run("CREATE TABLE userFollows (followsUserId INTEGER)");
                db.run("CREATE TABLE tweetReplies (tweetId INTEGER, replyText TEXT, replyUserId INTEGER)");
                db.run("CREATE TABLE tweetLikes (likeUserId INTEGER)");

                console.log("tables have been created");
            }
        });

        // var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
        // for (var i = 0; i < 10; i++) {
        //     stmt.run("Ipsum " + i, function (error) {
        //         if (error)
        //             console.log(error);
        //     });
        // }
        // stmt.finalize();

        // db.each("SELECT rowid AS id, info FROM lorem", function (err, row) {
        //     console.log(row.id + ": " + row.info);
        // });

        //db.close();
    });
}

function createUser() {}

function createTweet() {}

function addFollow() {}

function getTweetStreamByUser() {}

exports.initDB = initDB;