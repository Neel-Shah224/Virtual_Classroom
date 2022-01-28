import React, {useContext, useState} from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Paper, Grid , Typography, TextField , Box, Button } from '@mui/material' 
import { styled } from '@mui/material/styles';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import path from '../images/login.svg'
import { UserLogged } from '../App';
import validator from 'validator';
const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  padding:7,
  maxWidth: '100%',
  maxHeight: '100%',
});


const Login = function ({setUser}){
  const {dispatchUserAuth,setOpen} = useContext(UserLogged)
  const navigate = useNavigate()
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')

  const handleClick = async (e) => {
    e.preventDefault()
    /* validate user*/
    if( !validator.isEmail(email) || password.length<4){
      setOpen({message:'enter proper fields',severity:"error",open:true})
      return
    }
    const res = await fetch( 'user/login',
    {
      method:"POST",
      headers:{
        "Content-Type" : "application/json"
      },
      body:JSON.stringify({email,password})
    })
    const data = await res.json()
    if(!data || data.error|| data.status===422 || data.status === 401 || data.status===500){
      setOpen({message:"Login failed",severity:"error",open:true})
      
    }
    else{
      setOpen({message:'Login successful',severity:"success",open:true})
      setUser(data.user)
      dispatchUserAuth({type:'LOGGEDIN',payload:true})
      navigate('/dashboard')
    }
  }
  return(
   <>
    <Paper  elevation={10} sx={{ p: 2, margin: 'auto',marginTop:4, maxWidth: 850, flexGrow: 1 }}>
      <Grid m="auto" container spacing={2}
      alignItems="center"
      justifyContent="center">
      <Grid item m={0} xs={6}> 
          <Img m="auto" p="auto" src={path} alt="Register"/>
          <Typography align="center" variant='h8'  gutterBottom  component="div">
          <NavLink className="nav-link active" aria-current="page" to="/register">
            New User? Register Now
          </NavLink>
          </Typography>
        </Grid>


        <Grid item xs={6}>
          <Typography m={2} gutterBottom variant="h4" component="div">
              Login
          </Typography>

          <Box m={2} sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <EmailIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            <TextField  style = {{width: 300}} label="Your Email" variant="standard" 
            value={email}
            onChange={(e)=>setEmail(e.target.value)}/>
          </Box>

          
          <Box m={2} sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <LockIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            <TextField  style = {{width: 300}} type="password" label="Your Password" variant="standard" 
            value={password}
            onChange={(e)=>setPassword(e.target.value)}/>
          </Box>

          <Box m={4} sx={{ display: 'flex', alignItems: 'flex-end' }} >
            <Button p={2} variant="contained" onClick={handleClick}>Submit</Button>
          </Box>
          
        </Grid>

        
      </Grid>
    </Paper>
   </>
  )
}

export default Login