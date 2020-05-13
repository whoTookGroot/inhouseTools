const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const rootDir = require('./util/path');
const errorCont = require('./controllers/error');

app.set('view engine','ejs');
app.set('views','views');

const toolsRoutes = require('./routes/tools');
const loginRoutes = require('./routes/login');
const whoisRoutes = require('./routes/whois');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(rootDir,'public')));

app.use(toolsRoutes);
app.use(whoisRoutes);
app.use(loginRoutes);
app.use(errorCont.get404);

app.listen(3000);