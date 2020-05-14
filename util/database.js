const { Client } = require('pg');

const client = new Client({
    user: 'admin',
    host: 'localhost',
    database: 'domains',
    password: '7x*an9ad',
    port: 5432,
  });

client.connect(err =>{
    if(err){
        console.log('Failed to connect to psql db on port',client['port'],'error:',err['routine']);
    }
    else
        console.log(Date.now(),'Connected to psql db on port',client['port']);
});

getDB = () =>{
    if(client)
        return client;
}
module.exports = {
    getDB: getDB
}