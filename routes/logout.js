const express = require('express');

const router = express.Router();

const logoutCont = require('../controllers/logout');

router.post('/logout', logoutCont.postLogout);

module.exports = router;