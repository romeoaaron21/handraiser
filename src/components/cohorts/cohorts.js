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

import AddClass from './modals/mentor/add.js';
import DeleteClass from './modals/mentor/delete.js';

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
      privilege: 'mentor',
      id: 1,
      cohorts: [],
      add: false,
      delete: false,
      tobeDeleted: ''
    }
  }

  componentDidMount(){
    if(this.state.privilege === 'mentor'){
      axios(`http://localhost:3001/api/cohorts/mentor/${this.state.id}`, {
        method: 'get'
      }).then((res) => {
        console.log(res.data.cohorts)
        this.setState({
          cohorts: res.data.cohorts
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
      tobeDeleted: e.currentTarget.getAttribute('id')
    })
  }

  closeModal = () => {
    this.setState({
      add: false,
      delete: false
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
  
  render(){
    const { classes } = this.props
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
            {this.state.cohorts.map(cohort => (
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
            {this.state.cohorts.map(cohort => (
              <Card className={classes.card} key={cohort.id}>
                <CardActionArea className={classes.cardContainer}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {cohort.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      Mentor: 
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                      Class Members: 
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions className={classes.buttonContainer}>
                  <Button size="small" color="primary">
                    Delete
                  </Button>
                  <Button size="small" color="primary">
                    Students
                  </Button>
                </CardActions>
              </Card>
            ))}
            <Card className={classes.card}>
              <CardActionArea className={classes.cardContainer}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Class Title asdasdasdasdsa
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Mentor
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions className={classes.buttonContainer}>
                <Button size="small" color="primary">
                  Leave
                </Button>
                
              </CardActions>
            </Card>
            <Card className={classes.card}>
              <CardActionArea className={classes.wholeCardContainer}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Class Title
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Mentor (class not yet joined)
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
            <Card className={classes.card}>
              <CardActionArea className={classes.wholeCardContainer}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Class Title
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p">
                    Mentor (class not yet joined)
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
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
          id={this.state.tobeDeleted}
          delete={this.delete}
        />
      </Container>
    )
  }
}

export default withStyles(styles)(Cohorts)