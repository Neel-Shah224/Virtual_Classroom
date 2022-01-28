const mongoose = require('mongoose')

const classSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    subject:{
        type:String
    },
    section:{
        type:String
    },
    room:{
        type:String
    },
    code:{
        type:String,
        required:true
    },
    creator:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    teachers:[{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }],
    students:[{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    }]
    
})

const Class = mongoose.model('Class',classSchema)

module.exports=Class