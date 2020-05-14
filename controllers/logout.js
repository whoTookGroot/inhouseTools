module.exports.postLogout = (req,res,next)=>{
    console.log('Attempting log out', req.headers);
    req.session.destroy(err =>{
        if(err)
            console.log(err);
        else{
            console.log('Logged out');
            res.redirect('/');
        }

    });
}