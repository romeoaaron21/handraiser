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
import Button from "@material-ui/core/Button";

import { ListItemText, DialogActions } from "@material-ui/core";

import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Checkbox from "@material-ui/core/Checkbox";
import CommentIcon from "@material-ui/icons/Comment";

class CreateGroup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: []
    };
  }
  handleToggle = value => () => {
    const currentIndex = this.state.checked.indexOf(value);
    const newChecked = [...this.state.checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({ checked: newChecked });
  };

  render() {
    const { classes } = this.props;
    return (
      <Dialog
        open={this.props.openDialog}
        onClose={this.props.handleClose}
        aria-labelledby="form-dialog-title"
        maxWidth="sm"
      >
        <DialogTitle id="form-dialog-title">
          Create Group
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
          <TextField
            label="Group Name"
            className={clsx(classes.textField, classes.dense)}
            margin="dense"
            variant="outlined"
            fullWidth
            style={{ marginTop: "2px" }}
          />

          <TextField
            label="Search"
            className={clsx(classes.textField, classes.dense)}
            margin="dense"
            variant="outlined"
            fullWidth
            style={{ marginTop: "2px" }}
          />
          <Paper
            style={{ width: 480, height: 180, overflowY: "auto" }}
            className={classes.scrollBar}
          >
            <List>
              {[
                "Earl Raquion",
                "Romeo Lumibao",
                "Trizha Longaza",
                "Paolo Barbin",
                "ASdasdasd",
                "ASDASDASDSAD",
                "Zxczxczxczxc",
                "qweqweqweqwe",
                "ASdasda",
                "Asdasdasda",
                "ASdasdasdasd"
              ].map(value => {
                const labelId = `checkbox-list-label-${value}`;

                return (
                  <ListItem
                    key={value}
                    role={undefined}
                    dense
                    button
                    onClick={this.handleToggle(value)}
                  >
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={this.state.checked.indexOf(value) !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ "aria-labelledby": labelId }}
                      />
                    </ListItemIcon>
                    <ListItemAvatar style={{ marginTop: "3px" }}>
                      <Avatar
                        style={{ width: 25, height: 25 }}
                        src={this.props.avatarSample}
                      >
                        ME
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText id={labelId} primary={value} />
                  </ListItem>
                );
              })}
            </List>
          </Paper>
          <Paper
            style={{
              width: 480,
              marginTop: 10,
              display: this.state.checked.length > 0 ? "block" : "none"
            }}
          >
            {/* <div className={classes.flex}> */}
              <Typography variant="caption" style={{ padding: 8 }}>
                Selected Members - {this.state.checked.length}
              </Typography>
            {/* </div> */}
            <Divider />
            <div className={clsx(classes.memberList, classes.scrollBar)}>
              {this.state.checked.map(val => (
                <Chip
                  avatar={<Avatar alt="sender" src={this.props.avatarSample} />}
                  label={val}
                  onDelete={this.props.handleClose}
                  className={classes.chip}
                  size="small"
                />
              ))}
            </div>
          </Paper>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button onClick={this.props.handleClose} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(CreateGroup);
