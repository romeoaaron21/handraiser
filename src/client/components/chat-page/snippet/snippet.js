import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent
} from "@material-ui/core";
import Transition from "../gallery/transition";
import AceEditor from "react-ace";
import "brace/mode/javascript";
import "brace/theme/monokai";

export default class Snippet extends React.Component {
  constructor() {
    super();
    this.state = {
      code: ""
    };
  }
  onChange = newCode => {
    this.setState({ code: newCode });
  };
  render() {
    const { open, sendChat, handleClose } = this.props;
    return (
      <Dialog
        fullWidth
        maxWidth="md"
        open={open}
        TransitionComponent={Transition}
        onClose={() => {
          this.setState({ code: "" });
          handleClose();
        }}
      >
        <DialogContent style={{ background: "#272822" }}>
          <AceEditor
            focus
            fontSize="16px"
            width="45vw"
            value={this.state.code}
            height="60vh"
            mode="javascript"
            theme="monokai"
            onChange={this.onChange}
          />
        </DialogContent>
        <DialogActions style={{ background: "#272822" }}>
          <Button
            style={{ color: "white" }}
            onClick={() => {
              sendChat(this.state.code);
              handleClose();
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}