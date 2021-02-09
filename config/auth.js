module.exports = {
    isAuthenticated :  (req, res, next)=>{
        if(req.isAuthenticated()){
            return next();
        }else{
           alert("isAuthenticated else :)")
        }
    },
    isNotAuthenticated :  (req, res, next)=>{
        if(req.isAuthenticated()){
            return res.redirect('/');
        }else{
            next();
        }
    }
}