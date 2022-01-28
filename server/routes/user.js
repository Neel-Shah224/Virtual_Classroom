const router = require('express').Router()
const User = require('../model/User')
const bcrypt=require('bcryptjs')
const authenticate = require('../middleware/authenticate')
const multer=require('multer')
router.post('/register',async(req,res)=>{
    
    try{ 
        const {email,name,password,mobile}=req.body
        if(!name || !email || !password || !mobile){
            throw new Error('enter all fields properly')
        }
        const exist = await User.findOne({email:email})
        if(exist){
            return res.status(406).send({error:'user already registered with this email'})
        }
        const user = new User({email,name,password,mobile})
        await user.save()
        res.status(201).send({message:'user registered successsfully'})

    }
    catch(e){
        console.log(e)
        res.status(406).send({error:"registration failed"})
    }

})

router.post('/login',async(req,res)=>{
    try{
        const {email,password}=req.body
        if(!email || !password){
            return res.status(406).send({error:'enter all fields properly'})
        }
        const user = await User.findOne({email})
        if(!user){
            return res.status(406).send({error:'Invalid Credentials'})
        }

        if(!await bcrypt.compare(password,user.password)){
            return res.status(406).send({error:'Invalid Credentials'})
        }
        const token = await user.getAuthToken()
        res.cookie('jwtoken',token)
        res.send({message:'user loged in successfully',user})

    }
    catch(e){
        console.log(e)
        res.send({error:'login failed'})
    }
})
router.get('/profile',authenticate,async(req,res)=>{
    res.send(req.user)
})

router.post('/profilepic',authenticate, multer().single("file"),
async (req, res) => {
  try {
      console.log(req.file)
    req.user.profilepic=req.file.buffer
    await req.user.save()    
    res.send({profilepic:req.user.profilepic})
  } catch (error) {
    console.log(error)
    res.status(400).send("Error while uploading file. Try again later.");
  }
})

router.get('/logout',authenticate,async (req,res)=>{
    var user = req.user
    const token = req.cookies.jwtoken
    user.tokens = user.tokens.filter((val)=>{
        
        return val.token!=token
    })
    await user.save()

    res.clearCookie('jwtoken')
    res.status(200).send({message:'successfully logged out'})
})
module.exports = router