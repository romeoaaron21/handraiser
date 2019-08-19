import React from 'react';
import clsx from 'clsx';

import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';

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
  },
  center: {
    maxWidth: 1000,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  }
});

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
<<<<<<< HEAD
      open: false,
      selected: ''
=======
      selected: '',
      cohort_id: ''
>>>>>>> 09c4b15af6c0a53553b07739dbbf300d338c64f7
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
        api.fetch(`http://localhost:3001/api/mentor/${user.id}/cohorts/`, 'get').then((res) => {
          this.setState({
            cohorts: res.data.cohorts.reverse()
          })
        })
      }else{
        api.fetch(`http://localhost:3001/api/cohorts/`, 'get').then((res) => {
          this.setState({
            cohorts: res.data.cohorts.reverse()
          })
        })
        api.fetch(`http://localhost:3001/api/student/${user.id}/cohorts/`, 'get').then((res) => {
          this.setState({
            member: res.data.member
          })
        })
      }
      this.setState({
        id: user.id,
        privilege: user.privilege
      })
    })
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
    this.setState({cohort_id})
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
      console.log('enroll')
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
      api.fetch(`http://localhost:3001/api/cohorts/mentor/${mentor_id}/add`, 'post', state).then(() => {
        this.componentDidMount();
      })
    }else{
      console.log('Class already exists!');
    }
  }

  delete = (id) => {
    api.fetch(`http://localhost:3001/api/cohorts/${id}`, 'get').then(() => {
      this.componentDidMount();
    })
  }

  enroll = (id, password) => {
    let student_id = this.state.id;
    const state = { student_id, password }
    api.fetch(`http://localhost:3001/api/cohorts/${id}/students`, 'post', state).then(() => {
      this.componentDidMount();
    })
  }

  leave = (id) => {
    api.fetch(`http://localhost:3001/api/cohorts/${id}/students/${this.state.id}`, 'get').then(() => {
      this.componentDidMount();
    })
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
        <main className={clsx(classes.content, { [classes.contentShift]: this.state.open, })}>
          <div className={classes.drawerHeader} />
          <Container maxWidth="lg" className={classes.container}>
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
