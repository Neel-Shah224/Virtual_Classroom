import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function JoinClass({value,setjc}) {
    const [open, setOpen] = React.useState(value);
    React.useEffect(()=>{
         setOpen(value)
         
    },[value])
    const handleClose = () => {
        setOpen(false);
        setjc(false)
    };

    const [myclass,setClass] = React.useState({
       code:""

    })
    let name,v;
  const handleInputs= (e)=>{
    name=e.target.name
    v=e.target.value
    setClass({...myclass, [name]:v})
  }
  const joinMyClass = async(e)=>{
    e.preventDefault();
    /* validation required */
    if(!myclass.code){
        setOpen({message:'enter details properly',severity:"error",open:true})
        return
    }
    const res = await fetch( 'class/join',
    {
      method:"POST",
      headers:{
        "Content-Type" : "application/json",
        Accept:"application/json"
      },
      credentials:"include",
      body:JSON.stringify(myclass)
    })
    const data = await res.json() 
    
   
   
  }
  
    return (
      <div>
       
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Join Class</DialogTitle>
          <DialogContent>
           
            
            <TextField
               onChange={handleInputs}
               autoComplete="off" 
               value={myclass.code}
              margin="dense"
              name="code"
              label="Class Code"
              
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={joinMyClass}>Join Class</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
}