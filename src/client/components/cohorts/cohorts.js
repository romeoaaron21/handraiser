import React from "react";
import clsx from "clsx";
import { ToastContainer, toast } from "react-toastify";
import io from "socket.io-client";
import { Redirect } from "react-router-dom";

import Container from "@material-ui/core/Container";
import { withStyles } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import SearchIcon from "@material-ui/icons/Search";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

//Modals
import AddClass from "./modals/mentor/add";
import DeleteClass from "./modals/mentor/delete";
import EnrollToClass from "./modals/student/enroll";
import LeaveClass from "./modals/student/leave";
import StudentList from "./modals/studentList";

//Cards
import StudentClassCards from "./cards/student";
import MentorClassCards from "./cards/mentor";

//API
import api from "./../../services/fetchApi";

//LOADER
import Loader from "../common-components/loader/loader";

//AUTH
import Auth from "../../auth/Auth";
import AuthService from "../../auth/AuthService";

//NAVIGATION
import NavBar from "../common-components/nav-bar/navBar";
import SideNav from "../common-components/side-nav/sideNav";

//CSS
import styles from "./cohorts-component-style";

//SVG
import EmptyQueue from "./../../images/emptyqueue.svg";
import AvailClass from "./cards/availClass";

//TABS
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';


const socket = io("http://boom-handraiser.com:3001/");

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box>{children}</Box>
    </Typography>
  );
}
class Cohorts extends React.Component {
  constructor() {
    super();

    this.Auth = new AuthService();
    this.fetch = this.Auth.getFetchedTokenAPI();

    this.state = {
      loader: true,
      privilege: "",
      id: 0,
      cohorts: [],
      enrolledClasses: [],
      availableClasses: [],
      cohortsSideNav: [],
      member: [],
      students: [],
      user: [],
      add: false,
      delete: false,
      enroll: false,
      leave: false,
      open: false,
      studentList: false,
      scroll: "paper",
      selected: "",
      cohort_id: "",
      search: "",
      socket: null,
      tabValue: 0
    };
  }

  //NAVIGATION
  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleTabValue = (event, newValue) => {
    this.setState({tabValue: newValue})
  }

  

  componentDidMount() {
    document.title = "Cohorts";
    this.fetch.then(fetch => {
      const user = fetch.data.user[0];
      api.fetch(`/api/cohorts/api`, "get").then(res => {
        if(this.state.privilege === 'student'){
          this.setState({ availableClasses: res.data.cohorts });
          var cohorts = res.data.cohorts.filter(cohorts => cohorts.status === 'active')
          this.setState({ cohorts })
        } else {
          this.setState({ cohorts: res.data.cohorts});
        }
      });

      if (user.privilege === "mentor") {
        api.fetch(`/api/cohorts/navigation/side-nav`, "get").then(res => {
          socket.emit("displayCohortsSideNav", res.data.cohorts);
          setTimeout(() => {
            this.setState({ loader: false });
          }, 1000);
        });
      } else {
        api.fetch(`/api/student/${user.id}/cohorts/`, "get").then(res => {
          socket.emit("displayMember", res.data.member);
          setTimeout(() => {
            this.setState({ loader: false });
          }, 1000);
        });

        api.fetch(`/api/cohorts/enrolled/${user.id}`, "get").then(res => {
          socket.emit("displayEnrolledClasses", res.data.cohorts);
        });
      }
      this.setState({
        user,
        id: user.id,
        privilege: user.privilege
      });
    });
  }

  //SORT CLASSES SIDE NAV STUDENT START
  ascLastName = (a, b) => {
    if(a.name < b.name) return -1;
    if(a.name > b.name) return 1;
  }
  //SORT CLASSES SIDE NAV STUDENT END


  UNSAFE_componentWillMount() {
    socket.on("displayEnrolledClasses", cohorts => {
      this.setState({ enrolledClasses: cohorts });
    });

    socket.on("displayCohortsSideNav", cohorts => {
      this.setState({ cohortsSideNav: cohorts });
    });

    socket.on("displayMember", member => {
      this.setState({ member });
    });
  }

  openStudentList = cohort_id => {
    api.fetch(`/api/cohorts/${cohort_id}/students/`, "get").then(res => {
      this.setState({
        studentList: true,
        students: res.data.students
      });
    });
  };

  openAdd = () => {
    this.setState({ add: true });
  };

  openDelete = e => {
    this.setState({
      delete: true,
      selected: e.currentTarget.getAttribute("id")
    });
  };

  redirect = cohort_id => {
    this.setState({ cohort_id });
  };

  openEnroll = (e, cohort_id) => {
    let array = e.currentTarget.getAttribute("name").split(",");
    let check = array.find(name => name === "goToClass");
    if (check) {
      this.redirect(cohort_id);
    } else {
      this.setState({
        enroll: true,
        selected: e.currentTarget.getAttribute("id")
      });
    }
  };

  openLeave = e => {
    this.setState({
      leave: true,
      selected: e.currentTarget.getAttribute("id")
    });
  };

  closeModal = () => {
    this.setState({
      add: false,
      delete: false,
      enroll: false,
      leave: false,
      studentList: false,
    });
  };

  add = (name, password, mentor_id) => {
    if (name && password) {
      const state = { name, password };
      let check = this.state.cohorts.find(cohorts => cohorts.name === name);
      if (!check) {
        api
          .fetch(`/api/cohorts/mentor/${mentor_id}/add`, "post", state)
          .then(() => {
            this.componentDidMount();
            this.closeModal();
            toast.info("Cohort Added!", {
              hideProgressBar: true,
              draggable: false
            });
          });
      } else {
        toast.error("Class already exists!", {
          hideProgressBar: true,
          draggable: false
        });
      }
    } else {
      toast.error("Please fill up Required Fields!", {
        hideProgressBar: true,
        draggable: false
      });
    }
  };

  delete = id => {
    api.fetch(`/api/cohorts/${id}/delete`, "get").then(() => {
      this.componentDidMount();
      toast.info("Cohort Deleted!", {
        hideProgressBar: true,
        draggable: false
      });
    });
  };

  enroll = (id, password) => {
    let student_id = this.state.id;
    const state = { student_id, password };
    if (!password) {
      return toast.error("Fill up the required fields", {
        hideProgressBar: true,
        draggable: false
      });
    } else {
      api.fetch(`/api/cohorts/${id}/students`, "post", state).then(res => {
        if (res.data.message === 'error') {
          toast.error("Wrong Password!", {
            hideProgressBar: true,
            draggable: false
          });
        } else if(res.data.message === 'Locked'){
          toast.error("Cohort Locked!", {
            hideProgressBar: true,
            draggable: false
          });
          this.componentDidMount();
        } else {
          toast.info("Enrolled to Cohort!", {
            hideProgressBar: true,
            draggable: false
          });
          this.closeModal();
          this.setState({ search: ''})
          this.componentDidMount();
        }
      });
    }
  };

  leave = id => {
    api
      .fetch(`/api/cohorts/${id}/students/${this.state.id}`, "get")
      .then(() => {
        this.componentDidMount();
        toast.info("Left Cohort!", {
          hideProgressBar: true,
          draggable: false
        });
        this.setState({ search: ''})
      });
  };

  removeStudent = (id, student_id) => {
    api.fetch(`/api/cohorts/${id}/students/${student_id}`, "get").then(() => {
      this.componentDidMount();
      this.closeModal();
      api.fetch(`/api/student/${student_id}/cohorts/`, "get").then(res => {
        socket.emit("displayMember", res.data.member);
      });
      toast.info("Remove Student!", {
        hideProgressBar: true,
        draggable: false
      });
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
          cohorts={this.state.privilege === 'student' ? this.state.enrolledClasses.sort(this.ascLastName) : this.state.cohortsSideNav}
          socket={true}
        />
        <ToastContainer
          enableMultiContainer
          position={toast.POSITION.TOP_RIGHT}
        />
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: this.state.open
          })}
        >
          {this.state.loader ? (
            <Loader content="Loading Cohorts..." />
          ) : (
            <React.Fragment>
              <div className={classes.drawerHeader} />
              <Container maxWidth="lg" className={classes.container}>
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    placeholder="Search…"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput
                    }}
                    onChange={e => this.setState({ search: e.target.value})}
                    value={this.state.search}
                    fullWidth
                    inputProps={{ "aria-label": "search" }}
                  />
                </div>
                {this.state.privilege !== "student" ? (
                  <div className={classes.mentor}>
                    <MentorClassCards
                      search={this.state.search}
                      cohorts={this.state.cohorts}
                      openAdd={this.openAdd}
                      openDelete={this.openDelete}
                      redirect={this.redirect}
                      openStudentList={this.openStudentList}
                      user={this.state.user}
                    />
                  </div>
                ) : this.state.member.length !== 0 &&
                  this.state.member.filter(
                    member => member.student_id === this.state.id
                  ).length !== 0 ? (
                  <div className={classes.student}>
                    <Tabs
                        value={this.state.tabValue}
                        onChange={this.handleTabValue}
                        indicatorColor="primary"
                        textColor="primary"
                        style={{width:'100%'}}
                        centered
                    >
                        <Tab label="Enrolled Classes" />
                        <Tab label="Available Classes" />
                    </Tabs>
                    <Grid container>
                      <TabPanel value={this.state.tabValue} index={0}>
                      <Grid container>
                      <StudentClassCards
                        user_id={this.state.id}
                        search={this.state.search}
                        cohorts={this.state.enrolledClasses}
                        members={this.state.member}
                        openEnroll={this.openEnroll}
                        openLeave={this.openLeave}
                        openStudentList={this.openStudentList}
                      />
                      </Grid>
                      </TabPanel>
                      <TabPanel value={this.state.tabValue} index={1}>
                      {this.state.privilege === "student" ? (
                      this.state.cohorts.length !== 0 ? (
                      <div className={classes.student}> 
                      <Grid container justify="center">
                        {this.state.member.length !== 0 &&
                        this.state.search === '' ? (
                          ((this.state.enrolledClasses.length === this.state.availableClasses.length) || 
                          (this.state.enrolledClasses.filter(cohorts => cohorts.status === 'active').length === this.state.availableClasses.filter(cohorts => cohorts.status === 'active').length) 
                          || (this.state.enrolledClasses.filter(cohorts => cohorts.status === 'active').length === this.state.availableClasses.filter(cohorts => cohorts.status === 'active').length)) ? (
                            <Grid
                              container
                              className={classes.emptyQueue}
                              style={{ padding: 50, width:'1000px'}}
                            >
                              <img
                                alt="Classes"
                                src={EmptyQueue}
                                width="280"
                                height="250"
                              />
                              <Typography variant="overline" display="block">
                                No Available Classes
                              </Typography>
                            </Grid>
                          ) : (
                            <AvailClass
                              user_id={this.state.id}
                              enrolledClasses={this.state.enrolledClasses}
                              cohorts={this.state.cohorts}
                              members={this.state.member}
                              openEnroll={this.openEnroll}
                              openLeave={this.openLeave}
                              openStudentList={this.openStudentList}
                            />
                          )
                        ) : (
                          <AvailClass
                            search={this.state.search}
                            enrolledClasses={this.state.enrolledClasses}
                            cohorts={this.state.cohorts}
                            members={this.state.member}
                            openEnroll={this.openEnroll}
                            openLeave={this.openLeave}
                            openStudentList={this.openStudentList}
                          />
                        )}
                      </Grid>

                    </div>
                  ) : null
                  ) : null}
                  </TabPanel>
                  </Grid>
                  </div>
                ) : null}
                
                <AddClass
                  open={this.state.add}
                  close={this.closeModal}
                  add={this.add}
                  id={this.state.id}
                />
                <DeleteClass
                  open={this.state.delete}
                  close={this.closeModal}
                  id={this.state.selected}
                  delete={this.delete}
                />
                <EnrollToClass
                  open={this.state.enroll}
                  close={this.closeModal}
                  id={this.state.selected}
                  enroll={this.enroll}
                />
                <LeaveClass
                  open={this.state.leave}
                  close={this.closeModal}
                  id={this.state.selected}
                  leave={this.leave}
                />
                {this.state.students !== undefined ? (
                  <StudentList
                    removeStudent={this.removeStudent}
                    privilege={this.state.privilege}
                    open={this.state.studentList}
                    close={this.closeModal}
                    students={this.state.students}
                    scroll={this.state.scroll}
                    id={this.state.id}
                  />
                ) : null}
                {this.state.cohorts.length !== 0 ? null : (
                  <Grid container className={classes.emptyQueue}>
                    <img
                      alt="Classes"
                      src={EmptyQueue}
                      width="280"
                      height="250"
                    />
                    <Typography variant="overline" display="block">
                      No Classes Found
                    </Typography>
                  </Grid>
                )}
              </Container>
            </React.Fragment>
          )}
        </main>
        {this.state.cohort_id ? (
          <Redirect
            to={{
              pathname: `/queue/${this.state.cohort_id}`
            }}
          />
        ) : null}
      </div>
    );
  }
}

export default Auth(withStyles(styles)(Cohorts));
