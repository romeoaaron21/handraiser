import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  formControl: {
    marginTop: theme.spacing(1),
    minWidth: 120,
    width: '100%'
  },
});


class AddClass extends React.Component{
  constructor(){
    super();

    this.state = {
      name: '',
      password: '',
      mentor: '',
    }
  }

  onType = (e) => {
    this.setState({
      [e.target.getAttribute('id')]: e.target.value
    })
  }

  submit = () => {
    if(this.props.mentors.length !== 0){
      if(this.state.name !== '' || this.state.password !== '' || this.state.mentor !== ''){
        this.props.add(this.state.name, this.state.password, this.state.mentor)
        this.props.close();
      }else{
        console.log('Fill up required fields!');
      }
    }else{
      if(this.state.name !== '' || this.state.password !== ''){
        this.props.add(this.state.name, this.state.password, this.props.id)
        this.props.close();
      }else{
        console.log('Fill up required fields!');
      }
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render(){
    const { classes, open, close, mentors, id } = this.props;
    return(
      <Dialog open={open} onClose={close} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Add Class</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please Fill up the forms.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Class Name"
              type="name"
              onChange={this.onType}
              fullWidth
            />
            <TextField
              autoFocus
              margin="dense"
              id="password"
              label="Password"
              type="pass"
              onChange={this.onType}
              fullWidth
            />
            { mentors.length !== 0 ?
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="id-helper">Mentor</InputLabel>
              <Select
                value={this.state.mentor}
                onChange={this.handleChange}
                input={<Input name="mentor" id="id-helper" />}
                fullWidth
              >
                <MenuItem value="" disabled>
                  <em>Select Mentor</em>
                </MenuItem>
              {mentors.map(mentor => 
                <MenuItem key={mentor.id} value={mentor.id}>{mentor.first_name+' '+mentor.last_name}</MenuItem>
              )}
              </Select>
            </FormControl>
            :
            null
            }
          </DialogContent>
          <DialogActions>
            <Button onClick={close} color="primary">
              Cancel
            </Button>
            <Button onClick={this.submit} color="primary" autoFocus>
              Add
            </Button>
          </DialogActions>
        </Dialog>
    )
  }
}

export default withStyles(styles)(AddClass)