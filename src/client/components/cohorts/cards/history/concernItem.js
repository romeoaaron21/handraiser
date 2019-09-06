import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
    Grid, Box, Typography, Avatar, Chip, Divider
} from '@material-ui/core';
//API
import api from "../../../../services/fetchApi";

const styles = theme => ({
  avatar: {
    marginTop: 20  
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  container: {
    maxHeight: 100
  },
  img: {
    width: 50,
    height: 50
  },
  chip: {
    marginTop: 10
  }
});

class ConcernItem extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            dataLoaded: false,
            details: null
        }
    }

    componentDidMount(){
        api.fetch(`api/cohorts/history/details/${this.props.concern.id}`, "get").then(res => {
            this.setState({
                details: res.data.history[0],
                dataLoaded: true
            })
        });
    }

    render(){
        const { classes, concern } = this.props;
        const { details } = this.state;
        if (this.state.dataLoaded){
            return (
                <React.Fragment>
                    <Box className={classes.paper}>
                        <Grid container spacing={2} className={classes.container}>
                        <Grid item className={classes.avatar}>
                            <Avatar alt="" className={classes.img} src={details.avatar} />
                        </Grid>
                        <Grid item xs={12} sm container>
                            <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="subtitle1">
                                {details.first_name + " " + details.last_name}
                                </Typography>
                                <Typography variant="overline" color="textSecondary" gutterBottom>
                                Concern:
                                </Typography>
                                <Typography variant="body2">
                                    {concern.reason ? concern.reason : "No concern specified."}
                                </Typography>
                            </Grid>
                                <Grid item xs={6} sm={6}>
                                    <Typography variant="body2" color="textSecondary">
                                    Helped by:
                                    </Typography>
                                    <Chip
                                        className={classes.chip}
                                        avatar={<Avatar alt="" src="https://lh5.googleusercontent.com/-u9Uu95tVtzw/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rf5_LF9EOCVM7EWDPxjDe1jn94inw/s96-c/photo.jpg" />}
                                        label="Mentor Sell"
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        </Grid>
                    </Box>
                    <Divider light />
                </React.Fragment>
            );
        }
        else return null
    }
}
export default withStyles(styles)(ConcernItem);
