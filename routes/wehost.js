const express = require('express');
const wehostCont = require('../controllers/wehost');

const router = express.Router();

router.get('/wehost', wehostCont.getWehost);

router.post('/wehost', wehostCont.postWehost);
module.exports = router;