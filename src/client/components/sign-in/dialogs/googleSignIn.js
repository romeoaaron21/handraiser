import React, { Component } from "react";
import decode from "jwt-decode";

import GoogleLogin from "react-google-login";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import { toast } from "react-toastify";

import api from "../../../services/fetchApi";

const styles = {
  dialogContent: {
    width: "400px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "5%"
  }
};

export default class googleSignIn extends Component {
  responseGoogleMentor = res => {
    const token = res.tokenId;
    const user = decode(res.tokenId);
    const data = {
      key: this.props.validatedKey,
      first_name: user.given_name,
      last_name: user.family_name,
      sub: user.sub,
      privilege: "mentor",
      avatar: user.picture
    };

    api.fetch("/sign-in", "post", data).then(res => {
      if (res.data.privilege === "student") {
        toast.error("Sorry, your a student!", {
          hideProgressBar: true,
          draggable: false
        });
      } else {
        if (res.data.user.key !== undefined) {
          if (
            res.data.user.key !== this.props.validatedKey ||
            res.data.user.sub !== user.sub
          ) {
            toast.error("Sorry, its not your key", {
              hideProgressBar: true,
              draggable: false
            });
          } else {
            if (res.data.user.privilege !== "mentor") {
              toast.error("Sorry, you're not a mentor", {
                hideProgressBar: true,
                draggable: false
              });
            } else {
              localStorage.setItem("id_token", token);
              window.location.href = "/cohorts";
            }
          }
        } else {
          localStorage.setItem("id_token", token);
          window.location.href = "/cohorts";
        }
      }
    });
  };

  render() {
    return (
      <React.Fragment>
        <DialogTitle id="alert-dialog-title">
          <Typography style={{ fontSize: "18px" }}>
            {this.props.title}
          </Typography>
        </DialogTitle>
        <DialogContent style={styles.dialogContent}>
          <DialogContentText id="alert-dialog-description">
            Please sign in with your google account
          </DialogContentText>

          <GoogleLogin
            clientId="915213711135-usc11cnn8rudrqqikfe21l246r26uqh8.apps.googleusercontent.com"
            onSuccess={this.responseGoogleMentor}
            onFailure={this.responseGoogleMentor}
            cookiePolicy={"single_host_origin"}
            buttonText="Sign-in"
          />
        </DialogContent>
      </React.Fragment>
    );
  }
}
