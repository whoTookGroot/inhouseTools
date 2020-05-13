const express = require('express');
const {exec} = require('child_process');
const promise = require('promise');
const readline = require('readline');
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
        console.log('Connected to psql db on port',client['port']);
});

var getWhois = (req,res,next) =>{
    res.render('whois',{pageTitle : 'Whois'});
}

var postWhois = (req,res,next)=>{
    let name = req.body.domainName;
    console.log('======================================\nDomain:',name);

    if(name){
        resolveQuery(name).then(resp =>{
            console.log('Sending response code :',resp);
            res.render('whois',{pageTitle : 'Whois'});
        }).catch(e => {
            console.log(e);
        });
    }
    else
        res.render('whois',{pageTitle : 'Whois'});
}

async function resolveQuery(name){
    let status = await checkDB(name);

    if(status !=='')
        console.log('\'', name,'\'','is an existing domain, availability: ', status);
    else{
        status = await whois(name);
        client.query('insert into domains(domain,availability) values($1,$2)',[name,status]);
    }
    return status;
}


var checkDB = (name) => {
    return new promise((resolve, reject) => {
        client.query('select * from domains where domain=$1',[name], (err, res) => {
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


//promise function
var whois = name =>{
    return new promise((resolve,reject)=>{
        let resCode = '0';
        //estimate length return value for unknown whois parameter
        let minLength = 2000;
        const command = 'whois ' + name;

        //execute linux command
        exec(command,(err,stdout,stderr)=>{
            if(err){
                console.log(err);
                reject(err);
            }
            else{
                console.log('Whois Length: ',stdout.length);
                if(stdout.length < minLength)
                    resCode = '1';
                resolve(resCode);
            }
        });
    });
}

module.exports = {
    getWhois: getWhois,
    postWhois: postWhois
}
