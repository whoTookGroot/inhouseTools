const express = require('express');
const whoisCont = require('../controllers/whois');

const router = express.Router();

router.get('/whois', whoisCont.getWhois);

router.post('/whois', whoisCont.postWhois);
module.exports = router;