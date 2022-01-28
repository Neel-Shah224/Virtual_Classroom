const mongoose = require('mongoose')

const assignmentSchema = mongoose.Schema({
    class_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Class',
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
    maxMarks:{
        type:Number,
    },
    deadline:{
        type:Date
    }
},{
    timestamps: true
})

const Assignment=mongoose.model('Assignment',assignmentSchema)

module.exports=Assignment