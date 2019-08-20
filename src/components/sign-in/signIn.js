import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { ToastContainer, toast } from 'react-toastify';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Person from '@material-ui/icons/Person';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import 'react-toastify/dist/ReactToastify.css';

const styles = {
  paper: {
    marginTop: 80,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '@media (max-width: 780px)' : {
      display: 'none',
    }
  },
  avatar: {
    margin: 2,
    backgroundColor: '#780aaf',
  },
  form: {
    width: '100%',
    marginTop: 18,
  },
  submit: {
    marginTop: 7,
    backgroundColor: '#780aaf',
    '&:hover': {
      backgroundColor: '#a219e6'
    }
  },
  link: {
    marginTop: 10,
  }
}


class signIn extends Component {
  constructor() {
    super()
    this.state = {
      username: ' ',
      password: ' ',
      showSpinner: false
    }
  }

  componentDidMount() {
    document.title = 'Sign-in'
  }

  inputChecker = (value, option) => {
    if (option === 'username') {
      this.setState({
        username: value,
      })
    } else {
      this.setState({
        password: value,
      })
    }
  }

  render() {
    const { classes } = this.props

    return (
      <Container component="main" maxWidth="xs" mt={100} >
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <Person />
          </Avatar>
          <Typography component="h1" variant="h5">
            Admin
          </Typography>
          <form className={classes.form} onSubmit={this.login}>
            <TextField
              style={{ marginBottom: '-3px' }}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Username"
              error={this.state.username === '' ? true : false}
              helperText={this.state.username === '' ? 'Username is required' : ' '}
              InputLabelProps={{ required: false }}
              onBlur={e => this.inputChecker(e.target.value, 'username')}
              onChange={e => this.inputChecker(e.target.value, 'username')}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              error={this.state.password === '' ? true : false}
              helperText={this.state.password === '' ? 'Password is required' : ' '}
              InputLabelProps={{ required: false }}
              onBlur={e => this.inputChecker(e.target.value, 'password')}
              onChange={e => this.inputChecker(e.target.value, 'password')}
            />
​
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
          </form>
        </div>
      </Container>
    );
  }
}

export default withStyles(styles)(signIn)
