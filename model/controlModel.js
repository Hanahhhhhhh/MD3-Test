let Database = require ('./database.js');
class controlModel{
    constructor() {
        this.connection = Database.connect();
    }
    getCity(){
        return new Promise((resolve, reject) => {
            let sql = `SELECT * FROM Cities`;
            this.connection.query(sql,(err,data)=>{
                if (err){
                    reject(err);
                }else {
                    resolve(data);
                }
            })
        })

    }
    getCityByID(id){
        return new Promise((resolve, reject) => {
            let sql = `SELECT * FROM Cities WHERE id = ${id}`;
            this.connection.query(sql,(err,data)=>{
                if (err){
                    reject(err);
                }else {
                    resolve(data);
                }
            })
        })
    }
    deleteCity(id){
        return new Promise((resolve, reject) => {
            let sql = `DELETE FROM Cities WHERE id = ${id}`;
            this.connection.query(sql,(err,data)=>{
                if (err){
                    reject(err);
                }else {
                    resolve(data);
                }
            })
        })
    }
    addCites(name,area, population, gdp,country, description ){
        return new Promise((resolve, reject) => {
            let sql = `INSERT INTO cities(name,area, population, gdp, country, description ) values ('${name}','${area}','${population}','${gdp}','${country}','${description}')`;
            this.connection.query(sql, (err, data)=>{
                if (err){
                    reject(err);
                }else {
                    resolve(data);
                }
            })
        })

    }
    editCities(id,name,area, population, gdp,country, description) {
        return new Promise((resolve, reject) => {
            let sql = `UPDATE cities SET name ='${name}',area='${area}',population='${population}',gdp='${gdp}',country='${country}',description='${description}' WHERE id =${id}`;
            this.connection.query(sql, (err, data)=>{
                if (err){
                    reject(err);
                }else {
                    resolve(data);
                }
            })
        })
    }
}
module.exports = controlModel;