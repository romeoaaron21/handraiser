import React from "react";
import clsx from "clsx";
import { withStyles, fade } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Dialog from "@material-ui/core/Dialog";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import Tooltip from "@material-ui/core/Tooltip";

import TableLoader from "../common-components/table/loader";
import CohortList from "../common-components/dialogs/cohortList";
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

class Mentor extends React.Component {
  constructor() {
    super();

    this.state = {
      loader: true,
      open: false,
      cohortListDialog: false,
      search: "",
      mentors: [],
      cohorts: [],
      mentorId: ""
    };
  }

  componentDidMount() {
    document.title = "Mentor List";
    api.fetch("/mentors", "get").then(res => {
      this.setState({ mentors: res.data.mentors });
    });

    api.fetch("/cohorts", "get").then(res => {
      this.setState({ cohorts: res.data.cohorts });
    });

    setTimeout(() => {
      this.setState({ loader: false });
    }, 500);
  }

  handleDrawerOpen = () => this.setState({ open: true });
  handleDrawerClose = () => this.setState({ open: false });

  handleSearch = e => this.setState({ search: e.target.value });

  closeMentortListDialog = () => this.setState({ cohortListDialog: false });

  getNoOfClasses = id => {
    let count = 0;
    this.state.cohorts.forEach(cohort => {
      if (cohort.mentor_id === id) count += 1;
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
                title="Mentors"
                classes={{ action: classes.actionSearch }}
                action={
                  <Grid item={true} xs={8} sm={12}>
                    <div className={classes.search}>
                      <div className={classes.searchIcon}>
                        <SearchIcon />
                      </div>
                      <InputBase
                        placeholder="Search by name"
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
                <TableLoader content="Loading mentors..." />
              ) : (
                <div className={classes.scroll}>
                  <Table className={classes.table}>
                    <TableHead>
                      <TableRow>
                        <TableCell align="left" style={{ width: "5%" }}>
                          Name
                        </TableCell>
                        <TableCell align="center" />
                        <TableCell align="center">No. of classes</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {this.state.mentors.map((mentor, i) => {
                        if (this.state.search) {
                          if (
                            mentor.first_name
                              .toLowerCase()
                              .includes(this.state.search.toLowerCase()) ||
                            mentor.last_name
                              .toLowerCase()
                              .includes(this.state.search.toLowerCase())
                          ) {
                            return (
                              <TableRow key={i} className={classes.row}>
                                <TableCell align="right">
                                  <Avatar src={mentor.avatar} />
                                </TableCell>
                                <TableCell align="left">
                                  {mentor.first_name + " " + mentor.last_name}
                                </TableCell>
                                <TableCell align="center">{"12"}</TableCell>
                              </TableRow>
                            );
                          }
                        } else {
                          return (
                            <TableRow key={i} className={classes.row}>
                              <TableCell align="right">
                                <Avatar src={mentor.avatar} />
                              </TableCell>
                              <TableCell align="left">
                                {mentor.first_name + " " + mentor.last_name}
                              </TableCell>
                              <Tooltip
                                title="View classes"
                                placement="top-start"
                              >
                                <TableCell
                                  align="center"
                                  onClick={() =>
                                    this.setState({
                                      cohortListDialog: true,
                                      mentorId: mentor.id
                                    })
                                  }
                                >
                                  {this.getNoOfClasses(mentor.id)}
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
          open={this.state.cohortListDialog}
          onClose={this.closeMentortListDialog}
          scroll={"paper"}
          aria-labelledby="scroll-dialog-title"
          fullWidth={true}
          maxWidth={"sm"}
        >
          <CohortList
            mentorId={this.state.mentorId}
            close={this.closeMentortListDialog}
          />
        </Dialog>
      </div>
    );
  }
}

export default Auth(withStyles(styles)(Mentor));
