const sqlite3 = require('sqlite3').verbose();

class DB {
    constructor(path) {
        this.path = path;
    }

    openDatabase() {
        let db = new sqlite3.Database(this.path, (err) => {
            if (err) {
                console.log(err.message)
            } else {
                console.log(`Connected to DB at ${this.path}`)
            }
        });
        return db;
    }
    
    initTable(tableName) {
        let db = this.openDatabase();
        this.tableName = tableName;
        let initString = `CREATE TABLE IF NOT EXISTS ${this.tableName}(tag text, karma integer)`
        db.run(initString);
        db.close()
    }

    queryKarma(userTag) {
        let db = this.openDatabase();
        let queryString = `SELECT karma FROM ${this.tableName} where tag = "${userTag}"`;
        const result = db.get(queryString, (err, row) => {
            if (err) {
                console.log(err);
                return;
            } else {
                if (row === undefined) {
                    console.log("No results");
                } else {
                    console.log(row)
                }
            }
        });
        db.close();
    }

    addUser(userTag) {
        let db = this.openDatabase();
        let initString = `INSERT INTO ${this.tableName} VALUES("${userTag}", 0)`
        db.run(initString);
        db.close();
    }
}

module.exports = DB