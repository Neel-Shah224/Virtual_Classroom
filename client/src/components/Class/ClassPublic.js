import React from 'react'
import { styled } from '@mui/material/styles';
import { List, ListItem, ListItemText, Grid, Typography,Paper , Divider} from '@mui/material';


function generate(element) {
    return [0].map((value) =>
        React.cloneElement(element, {
            key: value,
        }),
    );
}

const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));


const ClassPublic = ({ class_id }) => {

    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);
    const [myclass, setMyClass] = React.useState({})

    const callpeople = async () => {
        const response = await fetch('/class/' + class_id + '/people', {
            method: 'GET',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        })
        const data = await response.json()
        setMyClass(data.myclass)
    }
    React.useEffect(() => {
        callpeople()
    }, [])
    return (
        <>
            <Paper sx={{ p: 2, margin: 'auto', maxWidth: 850, flexGrow: 1 }} elevation={5}>
                {myclass.teachers &&
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12}>
                            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                                Teachers
                            </Typography>
                            <Divider />
                            <Demo>
                                <List dense={dense}>
                                    {generate(
                                        <ListItem>
                                            <ListItemText
                                                primary={myclass.teachers[0].name}
                                                secondary={secondary ? 'Secondary text' : null}
                                            />
                                        </ListItem>,
                                    )}
                                </List>
                            </Demo>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                                Students
                            </Typography>
                            <Divider />
                            <Demo>
                                <List dense={dense}>
                                    {myclass.students.map((std) => (
                                        generate(
                                            <ListItem>
                                                <ListItemText
                                                    primary={std.name}
                                                    secondary={secondary ? 'Secondary text' : null}
                                                />
                                            </ListItem>,
                                        )
                                    ))
                                    }
                                </List>
                            </Demo>
                        </Grid>

                    </Grid>
                }</Paper>
        </>
    )
}
export default ClassPublic