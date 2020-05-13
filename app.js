const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const rootDir = require('./util/path');

app.set('view engine','ejs');
app.set('views','views');

const toolsRoutes = require('./routes/tools');
const loginRoutes = require('./routes/login');
const whoisRoutes = require('./routes/whois-route');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(rootDir,'public')));

app.use(toolsRoutes);
app.use(whoisRoutes);
app.use(loginRoutes);

app.use((req,res,next)=>{
    res.status(404).render('404',{pageTitle : 'Page Not Found'});
});

app.listen(3000);