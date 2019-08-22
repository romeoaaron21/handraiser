import React from "react";
import clsx from "clsx";
import { withStyles, fade } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import Tooltip from "@material-ui/core/Tooltip";

import TableLoader from "../common-components/table/loader";
import StudentList from "../common-components/dialogs/studentList";
import NavBar from "../common-components/nav-bar/navBar";
import SideNav from "../common-components/side-nav/sideNav";
import Auth from "../../auth/auth";
import api from "../../services/fetchApi";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
    ...theme.mixins.toolbar,
    justifyContent: "flex-end"
  },
  paper: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table: {
    minWidth: 650
  },
  cardContact: {
    height: "840px"
  },
  cardHeader: {
    backgroundColor: "#696968",
    color: "#ffffff",
    height: "32px"
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  actionSearch: {
    marginTop: "0%",
    marginRight: "0%"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 320,
      "&:focus": {
        width: 400
      }
    }
  },
  inputField: {
    textAlign: "center",
    color: "#005406",
    letterSpacing: "2px"
  },
  row: {
    "&:hover": {
      backgroundColor: "#f7f7f7"
    }
  },
  scroll: {
    maxHeight: "745px",
    overflow: "auto",
    "&::-webkit-scrollbar": {
      width: "0.3em"
    },
    "&::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)"
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      borderRadius: "10px",
      outline: "1px solid slategrey"
    }
  }
});

class Cohorts extends React.Component {
  constructor() {
    super();

    this.state = {
      loader: true,
      open: false,
      studentListDialog: false,
      search: "",
      mentors: [],
      cohorts: [],
      students: [],
      cohortId: ""
    };
  }

  componentDidMount() {
    document.title = "Cohorts";

    api.fetch("/cohorts", "get").then(res => {
      this.setState({ cohorts: res.data.cohorts });
    });

    api.fetch("/mentors", "get").then(res => {
      this.setState({ mentors: res.data.mentors });
    });

    api.fetch("/students", "get").then(res => {
      this.setState({ students: res.data.students });
    });

    setTimeout(() => {
      this.setState({ loader: false });
    }, 500);
  }

  handleDrawerOpen = () => this.setState({ open: true });
  handleDrawerClose = () => this.setState({ open: false });

  handleSearch = e => this.setState({ search: e.target.value });

  closeStudentListDialog = () => this.setState({ studentListDialog: false });

  getMentorName = id => {
    let name = "";
    this.state.mentors.map(mentor => {
      if (mentor.id === id) name = mentor.first_name + " " + mentor.last_name;
      return name;
    });
    return name;
  };

  getNoOfStudents = id => {
    let count = 0;
    this.state.students.forEach(student => {
      if (student.cohort_id === id) count += 1;
      return count;
    });
    return count;
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <NavBar
          open={this.state.open}
          title="Handraiser Admin"
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
          <Paper className={classes.paper}>
            <Card className={classes.cardContact}>
              <CardHeader
                className={classes.cardHeader}
                title="Cohorts"
                classes={{ action: classes.actionSearch }}
                action={
                  <Grid item={true} xs={8} sm={12}>
                    <div className={classes.search}>
                      <div className={classes.searchIcon}>
                        <SearchIcon />
                      </div>
                      <InputBase
                        placeholder="Search by cohort name or mentor"
                        classes={{
                          root: classes.inputRoot,
                          input: classes.inputInput
                        }}
                        inputProps={{ "aria-label": "search" }}
                        onChange={e => this.handleSearch(e)}
                      />
                    </div>
                  </Grid>
                }
              />
              {this.state.loader ? (
                <TableLoader content="Loading cohorts..." />
              ) : (
                <div className={classes.scroll}>
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Cohort name</TableCell>
                        <TableCell align="center">Mentor</TableCell>
                        <TableCell align="center">No. of students</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {this.state.cohorts.map((cohort, i) => {
                        if (this.state.search) {
                          if (
                            cohort.name
                              .toLowerCase()
                              .includes(this.state.search.toLowerCase()) ||
                            this.getMentorName(cohort.mentor_id)
                              .toLowerCase()
                              .includes(this.state.search.toLowerCase())
                          ) {
                            return (
                              <TableRow key={i} className={classes.row}>
                                <TableCell align="center">
                                  {cohort.name}
                                </TableCell>
                                <TableCell align="center">
                                  {this.getMentorName(cohort.mentor_id)}
                                </TableCell>
                                <Tooltip
                                  title="View students"
                                  placement="top-start"
                                >
                                  <TableCell
                                    align="center"
                                    onClick={() =>
                                      this.setState({
                                        studentListDialog: true,
                                        cohortId: cohort.id
                                      })
                                    }
                                  >
                                    {this.getNoOfStudents(cohort.id)}
                                  </TableCell>
                                </Tooltip>
                              </TableRow>
                            );
                          }
                        } else {
                          return (
                            <TableRow key={i} className={classes.row}>
                              <TableCell align="center">
                                {cohort.name}
                              </TableCell>
                              <TableCell align="center">
                                {this.getMentorName(cohort.mentor_id)}
                              </TableCell>

                              <Tooltip
                                title="View students"
                                placement="top-start"
                              >
                                <TableCell
                                  align="center"
                                  onClick={() =>
                                    this.setState({
                                      studentListDialog: true,
                                      cohortId: cohort.id
                                    })
                                  }
                                >
                                  {this.getNoOfStudents(cohort.id)}
                                </TableCell>
                              </Tooltip>
                            </TableRow>
                          );
                        }
                        return null;
                      })}
                    </TableBody>
                  </Table>
                </div>
              )}
            </Card>
          </Paper>
        </main>

        <Dialog
          open={this.state.studentListDialog}
          onClose={this.closeStudentListDialog}
          scroll={"paper"}
          fullWidth={true}
          maxWidth={"sm"}
        >
          <StudentList
            cohortId={this.state.cohortId}
            close={this.closeStudentListDialog}
          />
        </Dialog>
      </div>
    );
  }
}

export default Auth(withStyles(styles)(Cohorts));
