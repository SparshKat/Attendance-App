const express = require('express');

var router = express.Router(),
    passport = require("passport"),
    Student = require('../models/student'),
    Class = require('../models/class'),
    axios = require('axios');

//Display students
router.get("/:branch", (req, res) => {
    Student.find({}, (err, allStudents) => {
        if (err) {
            console.log(err);
        } else {
            res.json(allStudents);
        }
    })
});

//Adding students to Students class
router.post('/:branch', (req, res) => {
    // console.log(req.params.branch);
    var branch = req.params.branch;
    axios.get(`http://localhost:3000/student_list_${branch}.json`)
        .then(data => {
            res.json(data.data);
            var arr = data.data.students;
            arr.forEach((el, err) => {
                var name = el.name;
                var rollNo = el.rollNo;
                var image = el.image;
                var attendance = el.attendance;
                var newObj = {
                    name,
                    rollNo,
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

//Display classes
router.get('/:branch/:code', (req, res) => {
    Class.find({}, (err, classes) => {
        if (err) {
            console.log(err);
        } else {
            res.json(classes)
        };
    })
});

//Adding students to class
router.post('/:branch/:code', (req, res) => {
    // console.log(req.params.branch);
    var branch = req.params.branch;
    var code = req.params.code;
    let arr= [] ;

    //Empty Class
    

    axios.get(`http://localhost:3000/student_list_${branch}.json`)
        .then(data => {
            // res.json(data.data);
            var temp = data.data.students;
            
            temp.forEach((el, err) => {
                // console.log(el);
                arr.push(el.name);
                Student.findOne({name : el.name} , (err,objects) => {
                    if(err) {
                        console.log(err);
                    } else {
                        // arr.push(objects._id);
                        // console.log(arr);
                        console.log(objects._id);
                        // var newId = objects._id;
                        // arr.push(newId);
                    }
                })
            })
        })
        .catch(err => {
            console.log(err);
        })
    
    console.log("here it is " + arr + "YEs");
    
    Class.create({ branchName: branch, batchCode: code , studentList : arr})
        .then(obj => console.log("New Class has been created" + obj))
        .catch(err => console.log(err));

})

module.exports = router;