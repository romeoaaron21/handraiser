import React from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class Enroll extends React.Component {
  constructor(){
    super();

    this.state = {
      password: ''
    }
  }

  onType = (e) => {
    this.setState({
      [e.target.getAttribute('id')]: e.target.value
    })
  }

  submit = () => {
    if(this.state.password !== ''){
      this.props.enroll(this.props.id, this.state.password)
      this.props.close();
    }else{
      console.log('Fill up required fields!');
    }
  }

  render(){
    const { open, close, id } = this.props;
    return(
      <Dialog open={open} onClose={close} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Enroll to Class</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter class password provided by your Mentor:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="password"
            label="Class Password"
            type="password"
            fullWidth
            onChange={this.onType}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={close} color="primary">
            Cancel
          </Button>
          <Button onClick={this.submit} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default Enroll