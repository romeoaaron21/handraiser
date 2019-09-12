import React, { PureComponent } from "react";
import { withStyles } from "@material-ui/core/styles";
import MoreSettings from "@material-ui/icons/MoreVert";
import SendIcon from "@material-ui/icons/Send";
import Close from "@material-ui/icons/Close";
import BackToQueue from "@material-ui/icons/SettingsBackupRestore";
import Done from "@material-ui/icons/Done";
import styles from "./chatBoxStyle";
import TypingEffect from "./typingEffect";

import Dialog from "@material-ui/core/Dialog";
import ConfirmationDialog from "../being-helped/doneCofirmationmodal";
import TextareaAutosize from "react-textarea-autosize"

//api
import api from "../../services/fetchApi";

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




  //added dh


  openConfirmationDialog = () => this.setState({ confirmationDialog: true });
  closeConfirmationDialog = () => this.setState({ confirmationDialog: false });


  //move back student to the queue
  removeFromQueue = student => {
    const data = api.fetch(
      `/api/removebeinghelped/${student.id}/${this.props.cohort_id}`,
      "get"
    );
    data.then(res => {
      this.props.helpStudentClose();
    });
  };

  //done helping student
  doneHelp = student => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    let current_datetime = new Date();
    let formatted_date =
      months[current_datetime.getMonth()] +
      " " +
      current_datetime.getDate() +
      ", " +
      current_datetime.getFullYear();
    var time = current_datetime.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true
    });
    var datetime = formatted_date + " " + time;
    const data = api.fetch(
      `/api/doneHelp/${student.id}/${this.props.cohort_id}/${this.props.senderInfo.id}`,
      "post",
      {time: datetime}
    );
    data.then(res => {
      this.props.helpStudentClose();
      this.setState({ confirmationDialog: false });
    });
  };



  //end of added dh

















  render() {
    const { classes } = this.props;
    // console.log(this.props.chatM)
    return (
      <React.Fragment>

        {this.props.privileged === 'mentor' && this.props.helpingStudent_sub === this.props.chatmateInfo.sub ?
          <Paper className={classes.helpStatus}>
            <Typography variant="subtitle4">Currently Helping....</Typography>
          </Paper>
          : null}


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
                  <Close />
                </ListItemIcon>
                <ListItemText primary="Close Chat Box" />
              </StyledMenuItem>


              {this.props.privileged === 'mentor' && this.props.helpingStudent_sub === this.props.chatmateInfo.sub?
                <React.Fragment>
                  <StyledMenuItem onClick={() => this.removeFromQueue(this.props.helpingStudent)}>
                    <ListItemIcon>
                      <BackToQueue />
                    </ListItemIcon>
                    <ListItemText primary="Move Back to Queue" />
                  </StyledMenuItem>


                  <StyledMenuItem onClick={this.openConfirmationDialog}>
                    <ListItemIcon>
                      <Done />
                    </ListItemIcon>
                    <ListItemText primary="Done" />
                  </StyledMenuItem>
                </React.Fragment>
                :null}









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
                style={
                  this.props.privileged === "mentor"
                    ? { minHeight: "443px", maxHeight: "443px" }
                    : { minHeight: "443px", maxHeight: "443px" }
                }

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
                                <TextareaAutosize 
                                readOnly
                                className={classes.textAreaChat}
                                style={{color: this.props.senderInfo.sub === convo.chatmate_id? '#263238' : 'white',}}
                                value={convo.message.replace(/\n$/, "")}/>
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
                {this.props.chatM.length > 0 &&
                  this.props.privileged === "student" ? (
                    <TypingEffect />
                  ) : this.props.chat.length > 0 &&
                    this.props.privileged === "mentor" ? (
                      <TypingEffect />
                    ) : null}

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


                  <React.Fragment>
                    <TextField
                      classes={{ root: "MenuItem" }}
                      placeholder="Send message"
                      className={classes.textField}
                      InputProps={{ classes: { root: classes.custom } }}
                      multiline={true}
                      rowsMax='4'
                      margin="normal"
                      fullWidth
                      variant="outlined"
                      value={this.props.chat}
                      onClick={()=>this.props.sendChatSub(this.props.chatmateInfo.sub)}
                      onChange={e => {
                        this.props.handleChat(e.target.value, this.props.chatmateInfo.sub, this.props.senderInfo.sub);
                      }}
                      // onClick={() => this.props.displayBadge()}
                      onKeyUp={(e) => {
                        if(e.target.value
                        .replace(/^\s+/, "")
                        .replace(/\s+$/, "") !== ""){
                        if(e.key === 'Enter' && !e.shiftKey){
                           this.props.sendChat(this.props.helpingStudent_sub)
                        }}
                        }}
                    />
                    <IconButton
                      className={classes.sendIcon}
                      onClick={this.props.sendChat}
                      disabled={
                        this.props.chat.replace(/^\s+/, "")
                        .replace(/\s+$/, "") === ""
                          ? true
                          : false
                      }
                    >
                      <SendIcon />
                    </IconButton>
                  </React.Fragment>
                </div>
              </Box>
            </React.Fragment>
          ) : (
              <React.Fragment>
                <Box xs={12} sm={8}>
                  <div className={classes.footerInput}>
                    <Avatar
                      src={this.props.senderInfo.avatar}
                      className={classes.userAvatar}
                    />
                    <TextField
                       classes={{ root: "MenuItem" }}
                       placeholder="Send message"
                       className={classes.textField}
                       InputProps={{ classes: { root: classes.custom } }}
                       multiline={true}
                       rowsMax='4'
                       margin="normal"
                       fullWidth
                       variant="outlined"
                       value={this.props.chatM}
                      onChange={e => {
                        this.props.handleChatM(e.target.value, this.props.chatmateInfo.sub, this.props.senderInfo.sub);
                      }}
                      onClick={()=>this.props.sendChatSub(this.props.chatmateInfo.sub)}
                      onKeyUp={(e) => {
                        if(e.target.value
                        .replace(/^\s+/, "")
                        .replace(/\s+$/, "") !== ""){
                        if(e.key === 'Enter' && !e.shiftKey){
                           this.props.sendChatM(this.props.helpingStudent_sub)
                        }}
                        }}
                    />
                    <IconButton
                      className={classes.sendIcon}
                      onClick={() => {
                        this.props.sendChatM(this.props.helpingStudent_sub);
                      }}
                      disabled={
                        this.props.chatM.replace(/^\s+/, "")
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
          <Dialog
            fullWidth
            open={this.state.confirmationDialog}
            aria-labelledby="alert-dialog-title"
          >
            <ConfirmationDialog
              cancel={this.closeConfirmationDialog}
              doneHelp={this.doneHelp}
              helpingStudent={this.props.helpingStudent}
            />
          </Dialog>
        </Paper>
      </React.Fragment>
    );
  }
}
export default withStyles(styles)(ChatBox);
