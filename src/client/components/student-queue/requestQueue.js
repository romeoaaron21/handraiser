import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Tooltip from "@material-ui/core/Tooltip";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Delete from "@material-ui/icons/Delete";
import ThumbsUp from "@material-ui/icons/PanTool";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import MuiExpansionPanel from "@material-ui/core/ExpansionPanel";
import MuiExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import MuiExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import KeyBoardDown from "@material-ui/icons/KeyboardArrowDown";
import EmptyQueue from "../../images/student-svg.png";

const styles = theme => ({
  rightNav: {
    padding: theme.spacing(0, 1),
    maxWidth: "auto",
    // boxShadow: ' 0px 0px 3px 0px rgba(176,173,176,1)',
    boxShadow:
      "0 1px 2px 0 rgba(60,64,67,0.302), 0 2px 6px 2px rgba(60,64,67,0.149)",
    overflowY: "scroll",
    borderBottomRightRadius: "5px",
    borderBottomLeftRadius: "5px"
  },
  rightTopNav: {
    padding: theme.spacing(2, 3),
    maxWidth: "auto",
    boxShadow: " 0px 0px 3px 0px rgba(176,173,176,1)",
    borderTopRightRadius: "5px",
    borderTopLeftRadius: "5px",
    background: "#edeeef",
    color: "#6d6568"
  },
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
  actionIcon: {
    cursor: "pointer",
    color: "#91a1af",
    fontSize: "18px",
    "@media (max-width: 425px)": {
      fontSize: "14px"
    }
  },
  icon: {
    fontSize: "26px",
    cursor: "pointer",
    color: "91a1af",
    "@media (max-width: 425px)": {
      fontSize: "20px"
    }
  },
  queueaction: {
    display: "none"
  },
  queueName: {
    fontSize: "17px",
    "@media (max-width: 425px)": {
      fontSize: "13px",
      marginLeft: -18,
      width: "120px"
    }
  },
  userAvatar: {
    width: 35,
    height: 35,
    "@media (max-width: 425px)": {
      width: 29,
      height: 29
    }
  },
  emptyQueue: {
    marginTop: 60,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    "@media (max-width: 425px)": {
      marginTop: 130
    }
  },
  emptyImgSize: {
    "@media (max-width: 425px)": {
      width: 220,
      height: 200
    }
  },
  responsive: {
    "@media (max-width: 425px)": {
      padding: "3px",
      fontSize: "14px"
    }
  },
  responsiveHeader: {
    "@media (max-width: 425px)": {
      fontSize: "16px"
    }
  }
});

const ExpansionPanel = withStyles({
  root: {
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0
    },
    "&:before": {
      display: "none"
    },
    "&$expanded": {
      margin: "auto"
    }
  },
  expanded: {}
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    borderTop: "1px solid rgba(0, 0, 0, .125)",
    padding: "0 5px 0 17px",
    maxHeight: 51,
    "&$expanded": {
      maxHeight: 51
    },
    "&:hover": {
      backgroundColor: "#f1f1f1",
      maxHeight: "51px"
    },
    "&:hover .actionShow": {
      display: "inline-block"
    }
  },
  content: {
    "&$expanded": {
      margin: "12px 0"
    },
    alignItems: "center",
    maxHeight: "51px"
  },
  expanded: {}
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles(theme => ({
  root: {
    padding: theme.spacing(1),
    margin: "13px",
    textAlign: "justify"
  }
}))(MuiExpansionPanelDetails);

class requestQueue extends Component {
  constructor() {
    super();
    this.state = {
      expanded: " "
    };
  }

  handleChange = panel => () => {
    if (panel === this.state.expanded) {
      this.setState({ expanded: "" });
    } else {
      this.setState({ expanded: panel });
    }
  };

  render() {
    const { classes } = this.props;
    const insideCohort = this.props.members.filter(
      member => member.cohort_id === parseInt(this.props.cohort_id)
    );
    return (
      <div>
        <Paper className={classes.rightTopNav} square={true}>
          <Typography
            variant="h6"
            align="center"
            className={classes.responsiveHeader}
          >
            Queue Students
          </Typography>
        </Paper>
        <Paper
          className={`${classes.rightNav} ${classes.scrollBar}`}
          square={true}
          style={
            this.props.priv === "mentor"
              ? { minHeight: "570px", maxHeight: "570px" }
              : { minHeight: "455px", maxHeight: "520px" }
          }
        >
          {insideCohort.length !== 0 ? (
            <Box item="true" xs={12} sm={8} mt={2}>
              <Grid container>
                {this.props.members.length > 0 ? (
                  this.props.members.map(member =>
                    member.status === "waiting" &&
                    parseInt(this.props.cohort_id) ===
                      parseInt(member.cohort_id) ? (
                      <Grid item style={{ width: "100%" }} key={member.id}>
                        <ExpansionPanel
                          expanded={this.state.expanded === member.id}
                        >
                          <ExpansionPanelSummary>
                            <ListItemAvatar>
                              <Avatar
                                src={member.avatar}
                                className={classes.userAvatar}
                              />
                            </ListItemAvatar>
                            <ListItemText>
                              <Typography
                                variant="h6"
                                component="h3"
                                className={classes.queueName}
                              >
                                {member.first_name.charAt(0).toUpperCase() +
                                  member.first_name.slice(1)}{" "}
                                {member.last_name.charAt(0).toUpperCase() +
                                  member.last_name.slice(1)}
                              </Typography>
                            </ListItemText>

                            {member.privilege === "student" &&
                            member.sub === this.props.sub ? (
                              <Tooltip title="Cancel Request" placement="top">
                                <IconButton
                                  className={classes.responsive}
                                  onClick={() =>
                                    this.props.removeStudentRequest(member.id)
                                  }
                                > 
                                  <Delete className={classes.actionIcon} />
                                </IconButton>
                              </Tooltip>
                            ) : null}

                            {this.props.priv === "mentor" ? (
                              <div
                                className={`${classes.queueaction} actionShow`}
                              >
                                <Tooltip title="See Details" placement="top">
                                  <IconButton
                                    className={classes.responsive}
                                    onClick={this.handleChange(member.id)}
                                  >
                                    <KeyBoardDown className={classes.icon} />
                                  </IconButton>
                                </Tooltip>

                                <Tooltip title="Help Student" placement="top">
                                  <IconButton
                                    className={classes.responsive}
                                    onClick={() => {
                                      // console.log(this.props.assist_id)
                                      this.props.helpStudent(member.id, this.props.assist_id);
                                      this.props.sendChatSub(member.sub);
                                    }}
                                  >
                                    <ThumbsUp className={classes.actionIcon} />
                                  </IconButton>
                                </Tooltip>

                                <Tooltip title="Remove Request" placement="top">
                                  <IconButton
                                    className={classes.responsive}
                                    onClick={() => {
                                      this.props.removeStudentRequest(
                                        member.id
                                      );
                                    }}
                                  >
                                    <Delete className={classes.actionIcon} />
                                  </IconButton>
                                </Tooltip>
                              </div>
                            ) : null}
                          </ExpansionPanelSummary>

                          <ExpansionPanelDetails>
                            <Typography className={classes.responsive}>
                              {member.reason}
                            </Typography>
                          </ExpansionPanelDetails>
                        </ExpansionPanel>
                      </Grid>
                    ) : this.props.members.filter(
                        member =>
                          member.status === "waiting" &&
                          member.cohort_id === parseInt(this.props.cohort_id)
                      ).length === 0 ? (
                      <Grid container className={classes.emptyQueue}>
                        <img
                          src={EmptyQueue}
                          alt="img"
                          width="280"
                          height="250"
                        />
                        <Typography variant="overline" display="block">
                          No one needs help...
                        </Typography>
                      </Grid>
                    ) : null
                  )
                ) : (
                  <Grid container className={classes.emptyQueue}>
                    <img src={EmptyQueue} alt="img" width="280" height="250" />
                    <Typography variant="overline" display="block">
                      No one needs help...
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Box>
          ) : (
            <Grid container className={classes.emptyQueue}>
              <img
                src={EmptyQueue}
                className={classes.emptyImgSize}
                alt="img"
                width="280"
                height="250"
              />
              <Typography variant="overline" display="block">
                No one needs help...
              </Typography>
            </Grid>
          )}
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(requestQueue);
