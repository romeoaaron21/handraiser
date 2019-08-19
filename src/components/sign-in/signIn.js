import React, { Component } from 'react';
import decode from 'jwt-decode';

import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Dialog from '@material-ui/core/Dialog';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Person from '@material-ui/icons/Person';
import Typography from '@material-ui/core/Typography';
import GoogleLogin from 'react-google-login';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from './signIn.component.style';

import api from '../../services/fetchApi';
import AuthService from '../../auth/AuthService';
import SignInKey from './dialogs/validateKey';
import GoogleSignIn from './dialogs/googleSignIn';

class SignInSide extends Component {
  constructor() {
    super();
    this.Auth = new AuthService();

    this.state = {
      validateKeyDialog: false,
      signInGoogleDialog: false,
      validatedKey: ''
    }
  }

  componentDidMount() {
    document.title = 'Welcome to Handraiser';
    if (this.Auth.loggedIn()) {
      window.location.href = '/cohorts';
    }
  }

  openValidateKeyDialog = () => this.setState({ validateKeyDialog: true });
  closeValidateKeyDialog = () => this.setState({ validateKeyDialog: false });
  getValidatedKey = (key) => {
    this.setState({ validatedKey: key })
  }

  openSignInGoogle = (key) => this.setState({ signInGoogleDialog: true });
  closeSignInGoogle = () => this.setState({ signInGoogleDialog: false });

  responseGoogleStudent = (res) => {
    localStorage.setItem("id_token", res.tokenId);
    const user = decode(res.tokenId);
    const data = {
      first_name : user.given_name,
      last_name : user.family_name,
      sub: user.sub,
      privilege: 'student',
      avatar: user.picture
    }

    api.fetch('/sign-in', 'post', data)
      .then(res => {
        if(res.data.user.privilege !== 'student') {
          toast.error("Sorry, you're not a student", {
            hideProgressBar: true,
            draggable: false,
          });        } else {
          window.location.href = '/cohorts';
        }
      })
  }

	render() {
		const { classes } = this.props
		return (
      <React.Fragment>
			<Container component="main" maxWidth="xs">
        <ToastContainer
          enableMultiContainer
          position={toast.POSITION.TOP_RIGHT}
        />
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<Person />
					</Avatar>
					<Typography component="h1" variant="h6" className={classes.title}>
						Sign in as..
					</Typography>
					<form className={classes.form}>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<GoogleLogin
									clientId="915213711135-usc11cnn8rudrqqikfe21l246r26uqh8.apps.googleusercontent.com"
									onSuccess={this.responseGoogleStudent}
									onFailure={this.responseGoogleStudent}
									cookiePolicy={'single_host_origin'}
									render={renderProps => (
										<Button
											fullWidth={true}
											className={`${classes.submit} ${classes.studentBtn}`}
											onClick={renderProps.onClick} disabled={renderProps.disabled}
										>
												Student
										</Button>
									)}
								/>
							</Grid>

              <Grid item xs={12}>
                <Button
                  fullWidth
                  className={classes.submit}
                  onClick = {this.openValidateKeyDialog}
                >
                  Mentor
                </Button>
              </Grid>
						</Grid>

						<Grid container alignItems="center">
              <Grid item className={classes.footer}>
								<Typography variant="body2" color="textSecondary" align="center">
									{'Hand Raiser 2019. Created by Team 3.'}
								</Typography>
              </Grid>
            </Grid>
					</form>
				</div>
			</Container>

      <Dialog
        open = {this.state.validateKeyDialog}
      >
        <SignInKey
          title = 'Enter sign-in key'
          label = 'Sign-in key'
          content = 'Ask administrator for your sign-in key'
          handleCancel = {this.closeValidateKeyDialog}
          openSignInGoogleFn = {this.openSignInGoogle}
          getValidatedKeyFn = {this.getValidatedKey}
        />
      </Dialog>

      {/* SIGN IN WITH GOOGLE */}
      <Dialog
        open = {this.state.signInGoogleDialog}
        onClose = {this.closeSignInGoogle}
      >
        <GoogleSignIn
          validatedKey = {this.state.validatedKey === '' ? null : this.state.validatedKey}
          title = 'Successfully, validated'
        />
      </Dialog>
      </React.Fragment>
		);
	}
}
export default withStyles(styles)(SignInSide);
