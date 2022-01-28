import React from 'react'
import { Paper, Typography, InputBase, IconButton, TextField, Grid, Button } from '@mui/material'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SendIcon from '@mui/icons-material/Send';
import Dropzone from 'react-dropzone'
import IndivisualAssignment from './IndivisualAssignment';
const AssignmentShow = ({ class_id }) => {
    
    const [assignment, setAssignment] = React.useState({
        title: "",
        description: "",
        maxMarks: 100,
    })
    const [allAssignemts, setallAssignments] = React.useState([])
    const callAllAssignment = async () => {
        const res = await fetch('/class/' + class_id + '/assignment/all', {
            method: 'GET',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include",
        })
        const data = await res.json()

        setallAssignments(data.assignments)

    }
    React.useEffect(() => {
        callAllAssignment()
    }, [])
    const [deadline, setDeadline] = React.useState(new Date())
    const handleInput = (e) => {
        setAssignment({ ...assignment, [e.target.name]: e.target.value })
    }
    const handleSubmit = async () => {
        const res = await fetch('/class/' + class_id + '/assignment/assign', {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({ deadline, ...assignment, class_id })
        })
        const data = await res.json()
        setAssignment({
            title: "",
            description: "",
            maxMarks: 100,
        })
    }


    return (
        <>
            <Paper
                /* onSubmit={handleSubmit} */ elevation={5}
                sx={{ margin: 'auto', maxWidth: 850, marginTop: 2, p: 2, alignItems: 'center' }}
            >
                <Grid container spacing={1}>
                    <Grid item xs={6} sx={{ p: 2 }}>
                        <TextField
                            id="outlined-basic" label="Assignment Title" variant="outlined"
                            fullWidth
                            sx={{ flex: 1, m: 2 }}
                            placeholder="Assignment Title"
                            value={assignment.title}
                            name="title"
                            onChange={handleInput}
                        />
                    </Grid>
                    <Grid item xs={4} sx={{ p: 2 }}>
                        <LocalizationProvider dateAdapter={AdapterDateFns} >
                            <DateTimePicker
                                renderInput={(props) => <TextField sx={{ flex: 1, m: 2, mr: 0 }} {...props} />}

                                label="DeadLine:"
                                value={assignment.deadline}
                                name="deadline"
                                onChange={(newValue) => setDeadline(newValue)}

                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={2} sx={{ p: 2 }}>
                        <TextField
                            sx={{ flex: 1, mt: 2 }}
                            id="outlined-number"
                            label="Max Marks"
                            type="number"
                            name="maxMarks"
                            value={assignment.maxMarks}
                            onChange={handleInput}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id='outlined-basic-multiline-flexible'
                            multiline
                            fullwidth
                            sx={{ ml: 1, mr: 1 }}
                            label="Assignment Description"
                            value={assignment.description}
                            name="description"
                            onChange={handleInput}
                        />
                        <Button sx={{ m: 2, p: 2, backgroundColor: '#1976d2', color: 'white' }}>
                            <Typography variant="body2">Assign</Typography>
                            <IconButton onClick={handleSubmit} sx={{ p: '3px' }} aria-label="search">
                                <SendIcon sx={{ fontSize: 18, color: 'white' }} />
                            </IconButton>
                        </Button>

                    </Grid>
                </Grid>

                {allAssignemts.length > 0 &&
                    allAssignemts.map((assgn) => {

                        return (
                            <Accordion key={assgn._id}>
                                 <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Typography sx={{ ml: 1 }}>{assgn.title}</Typography>

        </AccordionSummary>
                                <IndivisualAssignment assgn={assgn} class_id={class_id}/>
                            </Accordion>
                        )
                    })

                }
            </Paper>
        </>
    )
}

export default AssignmentShow