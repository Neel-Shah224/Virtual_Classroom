const express = require('express')
require('dotenv').config({path:'./config.env'})
require('./db/connect')
const cookieParser = require('cookie-parser')
const userRoutes = require('./routes/user')
const classRoutes = require('./routes/class')
const bodyParser = require('body-parser');

const app=express()
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/user',userRoutes)
app.use('/class',classRoutes)

const port = process.env.PORT || 5000
app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})