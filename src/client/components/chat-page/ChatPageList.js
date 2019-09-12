import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./ChatPageStyle";
import Paper from "@material-ui/core/Paper";

//CHATLIST
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import CreateIcon from "@material-ui/icons/Create";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
import Grid from "@material-ui/core/Grid"

class ChatPageList extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { classes } = this.props;
    return (
      <Grid item md={3} xs={4}>
      <Paper>
        <div style={{ padding: 13 }}>
          <div className={classes.chatListHeader}>
            <span className={classes.avatarWrapper}>
              <Avatar style={{ marginRight: "10px" }}>
                ME
              </Avatar>
              <Typography variant="h5">Chats</Typography>
            </span>
            <Hidden xsDown>
              <IconButton>
                <CreateIcon />
              </IconButton>
            </Hidden>
          </div>
          <div>
            <TextField
              id="outlined-search"
              label="Search"
              inputProps={{
                style: {
                  height: "4px"
                }
              }}
              InputLabelProps={{
                style: {
                  height: "3px",
                  marginTop: -6
                }
              }}
              fullWidth
              margin="normal"
              variant="outlined"
            />
          </div>
        </div>
        <Divider />

        <div className={`${classes.scrollBar} ${classes.chatListWrapper}`}>
          <List>
            <ListItem alignItems="flex-start" button>
              <Hidden only="xs">
                <ListItemAvatar>
                  <Avatar> TL </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Trizha Kate Longaza"
                  secondary=" I'll be in your neighborhood doing errands this"
                />
              </Hidden>
              <Hidden smUp>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center"
                  }}
                >
                  <Avatar> TL </Avatar>
                </div>
              </Hidden>
            </ListItem>
            <Divider />
          </List>
        </div>
      </Paper>
      </Grid>
    );
  }
}

export default withStyles(styles)(ChatPageList);
