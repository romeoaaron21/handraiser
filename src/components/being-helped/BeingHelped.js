import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';

const styles = theme => ({
    leftNav: {
        padding: theme.spacing(2, 3),
        maxWidth: 'auto',
        maxheigth: '310px',
        // boxShadow: ' 0px 0px 3px 0px rgba(176,173,176,1)',
        boxShadow: '0 1px 2px 0 rgba(60,64,67,0.302), 0 2px 6px 2px rgba(60,64,67,0.149)'
    },
    list: {
        maxHeight: '52px',
        marginTop: '15px'
    },
    userAvatar: {
        width: 35,
        height: 35,
    }
})

class BeingHelped extends Component {

    render() {
        const { classes } = this.props

        return (
            <div>
                <Paper className={classes.leftNav}>
                    <Typography variant="h6" align="center">
                        Being helped
                    </Typography>
                    <ListItem className={classes.list}>
                        <ListItemAvatar>
                            <Avatar src="https://lh6.googleusercontent.com/-_OuXadnBbqs/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rfEr_FE92jf3RrOO98KilrRcrinvw/s96-c/photo.jpg"
                                className={classes.userAvatar} />
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