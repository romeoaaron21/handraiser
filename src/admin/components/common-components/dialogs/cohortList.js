import React from "react";

import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";

import api from "../../../services/fetchApi";

class StudentList extends React.Component {
  constructor() {
    super();

    this.state = {
      open: true,
      cohorts: []
    };
  }

  componentDidMount() {
    api.fetch(`/${this.props.mentorId}/cohorts`, "get").then(res => {
      this.setState({ cohorts: res.data.cohorts });
    });
  }

  render() {
    return (
      <React.Fragment>
        <DialogTitle id="scroll-dialog-title">Classes</DialogTitle>
        <DialogContent dividers={true}>
          {this.state.cohorts.map((cohort, i) => (
            <List
              dense={true}
              key={i}
              style={{
                borderBottom: "1px solid gainsboro",
                textAlign: "center"
              }}
            >
              <ListItemText primary={cohort.name} />
            </List>
          ))}
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={this.props.close}>
            Close
          </Button>
        </DialogActions>
      </React.Fragment>
    );
  }
}

export default StudentList;
