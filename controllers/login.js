

function getLogin(req,res,next){
    if(req.session.loggedIn)
        res.redirect('/');
    else
        res.render('login',{
            pageTitle : 'Login',
            path:''
        });
}
function postLogin(req,res,next){
    req.session.loggedIn = true;
    res.redirect('/');
}
module.exports ={
    getLogin: getLogin,
    postLogin: postLogin
}
