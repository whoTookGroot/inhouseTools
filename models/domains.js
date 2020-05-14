const promise = require('promise');
const db = require('../util/database');

class DomainDB {
    constructor(){

        this.client = db.getDB();
    }

    checkDB(name){
        return new promise((resolve, reject) => {
            this.client.query('select * from domains where domain=$1',[name], (err, res) => {
                if(err){
                    console.log(err);
                    reject(err);
                }
                else{
                    if(res.rows == '')
                        resolve('');
                    else
                        resolve(res.rows[0].availability);
                }
            });
        });
    }

    insertDB(name,status){
        this.client.query('insert into domains(domain,availability) values($1,$2)',[name,status],(err)=>{
            if(err){
                console.log(err);
            }
        });
    }
}

module.exports.DomainDB = DomainDB;