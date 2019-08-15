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
        padding: theme.spacing(3, 3),
        marginTop: '80px',
        maxWidth: '1100px',
        margin: '0 auto',
        boxShadow: ' 0px 0px 3px 0px rgba(176,173,176,1)',
    },
    main: {
        marginTop: '8px',
    },

});

class Student extends Component {
    constructor() {
        super()
        this.state = {
            previledge: 'mentor',
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

    removeStudentReqClose = () => [
        this.setState({ removeStudentReqModal: false })
    ]

    render() {
        const { classes } = this.props

        return (
            <div>
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
            </div >
        );
    }

}

export default withStyles(styles)(Student)