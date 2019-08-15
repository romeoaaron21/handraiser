import React from 'react';

import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';

//Modals
import AddClass from './modals/superAdmin/add';
import DeleteClass from './modals/superAdmin/delete';
import EnrollToClass from './modals/student/enroll';
import LeaveClass from './modals/student/leave'

//Cards
import StudentCards from './cards/student';
import NonStudentCards from './cards/nonStudent';

//API
import api from './../../services/services';

const styles = theme => ({
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

    this.state = {
      privilege: 'student',
      id: 3,
      cohorts: [],
      member: [],
      mentors: [],
      add: false,
      delete: false,
      enroll: false,
      leave: false,
      selected: ''
    }
  }

  componentDidMount(){
    if(this.state.privilege === 'mentor'){
      api.fetch(`http://localhost:3001/api/mentor/${this.state.id}/cohorts/`, 'get').then((res) => {
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
      if(this.state.privilege === 'student'){
        api.fetch(`http://localhost:3001/api/student/${this.state.id}/cohorts/`, 'get').then((res) => {
          this.setState({
            member: res.data.member
          })
        })
      }else{
        api.fetch(`http://localhost:3001/api/mentors/`, 'get').then((res) => {
          this.setState({
            mentors: res.data.mentor
          })
        })
      }
    }
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

  openEnroll = (e) => {
    let array = e.currentTarget.getAttribute('name').split(",");
    let check = array.find(name => name === 'goToClass');
    if(check){
      console.log('class')
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
    api.fetch(`http://localhost:3001/api/cohorts/mentor/${mentor_id}/add`, 'post', state).then(() => {
      this.componentDidMount();
    })
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
      <Container maxWidth="lg" className={classes.container}>
        <div className={classes.center}>
        { this.state.privilege !== 'student' ?
          <NonStudentCards 
            cohorts={this.state.cohorts}
            privilege={this.state.privilege}
            openAdd={this.openAdd}
            openDelete={this.openDelete}
          />
        :
          <StudentCards
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
            mentors={this.state.mentors}
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
    )
  }
}

export default withStyles(styles)(Cohorts)