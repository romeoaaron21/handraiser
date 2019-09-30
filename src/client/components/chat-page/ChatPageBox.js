import React, { Component } from "react";
import { withStyles, lighten } from "@material-ui/core/styles";
import styles from "./ChatPageStyle";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from "@material-ui/icons/Send";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import TypingEffect from "../chat-box/typingEffect";
import LinearProgress from '@material-ui/core/LinearProgress';
import Photo from '@material-ui/icons/Photo'
import { InputAdornment } from '@material-ui/core'
import InsertEmoticon from '@material-ui/icons/InsertEmoticon';
import GroupIcon from '@material-ui/icons/Group';
import Snippet from './snippet/snippet';
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import EditGroup from "./dialogs/EditGroup";
import api from "../../services/fetchApi";
import Link from "@material-ui/core/Link";
import Button from '@material-ui/core/Button'
import { storage } from "../common-components/upload-photo/firebase/firebase";
import ImageMenu from "../chat-box/imageMenu";
import Splash from "../chat-box/plugins/giphy";
import Emoji from '../chat-box/plugins/emoji';
import Gallery from './gallery/galleryDialog';
import AceEditor from 'react-ace';
import CircularProgress from '@material-ui/core/CircularProgress';
import WarningIcon from '@material-ui/icons/Warning';

import 'brace/mode/javascript'
import 'brace/theme/github'
import 'brace/theme/dracula'
import io from "socket.io-client";
const socket = io("http://boom-handraiser.com:3001/");

const imageMaxSize = 30000000;
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

class ChatPageBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openMenu: null,
      image: null,
      progress: 0,
      assist: [],
      imageMenu: null,
      splashDialog: false,
      emoji: false,
      document: null,
      openGallery: false,
      selected: null,
      imgArray: [],
      openSnippet: false,
      anchorEl: null,
      openEditGroup: false,
      gc: false,
      //group
      groupId: null,
      userNotInGroup: [],
      groupName: "",
      gc: false,
      checkInGroup: false,
      chatmate: false,
    };
  }
  openSnippet = () => {
    this.setState({ openSnippet: !this.state.openSnippet })
  }
  messagesEndRef = React.createRef();
  componentDidMount() {
    this.scrollToBottom();
  }
  scrollToBottom = () => {
    this.messagesEndRef.current.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start"
    });
  };
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
          this.props.setChatText(files[0].name);
        }
      }
    }
  };
  //ANCHOR HANDLE IMAGE
  handleSendImage = type => {
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
            if (type === 'group'){
              this.props.sendChatGroup(url, "image");
            }
            else {
              this.props.sendChat(url, undefined, undefined, "image");
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
  //ANCHOR GIF UPLOAD
  uploadGif = gif => {
    this.closeSplash();
    if (this.props.chatmateInfo.sub === undefined){
      this.props.sendChatGroup(gif.images.downsized.url, "gif");
    }
    else {
      this.props.sendChat(gif.images.downsized.url, undefined, undefined, "gif");
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
    const param = this.props.senderText + emoji.native;
    this.props.setChatText(param);
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
          this.props.setChatText(files[0].name);
        }
      }
    }
  };
  cancelUploadDocument = () => {
    this.setState({
      document: null
    });
  };
  //ANCHOR HANDLE DOCUMENT
  handleSendDocument = type => {
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
            if (type === 'group'){
              this.props.sendChatGroup(url, "file");
            }
            else {
              this.props.sendChat(url, undefined, undefined, "file");
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
        alert(
          "This file is not allowed. " + currentFileSize + " bytes is too large"
        );
        return false;
      }
      if (!result && !acceptedDocumentsArray.includes(currentFileType)) {
        alert("This file type is not allowed");
        return false;
      }
      return true;
    }
  };
  //FILE UPLOAD END
  //gallery
  openGallery = index => {
    let images;
    if (this.props.chatmateInfo.sub === undefined){
      images = this.props.groupConversation.filter(convo => {
        return (
          convo.chat_type === "image" && 
          this.props.chatmateInfo.id === convo.groupchat_id
        );
      });
    }
    else {
      images = this.props.conversation.filter(convo => {
        return (
          convo.chat_type === "image" &&
          ((convo.sender_id === this.props.userInfo.sub &&
            this.props.chatmateInfo.sub === convo.chatmate_id) ||
            (convo.chatmate_id === this.props.userInfo.sub &&
              this.props.chatmateInfo.sub === convo.sender_id))
        );
      });
    }  
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
  //gallery end

  //Menu
  handleMenuClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
  };
  //

  handleClickEditGroup = groupId => {
    api
      .fetch(`http://localhost:3001/api/getAllUserNotInGroup/${groupId}`, "get")
      .then(data => {
        this.setState({ userNotInGroup: [...data.data] });
      });
    this.setState({ openEditGroup: true, anchorEl: null });
  };
  handleCloseEditGroup = () => this.setState({ openEditGroup: false });

  //leave group  / delete member
  leaveGroup = (groupId, sub) => {
    // console.log(groupId,sub)
    this.setState({ gc: true })
    api.fetch(`/api/leaveGroup/${sub}/${groupId}`, "delete")
      .then(data => {
        document.location.reload(true)
        socket.emit("chatGroupList", data.data);
        socket.emit("refreshGroupName", [this.props.userInfo.sub, this.state.groupId]);
      })
  }

  render() {
    const { classes } = this.props;
    if (this.state.gc === false) {
      this.props.groupListInfo.map(gc => {
        if (gc.id === this.props.chatmateInfo.id) {
          this.setState({ gc: true });
        }
      });
    }
    setTimeout(() => {
        this.setState({chatmate:true})
    }, 3000)
    return (
      <Grid item md={6} xs={8} style={{ minHeight: "800px" }}>
        <Paper
          style={{
            height: "800px",
            maxHeight: "800px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
          }}
        >
          <div style={{ height: "92%" }}>
            {/* Chatbox Header */}
            <div style={{ height: "10%" }}>
              <div className={classes.chatBoxHeader}>
                <span
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center"
                  }}
                >
                  {this.props.chatmateInfo.avatar === undefined ? (
                    <Avatar style={{ marginRight: 10 }}>
                      {" "}
                      <GroupIcon />{" "}
                    </Avatar>
                  ) : (
                      <Avatar
                        style={{ marginRight: 10 }}
                        src={this.props.chatmateInfo.avatar}
                      />
                    )}

                  <div>
                    <Typography variant="body">
                      {this.props.chatmateInfo.first_name === undefined
                        ? this.props.chatmateInfo.name
                        : `${this.props.chatmateInfo.first_name} ${this.props.chatmateInfo.last_name}`}
                    </Typography>
                    {this.props.chatmateInfo.status === "active" ? (
                      <div className={classes.activeNowWrapper}>
                        <div className={classes.activeNowCircle} />
                        <Typography
                          variant="subtitle2"
                          style={{ marginTop: 2 }}
                        >
                          Active Now
                        </Typography>
                      </div>
                    ) : null}
                  </div>
                </span>

                {this.props.chatmateInfo.first_name === undefined ? (
                  <IconButton
                    onClick={this.handleMenuClick}
                    disabled={
                      !this.state.gc &&
                        this.props.chatmateInfo.sub === undefined
                        ? true
                        : false
                    }
                  >
                    <MoreVertIcon />
                  </IconButton>
                ) : (
                    ""
                  )}

                <Menu
                  id="simple-menu"
                  anchorEl={this.state.anchorEl}
                  keepMounted
                  open={Boolean(this.state.anchorEl)}
                  onClose={this.handleMenuClose}
                  style={{ marginTop: 55 }}
                >
                  <MenuItem
                    onClick={() => {
                      this.handleClickEditGroup(this.props.chatmateInfo.id);
                      this.setState({
                        groupId: this.props.chatmateInfo.id,
                        groupName: this.props.chatmateInfo.name
                      });
                    }}
                  >

                    Edit Group
                  </MenuItem>
                  {this.props.chatmateInfo.user_sub !==
                    this.props.userInfo.sub ? (
                      <MenuItem
                        onClick={() => {
                          this.handleMenuClose();
                          this.leaveGroup(
                            this.props.chatmateInfo.id,
                            this.props.userInfo.sub
                          );
                        }}
                      >
                        Leave Group
                    </MenuItem>
                    ) : null}
                </Menu>
              </div>
              <Divider />
            </div>
            {/* End Chatbox Header */}
            {this.state.progress > 0 && (
              <Progress
                variant="determinate"
                style={{ height: 7 }}
                value={this.state.progress}
              />
            )}

            {/* Main Chatbox */}
            <div
              style={{ height: "90%", overflowY: "auto" }}
              className={classes.scrollBar}
            >
              <div className={classes.chatBoxContainer}>
                <Button onClick={this.props.showMoreGroup}>
                    Show more {this.props.groupShow} , {this.props.groupConversation.length}
                </Button>
                {this.props.chatmateInfo.sub !== undefined ? (
                  this.props.conversation.map((convo, i) =>
                    (convo.sender_id === this.props.userInfo.sub &&
                      this.props.chatmateInfo.sub === convo.chatmate_id) ||
                    (convo.chatmate_id === this.props.userInfo.sub &&
                      this.props.chatmateInfo.sub === convo.sender_id) ? (
                        //ANCHOR PM CHAT BOX
                        <React.Fragment key={i}>
                        {convo.cohort_id === "all" ? (
                          <div className={convo.sender_id !== this.props.userInfo.sub?classes.senderChatWrapper:classes.receiverChatWrapper}>
  
                            {convo.sender_id !== this.props.userInfo.sub?
                            <Avatar style={{ marginRight: "10px" }} src={this.props.chatmateInfo.avatar}/>
                            :null
                            }
                                <Box 
                                className={
                                    (convo.chat_type === "image" || 
                                      convo.chat_type === 'gif')
                                    ? classes.chatImage
                                    : (convo.chat_type === 'code')
                                      ? classes.snippet
                                      : (convo.sender_id !== this.props.userInfo.sub)
                                      ? classes.senderBox
                                      : classes.receiverBox
                                }>
                                {convo.chat_type === "text"
                                  ? <TextareaAutosize
                                    readOnly
                                    className={classes.textAreaChat}
                                    style={convo.sender_id !== this.props.userInfo.sub?{ color: "#263238" }:{ color: "#fff" }}
                                    value={convo.message.replace(/\n$/, "")}
                                    />
                                  : (convo.chat_type === "file")
                                    ? <Box
                                      component="div"
                                      my={2}
                                      textOverflow="ellipsis"
                                      overflow="hidden"
                                      >
                                       <Link style={{ fontWeight: 'bold' }}href={convo.link} color="inherit" variant="body2">{convo.message}</Link>
                                      </Box>
                                    :  (convo.chat_type === "image")
                                        ? <img style={{ width: "100%", cursor: 'pointer' }} src={convo.link} alt="" onClick={() => this.openGallery(convo.id)} />
                                        : (convo.chat_type === "gif")
                                          ? <img style={{ width: "100%"}} src={convo.link} alt=""/>
                                          : <AceEditor
                                          wrapEnabled
                                          maxLines={100}
                                          fontSize="16px"
                                          width="35vw"
                                          mode="javascript"
                                          value={convo.message}
                                          theme={convo.sender_id === this.props.userInfo.sub ? "dracula" : "github"}
                                          readOnly
                                          />
                                }
                                  <Typography variant="caption" className={convo.chat_type === "code" ? classes.snippetTime : classes.time}>
                                    {convo.time}
                                  </Typography>
                                </Box>
                              </div>
                        ):
                        null}
                    </React.Fragment>
                    ) : null
                  )
                ) : this.state.gc ? (
                  [...this.props.groupConversation].slice((this.props.groupConversation.length - 1) - this.props.groupShow, this.props.groupConversation.length).map((gcConvo, i) =>
                    this.props.chatmateInfo.id === gcConvo.groupchat_id ? (
                      //ANCHOR GC CHATBOX
                      <React.Fragment key={i}>
                        <div
                          className={
                            gcConvo.sender_sub !== this.props.userInfo.sub
                              ? classes.senderChatWrapper
                              : classes.receiverChatWrapper
                          }
                        >
                          {gcConvo.sender_sub !== this.props.userInfo.sub ? (
                            <Avatar
                              style={{ marginRight: "10px" }}
                              src={gcConvo.avatar}
                            />
                          ) : null}
                            <Box 
                                className={
                                    (gcConvo.chat_type === "image" || 
                                    gcConvo.chat_type === 'gif')
                                    ? classes.chatImage
                                    : (gcConvo.chat_type === 'code')
                                      ? classes.snippet
                                      : (gcConvo.sender_sub !== this.props.userInfo.sub)
                                      ? classes.senderBox
                                      : classes.receiverBox
                            }>
                            {gcConvo.chat_type === "text"
                            ? <TextareaAutosize
                                readOnly
                                className={classes.textAreaChat}
                                style={
                                  gcConvo.sender_sub !== this.props.userInfo.sub
                                    ? { color: "#263238" }
                                    : { color: "#fff" }
                                }
                                value={gcConvo.message.replace(/\n$/, "")}
                              />
                            : (gcConvo.chat_type === "file")
                              ? <Box
                                component="div"
                                my={2}
                                textOverflow="ellipsis"
                                overflow="hidden"
                                >
                                  <Link style={{ fontWeight: 'bold' }} href={gcConvo.link} color="inherit" variant="body2">{gcConvo.message}</Link>
                                </Box>
                              :  (gcConvo.chat_type === "image")
                                ? <img style={{ width: "100%", cursor: 'pointer' }} src={gcConvo.link} alt="" onClick={() => this.openGallery(gcConvo.id)} />
                                : (gcConvo.chat_type === "gif")
                                  ? <img style={{ width: "100%"}} src={gcConvo.link} alt=""/>
                                  : <AceEditor
                                      wrapEnabled
                                      maxLines={100}
                                      fontSize="16px"
                                      width="35vw"
                                      mode="javascript"
                                      value={gcConvo.message}
                                      theme={gcConvo.sender_sub === this.props.userInfo.sub ? "dracula" : "github"}
                                      readOnly
                                    />
                            }
                            <Typography variant="caption" className={gcConvo.chat_type === "code" ? classes.snippetTime : classes.time}>
                              {gcConvo.time}
                            </Typography>
                          </Box>
                        </div>
                      </React.Fragment>
                    ) : null
                  )
                ) : !this.state.gc &&
                this.props.chatmateInfo.name !== undefined ? (
                //START OF EDIT HERE EARL
                <React.Fragment>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      width: "100%",
                      background: "red",
                      color: "white",
                      padding: 3,
                      borderRadius: 10
                    }}
                  >
                    <WarningIcon
                      style={{ marginRight: 10, marginTop: 1.5 }}
                    />
                    <Typography variant="overline">
                      You're not a member of this group
                    </Typography>
                  </div>
                </React.Fragment>
                ) : 
                //GAWING LOADER
                !this.state.chatmate?

                <React.Fragment>
                  <div className={classes.messageLoader}>
                    <CircularProgress />
                    <Typography variant="overline" style={{ marginTop: 10 }}>
                      Loading Messages
                    </Typography>
                  </div>
                </React.Fragment>
                :

                <React.Fragment>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      width: "100%",
                      background: "#fea000",
                      color: "white",
                      padding: 3,
                      borderRadius: 10
                    }}
                  >
                    <Typography variant="overline">
                      No private messages found!
                    </Typography>
                  </div>
                </React.Fragment>

                }

                {this.props.chatmateText.length > 0 &&
                  this.props.chatmateInfo.name === undefined ? (
                    <TypingEffect />
                  ) : null}
                {this.props.chatmateText.length > 0 &&
                  this.props.chatmateInfo.sub === undefined &&
                  this.state.gc === true ? (
                    <TypingEffect />
                  ) : null}

                <div ref={this.messagesEndRef} />
              </div>
            </div>
            {/* End Chatbox */}
          </div>
          {/* Message Box */}
          <div style={{ height: "auto" }}>
            <Divider />
            <div className={classes.messageWrapper}>
              <input
                type="file"
                onChange={this.handleDocumentUpload}
                style={{ display: "none" }}
                ref={documentInput => (this.documentInput = documentInput)}
              />
              <IconButton
                style={{ marginRight: 4 }}
                onClick={() => this.documentInput.click()}
                disabled={
                  !this.state.gc && this.props.chatmateInfo.sub === undefined
                    ? true
                    : false
                }
              >
                <AttachFileIcon />
              </IconButton>
              <input
                type="file"
                onChange={this.handleUpload}
                style={{ display: "none" }}
                ref={fileInput => (this.fileInput = fileInput)}
              />
              <IconButton
                style={{ marginRight: 10 }}
                onClick={this.handleImageMenu}
                disabled={
                  !this.state.gc && this.props.chatmateInfo.sub === undefined
                    ? true
                    : false
                }
              >
                <Photo />
              </IconButton>
              <ImageMenu
                openSplash={this.handleSplash}
                fileRef={this.fileInput}
                open={this.state.imageMenu}
                handleClose={this.handleImageMenuClose}
              />
              <TextField
                inputRef={textInput => (this.textInput = textInput)}
                autoFocus
                variant="outlined"
                multiline
                rowsMax="4"
                fullWidth
                placeholder="Send Message"
                color="primary"
                style={{ marginRight: 5 }}
                onChange={e =>
                  this.props.chatmateInfo.sub !== undefined
                    ? this.props.setChatText(e.target.value, "pm")
                    : this.props.setChatText(e.target.value, "gc")
                }
                onClick={() => {
                  if (this.props.chatmateInfo.sub !== undefined) {
                    this.props.displayBadge(this.props.chatmateInfo.sub, "pm");
                  } else {
                    this.props.displayBadge(this.props.chatmateInfo.id, "gc");
                  }
                }}
                onKeyUp={e => {
                  if (e.ctrlKey && e.shiftKey && e.key === "Enter"){
                    this.openSnippet()
                  }
                  else if (
                    e.target.value.replace(/^\s+/, "").replace(/\s+$/, "") !==
                    ""
                  ) {
                    if (e.key === "Enter" && !e.shiftKey) {
                      this.textInput.value = ""
                      if (
                        this.state.image &&
                        this.props.chatmateInfo.sub !== undefined
                      ) {
                        this.handleSendImage("student");
                      } else if (
                        !this.state.image &&
                        this.props.chatmateInfo.sub !== undefined
                      ) {
                        this.props.sendChat();
                        this.props.displayBadge(this.props.chatmateInfo.sub, "pm");
                        this.openPicker();
                      } else if (this.props.chatmateInfo.sub === undefined) {
                        this.props.sendChatGroup();
                        this.props.displayBadge(this.props.chatmateInfo.id, "gc")
                      }
                    }
                  }
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        onClick={this.openPicker}
                        disabled={
                          !this.state.gc &&
                            this.props.chatmateInfo.sub === undefined
                            ? true
                            : false
                        }
                      >
                        <InsertEmoticon />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                disabled={
                  !this.state.gc && this.props.chatmateInfo.sub === undefined
                    ? true
                    : false
                }
              />
              <IconButton
                onClick={() => {
                  if (this.props.chatmateInfo.sub === undefined) {
                    this.textInput.value = ""
                    if (this.state.image) {
                      this.handleSendImage('group');
                    } else if (this.state.document) {
                      this.handleSendDocument('group');
                    } else {
                      this.props.sendChatGroup();
                      this.props.displayBadge(this.props.chatmateInfo.id, "gc")
                      this.openPicker();
                    } 
                  }
                  else {
                    this.textInput.value = ""
                    if (this.state.image) {
                      this.handleSendImage();
                    } else if (this.state.document) {
                      this.handleSendDocument();
                    } else {
                      this.props.sendChat();
                      this.props.displayBadge(this.props.chatmateInfo.sub, "pm");
                      this.openPicker();
                    } 
                  } 
                }}
                disabled={
                  this.props.senderText
                    .replace(/^\s+/, "")
                    .replace(/\s+$/, "") === ""
                    ? true
                    : !this.state.gc &&
                      this.props.chatmateInfo.sub === undefined
                      ? true
                      : false
                }
              >
                <SendIcon />
              </IconButton>
            </div>
          </div>
          <Splash
            uploadGif={this.uploadGif}
            open={this.state.splashDialog}
            handleClose={this.closeSplash}
          />
          <Emoji 
            anchorEl={this.state.emoji} 
            handleEmoji={this.handleEmoji} 
          />
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
            sendGroup={this.props.sendCodeGroup}
            type={this.props.chatmateInfo.sub ? "pm" : "gc"}
          />
          
          <EditGroup
            openDialog={this.state.openEditGroup}
            handleClose={this.handleCloseEditGroup}
            avatarSample={this.props.userInfo.avatar}
            groupId={this.state.groupId}
            users={this.state.userNotInGroup}
            groupName={this.state.groupName}
            refreshComponent={this.props.refreshComponent}
            sub={this.props.userInfo.sub}
          />

        </Paper>
      </Grid>
    );
  }
}

export default withStyles(styles)(ChatPageBox);
