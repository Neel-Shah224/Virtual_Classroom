const User = require('../model/User')
const jwt = require('jsonwebtoken')
const authenticate= async(req,res,next) =>{
    try{
        const token=req.cookies.jwtoken
        const verify = await jwt.verify(token,process.env.SECRET_KEY)
        if(!verify){
            throw new Error('not verified')
        }
        const user = await User.findById(verify)
        req.user=user

        next()
    }catch(e){
        console.log(e)
        res.status(401).send({error:'unauthorized access'})
    }
    
}
module.exports = authenticate