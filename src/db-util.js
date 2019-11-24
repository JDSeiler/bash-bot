const sqlite3 = require('sqlite3').verbose();

class DB {
    constructor(path) {
        this.path = path;
    }

    openDatabase() {
        let db = new sqlite3.Database(this.path, (err) => {
            if (err) {
                console.log(err.message);
            } else {
                console.log(`Connected to DB at ${this.path}`)
            }
        });
        return db;
    }
    
    initTable(tableName) {
        let db = this.openDatabase();
        this.tableName = tableName;
        const initString = `CREATE TABLE IF NOT EXISTS ${this.tableName}(
            tag TEXT, 
            karma INTEGER,
            UNIQUE(tag));`;
        db.run(initString);
        db.close()
    }

    // Wont take a callback as a parameter for some reason?
    queryKarma(userTag) {
        let db = this.openDatabase();
        let queryString = `SELECT karma FROM ${this.tableName} WHERE tag = "${userTag}";`;
        const result = db.get(queryString, (err, row) => {
            if (err) {
                console.log(err);
                return;
            } else {
                if (row === undefined) {
                    console.log("No results");
                } else {
                    return row;
                }
            }
        });
        db.close();
    }

    addUser(userTag) {
        let db = this.openDatabase();
        let initString = `INSERT OR IGNORE INTO ${this.tableName} VALUES("${userTag}", 0);`
        db.run(initString);
        db.close();
    }

    increaseKarma(userTag) {
        let db = this.openDatabase();
        // Not working because async is painful
        let newKarma = this.queryKarma("Jeff") + 1;
        console.log(newKarma);
        // Cannot update the karma if you can't get the karma
        // I need a method to get the karma out of the database safely every time or the rest
        // of this project will never work.
        const updateString = `UPDATE ${this.tableName} SET karma = ${newKarma} WHERE tag = '${userTag}'`;
        const output = db.run(updateString, (result, err) => {
            if (err) {
                console.log(err);
                return
            } else {
                console.log(result)
            }
        });
        db.close();
    }
}

module.exports = DB