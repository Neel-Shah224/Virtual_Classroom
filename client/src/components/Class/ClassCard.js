import React from "react";
import { Fab, CardContent, CardMedia, Typography, Menu, MenuItem, Card } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { NavLink } from 'react-router-dom'
import class_image from '../../images/classroom_image.jpg'
const ClassCard = ({ cls }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <div className="subject-grid">
        <Fab size="small" color="disable" aria-label="add" aria-controls="basic-menu">
          <MoreVertIcon onClick={handleClick} />
        </Fab>

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleClose}>
            <NavLink to={{
              pathname: '/class/' + cls._id
            }}> Open </NavLink>
          </MenuItem>
          <MenuItem onClick={handleClose}>Unenroll</MenuItem>

        </Menu>
      </div>
      <Card sx={{ width: 320, height: 260 }}>

        <CardMedia
          component="img"
          height="140"
          image={class_image}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            <NavLink to={'/class/' + cls._id}>{cls.name}</NavLink>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {cls.section}
          </Typography>
          <Typography variant="body3" color="text.secondary">
            {cls.creator.name}
          </Typography>
        </CardContent>

      </Card>
    </>
  )
}

export default ClassCard