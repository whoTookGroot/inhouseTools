const path = require('path');
const express = require('express');
const whoisCont = require('../controllers/whois');

const router = express.Router();
const rootDir = require('../util/path');

router.get('/whois', whoisCont.getWhois);

router.post('/whois', whoisCont.postWhois);
module.exports = router;