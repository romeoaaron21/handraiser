import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";

const styles = theme => ({
  leftNav: {
    padding: theme.spacing(2, 3),
    maxWidth: "auto",
    maxheigth: "310px",
    // boxShadow: ' 0px 0px 3px 0px rgba(176,173,176,1)',
    boxShadow:
      "0 1px 2px 0 rgba(60,64,67,0.302), 0 2px 6px 2px rgba(60,64,67,0.149)"
  },
  list: {
    maxHeight: "52px",
    marginTop: "15px"
  },
  userAvatar: {
    width: 35,
    height: 35,
    "@media (max-width: 425px)": {
      width: 29,
      height: 29,
      marginLeft: -15
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
  }
});

class BeingHelped extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <Paper className={classes.leftNav}>
          <Typography
            variant="h6"
            align="center"
            className={classes.responsiveHeader}
          >
            Being helped
          </Typography>
          <ListItem className={classes.list}>
            <ListItemAvatar>
              <Avatar
                src={this.props.helpingStudent.avatar}
                className={classes.userAvatar}
              />
            </ListItemAvatar>
            {this.props.helpingStudent ? (
              <ListItemText>
                <Typography component="p" className={classes.queueName}>
                  {this.props.helpingStudent.first_name
                    .charAt(0)
                    .toUpperCase() +
                    this.props.helpingStudent.first_name.slice(1)}{" "}
                  {this.props.helpingStudent.last_name.charAt(0).toUpperCase() +
                    this.props.helpingStudent.last_name.slice(1)}
                </Typography>
              </ListItemText>
            ) : null}
          </ListItem>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(BeingHelped);
