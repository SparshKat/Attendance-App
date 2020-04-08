const express = require('express');

var router = express.Router(),
    request = require('request'),
    passport = require("passport"),
    axios = require('axios'),
    Class = require('../models/class'),
    Student = require('../models/student');

//Input of all the students present and mark students present based on if they are 
//a part of the specified class
router.put('/mark', (req, res) => {
    request(`http://localhost:3000/student_retrieved.json`, (error, response, body) => {
        if (error) {
            console.log("Error has occured in request");
            console.log(error);
            // return res.json(error);
        } else {
            var retrieved = JSON.parse(body);
            var studentNames = [];
            console.log
            retrieved.students.forEach(stu => studentNames.push(stu.name));

            Class.find({ batchCode: retrieved.code })
                .populate('studentList')
                .exec((err, list) => {
                    if (err) {
                        console.log("Error has occured in class object");
                        console.log(err);
                        // return res.json(err);
                    }
                    list[0].studentList.forEach(stu => {
                        // console.log(stu.name)
                        if (studentNames.indexOf(stu.name) !== -1) {
                            console.log(stu._id);
                            Student.findByIdAndUpdate(stu._id)
                                .then((foundStudent) => {
                                    console.log("INSIDE I AM")
                                    var subject = retrieved.code;
                                    var attended = 1;
                                    var day = retrieved.day;
                                    var week = retrieved.week;
                                    // var month = retrieve
                                    var newObj = {
                                        subject,
                                        attended,
                                        day,
                                        week
                                    }
                                    
                                    foundStudent.attendanceID.push(newObj);
                                    console.log(newObj);
                                    console.log(foundStudent);
                                    foundStudent.save();
                                })
                        } else console.log("ERROR");
                    })
                });

        }
    })

})

module.exports = router;