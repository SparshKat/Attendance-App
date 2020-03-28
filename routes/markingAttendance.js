const express = require('express');

var     router          = express.Router(),
        passport        = require("passport") , 
        axios         = require('axios');

router.get("/admin/addStudents" , (req,res) => {
    res.json({
        "message" : "add students more"
    })
    // Movie.find({} , (err, allMovies)=>{
    //     if(err){
    //         req.flash("error" , err.message);
    //     } else {
    //         res.render("movies/index" , {movies : allMovies });
    //     }
    // });
});
      
module.exports = router;