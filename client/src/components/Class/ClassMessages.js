import { Paper, Typography, InputBase, IconButton, Divider } from '@mui/material'
import React, { useEffect } from 'react'
import SendIcon from '@mui/icons-material/Send';
import { Box } from '@mui/system';
import IndivisualChat from './IndivisualChat'
const ClassMessages = ({ class_id,setTeacher }) => { 
    const [myclass, setmyclass] = React.useState({})
    const [message, setMessage] = React.useState('')
    const [chats, setChats] = React.useState([])
    const callChats = async () => {
        const res = await fetch('/class/' + class_id + '/chats', {
            method: 'GET',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        })
        const data = await res.json()
        setmyclass(data.myclass)
        if(data.isTeacher){
            setTeacher(true)
        }
        setChats(data.chats)
    }
    useEffect(() => {
        callChats()
    }, [])
    const handleSubmit = async (e) => {
        e.preventDefault()
        const res = await fetch('/class/' + class_id + '/sendmessage', {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({ message })
        })
        const data = await res.json()
        setMessage('')
        const ChatMessages=document.getElementById('ChatMessages')
        const element=<IndivisualChat props={data.newchat} />
        ChatMessages.insertAdjacentHTML("beforebegin", element)
        alert('ok')
    }
    const handleInput = (e) => {
        setMessage(e.target.value)
    }
    return (
        <>
            <Paper sx={{ p: 2, margin: 'auto', maxWidth: 850, flexGrow: 1 }} elevation={5}>
                <Typography variant='h3'>{myclass.name}</Typography>
                <Typography variant="h6">{myclass.subject}</Typography>
                <Typography variant="h6">{myclass.section} {myclass.room}</Typography>
            </Paper>

            <Paper
                onSubmit={handleSubmit} elevation={5}
                sx={{ margin: 'auto', maxWidth: 850, marginTop: 2, p: '2px 4px', display: 'flex', alignItems: 'center' }}
            >
                <InputBase
                    id='multiline-flexible'
                    multiline
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Type Your Message Here..."
                    value={message}
                    name="message"
                    onChange={handleInput}
                />
                <IconButton onClick={handleSubmit} sx={{ p: '10px' }} aria-label="search">
                    <SendIcon />
                </IconButton>
            </Paper>
            <div id="ChatMessages">
            {
                chats.map((c) => {
                    return (
                        <IndivisualChat key={c._id} props={c} />)
                })
            }
            </div>
        </>
    )
}

export default ClassMessages