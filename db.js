function initDB(db) {
    db.serialize(function () {
        db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='lorem'", function (error, row) {
            if (row !== undefined) {
                console.log("table exists. cleaning existing records");
                // db.run("DELETE FROM lorem", function (error) {
                //     if (error)
                //         console.log(error);
                // });
            }
            else {
                console.log("creating table")
                db.run("CREATE TABLE lorem (info TEXT)", function (error) {
                    if (error.message.indexOf("already exists") != -1) {
                        console.log(error);
                    }
                });
            }
        });

        var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
        for (var i = 0; i < 10; i++) {
            stmt.run("Ipsum " + i, function (error) {
                if (error)
                    console.log(error);
            });
        }
        stmt.finalize();

        db.each("SELECT rowid AS id, info FROM lorem", function (err, row) {
            console.log(row.id + ": " + row.info);
        });

        //db.close();
    });
}

exports.initDB = initDB;