const sqlite3 = require('sqlite3');

class DB {
    init(path) {
        this.db = new sqlite3.Database(path, (err) => {
            if (err) {
                console.log(err.message)
            } else {
                console.log(`Connected to DB at ${path}`)
            }
        });
        this.db.close();
    }

    close() {
        this.db.close((err) => {
            if (err) {
                console.log(err.message)
            } else {
                console.log("Database closed")
            }
        });
    }
}

module.exports = DB