import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';

import PersonIcon from '@material-ui/icons/Person';

const styles = theme => ({
  list: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  }
})

class StudentList extends React.Component {

  render(){
    const { classes, students, close, open, scroll, id} = this.props
    return (
      <Dialog
        open={open}
        onClose={close}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
      >
        <DialogTitle id="scroll-dialog-title">Students</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText>
            { students.map(student => (
                <List className={classes.list} key={student.id}>
                  <ListItem button>
                    <ListItemAvatar>
                      <Avatar alt={student.first_name+' '+student.last_name} src={student.avatar} />
                    </ListItemAvatar>
                      <ListItemText primary={student.first_name+' '+student.last_name}/>
                    { student.student_id === id ? 
                      <ListItemSecondaryAction>
                        <PersonIcon />
                      </ListItemSecondaryAction>
                      :
                      null
                    }
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </List>
              ))
            }
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={close} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default withStyles(styles)(StudentList);