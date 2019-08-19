import React, { Component } from 'react';
//material ui
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle';

//api
import api from '../../services/fetchApi';
const styles = (theme) => ({
	dialogWrapper: {
		backgroundColor: '#780aaf',
		minHeight: '150px'
	},
	text: {
		textAlign: 'center',
		color: '#fff'
	}
});

class BeingHelpedModal extends Component {
	constructor() {
		super();
		this.state = {
			open: false
		};
	}
	//move back student to the queue
	removeFromQueue = (student) => {
		const data = api.fetch(`/api/removebeinghelped/${student.id}/${this.props.cohort_id}`, 'get');
		data.then((res) => {
			this.props.helpStudentClose();
		});
	};
	//done helping student
	doneHelp = (student) => {
		const data = api.fetch(`/api/doneHelp/${student.id}/${this.props.cohort_id}`, 'get');
		data.then((res) => {
			this.props.helpStudentClose();
		});
	};

	render() {
		const { classes } = this.props;
		return (
			<div>
				<Dialog
					open={this.props.helpingStudent.length !== 0 ? true : this.props.helpStudentModal}
					aria-labelledby="alert-dialog-title"
				>
					<DialogTitle classes={{ root: classes.dialogWrapper }}>
						<Grid container justify="center">
							<Grid item xs={12} sm={12}>
								<Typography variant="h6" component="h3" className={classes.text}>
									Currently Helping...
								</Typography>
							</Grid>
							<Grid item xs={12} sm={7} className={classes.text}>
								<AccountCircle style={{ color: '#fff', fontSize: '60px' }} />
								{this.props.helpingStudent ?
									<Typography variant="h4" component="h3">
										{this.props.helpingStudent.first_name.charAt(0).toUpperCase() + this.props.helpingStudent.first_name.slice(1)} {this.props.helpingStudent.last_name.charAt(0).toUpperCase() + this.props.helpingStudent.last_name.slice(1)}
									</Typography>
									:
									null
								}
							</Grid>
						</Grid>
					</DialogTitle>

					<DialogActions>
						<Button color="primary" onClick={() => this.removeFromQueue(this.props.helpingStudent)}>
							Back
						</Button>
						<Button onClick={() => this.doneHelp(this.props.helpingStudent)} color="primary">
							Done
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}

export default withStyles(styles)(BeingHelpedModal);
