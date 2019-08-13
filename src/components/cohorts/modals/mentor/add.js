import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class AddClass extends React.Component{
  constructor(){
    super();

    this.state = {
      name: '',
      password: ''
    }
  }

  onType = (e) => {
    this.setState({
      [e.target.getAttribute('id')]: e.target.value
    })
  }

  submit = () => {
    if(this.state.name !== '' || this.state.password !== ''){
      this.props.add(this.state.name, this.state.password)
      this.props.close();
    }else{
      console.log('Fill up required fields!');
    }
  }

  render(){
    const { open, close } = this.props
    return(
      <Dialog open={open} onClose={close} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Add Class</DialogTitle>
          <DialogContent>
            {/* <DialogContentText>
              To subscribe to this website, please enter your email address here. We will send updates
              occasionally.
            </DialogContentText> */}
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
          </DialogContent>
          <DialogActions>
            <Button onClick={close} color="primary">
              Cancel
            </Button>
            <Button onClick={this.submit} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
    )
  }
}

export default AddClass