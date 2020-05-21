//import modules
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const pgstore = require('connect-pg-simple')(session);
const pg = require('pg');

//initialize app
const app = express();

//root path
const rootDir = require('./util/path');
//404 controller
const errorCont = require('./controllers/error');

//set template engine & directory
app.set('view engine','ejs');
app.set('views','views');

//import routes
const toolsRoutes = require('./routes/tools');
const loginRoutes = require('./routes/login');
const logoutRoutes = require('./routes/logout');
const whoisRoutes = require('./routes/whois');
const wehostRoutes = require('./routes/wehost');

//initialize session client
const pgPool = new pg.Pool({
    user: 'admin',
    host: 'localhost',
    database: 'domains',
    password: '7x*an9ad',
    port: 5432
});

//request body parser
app.use(bodyParser.urlencoded({extended: false}));
//set server's public directory
app.use(express.static(path.join(rootDir,'public')));
//initialize session handler
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
);
//routes
app.use(loginRoutes);
app.use((req,res,next) =>{
    if(req.session.loggedIn != true)
        res.redirect('/login');
    else
        next();
});
app.use(toolsRoutes);
app.use(whoisRoutes);
app.use(wehostRoutes);
app.use(logoutRoutes);
app.use(errorCont.get404);

app.listen(3000);