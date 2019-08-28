import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";

const style = {
  spinner: {
    marginTop: "5%",
    color: "#35455a",
    "@media (max-width: 425px)": {
      width: "25px !important",
      height: "25px !important"
    }
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  loaderText: {
    color: "#5d5d5d",
    "@media (max-width: 425px)": {
      fontSize: "20px"
    }
  },
  loader: {
    marginTop: "20%",
    marginBottom: "38%",
    "@media (max-width: 425px)": {
      marginTop: "100%",
      marginBottom: "100%"
    }
  }
};

class Loader extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Grid
        container
        direction="column"
        alignItems="center"
        className={classes.loader}
      >
        <Grid item={true} xs={12} sm={12} md={12} style={style.container}>
          <Typography
            variant="h5"
            component="h2"
            className={classes.loaderText}
          >
            {this.props.content}
          </Typography>
          <CircularProgress className={classes.spinner} />
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(style)(Loader);
