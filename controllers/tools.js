module.exports.getTools = (req,res,next)=>{
    res.render('tools',{
        pageTitle : 'Tools',
        path: '/'
    });
}