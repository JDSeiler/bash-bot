const sqlite3 = require('sqlite3').verbose();
const path = require('path');

class DB {
    constructor(inputPath) {
        this.path = path.resolve(inputPath);
        console.log(this.path);
        this.tableName = "userKarma"
        this.initTable();
    }
    
    initTable() {
        let db = this.openDatabase();
        const initString = `CREATE TABLE IF NOT EXISTS ${this.tableName}(
            tag TEXT, 
            karma INTEGER,
            UNIQUE(tag));`;
        db.run(initString);
        db.close();
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

    addUser(user, callback) {
        let db = this.openDatabase();
        let queryString = `INSERT INTO userKarma VALUES('${user}', 1);`;
        db.run(queryString, callback);
        db.close();
    }

    queryUserKarma(user, callback) {
        let db = this.openDatabase();
        let queryString = `SELECT karma FROM userKarma WHERE tag IS '${user}';`;
        db.get(queryString, callback);
        db.close();
    }

    setUserKarma(user, newKarma, callback) {
        let db = this.openDatabase();
        let updateString = `UPDATE userKarma SET karma = ${newKarma} WHERE tag IS '${user}';`;
        db.run(updateString, callback);
        db.close();
    }


}  

module.exports = DB