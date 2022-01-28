const mongoose = require('mongoose')

const db=process.env.DATABASE
mongoose.connect(db,{
    useNewUrlParser:true,
}).then( () =>{
    console.log('database is connected now')
})
.catch( (e)=>{
    console.log(e)
})