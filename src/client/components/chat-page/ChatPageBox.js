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

class ChatPageBox extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid item md={6} xs={8} style={{ height: "800px", maxHeight: "800px" }}>
        {/* CHATBOX HEADER*/}
        <Paper>
          <div className={classes.chatBoxHeader}>
            <Avatar style={{ marginRight: 10 }}>TL</Avatar>
            <div>
              <Typography variant="body"> Trizha Kate Longaza</Typography>
              <div className={classes.activeNowWrapper}>
                <div className={classes.activeNowCircle} />
                <Typography variant="subtitle2" style={{ marginTop: 2 }}>
                  Active Now
                </Typography>
              </div>
            </div>
          </div>
          <Divider />
          {/* END CHATBOX HEADER*/}
          {/* MAIN CHATBOX */}
          <div className={`${classes.chatBoxContainer} ${classes.scrollBar}`}>
            {/* SENDER */}
            <div className={classes.senderChatWrapper}>
              <Avatar style={{ marginRight: "10px" }}>TL</Avatar>
              <Box className={classes.senderBox}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                ante urna, suscipit eu tincidunt non, dictum quis arcu.
                <Typography variant="caption" className={classes.time}>
                  Sept. 12, 2019 10:30 AM
                </Typography>
              </Box>
            </div>
            {/* END SENDER */}

            {/* RECEIVER */}
            <div className={classes.receiverChatWrapper}>
              <Box className={classes.receiverBox}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
                ante urna, suscipit eu tincidunt non, dictum quis arcu.
                <Typography variant="caption" className={classes.time}>
                  Sept. 12, 2019 10:30 AM
                </Typography>
              </Box>
            </div>
            {/* RECEIVER */}
          </div>
          {/* END CHAT BOX */}
          <Divider />
          <div className={classes.messageWrapper}>
            <IconButton style={{ marginRight: 4 }}>
              <AttachFileIcon />
            </IconButton>
            <TextField
              variant="outlined"
              multiline
              rowsMax="3"
              fullWidth
              placeholder="Send Message"
              color="primary"
              style={{ marginRight: 5 }}
              autoFocus
            />
            <IconButton>
              <SendIcon />
            </IconButton>
          </div>
        </Paper>
      </Grid>
    );
  }
}

export default withStyles(styles)(ChatPageBox);
