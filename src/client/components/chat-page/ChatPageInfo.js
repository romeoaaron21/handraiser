import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./ChatPageStyle";
//MAIN
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

//CHATLIST
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GroupIcon from "@material-ui/icons/Group";
import Gallery from './gallery/galleryDialog'
//expansion
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Link from '@material-ui/core/Link';
import InsertDriveFile from '@material-ui/icons/InsertDriveFile'
import Photo from '@material-ui/icons/Photo'

const ExpansionPanel = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiExpansionPanel);

const ImageExpansionPanelDetails = withStyles(theme => ({
  root: {
    padding: '8px 0px 0px',
  },
}))(MuiExpansionPanelDetails);

class ChatPageInfo extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      selected: null,
      imgArray: [],
      expanded: 'photos'
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
  handleExpland = panel => (event, isExpanded) => {
    this.setState(prev => ({ 
      expanded: isExpanded ? panel : false
    }))
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
            {/*FIRST PANEL */}
            <ExpansionPanel expanded={this.state.expanded === 'photos'} onChange={this.handleExpland('photos')}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
              > 
                <span className={classes.photosTitle}>
                  <Photo style={{ marginRight: 10 }}/>
                  <Typography variant="overline">SHARED PHOTOS</Typography>
                </span>
              </ExpansionPanelSummary>
              <ImageExpansionPanelDetails>
              <div
              className={`${classes.photosGridContainer} ${classes.scrollBar}`}
              >
                <div className={classes.photosGrid}>
                  <GridList cellHeight={160} cols={3}>
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
              </ImageExpansionPanelDetails>
            </ExpansionPanel>
            {/* END FIRST PANEL */}

            {/*SECOND PANEL */}
            <ExpansionPanel expanded={this.state.expanded === 'files'} onChange={this.handleExpland('files')}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
              > 
                <span className={classes.photosTitle}>
                  <InsertDriveFile style={{ marginRight: 10 }}/>
                  <Typography variant="overline">shared files</Typography>
                </span>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
              <div
              className={`${classes.filesGridContainer} ${classes.scrollBar}`}
              >
                <div className={classes.photosGrid}>
                  <GridList cellHeight={25} cols={3}>
                    {this.props.conversation.map(convo => (
                    convo.chat_type === 'file' && ((convo.sender_id === this.props.userInfo.sub && this.props.chatmateInfo.sub === convo.chatmate_id) ||
                    (convo.chatmate_id === this.props.userInfo.sub && this.props.chatmateInfo.sub === convo.sender_id))
                        ? <GridListTile cols={3}>
                            <Link href={convo.link} variant="body2">{convo.message}</Link>
                          </GridListTile>
                        : null
                    ))}
                  </GridList>
                </div>
              </div>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            {/*END SECOND PANEL */}
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
