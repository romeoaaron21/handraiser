import React, { PureComponent } from "react";
import clsx from "clsx";
import { ToastContainer, toast } from "react-toastify";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

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
  Button
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
    alignItems: "center",
    marginBottom: 18
  },
  button: {
    margin: theme.spacing(1)
  },
  deleteBtn: {
    margin: theme.spacing(1),
    color: 'white',
    backgroundColor: '#b31010',
    '&:hover': {
      backgroundColor: '#a91111'
    }
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
      showNewPassword: false
    };
  }

  componentDidMount(){
    document.title = "Settings";
    api
      .fetch(`/api/cohort/${this.state.id}/details`, 'get')
      .then(res => {
        if(res.data.cohort[0].status !== 'active'){
          this.setState({
            status: true,
            oldStatus: true
          })
        }
        this.setState({
          oldname: res.data.cohort[0].name,
          name: res.data.cohort[0].name,
          password: res.data.cohort[0].password
        })
        setTimeout(() => {
          this.setState({ loader: false });
        }, 1000);
      })
  }

  //NAVIGATION
  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleChange = () => event => {
    this.setState({ [event.target.getAttribute('name')]: event.target.value });
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

  delete = (id) => {
    api.fetch(`/api/cohorts/${id}/delete`, "get").then(() => {
      window.location.href = `/cohorts`;
    });
  }

  openModal = () => {
    this.setState({
      modal: true
    })
  }

  closeModal = () => {
    this.setState({
      modal: false
    })
  }

  submit = (name, oldpassword, newpassword, status) => {
    if(status !== true){
      status = 'active'
    } else {
      status = 'nonactive'
    }
    if(name && oldpassword && newpassword){
      const state = {
        name, newpassword, status
      }
      if(oldpassword !== this.state.password){
        toast.error("Wrong Old Password!", {
          hideProgressBar: true,
          draggable: false
        });
      } else {
        api
          .fetch(`/api/cohort/${this.state.id}/editDetails`, "post", state)
          .then(() => {
            window.location.href = `/cohorts`;
          })
      }
    } else if(name){
      const newpassword = this.state.password
      const state = {
        name, newpassword, status
      }
      api
        .fetch(`/api/cohort/${this.state.id}/editDetails`, "post", state)
        .then(() => {
          window.location.href = `/cohorts`;
        })
    } else {
      toast.error("Please fill up all fields!", {
        hideProgressBar: true,
        draggable: false
      });
    }
  }

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
        {this.state.loader ? 
          <Loader content="Loading Details..." /> 
        :
          <Paper className={classes.mainContent}>
            <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>
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
                  name="name"
                  className={classes.textField}
                  InputProps={{ classes: { root: classes.custom } }}
                  fullWidth
                  defaultValue={this.state.name}
                  margin="normal"
                  variant="outlined"
                  onChange={this.handleChange()}
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
                  id="outlined-adornment-oldpassword"
                  className={clsx(classes.margin, classes.textField)}
                  variant="outlined"
                  type={this.state.showOldPassword ? "text" : "password"}
                  label="Old Password"
                  name="oldpassword"
                  defaultValue={this.state.oldpassword}
                  onChange={this.handleChange()}
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
                  id="outlined-adornment-newpassword"
                  className={clsx(classes.margin, classes.textField)}
                  variant="outlined"
                  type={this.state.showNewPassword ? "text" : "password"}
                  label="New Password"
                  name="newpassword"
                  defaultValue={this.state.newpassword}
                  onChange={this.handleChange()}
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
                  checked={this.state.status}
                  value={this.state.status}
                  onClick={() => { this.setState({
                    status: !this.state.status
                  })}}
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
                onClick={() => (
                  window.location.href = `/cohorts`
                )}
              >
                cancel
              </Button>
              <Button
                variant="contained"
                size="small"
                className={classes.deleteBtn}
                onClick={() => {this.openModal()}}
              >
                delete
              </Button>
              {
                this.state.name !== this.state.oldname || this.state.newpassword !== '' || this.state.status !== this.state.oldStatus ?
              <Button
                variant="contained"
                color="primary"
                size="small"
                className={classes.button}
                onClick={() => {this.submit(this.state.name, this.state.oldpassword, this.state.newpassword, this.state.status)}}
              >
                save
              </Button>
              : null }
            </Grid>
          </Paper>
        }
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
