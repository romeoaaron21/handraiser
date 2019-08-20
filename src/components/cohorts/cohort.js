import React from 'react';
import clsx from 'clsx';
import { withStyles, fade } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';


import NavBar from '../common-components/nav-bar/navBar';
import SideNav from '../common-components/side-nav/sideNav';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  paper: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
  cardContact: {
    height: '710px'
  },
  cardHeader: {
    backgroundColor: '#696968',
    color: '#ffffff',
    height: '32px'
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(7),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionSearch: {
    marginTop: '0%',
    marginRight: '0%',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
  inputField: {
    textAlign: 'center',
    color: '#005406',
    letterSpacing: '2px'
  }
});

class Mentor extends React.Component {
  constructor() {
    super();

    this.state = {
      open: true,
      search: ''
    }
  }

  componentDidMount() {
    document.title = 'Cohorts'
  }

  handleDrawerOpen = () => this.setState({ open: true});
  handleDrawerClose = () => this.setState({ open: false});

  handleSearch = (e) => this.setState({ search: e.target.value });

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <NavBar
          open = {this.state.open}
          title = 'Handraiser Admin'
          handleDrawerOpenFn = {this.handleDrawerOpen}
        />

        <SideNav
          open = {this.state.open}
          handleDrawerCloseFn = {this.handleDrawerClose}
        />

        <main className={clsx(classes.content, { [classes.contentShift]: this.state.open, })}>
          <div className={classes.drawerHeader} />
          <Paper className={classes.paper}>
            <Card className={classes.cardContact}>
              <CardHeader
                className = {classes.cardHeader}
                title = 'Cohorts'
                classes={{action: classes.actionSearch}}
                action= {
                  <Grid item={true} xs={8} sm={12}>
                    <div className={classes.search}>
                      <div className={classes.searchIcon}>
                        <SearchIcon />
                      </div>
                      <InputBase
                        placeholder="Search by cohorts name and mentor"
                        classes={{
                          root: classes.inputRoot,
                          input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                        onChange = {e => this.handleSearch(e)}
                      />
                    </div>
                  </Grid>
                }
              />
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Cohort name</TableCell>
                    <TableCell align="center">Mentor</TableCell>
                    <TableCell align="center">No. of students</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="center">{'React'}</TableCell>
                    <TableCell align="center">{'John Doe'}</TableCell>
                    <TableCell align="center">{'12'}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">{'Node'}</TableCell>
                    <TableCell align="center">{'Alex Doe'}</TableCell>
                    <TableCell align="center">{'5'}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Card>
          </Paper>
        </main>
      </div>
    );
  }
}

export default withStyles(styles)(Mentor);
