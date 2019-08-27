import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/core/styles";
import MoreSettings from "@material-ui/icons/MoreVert";
import SendIcon from "@material-ui/icons/Send";
import ArrowBack from "@material-ui/icons/ArrowBack";
import styles from "./chatBoxStyle";

import {
  Paper,
  Grid,
  Typography,
  Box,
  Avatar,
  IconButton,
  TextField,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5"
  }
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center"
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center"
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white
      }
    }
  }
}))(MenuItem);

class ChatBox extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      openMenu: null
    };
  }

  //Start of Added Scroll Bottom
  messagesEndRef = React.createRef();

  componentDidMount() {
    this.scrollToBottom();
  }
  componentDidUpdate() {
    this.scrollToBottom();
  }
  scrollToBottom = () => {
    this.messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };
  //End of Added Scroll Bottom

  handleClick = e => {
    this.setState({ openMenu: e.currentTarget });
  };

  handleClose = () => {
    this.setState({ openMenu: null });
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Paper elevation={1} className={classes.rightTopNav} square={true}>
          <Typography variant="subtitle1" className={classes.chatName}>
            {this.props.chatmateInfo.first_name}{" "}
            {this.props.chatmateInfo.last_name}
            <div className={classes.status}>
              <span className={`${classes.ab} ${classes.cd} ${classes.ef}`} />
              <Typography variant="caption" display="block">
                Active Now
              </Typography>
            </div>
          </Typography>

          <Box>
            <IconButton className={classes.settings} onClick={this.handleClick}>
              <MoreSettings />
            </IconButton>
            <StyledMenu
              id="customized-menu"
              anchorEl={this.state.openMenu}
              keepMounted
              open={Boolean(this.state.openMenu)}
              onClose={this.handleClose}
            >
              <StyledMenuItem onClick={this.props.viewChatBox}>
                <ListItemIcon>
                  <ArrowBack />
                </ListItemIcon>
                <ListItemText primary="Back" />
              </StyledMenuItem>
            </StyledMenu>
          </Box>
        </Paper>
        <Paper
          elevation={0}
          classes={{ root: classes.mentorStyle1 }}
          className={
            this.props.privileged === "mentor"
              ? classes.mentorStyle
              : classes.rightNav
          }
          square={true}
        >
          <Grid
            container
            className={`${classes.chatBoxBody} ${classes.scrollBar}`}
          >
            <div className={`${classes.chatBoxBody} ${classes.scrollBar}`}>
              <Grid
                item
                className={`${classes.chatContentWrapper} ${classes.scrollBar}`}
              >
                {this.props.conversation.map((convo, i) =>
                  (this.props.senderInfo.sub === convo.sender_id &&
                    this.props.chatmateInfo.sub === convo.chatmate_id) ||
                    (this.props.senderInfo.sub === convo.chatmate_id &&
                      this.props.chatmateInfo.sub === convo.sender_id) ? (
                      <React.Fragment key={i}>
                        {parseInt(this.props.cohort_id) === convo.cohort_id ? (
                          <Box
                            className={
                              this.props.senderInfo.sub === convo.chatmate_id
                                ? classes.chatContent
                                : classes.chatContent2
                            }
                          >
                            {this.props.senderInfo.sub === convo.chatmate_id ? (
                              <Avatar
                                src={this.props.chatmateInfo.avatar}
                                className={classes.chatAvatar}
                              />
                            ) : null}
                            <Box
                              className={
                                this.props.senderInfo.sub === convo.chatmate_id
                                  ? classes.chatDetails
                                  : classes.chatDetails2
                              }
                            >
                              <div className={classes.chatText}>
                                <Typography
                                  variant="subtitle1"
                                  className={classes.chatText}
                                >
                                  {convo.message}
                                </Typography>
                              </div>
                              <div className={classes.chatTime}>
                                <Typography variant="caption">
                                  {convo.time}
                                </Typography>
                              </div>
                            </Box>
                          </Box>
                        ) : null}
                      </React.Fragment>
                    ) : (
                      <React.Fragment key={i} />
                    )
                )}
                <div ref={this.messagesEndRef} />
              </Grid>
            </div>
          </Grid>

          {this.props.privileged === "student" ? (
            <React.Fragment>
              <Box xs={12} sm={8}>
                <div className={classes.footerInput}>
                  <Avatar
                    src={this.props.senderInfo.avatar}
                    className={classes.userAvatar}
                  />
                  <TextField
                    classes={{ root: "MenuItem" }}
                    id="outlined-full-width"
                    placeholder="Send message"
                    className={classes.textField}
                    InputProps={{ classes: { root: classes.custom } }}
                    margin="normal"
                    fullWidth
                    variant="outlined"
                    value={this.props.chat}
                    onChange={e => {
                      this.props.handleChat(e.target.value);
                    }}
                    onClick={()=>this.props.displayBadge('student')}
                  />
                  <IconButton
                    className={classes.sendIcon}
                    onClick={this.props.sendChat}
                    disabled={
                      this.props.chat
                        .replace(/^\s+/, "")
                        .replace(/\s+$/, "") === ""
                        ? true
                        : false
                    }
                  >
                    <SendIcon />
                  </IconButton>
                </div>
              </Box>
            </React.Fragment>
          ) : (
              <React.Fragment>
                <Box item xs={12} sm={8}>
                  <div className={classes.footerInput}>
                    <Avatar
                      src={this.props.senderInfo.avatar}
                      className={classes.userAvatar}
                    />
                    <TextField
                      classes={{ root: "MenuItem", classes: "selected" }}
                      id="outlined-full-width"
                      placeholder="Send message"
                      className={classes.textField}
                      InputProps={{ classes: { root: classes.custom } }}
                      margin="normal"
                      fullWidth
                      variant="outlined"
                      value={this.props.chatM}
                      onChange={e => {
                        this.props.handleChatM(e.target.value);
                      }}
                    />
                    <IconButton
                      className={classes.sendIcon}
                      onClick={() => {
                        this.props.sendChatM(this.props.helpingStudent_sub);
            /*BADGE*/            this.props.displayBadge('mentor')
                      }
                      }
                      disabled={
                        this.props.chatM
                          .replace(/^\s+/, "")
                          .replace(/\s+$/, "") === ""
                          ? true
                          : false
                      }
                    >
                      <SendIcon />
                    </IconButton>
                  </div>
                </Box>
              </React.Fragment>
            )}
        </Paper>
      </React.Fragment>
    );
  }
}
export default withStyles(styles)(ChatBox);
