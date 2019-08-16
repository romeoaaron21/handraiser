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

const styles = theme => ({

    rightNav: {
        padding: theme.spacing(0, 1),
        maxWidth: 'auto',
        minHeight: '530px',
        maxHeight: '530px',
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
    }
})

class requestQueue extends Component {

    render() {
        const { classes } = this.props

        return (
            <div>
                <Paper className={classes.rightTopNav} square={true} >
                    <Typography variant="h6" align="center">
                        Queue Students
                    </Typography>
                </Paper>
                <Paper className={`${classes.rightNav} ${classes.scrollBar}`} square={true}>
                    <Box item xs={12} sm={8} mt={2}>
                        <ListItem className={`${classes.list}`}>
                            <ListItemAvatar>
                                <Avatar src="https://lh6.googleusercontent.com/-_OuXadnBbqs/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rfEr_FE92jf3RrOO98KilrRcrinvw/s96-c/photo.jpg"
                                className={classes.userAvatar} />
                            </ListItemAvatar>
                            <ListItemText>
                                <Typography variant="h6" component="h3" className={classes.queueName}>Marvin Banton</Typography>
                            </ListItemText>

                            {this.props.priv === 'student'

                                ?
                                <Tooltip title="Cancel Request" placement="top">
                                    <IconButton onClick={this.props.removeStudentRequest}>
                                        <Delete className={classes.actionIcon} />
                                    </IconButton>
                                </Tooltip>

                                :
                                null

                            }

                            {this.props.priv === 'mentor'

                                ?
                                <div className={`${classes.queueaction} actionShow`}>
                                    <Tooltip title="Help Student" placement="top">
                                        <IconButton onClick={this.props.helpStudent}>
                                            <ThumbsUp className={classes.actionIcon} />
                                        </IconButton>
                                    </Tooltip>

                                    <Tooltip title="Remove Request" placement="top">
                                        <IconButton onClick={this.props.removeStudentRequest}>
                                            <Delete className={classes.actionIcon} />
                                        </IconButton>
                                    </Tooltip>
                                </div>

                                :
                                null

                            }

                        </ListItem>
                        {/* <ListItem className={classes.list}>
                            <ListItemAvatar>
                                <AccountCircle style={{ color: '#077ce8', fontSize: '33px' }} />
                            </ListItemAvatar>
                            <ListItemText>
                                <Typography component="p" className={classes.queueName}>Pedro Maniac</Typography>
                            </ListItemText>

                            {this.props.priv === 'mentor'

                                ?
                                <div className={`${classes.queueaction} actionShow`}>
                                    <Tooltip title="Help Student" placement="top">
                                        <IconButton onClick={this.props.helpStudent}>
                                            <ThumbsUp className={classes.actionIcon} />
                                        </IconButton>
                                    </Tooltip>

                                    <Tooltip title="Remove Request" placement="top">
                                        <IconButton onClick={this.props.removeStudentRequest}>
                                            <Delete className={classes.actionIcon} />
                                        </IconButton>
                                    </Tooltip>
                                </div>

                                :
                                null

                            }

                        </ListItem>

                        <ListItem className={`${classes.list}`}>
                            <ListItemAvatar>
                                <AccountCircle style={{ color: '#077ce8', fontSize: '33px' }} />
                            </ListItemAvatar>
                            <ListItemText>
                                <Typography component="p" className={classes.queueName}>Sid Bercasio</Typography>
                            </ListItemText>

                            {this.props.priv === 'mentor'

                                ?
                                <div className={`${classes.queueaction} actionShow`}>
                                    <Tooltip title="Help Student" placement="top">
                                        <IconButton onClick={this.props.helpStudent}>
                                            <ThumbsUp className={classes.actionIcon} />
                                        </IconButton>
                                    </Tooltip>

                                    <Tooltip title="Remove Request" placement="top">
                                        <IconButton onClick={this.props.removeStudentRequest}>
                                            <Delete className={classes.actionIcon} />
                                        </IconButton>
                                    </Tooltip>
                                </div>

                                :
                                null

                            }

                        </ListItem>
                        <ListItem className={`${classes.list}`}>
                            <ListItemAvatar>
                                <AccountCircle style={{ color: '#077ce8', fontSize: '33px' }} />
                            </ListItemAvatar>
                            <ListItemText>
                                <Typography component="p" className={classes.queueName}>Juan Abunda</Typography>
                            </ListItemText>

                            {this.props.priv === 'mentor'

                                ?
                                <div className={`${classes.queueaction} actionShow`}>
                                    <Tooltip title="Help Student" placement="top">
                                        <IconButton onClick={this.props.helpStudent}>
                                            <ThumbsUp className={classes.actionIcon} />
                                        </IconButton>
                                    </Tooltip>

                                    <Tooltip title="Remove Request" placement="top">
                                        <IconButton onClick={this.props.removeStudentRequest}>
                                            <Delete className={classes.actionIcon} />
                                        </IconButton>
                                    </Tooltip>
                                </div>

                                :
                                null

                            }

                        </ListItem>
                        <ListItem className={`${classes.list}`}>
                            <ListItemAvatar>
                                <AccountCircle style={{ color: '#077ce8', fontSize: '33px' }} />
                            </ListItemAvatar>
                            <ListItemText>
                                <Typography component="p" className={classes.queueName}>George Dela tore</Typography>
                            </ListItemText>

                            {this.props.priv === 'mentor'

                                ?
                                <div className={`${classes.queueaction} actionShow`}>
                                    <Tooltip title="Help Student" placement="top">
                                        <IconButton onClick={this.props.helpStudent}>
                                            <ThumbsUp className={classes.actionIcon} />
                                        </IconButton>
                                    </Tooltip>

                                    <Tooltip title="Remove Request" placement="top">
                                        <IconButton onClick={this.props.removeStudentRequest}>
                                            <Delete className={classes.actionIcon} />
                                        </IconButton>
                                    </Tooltip>
                                </div>
                                :
                                null

                            }

                        </ListItem>
                        <ListItem className={`${classes.list}`}>
                            <ListItemAvatar>
                                <AccountCircle style={{ color: '#077ce8', fontSize: '33px' }} />
                            </ListItemAvatar>
                            <ListItemText>
                                <Typography component="p" className={classes.queueName}>April Salandoni</Typography>
                            </ListItemText>

                            {this.props.priv === 'mentor'

                                ?
                                <div className={`${classes.queueaction} actionShow`}>
                                    <Tooltip title="Help Student" placement="top">
                                        <IconButton onClick={this.props.helpStudent}>
                                            <ThumbsUp className={classes.actionIcon} />
                                        </IconButton>
                                    </Tooltip>

                                    <Tooltip title="Remove Request" placement="top">
                                        <IconButton onClick={this.props.removeStudentRequest}>
                                            <Delete className={classes.actionIcon} />
                                        </IconButton>
                                    </Tooltip>
                                </div>

                                :
                                null

                            }

                        </ListItem>
                        <ListItem className={`${classes.list}`}>
                            <ListItemAvatar>
                                <AccountCircle style={{ color: '#077ce8', fontSize: '33px' }} />
                            </ListItemAvatar>
                            <ListItemText>
                                <Typography component="p" className={classes.queueName}>Bong Nebrija</Typography>
                            </ListItemText>

                            {this.props.priv === 'mentor'

                                ?
                                <div className={`${classes.queueaction} actionShow`}>
                                    <Tooltip title="Help Student" placement="top">
                                        <IconButton onClick={this.props.helpStudent}>
                                            <ThumbsUp className={classes.actionIcon} />
                                        </IconButton>
                                    </Tooltip>

                                    <Tooltip title="Remove Request" placement="top">
                                        <IconButton onClick={this.props.removeStudentRequest}>
                                            <Delete className={classes.actionIcon} />
                                        </IconButton>
                                    </Tooltip>
                                </div>

                                :
                                null

                            }

                        </ListItem>
                        <ListItem className={classes.list}>
                            <ListItemAvatar>
                                <AccountCircle style={{ color: '#077ce8', fontSize: '33px' }} />
                            </ListItemAvatar>
                            <ListItemText>
                                <Typography component="p" className={classes.queueName}>Pedro Maniac</Typography>
                            </ListItemText>

                            {this.props.priv === 'mentor'

                                ?
                                <div className={`${classes.queueaction} actionShow`}>
                                    <Tooltip title="Help Student" placement="top">
                                        <IconButton>
                                            <ThumbsUp className={classes.actionIcon} />
                                        </IconButton>
                                    </Tooltip>

                                    <Tooltip title="Remove Request" placement="top">
                                        <IconButton>
                                            <Delete className={classes.actionIcon} />
                                        </IconButton>
                                    </Tooltip>
                                </div>

                                :
                                null

                            }

                        </ListItem>

                        <ListItem className={`${classes.list}`}>
                            <ListItemAvatar>
                                <AccountCircle style={{ color: '#077ce8', fontSize: '33px' }} />
                            </ListItemAvatar>
                            <ListItemText>
                                <Typography component="p" className={classes.queueName}>Sid Bercasio</Typography>
                            </ListItemText>

                            {this.props.priv === 'mentor'

                                ?
                                <div className={`${classes.queueaction} actionShow`}>
                                    <Tooltip title="Help Student" placement="top">
                                        <IconButton>
                                            <ThumbsUp className={classes.actionIcon} />
                                        </IconButton>
                                    </Tooltip>

                                    <Tooltip title="Remove Request" placement="top">
                                        <IconButton>
                                            <Delete className={classes.actionIcon} />
                                        </IconButton>
                                    </Tooltip>
                                </div>

                                :
                                null

                            }

                        </ListItem>
                        <ListItem className={`${classes.list}`}>
                            <ListItemAvatar>
                                <AccountCircle style={{ color: '#077ce8', fontSize: '33px' }} />
                            </ListItemAvatar>
                            <ListItemText>
                                <Typography component="p" className={classes.queueName}>Juan Abunda</Typography>
                            </ListItemText>

                            {this.props.priv === 'mentor'

                                ?
                                <div className={`${classes.queueaction} actionShow`}>
                                    <Tooltip title="Help Student" placement="top">
                                        <IconButton>
                                            <ThumbsUp className={classes.actionIcon} />
                                        </IconButton>
                                    </Tooltip>

                                    <Tooltip title="Remove Request" placement="top">
                                        <IconButton>
                                            <Delete className={classes.actionIcon} />
                                        </IconButton>
                                    </Tooltip>
                                </div>

                                :
                                null

                            }

                        </ListItem>
                        <ListItem className={`${classes.list}`}>
                            <ListItemAvatar>
                                <AccountCircle style={{ color: '#077ce8', fontSize: '33px' }} />
                            </ListItemAvatar>
                            <ListItemText>
                                <Typography component="p" className={classes.queueName}>George Dela tore</Typography>
                            </ListItemText>

                            {this.props.priv === 'mentor'

                                ?
                                <div className={`${classes.queueaction} actionShow`}>
                                    <Tooltip title="Help Student" placement="top">
                                        <IconButton>
                                            <ThumbsUp className={classes.actionIcon} />
                                        </IconButton>
                                    </Tooltip>

                                    <Tooltip title="Remove Request" placement="top">
                                        <IconButton>
                                            <Delete className={classes.actionIcon} />
                                        </IconButton>
                                    </Tooltip>
                                </div>

                                :
                                null

                            }

                        </ListItem>
                        <ListItem className={classes.list}>
                            <ListItemAvatar>
                                <AccountCircle style={{ color: '#077ce8', fontSize: '33px' }} />
                            </ListItemAvatar>
                            <ListItemText>
                                <Typography component="p" className={classes.queueName}>Pedro Maniac</Typography>
                            </ListItemText>

                            {this.props.priv === 'mentor'

                                ?
                                <div className={`${classes.queueaction} actionShow`}>
                                    <Tooltip title="Help Student" placement="top">
                                        <IconButton>
                                            <ThumbsUp className={classes.actionIcon} />
                                        </IconButton>
                                    </Tooltip>

                                    <Tooltip title="Remove Request" placement="top">
                                        <IconButton>
                                            <Delete className={classes.actionIcon} />
                                        </IconButton>
                                    </Tooltip>
                                </div>

                                :
                                null

                            }

                        </ListItem>

                        <ListItem className={`${classes.list}`}>
                            <ListItemAvatar>
                                <AccountCircle style={{ color: '#077ce8', fontSize: '33px' }} />
                            </ListItemAvatar>
                            <ListItemText>
                                <Typography component="p" className={classes.queueName}>Sid Bercasio</Typography>
                            </ListItemText>

                            {this.props.priv === 'mentor'

                                ?
                                <div className={`${classes.queueaction} actionShow`}>
                                    <Tooltip title="Help Student" placement="top">
                                        <IconButton>
                                            <ThumbsUp className={classes.actionIcon} />
                                        </IconButton>
                                    </Tooltip>

                                    <Tooltip title="Remove Request" placement="top">
                                        <IconButton>
                                            <Delete className={classes.actionIcon} />
                                        </IconButton>
                                    </Tooltip>
                                </div>

                                :
                                null

                            }

                        </ListItem>
                        <ListItem className={`${classes.list}`}>
                            <ListItemAvatar>
                                <AccountCircle style={{ color: '#077ce8', fontSize: '33px' }} />
                            </ListItemAvatar>
                            <ListItemText>
                                <Typography component="p" className={classes.queueName}>Juan Abunda</Typography>
                            </ListItemText>

                            {this.props.priv === 'mentor'

                                ?
                                <div className={`${classes.queueaction} actionShow`}>
                                    <Tooltip title="Help Student" placement="top">
                                        <IconButton>
                                            <ThumbsUp className={classes.actionIcon} />
                                        </IconButton>
                                    </Tooltip>

                                    <Tooltip title="Remove Request" placement="top">
                                        <IconButton>
                                            <Delete className={classes.actionIcon} />
                                        </IconButton>
                                    </Tooltip>
                                </div>

                                :
                                null

                            }

                        </ListItem>
                        <ListItem className={`${classes.list}`}>
                            <ListItemAvatar>
                                <AccountCircle style={{ color: '#077ce8', fontSize: '33px' }} />
                            </ListItemAvatar>
                            <ListItemText>
                                <Typography component="p" className={classes.queueName}>George Dela tore</Typography>
                            </ListItemText>

                            {this.props.previledge === 'mentor'

                                ?
                                <div className={`${classes.queueaction} actionShow`}>
                                    <Tooltip title="Help Student" placement="top">
                                        <IconButton>
                                            <ThumbsUp className={classes.actionIcon} />
                                        </IconButton>
                                    </Tooltip>

                                    <Tooltip title="Remove Request" placement="top">
                                        <IconButton>
                                            <Delete className={classes.actionIcon} />
                                        </IconButton>
                                    </Tooltip>
                                </div>

                                :
                                null

                            }

                        </ListItem> */}
                    </Box>
                </Paper>
            </div>
        )
    }
}

export default withStyles(styles)(requestQueue)
