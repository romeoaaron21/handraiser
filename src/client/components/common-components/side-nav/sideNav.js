import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import MailIcon from "@material-ui/icons/Mail";

//AUTH
import Auth from "../../../auth/Auth";
import AuthService from "../../../auth/AuthService";
import { Typography, Avatar } from "@material-ui/core";
const drawerWidth = 240;

const styles = theme => ({
  drawer: {
    width: 0,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth,
    boxShadow:
      "0 4px 0 rgba(60,64,67,0.302), 0 8px 12px 6px rgba(60,64,67,0.149)"
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  purpleAvatar: {
    color: "#fff",
    backgroundColor: "#673ab7"
  }
});

class SideNav extends React.Component {
  constructor() {
    super();

    this.Auth = new AuthService();
    this.fetch = this.Auth.getFetchedTokenAPI();

    this.state = {
      user: []
    };
  }
  componentDidMount() {
    this.fetch.then(fetch => {
      const user = fetch.data.user[0];
      this.setState({ user });
    });
  }
  handleDrawerClose = () => {
    this.props.handleDrawerCloseFn();
  };

  render() {
    const { classes } = this.props;

    return (
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={this.props.open}
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={this.handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          {["Classes"].map(text => (
            <ListItem button key={text}>
              <ListItemIcon>
                {text === "Classes" ? <HomeIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <Typography
          style={{
            padding: "10px 0px 0px 10px",
            color: "gray",
            textTransform: "uppercase",
            fontSize: "12px"
          }}
          variant="subtitle2"
        >
          Enrolled
        </Typography>
        <List>
          {["BoomCampSpring", "react", "Nodejs", "Php"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {" "}
                <Avatar className={classes.purpleAvatar}>
                  {text.charAt(0).toUpperCase()}
                </Avatar>
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    );
  }
}

export default withStyles(styles)(SideNav);
