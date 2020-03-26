var mongoose = require("mongoose") ;

var subjectSchema = new mongoose.Schema({
   name : String ,
   code : String , 
});

module.exports = mongoose.model("Subject" , subjectSchema);