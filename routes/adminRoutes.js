const express = require('express');

var router = express.Router(),
    passport = require("passport"),
    Student = require('../models/student'),
    Class = require('../models/class'),
    axios = require('axios');

//Display students
router.get("/all", (req, res) => {
    Student.find({}, (err, allStudents) => {
        if (err) {
            console.log(err);
        } else {
            // console.log(typeof(allStudents[1].attendanceID[0].day))
            res.json(allStudents);
        }
    })
});

//Adding students to Students class via a test json
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
                    .then((obj) => {
                        console.log("New student created" + obj);
                        res.json(newObj)
                    })
                    .catch(err => console.log(err));
            })

        })
        .catch(err => {
            // console.log(err);
            console.log(err);
        })
})

router.post('/create/stud' , (req,res) =>{
    
    // console.log(req.body.attendanceID);
    var newObj = {
        name : req.body.name ,
        rollNo : req.body.rollNo ,
        image : req.body.image ,
        subjectsOpted : req.body.subjectsOpted,
        attendanceID : req.body.attendanceID
    }
    // res.json(newObj);
    Student.create(newObj)
    .then(stu => {
        console.log("Student created");
        console.log(stu);
        // res.send({message  : "created a student"});
        res.json(stu);
    })
    .catch(err => {
        console.log("Error has occured");
        // res.json(err);
    })
})

//Display all classes
router.get('/class', (req, res) => {
    Class.find({}, (err, classes) => {
        if (err) {
            console.log(err);
        } else {
            res.json(classes)
        };
    })
});

//Display classes with given branch name and code
router.get('/:branch/:code', (req, res) => {
    let arr = [];
    Class.find({batchCode : req.params.code , branchName : req.params.branch})
    .populate('studentList')
    .exec(function(err , studs){
        if(err) {
            res.json(err);
        } else {
            // console.log(studs[0].studentList[0]);
            studs[0].studentList.forEach((student) => {
                arr.push({ "name" : student.name});
            })
            var obj = {...[arr]};
            res.json(obj);
        }
    })
});

//Creating empty class
router.post('/:branch/:code' , (req,res) => {
    Class.create({branchName : req.params.branch , batchCode : req.params.code})
    .then(newClass => {
        console.log("New empty class created");
        console.log(newClass);
        res.json(newClass)
    })
    .catch(err => console.log(err));
    
})

//Adding students to class individually
router.put('/class/:id', (req, res) => { 
    console.log(req.body.student[0]);
    var addStudent = req.body.student[0];
    Class.findByIdAndUpdate(req.params.id )
    .then((foundClass) => {
        // console.log(foundClass);
        foundClass.studentList.push(addStudent);
        foundClass.save();
        console.log(foundClass);
        console.log("UPDATED");
        res.json(foundClass);
    })
    .catch((err) => {
        console.log("Error has been occured -> " + err);
    })
})

//Deleting a class using it's id
router.delete('/:id' , (req,res) => {
    Class.findByIdAndRemove({_id : req.params.id} , (err,deletedClass) => {
        if(err) {
            console.log(err);
        } else {
            console.log("Succesfully deleted the class " + deletedClass);
            res.json(deletedClass);
        }
    })
})

module.exports = router;