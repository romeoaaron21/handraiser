import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import BeingHelped from '../being-helped/BeingHelped';

import BeingHelpedModal from '../being-helped/beingHelpedModal';
import RemoveRequest from '../being-helped/removeRequestModal';
import StudentHeader from './studentHeader';
import RequestQueue from './requestQueue';

import io from 'socket.io-client';
import axios from 'axios';
import api from '../../services/fetchApi';
//AUTH
import Auth from '../../auth/Auth';
import AuthService from '../../auth/AuthService';


const styles = (theme) => ({
	root: {
		height: '100%',
		maxWidth: '1100px',
		margin: '0 auto'
	},
	header: {
		padding: theme.spacing(3, 3),
		marginTop: '80px',
		maxWidth: '1100px',
		margin: '0 auto',
		boxShadow: ' 0px 0px 3px 0px rgba(176,173,176,1)'
	},
	main: {
		marginTop: '8px'
	}
});

const socketUrl = 'http://localhost:3001/';
const socket = io('http://localhost:3001/');

class Student extends Component {
	constructor(props) {
		super(props);
		
		this.Auth = new AuthService();
   		this.fetch = this.Auth.getFetchedTokenAPI();
		
		this.state = {
			previledge: '',
			helpStudentModal: false,
			removeStudentReqModal: false,
			user: [],
			members: [],
			button: false,
			btntext: 'Raise Hand',
			socket: null,
			member: '',
			helpingStudent: '',
			sub: '',
			cohort_id: this.props.location.state.cohort_id
		};
	}

	helpStudent = (memberid) => {
		const data = api.fetch(`/api/helpStudent/${memberid}/${this.state.cohort_id}`, 'patch');
		data.then((res) => {
			this.fetchStudents();
			socket.emit('helpStudent', res.data[0]);
		});
		// this.setState({ helpStudentModal: true, helpingStudent: memberid });
	};

	helpStudentClose = () => {
		socket.emit('close', '1');
	};

	removeStudentRequest = (id) => {
		this.setState({ removeStudentReqModal: true, member: id });
	};

	removeStudentReqClose = () => [ this.setState({ removeStudentReqModal: false }) ];

	componentWillMount() {
		this.initSocket();
	}

	initSocket = () => {
		const socket = io(socketUrl);
		socket.on('connect', () => {
			console.log('CONECTED');
		});
		this.setState({ socket });

		socket.on('requestHelping', (students) => {
			console.log(students);
			this.setState({ members: students, button: true, btntext: 'Waiting for help' });
		});

		socket.on('deleteRequest', (students) => {
			this.setState({ members: students, button: false, btntext: 'Raise Hand' });
		});

		socket.on('helpStudent', (students) => {
			this.setState({
				helpStudentModal: true,
				helpingStudent: students
			});
		});

		socket.on('close', (students) => {
			this.setState({
				helpingStudent: '',
				helpStudentModal: false
			});
			if (this.state.helpingStudent === '') {
				this.setState({
					helpStudentModal: false
				});
				this.fetchStudents();
			}
		});

		socket.on('displayStudents', (students) => {
			this.setState({
				members: students
			});
			if (this.state.members) {
				this.state.members.map((member) => {
					if (member.sub === this.state.sub && member.status === 'inprogress') {
						this.setState({
							helpingStudent: member,
							button: true,
							btntext: 'Currently Helping'
						});
					} else if (member.sub === this.state.sub) {
						this.setState({
							button: true,
							btntext: 'Waiting for help'
						});
					}
					if (member.status === 'inprogress') {
						this.setState({
							helpingStudent: member
						});
					}
				});
			}
		});
	};

	fetchStudents = () => {
		const data = api.fetch(`/api/displayStudents/${this.state.cohort_id}`, 'get');
		data.then((res) => {
			socket.emit('displayStudents', res.data);
		});
	};

	componentDidMount() {
		this.fetch.then(fetch => {
			const user = fetch.data.user[0];
			this.setState({ sub: user.sub})
		const data = api.fetch(`/api/displayUserInfo/${user.sub}/${this.state.cohort_id}`, 'get');
		data.then((res) => {
			this.setState({
				user: res.data[0],
				previledge: res.data[0][0].privilege
			});
			data.then(() => {
				this.fetchStudents();
			});
		});
	})
	}

	requestHelp = () => {
		const data = api.fetch(`/api/requestHelp/${this.state.sub}/${this.state.cohort_id}`, 'post');
		data.then((res) => {
			// console.log(res.data)
			socket.emit('requestHelp', res.data);
		});
	};

	deleteRequest = (id) => {
		const data = api.fetch(`/api/deleteRequest/${id}/${this.state.cohort_id}`, 'delete');
		data.then((res) => {
			socket.emit('deleteRequest', res.data);
		});
	};

	render() {
		const { classes } = this.props;
		// console.log(this.state.cohort_id)
		return (
			<div>
				<div className={classes.root}>
					{this.state.user.length !== 0 ? (
						<Paper className={classes.header}>
							<StudentHeader
								user={this.state.user[0]}
								raise={this.state.btntext}
								btn={this.state.button}
								requestHelp={this.requestHelp}
								privilege={this.state.previledge}
							/>
						</Paper>
					) : (
						<React.Fragment />
					)}

					<Grid container className={classes.main} spacing={1}>
						<Grid item xs={12} sm={4}>
							{this.state.previledge === 'mentor' ? (
								<div>
									<BeingHelpedModal
										fetchStudents={this.fetchStudents}
										helpStudentModal={this.state.helpStudentModal}
										helpStudentClose={this.helpStudentClose}
										helpingStudent={this.state.helpingStudent}
										cohort_id={this.state.cohort_id}
									/>

									<RemoveRequest
										deleteRequest={this.deleteRequest}
										member={this.state.member}
										removeStudentReqModal={this.state.removeStudentReqModal}
										removeStudentReqClose={this.removeStudentReqClose}
									/>
								</div>
							) : (
								<BeingHelped helpingStudent={this.state.helpingStudent} />
							)}

							{this.state.previledge === 'student' ? (
								<RemoveRequest
									member={this.state.member}
									removeStudentReqModal={this.state.removeStudentReqModal}
									removeStudentReqClose={this.removeStudentReqClose}
									deleteRequest={this.deleteRequest}
								/>
							) : null}
						</Grid>

						<Grid item xs={12} sm={this.state.previledge === 'mentor' ? 12 : 8}>
							<RequestQueue
								sub={this.state.sub}
								priv={this.state.previledge}
								helpStudentModal={this.state.helpStudentModal}
								helpStudentClose={this.helpStudentClose}
								helpStudent={this.helpStudent}
								removeStudentRequest={this.removeStudentRequest}
								removeStudentReqModal={this.state.removeStudentReqModal}
								removeStudentReqClose={this.removeStudentReqClose}
								members={this.state.members}
							/>
						</Grid>
					</Grid>
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(Student);
