import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./ChatPageStyle";

//NAVIGATION
import NavBar from "../common-components/nav-bar/navBar";
import SideNav from "../common-components/side-nav/sideNav";

//MAIN
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

//CHATLIST
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import CreateIcon from "@material-ui/icons/Create";
import IconButton from "@material-ui/core/IconButton";

//COMPONENTS
import ChatPageList from "./ChatPageList";

class ChatPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }

  handleDrawerOpen = () => this.setState({ open: true });
  handleDrawerClose = () => this.setState({ open: false });

  render() {
    const { classes } = this.props;
    return (
      <div>
        <NavBar
          open={this.state.open}
          title="Handraiser"
          handleDrawerOpenFn={this.handleDrawerOpen}
        />
        <SideNav
          open={this.state.open}
          handleDrawerCloseFn={this.handleDrawerClose}
        />

        <Container maxWidth="xl" className={classes.container}>
          <Grid container spacing={2}>
            <Grid item md={3} xs={4}>
              <ChatPageList />
            </Grid>

            <Grid item md={6} xs={8}>
              {/* CHATBOX HEADER*/}
              <Paper style={{ height: "800px", maxHeight: "1000px" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    padding: 15
                  }}
                >
                  <Avatar style={{ marginRight: 10 }}>TL</Avatar>
                  <div>
                    <Typography variant="body"> Trizha Kate Longaza</Typography>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center"
                      }}
                    >
                      <div
                        style={{
                          height: 10,
                          width: 10,
                          borderRadius: "50%",
                          backgroundColor: "#43a047",
                          marginRight: "3px"
                        }}
                      />
                      <Typography variant="subtitle2" style={{ marginTop: 2 }}>
                        Active Now
                      </Typography>
                    </div>
                  </div>
                </div>
                <Divider />
                {/* END CHATBOX HEADER*/}

                {/* MAIN CHATBOX */}
                <div
                  style={{
                    minHeight: "630px",
                    maxHeight: "800px",
                    padding: 15
                  }}
                >
                  {/* SENDER */}
                  <div
                    style={{ display: "flex", justifyContent: "flex-start", marginBottom: 13 }}
                  >
                    <Avatar style={{ marginRight: "10px" }}>TL</Avatar>
                    <Box
                      style={{
                        maxWidth: "40%",
                        padding: 12,
                        background: "#f5f5f5",
                        color: "#263238",
                        borderRadius: 8
                      }}
                    >
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Morbi ante urna, suscipit eu tincidunt non, dictum quis
                      arcu. Maecenas sit amet massa vitae mi dictum vulputate
                      eget non justo. Nunc convallis rutrum fringilla. Cras in
                      elit nec elit commodo mattis. Morbi sed metus eget elit
                      tincidunt blandit. Phasellus ultricies gravida interdum.
                      Maecenas tristique iaculis sapien, dictum luctus turpis
                      euismod at. Aenean ornare ultrices mauris quis
                      egestas.something
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          marginTop: "10px",
                          fontSize: '.8em',
                        }}
                      >
                        Sept. 12, 2019 10:30 AM
                      </div>
                    </Box>
                  </div>
                  {/* END SENDER */}

                  {/* SENDER */}
                  <div
                    style={{ display: "flex", justifyContent: "flex-start", marginBottom: 17 }}
                  >
                    <Avatar style={{ marginRight: "10px" }}>TL</Avatar>
                    <Box
                      style={{
                        maxWidth: "40%",
                        padding: 12,
                        background: "#f5f5f5",
                        color: "#263238",
                        borderRadius: 8
                      }}
                    >
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Morbi ante urna, suscipit eu tincidunt non, dictum quis
                      arcu. 
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          marginTop: "10px",
                          fontSize: '.8em',
                        }}
                      >
                        Sept. 12, 2019 10:30 AM
                      </div>
                    </Box>
                  </div>
                  {/* END SENDER */}




                </div>
                <Divider />
                {/* END CHAT BOX */}
              </Paper>
            </Grid>

            <Grid item md={3} xs={12}>
              <Paper style={{ height: "800px", maxHeight: "1000px" }}>
                {/* SOMETHING */}
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
}

export default withStyles(styles)(ChatPage);
