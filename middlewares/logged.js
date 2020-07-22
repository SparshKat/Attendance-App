var middleware = {};

middleware.isLoggedIn = (req,res,next) => {
    if(req.isAuthenticated()){
        console.log("Authentication succesful");
        return next();
    } else {
        res.send('NAHI JAA SKTE')
        return next(new Error(404));
    }
}

module.exports = middleware ;