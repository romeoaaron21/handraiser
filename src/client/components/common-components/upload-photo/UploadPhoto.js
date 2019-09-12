import React from "react";
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

import UploadIcon from "../../../images/upload.png";

import {
  base64StringtoFile,
  extractImageFileExtensionFromBase64,
  image64toCanvasRef
} from "./ReusableUtils";

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
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
    paddingTop: "5%",
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

class UploadPhoto extends React.Component {
  constructor() {
    super();
    this.imagePreviewCanvasRef = React.createRef();
    this.fileInputRef = React.createRef();
    this.state = {
      file: [],
      imgWidth: null,
      imgSrc: null,
      imgSrcExt: null,
      errorMsg: false,
      crop: {
        unit: "%",
        height: 37,
        width: 100,
        x: 5.329070518200751e-15,
        y: 30,
        aspect: 16 / 3
      }
    };
  }

  dismiss = () => {
    document.getElementById("file").value = null;
    this.setState({
      file: [],
      imgWidth: null,
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
    const { imgSrc } = this.state;
    if (imgSrc) {
      const canvasRef = this.imagePreviewCanvasRef.current;

      const { imgSrcExt } = this.state;
      const imageData64 = canvasRef.toDataURL("image/" + imgSrcExt);

      const myFilename = "previewFile." + imgSrcExt;

      // file to be uploaded
      const myNewCroppedFile = base64StringtoFile(imageData64, myFilename);

      //UPLOAD TO DIRECTORY
      const data = new FormData();
      data.append("file", myNewCroppedFile);
      data.append("filename", `${this.props.cohortId}.png`);

      fetch(`/upload/${this.props.cohortId}`, {
        method: "POST",
        body: data
      }).then(response => {
        response.json().then(body => {
          this.setState({ imageURL: `${body.file}` });
          this.props.handleClose();
          this.props.loadStateFn();
        });
      });
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <DialogTitle
          id="customized-dialog-title"
          onClose={this.props.handleClose}
        >
          Upload Photo
        </DialogTitle>
        <DialogContent dividers style={{ height: "450px" }}>
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
            <Grid container className={classes.container}>
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
                  {this.state.imgWidth === null ? (
                    <React.Fragment>
                      <ReactCrop
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
        <DialogActions>
          <Button
            classes={{ textPrimary: classes.uploadBtn }}
            onClick={e => this.handleSelectClassHeader(e)}
            color="primary"
            disabled={this.state.imgSrc === null ? true : false}
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
