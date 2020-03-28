var mongoose = require("mongoose");

var studentSchema = new mongoose.Schema({
  name: { type: String },
  rollNo: { type: String },
  image: { type: String },
  attendanceID: [
    {
      subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject"
      },
      attendance: {
        attended: { type: Boolean, Default: 0 },
        day: { type: String },
        week: { type: String }
      }
    }
  ]
});

module.exports = mongoose.model("Student", studentSchema);
