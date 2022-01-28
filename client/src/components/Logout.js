import React , {useEffect,useContext}  from 'react'
 
 import {useNavigate} from 'react-router-dom'
import { UserLogged } from '../App' 
const Logout = ({setUser})=>{
  const {dispatchUserAuth,setOpen} = useContext(UserLogged)
  const navigate = useNavigate()

    const callLogout = async()=>{
        const res=await fetch('user/logout',{
            method:'GET',
            headers:{
              Accept:"application/json",
              "Content-Type":"application/json"
            },
            credentials:"include"
          })
        const data = await res.json()
        if(!data || data.error){
          setOpen({message:"Logout failed",severity:"error",open:true})
        }
        else{
          setOpen({message:"Logout successful",severity:"success",open:true})
            setUser({})
            dispatchUserAuth({type:'LOGGEDOUT',payload:false})
            navigate('/login')
        }
    }
    useEffect( ()=>{
        callLogout()
    },[]) 
    return(
        <>  
            <p>Logging Out....</p>
        </>
    )
}
export default Logout