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
            Boom Camp Spring 2019
          </Typography>
          <ListItem>
            <ListItemAvatar>
              <Avatar
                src="https://lh6.googleusercontent.com/-_OuXadnBbqs/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rfEr_FE92jf3RrOO98KilrRcrinvw/s96-c/photo.jpg"
                className={classes.userAvatar}
              />
            </ListItemAvatar>
            <ListItemText>
              <Typography
                variant="h6"
                component="h3"
                className={classes.responsiveHeader}
              >
                Marvin Banton
              </Typography>
            </ListItemText>
            <Button
              variant="contained"
              color="primary"
              className={classes.raiseBtn}
            >
              Raise hand
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
          </ListItem>
        </Box>
      </div>
    );
  }
}

export default withStyles(styles)(StudentHeader);
