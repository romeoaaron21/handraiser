import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = (theme) => ({
	raiseBtn: {
		backgroundColor: '#8220b3',
		'&:hover': {
			backgroundColor: '#780aaf'
		}
	}
});

class StudentHeader extends Component {
	render() {
		const { classes } = this.props;
		return (
			<div>
				<Box item xs={12} sm={12}>
					<Typography variant="h5" component="h3">
						{this.props.user.name.charAt(0).toUpperCase() + this.props.user.name.slice(1)}
					</Typography>
					<ListItem>
						<ListItemAvatar>
							<Avatar src={this.props.user.avatar} style={{ color: '#077ce8', fontSize: '70px' }} />
						</ListItemAvatar>
						<ListItemText>
							<Typography variant="h6" component="h3">
								{this.props.user.first_name.charAt(0).toUpperCase() + this.props.user.first_name.slice(1)} {this.props.user.last_name.charAt(0).toUpperCase() + this.props.user.last_name.slice(1)}
							</Typography>
						</ListItemText>
						{this.props.privilege === 'student' ? (
							<Button
								variant="contained"
								color="primary"
								className={classes.raiseBtn}
								disabled={this.props.btn}
								onClick={this.props.requestHelp}
							>
								{this.props.raise}
							</Button>
						) : null}
					</ListItem>
				</Box>
			</div>
		);
	}
}

export default withStyles(styles)(StudentHeader);
