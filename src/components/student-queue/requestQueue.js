import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar'
import AccountCircle from '@material-ui/icons/AccountCircle';
import Delete from '@material-ui/icons/Delete';
import ThumbsUp from '@material-ui/icons/PanTool';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import EmptyQueue from '../../images/noResult.svg';

//AUTH
import Auth from '../../auth/Auth';
import AuthService from '../../auth/AuthService';


const styles = (theme) => ({
	rightNav: {
        padding: theme.spacing(0, 1),
        maxWidth: 'auto',
        minHeight: '520px',
        maxHeight: '520px',
        // boxShadow: ' 0px 0px 3px 0px rgba(176,173,176,1)',
        boxShadow: '0 1px 2px 0 rgba(60,64,67,0.302), 0 2px 6px 2px rgba(60,64,67,0.149)',
        overflowY: 'scroll',
        borderBottomRightRadius: '5px',
        borderBottomLeftRadius: '5px',
    },
    rightTopNav: {
        padding: theme.spacing(2, 3),
        maxWidth: 'auto',
        boxShadow: ' 0px 0px 3px 0px rgba(176,173,176,1)',
        borderTopRightRadius: '5px',
        borderTopLeftRadius: '5px',
    },
    scrollBar: {
        '&::-webkit-scrollbar': {
            width: '0.3em'
        },
        '&::-webkit-scrollbar-track': {
            '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)'
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,.1)',
            borderRadius: '10px',
            outline: '1px solid slategrey'
        }
    },
    actionIcon: {
        cursor: 'pointer',
        color: '#91a1af',
        fontSize: '19px'
    },
    list: {
        maxHeight: '52px',
        '&:hover .actionShow': {
            display: 'inline-block'
        },
        '&:hover': {
            backgroundColor: '#f1f1f1',
        },
    },
    queueaction: {
        display: 'none',
    },
    queueName: {
        fontSize: '17px'
    },
    userAvatar: {
        width: 35,
        height: 35,
    },
    emptyQueue: {
        marginTop: 100,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'

    }

});


class requestQueue extends Component {
		
	render() {
		const { classes } = this.props;
		
		return (
			<div>
				<Paper className={classes.rightTopNav} square={true}>
					<Typography variant="h6" align="center">Queue Students</Typography>
				</Paper>
				<Paper className={`${classes.rightNav} ${classes.scrollBar}`} square={true}>
					<Box item xs={12} sm={8} mt={2}>
						{this.props.members.length>0 ? (
							this.props.members.map(
								(member) =>
									member.status === 'waiting' && this.props.cohort_id === member.cohort_id ? (
										<React.Fragment key={member.id}>
											<ListItem className={`${classes.list}`}>
												<ListItemAvatar>
													{/* <img style={{ height: 28, borderRadius: '50%' }} /> */}
													<Avatar
														style={{ color: '#077ce8', fontSize: '33px' }}
														src={member.avatar}
													/>
												</ListItemAvatar>

												<ListItemText>
													<Typography component="p" className={classes.queueName}>
														{member.first_name.charAt(0).toUpperCase() + member.first_name.slice(1)} {member.last_name.charAt(0).toUpperCase() + member.last_name.slice(1)}
													</Typography>
												</ListItemText>

												{member.privilege === 'student' && member.sub === this.props.sub ? (
													<Tooltip title="Cancel Request" placement="top">
														<IconButton
															onClick={() => this.props.removeStudentRequest(member.id)}
														>
															<Delete className={classes.actionIcon} />
														</IconButton>
													</Tooltip>
												) : null}
												{this.props.priv === 'mentor' ? (
													<div className={`${classes.queueaction} actionShow`}>
														<Tooltip title="Help Student" placement="top">
															<IconButton
																onClick={() => this.props.helpStudent(member.id)}
															>
																<ThumbsUp className={classes.actionIcon} />
															</IconButton>
														</Tooltip>

														<Tooltip title="Remove Request" placement="top">
															<IconButton
																onClick={() => {
																	this.props.removeStudentRequest(member.id);
																}}
															>
																<Delete className={classes.actionIcon} />
															</IconButton>
														</Tooltip>
													</div>
												) : null}
											</ListItem>
										</React.Fragment>
									) : 
									<Grid container className={classes.emptyQueue}>
									<img src={EmptyQueue} width="280" height="250" />
									<Typography variant="overline" display="block">No one needs help...</Typography>
								</Grid>
							)
						) :
						<Grid container className={classes.emptyQueue}>
									<img src={EmptyQueue} width="280" height="250" />
									<Typography variant="overline" display="block">No one needs help...</Typography>
								</Grid>

						}
					</Box>
				</Paper>
			</div>
		);
	}
}

export default withStyles(styles)(requestQueue);
