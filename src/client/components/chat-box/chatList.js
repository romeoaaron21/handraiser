import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import EmptyQueue from "../../images/empty.svg";
import {
  Paper,
  Grid,
  Typography,
  Avatar,
  ListItem,
  ListItemAvatar,
  InputBase,
  Badge
} from "@material-ui/core";

const styles = theme => ({
  scrollBar: {
    "&::-webkit-scrollbar": {
      width: "0.3em"
    },
    "&::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)"
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      borderRadius: "10px",
      outline: "1px solid slategrey"
    }
  },
  leftNav: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(1, 1),
    borderTopRightRadius: "5px",
    borderTopLeftRadius: "5px",
    boxShadow:
      "0 1px 2px 0 rgba(60,64,67,0.302), 0 2px 6px 2px rgba(60,64,67,0.149)"
  },
  list: {
    maxHeight: "52px",
    marginTop: "15px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#f1f1f1",
      minHeight: 51
    }
  },
  chatList: {
    maxHeight: "380px",
    minHeight: "380px",
    boxShadow:
      "0 1px 2px 0 rgba(60,64,67,0.302), 0 2px 6px 2px rgba(60,64,67,0.149)",
    overflowY: "scroll",
    borderBottomRightRadius: "5px",
    borderBottomLeftRadius: "5px"
  },
  emptyQueue: {
    marginTop: 65,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  },
  userAvatar: {
    width: 35,
    height: 35,
    "@media (max-width: 425px)": {
      width: 29,
      height: 29
    }
  },
  queueName: {
    fontSize: "17px",
    "@media (max-width: 425px)": {
      fontSize: "14px",
      marginLeft: -24
    }
  },
  responsiveHeader: {
    "@media (max-width: 425px)": {
      fontSize: "17px"
    }
  },
  search: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "5px 20px"
  },
  multiline: {
    marginTop: "10px",
    marginBottom: "10px",
    marginLeft: "-10px",
    flex: "1 1 auto",
    minWidth: 0
  },
  chatName: {
    fontWeight: 500,
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    "@media (max-width: 425px)": {
      fontSize: "15px"
    }
  },
  chatDetails: {
    color: "#546e7a",
    overflow: "hidden",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    "@media (max-width: 425px)": {
      fontSize: "14px"
    }
  },
  chatAction: {
    display: "flex",
    alignItems: "flex-end",
    marginLeft: "16px",
    flexDirection: "column",
    marginBottom: "10px"
  },
  chatTime: {
    color: "#546e7a",
    fontSize: "12px",
    fontWeight: 400,
    lineHeight: "18px",
    marginLeft: "14px",
    "@media (max-width: 425px)": {
      fontSize: "12px"
    }
  },

  chatBadge: {
    float: "right",
    marginRight: "12px",
    marginTop: "0px"
  }
});

class ChatList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      search: ""
    };
  }

  timeDisplay = time => {
    let display = time.split(" ");
    return `${display[3]} ${display[4]}`;
  };

  componentDidUpdate() {
    let count = 0;
    this.props.mentor.map(mentor =>
      this.props.conversation.map(convo => {
        if (
          this.props.sub === convo.chatmate_id &&
          mentor.sub === convo.sender_id
        ) {
          if (
            convo.seen === 0 &&
            convo.cohort_id === parseInt(this.props.cohort_id)
          ) {
            count = count + 1;
          }
        }
        return null;
      })
    );
    return this.setState({ count: count });
  }

  componentDidMount() {
    this.componentDidUpdate();
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        {/* Chat List Header*/}
        <Paper className={classes.leftNav} square={true}>
          <div className={classes.search}>
            <div className={classes.searchIcon} />
            <InputBase
              className={classes.margin}
              placeholder="Search Conversation"
              inputProps={{ "aria-label": "naked" }}
              fullWidth
              onChange={e => this.setState({ search: e.target.value })}
            />
            <SearchIcon style={{ color: "#8c929c" }} />
          </div>
        </Paper>
        {/* End Chat List Header*/}

        {/* Chat List Container*/}
        <Paper
          className={`${classes.chatList} ${classes.scrollBar}`}
          square={true}
        >
          {/* Chat List */}

          {this.props.mentor.map((mentor, i) => {
            if (this.state.search) {
                return (
                  <React.Fragment key={i}>
                    {this.props.conversation.length !== 0 ? (
                      this.props.conversation.map((convo, i) => {
                        if (convo.message.toLowerCase().includes(this.state.search.toLowerCase())) {
                          return (
                            (convo.sender_id === this.props.sub && convo.chatmate_id === this.props.mentor[0].sub) ||
                            (convo.chatmate_id === this.props.sub && convo.sender_id === this.props.mentor[0].sub && convo.cohort_id === parseInt(this.props.cohort_id)) ? (
                              <React.Fragment key={i}>
                                <ListItem
                                  className={classes.list}
                                  onClick={() => {
                                    this.props.sendChatSub();
                                    this.props.displayBadge("student");
                                    this.props.chatmateSub(mentor.sub)
                                  }}
                                >
                                  <ListItemAvatar>
                                    <Avatar
                                      src={mentor.avatar}
                                      className={classes.userAvatar}
                                    />
                                  </ListItemAvatar>
                                  <div className={classes.multiline}>
                                    <Typography className={classes.chatName}>
                                      {mentor.first_name} {mentor.last_name}
                                    </Typography>
                                    <Typography className={classes.chatDetails}>
                                      {convo.message}
                                    </Typography>
                                  </div>
                                  <div className={classes.chatAction}>
                                    <Typography className={classes.chatTime}>
                                      {" "}
                                      {this.timeDisplay(convo.time)}{" "}
                                    </Typography>
                                    <Typography className={classes.chatBadge}>
                                      <Badge
                                        color="secondary"
                                        badgeContent={this.state.count}
                                        invisible={
                                          this.props.priv === "student" &&
                                          this.state.count !== 0
                                            ? this.props.badge
                                            : true
                                        }
                                        className={classes.margin}
                                      ></Badge>
                                    </Typography>
                                  </div>
                                </ListItem>
                              </React.Fragment>
                            ) : null
                          );
                        }
                      })
                    ) : (
                      <Grid container className={classes.emptyQueue}>
                        <img
                          alt={"empty queue"}
                          src={EmptyQueue}
                          width="200"
                          height="180"
                        />
                        <Typography variant="overline" display="block">
                          No message available...
                        </Typography>
                      </Grid>
                    )}
                  </React.Fragment>
                );
            } else {
              return (
                <React.Fragment key={i}>
                  {this.props.conversation.length !== 0 ? (
                    this.props.conversation.map((convo, i) =>
                      convo ===
                      this.props.conversation[
                        this.props.conversation.length - 1
                      ] ? (
                        <React.Fragment key={i}>
                          {convo.cohort_id ===
                          parseInt(this.props.cohort_id) ? (
                            <ListItem
                              className={classes.list}
                              onClick={() => {
                                this.props.sendChatSub(mentor.sub);
                                this.props.displayBadge("student");
                              }}
                            >
                              <ListItemAvatar>
                                <Avatar
                                  src={mentor.avatar}
                                  className={classes.userAvatar}
                                />
                              </ListItemAvatar>
                              <div className={classes.multiline}>
                                <Typography className={classes.chatName}>
                                  {mentor.first_name} {mentor.last_name}
                                </Typography>
                                <Typography className={classes.chatDetails}>
                                  {(convo.sender_id === this.props.sub &&
                                    convo.chatmate_id ===
                                      this.props.mentor[0].sub) ||
                                  (convo.chatmate_id === this.props.sub &&
                                    convo.sender_id ===
                                      this.props.mentor[0].sub)
                                    ? convo.message
                                    : null}
                                </Typography>
                              </div>
                              <div className={classes.chatAction}>
                                <Typography className={classes.chatTime}>
                                  {" "}
                                  {this.timeDisplay(convo.time)}{" "}
                                </Typography>
                                <Typography className={classes.chatBadge}>
                                  {(convo.sender_id === this.props.sub &&
                                    convo.chatmate_id ===
                                      this.props.mentor[0].sub) ||
                                  (convo.chatmate_id === this.props.sub &&
                                    convo.sender_id ===
                                      this.props.mentor[0].sub) ? (
                                    <Badge
                                      color="secondary"
                                      badgeContent={this.state.count}
                                      invisible={
                                        this.props.priv === "student" &&
                                        this.state.count !== 0
                                          ? this.props.badge
                                          : true
                                      }
                                      className={classes.margin}
                                    ></Badge>
                                  ) : null}
                                </Typography>
                              </div>
                            </ListItem>
                          ) : null}
                        </React.Fragment>
                      ) : null
                    )
                  ) : (
                    <Grid container className={classes.emptyQueue}>
                      <img
                        alt={"empty queue"}
                        src={EmptyQueue}
                        width="200"
                        height="180"
                      />
                      <Typography variant="overline" display="block">
                        No message available...
                      </Typography>
                    </Grid>
                  )}
                </React.Fragment>
              );
            }
            return null;
          })}
        </Paper>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(ChatList);
