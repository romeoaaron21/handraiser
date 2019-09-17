import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./ChatPageStyle";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from "@material-ui/icons/Send";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";

class ChatPageBox extends Component {
  constructor() {
    super();
    this.state = {

    }
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid
        item
        md={6}
        xs={8}
        style={{ minHeight: "800px" }}
      >
        <Paper
          style={{
            height: "800px",
            maxHeight: "800px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
          }}
        >
          <div style={{ height: "92%" }}>
            {/* Chatbox Header */}
            <div style={{ height: "10%" }}>
              <div className={classes.chatBoxHeader}>
                <Avatar style={{ marginRight: 10 }} src={this.props.chatmateInfo.avatar}>TL</Avatar>
                <div>
                  <Typography variant="body">{this.props.chatmateInfo.first_name} {this.props.chatmateInfo.last_name}</Typography>
                  {this.props.chatmateInfo.status === 'active'?
                  <div className={classes.activeNowWrapper}>
                    <div className={classes.activeNowCircle} />
                    <Typography variant="subtitle2" style={{ marginTop: 2 }}>
                      Active Now
                    </Typography>
                  </div>
                  :
                  null}
                </div>
              </div>
              <Divider />
            </div>
            {/* End Chatbox Header */}


            {/* Main Chatbox */}
            <div
              style={{ height: "90%", overflowY: "auto" }}
              className={classes.scrollBar}
            >
              <div className={classes.chatBoxContainer}>
                {/* Sender  */}
                <div className={classes.senderChatWrapper}>
                  <Avatar style={{ marginRight: "10px" }}>TL</Avatar>
                  <Box className={classes.senderBox}>
                    <TextareaAutosize
                      readOnly
                      className={classes.textAreaChat}
                      style={{ color: "#263238" }}
                      value={"Lorem ipsum  Lorem ipsum".replace(/\n$/, "")}
                    />
                    <Typography variant="caption" className={classes.time}>
                      Sept. 12, 2019 10:30 AM
                    </Typography>
                  </Box>
                </div>
                {/* End Sender  */}

                {/* Receiver */}
                <div className={classes.receiverChatWrapper}>
                  <Box className={classes.receiverBox}>
                    <TextareaAutosize
                      readOnly
                      className={classes.textAreaChat}
                      style={{ color: "#fff" }}
                      value={"Lorem ipsum  Lorem ipsum".replace(/\n$/, "")}
                    />
                    <Typography variant="caption" className={classes.time}>
                      Sept. 12, 2019 10:30 AM
                    </Typography>
                  </Box>
                </div>
                {/* End Receiver */}

              </div>
            </div>
            {/* End Chatbox */}
          </div>

          {/* Message Box */}
          <div style={{ height: "auto" }}>
            <Divider />
            <div className={classes.messageWrapper}>
              <IconButton style={{ marginRight: 4 }}>
                <AttachFileIcon />
              </IconButton>
              <TextField
                variant="outlined"
                multiline
                rowsMax="4"
                fullWidth
                placeholder="Send Message"
                color="primary"
                style={{ marginRight: 5 }}

                value={this.props.senderText}
                onChange={(e) => this.props.setChatText(e.target.value)}
                
              />
              <IconButton onClick={()=>this.props.sendChat()}>
                <SendIcon />
              </IconButton>
            </div>
          </div>
          {/* End Message Box  */}
        </Paper>
      </Grid>
    );
  }
}

export default withStyles(styles)(ChatPageBox);
