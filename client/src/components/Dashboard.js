import React, { useEffect } from "react";
import { Grid, MenuItem, Menu } from "@mui/material";
import Card from '@mui/material/Card';

import Button from '@mui/material/Button';

import AddIcon from '@mui/icons-material/Add'
import { Box } from "@mui/system";
import CreateClass from "./Class/CreateClass";
import JoinClass from "./Class/JoinClass";
import ClassCard from "./Class/ClassCard";
const Dashboard = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [cc, setcc] = React.useState(false)
  const openCreateClass = () => {
    setcc(true)
  }
  const [jc, setjc] = React.useState(false)
  const openJoinClass = () => {
    setjc(true)
  }
  const [classes, setclasses] = React.useState([])
  const getClasses = async () => {
    const res = await fetch('class/getclass', {
      method: 'GET',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include"
    })
    const data = await res.json()

    setclasses(data)
  }
  useEffect(() => {
    getClasses()
  }, [])
  return (
    <>

      <Grid container spacing={2} m={2}>
        {classes.length > 0 && classes.map((cls) => (
          <Grid item sx={{ maxWidth: 345, position: "relative" }} key={cls._id}>
            <ClassCard cls={cls} />
          </Grid>
        ))
        }
        <Grid sx={{ width: 320, height: 260, position: "relative" }} item>
          <Card sx={{ maxWidth: 345, }}>
            <Box sx={{ backgroundColor: "blue", width: 320, height: 260, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Button onClick={handleClick}>
                <AddIcon fontSize='large' m={5} p={10} sx={{ backgroundColor: "white", borderRadius: 10 }} />
              </Button>
            </Box>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={openJoinClass}>Join Class</MenuItem>
              <MenuItem onClick={openCreateClass}>Create Class</MenuItem>

            </Menu>
          </Card>
        </Grid>
      </Grid>
      <CreateClass value={cc} setcc={setcc} />
      <JoinClass value={jc} setjc={setjc} />
    </>
  )

}

export default Dashboard