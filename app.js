var     express         = require('express') ,
        bodyParser      = require('body-parser') ,
        mongoose        = require('mongoose') ,
        methodOverride  = require("method-override"),
        port            = process.env.PORT || 8080,
        app             = express();

mongoose.connect("mongodb://localhost:27017/attendance", { useUnifiedTopology: true });
// MongoClient.connect({ useNewUrlParser: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));


app.get('/', (req, res)=> {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// app.post('/api/student')

app.listen(port , () => {
    console.log("Server runs at 8080");
})