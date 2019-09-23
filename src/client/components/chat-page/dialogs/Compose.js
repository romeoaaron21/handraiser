import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "../ChatPageStyle";
import Paper from "@material-ui/core/Paper";
import clsx from "clsx";

//Compose
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import SendIcon from "@material-ui/icons/Send";
import Close from "@material-ui/icons/Close";
import Chip from "@material-ui/core/Chip";

import { ListItemText } from "@material-ui/core";

class Compose extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    return (
      <Dialog
        open={this.props.openDialog}
        onClose={this.props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Compose New Message
          <IconButton
            size="small"
            style={{ float: "right" }}
            onClick={this.props.handleClose}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <div
            className={classes.flex}
            style={{ justifyContent: "flex-start" }}
          >
            <Typography variant="subtitle2" size="small">
              To:{" "}
            </Typography>
            <Chip
              avatar={<Avatar alt="sender" src={this.props.avatarSample} />}
              label="John Doe"
              onDelete={this.props.handleClose}
              className={classes.chip}
              size="small"
            />
          </div>
          <TextField
            label="Search"
            className={clsx(classes.textField, classes.dense)}
            margin="dense"
            variant="outlined"
            fullWidth
            style={{ marginTop: "2px" }}
          />
          <Paper
            style={{ width: 450, height: 180, overflowY: "auto" }}
            className={classes.scrollBar}
          >
            <List>
              {/* map here */}
              <ListItem alignItems="flex-start" button>
                <ListItemAvatar style={{ marginTop: "3px" }}>
                  <Avatar
                    style={{ width: 25, height: 25 }}
                    src={this.props.avatarSample}
                  >
                    ME
                  </Avatar>
                </ListItemAvatar>
                <ListItemText>John Doe</ListItemText>
              </ListItem>
              <Divider />
            </List>
          </Paper>
          <div className={classes.flex}>
            <TextField
              fullWidth
              variant="outlined"
              label="Send Message"
              multiline
              margin="normal"
              rowsMax="4"
            />
            <IconButton style={{ marginLeft: 3, marginTop: 3 }}>
              <SendIcon />
            </IconButton>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
}

export default withStyles(styles)(Compose);
