import React, { PureComponent } from "react";
import clsx from "clsx";
import { ToastContainer, toast } from "react-toastify";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { TabPanel, a11yProps } from "./props";
import {
  withStyles,
  Paper,
  Typography,
  Divider,
  TextField,
  Grid,
  IconButton,
  InputAdornment,
  Switch,
  Button,
  Tab,
  Tabs,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar
} from "@material-ui/core";

//NAVIGATION
import NavBar from "../nav-bar/navBar";
import SideNav from "../side-nav/sideNav";

//API
import api from "./../../../services/fetchApi";

//LOADER
import Loader from "../loader/loader";

import DeleteClass from "./modal/delete";

const styles = theme => ({
  root: {
    display: "flex"
  },
  vTab: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    minHeight: "52vh"
  },
  tabs: {
    paddingTop: 15,
    borderRight: `1px solid ${theme.palette.divider}`
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
    display: "flex",
    alignItems: "center"
  },
  button: {
    margin: theme.spacing(1)
  },
  deleteBtn: {
    margin: theme.spacing(1),
    color: "white",
    backgroundColor: "#b31010",
    "&:hover": {
      backgroundColor: "#a91111"
    }
  },
  settingsBtn: {
    marginTop: theme.spacing(10),
    alignItems: "flex-end",
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
      loader: true,
      id: this.props.match.params.cid,
      status: false,
      modal: false,
      oldStatus: false,
      oldname: "",
      name: "",
      newpassword: "",
      password: "",
      oldpassword: "",
      showOldPassword: false,
      showNewPassword: false,
      errorNewName: false,
      errorOldPass: false,
      errorNewPass: false,
      passwordMatch: true,
      newpasswordDisable: true,
      tab: 0,
      coMentor: []
    };
  }

  componentDidMount() {
    document.title = "Settings";
    api.fetch(`/api/cohort/${this.state.id}/details`, "get").then(res => {
      if (res.data.cohort[0].status !== "active") {
        this.setState({
          status: true,
          oldStatus: true
        });
      }
      this.setState({
        oldname: res.data.cohort[0].name,
        name: res.data.cohort[0].name,
        password: res.data.cohort[0].password
      });
      setTimeout(() => {
        this.setState({ loader: false });
      }, 1000);
    });

    api.fetch(`/api/fetchCoMentor/${this.state.id}`, "get").then(data => {
      this.setState({ coMentor: data.data });
    });
  }

  //NAVIGATION
  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
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

  delete = id => {
    api.fetch(`/api/cohorts/${id}/delete`, "get").then(() => {
      window.location.href = `/cohorts`;
    });
  };

  openModal = () => {
    this.setState({
      modal: true
    });
  };

  closeModal = () => {
    this.setState({
      modal: false
    });
  };

  handleNameChange = e => {
    if (e.target.value !== "") {
      this.setState({
        errorNewName: false
      });
    } else {
      this.setState({
        errorNewName: true
      });
    }
    this.setState({
      name: e.target.value
    });
  };

  checkNewNameBlur = e => {
    if (e.target.value === "") {
      this.setState({
        errorNewName: true
      });
    }
  };

  checkOldPass = e => {
    if (e.target.value !== "") {
      this.setState({
        errorOldPass: false
      });
    } else {
      this.setState({
        errorOldPass: true
      });
    }
    this.setState({
      oldpassword: e.target.value
    });
  };

  onFocusToNewPass = () => {
    if (this.state.oldpassword !== this.state.password) {
      this.setState({
        passwordMatch: false
      });
    } else {
      this.setState({
        passwordMatch: true
      });
    }
  };

  checkOldPassBlur = e => {
    if (e.target.value === "") {
      this.setState({
        errorOldPass: true
      });
    }
  };

  checkNewPass = e => {
    if (e.target.value !== "") {
      this.setState({
        errorNewPass: false
      });
    } else {
      this.setState({
        errorNewPass: true
      });
    }
    this.setState({
      newpassword: e.target.value
    });
  };

  checkNewPassBlur = e => {
    if (e.target.value === "") {
      this.setState({
        errorNewPass: true
      });
    }
  };

  submit = (name, oldpassword, newpassword, status) => {
    if (status !== true) {
      status = "active";
    } else {
      status = "nonactive";
    }
    if (name && oldpassword && newpassword) {
      const state = {
        name,
        newpassword,
        status
      };
      if (oldpassword !== this.state.password) {
        toast.error("Wrong Old Password!", {
          hideProgressBar: true,
          draggable: false
        });
      } else {
        api
          .fetch(`/api/cohort/${this.state.id}/editDetails`, "post", state)
          .then(() => {
            window.location.href = `/cohorts`;
          });
      }
    } else if (name) {
      const newpassword = this.state.password;
      const state = {
        name,
        newpassword,
        status
      };
      api
        .fetch(`/api/cohort/${this.state.id}/editDetails`, "post", state)
        .then(() => {
          window.location.href = `/cohorts`;
        });
    } else {
      toast.error("Please fill up all the necessary fields!", {
        hideProgressBar: true,
        draggable: false
      });
    }
  };

  handleChangeTab = (event, newValue) => {
    this.setState({
      tab: newValue
    });
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
          {this.state.loader ? (
            <Loader content="Loading Details..." />
          ) : (
            <Paper className={classes.mainContent}>
              <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
                Cohort Settings
              </Typography>
              <Divider className={classes.divider} />
              <div className={classes.vTab}>
                <Tabs
                  orientation="vertical"
                  variant="scrollable"
                  value={this.state.tab}
                  onChange={this.handleChangeTab}
                  aria-label="Vertical tabs example"
                  className={classes.tabs}
                >
                  <Tab label="Cohort Name" {...a11yProps(0)} />
                  <Tab label="Cohort Password" {...a11yProps(1)} />
                  <Tab label="Co-Mentor" {...a11yProps(2)} />
                  <Tab label="Delete Cohort" {...a11yProps(3)} />
                </Tabs>
                <TabPanel value={this.state.tab} index={0}>
                  {/* COHORT NAME START */}
                  <Grid container className={classes.itemSettings}>
                    <Grid item xs={12} sm={5}>
                      <Typography variant="h6" className={classes.name}>
                        New cohort name
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={7} className={classes.responsive}>
                      <TextField
                        id="outlined-name"
                        label="Cohort Name"
                        name="name"
                        className={classes.textField}
                        InputProps={{ classes: { root: classes.custom } }}
                        fullWidth
                        defaultValue={this.state.name}
                        margin="normal"
                        variant="outlined"
                        onKeyUp={this.handleNameChange}
                        error={this.state.errorNewName}
                        helperText={
                          this.state.errorNewName ? "Name is required" : " "
                        }
                        onBlur={this.checkNewNameBlur}
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
                        checked={this.state.status}
                        value={this.state.status}
                        onClick={() => {
                          this.setState({
                            status: !this.state.status
                          });
                        }}
                        color="primary"
                        inputProps={{ "aria-label": "primary checkbox" }}
                      />
                    </Grid>
                  </Grid>
                  <Grid container className={classes.settingsBtn}>
                    <Button
                      variant="contained"
                      size="small"
                      className={classes.button}
                      onClick={() => (window.location.href = `/cohorts`)}
                    >
                      cancel
                    </Button>
                    {this.state.name !== this.state.oldname ||
                    this.state.newpassword !== "" ||
                    this.state.status !== this.state.oldStatus ? (
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        className={classes.button}
                        onClick={() => {
                          this.submit(
                            this.state.name,
                            this.state.oldpassword,
                            this.state.newpassword,
                            this.state.status
                          );
                        }}
                      >
                        save
                      </Button>
                    ) : null}
                  </Grid>
                  {/* COHORT NAME END */}
                </TabPanel>
                <TabPanel value={this.state.tab} index={1}>
                  {/* COHORT PASSWORD START */}
                  <Grid container className={classes.itemSettings}>
                    <Grid item xs={12} sm={4}>
                      <Typography variant="h6" className={classes.name}>
                        Enter old password:
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={8} className={classes.responsive}>
                      <TextField
                        id="outlined-adornment-oldpassword"
                        className={clsx(classes.margin, classes.textField)}
                        variant="outlined"
                        type={this.state.showOldPassword ? "text" : "password"}
                        label="Old Password"
                        name="oldpassword"
                        defaultValue={this.state.oldpassword}
                        onKeyUp={this.checkOldPass}
                        error={
                          this.state.errorOldPass || !this.state.passwordMatch
                        }
                        helperText={
                          this.state.errorOldPass
                            ? "Password is required!"
                            : !this.state.passwordMatch
                            ? "Password is incorrect!"
                            : " "
                        }
                        onBlur={this.checkOldPassBlur}
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
                    <Grid item xs={12} sm={4}>
                      <Typography variant="h6" className={classes.name}>
                        Enter new password:
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={8} className={classes.responsive}>
                      <TextField
                        id="outlined-adornment-newpassword"
                        className={clsx(classes.margin, classes.textField)}
                        variant="outlined"
                        type={this.state.showNewPassword ? "text" : "password"}
                        label="New Password"
                        name="newpassword"
                        defaultValue={this.state.newpassword}
                        onKeyUp={this.checkNewPass}
                        error={this.state.errorNewPass}
                        helperText={
                          this.state.errorNewPass
                            ? "Password is required!"
                            : " "
                        }
                        onBlur={this.checkNewPassBlur}
                        onFocus={this.onFocusToNewPass}
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
                  <Grid container className={classes.settingsBtn}>
                    <Button
                      variant="contained"
                      size="small"
                      className={classes.button}
                      onClick={() => (window.location.href = `/cohorts`)}
                    >
                      cancel
                    </Button>
                    {this.state.name !== this.state.oldname ||
                    (this.state.newpassword !== "" &&
                      this.state.passwordMatch) ||
                    this.state.status !== this.state.oldStatus ? (
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        className={classes.button}
                        onClick={() => {
                          this.submit(
                            this.state.name,
                            this.state.oldpassword,
                            this.state.newpassword,
                            this.state.status
                          );
                        }}
                      >
                        save
                      </Button>
                    ) : null}
                  </Grid>
                  {/* COHORT PASSWORD END */}
                </TabPanel>
                <TabPanel value={this.state.tab} index={2}>
                  {/* ADD CO-MENTOR START */}
                  CO-MENTOR
                  <List>
                    {this.state.coMentor.map(row => {
                      console.log(row);
                      return (
                        <React.Fragment>
                          <ListItem alignItems="center" justifyContent="center">
                            <ListItemAvatar>
                              <Avatar alt={`${row.id}`} src={`${row.avatar}`} />
                            </ListItemAvatar>
                            <ListItemText
                              primary={`${row.first_name} ${row.last_name}`}
                            />
                          </ListItem>
                        </React.Fragment>
                      );
                    })}
                  </List>
                  {/* <Fab size="small" color="secondary" aria-label="add" >
                    <AddIcon />
                  </Fab> */}
                  {/*ADD CO-MENTOR END */}
                </TabPanel>
                <TabPanel value={this.state.tab} index={3}>
                  {/* DELETE COHORT START */}
                  <Typography
                    style={{ padding: 0, width: 560 }}
                    variant="subtitle1"
                    gutterBottom
                  >
                    <b style={{ color: "red", letterSpacing: 5 }}>WARNING: </b>
                    This will delete the cohort along with its contents. This
                    proccess is <b>irreversible</b>.
                  </Typography>
                  <Grid container className={classes.settingsBtn}>
                    <Button
                      variant="contained"
                      size="small"
                      className={classes.button}
                      onClick={() => (window.location.href = `/cohorts`)}
                    >
                      cancel
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      className={classes.deleteBtn}
                      onClick={() => {
                        this.openModal();
                      }}
                    >
                      delete
                    </Button>
                  </Grid>
                  {/*DELETE COHORT END */}
                </TabPanel>
              </div>
            </Paper>
          )}
          <ToastContainer
            enableMultiContainer
            position={toast.POSITION.TOP_RIGHT}
          />
          <DeleteClass
            open={this.state.modal}
            close={this.closeModal}
            id={this.state.id}
            delete={this.delete}
          />
        </main>
      </div>
    );
  }
}

export default withStyles(styles)(Settings);
