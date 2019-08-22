import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Handraise from "@material-ui/icons/PanTool";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

const styles = theme => ({
  raiseBtn: {
    backgroundColor: "#983cac",
    "&:hover": {
      backgroundColor: "#780aaf"
    },
    "@media (max-width: 425px)": {
      display: "none"
    }
  },
  raiseHand: {
    cursor: "pointer",
    color: "#91a1af",
    fontSize: "35px",
    marginRight: -12,
    "@media (min-width: 425px)": {
      display: "none"
    }
  },
  userAvatar: {
    width: 56,
    height: 56,
    marginRight: 6,
    "@media (max-width: 425px)": {
      width: 35,
      height: 35,
      marginLeft: -15
    }
  },
  responsiveHeader: {
    "@media (max-width: 425px)": {
      fontSize: "16px",
      marginLeft: -25
    }
  },
  responsive: {
    "@media (max-width: 425px)": {
      fontSize: "17px"
    }
  }
});

class StudentHeader extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div>
        <Box item xs={12} sm={12}>
          <Typography
            variant="h5"
            component="h3"
            align="center"
            className={classes.responsive}
          >
            {this.props.user.name.charAt(0).toUpperCase() +
              this.props.user.name.slice(1)}
          </Typography>
          <ListItem>
            <ListItemAvatar>
              <Avatar
                src={this.props.user.avatar}
                className={classes.userAvatar}
              />
            </ListItemAvatar>
            <ListItemText>
              <Typography
                variant="h6"
                component="h3"
                className={classes.responsiveHeader}
              >
                {this.props.user.first_name.charAt(0).toUpperCase() +
                  this.props.user.first_name.slice(1)}{" "}
                {this.props.user.last_name.charAt(0).toUpperCase() +
                  this.props.user.last_name.slice(1)}
              </Typography>
            </ListItemText>
            {this.props.privilege === "student" ? (
              <div>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.raiseBtn}
                  disabled={this.props.btn}
                  onClick={this.props.requestHelp}
                >
                  {this.props.raise}
                </Button>
                <Tooltip
                  title="Help Student"
                  placement="top"
                  className={classes.raiseHand}
                >
                  <IconButton
                    className={classes.responsive}
                    // onClick={e => {
                    //   this.props.helpStudent();
                    // }}
                  >
                    <Handraise className={classes.raiseHand} />
                  </IconButton>
                </Tooltip>
              </div>
            ) : null}
          </ListItem>
        </Box>
      </div>
    );
  }
}

export default withStyles(styles)(StudentHeader);
