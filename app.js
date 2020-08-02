var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    methodOverride = require("method-override"),
    port = process.env.PORT || 8080,
    mongoURL = 
    // 'mongodb://localhost:27017/AttendanceApp',
    'mongodb://sparsh:katiyar87396@ds031915.mlab.com:31915/attendance-app',
    passport = require('passport'),
    app = express();

require('./passport')(passport)
//Routes
var adminRoutes = require('./routes/adminRoutes'),
    studentRoutes = require('./routes/studentRoutes'),
    markingAttendanceRoutes = require('./routes/markingAttendance'),
    authUser = require('./routes/authUser')(passport);

// make client connect to mongo service
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
//on connected
mongoose.connection.on('connected', () => console.log('connected to database :)'));
//on error
mongoose.connection.on('error', (err) => {
    if (err) {
        console.log('error is ' + err );
    }
});
// mongoose.connect("mongodb://localhost:27017/attendance", { useUnifiedTopology: true });
// MongoClient.connect({ useNewUrlParser: true });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(__dirname + '/public'));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res) => {
    res.json({ message: 'hooray! welcome to our api!' });
});

app.use(passport.initialize())
app.use(passport.session())

//routes
// router.route('/admin/addStudents').get((req,res) => {adminRoutes});
app.use('/admin/', adminRoutes);
app.use('/attendance/', markingAttendanceRoutes);
app.use('/student/', studentRoutes);
app.use('/auth/', authUser);

app.listen(port, () => {
    console.log("Server runs at 8080");
})