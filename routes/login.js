const path = require('path');
const { google } = require('googleapis');
const express = require('express');
const base64url = require('base64url');
const OAuth2Data = require('../google_key.json');

const router = express.Router();
const rootDir = require('../util/path');

router.get('/login', (req, res, next)=>{
    res.sendFile(path.join(rootDir,'views','login.html'));
});

router.post('/login', (req, res, next)=>{
    res.redirect('/');
});

module.exports = router;