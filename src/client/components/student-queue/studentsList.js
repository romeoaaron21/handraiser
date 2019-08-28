import React, { PureComponent } from "react";

import { withStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import MoveToQueue from "@material-ui/icons/AddToQueue";
import {
  Paper,
  Typography,
  Avatar,
  ListItem,
  ListItemAvatar,
  InputBase,
  IconButton,
  Tooltip
} from "@material-ui/core";

import api from "../../services/fetchApi";

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
    marginTop: "5px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#f1f1f1",
      minHeight: 51
    },
    "&:hover .actionShow": {
      display: "inline-block"
    }
  },
  queueAction: {
    display: "none"
  },
  responsive: {
    "@media (max-width: 425px)": {
      padding: "3px",
      fontSize: "14px"
    }
  },
  actionIcon: {
    cursor: "pointer",
    color: "#91a1af",
    fontSize: "18px",
    "@media (max-width: 425px)": {
      fontSize: "14px"
    }
  },
  chatList: {
    maxHeight: "250px",
    minHeight: "306px",
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
  ab: {
    width: "8px",
    height: "8px"
  },
  cd: {
    display: "inline-block"
  },
  online: {
    borderRadius: "50%",
    backgroundColor: "#43a047",
    marginRight: "10px"
  },
  offline: {
    borderRadius: "50%",
    backgroundColor: "#ababab",
    marginRight: "10px"
  }
});

class ChatList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.cohort_id,
      students: [],
      search: ""
    };
  }

  componentDidMount() {
    api.fetch(`/api/cohort/${this.state.id}/members/list`, "get").then(res => {
      this.setState({
        students: res.data.students
      });
    });
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
              placeholder="Search Students"
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

          {this.state.students.map(student => {
            if (this.state.search) {
              if (
                student.first_name
                  .toLowerCase()
                  .includes(this.state.search.toLowerCase()) ||
                student.last_name
                  .toLowerCase()
                  .includes(this.state.search.toLowerCase())
              ) {
                return (
                  <ListItem className={classes.list} key={student.id}>
                    <ListItemAvatar>
                      <Avatar
                        src={student.avatar}
                        className={classes.userAvatar}
                      />
                    </ListItemAvatar>
                    <div className={classes.multiline}>
                      <Typography className={classes.chatName}>
                        {student.first_name + " " + student.last_name}
                      </Typography>
                    </div>
                    <div className={`${classes.queueAction} actionShow`}>
                      <Tooltip title="Move To Queue" placement="top">
                        <IconButton className={classes.responsive}>
                          <MoveToQueue className={classes.actionIcon} />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </ListItem>
                );
              }
            } else {
              return (
                <ListItem className={classes.list} key={student.id}>
                  <ListItemAvatar>
                    <Avatar
                      src={student.avatar}
                      className={classes.userAvatar}
                    />
                  </ListItemAvatar>
                  <div className={classes.multiline}>
                    <Typography className={classes.chatName}>
                      {student.first_name + " " + student.last_name}
                    </Typography>
                  </div>
                  <div className={`${classes.queueAction} actionShow`}>
                    <Tooltip title="Move To Queue" placement="top">
                      <IconButton className={classes.responsive}>
                        <MoveToQueue className={classes.actionIcon} />
                      </IconButton>
                    </Tooltip>
                  </div>
                </ListItem>
              );
            }
          })}
          {/* End Chat List */}

          {/* End No Message Display */}
        </Paper>
        {/* End Chat List Container*/}
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(ChatList);
