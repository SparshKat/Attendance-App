var  mongoose    = require("mongoose");

var teacherSchema = new mongoose.Schema ({
  name : String ,
  image : String ,
  subjectTaught : [
    {  
        type : mongoose.Schema.Types.ObjectId ,
        ref : "Subject"
     }
  ]
});

module.exports = mongoose.model("Teacher" , teacherSchema);
