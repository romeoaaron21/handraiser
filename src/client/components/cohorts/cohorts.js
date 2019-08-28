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

const socketUrl = "http://boom-handraiser.com:3001/";
const socket = io("http://boom-handraiser.com:3001/");

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
      searchValue: "",
      search: false,
      socket: null
    };
  }

  //NAVIGATION
  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
    document.title = "Cohorts";
    this.fetch.then(fetch => {
      const user = fetch.data.user[0];
      if (user.privilege === "mentor") {
        api.fetch(`/api/cohorts/api`, "get").then(res => {
          socket.emit("displayCohorts", res.data.cohorts.reverse());
          setTimeout(() => {
            this.setState({ loader: false });
          }, 1000);
        });
      } else {
        api.fetch(`/api/cohorts/api`, "get").then(res => {
          socket.emit("displayCohorts", res.data.cohorts.reverse());
        });
        api.fetch(`/api/student/${user.id}/cohorts/`, "get").then(res => {
          socket.emit("displayMember", res.data.member);
          setTimeout(() => {
            this.setState({ loader: false });
          }, 1000);
        });
      }
      this.setState({
        user,
        id: user.id,
        privilege: user.privilege
      });
    });
  }

  UNSAFE_componentWillMount() {
    const socket = io(socketUrl);
    socket.on("connect", () => {});
    this.setState({ socket });

    socket.on("displayCohorts", cohorts => {
      this.setState({ cohorts });
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
      searchValue: ""
    });
    this.componentDidMount();
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
    api.fetch(`/api/cohorts/${id}`, "get").then(() => {
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
        this.componentDidMount();
        if (res.data.message) {
          toast.error("Wrong Password!", {
            hideProgressBar: true,
            draggable: false
          });
        } else {
          toast.info("Enrolled to Cohort!", {
            hideProgressBar: true,
            draggable: false
          });
          this.closeModal();
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
      });
  };

  search = e => {
    if (e.currentTarget.value === "") {
      this.setState({ searchValue: e.currentTarget.value, search: false });
      return this.componentDidMount();
    } else {
      this.setState({ searchValue: e.currentTarget.value, search: true });
      if (this.state.privilege !== "student") {
        api
          .fetch(
            `/api/cohorts/${e.currentTarget.value}/search/mentor/${this.state.id}`,
            "get"
          )
          .then(res => {
            this.setState({
              cohorts: res.data.cohorts
            });
          });
      } else {
        api
          .fetch(`/api/cohorts/${e.currentTarget.value}/search`, "get")
          .then(res => {
            this.setState({
              cohorts: res.data.cohorts
            });
          });
      }
    }
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
                    onChange={this.search}
                    value={this.state.searchValue}
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
                ) : this.state.member.length !== 0 ? (
                  <div className={classes.student}>
                    <Grid container>
                      <Grid
                        item
                        xs={12}
                        className={classes.header}
                        style={{
                          display: "flex",
                          justifyContent: "flex-start",
                          borderBottom: "2px solid gainsboro"
                        }}
                      >
                        <Typography style={{ color: "#6f6f6f" }}>
                          Enrolled Classes
                        </Typography>
                      </Grid>

                      <StudentClassCards
                        cohorts={this.state.cohorts}
                        members={this.state.member}
                        openEnroll={this.openEnroll}
                        openLeave={this.openLeave}
                        openStudentList={this.openStudentList}
                      />
                    </Grid>
                  </div>
                ) : null}
                {this.state.privilege === "student" ? (
                  this.state.cohorts.length !== 0 ? (
                    <div className={classes.student}>
                      <Grid container>
                        <Grid
                          item
                          xs={12}
                          className={classes.header}
                          style={{
                            display: "flex",
                            justifyContent: "flex-start",
                            borderBottom: "2px solid gainsboro",
                            paddingTop: "2%"
                          }}
                        >
                          <Typography style={{ color: "#6f6f6f" }}>
                            Available Classes
                          </Typography>
                        </Grid>

                        {this.state.member.length !== 0 &&
                        this.state.search === false ? (
                          this.state.member.filter(
                            member => member.student_id === this.state.id
                          ).length === this.state.cohorts.length ? (
                            <Grid
                              container
                              className={classes.emptyQueue}
                              style={{ padding: 50 }}
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
                              cohorts={this.state.cohorts}
                              members={this.state.member}
                              openEnroll={this.openEnroll}
                              openLeave={this.openLeave}
                              openStudentList={this.openStudentList}
                            />
                          )
                        ) : (
                          <AvailClass
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
