import React from 'react'
import { Tab, Box} from '@mui/material'
import {TabContext,TabList,TabPanel} from '@mui/lab';
import ClassMessages from './ClassMessages';
import ClassPublic from './ClassPublic';
import AssignmentShow from '../Assignment/AssignmentShow';
import DownloadAssignment from '../Assignment/DownloadAssignment';
const ClassMain = ()=>{
    
    const class_id=document.baseURI.split('/class/')[1]
    const [isTeacher,setTeacher]=React.useState(false)
    const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

    return(
        <>
       <TabContext value={value} >
            <Box  sx={{justifyContent:'center',alignItems: 'center', marginLeft:3,borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Chats" value="1" />
                <Tab label="People" value="2" />
                <Tab label="Assignments" value="3" />
                {isTeacher && <Tab label="Download Assignment" value="4" />}
                </TabList>
            </Box>
            <TabPanel value="1"><ClassMessages class_id={class_id} setTeacher={setTeacher}/></TabPanel>
            <TabPanel value="2"><ClassPublic class_id={class_id}/></TabPanel>
            <TabPanel value="3"><AssignmentShow class_id={class_id}/></TabPanel>
            { isTeacher && <TabPanel value="4"><DownloadAssignment class_id={class_id}/></TabPanel>}
        </TabContext>
</>
    )
}

export default ClassMain