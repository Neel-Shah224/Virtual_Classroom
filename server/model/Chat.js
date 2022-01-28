const mongoose = require('mongoose')

const ChatSchema = mongoose.Schema({
    class_id:{
        type:mongoose.Schema.Types.ObjectId,
        requied:true,
        ref:'Class'
    },
    description:{
        type:String,
        required:true
    },
    writer_name:{
        type:String,
        required:true
    },
    comments_id:[
        {type:mongoose.Schema.Types.ObjectId,
            ref:'Comment'}
        
    ]
    
}, {
    timestamps: true
})

const Chat=mongoose.model('Chat',ChatSchema)

module.exports=Chat