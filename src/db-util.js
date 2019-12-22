const sqlite = require('sqlite');
const path = require('path');

class DB {
    constructor(inputPath) {
        this.path = path.resolve(inputPath);
        console.log(this.path);
        this.tableName = "userKarma"
        this.initTable();
    }
    
    async initTable() {
        try {
            let db = await this.openDatabase();
            const initString = `CREATE TABLE IF NOT EXISTS ${this.tableName}(
            tag TEXT, 
            karma INTEGER,
            UNIQUE(tag));`;
            await db.run(initString);
            db.close();
        } catch (err) {
            console.log(err);
        }
        
    }

    async openDatabase() {
        const db = await sqlite.open(this.path, { verbose: true });
        return db;
    }

    addUser(user, callback) {
        let db = this.openDatabase();
        let queryString = `INSERT INTO userKarma VALUES('${user}', 1);`;
        db.run(queryString, callback);
        db.close();
    }

    queryUserKarma(user) {
        let db = this.openDatabase();
        let queryString = `SELECT karma FROM userKarma WHERE tag IS '${user}';`;
        db.get(queryString);
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