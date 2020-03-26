var  mongoose    = require("mongoose");

var movieSchema = new mongoose.Schema ({
  name : String ,
  image : String ,
  review : String ,
  subjectTaught : [
    {  
        type : mongoose.Schema.Types.ObjectId ,
        ref : "Subject"
     }
  ]
});

module.exports = mongoose.model("Movie" , movieSchema);
