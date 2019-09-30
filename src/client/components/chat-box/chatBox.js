import React, { PureComponent } from "react";
import { withStyles, lighten } from "@material-ui/core/styles";
import MoreSettings from "@material-ui/icons/MoreVert";
import SendIcon from "@material-ui/icons/Send";
import Close from "@material-ui/icons/Close";
import BackToQueue from "@material-ui/icons/SettingsBackupRestore";
import Done from "@material-ui/icons/Done";
import styles from "./chatBoxStyle";
import TypingEffect from "./typingEffect";
import Photo from "@material-ui/icons/Photo";
import Dialog from "@material-ui/core/Dialog";
import ConfirmationDialog from "../being-helped/doneCofirmationmodal";
import TextareaAutosize from "react-textarea-autosize";
import LinearProgress from "@material-ui/core/LinearProgress";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//api
import api from "../../services/fetchApi";

import { InputAdornment } from "@material-ui/core";
import InsertEmoticon from "@material-ui/icons/InsertEmoticon";
import AttachFileIcon from "@material-ui/icons/AttachFile";

import {
  Link,
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

//Firebase
import { storage } from "../common-components/upload-photo/firebase/firebase";

//menu
import ImageMenu from "./imageMenu";

//splash
import Splash from "./plugins/giphy";

//emoji
import Emoji from "./plugins/emoji";

//gallery
import Gallery from "../chat-page/gallery/galleryDialog";

import Snippet from '../chat-page/snippet/snippet';
import AceEditor from 'react-ace';
import 'brace/mode/javascript'
import 'brace/theme/github'
import 'brace/theme/dracula'


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

const Progress = withStyles({
  root: {
    height: 10,
    backgroundColor: lighten("#775aa5", 0.5)
  },
  bar: {
    borderRadius: 20,
    backgroundColor: "#775aa5"
  }
})(LinearProgress);

// UPLOAD IMAGE ATTRIBUTES
const imageMaxSize = 1000000000; // bytes
const acceptedFileTypes =
  "image/x-png, image/png, image/jpg, image/jpeg, image/gif";
const acceptedFileTypesArray = acceptedFileTypes.split(",").map(item => {
  return item.trim();
});

const acceptedDocuments =
  "text/css, text/html, application/json, text/javascript, text/plain, application/xhtml+xml, application/zip, application/pdf";
const acceptedDocumentsArray = acceptedDocuments.split(",").map(item => {
  return item.trim();
});

class ChatBox extends PureComponent {
  constructor(props) {
    super(props);
    //ANCHOR state
    this.state = {
      confirmationDialog: false,
      openMenu: null,
      image: null,
      progress: 0,
      assist: [],
      imageMenu: null,
      splashDialog: false,
      emoji: false,
      //gallery
      openGallery: false,
      selected: null,
      imgArray: [],
      document: null,
      openSnippet: false
    };
  }
  openSnippet = () => {
    this.setState({ openSnippet: !this.state.openSnippet })
  }
  handleImageMenu = event => {
    this.setState({ imageMenu: event.currentTarget });
  };
  handleImageMenuClose = () => {
    this.setState({ imageMenu: null });
  };
  handleSplash = () => {
    this.setState({ splashDialog: true });
  };
  closeSplash = () => {
    this.setState({ splashDialog: false });
  };
  messagesEndRef = React.createRef();
  componentDidMount() {
    this.scrollToBottom();
    if (this.props.privileged === "mentor") {
      api
        .fetch(`/api/fetchAssist/${this.props.senderInfo.id}`, "get")
        .then(data => {
          this.props.fetchAssist(this.props.senderInfo.id);
          data.data.forEach(val => {
            this.setState({ assist: val });
          });
        });
    }
  }
  componentDidUpdate() {
    this.scrollToBottom();
  }
  scrollToBottom = () => {
    this.messagesEndRef.current.scrollIntoView({ behavior: "smooth",  block: 'nearest', inline: 'start' });
  };
  handleClick = e => {
    this.setState({ openMenu: e.currentTarget });
  };
  handleClose = () => {
    this.setState({ openMenu: null });
  };
  openConfirmationDialog = () => this.setState({ confirmationDialog: true });
  closeConfirmationDialog = () => this.setState({ confirmationDialog: false });
  removeFromQueue = student => {
    const data = api.fetch(
      `/api/removebeinghelped/${student.user_id}/${this.props.cohort_id}`,
      "get"
    );
    data.then(res => {
      this.props.helpStudentClose();
      this.props.fetchAssist(this.props.senderInfo.id);
    });
  };
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
      `/api/doneHelp/${student.user_id}/${this.props.cohort_id}/${this.props.senderInfo.id}`,
      "post",
      { time: datetime }
    );
    data.then(res => {
      this.props.helpStudentClose();
      this.props.fetchAssist(this.props.senderInfo.id);
      this.setState({ confirmationDialog: false });
    });
  };
  verifyFile = files => {
    if (files && files.length > 0) {
      const currentFile = files[0];
      const currentFileType = currentFile.type;
      const currentFileSize = currentFile.size;

      if (currentFileSize > imageMaxSize) {
        alert(
          "This file is not allowed. " + currentFileSize + " bytes is too large"
        );
        return false;
      }
      if (!acceptedFileTypesArray.includes(currentFileType)) {
        alert("This file is not allowed. Only images are allowed.");
        return false;
      }
      return true;
    }
  };
  handleUpload = event => {
    if (event.target.files) {
      const files = event.target.files;
      if (files && files.length > 0) {
        const isVerified = this.verifyFile(files);
        if (isVerified) {
          this.setState({
            image: files[0]
          });
          if (this.props.privileged === "student") {
            this.props.handleChat(
              files[0].name,
              this.props.chatmateInfo.sub,
              this.props.senderInfo.sub
            );
          } else {
            this.props.handleChatM(
              files[0].name,
              this.props.chatmateInfo.sub,
              this.props.senderInfo.sub
            );
          }
        }
      }
    }
  };
  handleSendImage = priv => {
    const { image } = this.state;
    const imageName = this.makeid(image.name);
    const uploadTask = storage.ref(`chat-images/${imageName}`).put(image);
    uploadTask.on(
      "state_changed",
      snapshot => {
        this.setState({
          progress: Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          )
        });
      },
      error => {
        console.log(error);
      },
      () => {
        storage
          .ref("chat-images")
          .child(imageName)
          .getDownloadURL()
          .then(url => {
            if (priv === "student") {
              this.props.sendChat(url, "image");
            } else {
              this.props.sendChatM(url, "image");
            }
            this.setState({
              progress: 0
            });
          });
      }
    );
    this.setState({ image: null });
    this.fileInput.value = "";
  };
  makeid = (name, length = 15) => {
    var ext = name.replace(/^.*\./, "");
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result + "." + ext;
  };
  cancelUpload = () => {
    this.setState({
      image: null
    });
  };
  uploadGif = gif => {
    this.closeSplash();
    if (this.props.privileged === "student") {
      this.props.sendChat(gif.images.downsized.url, "gif");
    } else {
      this.props.sendChatM(gif.images.downsized.url, "gif");
    }
  };
  openPicker = event => {
    if (!event) {
      this.setState({ emoji: null });
    } else {
      if (this.state.emoji) {
        this.setState({ emoji: null });
      } else {
        this.setState({ emoji: event.currentTarget });
      }
    }
  };
  handleEmoji = emoji => {
    let param;
    if (this.props.privileged === "student") {
      param = this.props.chat + emoji.native;
      this.props.handleChat(
        param,
        this.props.chatmateInfo.sub,
        this.props.senderInfo.sub
      );
    } else {
      param = this.props.chatM + emoji.native;
      this.props.handleChatM(
        param,
        this.props.chatmateInfo.sub,
        this.props.senderInfo.sub
      );
    }
  };
  handleDocumentUpload = event => {
    if (event.target.files) {
      const files = event.target.files;
      if (files && files.length > 0) {
        const isVerified = this.verifyDocument(files);
        if (isVerified) {
          this.setState({
            document: files[0]
          });
          if (this.props.privileged === "student") {
            this.props.handleChat(
              files[0].name,
              this.props.chatmateInfo.sub,
              this.props.senderInfo.sub
            );
          } else {
            this.props.handleChatM(
              files[0].name,
              this.props.chatmateInfo.sub,
              this.props.senderInfo.sub
            );
          }
        }
      }
    }
  };
  cancelUploadDocument = () => {
    this.setState({
      document: null
    });
  };
  handleSendDocument = priv => {
    const { document } = this.state;
    const uploadTask = storage.ref(`documents/${document.name}`).put(document);
    uploadTask.on(
      "state_changed",
      snapshot => {
        this.setState({
          progress: Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          )
        });
      },
      error => {
        console.log(error);
      },
      () => {
        storage
          .ref("documents")
          .child(document.name)
          .getDownloadURL()
          .then(url => {
            if (priv === "student") {
              this.props.sendChat(url, "file");
            } else {
              this.props.sendChatM(url, "file");
            }
            this.setState({
              progress: 0
            });
          });
      }
    );
    this.setState({ document: null });
    this.documentInput.value = "";
  };
  verifyDocument = files => {
    if (files && files.length > 0) {
      const regex = /^application\/vnd/;
      const currentFile = files[0];
      const currentFileType = currentFile.type;
      const currentFileSize = currentFile.size;

      const result = regex.test(currentFileType);
      if (currentFileSize > imageMaxSize) {
        toast.error(
          "This file is not allowed. " +
            currentFileSize +
            " bytes is too large",
          {
            hideProgressBar: true,
            draggable: false
          }
        );
        return false;
      }
      if (!result && !acceptedDocumentsArray.includes(currentFileType)) {
        toast.error("This file type is not allowed", {
          hideProgressBar: true,
          draggable: false
        });
        return false;
      }
      return true;
    }
  };
  openGallery = index => {
    const images = this.props.conversation.filter(convo => {
      return (
        convo.chat_type === "image" &&
        ((this.props.senderInfo.sub === convo.sender_id &&
          this.props.chatmateInfo.sub === convo.chatmate_id) ||
          (this.props.senderInfo.sub === convo.chatmate_id &&
            this.props.chatmateInfo.sub === convo.sender_id))
      );
    });
    const selected = images.findIndex(image => image.id === index);
    this.setState({
      openGallery: true,
      selected,
      imgArray: images
    });
  };
  closeGallery = () => {
    this.setState({
      openGallery: false,
      selected: null
    });
  };
  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <ToastContainer
          enableMultiContainer
          position={toast.POSITION.TOP_RIGHT}
        />
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
              {this.state.assist.sub !== this.props.chatmateInfo.sub ? (
                <StyledMenuItem onClick={this.props.viewChatBox}>
                  <ListItemIcon>
                    <Close />
                  </ListItemIcon>
                  <ListItemText primary="Close Chat Box" />
                </StyledMenuItem>
              ) : null}

              {this.props.privileged === "mentor" &&
              this.state.assist.sub === this.props.chatmateInfo.sub ? (
                <Box>
                  <StyledMenuItem
                    onClick={() => {
                      this.removeFromQueue(this.state.assist);
                      this.props.viewChatBox();
                    }}
                  >
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
                </Box>
              ) : null}
            </StyledMenu>
          </Box>
        </Paper>
        {this.state.progress > 0 && (
          <Progress
            variant="determinate"
            style={{ height: 7 }}
            value={this.state.progress}
          />
        )}

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
            style={
              this.props.privileged === "mentor"
                ? { minHeight: "570px", maxHeight: "570px" }
                : { minHeight: "561px", maxHeight: "561px" }
            }
          >
            {this.props.privileged === "mentor" &&
            this.state.assist.sub === this.props.chatmateInfo.sub ? (
              <Paper className={classes.helpStatus}>
                <Typography variant="subtitle2">
                  Currently Helping....
                </Typography>
              </Paper>
            ) : null}

            <div
              className={`${classes.chatBoxBody} ${classes.scrollBar}`}
              style={
                this.props.privileged === "mentor"
                  ? { minHeight: "517px" }
                  : { minHeight: "520px", maxHeight: "520px" }
              }
            >
              <Grid
                item
                className={`${classes.chatContentWrapper} ${classes.scrollBar}`}
                style={
                  this.props.privileged === "mentor"
                    ? { minHeight: "435px" }
                    : { minHeight: "482px", maxHeight: "443px" }
                }
              >
                {this.props.conversation.map((convo, i) =>
                  (this.props.senderInfo.sub === convo.sender_id &&
                    this.props.chatmateInfo.sub === convo.chatmate_id) ||
                  (this.props.senderInfo.sub === convo.chatmate_id &&
                    this.props.chatmateInfo.sub === convo.sender_id) ? (
                    <React.Fragment key={i}>
                      {parseInt(this.props.cohort_id) ===
                      parseInt(convo.cohort_id) ? (
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
                              convo.chat_type === "image" ||
                              convo.chat_type === "gif"
                                ? classes.chatImage
                                : (convo.chat_type === 'code')
                                  ? classes.snippet
                                  : (this.props.senderInfo.sub ===
                                    convo.chatmate_id)
                                    ? classes.chatDetails
                                    : classes.chatDetails2
                            }
                          >
                            <div className={classes.chatText}>
                              <Typography
                                variant="subtitle1"
                                className={classes.chatText}
                              >
                                {convo.chat_type === "text" ? (
                                  <TextareaAutosize
                                    readOnly
                                    className={classes.textAreaChat}
                                    style={{
                                      color:
                                        this.props.senderInfo.sub ===
                                        convo.chatmate_id
                                          ? "#263238"
                                          : "white"
                                    }}
                                    value={convo.message.replace(/\n$/, "")}
                                  />
                                ) : convo.chat_type === "file" ? (
                                  <Box
                                    component="div"
                                    my={2}
                                    textOverflow="ellipsis"
                                    overflow="hidden"
                                  >
                                    <Link
                                      style={{ fontWeight: "bold" }}
                                      href={convo.link}
                                      color="inherit"
                                      variant="body2"
                                    >
                                      {convo.message}
                                    </Link>
                                  </Box>
                                ) : convo.chat_type === "image" ? (
                                  <img
                                    style={{ width: "100%", cursor: "pointer" }}
                                    src={convo.link}
                                    alt=""
                                    onClick={() => this.openGallery(convo.id)}
                                  />
                                ) : (convo.chat_type === "gif")
                                    ? <img style={{ width: "100%"}} src={convo.link} alt=""/>
                                    : <AceEditor
                                      highlightActiveLine={false}
                                      wrapEnabled
                                      maxLines={25}
                                      fontSize="16px"
                                      width="35vw"
                                      mode={convo.link}
                                      value={convo.message}
                                      theme={this.props.senderInfo.sub !== convo.chatmate_id ? "dracula" : "github"}
                                      readOnly
                                      />
                                }
                              </Typography>
                            </div>
                            <div className={classes.chatTime}>
                            <Typography variant="caption" className={convo.chat_type === "code" ? classes.snippetTime : classes.time}>
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
                  <input
                    type="file"
                    onChange={this.handleDocumentUpload}
                    style={{ display: "none" }}
                    ref={documentInput => (this.documentInput = documentInput)}
                  />
                  <IconButton
                    style={{ margin: "0px -8px 0px 5px" }}
                    onClick={() => this.documentInput.click()}
                  >
                    <AttachFileIcon />
                  </IconButton>
                  <input
                    type="file"
                    onChange={this.handleUpload}
                    style={{ display: "none" }}
                    ref={fileInput => (this.fileInput = fileInput)}
                  />
                  <IconButton onClick={this.handleImageMenu}>
                    <Photo />
                  </IconButton>
                  <ImageMenu
                    openSplash={this.handleSplash}
                    fileRef={this.fileInput}
                    open={this.state.imageMenu}
                    handleClose={this.handleImageMenuClose}
                  />

                  <React.Fragment>
                    <TextField
                      classes={{ root: "MenuItem" }}
                      placeholder="Send message"
                      className={classes.textField}
                      multiline={true}
                      rowsMax="4"
                      margin="normal"
                      fullWidth
                      variant="outlined"
                      value={this.props.chat}
                      onClick={() =>
                        this.props.sendChatSub(this.props.chatmateInfo.sub)
                      }
                      onChange={e => {
                        this.props.handleChat(
                          e.target.value,
                          this.props.chatmateInfo.sub,
                          this.props.senderInfo.sub
                        );
                      }}
                      onKeyUp={e => {
                        if (e.ctrlKey && e.shiftKey && e.key === "Enter"){
                          this.openSnippet()
                        }
                        else if (
                          e.target.value
                            .replace(/^\s+/, "")
                            .replace(/\s+$/, "") !== ""
                        ) {
                          if (e.key === "Enter" && !e.shiftKey) {
                            this.state.image
                              ? this.handleSendImage("student")
                              : this.state.document
                              ? this.handleSendDocument("student")
                              : this.props.sendChat();
                            this.openPicker();
                          }
                        }
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton edge="end" onClick={this.openPicker}>
                              <InsertEmoticon />
                            </IconButton>
                          </InputAdornment>
                        ),
                        classes: { root: classes.custom }
                      }}
                    />
                    <IconButton
                      className={classes.sendIcon}
                      onClick={() => {
                        this.state.image
                          ? this.handleSendImage("student")
                          : this.state.document
                          ? this.handleSendDocument("student")
                          : this.props.sendChat();
                        this.openPicker();
                      }}
                      disabled={
                        this.props.chat
                          .replace(/^\s+/, "")
                          .replace(/\s+$/, "") === "" && !this.state.image
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
                  <input
                    type="file"
                    onChange={this.handleDocumentUpload}
                    style={{ display: "none" }}
                    ref={documentInput => (this.documentInput = documentInput)}
                  />
                  <IconButton
                    style={{ margin: "0px -8px 0px 5px" }}
                    onClick={() => this.documentInput.click()}
                  >
                    <AttachFileIcon />
                  </IconButton>
                  <input
                    type="file"
                    onChange={this.handleUpload}
                    style={{ display: "none" }}
                    ref={fileInput => (this.fileInput = fileInput)}
                  />
                  <IconButton onClick={this.handleImageMenu}>
                    <Photo />
                  </IconButton>
                  <ImageMenu
                    openSplash={this.handleSplash}
                    fileRef={this.fileInput}
                    open={this.state.imageMenu}
                    handleClose={this.handleImageMenuClose}
                  />
                  <TextField
                    classes={{ root: "MenuItem" }}
                    placeholder="Send message"
                    className={classes.textField}
                    multiline={true}
                    rowsMax="4"
                    margin="normal"
                    fullWidth
                    variant="outlined"
                    value={this.props.chatM}
                    onChange={e => {
                      this.props.handleChatM(
                        e.target.value,
                        this.props.chatmateInfo.sub,
                        this.props.senderInfo.sub
                      );
                    }}
                    onClick={() =>
                      this.props.sendChatSub(this.props.chatmateInfo.sub)
                    }
                    onKeyUp={e => {
                      if (e.ctrlKey && e.shiftKey && e.key === "Enter"){
                        this.openSnippet()
                      }
                      else if (
                        e.target.value
                          .replace(/^\s+/, "")
                          .replace(/\s+$/, "") !== ""
                      ) {
                        if (e.key === "Enter" && !e.shiftKey) {
                          this.state.image
                            ? this.handleSendImage("mentor")
                            : this.state.document
                            ? this.handleSendDocument("mentor")
                            : this.props.sendChatM();
                          this.openPicker();
                        }
                      }
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton edge="end" onClick={this.openPicker}>
                            <InsertEmoticon />
                          </IconButton>
                        </InputAdornment>
                      ),
                      classes: { root: classes.custom }
                    }}
                  />
                  <IconButton
                    className={classes.sendIcon}
                    onClick={() => {
                      this.state.image
                        ? this.handleSendImage("mentor")
                        : this.state.document
                        ? this.handleSendDocument("mentor")
                        : this.props.sendChatM();
                      this.openPicker();
                    }}
                    disabled={
                      this.props.chatM
                        .replace(/^\s+/, "")
                        .replace(/\s+$/, "") === "" && !this.state.image
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
              helpingStudent={this.state.assist}
            />
          </Dialog>

          <Splash
            uploadGif={this.uploadGif}
            open={this.state.splashDialog}
            handleClose={this.closeSplash}
          />

          <Emoji anchorEl={this.state.emoji} handleEmoji={this.handleEmoji} />

          <Gallery
            conversation={this.state.imgArray}
            open={this.state.openGallery}
            handleClose={this.closeGallery}
            selected={this.state.selected}
          />
          <Snippet 
            open={this.state.openSnippet}
            handleClose={this.openSnippet}
            sendChat={this.props.sendCode}
            type="pm"
          />
        </Paper>
      </React.Fragment>
    );
  }
}
export default withStyles(styles)(ChatBox);
