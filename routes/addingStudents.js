const express = require('express');

var     router          = express.Router(),
        passport        = require("passport") , 
        Student         = require('../models/student'),
        axios         = require('axios');

router.get("/:branch/:section" , (req,res) => {
    Student.find({} , (err , allStudents) => {
        if(err){
            console.log(err);
        } else {
            res.json(allStudents);
        }
    })
});

router.post('/:branch/:section' , (req,res) => {
    // console.log(req.params.branch);
    var branch = req.params.branch;
    var code = req.params.section;
    axios.get(`http://localhost:3000/student_list_${branch}.json`)
    .then( data => {
        res.json(data.data);
        var arr = data.data.students;
        arr.forEach((el,err) => {
            var name = el.name;
            var rollNo = el.rollNo;
            var image = el.image;
            var attendance = el.attendance;
            var newObj = {
                name,
                rollNo ,
                image,
                attendance
            }
            console.log("New student created");
            console.log(newObj);

            Student.create(newObj)
            .then(obj => console.log("New student created" + obj))
            .catch(err => console.log(err));
        })

    })
    .catch(err => {
        // console.log(err);
        console.log(err);
    })
})
      
module.exports = router;