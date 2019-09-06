import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Transition from './transition'
import { Typography } from '@material-ui/core';
import ConcernItem from './concernItem';


const styles = theme => ({
    title: {
      paddingTop: 35,
      minHeight: 100,
      backgroundColor: '#780aaf',
      color: 'white',
      textAlign: 'center'
    },
    buttonContainer: {
      height: 50,
      paddingTop: 0,
      paddingBottom: 0
    },
    addCardContainer: {
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },
    cardContent: {
      height: "55%",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      flexDirection: "column"
    },
    add: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    },
    media: {
      height: "45%",
      width: 300
    },
    logBtn: {
      marginLeft: 'auto'
    }
});

class History extends React.Component {
    render(){
        const { 
            classes,
            open, 
            handleClose, 
            history,
            cohort
        } = this.props; 
        return (
            <Dialog
                maxWidth="sm"
                fullWidth
                disableBackdropClick
                disableEscapeKeyDown
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
            >
                <DialogTitle disableTypography className={classes.title}>
                    <Typography variant="h4">{cohort.name || ' '}</Typography>
                    <Typography variant="overline">Activity Log</Typography>
                </DialogTitle>
                <DialogContent>
                {history.map(concern => (
                    <ConcernItem key={concern.id} concern={concern}/>
                ))}
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Close
                </Button>
                </DialogActions>
            </Dialog>
        );
    }
}
export default withStyles(styles)(History);
