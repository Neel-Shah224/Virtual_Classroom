
const Class = require('../model/Class')
const classMember = async(req,res,next)=> {
    try{
        const class_id=req.params.id
        const myclass = await Class.findById(class_id)
        req.myclass=myclass
        for(const tid of myclass.teachers){
            if(tid.equals(req.user._id)){
                req.isTeacher=true
                return next()
                
            }
        }
        for(const sid of myclass.students){
            if(sid.equals(req.user._id)){
                req.isTeacher=false
                next()
                return
            }
        }
        return res.send({error:"User is not part of This Class"})
    }
    catch(e){
        return res.send({error:"Something went wrong"})
    }
    
}

module.exports= classMember