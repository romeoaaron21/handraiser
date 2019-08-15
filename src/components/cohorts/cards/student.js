import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  card: {
    height: 200,
    width: 300,
    margin: theme.spacing(2)
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
})

class StudentCards extends React.Component {
  render(){
    const { classes, cohorts, openEnroll, openLeave, members} = this.props
    return(
      <React.Fragment>
       { cohorts.map(cohort => {
        return (
          <Card className={classes.card} key={cohort.id}>
            <CardActionArea
            id={cohort.id}
            onClick={openEnroll}
            name=
            { 
              members.length !== 0 ?
                members.map(member => {
                  if(member.cohort_id === cohort.id){ 
                    return 'goToClass'
                  }else{
                    return 'enroll'
                  }
                })
              :
                'enroll'
            }
            className=
            { 
              members.length !== 0 ?
                members.map(member => {
                  if(member.cohort_id === cohort.id){ 
                    return classes.cardContainer
                  }else{
                    return classes.wholeCardContainer
                  }
                })
              :
                classes.wholeCardContainer
            }
            >
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {cohort.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Mentor: {cohort.first_name+' '+cohort.last_name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  Class Members: {cohort.members}
                </Typography>
              </CardContent>
            </CardActionArea>
      { members.map(member => {
        if(member.cohort_id === cohort.id){
          return (
            <CardActions className={classes.buttonContainer} key={member.id}>
              <Button size="small" color="primary" id={cohort.id} onClick={openLeave}>
                Leave
              </Button>
              <Button size="small" color="primary">
                Students
              </Button>
            </CardActions>
          )
        }else{
          return null
        }
      })}
          </Card>
        )
      })}
        </React.Fragment>
    )
  }
}

export default withStyles(styles)(StudentCards);