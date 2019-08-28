import React, { PureComponent } from "react";
import clsx from "clsx";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import {
  withStyles,
  Paper,
  Typography,
  Divider,
  List,
  TextField,
  Grid,
  IconButton,
  InputAdornment,
  Switch,
  Button
} from "@material-ui/core";

//NAVIGATION
import NavBar from "../nav-bar/navBar";
import SideNav from "../side-nav/sideNav";

const styles = theme => ({
  root: {
    display: "flex"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: 0
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  mainContent: {
    padding: theme.spacing(3, 4),
    boxShadow:
      "0 1px 2px 0 rgba(60,64,67,0.302), 0 2px 6px 2px rgba(60,64,67,0.149)",
    marginTop: "25px",
    maxWidth: "780px",
    margin: "0 auto",
    maxHeight: "525px",
    minHeight: "525px",
    "@media (max-width: 598px)": {
      maxHeight: "558px"
    }
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  header: {
    marginTop: 30
  },
  //   custom: {
  //     height: 45
  //   },
  textField: {
    margin: "11px 5px",
    "@media (max-width: 425px)": {
      margin: "8px 5px",
      fontSize: 5
    }
  },
  divider: {
    marginTop: 9
  },
  name: {
    color: "#263238",
    fontSize: "15px",
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: "500",
    lineHeight: "20px",
    letterSpacing: "-0.05px"
  },
  itemSettings: {
    //  padding: theme.spacing(3, 1),
    display: "flex",
    alignItems: "center",
    marginBottom: 18
  },
  button: {
    margin: theme.spacing(1)
  },
  settingsBtn: {
    marginTop: 90,
    justifyContent: "flex-end",
    "@media (max-width: 599px)": {
      marginTop: 20
    }
  },
  responsive: {
    "@media (max-width: 599px)": {
      marginTop: 12
    }
  }
});
class Settings extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      password: "",
      Newpassword: "",
      showOldPassword: false,
      showNewPassword: false
    };
  }

  //NAVIGATION
  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleChange = () => event => {
    this.setState({ password: event.target.value });
  };

  handleClickShowOldPassword = () => {
    this.setState({ showOldPassword: !this.state.showOldPassword });
  };

  handleClickShowNewPassword = () => {
    this.setState({ showNewPassword: !this.state.showNewPassword });
  };

  handleMouseDownPassword = event => {
    event.preventDefault();
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <NavBar
          open={this.state.open}
          title="Handraiser"
          handleDrawerOpenFn={this.handleDrawerOpen}
        />
        <SideNav
          open={this.state.open}
          handleDrawerCloseFn={this.handleDrawerClose}
        />
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: this.state.open
          })}
        >
          <div className={classes.drawerHeader} />
          <Paper className={classes.mainContent}>
            <Typography variant="subtitle" style={{ fontWeight: "bold" }}>
              Cohort Settings
            </Typography>
            <Divider className={classes.divider} />

            <div className={classes.header} />
            <Grid container className={classes.itemSettings}>
              <Grid item xs={12} sm={4}>
                <Typography variant="h6" className={classes.name}>
                  Change Cohort Name
                </Typography>
              </Grid>

              <Grid item xs={12} sm={8} className={classes.responsive}>
                <TextField
                  id="outlined-name"
                  label="Cohort Name"
                  defaultValue="BoomCampSpring 2019"
                  className={classes.textField}
                  InputProps={{ classes: { root: classes.custom } }}
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
              </Grid>
            </Grid>

            <Grid container className={classes.itemSettings}>
              <Grid item xs={12} sm={4}>
                <Typography variant="h6" className={classes.name}>
                  Change Password
                </Typography>
              </Grid>

              <Grid item xs={12} sm={8} className={classes.responsive}>
                <TextField
                  id="outlined-adornment-password"
                  className={clsx(classes.margin, classes.textField)}
                  variant="outlined"
                  type={this.state.showOldPassword ? "text" : "password"}
                  label="Old Password"
                  defaultValue="fakepassword123"
                  // InputProps={{ classes: { root: classes.custom } }}
                  onChange={this.handleChange("password")}
                  InputProps={{
                    classes: { root: classes.custom },
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          aria-label="toggle password visibility"
                          onClick={this.handleClickShowOldPassword}
                          onMouseDown={this.handleMouseDownPassword}
                        >
                          {this.state.showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
            </Grid>

            <Grid container className={classes.itemSettings}>
              <Grid item xs={12} sm={4}></Grid>

              <Grid item xs={12} sm={8} className={classes.responsive}>
                <TextField
                  id="outlined-adornment-password"
                  className={clsx(classes.margin, classes.textField)}
                  variant="outlined"
                  type={this.state.showNewPassword ? "text" : "password"}
                  label="New Password"
                  defaultValue="enrollme123"
                  // InputProps={{ classes: { root: classes.custom } }}
                  onChange={this.handleChange("password")}
                  InputProps={{
                    classes: { root: classes.custom },
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          aria-label="toggle password visibility"
                          onClick={this.handleClickShowNewPassword}
                          onMouseDown={this.handleMouseDownPassword}
                        >
                          {this.state.showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />
              </Grid>
            </Grid>

            <Grid container className={classes.itemSettings}>
              <Grid item xs={12} sm={4}>
                <Typography variant="h6" className={classes.name}>
                  Lock this Cohort
                </Typography>
              </Grid>

              <Grid item xs={12} sm={2} className={classes.responsive}>
                <Switch
                  checked={this.state.checkedB}
                  value="checkedB"
                  color="primary"
                  inputProps={{ "aria-label": "primary checkbox" }}
                />
              </Grid>
            </Grid>

            {/* <Divider className={classes.divider} /> */}

            <Grid container className={classes.settingsBtn}>
              <Button
                variant="contained"
                size="small"
                className={classes.button}
              >
                Discard
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="small"
                className={classes.button}
              >
                save
              </Button>
            </Grid>
          </Paper>
        </main>
      </div>
    );
  }
}

export default withStyles(styles)(Settings);
