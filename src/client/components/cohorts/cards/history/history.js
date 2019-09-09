import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import {
  Button, Dialog, DialogActions, DialogContent, DialogTitle,
  Typography, Grid
} from '@material-ui/core';
import Transition from './transition'
import ConcernItem from './concernItem';
import EmptyQueue from "../../../../images/emptyqueue.svg";



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
    },
    emptyQueue: {
      marginTop: 45,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      "@media (max-width: 425px)": {
        marginTop: 160
      }
    },
    subtitle: {
      marginTop: 20
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
                {history.length ?
                  history.map(concern => (
                    <ConcernItem key={concern.id} concern={concern}/>
                ))
                :  
                <Grid container className={classes.emptyQueue}>
                <img src={EmptyQueue} alt="img" width="280" height="250" />
                <Typography className={classes.subtitle} variant="overline" color="textSecondary">
                  Nothing here...
                </Typography>
                </Grid>
                }
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
