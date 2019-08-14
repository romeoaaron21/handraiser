import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Person from '@material-ui/icons/Person';
import Typography from '@material-ui/core/Typography';
import GoogleLogin from 'react-google-login';

import styles from './signIn.component.style'

const responseGoogle = (response) => {
  console.log(response);
}

class SignInSide extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    document.title = 'Welcome to Handraiser';
  }

	render() {
		const { classes } = this.props
		return (
			<Container component="main" maxWidth="xs">
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
									onSuccess={responseGoogle}
									onFailure={responseGoogle}
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
								<GoogleLogin
									clientId="915213711135-usc11cnn8rudrqqikfe21l246r26uqh8.apps.googleusercontent.com"
									onSuccess={responseGoogle}
									onFailure={responseGoogle}
									cookiePolicy={'single_host_origin'}
									render={renderProps => (
										<Button
											fullWidth
											className={classes.submit}
											onClick={renderProps.onClick} disabled={renderProps.disabled}
										>
											Mentor
										</Button>
									)}
								/>
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
		);
	}
}
export default withStyles(styles)(SignInSide);