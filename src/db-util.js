const bunyan = require('bunyan');
const sqlite = require('sqlite');
const path = require('path');
const logger = bunyan.createLogger({
    name: "db-utils.js",
    streams: [{
        path: path.resolve("./log/combined.log")
    },
    {
        stream: process.stdout
    }],
    src: true
})

class DB {
    constructor(inputPath) {
        this.path = path.resolve(inputPath);
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
            logger.warn(err);
        }
        
    }

    async openDatabase() {
        try {
            const db = await sqlite.open(this.path, { verbose: true });
            return db;
        } catch (err) {
            logger.warn(err);
        }
    }

    async addUser(user) {
        try {
            const db = await this.openDatabase();
            const queryString = `INSERT INTO userKarma VALUES('${user}', 1);`;
            await db.run(queryString);
            await db.close();
        } catch (err) {
            clogger.warn(err);
        }
    }

    async queryUserKarma(user) {
        try {
            const db = await this.openDatabase();
            const queryString = `SELECT karma FROM userKarma WHERE tag IS '${user}';`;
            const result = await db.get(queryString);
            await db.close();
            return result;
        } catch (err) {
            logger.warn(err);
        }
    }

    async setUserKarma(user, newKarma) {
        try {
            const db = await this.openDatabase();
            const updateString = `UPDATE userKarma SET karma = ${newKarma} WHERE tag IS '${user}';`;
            await db.run(updateString);
            await db.close();
        } catch (err) {
            logger.warn(err);
        }
    }

    async queryTopUsers(queryLimit) {
        if (typeof queryLimit === 'undefined') {
            queryLimit = 25;
        } else {
            queryLimit = queryLimit
        }
        try {
            const db = await this.openDatabase();
            const queryString = `SELECT * FROM userKarma ORDER BY karma DESC LIMIT ${queryLimit};`;
            const results = await db.all(queryString);
            return results;
        } catch (err) {
            logger.warn(err);
        }
    }
}  

module.exports = DB