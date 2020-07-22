const express = require('express');

var router = express.Router(),
    passport = require("passport"),
    Student = require('../models/student'),
    Class = require('../models/class'),
    axios = require('axios');

router.get('/:student_id', (req, res) => {
    Student.findById(req.params.student_id)
        .then(stu => {
            console.log("Displaying student details : ");
            res.json(stu);
        })
        .catch(err => {
            console.log("Error has occured");
            res.json(err);
        })
})

router.get('/attendance/:student_id' , (req,res) => {
    let arr= [];
    Student.findById(req.params.student_id)
        .then(stu => {
            console.log("Displaying student attendance details : ");
            stu.attendanceID.forEach((detail , ind) => {
                arr.push({
                    "subject" : detail.subject,
                    "attendanceNo" : detail.attendance.length
                })
                console.log(arr);
                console.log(detail.subject+ ": " + detail.attendance.length);
            })
            res.json(arr);
        })
        .catch(err => {
            console.log("Error has occured");
            res.json([]);
        })
    
})

module.exports = router;