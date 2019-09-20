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
import CreateIcon from "@material-ui/icons/Create";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
import Grid from "@material-ui/core/Grid";
import Badge from "@material-ui/core/Badge";
import MessageIcon from "@material-ui/icons/Message";
import GroupIcon from "@material-ui/icons/Group";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";

import api from "../../services/fetchApi";
import { Tooltip } from "@material-ui/core";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box>{children}</Box>
    </Typography>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`
  };
}
class ChatPageList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      searchChatName: "",
      value: 0
    };
  }

  convoMessage = (chatListSub, need) => {
    // console.log(chatListSub, need)
    let conversation = [];
    this.props.conversation.map(convo => {
      if (convo.cohort_id === "all") {
        if (
          (convo.sender_id === this.props.sub &&
            convo.chatmate_id === chatListSub) ||
          (convo.chatmate_id === this.props.sub &&
            convo.sender_id === chatListSub)
        ) {
          conversation.push(convo);
        }
      }
      // return conversation
    });
    if (conversation.length !== 0) {
      if (need === "message") {
        return conversation[conversation.length - 1].message;
      } else if (need === "time") {
        let display = conversation[conversation.length - 1].time.split(" ");
        return `${display[3]} ${display[4]}`;
      }
    } else {
      if (need === "message") {
        return "No conversation";
      }
    }
  };

  searchChatName = searchChatName => {
    this.setState({ searchChatName });
  };

  unreadChat = studentSub => {
    let count = 0;
    this.props.conversation.map(convo => {
      if (convo.cohort_id === "all") {
        if (
          convo.chatmate_id === this.props.sub &&
          convo.sender_id === studentSub
        ) {
          if (convo.seen === 0) {
            count = count + 1;
          }
        }
      }
    });
    return count;
  };

  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
  };

  render() {
    // console.log(this.props.chatListInfo)
    const { classes } = this.props;
    return (
      <Grid item md={3} xs={4}>
        <Paper>
          <div style={{ padding: 13 }}>
            <div className={classes.chatListHeader}>
              <span className={classes.avatarWrapper}>
                <Avatar
                  style={{ marginRight: "10px" }}
                  src={this.props.userInfo.avatar}
                >
                  ME
                </Avatar>
                <Typography variant="h5">Messages</Typography>
              </span>
              <Hidden xsDown>
                <IconButton>
                  <CreateIcon />
                </IconButton>
              </Hidden>
            </div>
            <div>
              <TextField
                onChange={e => this.searchChatName(e.target.value)}
                id="outlined-search"
                label="Search Name"
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

          <Tabs
            value={this.state.value}
            variant="fullWidth"
            onChange={this.handleChange}
            aria-label="simple tabs example"
          >
            <Tab icon={<MessageIcon />} {...a11yProps(0)} />
            <Tab icon={<GroupIcon />} {...a11yProps(1)} />
          </Tabs>
          <div className={`${classes.scrollBar} ${classes.chatListWrapper}`}>
            <TabPanel value={this.state.value} index={0}>
              <List>
                {this.props.chatListInfo.length !== 0
                  ? this.props.chatListInfo.map((chatmate, i) => {
                      if (
                        chatmate.first_name
                          .toLowerCase()
                          .includes(this.state.searchChatName.toLowerCase()) ||
                        chatmate.last_name
                          .toLowerCase()
                          .includes(this.state.searchChatName.toLowerCase())
                      ) {
                        return (
                          <React.Fragment key={i}>
                            <ListItem
                              alignItems="flex-start"
                              button
                              onClick={() => {
                                this.props.changeChatmate(chatmate.sub);
                                this.props.displayBadge(chatmate.sub);
                                this.props.selectChatmate(chatmate.sub)
                              }}
                            >
                              <Hidden only="xs">
                                <ListItemAvatar style={{ marginTop: "-0.2px" }}>
                                  <Avatar src={chatmate.avatar} />
                                </ListItemAvatar>
                                <div className={classes.chatDetails}>
                                  <div style={{ width: "80%" }}>
                                    <Typography variant="body1">
                                      {`${chatmate.first_name} ${chatmate.last_name}`}
                                    </Typography>
                                    <Typography
                                      variant="subtitle2"
                                      className={classes.chatPrev}
                                    >
                                      {this.convoMessage(
                                        chatmate.sub,
                                        "message"
                                      )}
                                    </Typography>
                                  </div>

                                  <div className={classes.timeBadgeWrap}>
                                    <Typography variant="caption">
                                      {this.convoMessage(chatmate.sub, "time")}
                                    </Typography>
                                    <div style={{ marginTop: 3 }}>
                                      <Badge
                                        badgeContent={10}
                                        color="secondary"
                                        badgeContent={this.unreadChat(
                                          chatmate.sub
                                        )}
                                        invisible={
                                          this.unreadChat(chatmate.sub) === 0
                                            ? true
                                            : false
                                        }
                                      />
                                    </div>
                                  </div>
                                </div>
                              </Hidden>
                              <Hidden smUp>
                                <div className={classes.smBP}>
                                  <Avatar src={chatmate.avatar} />
                                  <Badge
                                        badgeContent={10}
                                        color="secondary"
                                        badgeContent={this.unreadChat(
                                          chatmate.sub
                                        )}
                                        invisible={
                                          this.unreadChat(chatmate.sub) === 0
                                            ? true
                                            : false
                                        }
                                      />
                                </div>
                              </Hidden>
                            </ListItem>
                            <Divider />
                          </React.Fragment>
                        );
                      }
                    })
                  : null}
              </List>
            </TabPanel>
            <TabPanel value={this.state.value} index={1}>
              <List>
                <React.Fragment>
                  <ListItem alignItems="flex-start" button>
                    <Hidden only="xs">
                      <ListItemAvatar style={{ marginTop: "-0.2px" }}>
                        <Avatar> <GroupIcon/> </Avatar>
                      </ListItemAvatar>
                      <div className={classes.chatDetails}>
                        <div style={{ width: "80%" }}>
                          <Typography variant="body1">bmsrc-dev</Typography>
                          <Typography
                            variant="subtitle2"
                            className={classes.chatPrev}
                          >
                            Handraiser team update: We're still working on
                            finishing the chat feature. We're also making
                            changes to the design so as to not make the users
                            confused on some features. Some other updates: 1.
                            Used Firebase as storage for the uploaded images. 2.
                            Unsplash feature is almost done.
                          </Typography>
                        </div>

                        <div className={classes.timeBadgeWrap}>
                          <Typography variant="caption">12:35 A.M</Typography>
                          <div style={{ marginTop: 3 }}>
                            <Badge color="secondary" badgeContent={1} />
                          </div>
                        </div>
                      </div>
                    </Hidden>
                    <Hidden smUp>
                      <div className={classes.smBP}>
                        <Avatar> <GroupIcon/> </Avatar>
                        <Badge badgeContent={10} color="secondary" />
                      </div>
                    </Hidden>
                  </ListItem>
                  <Divider />
                  
                </React.Fragment>
              </List>
            </TabPanel>
          </div>
        </Paper>
      </Grid>
    );
  }
}

export default withStyles(styles)(ChatPageList);
