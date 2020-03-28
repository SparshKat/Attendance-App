var     express         = require('express') ,
        bodyParser      = require('body-parser') ,
        mongoose        = require('mongoose') ,
        methodOverride  = require("method-override"),
        MongoClient     = require('mongodb').MongoClient,
        port            = process.env.PORT || 8080,
        router          = express.Router(),
        app             = express();

//Routes
var addingStudentRoutes     = require('./routes/addingStudents'),
    markingAttendanceRoutes = require('./routes/markingAttendance');
 
// make client connect to mongo service
MongoClient.connect("mongodb://localhost:27017/AttendanceApp", (err, client) =>{
    if (err){
        return console.log("unable to connect to MongoDB server");
    }
    console.log("Database created!");
    const db = client.db('AttendanceApp')
    // db.collection('Attendance')
    client.close();
}); 

// mongoose.connect("mongodb://localhost:27017/attendance", { useUnifiedTopology: true });
// MongoClient.connect({ useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res)=> {
    res.json({ message: 'hooray! welcome to our api!' });   
});

app.use(function(req,res,next){
    console.log("Middleware has been established")
    next();
})

//routes
// router.route('/admin/addStudents').get((req,res) => {addingStudentRoutes});
app.use('/admin/addStudents' ,addingStudentRoutes);
app.use('/teacher/attendance',markingAttendanceRoutes);

app.post('/api/student')

app.listen(port , () => {
    console.log("Server runs at 8080");
})