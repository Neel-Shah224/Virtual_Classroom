import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function CreateClass({value,setcc}) {
    const [open, setOpen] = React.useState(value);
    React.useEffect(()=>{
         setOpen(value)
         
    },[value])
    const handleClose = () => {
        setOpen(false);
        setcc(false)
    };

    const [myclass,setClass] = React.useState({
        name:"",subject:"",section:"",room:""

    })
    let name,v;
  const handleInputs= (e)=>{
    name=e.target.name
    v=e.target.value
    setClass({...myclass, [name]:v})
  }
  const CreateMyClass = async(e)=>{
    e.preventDefault();
    /* validation required */
    if(!myclass.name){
        setOpen({message:'enter details properly',severity:"error",open:true})
        return
    }
     const res = await fetch( 'class/create',
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
  
    alert("OK")
   
   
  }
  
    return (
      <div>
       
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Create Class</DialogTitle>
          <DialogContent>
           
            <TextField
              autoFocus
              margin="dense"
              name="name"
              label="Class Name"
              fullWidth
              variant="standard"
              onChange={handleInputs}
              autoComplete="off" 
              value={myclass.name}
            />
            <TextField
              onChange={handleInputs}
              autoComplete="off" 
              value={myclass.subject}
              margin="dense"
              id="subject"
              label="Subject"
              name="subject"
              fullWidth
              variant="standard"
            />
            <TextField
               onChange={handleInputs}
               autoComplete="off" 
               value={myclass.section}
              margin="dense"
              name="section"
              label="Section"
              fullWidth
              variant="standard"
            />
            <TextField
               onChange={handleInputs}
               autoComplete="off" 
               value={myclass.room}
              margin="dense"
              name="room"
              label="Room"
              
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={CreateMyClass}>Create Class</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
}