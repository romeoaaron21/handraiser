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
import GroupIcon from "@material-ui/icons/Group";
import Gallery from './gallery/galleryDialog'

class ChatPageInfo extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      selected: null,
      imgArray: [],
    }
  }
  openGallery = index => {
    const images = this.props.conversation.filter(convo => {
      return convo.chat_type === 'image' && ((convo.sender_id === this.props.userInfo.sub && this.props.chatmateInfo.sub === convo.chatmate_id) ||
      (convo.chatmate_id === this.props.userInfo.sub && this.props.chatmateInfo.sub === convo.sender_id))
    })
    const selected = images.findIndex(image => image.id === index);
    this.setState({
      open: true,
      selected,
      imgArray: images
    })
  }
  closeGallery = () => {
    this.setState({
      open: false,
      selected: null
    })
  }
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Grid item md={3} xs={12} style={{ height: "800px" }}>
          <Paper>
            <div className={classes.chatInfoHeader}>
              {this.props.chatmateInfo.avatar === undefined ?
                <Avatar className={classes.avatarLarge}> <GroupIcon style={{ fontSize: "48px" }} /> </Avatar>
                :
                <Avatar className={classes.avatarLarge} src={this.props.chatmateInfo.avatar}></Avatar>
              }
              <Typography variant="h6">
                {this.props.chatmateInfo.first_name === undefined ?
                  this.props.chatmateInfo.name
                  :
                  `${this.props.chatmateInfo.first_name} ${this.props.chatmateInfo.last_name}`
                }
              </Typography>
              <Typography variant="overline">
               {this.props.chatmateInfo.privilege}
              </Typography>
            </div>
            {/* <div className={classes.chatInfoHeader}>
              <Avatar className={classes.avatarLarge} src={this.props.chatmateInfo.avatar}></Avatar>
              <Typography variant="h6">{this.props.chatmateInfo.first_name} {this.props.chatmateInfo.last_name}</Typography>
              <Typography variant="subtitle2">
              {this.props.chatmateInfo.first_name}
              </Typography>
            </div> */}
            
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
                  {this.props.conversation.map(convo => (
                  convo.chat_type === 'image' && ((convo.sender_id === this.props.userInfo.sub && this.props.chatmateInfo.sub === convo.chatmate_id) ||
                  (convo.chatmate_id === this.props.userInfo.sub && this.props.chatmateInfo.sub === convo.sender_id))
                      ? <GridListTile style={{ cursor: 'pointer' }} cols={1} onClick={() => this.openGallery(convo.id)}>
                          <img src={convo.link} />
                        </GridListTile>
                      : null
                  ))}
                </GridList>
              </div>
            </div>
          </Paper>
        </Grid>
        {/*GALLERY */}
        {this.state.imgArray.length > 0 &&
          <Gallery
            conversation={this.state.imgArray}
            open={this.state.open}
            handleClose={this.closeGallery}
            selected={this.state.selected}
          />
        }
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(ChatPageInfo);
