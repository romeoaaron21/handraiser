import React from 'react';
import clsx from 'clsx';
import { withStyles, fade } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
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
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


import NavBar from '../common-components/nav-bar/navBar';
import SideNav from '../common-components/side-nav/sideNav';
import Auth from '../../auth/auth';

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
    width: '350px',
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
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
      width: 320,
      '&:focus': {
        width: 400,
      },
    },
  },
  inputField: {
    textAlign: 'center',
    color: '#005406',
    letterSpacing: '2px',
  }
});

class MentorKeys extends React.Component {
  constructor() {
    super();

    this.state = {
      open: true,
      generateDialog: false,
      search: ''
    }
  }

  componentDidMount() {
    document.title = 'Generated Keys'
  }

  handleDrawerOpen = () => this.setState({ open: true});
  handleDrawerClose = () => this.setState({ open: false});

  openGenerateDialog = () => this.setState({ generateDialog: true });
  closeGenerateDialog = () => this.setState({ generateDialog: false });

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
          <Grid item={true} xs={8} sm={12} style={{textAlign: 'right'}}>
            <Button variant="contained" color="primary" onClick={() => this.openGenerateDialog()}>
              Generate new key
            </Button>
          </Grid>
          <Paper className={classes.paper}>
            <Card className={classes.cardContact}>
              <CardHeader
                className = {classes.cardHeader}
                title = 'Generated Keys'
                classes={{action: classes.actionSearch}}
                action= {
                  <Grid item={true} xs={8} sm={12}>
                    <div className={classes.search}>
                      <div className={classes.searchIcon}>
                        <SearchIcon />
                      </div>
                      <InputBase
                        placeholder="Search by sign-in key and name"
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
                    <TableCell align="center">Sign-in key</TableCell>
                    <TableCell align="center">Use by</TableCell>
                    <TableCell align="center">Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="center">{'2gh320'}</TableCell>
                    <TableCell align="center">{'John Doe'}</TableCell>
                    <TableCell align="center">{'using'}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center">{'kj234ju5'}</TableCell>
                    <TableCell align="center">{'---'}</TableCell>
                    <TableCell align="center">{'not use'}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Card>
          </Paper>
        </main>

        {/* GENERATE KEY */}
        <Dialog
          open = {this.state.generateDialog}
        >
          <DialogTitle id="form-dialog-title">{'Generate Key'}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {'This is your generated key'}
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="key"
              type="key"
              fullWidth
              value = {'34Etf3'}
              disabled
              InputProps = {{classes: {input: classes.inputField}}}
            />

          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.closeGenerateDialog()} color="primary">
              Cancel
            </Button>
            <Button
              color="primary"
            >
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default Auth(withStyles(styles)(MentorKeys));
