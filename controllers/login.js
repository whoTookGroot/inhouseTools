const { google } = require('googleapis');
const express = require('express');
const base64url = require('base64url');
const OAuth2Data = require('../data/google_key.json');

//set oauth parameters
const CLIENT_ID = OAuth2Data.web.client_id;
const CLIENT_SECRET = OAuth2Data.web.client_secret;
const REDIRECT_URL = OAuth2Data.web.redirect_uris;

//initialize oauth client
const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

//get requests
function getLogin(req,res,next){
    if(req.session.loggedIn)
        res.redirect('/');
    else
        res.render('login',{
            pageTitle : 'Login',
            path:'',
            flashMsg: ''
        });
}

//post requests
function postLogin(req,res,next){
    //send user to google, request appropriate account fields
    const url = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: 'openid email profile',
        hd:'gosite.com'
    });
    res.redirect(url);
}

//return from user auth
function authCallback(req,res,next) {
    const code = req.query.code
    if (code) {
        // Get an access token based on our OAuth code
        oAuth2Client.getToken(code, function (err, tokens) {
            if (err) {
                console.log('Error authenticating')
                console.log(err);
            } else {
                console.log('Google Successfully authenticated');
                //check 'hd' hosted domain field for gosite.com
                let header = tokens.id_token.split('.');
                let hd = JSON.parse(base64url.decode(header[1])).hd;
                if(hd =='gosite.com'){
                    console.log('Client authed');
                    oAuth2Client.setCredentials(tokens);
                    req.session.loggedIn = true;
                    res.redirect('/');
                }
                else{
                    console.log('Client not authed');
                    res.render('login',{
                        pageTitle : 'Login',
                        path:'',
                        flashMsg: 'Invalid Credentials'
                    });
                }
            }
        });
    }
}


module.exports ={
    getLogin: getLogin,
    postLogin: postLogin,
    authCallback: authCallback
}
