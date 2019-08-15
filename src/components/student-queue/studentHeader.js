import React, { Component } from 'react'
import {withStyles} from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircle from '@material-ui/icons/AccountCircle'
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
    raiseBtn: {
        backgroundColor: '#8220b3',
        '&:hover': {
            backgroundColor: '#780aaf',
        }
    },
})

class StudentHeader extends Component {
    
    render() {
        const {classes} = this.props
        return (
            <div>
                <Box item xs={12} sm={12} >
                    <Typography variant="h5" component="h3">
                        Boom Camp Spring 2019
                        </Typography>
                    <ListItem>
                        <ListItemAvatar>
                            <AccountCircle style={{ color: '#077ce8', fontSize: '70px' }} />
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