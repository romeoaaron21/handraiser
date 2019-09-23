import React, { createRef } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import Dropzone from "react-dropzone";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";

import UploadIcon from "../../../images/upload.png";
import SearchImageIcon from "../../../images/searchImage.png";

//API
import api from "../../../services/fetchApi";

//Firebase
import { storage } from "./firebase/firebase";

import {
  base64StringtoFile,
  extractImageFileExtensionFromBase64,
  image64toCanvasRef
} from "./ReusableUtils";

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    paddingBottom: "0px"
  },
  tabs: {
    minWidth: "50px",
    padding: "12px 12px 0 12px"
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#e0e0e0",
    "&:hover": {
      backgroundColor: "#e0e0e0"
    },
    width: "100%"
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    height: "30px",
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "896px"
    }
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  },
  uploadContent: {
    "&::-webkit-scrollbar": {
      width: "0.3em"
    },
    "&::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)"
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
      borderRadius: "10px",
      outline: "1px solid slategrey"
    }
  },
  uploadBtn: {
    backgroundColor: "#ebebff",
    "&:hover": {
      backgroundColor: "#e4e4ff"
    }
  },
  container: {
    paddingTop: "13%",
    paddingBottom: "14%",
    textAlign: "center",
    display: "flex",
    flexDirection: "column"
  },
  cropContainer: {
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    position: "relative",
    top: "45%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  },
  uploadDiv: {
    width: "100px",
    marginRight: "auto",
    marginLeft: "auto"
  },
  uploadIcon: {
    backgroundImage: `url(${UploadIcon})`,
    height: "93px",
    weight: "200px",
    backgroundRepeat: "no-repeat"
  },
  searchImageIcon: {
    backgroundImage: `url(${SearchImageIcon})`,
    height: "93px",
    weight: "200px",
    backgroundRepeat: "no-repeat"
  },
  selectBtn: {
    textTransform: "none",
    backgroundColor: "#f2f2f2",
    borderRadius: "2px",
    border: "1px solid #d8d8d8",
    padding: "2px 8px",
    fontSize: "12px"
  },
  largeImage: {
    width: "500px"
  },
  smallImage: {
    width: "417px"
  },
  fadeIn: {
    textAlign: "center",
    borderColor: "#202020",
    backgroundColor: "#484848",
    color: "#fff",
    borderRadius: "4px",
    fontSize: "11px",
    height: "15px",
    padding: "6px",
    position: "absolute",
    marginLeft: "auto",
    marginRight: "auto",
    left: "11%",
    right: "11%",
    opacity: "1",
    transition: "opacity 1s linear"
  },
  fadeOut: {
    textAlign: "center",
    borderColor: "#202020",
    backgroundColor: "#484848",
    color: "#fff",
    borderRadius: "4px",
    fontSize: "11px",
    height: "15px",
    padding: "6px",
    position: "absolute",
    marginLeft: "auto",
    marginRight: "auto",
    left: "11%",
    right: "11%",
    opacity: "0",
    transition: "opacity 1s linear"
  }
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box>{children}</Box>
    </Typography>
  );
}
const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1)
  }
}))(MuiDialogActions);

// UPLOAD IMAGE ATTRIBUTES
const imageMaxSize = 1000000000; // bytes
const acceptedFileTypes =
  "image/x-png, image/png, image/jpg, image/jpeg, image/gif";
const acceptedFileTypesArray = acceptedFileTypes.split(",").map(item => {
  return item.trim();
});

const dropzoneRef = createRef();

class UploadPhoto extends React.Component {
  constructor() {
    super();
    this.imagePreviewCanvasRef = React.createRef();
    this.fileInputRef = React.createRef();
    this.state = {
      tabValue: 1,
      search: "",
      file: [],
      imgUrl: "",
      imgSrc: null,
      imgSrcExt: null,
      errorMsg: false,
      crop: {
        unit: "%",
        height: 16.10294117647059,
        width: 48.34437086092716,
        x: 25,
        y: 43,
        aspect: 16 / 3
      }
    };
  }

  dismiss = () => {
    document.getElementById("file").value = null;
    this.setState({
      file: [],
      imgSrc: null,
      imgSrcExt: null,
      errorMsg: false
    });
  };

  clickUploadFile = () => {
    document.getElementById("file").click();
  };

  handleImageLoaded = image => {};

  handleOnCropChange = crop => {
    this.setState({ crop: crop });
  };

  handleOnCropComplete = (crop, pixelCrop) => {
    const canvasRef = this.imagePreviewCanvasRef.current;
    const { imgSrc } = this.state;
    image64toCanvasRef(canvasRef, imgSrc, pixelCrop);
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

  handleOnDrop = (files, rejectedFiles) => {
    if (rejectedFiles && rejectedFiles.length > 0) {
      this.verifyFile(rejectedFiles);
    }

    if (files && files.length > 0) {
      const isVerified = this.verifyFile(files);
      if (isVerified) {
        const currentFile = files[0];
        const myFileItemReader = new FileReader();

        var changeState = this; // set the this to changeState for setState in line 214

        myFileItemReader.addEventListener(
          "load",
          () => {
            var img = new Image();
            img.src = myFileItemReader.result;

            img.onload = function() {
              if (img.width >= 800 && img.height >= 200) {
                const myResult = myFileItemReader.result;
                changeState.setState({
                  file: files,
                  imgSrc: myResult,
                  imgSrcExt: extractImageFileExtensionFromBase64(myResult)
                });
              } else {
                changeState.setState({ errorMsg: true });
              }
            };
          },
          false
        );

        myFileItemReader.readAsDataURL(currentFile);
      }
    }
  };

  handleFileSelect = event => {
    this.setState({ errorMsg: false });
    const files = event.target.files;
    if (files && files.length > 0) {
      const isVerified = this.verifyFile(files);
      if (isVerified) {
        // imageBase64Data
        const currentFile = files[0];
        const myFileItemReader = new FileReader();

        var changeState = this; // set the this to changeState for setState in line 214

        myFileItemReader.addEventListener(
          "load",
          () => {
            var img = new Image();
            img.src = myFileItemReader.result;

            img.onload = function() {
              if (img.width >= 800 && img.height >= 200) {
                const myResult = myFileItemReader.result;
                changeState.setState({
                  file: files,
                  imgSrc: myResult,
                  imgSrcExt: extractImageFileExtensionFromBase64(myResult)
                });
              } else {
                changeState.setState({ errorMsg: true });
              }
            };
          },
          false
        );
        myFileItemReader.readAsDataURL(currentFile);
      }
    }
  };

  handleSelectClassHeader = event => {
    event.preventDefault();
    this.props.handleClose();
    this.props.uploadPhotoFn();
    const { imgSrc } = this.state;
    if (imgSrc) {
      const canvasRef = this.imagePreviewCanvasRef.current;

      const { imgSrcExt } = this.state;
      const imageData64 = canvasRef.toDataURL("image/" + imgSrcExt);

      const myFilename = "previewFile." + imgSrcExt;

      // file to be uploaded
      const myNewCroppedFile = base64StringtoFile(imageData64, myFilename);

      const uploadTask = storage
        .ref(`class-header/${this.props.cohortId}`)
        .put(myNewCroppedFile);
      uploadTask.on(
        "state_changed",
        snapshot => {
          // progrss function ....
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          this.setState({ progress });
        },
        error => {
          // error function ....
          console.log(error);
        },
        () => {
          // complete function ....
          storage
            .ref("class-header")
            .child(`${this.props.cohortId}`)
            .getDownloadURL()
            .then(url => {
              this.setState({ imgUrl: url });
              api
                .fetch(`/upload/${this.props.cohortId}`, "POST", { url })
                .then(res => {
                  this.setState({ imageURL: `${res.file}` });
                  this.props.loadStateFn();
                  this.props.uploadPhotoFn();
                });
            });
        }
      );
    }
  };

  handleTabValue = (event, newValue) => {
    this.setState({ tabValue: newValue });
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <DialogTitle
          id="customized-dialog-title"
          onClose={this.props.handleClose}
        >
          Gallery
          <Tabs
            value={this.state.tabValue}
            onChange={this.handleTabValue}
            indicatorColor="primary"
            textColor="primary"
            style={{ width: "100%", marginTop: "1%" }}
          >
            <Tab label="Upload" classes={{ textColorPrimary: classes.tabs }} />
            <Tab label="Search" classes={{ textColorPrimary: classes.tabs }} />
          </Tabs>
        </DialogTitle>
        <TabPanel value={this.state.tabValue} index={0}>
          <DialogContent
            dividers
            style={{ height: "450px" }}
            className={classes.uploadContent}
          >
            <div
              className={
                this.state.errorMsg ? `${classes.fadeIn}` : `${classes.fadeOut}`
              }
            >
              The photo that you uploaded is too small! It must be at least 800
              pixels wide and 200 pixels tall.
              <Link
                onClick={this.dismiss}
                style={{
                  color: "#fff",
                  textDecoration: "none",
                  cursor: "pointer"
                }}
              >
                {" "}
                Dismiss
              </Link>
            </div>

            {this.state.imgSrc === null ? (
              <Dropzone
                ref={dropzoneRef}
                noClick
                noKeyboard
                onDrop={this.handleOnDrop}
                accept={acceptedFileTypes}
                multiple={false}
                maxSize={imageMaxSize}
              >
                {({ getRootProps, getInputProps, acceptedFiles }) => {
                  return (
                    <Grid
                      container
                      {...getRootProps({ className: classes.container })}
                    >
                      <Grid item className={classes.uploadDiv}>
                        <div className={classes.uploadIcon} />
                      </Grid>
                      <Grid item>
                        <Typography
                          gutterBottom
                          style={{ fontSize: "25px", color: "#a8a8a8" }}
                        >
                          Drag a photo here
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography
                          gutterBottom
                          style={{ fontSize: "18px", color: "#a8a8a8" }}
                        >
                          - or -
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Button
                          className={classes.selectBtn}
                          onClick={() => this.clickUploadFile()}
                        >
                          Select a photo from your computer
                        </Button>

                        <input
                          style={{ display: "none" }}
                          id="file"
                          ref={ref => {
                            this.uploadInput = ref;
                          }}
                          type="file"
                          accept={acceptedFileTypes}
                          multiple={false}
                          onChange={this.handleFileSelect}
                        />
                      </Grid>
                    </Grid>
                  );
                }}
              </Dropzone>
            ) : (
              <React.Fragment>
                <Grid container>
                  <Grid item>
                    <Typography
                      gutterBottom
                      style={{
                        fontSize: "12px",
                        overflow: "hidden",
                        width: "920px"
                      }}
                    >
                      Upload &#8250; <b>{this.state.file[0].name}</b>
                    </Typography>
                    <Typography gutterBottom style={{ fontSize: "12px" }}>
                      To crop this image, drag the region below and then click
                      "Select class header"
                    </Typography>
                  </Grid>
                </Grid>
                <Grid container className={classes.cropContainer}>
                  <Grid item>
                    {this.state.imgSrc !== null ? (
                      <React.Fragment>
                        <ReactCrop
                          imageStyle={{ height: "340px" }}
                          src={this.state.imgSrc}
                          crop={this.state.crop}
                          onImageLoaded={this.handleImageLoaded}
                          onComplete={this.handleOnCropComplete}
                          onChange={this.handleOnCropChange}
                        />
                        <canvas
                          ref={this.imagePreviewCanvasRef}
                          style={{ display: "none" }}
                        ></canvas>
                      </React.Fragment>
                    ) : null}
                  </Grid>
                </Grid>
              </React.Fragment>
            )}
          </DialogContent>
        </TabPanel>

        <TabPanel value={this.state.tabValue} index={1}>
          <DialogContent
            dividers
            style={{ height: "482px", padding: "0" }}
            className={classes.uploadContent}
          >
            <Grid container style={{ backgroundColor: "#efefef" }}>
              <Grid item>
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    placeholder="Search…"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput
                    }}
                    onChange={e => this.setState({ search: e.target.value })}
                    value={this.state.search}
                    fullWidth
                    inputProps={{ "aria-label": "search" }}
                  />
                </div>
              </Grid>
            </Grid>

            <Grid
              container
              className={classes.container}
              style={{ paddingTop: "140px" }}
            >
              <Grid item className={classes.uploadDiv}>
                <div className={classes.searchImageIcon} />
              </Grid>
              <Grid item>
                <Typography
                  gutterBottom
                  style={{ fontSize: "25px", color: "#a8a8a8" }}
                >
                  Search an image
                </Typography>
              </Grid>
            </Grid>
          </DialogContent>
        </TabPanel>

        <DialogActions>
          <Button
            classes={{ textPrimary: classes.uploadBtn }}
            onClick={e => this.handleSelectClassHeader(e)}
            color="primary"
            disabled={
              this.state.imgSrc === null ||
              (this.state.crop.height === 16.10294117647059 &&
                this.state.crop.width === 48.34437086092716 &&
                this.state.crop.x === 25 &&
                this.state.crop.y === 43)
                ? true
                : false
            }
          >
            Select class header
          </Button>
          <Button onClick={this.props.handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(UploadPhoto);
