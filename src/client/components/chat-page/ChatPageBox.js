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
import { connectableObservableDescriptor } from "rxjs/internal/observable/ConnectableObservable";

import TypingEffect from "../chat-box/typingEffect";
import GroupIcon from "@material-ui/icons/Group";

class ChatPageBox extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  //Start of Added Scroll Bottom
  // messagesEndRef = React.createRef();

  // componentDidMount() {
  //   this.scrollToBottom();
  // }
  // scrollToBottom = () => {
  //   this.messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  // };
  //End of Added Scroll Bottom

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
                {this.props.chatmateInfo.avatar === undefined ?
                  <Avatar style={{ marginRight: 10 }}> <GroupIcon /> </Avatar>
                  :
                  <Avatar style={{ marginRight: 10 }} src={this.props.chatmateInfo.avatar} />
                }

                <div>
                  <Typography variant="body">
                    {this.props.chatmateInfo.first_name === undefined ?
                      this.props.chatmateInfo.name
                      :
                      `${this.props.chatmateInfo.first_name} ${this.props.chatmateInfo.last_name}`
                    }
                  </Typography>
                  {this.props.chatmateInfo.status === 'active' ?
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


                {this.props.conversation.map((convo, i) => (
                  convo.sender_id === this.props.userInfo.sub && this.props.chatmateInfo.sub === convo.chatmate_id ||
                    convo.chatmate_id === this.props.userInfo.sub && this.props.chatmateInfo.sub === convo.sender_id ?

                    <React.Fragment key={i}>
                      {convo.cohort_id === "all" ? (
                        <div className={convo.sender_id !== this.props.userInfo.sub ? classes.senderChatWrapper : classes.receiverChatWrapper}>

                          {convo.sender_id !== this.props.userInfo.sub ?
                            <Avatar style={{ marginRight: "10px" }} src={this.props.chatmateInfo.avatar} />
                            : null
                          }


                          <Box className={convo.sender_id !== this.props.userInfo.sub ? classes.senderBox : classes.receiverBox}>
                            <TextareaAutosize
                              readOnly
                              className={classes.textAreaChat}
                              style={convo.sender_id !== this.props.userInfo.sub ? { color: "#263238" } : { color: "#fff" }}
                              value={convo.message.replace(/\n$/, "")}
                            />
                            <Typography variant="caption" className={classes.time}>
                              {convo.time}
                            </Typography>
                          </Box>
                        </div>
                      ) :
                        null}
                    </React.Fragment>
                    :
                    null
                ))}
                {this.props.chatmateText.length > 0 ?
                  <TypingEffect />
                  :
                  null
                }

                {/* <div ref={this.messagesEndRef}>asdasd</div> */}

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
                onClick={() => this.props.displayBadge(this.props.chatmateInfo.sub)}
                onKeyUp={(e) => {
                  if (e.target.value
                    .replace(/^\s+/, "")
                    .replace(/\s+$/, "") !== "") {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      this.props.sendChat()
                    }
                  }
                }}

              />
              <IconButton
                onClick={() => this.props.sendChat()}
                disabled={
                  this.props.senderText.replace(/^\s+/, "")
                    .replace(/\s+$/, "") === ""
                    ? true
                    : false
                }
              >
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
