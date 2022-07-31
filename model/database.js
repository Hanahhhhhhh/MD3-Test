const mysql = require('mysql');
class database{
    constructor() {
    }
    static connect(){
        return mysql.createConnection({
            'host' : 'localhost',
            'user' : 'root',
            'password' : '12345678',
            'database' : 'city',
            'charset' : 'utf8_general_ci'
        })
    }
}
module.exports = database;