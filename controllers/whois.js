const express = require('express');
const promise = require('promise');
const {exec} = require('child_process');
const {DomainDB} = require('../models/domains');

var getWhois = (req,res,next) =>{
    res.render('whois',{
        pageTitle : 'Whois',
        path: '/whois'
    });
}

var postWhois = (req,res,next)=>{
    let name = req.body.domainName;
    
    if(name){
        const domaindb = new DomainDB();
        domaindb.checkDB(name).then(resp =>{
            if(resp !=='')
                console.log('\'', name,'\'','is an existing domain, availability: ', resp);
            else{
                whois(name).then(resp =>{
                    domaindb.insertDB(name,resp);
                }).catch(e => {
                    console.log(e);
                });
            }
        }).catch(e =>{
            console.log(e);
        });
    }
    res.render('whois',{
        pageTitle : 'Whois',
        path:'/whois'
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
