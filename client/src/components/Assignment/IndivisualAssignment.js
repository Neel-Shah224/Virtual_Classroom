import React, { useRef, useState } from 'react'
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SendIcon from '@mui/icons-material/Send';
import Dropzone from 'react-dropzone'
import { Typography, Button } from '@mui/material'
import axios from 'axios'
import '../../styles.scss';
const IndivisualAssignment = ({ assgn, class_id }) => {

    const [file, setFile] = useState(null); // state for storing actual image
    const [previewSrc, setPreviewSrc] = useState(''); // state for storing previewImage


    const [isPreviewAvailable, setIsPreviewAvailable] = useState(false); // state to show preview only for images
    const dropRef = useRef();
    const onDrop = (files) => {
        const [uploadedFile] = files;
        setFile(uploadedFile);

        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPreviewSrc(fileReader.result);
        };
        fileReader.readAsDataURL(uploadedFile);
        setIsPreviewAvailable(uploadedFile.name.match(/\.(jpeg|jpg|png)$/));
        dropRef.current.style.border = '2px dashed #e9ebeb';
    };

    const updateBorder = (dragState) => {
        if (dragState === 'over') {
            dropRef.current.style.border = '2px solid #000';
        } else if (dragState === 'leave') {
            dropRef.current.style.border = '2px dashed #e9ebeb';
        }
    };

    const AssignhandleOnSubmit = async (event) => {
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
    };



    return (
        <>

            <AccordionDetails>
                <Typography sx={{ mr: 1 }}>Deadline: {assgn.deadline}</Typography>
                <Typography variant="body2" gutterBottom sx={{ whiteSpace: 'pre-wrap' }}>
                    {assgn.description}
                </Typography>

                <Dropzone
                    onDrop={onDrop}
                    onDragEnter={() => updateBorder('over')}
                    onDragLeave={() => updateBorder('leave')}
                >
                    {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps({ className: 'drop-zone' })} ref={dropRef}>
                            <input {...getInputProps()} />
                            <p>Upload</p>
                            {file && (
                                <>
                                    <strong>Selected file:</strong> {file.name}
                                </>
                            )}
                        </div>
                    )}
                </Dropzone>

                <br/>
                <Button variant="primary" type="submit" onClick={AssignhandleOnSubmit}>
                    Submit
                </Button>
            </AccordionDetails>
        </>
    )
}

export default IndivisualAssignment