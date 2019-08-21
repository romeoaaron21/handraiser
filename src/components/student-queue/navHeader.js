import React, { Component } from "react";
import { withStyles, emphasize } from "@material-ui/core/styles";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import ClassIcon from "@material-ui/icons/Group";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import { CLIENT_RENEG_LIMIT } from "tls";

const styles = {
  breadcrumbNav: {
    marginTop: "13px",
    display: "flex",
    justifyContent: "center"
  }
};

const StyledBreadcrumb = withStyles(theme => ({
  root: {
    backgroundColor: theme.palette.grey[100],
    height: 24,
    cursor: "pointer",
    color: theme.palette.grey[800],
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: theme.palette.grey[300]
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(theme.palette.grey[300], 0.12)
    }
  }
}))(Chip);

class navHeader extends Component {
  constructor() {
    super();
    this.state = {
      reason: "",
      disabled: false,
      clearText: ""
    };
  }

  componentDidUpdate() {
    if (this.props.raise === "Waiting for help") {
      if (this.state.clearText === "") {
        this.setState({
          disabled: true,
          reason: "",
          clearText: "cleared"
        });
      }
    } else {
      if (this.props.requested) {
        if (this.state.clearText === "") {
          this.setState({
            disabled: true,
            reason: "",
            clearText: "cleared"
          });
        }
      } else {
        if (this.state.clearText !== "") {
          this.setState({
            disabled: false,
            reason: "",
            clearText: ""
          });
        }
      }
    }
  }

  handleChange = e => {
    this.setState({
      reason: e.target.value
    });
    this.props.handleChangeReasons(e);
  };
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Grid item xs={12} sm={4}>
          <Breadcrumbs
            aria-label="breadcrumb"
            className={classes.breadcrumbNav}
          >
            <StyledBreadcrumb
              component="a"
              href="#"
              label="Students"
              avatar={
                <Avatar className={classes.avatar}>
                  <ClassIcon />
                </Avatar>
              }
              onClick={this.handleClick}
            />
            <StyledBreadcrumb component="a" href="#" label="My Activities" />
          </Breadcrumbs>
        </Grid>

        <Grid item xs={12} sm={8}>
          <TextField
            value={this.state.reason}
            onChange={e => this.handleChange(e)}
            classes={{ root: "MenuItem", classes: "selected" }}
            id="outlined-full-width"
            placeholder="Ask for help"
            fullWidth
            disabled={this.state.disabled}
            className={classes.textField}
            margin="normal"
            variant="outlined"
          />
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(navHeader);
