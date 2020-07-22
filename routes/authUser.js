const router = require('express').Router();
// var models = 
var middleware = require('../middlewares/logged')
var Student = require('../models/student');
// var Order = models.orders;

module.exports = function(passport) {

    router.get('/home' , (req,res) =>{
        res.send("We are home");
    })
    router.get('/error', middleware.isLoggedIn, (req, res) => {
        res.json("ERROR");
        // res.json(req.session);
    });

    router.get('/logout', middleware.isLoggedIn , (req,res)=>{
        req.session.destroy();
        res.json("LOGGED OUT");
    })

   
    router.get('/here', middleware.isLoggedIn, (req, res) => {
        Order.findAll()
        .then(obj => {
            res.json([obj[0]]);
        })
        .catch(err => {
            console.log("error in orders");
            res.json(Error(404));
        })
       
    })
    
    router.post('/', passport.authenticate('local' , {
        // successRedirect : '/ohmy/here',
        failureRedirect : '/ohmy/error'
    }),(req,res) => {
        Order.findAll()
        .then(obj => {
            res.json([obj[0]]);
        })
        .catch(err => {
            console.log("error in orders");
            res.json(Error(404));
        })} 
    )
    return router;
}
