const router = require('express').Router()
const authenticate=require('../middleware/authenticate')
const Class=require('../model/Class')
const User = require('../model/User')
const classMember = require('../middleware/classMember')
const Chat=require('../model/Chat')
const assignmentRoutes=require('./assignment')
const Comment=require('../model/Comment')
router.use('/:id/assignment',authenticate,classMember,assignmentRoutes)
router.post('/create',authenticate,async(req,res)=>{
  
    try{
    const {name,subject,section,room}=req.body
    var code = 1235 + (await Class.count({}))

    const creator=req.user._id
    const teachers=[creator]
    const myclass=new Class({name,subject,section,room,code,creator,teachers})
    myclass.save()

    req.user.enrolledClasses.push(myclass._id)
    req.user.save()
    res.send({myclass,message:'success'})
    }
    catch(e){
        console.log(e)
        res.send({error:"failed"})
    }
})
router.post('/join',authenticate,async(req,res)=>{
    try{
        const code=req.body.code
        const myclass=await Class.findOne({code})
        if(!myclass){
            throw new Error('No Class Exist with this code')
        }
        myclass.teachers.forEach( (tid)=>{
            if(tid.equals(req.user._id)){
                throw new Error('User already exist in that classroom')
            }
        })
        if(myclass.students){
        myclass.students.forEach( (sid)=>{
            if(sid.equals(req.user._id)){
                throw new Error('User already exist in that classroom')
            }
        })
    }
        myclass.students.push(req.user._id)
        req.user.enrolledClasses.push(myclass._id)
        myclass.save()
        req.user.save()
        res.send({message:"Successful added"})
    }
    catch(e){
        console.log(e)
        res.send({error:e})
    }
})

router.get('/getclass',authenticate,async(req,res)=>{
    var classes=[]
    try{
            if(!req.user.enrolledClasses){
                res.send([])
            }
            const enrolledClasses = req.user.enrolledClasses
            for(const clsid of enrolledClasses){
                const cls=await Class.findById(clsid)
                
                const creator=await User.findById(cls.creator)
                cls.creator=creator
               
                classes.push(cls)
            }
           
        res.send(classes)
    }
    catch(e){
        console.log(e)
        res.send({error:e})
    }
})

router.get('/:id/chats',authenticate,classMember,async(req,res)=>{
    try{
        const class_id=req.myclass._id
        const chats=await Chat.find({class_id}).sort({createdAt:-1}).populate('comments_id')
        res.send({myclass:req.myclass,chats,message:"yes",isTeacher:req.isTeacher})
    }
    catch(e){
        console.log(e)
        res.send({error:"eoorr is there"})
    }
    
})

router.post('/:id/sendmessage',authenticate,classMember,async(req,res)=>{
    try{
        const {message}=req.body
        const {name}=req.user
        const {_id}=req.myclass
        const newchat= new Chat({
            description:message,
            writer_name:name,
            class_id:_id,
        })
        await newchat.save()
        res.send({message:'success',newchat,isTeacher:req.isTeacher})
    }
    catch(e){
        console.log(e)
        res.send({error:"something went wrong"})
    }
   
})
router.get('/:id/people',authenticate,classMember,async(req,res)=>{
    try{
        var myclass = await req.myclass.populate('teachers','name')
        myclass = await req.myclass.populate('students','name')
         res.send({message:"ok",myclass})
    }catch(e){
        console.log(e)
        res.send({error:"erroror"})
    }
   
})
router.post('/:id/comment',authenticate,classMember,async(req,res)=>{
    try{
        const {chat_id,description,class_id}=req.body
        const writer_name=req.user.name
        const chat=await Chat.findById(req.body.chat_id)
        if(!chat){
            throw new Error('chat not found for commenting')
        }
        const comment=new Comment({chat_id,description,class_id,writer_name})

        chat.comments_id.push(comment._id)
        comment.save()
        chat.save()
        res.send({comment,message:"comment submitted successfully"})
    }
    catch(e){
        console.log(e)
        res.send({error:"error occured while commenting"})
    }
})
module.exports = router