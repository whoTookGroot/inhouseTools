const path = require('path');
const express = require('express');

const router = express.Router();
const toolsCont = require('../controllers/tools');

router.get('/', toolsCont.getTools);

module.exports = router;