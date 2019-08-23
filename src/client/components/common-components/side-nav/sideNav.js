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
import AuthService from "../../../auth/AuthService";
import { Typography, Avatar } from "@material-ui/core";
import api from "../../../services/fetchApi";
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
      user: [],
      cohorts: [],
      members: []
    };
  }
  componentDidMount() {
    this.fetch.then(fetch => {
      const user = fetch.data.user[0];
      this.setState({ user });

      api.fetch(`/api/cohorts/api`, "get").then(res => {
        this.setState({
          cohorts: res.data.cohorts
        });
      });

      api.fetch(`/api/student/${user.id}/cohorts/`, "get").then(res => {
        this.setState({
          members: res.data.member
        });
      });
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
            <ListItem
              button
              key={text}
              onClick={() => (window.location.href = `/cohorts`)}
            >
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
          {this.state.user.privilege === "mentor" ? "My Classes" : "Enrolled"}
        </Typography>
        <List>
          {this.state.cohorts.map((cohort, index) =>
            this.state.members.filter(member => member.cohort_id === cohort.id)
              .length !== 0 ? (
              <ListItem
                button
                key={cohort.name}
                onClick={() => (window.location.href = `/queue/${cohort.id}`)}
              >
                <ListItemIcon>
                  <Avatar className={classes.purpleAvatar}>
                    {cohort.name.charAt(0).toUpperCase()}
                  </Avatar>
                </ListItemIcon>
                <ListItemText primary={cohort.name} />
              </ListItem>
            ) : this.state.user.id === cohort.mentor_id ? (
              <ListItem
                button
                key={cohort.name}
                onClick={() => (window.location.href = `/queue/${cohort.id}`)}
              >
                {console.log(this.state.user.id, cohort.mentor_id)}
                <ListItemIcon>
                  <Avatar className={classes.purpleAvatar}>
                    {cohort.name.charAt(0).toUpperCase()}
                  </Avatar>
                </ListItemIcon>
                <ListItemText primary={cohort.name} />
              </ListItem>
            ) : null
          )}
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
