const mongoose = require('mongoose')

const CommentSchema = mongoose.Schema({
    class_id:{
        type:mongoose.Schema.Types.ObjectId,
        requied:true,
        ref:'Class'
    },
    chat_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Chat'
    },
    description:{
        type:String,
        required:true
    },
    writer_name:{
        type:String,
        required:true
    },
    
}, {
    timestamps: true
})

const Comment=mongoose.model('Comment',CommentSchema)

module.exports=Comment