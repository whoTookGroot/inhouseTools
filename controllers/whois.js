const promise = require('promise');
const {exec} = require('child_process');
const {DomainDB} = require('../models/domains');

//html flash msg code
const NONE = 2;

//get reqs
var getWhois = (req,res,next) =>{
    res.render('whois',{
        pageTitle : 'Whois',
        path: '/whois',
        flashMsg: NONE
    });
}

//post reqs
var postWhois = (req,res,next)=>{
    //get req form data
    let name = req.body.domainName;

    if(name){
        //get psql client
        const domaindb = new DomainDB();
        domaindb.checkDB(name).then(resp =>{
            //check db for existing entry
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
        renderFlash(res,NONE);
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
        //rescode 0 for a whois match, 1 for no whois match
        let resCode = '0';
        //whois command to exec
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
                //check to see if 'grep' returned a match
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
