import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./ChatPageStyle";
import Paper from "@material-ui/core/Paper";

//CHATLIST
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import CreateIcon from "@material-ui/icons/Create";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
import Grid from "@material-ui/core/Grid"

import api from "../../services/fetchApi";

class ChatPageList extends PureComponent {
  constructor(props) {
    super(props);
  }


  convoMessage = (chatListSub, need) => {
    // console.log(chatListSub, need)
    let conversation = [];
    this.props.conversation.map(convo => {
      if (convo.cohort_id === 'all') {
        if ((convo.sender_id === this.props.sub && convo.chatmate_id === chatListSub) ||
          (convo.chatmate_id === this.props.sub && convo.sender_id === chatListSub)) {
          conversation.push(convo)
        }
      }
      // return conversation
    })
    if (conversation.length !== 0) {
      if (need === 'message') {
        return conversation[conversation.length - 1].message
      }
      else if (need === 'time') {
        let display = conversation[conversation.length - 1].time.split(" ");
        return `${display[3]} ${display[4]}`;
      }
    }
    else {
      if (need === 'message') {
        return 'No conversation'
      }
    }
  }

  render() {
    // console.log(this.props.chatListInfo)
    const { classes } = this.props;
    return (
      <Grid item md={3} xs={4}>
        <Paper>
          <div style={{ padding: 13 }}>
            <div className={classes.chatListHeader}>
              <span className={classes.avatarWrapper}>
                <Avatar style={{ marginRight: "10px" }}>
                  ME
              </Avatar>
                <Typography variant="h5">Chats</Typography>
              </span>
              <Hidden xsDown>
                <IconButton>
                  <CreateIcon />
                </IconButton>
              </Hidden>
            </div>
            <div>
              <TextField
                id="outlined-search"
                label="Search"
                inputProps={{
                  style: {
                    height: "4px"
                  }
                }}
                InputLabelProps={{
                  style: {
                    height: "3px",
                    marginTop: -6
                  }
                }}
                fullWidth
                margin="normal"
                variant="outlined"
              />
            </div>
          </div>
          <Divider />

          <div className={`${classes.scrollBar} ${classes.chatListWrapper}`}>
            <List>
              {this.props.chatListInfo.length !== 0 ?
                this.props.chatListInfo.map((chatmate, i) => (
                  <React.Fragment key = {i}>
                  <ListItem alignItems="flex-start" button>
                    <Hidden only="xs">
                      <ListItemAvatar>
                        <Avatar src={chatmate.avatar}/>
                      </ListItemAvatar>
                      <ListItemText primary={`${chatmate.first_name} ${chatmate.last_name}`} secondary={this.convoMessage(chatmate.sub, 'message')}>
                      </ListItemText>
                    </Hidden>
                    <Hidden smUp>
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "center"
                        }}
                      >
                        <Avatar> TLasd </Avatar>
                      </div>
                    </Hidden>
                  </ListItem>
                  <Divider />
                  </React.Fragment>
                ))
                :
                null
              }

            </List>
          </div>
        </Paper>
      </Grid>
    );
  }
}

export default withStyles(styles)(ChatPageList);
