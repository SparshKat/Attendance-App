var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    methodOverride = require("method-override"),
    MongoClient = require('mongodb').MongoClient,
    port = process.env.PORT || 8080,
    router = express.Router(),
    app = express();

//Routes
var addingStudentRoutes = require('./routes/adminRoutes'),
    studentRoutes = require('./routes/studentRoutes'),
    markingAttendanceRoutes = require('./routes/markingAttendance');

// make client connect to mongo service
mongoose.connect('mongodb://localhost:27017/AttendanceApp', {
    useNewUrlParser: true
});
//on connected
mongoose.connection.on('connected', () => console.log('connected to database :)'));
//on error
mongoose.connection.on('error', (err) => {
    if (err) {
        console.log('error is ' + err + config.SECRETS.database.url);
    }
});
// mongoose.connect("mongodb://localhost:27017/attendance", { useUnifiedTopology: true });
// MongoClient.connect({ useNewUrlParser: true });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.json({ message: 'hooray! welcome to our api!' });
});

app.use(function (req, res, next) {
    console.log("Middleware has been established")
    next();
})

//routes
// router.route('/admin/addStudents').get((req,res) => {addingStudentRoutes});
app.use('/admin/addStudents', addingStudentRoutes);
app.use('/attendance/', markingAttendanceRoutes);
app.use('/student/' , studentRoutes);

app.listen(port, () => {
    console.log("Server runs at 8080");
})