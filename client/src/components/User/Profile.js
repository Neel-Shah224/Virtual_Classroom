import React, { useState, useRef } from "react";
import { Box, Avatar, Button, Typography, Divider } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import LockOpenSharpIcon from "@mui/icons-material/LockOpenSharp";
import MailIcon from "@mui/icons-material/Mail";
import PhoneIcon from "@mui/icons-material/Phone";
import { NavLink } from "react-router-dom";
import Dropzone from "react-dropzone";
import axios from "axios";
const Profile = ({ user,setUser, close }) => {
  const [file, setFile] = useState(null); // state for storing actual image

  const [isPreviewAvailable, setIsPreviewAvailable] = useState(false); // state to show preview only for images
  const dropRef = useRef();

  const onDrop = async (files) => {
    try {
      const [uploadedFile] = files;
      setFile(uploadedFile);

      const fileReader = new FileReader();
      fileReader.onload = () => {};
      fileReader.readAsDataURL(uploadedFile);

      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.post("/user/profilepic", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        credentials: "include",
      });
      
      setUser({...user,profilepic:res.data.profilepic})

    } catch (e) {
      console.log("error occured");
      console.log(e);
    }
  };

  /* const AssignhandleOnSubmit = async (event) => {
        event.preventDefault();

        try {
            const title = file.name
            if (title.trim() !== '') {
                if (file) {
                    const formData = new FormData();
                    formData.append('file', file);
                    formData.append('title', title);
                    formData.append('assignment_id', assgn._id);
                    const res=await axios.post('/class/'+class_id+'/assignment/'+assgn._id+'/upload', formData, {
                        headers: {
                          'Content-Type': 'multipart/form-data'
                        },
                        credentials: "include",
                      });
                    console.log(await res.json())
                } else {
                    alert('Please select a file to add.');
                }
            } else {
                alert('Please enter all the field values.');
            }
        } catch (error) {
            error.response && alert(error.response.data);
        }
    }; */

  return (
    <>
      <Box
        sx={{ width: 350, textAlign: "center", padding: 2, paddingTop: 3 }}
        role="presentation"
      >
        <center>
          <Avatar
            sx={{ alignItems: "center", margin: 1 }}
            alt={user.name}
            src={'data:image/jpeg;base64,' + user.profilepic.toString('base64')}
            sx={{ width: 56, height: 56 }}
          />
        </center>

        <Dropzone onDrop={onDrop}>
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()} ref={dropRef}>
              <input {...getInputProps()} sx={{ type: "image" }} />
              <Button variant="contained" sx={{ margin: 1 }}>
                <UploadIcon />
                Upload Image
              </Button>
            </div>
          )}
        </Dropzone>

        <Button variant="contained" sx={{ margin: 1 }}>
          <LockOpenSharpIcon /> Update Password
        </Button>
        <Typography
          variant="h6"
          gutterBottom
          component="div"
          sx={{ margin: 1 }}
        >
          {user.name}
        </Typography>

        <Typography
          variant="h6"
          gutterBottom
          component="div"
          sx={{ margin: 1 }}
        >
          <MailIcon />
          {user.email}
        </Typography>

        <Typography
          variant="h6"
          gutterBottom
          component="div"
          sx={{ margin: 1 }}
        >
          <PhoneIcon /> {user.mobile}
        </Typography>

        <Divider />
        <NavLink to="/dashboard">
          <Button variant="outlined" onClick={() => close()} sx={{ margin: 2 }}>
            Dashboard
          </Button>
        </NavLink>
        <NavLink to="/logout">
          <Button variant="outlined" onClick={() => close()} sx={{ margin: 2 }}>
            logout
          </Button>
        </NavLink>
      </Box>
    </>
  );
};

export default Profile;
