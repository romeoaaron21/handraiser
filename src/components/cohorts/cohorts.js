import React from 'react';
import axios from 'axios';

import Container from '@material-ui/core/Container';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import AddIcon from '@material-ui/icons/Add';

import AddClass from './modals/mentor/add';
import DeleteClass from './modals/mentor/delete';
import EnrollToClass from './modals/student/enroll';
import LeaveClass from './modals/student/leave'

const styles = theme => ({
  container: {
    paddingTop: theme.spacing(2),
    display: 'flex',
    flexWrap: 'wrap'
  },
  card: {
    height: 200,
    width: 250,
    margin: theme.spacing(2)
  },
  addCardContainer: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  wholeCardContainer: {
    height: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  cardContainer: {
    height: '75%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  buttonContainer: {
    height: '25%',
    paddingTop: 0,
    paddingBottom: 0
  },
  add: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
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
      add: false,
      delete: false,
      enroll: false,
      leave: false,
      selected: ''
    }
  }

  componentDidMount(){
    if(this.state.privilege === 'mentor'){
      axios(`http://localhost:3001/api/mentor/${this.state.id}/cohorts/`, {
        method: 'get'
      }).then((res) => {
        console.log(res.data.cohorts)
        this.setState({
          cohorts: res.data.cohorts.reverse()
        })
      }).catch((err) => {

      })
    }else{
      axios(`http://localhost:3001/api/cohorts/`, {
        method: 'get'
      }).then((res) => {
        console.log(res.data.cohorts)
        this.setState({
          cohorts: res.data.cohorts
        })
      }).catch((err) => {
        
      })
      axios(`http://localhost:3001/api/student/${this.state.id}/cohorts/`, {
        method: 'get'
      }).then((res) => {
        console.log(res.data.member)
        this.setState({
          member: res.data.member
        })
      })
    }
  }

  openAdd = () => {
    this.setState({
      add: true
    })
  }

  openDelete = (e) => {
    this.setState({
      delete: true,
      selected: e.currentTarget.getAttribute('id')
    })
  }

  openEnroll = (e) => {
    let id = e.currentTarget.getAttribute('id');
    let array = e.currentTarget.getAttribute('name').split(",");
    let check = array.find(name => name === 'goToClass');
    console.log(id)

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

  add = (name, password) => {
    const state = {
      name, password
    }
    axios(`http://localhost:3001/api/cohorts/mentor/${this.state.id}/add`, {
      method: 'post',
      data: state
    }).then(() => {
      this.componentDidMount();
    }).catch(() => {

    })
  }

  delete = (id) => {
    axios(`http://localhost:3001/api/cohorts/${id}`, {
      method: 'get'
    }).then(() => {
      this.componentDidMount();
    })
  }

  enroll = (id, password) => {
    let studentid = this.state.id;
    const state = {
      studentid, password
    }
    axios(`http://localhost:3001/api/cohorts/${id}/students`, {
      method: 'post',
      data: state
    }).then(() => {
      this.componentDidMount();
    })
  }

  leave = (id) => {
    // console.log(id, this.state.id)
    
    axios(`http://localhost:3001/api/cohorts/${id}/students/${this.state.id}`, {
      method: 'get',
    }).then(() => {
      this.componentDidMount();
    })
  }
  
  render(){
    const { classes } = this.props;
    return(
      <Container maxWidth="md" className={classes.container}>
      { this.state.privilege === 'mentor' ? 
        <React.Fragment>
          <Card className={classes.card}>
            <CardActionArea className={classes.addCardContainer} onClick={this.openAdd}>
              <CardContent >
                <div className={classes.add}>
                  <AddIcon />
                </div>
              </CardContent>
            </CardActionArea>
          </Card>
        { this.state.cohorts.map(cohort => (
          <Card className={classes.card} key={cohort.id}>
            <CardActionArea className={classes.cardContainer}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {cohort.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Password: {cohort.password}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Class Members: 
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions className={classes.buttonContainer}>
              <Button size="small" color="primary" id={cohort.id} onClick={this.openDelete}>
                Delete
              </Button>
              <Button size="small" color="primary">
                Students
              </Button>
            </CardActions>
          </Card>
        ))}
        </React.Fragment>
      :
        <React.Fragment>
      { this.state.cohorts.map(cohort => { 
        return (
          <Card className={classes.card} key={cohort.id}>
            <CardActionArea
            id={cohort.id}
            onClick={this.openEnroll}
            name=
            { this.state.member.map(member => {
              if(member.cohortid === cohort.id){ 
                return 'goToClass'
              }else{
                return 'enroll'
              }
            })}
            className=
            { this.state.member.map(member => {
              if(member.cohortid === cohort.id){ 
                return classes.cardContainer
              }else{
                return classes.wholeCardContainer
              }
            })}
            >
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {cohort.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Mentor: {cohort.firstname+' '+cohort.lastname}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Class Members: 
                </Typography>
              </CardContent>
            </CardActionArea>
      { this.state.member.map(member => {
        if(member.cohortid === cohort.id){
          return (
            <CardActions className={classes.buttonContainer} key={member.id}>
              <Button size="small" color="primary" id={cohort.id} onClick={this.openLeave}>
                Leave
              </Button>
            </CardActions>
          )
        } 
      })}
          </Card>
        )
      })}
        </React.Fragment>
      }
        <AddClass 
          open={this.state.add}
          close={this.closeModal}
          add={this.add}
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
      </Container>
    )
  }
}

export default withStyles(styles)(Cohorts)