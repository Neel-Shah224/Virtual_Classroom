const mongoose = require("mongoose");

const FileSchema = mongoose.Schema({
  class_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Class",
    required: true,
    unique: true,
  },
  assignment_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Assignment",
    required: true,
    unique: true,
  },

  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  file_name: {
    type: String,
    required: true,
  },
  mimetype: {
    type: String,
  },
  submission_time: {
    type: Date,
  },
  file: {
    type: Buffer,
  },
});

/* FileSchema.methods.toJSON = function(){
  this.populate('assignment_id','title')
  const fileObject=this.toObject()
  delete fileObject.file
  console.log("yes")
  return fileObject

} */
const Files = mongoose.model("File", FileSchema);

module.exports = Files;
