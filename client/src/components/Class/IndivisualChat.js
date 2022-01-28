import React from "react";
import {
  Paper,
  Typography,
  InputBase,
  IconButton,
  Divider,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { Box } from "@mui/system";

const writeDate = (cd) => {
  const currentDate = new Date();
  const givendate = new Date(cd);
  const month_names_short = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  if (currentDate.getDate() == givendate.getDate()) {
    return givendate.getHours() + " : " + givendate.getMinutes();
  } else if (currentDate.getDate() - givendate.getDate() == 1) {
    return "Yesterday";
  } else {
    return givendate.getDate() + " " + month_names_short[givendate.getMonth()];
  }
};
const IndivisualChat = ({ props }) => {
  const allcomment = props.comments_id;
  const [comment, setComment] = React.useState("");
  const handleComment = (e) => {
    setComment(e.target.value);
  };
  const submitComment = async (e) => {
    e.preventDefault();
    const { class_id } = props;
    const chat_id = props._id;
    const description = comment;

    const res = await fetch("/class/" + class_id + "/comment", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ class_id, chat_id, description }),
    });
    const data = await res.json();
    setComment("");
  };
  return (
    <>
      <Paper
        sx={{ p: 2, margin: "auto", marginTop: 2, maxWidth: 850, flexGrow: 1 }}
        elevation={5}
      >
        <Typography variant="h6">{props.writer_name} </Typography>
        <Typography variant="caption">{writeDate(props.createdAt)} </Typography>
        <Typography
          variant="body2"
          gutterBottom
          sx={{ whiteSpace: "pre-wrap" }}
        >
          {props.description}
        </Typography>
        <Divider />
        {allcomment.length > 0 && (
          <>
            <Divider />
            <Typography variant="h7">Class Comments</Typography><br/>
          </>
        )}
        {allcomment.length > 0 &&
          allcomment.map((cmnt) => (
            <>
              <Typography variant="h7">{cmnt.writer_name} </Typography>
              <Typography variant="caption">
                {writeDate(cmnt.createdAt)}{" "}
              </Typography>
              <Typography
                variant="body2"
                gutterBottom
                sx={{ whiteSpace: "pre-wrap" }}
              >
                {cmnt.description}
              </Typography>
            </>
          ))}
        {allcomment.length > 0 && <Divider />}
        <Box sx={{ display: "flex" }}>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Add Class Comment"
            value={comment}
            onChange={handleComment}
          />
          <IconButton
            onClick={submitComment}
            sx={{ p: "10px" }}
            aria-label="search"
          >
            <SendIcon />
          </IconButton>
        </Box>
      </Paper>
    </>
  );
};
export default IndivisualChat;
