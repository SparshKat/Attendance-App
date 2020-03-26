var  mongoose    = require("mongoose");

var classSchema = new mongoose.Schema ({
  branchName : String ,
  batchCode : String ,
  studentList : [
      {  
         type : mongoose.Schema.Types.ObjectId ,
         ref : "Student"
      }
  ]
});

module.exports = mongoose.model("Class" , classSchema);
