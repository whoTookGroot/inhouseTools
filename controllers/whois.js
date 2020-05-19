const express = require('express');
const promise = require('promise');
const {exec} = require('child_process');
const {DomainDB} = require('../models/domains');

var getWhois = (req,res,next) =>{
    res.render('whois',{
        pageTitle : 'Whois',
        path: '/whois',
        flashMsg: 2
    });
}

var postWhois = (req,res,next)=>{
    let name = req.body.domainName;

    if(name){
        const domaindb = new DomainDB();
        domaindb.checkDB(name).then(resp =>{
            if(resp !==''){
                console.log('\'', name,'\'','is an existing domain, availability: ', resp);
                renderFlash(res,resp);
            }
            else{
                whois(name).then(resp =>{
                    domaindb.insertDB(name,resp);
                    renderFlash(res,resp);
                }).catch(e => {
                    console.log(e);
                });
            }
        }).catch(e =>{
            console.log(e);
        });
    }
    else
        renderFlash(res,2);
}

var renderFlash = (res,status) => {
    res.render('whois',{
        pageTitle: 'Whois',
        path: '/whois',
        flashMsg: status
    });
}

//promise function
var whois = name =>{
    return new promise((resolve,reject)=>{
        let resCode = '0';
        //estimate length return value for unknown whois parameter
        const command = 'whois ' + name + ' | grep \"No match for domain\"';

        //execute linux command
        exec(command,(err,stdout,stderr)=>{
            if(err && stderr){
                console.log(err);
                console.log('Stdr',stderr);
                reject(err);
            }
            else{
                console.log(stdout);
                console.log('Result Length:',stdout.length);
                if(stdout.length > 0)
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
