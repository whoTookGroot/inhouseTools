const path = require('path');
const express = require('express');

const router = express.Router();

const loginCont = require('../controllers/login');

router.get('/login', loginCont.getLogin);

router.post('/login', loginCont.postLogin);

module.exports = router;