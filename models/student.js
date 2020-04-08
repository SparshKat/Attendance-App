var mongoose = require("mongoose");

var studentSchema = new mongoose.Schema({
  name: { type: String },
  rollNo: { type: String },
  image: { type: String },
  attendanceID: [
    {
      subject: { type: String },
      attended: {type : Boolean},
      day: { type: String } ,
      week: { type: String }
    }
  ]
});

module.exports = mongoose.model("Student", studentSchema);
