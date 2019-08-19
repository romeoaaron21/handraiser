import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

const styles = (theme) => ({
	leftNav: {
		padding: theme.spacing(2, 3),
		maxWidth: 'auto',
		maxheigth: '300px',
		boxShadow: ' 0px 0px 3px 0px rgba(176,173,176,1)'
	}
});

class BeingHelped extends Component {
	render() {
		const { classes } = this.props;

		return (
			<div>
				<Paper className={classes.leftNav}>
					<Typography component="p">Being helped</Typography>

					<ListItem>
						<ListItemAvatar>
							{/* <img style={{ height: 28, borderRadius: '50%' }} src={beingHelped.avatar} /> */}
							<Avatar
								style={{ color: '#077ce8', fontSize: '33px' }}
								src={this.props.helpingStudent.avatar}
							/>
						</ListItemAvatar>
						{this.props.helpingStudent ?
							<ListItemText>
								<Typography component="p">
									{this.props.helpingStudent.first_name.charAt(0).toUpperCase() + this.props.helpingStudent.first_name.slice(1)} {this.props.helpingStudent.last_name.charAt(0).toUpperCase() + this.props.helpingStudent.last_name.slice(1)}
								</Typography>
							</ListItemText>
							:
							null
						}
					</ListItem>
				</Paper>
			</div>
		);
	}
}

export default withStyles(styles)(BeingHelped);
