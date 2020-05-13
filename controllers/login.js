

function getLogin(req,res,next){
    res.render('login',{pageTitle : 'Login'});
}
function postLogin(req,res,next){
    res.redirect('/');
}
module.exports ={
    getLogin: getLogin,
    postLogin: postLogin
}
