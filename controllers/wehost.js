const promise = require('promise');
const dns = require('dns');

//flash msg variables
const NO = 0;
const YES = 1;
const NONE = 2;

//gosite hosts
const ip_list = ['54.153.2.220', '13.56.2.45', '13.57.130.120', '13.52.47.4',
'52.9.119.113', '64.91.231.208', '64.91.228.32', '64.92.228.36', '64.92.230.106','52.8.100.176',
'54.153.2.220','50.18.239.72','13.56.2.45','13.57.130.120','13.52.47.4','52.9.119.113']


//get requests
var getWehost = (req,res,next) =>{
    renderFlash(res,NONE);
}


//post requests
var postWehost = (req,res,next)=>{
    let name = req.body.domainName;

    if(name){
        lookup(name)
        .then(resp => {
            console.log(resp);
            if (ip_list.indexOf(resp) >= 0) {
                renderFlash(res,YES);
            }
            else {
                renderFlash(res,NO);
            }
        })
        .catch(err => {
            console.log(err)
            renderFlash(res,NO);
        });
    }
    else
        renderFlash(res,NONE); 
}


//render html template
var renderFlash = (res,status) => {
    res.render('wehost',{
        pageTitle: 'Wehost',
        path: '/wehost',
        flashMsg: status
    });
}

//resolve dns
function lookup(domain) {
    return new promise((resolve, reject) => {
        dns.lookup(domain, (err, address, family) => {
            if (err) {
                reject(err)
            } else {
                resolve(address)
            }
        })
    })
}


module.exports = {
    getWehost: getWehost,
    postWehost: postWehost
}
