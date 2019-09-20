import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./ChatPageStyle";
//MAIN
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

//CHATLIST
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Samplepic from "../../images/bg.jpg";

class ChatPageInfo extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid item md={3} xs={12} style={{ height: "800px"}}>
        <Paper>
          <div className={classes.chatInfoHeader}>
            <Avatar className={classes.avatarLarge} src={this.props.chatmateInfo.avatar}></Avatar>
            <Typography variant="h6">{this.props.chatmateInfo.first_name} {this.props.chatmateInfo.last_name}</Typography>
            <Typography variant="subtitle2">
            {this.props.chatmateInfo.first_name}
            </Typography>
          </div>
          <Divider />
          <span className={classes.photosTitle}>
            <Typography variant="overline">SHARED PHOTOS</Typography>
          </span>
          <Divider />
          <div
            className={`${classes.photosGridContainer} ${classes.scrollBar}`}
          >
            <div className={classes.photosGrid}>
              <GridList cellHeight={160} style={{ width: 500 }} cols={3}>
                <GridListTile cols={1}>
                  <img src={Samplepic} />
                </GridListTile>
                <GridListTile cols={1}>
                  <img src={Samplepic} />
                </GridListTile>
                <GridListTile cols={1}>
                  <img src={Samplepic} />
                </GridListTile>
                <GridListTile cols={1}>
                  <img src={Samplepic} />
                </GridListTile>
                <GridListTile cols={1}>
                  <img src={Samplepic} />
                </GridListTile>
                <GridListTile cols={1}>
                  <img src={Samplepic} />
                </GridListTile>
                <GridListTile cols={1}>
                  <img src={Samplepic} />
                </GridListTile>
                <GridListTile cols={1}>
                  <img src={Samplepic} />
                </GridListTile>
                <GridListTile cols={1}>
                  <img src={Samplepic} />
                </GridListTile>
                <GridListTile cols={1}>
                  <img src={Samplepic} />
                </GridListTile>
                <GridListTile cols={1}>
                  <img src={Samplepic} />
                </GridListTile>
                <GridListTile cols={1}>
                  <img src={Samplepic} />
                </GridListTile>
                <GridListTile cols={1}>
                  <img src={Samplepic} />
                </GridListTile>
              </GridList>
            </div>
          </div>
        </Paper>
      </Grid>
    );
  }
}

export default withStyles(styles)(ChatPageInfo);
