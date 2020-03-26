var  mongoose    = require("mongoose");

var studentSchema = new mongoose.Schema ({
  name : String ,
  rollNo  : Number,
  image : String ,
  attendanceID : [
    {
      subject : {  
        type : mongoose.Schema.Types.ObjectId ,
        ref : "Subject"
      } , 
      attendance : {
        attended  : { type : Boolean , Default : 0},
        day : String,
        week : String 
      }
   }
  ]
});

module.exports = mongoose.model("Student" , studentSchema);
