import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Box from '@material-ui/core/Box';

const styles = theme => ({
    leftNav: {
        padding: theme.spacing(2, 3),
        maxWidth: 'auto',
        maxheigth: '300px',
        boxShadow: ' 0px 0px 3px 0px rgba(176,173,176,1)',
    },
})

class BeingHelped extends Component {

    render() {
        const { classes } = this.props

        return (
            <div>
                <Paper className={classes.leftNav}>
                    <Typography component="p">
                        Being helped
                                </Typography>
                    <ListItem>
                        <ListItemAvatar>
                            <AccountCircle style={{ color: '#077ce8', fontSize: '30px' }} />
                        </ListItemAvatar>
                        <ListItemText>
                            <Typography component="p">Juan Abunda</Typography>
                        </ListItemText>
                    </ListItem>
                </Paper>
            </div>
        )
    }
}

export default withStyles(styles)(BeingHelped);