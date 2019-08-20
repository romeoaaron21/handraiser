import React from 'react';
import clsx from 'clsx';
import { ToastContainer, toast } from 'react-toastify';
import io from 'socket.io-client';

import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';

//Modals
import AddClass from './modals/mentor/add';
import DeleteClass from './modals/mentor/delete';
import EnrollToClass from './modals/student/enroll';
import LeaveClass from './modals/student/leave'

//Cards
import StudentClassCards from './cards/student';
import MentorClassCards from './cards/mentor';

//API
import api from './../../services/fetchApi';

//AUTH
import Auth from '../../auth/Auth';
import AuthService from '../../auth/AuthService';

//NAVIGATION
import NavBar from '../common-components/nav-bar/navBar';
import SideNav from '../common-components/side-nav/sideNav';

import { Link, Redirect } from 'react-router-dom';

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
    marginLeft: 0,
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
  container: {
    paddingTop: theme.spacing(2),
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  center: {
    maxWidth: 1000,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#e0e0e0',
    '&:hover': {
      backgroundColor: '#e0e0e0',
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(2),
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
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '100%',
    },
  },
});

const socketUrl = 'http://localhost:3001/';
const socket = io('http://localhost:3001/');

class Cohorts extends React.Component{
  constructor(){
    super();

    this.Auth = new AuthService();
    this.fetch = this.Auth.getFetchedTokenAPI();

    this.state = {
      privilege: 'mentor',
      id: 3,
      cohorts: [],
      member: [],
      add: false,
      delete: false,
      enroll: false,
      leave: false,
      open: false,
      selected: '',
      cohort_id: '',
      socket: null
    }
  }

  //NAVIGATION
  handleDrawerOpen = () => {
    this.setState({ open: true})
  }

  handleDrawerClose = () => {
    this.setState({ open: false})
  }

  componentDidMount(){
    document.title = 'Cohorts';
    this.fetch.then(fetch => {
      const user = fetch.data.user[0];
      if(user.privilege === 'mentor'){
        api.fetch(`/api/mentor/${user.id}/cohorts/`, 'get').then((res) => {
          socket.emit('displayCohorts', res.data.cohorts.reverse());
        })
      }else{
        api.fetch(`/api/cohorts/`, 'get').then((res) => {
          socket.emit('displayCohorts', res.data.cohorts.reverse());
        })
        api.fetch(`/api/student/${user.id}/cohorts/`, 'get').then((res) => {
          socket.emit('displayMember', res.data.member);
        })
      }
      this.setState({
        id: user.id,
        privilege: user.privilege
      })
    })
  }

  componentWillMount(){
    const socket = io(socketUrl);
		socket.on('connect', () => {
			console.log('CONNECTED');
		});
    this.setState({ socket });
    
    socket.on('displayCohorts', (cohorts) => {
			this.setState({ cohorts })
    });
    socket.on('displayMember', (member) => {
			this.setState({ member })
		});
  }

  openAdd = () => {
    this.setState({ add: true })
  }

  openDelete = (e) => {
    this.setState({
      delete: true,
      selected: e.currentTarget.getAttribute('id')
    })
  }

  redirect = (cohort_id) => {
    //Dito ilagay redirect to classes!
    if(cohort_id !== 'mentor'){
      this.setState({ cohort_id })  
    }else{
      console.log('asd');
    }
    // window.location.href = `/queue/${cohort_id}`;
  }

  openEnroll = (e,cohort_id) => {
    let array = e.currentTarget.getAttribute('name').split(",");
    let check = array.find(name => name === 'goToClass');
    if(check){
      this.redirect(cohort_id);
    }else{
      this.setState({
        enroll: true,
        selected: e.currentTarget.getAttribute('id')
      })
    }
  }

  openLeave = (e) => {
    this.setState({
      leave: true,
      selected: e.currentTarget.getAttribute('id')
    })
  }

  closeModal = () => {
    this.setState({
      add: false,
      delete: false,
      enroll: false,
      leave: false,
    })
  }

  add = (name, password, mentor_id) => {
    const state = { name, password }
    let check = this.state.cohorts.find(cohorts => cohorts.name === name);
    if(!check){
      api.fetch(`/api/cohorts/mentor/${mentor_id}/add`, 'post', state).then(() => {
        this.componentDidMount();
      })
    }else{
      toast.error("Class already exists!", {
        hideProgressBar: true,
        draggable: false,
      });
    }
  }

  delete = (id) => {
    api.fetch(`/api/cohorts/${id}`, 'get').then(() => {
      this.componentDidMount();
    })
  }

  enroll = (id, password) => {
    let student_id = this.state.id;
    const state = { student_id, password }
    api.fetch(`/api/cohorts/${id}/students`, 'post', state).then(() => {
      this.componentDidMount();
    })
  }

  leave = (id) => {
    api.fetch(`/api/cohorts/${id}/students/${this.state.id}`, 'get').then(() => {
      this.componentDidMount();
    })
  }

  search = (e) => {
    if(e.currentTarget.value === ''){ 
      return this.componentDidMount();
    }
    if(this.state.privilege !== 'student'){
      api.fetch(`/api/cohorts/${e.currentTarget.value}/search/mentor/${this.state.id}`, 'get').then((res) => {
        this.setState({ cohorts: res.data.cohorts })
      })
    }else{
      api.fetch(`/api/cohorts/${e.currentTarget.value}/search`, 'get').then((res) => {
        this.setState({ cohorts: res.data.cohorts })
      })
    }
  }

  render(){
    const { classes } = this.props;
    
    return(
      <div className={classes.root}>
        <NavBar
          open = {this.state.open}
          title = 'Handraiser'
          handleDrawerOpenFn = {this.handleDrawerOpen}
        />
        <SideNav
          open = {this.state.open}
          handleDrawerCloseFn = {this.handleDrawerClose}
        />
        <ToastContainer
          enableMultiContainer
          position={toast.POSITION.TOP_RIGHT}
        />
        <main className={clsx(classes.content, { [classes.contentShift]: this.state.open, })}>
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
                  input: classes.inputInput,
                }}
                onChange={this.search}
                fullWidth
                inputProps={{ 'aria-label': 'search' }}
              />
            </div>
            <div className={classes.center}>
            { this.state.privilege !== 'student' ?
              <MentorClassCards
                cohorts={this.state.cohorts}
                openAdd={this.openAdd}
                openDelete={this.openDelete}
                redirect={this.redirect}
              />
            :
              <StudentClassCards
                cohorts={this.state.cohorts}
                members={this.state.member}
                openEnroll={this.openEnroll}
                openLeave={this.openLeave}
              />
            }
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
            </div>
          </Container>
        </main>
        {this.state.cohort_id ? 
          <Redirect to={{
            pathname: '/queue',
            state: { cohort_id:this.state.cohort_id }
        }}
          />
          : null }
      </div>
    )
  }
}

export default Auth(withStyles(styles)(Cohorts));
