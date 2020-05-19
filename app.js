const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const pgstore = require('connect-pg-simple')(session);
const pg = require('pg');

const app = express();

const rootDir = require('./util/path');
const errorCont = require('./controllers/error');

app.set('view engine','ejs');
app.set('views','views');

const toolsRoutes = require('./routes/tools');
const loginRoutes = require('./routes/login');
const logoutRoutes = require('./routes/logout');
const whoisRoutes = require('./routes/whois');

const pgPool = new pg.Pool({
    user: 'admin',
    host: 'localhost',
    database: 'domains',
    password: '7x*an9ad',
    port: 5432
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(rootDir,'public')));
app.use(
    session(
        {
            store: new pgstore({
                pool: pgPool,
                tableName: 'session'
            }),
            secret: process.env.INHOUSE_SECRET, 
            resave: false, 
            saveUninitialized: false
        }
    )
);/*
app.use(loginRoutes);
app.use((req,res,next) =>{
    if(req.session.loggedIn != true)
        res.redirect('/login');
    else
        next();
});*/
app.use(toolsRoutes);
app.use(whoisRoutes);
app.use(logoutRoutes);
app.use(errorCont.get404);

app.listen(3000);