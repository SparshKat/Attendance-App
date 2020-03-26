var express     = require('express');
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');
var port        = process.env.PORT || 8080; 
var app         = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


mongoose.connect("mongodb://localhost:27017/attendance", { useUnifiedTopology: true } , { useNewUrlParser: true });

app.get('/', (req, res)=> {
    res.json({ message: 'hooray! welcome to our api!' });   
});

app.listen(port , () => {
    console.log("Server runs at 8080");
})