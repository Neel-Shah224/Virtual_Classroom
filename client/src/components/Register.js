import React,{useContext, useState} from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Paper, Grid , Typography, TextField , Box, Button } from '@mui/material' 
import { styled } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LockIcon from '@mui/icons-material/Lock';
 import  validator  from 'validator';
import path from '../images/SignUp.webp'
import { UserLogged } from '../App';
const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  padding:7,
  Width: '100%',
  Height: '100%',
});

const Register = function (){
  const {setOpen}=useContext(UserLogged)
  const navigate=useNavigate()
  const [user,setUser]=useState({
    name:"",
    email:"",
    mobile:"",
    password:"",
  })
  let name,value;
  const handleInputs= (e)=>{
    name=e.target.name
    value=e.target.value
    setUser({...user, [name]:value})
  }

  const registerUser = async(e)=>{
    e.preventDefault();
    /* validation required */
    if(user.name.length<4 ||
      !validator.isEmail(user.email) ||
      user.password.length<4 ||
      user.mobile.length<10 || user.mobile.length>12){
        setOpen({message:'enter details properly',severity:"error",open:true})
        return
      }
    const res = await fetch( 'user/register',
    {
      method:"POST",
      headers:{
        "Content-Type" : "application/json"
      },
      body:JSON.stringify(user)
    })
    const data = await res.json()
   
    if(!data || data.status===402 || data.error){
      setOpen({message:'Registration failed',severity:"error",open:true})
      
    }
    else{
      setOpen({message:'Registration successful',severity:"error",open:true})
     
      navigate('/login')
    }
  }
  return(
    <>
    <Paper  elevation={10} sx={{ p: 2, margin: 'auto',marginTop:4, maxWidth: 850, flexGrow: 1 }}>
      <Grid m="auto" container spacing={2}>

        <Grid item xs={6}>
          <Typography m={2} gutterBottom variant="h4" component="div">
              Register
          </Typography>

          <Box  sx={{ margin:2, display: 'flex', alignItems: 'flex-end' }}>
            <PersonIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            <TextField  style = {{width: 350}} label="Your Name" variant="standard" 
            autoComplete="off" 
            value={user.name}
            name="name"
            onChange={handleInputs}/>
          </Box>

          <Box m={2} sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <EmailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            <TextField  style = {{width: 350}} label="Your Email" variant="standard" 
            autoComplete="off" 
            value={user.email}
            name="email"
            onChange={handleInputs}/>
          </Box>

          <Box m={2} sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <PhoneIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            <TextField  style = {{width: 350}} label="Your Phone" variant="standard" 
            autoComplete="off" 
            value={user.mobile}
            name="mobile"
            onChange={handleInputs}/>
          </Box>


          <Box m={2} sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <LockIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            <TextField  style = {{width: 350}} label="Your Password" variant="standard" 
            autoComplete="off" type="password"
            value={user.password}
            name="password"
            onChange={handleInputs}/>
          </Box>

          <Box m={4} sx={{ display: 'flex', alignItems: 'flex-end' }} >
          <Button p={2} variant="contained" onClick={registerUser}>Submit</Button>
          </Box>
        </Grid>

        <Grid item m={0} xs={6}> 
          <Img m="auto" p="auto" src={path} alt="Register"/>
          <Typography align="center" variant='h8'  gutterBottom  component="div">
          <NavLink className="nav-link active" aria-current="page" to="/login">
            I am already Registered
          </NavLink>
          </Typography>
        </Grid>
      </Grid>
    </Paper>
    </>
  )
}

export default Register