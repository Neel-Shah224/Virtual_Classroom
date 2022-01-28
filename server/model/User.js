const mongoose = require('mongoose')
var validator = require('validator');
const jwt= require('jsonwebtoken')
var bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minLength:4
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate: function(val){
            if(!validator.isEmail(val)){
                throw new Error('invalid email')
            }
        }
    },
    password:{
        type:String,
        required:true,
    },
    mobile:{
        type:Number,
        validate:function(val){
            if(val.toString().length<10||val.toString().length>12){
                return false
            }
            return true
        }
    },
    profilepic:{
        type:Buffer
    },
    tokens:[{
        token:{
            type:String
        }
    }],
    enrolledClasses:[{
            type: mongoose.Schema.Types.ObjectId, ref: 'Class'
    }]
})

userSchema.methods.getAuthToken = async function(){
    const user=this
    const token=jwt.sign({_id:this._id},process.env.SECRET_KEY)
    user.tokens=user.tokens.concat({token})
    await user.save()
    return token
}

userSchema.pre('save', async function(next){
    if( this.isModified('password') ){
        this.password = await bcrypt.hash(this.password,8)
    }
    next()
})

const User = mongoose.model('User',userSchema)

module.exports = User