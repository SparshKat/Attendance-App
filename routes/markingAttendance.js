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

    var retrieved = req.body;
    var ongoingClass = retrieved.classCode;
    console.log(retrieved.students);

    retrieved.students.forEach((stud, i) => {
        // console.log(stud);
        Student.find({ name: stud.name })
            .then(foundStudent => {
                if (foundStudent.length != 0) {
                    // console.log(foundStudent[0]);
                    foundStudent[0].attendanceID.forEach((el, i) => {
                        if (el.subject === ongoingClass) {
                            // console.log(el);
                            var day = retrieved.day;
                            var week = retrieved.week;
                            var attendanceObj = {
                                day,
                                week,
                                attended: 1
                            }
                            el.attendance.push(attendanceObj);
                            foundStudent[0].save();
                            console.log(foundStudent[0]);
                            // console.log("day -> " + day  + "week -> " + week);
                        } else {
                            console.log("he hasn't opted for the course yet");
                        }
                    })
                }
            })
            .catch(err => console.log("none found" + err));
    });
    res.redirect(`/admin/${retrieved.branch}/${ongoingClass}`)


})

module.exports = router;