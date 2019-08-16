import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AccountCircle from '@material-ui/icons/AccountCircle'

const styles = theme => ({
    dialogWrapper: {
        backgroundColor: '#780aaf',
        minHeight: '150px',
    },
    text: {
        textAlign: 'center',
        color: '#fff'
    },
})

class BeingHelpedModal extends Component {

    render() {
        const { classes } = this.props

        return (
            <div>
                <Dialog
                    fullWidth
                    open={this.props.helpStudentModal}
                    aria-labelledby="alert-dialog-title"
                >
                    <DialogTitle classes={{ root: classes.dialogWrapper }}>
                        <Grid container justify="center">
                            <Grid item xs={12} sm={12}>
                                <Typography variant="h6" component="h3" className={classes.text}>
                                    Being Help...
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={7} className={classes.text}>
                                <AccountCircle style={{ color: '#fff', fontSize: '60px' }} />
                                <Typography variant="h4" component="h3">Sid Bercasio</Typography>
                            </Grid>
                        </Grid>
                    </DialogTitle>
                    
                    <DialogActions>
                        <Button color="primary">
                            Back
                        </Button>
                        <Button onClick={this.props.helpStudentClose} color="primary" autoFocus>
                            Done
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles)(BeingHelpedModal)