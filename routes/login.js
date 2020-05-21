const express = require('express');

const router = express.Router();

const loginCont = require('../controllers/login');

router.get('/login', loginCont.getLogin);
router.post('/login', loginCont.postLogin);
router.get('/auth/google/callback', loginCont.authCallback);


module.exports = router;