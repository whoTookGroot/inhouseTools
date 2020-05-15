module.exports.postLogout = (req,res,next)=>{
    req.session.destroy(err =>{
        if(err)
            console.log(err);
        else{
            console.log('Logged out');
            res.redirect('/');
        }

    });
}