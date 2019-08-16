import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
    raiseBtn: {
        backgroundColor: '#983cac',
        '&:hover': {
            backgroundColor: '#780aaf',
        }
    },
    userAvatar: {
        width: 56,
        height: 56,
        marginRight: 6
    }
})

class StudentHeader extends Component {

    render() {
        const { classes } = this.props
        return (
            <div>
                <Box item xs={12} sm={12} >
                    <Typography variant="h5" component="h3" align="center">
                        Boom Camp Spring 2019
                        </Typography>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar src="https://lh6.googleusercontent.com/-_OuXadnBbqs/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rfEr_FE92jf3RrOO98KilrRcrinvw/s96-c/photo.jpg" className={classes.userAvatar} />
                        </ListItemAvatar>
                        <ListItemText>
                            <Typography variant="h6" component="h3">Marvin Banton</Typography>
                        </ListItemText>
                        <Button variant="contained" color="primary" className={classes.raiseBtn}>
                            Raise hand
                        </Button>


                    </ListItem>
                </Box>
            </div>
        )
    }
}

export default withStyles(styles)(StudentHeader)