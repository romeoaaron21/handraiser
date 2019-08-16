import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import BeingHelped from '../being-helped/BeingHelped';
import BeingHelpedModal from '../being-helped/beingHelpedModal';
import RemoveRequest from '../being-helped/removeRequestModal';
import StudentHeader from './studentHeader';
import RequestQueue from './requestQueue';


const styles = theme => ({
    root: {
        height: '100%',
        maxWidth: '1100px',
        margin: '0 auto',
    },
    header: {
        padding: theme.spacing(3, 2),
        marginTop: '30px',
        maxWidth: '1100px',
        margin: '0 auto',
        boxShadow: '0 1px 2px 0 rgba(60,64,67,0.302), 0 2px 6px 2px rgba(60,64,67,0.149)',
    },
    main: {
        marginTop: '13px',
    },

});

class Student extends Component {
    constructor() {
        super()
        this.state = {
            previledge: 'student',
            open: false,
            helpStudentModal: false,
            removeStudentReqModal: false

        }
    }

    helpStudent = () => {
        this.setState({ helpStudentModal: true })
    }

    helpStudentClose = () => {
        this.setState({ helpStudentModal: false })
    }

    removeStudentRequest = () => {
        this.setState({ removeStudentReqModal: true })
    }

    removeStudentReqClose = () => {
        this.setState({ removeStudentReqModal: false })
    }

    render() {
        const { classes } = this.props

        return (
            <div className={classes.root}>
                <Paper className={classes.header}>
                    <StudentHeader />
                </Paper>

                <Grid container className={classes.main} spacing={1}>

                    <Grid item xs={12} sm={4}>
                        {this.state.previledge === 'mentor'

                            ?
                            <div>
                                <BeingHelpedModal
                                    helpStudentModal={this.state.helpStudentModal}
                                    helpStudentClose={this.helpStudentClose}
                                />

                                <RemoveRequest
                                    removeStudentReqModal={this.state.removeStudentReqModal}
                                    removeStudentReqClose={this.removeStudentReqClose}
                                />
                            </div>

                            :

                            <BeingHelped />
                        }

                        {this.state.previledge === 'student'

                            ?

                            <RemoveRequest
                                removeStudentReqModal={this.state.removeStudentReqModal}
                                removeStudentReqClose={this.removeStudentReqClose}
                            />

                            :

                            null

                        }
                    </Grid>

                    <Grid item xs={12} sm={this.state.previledge === 'mentor' ? 12 : 8}>
                        <RequestQueue
                            priv={this.state.previledge}
                            helpStudentModal={this.state.helpStudentModal}
                            helpStudentClose={this.helpStudentClose}
                            helpStudent={this.helpStudent}

                            removeStudentRequest={this.removeStudentRequest}
                            removeStudentReqModal={this.state.removeStudentReqModal}
                            removeStudentReqClose={this.removeStudentReqClose}
                        />
                    </Grid>
                </Grid>
            </div>
        );
    }

}

export default withStyles(styles)(Student)