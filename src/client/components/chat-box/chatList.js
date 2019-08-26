import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import EmptyQueue from "../../images/empty.svg";
import moment from 'moment-timezone'
import {
  Paper,
  Grid,
  Typography,
  Avatar,
  ListItem,
  ListItemAvatar,
  InputBase
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
  }
});

class ChatList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  timeDisplay = times => {
    let date = moment(times).format("L");
    let time = moment(times).format("LT");

    let hour = time.split(":")[0];
    let minute = time.split(":")[1].split(" ");
    let minutes = minute[0];
    let month = date.split("/")[0];
    let dates = date.split("/")[1];
    let year = date.split("/")[2];

    let calendar = `${year}-${month}-${dates}`;
    let clock = `${hour}:${minutes}`;

    return moment.tz(`${calendar} ${clock}`, "Asia/Taipei").format("LT");
  };


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
              placeholder="Search Mentor"
              inputProps={{ "aria-label": "naked" }}
              fullWidth
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

          {this.props.mentor
            ? this.props.mentor.map(mentor => (
                <ListItem
                  className={classes.list}
                  onClick={this.props.allowChat ? this.props.sendChatSub : null}
                  key={mentor.sub}
                >
                  <ListItemAvatar>
                    <Avatar
                      src={mentor.avatar}
                      className={classes.userAvatar}
                    />
                  </ListItemAvatar>
                  
                    {this.props.conversation.map(convo => (
                      convo === this.props.conversation[this.props.conversation.length-1]?
                      <React.Fragment>
                      <div className={classes.multiline}>
                      <Typography className={classes.chatName}>
                        {mentor.first_name} {mentor.last_name}
                      </Typography>
                        <Typography className={classes.chatDetails}>
                          {convo.message}
                        </Typography>
                        </div>
                        <div classname={classes.chatAction}>
                          <Typography className={classes.chatTime}>
                          {" "}
                          {this.timeDisplay(convo.time)}{" "}
                          </Typography>
                        </div>
                        </React.Fragment>
                      :
                      null
                    ))}
                  
                </ListItem>
              ))
            : null}
        </Paper>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(ChatList);
