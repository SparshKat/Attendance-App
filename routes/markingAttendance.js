const express = require('express');

var router = express.Router(),
    passport = require("passport"),
    axios = require('axios');
var Student = require('../models/student')

    router.get("/", (req, res) => {
        // Movie.find({} , (err, allMovies)=>{
        //     if(err){
        //         req.flash("error" , err.message);
        //     } else {
        //         res.render("movies/index" , {movies : allMovies });
        //     }
        // });
        console.log("in")
        Student.create({ name: "Shivang" }).then((student) => {
            console.log(student);
            student.save();
            res.send({
                "message": "add students more"
            })
        }).catch((err) => {
            console.log(err);
        })
    });

module.exports = router;