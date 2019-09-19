import React, { Component } from "react";
import { withStyles, emphasize } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Handraise from "@material-ui/icons/PanTool";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Link from "@material-ui/core/Link";
import Dialog from "@material-ui/core/Dialog";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";
import ClassIcon from "@material-ui/icons/Group";
import History from "../cohorts/cards/history/history";
import UploadPhoto from "../common-components/upload-photo/UploadPhoto";

import api from "../../services/fetchApi";

const styles = theme => ({
  raiseBtn: {
    backgroundColor: "#983cac",
    "&:hover": {
      backgroundColor: "#780aaf"
    },
    "@media (max-width: 599px)": {
      display: "none"
    }
  },
  raiseHand: {
    cursor: "pointer",
    fontSize: "35px",
    "@media (min-width: 600px)": {
      display: "none"
    }
  },
  userAvatar: {
    width: 56,
    height: 56,
    marginRight: 6,
    "@media (max-width: 425px)": {
      width: 35,
      height: 35,
      marginLeft: -15
    }
  },
  responsiveHeader: {
    "@media (max-width: 425px)": {
      fontSize: "16px",
      marginLeft: -25
    }
  },
  responsive: {
    marginRight: -12,
    "@media (max-width: 425px)": {
      fontSize: "17px"
    }
  },
  btnDisabled: {
    "&.Mui-disabled": {
      backgroundColor: "rgba(255, 255, 255, 0.46)"
    }
  },

  breadcrumbNav: {
    marginTop: "13px",
    display: "flex",
    justifyContent: "center"
  }
});

const StyledBreadcrumb = withStyles(theme => ({
  root: {
    backgroundColor: "whitesmoke",
    height: 21,
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

class StudentHeader extends Component {
  constructor() {
    super();

    this.state = {
      uploadPhotoDialog: false,
      classHeaderImage: null,

      history: [],
      cohort: [],
      openHistory: false
    };
  }

  componentDidMount() {
    api.fetch(`/specific/${this.props.cohortId}`, "get").then(res => {
      this.setState({ classHeaderImage: res.data[0].class_header });
    });
  }

  onDrop = picture => {
    this.setState({
      pictures: this.state.pictures.concat(picture)
    });
  };

  openHistory = () => {
    api
      .fetch(`/api/history/${this.props.cohortId}/${this.props.user.id}`, "get")
      .then(res => {
        api
          .fetch(`/api/cohort/${this.props.cohortId}/details`, "get")
          .then(response => {
            this.setState({
              openHistory: true,
              history: res.data.history,
              cohort: response.data.cohort[0]
            });
          });
      });
  };

  handleCloseHistory = () => {
    this.setState({
      openHistory: false
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Box item="true" xs={12} sm={12}>
          <Typography
            variant="h5"
            component="h3"
            align="center"
            className={classes.responsive}
            style={{ color: "whitesmoke" }}
          >
            {this.props.user.name.charAt(0).toUpperCase() +
              this.props.user.name.slice(1)}
          </Typography>
          <ListItem>
            <ListItemAvatar>
              <Avatar
                src={this.props.user.avatar}
                className={classes.userAvatar}
              />
            </ListItemAvatar>
            {this.props.privilege === "student" ? (
              <ListItemText>
                <Typography
                  variant="h6"
                  component="h3"
                  className={classes.responsiveHeader}
                  style={{ color: "whitesmoke", marginLeft: 7 }}
                >
                  {this.props.user.first_name.charAt(0).toUpperCase() +
                    this.props.user.first_name.slice(1)}{" "}
                  {this.props.user.last_name.charAt(0).toUpperCase() +
                    this.props.user.last_name.slice(1)}
                </Typography>
                <Breadcrumbs
                  aria-label="breadcrumb"
                  style={{ marginTop: 3, color: "#f4f4f4" }}
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
                  <StyledBreadcrumb
                    onClick={this.openHistory}
                    component="a"
                    href="#"
                    label="My Activities"
                  />
                </Breadcrumbs>
              </ListItemText>
            ) : (
              <ListItemText>
                <Typography
                  variant="h6"
                  component="h3"
                  className={classes.responsiveHeader}
                  style={{ color: "whitesmoke" }}
                >
                  {this.props.user.first_name.charAt(0).toUpperCase() +
                    this.props.user.first_name.slice(1)}{" "}
                  {this.props.user.last_name.charAt(0).toUpperCase() +
                    this.props.user.last_name.slice(1)}
                </Typography>
              </ListItemText>
            )}

            {this.props.privilege === "student" ? (
              <div>
                <Tooltip title="Send Raise" placement="top">
                  <div>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.raiseBtn}
                      disabled={this.props.btn}
                      onClick={this.props.requestHelp}
                      classes={{ contained: classes.btnDisabled }}
                    >
                      {this.props.raise}
                    </Button>
                  </div>
                </Tooltip>
                <Tooltip
                  title="Help Student"
                  placement="top"
                  className={classes.raiseHand}
                >
                  <div>
                    <IconButton
                      className={classes.responsive}
                      disabled={this.props.btn}
                      onClick={this.props.requestHelp}
                    >
                      <Handraise
                        className={classes.raiseHand}
                        style={
                          this.props.btn
                            ? { color: "#f6edff3d" }
                            : { color: "#cc98ff" }
                        }
                      />
                    </IconButton>
                  </div>
                </Tooltip>
              </div>
            ) : (
              <div style={{ marginTop: "auto" }}>
                <div>
                  <Link
                    style={{
                      color: "#f3f3f3",
                      fontSize: "13px",
                      cursor: "pointer"
                    }}
                    onClick={() => this.setState({ uploadPhotoDialog: true })}
                  >
                    Upload photo
                  </Link>
                </div>

                {this.state.classHeaderImage !== null ? (
                  <Link
                    style={{
                      color: "#f3f3f3",
                      fontSize: "13px",
                      textDecoration: "underline",
                      cursor: "pointer"
                    }}
                    onClick={this.props.setToDefaultHeaderFn}
                  >
                    Set to default
                  </Link>
                ) : null}
              </div>
            )}
          </ListItem>
        </Box>

        {/* DIALOGS */}
        <Dialog
          onClose={() => this.setState({ uploadPhotoDialog: false })}
          open={this.state.uploadPhotoDialog}
          maxWidth="md"
          fullWidth={true}
        >
          <UploadPhoto
            loadStateFn={this.props.loadStateFn}
            handleClose={() => this.setState({ uploadPhotoDialog: false })}
            cohortId={this.props.cohortId}
          />
        </Dialog>

        <History
          open={this.state.openHistory}
          cohort={this.state.cohort}
          handleClose={this.handleCloseHistory}
          history={this.state.history}
        />
      </div>
    );
  }
}

export default withStyles(styles)(StudentHeader);
