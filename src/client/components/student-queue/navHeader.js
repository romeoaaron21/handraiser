import React, { Component } from "react";
import { withStyles, emphasize } from "@material-ui/core/styles";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Chip from "@material-ui/core/Chip";
import Avatar from "@material-ui/core/Avatar";
import ClassIcon from "@material-ui/icons/Group";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import History from '../cohorts/cards/history/history';
import api from "../../services/fetchApi";

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
  constructor(props) {
    super(props);

    this.state = {
      reason: "",
      disabled: false,
      clearText: "",
      history: [],
      cohort: [],
      openHistory: false
    };
  }

  componentDidMount() {
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

  openHistory = () => {
    api.fetch(`/api/history/${this.props.cohort}/${this.props.user.id}`, "get").then(res => {
      api.fetch(`/api/cohort/${this.props.cohort}/details`, "get").then(response => {
        this.setState({
          openHistory: true,
          history: res.data.history,
          cohort: response.data.cohort[0]
        });
      });
    });
  };

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

  handleCloseHistory = () => {
    this.setState({
      openHistory: false
    })
  }

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        {/* <Grid item xs={12} sm={4}>
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
            <StyledBreadcrumb onClick={this.openHistory} component="a" href="#" label="My Activities" />
          </Breadcrumbs>
        </Grid> */}

        <Grid item xs={12} sm={12}>
          <TextField
            value={this.state.reason}
            onChange={e => this.handleChange(e)}
            classes={{ root: "MenuItem" }}
            id="outlined-full-width"
            placeholder="Ask for help"
            fullWidth
            disabled={this.state.disabled}
            margin="normal"
            variant="outlined"
          />
        </Grid>

        <History 
          open={this.state.openHistory}
          cohort={this.state.cohort}
          handleClose={this.handleCloseHistory}
          history={this.state.history}
        />

      </React.Fragment>
    );
  }
}

export default withStyles(styles)(navHeader);
