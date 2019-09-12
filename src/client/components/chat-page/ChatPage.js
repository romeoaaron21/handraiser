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

import SendIcon from "@material-ui/icons/Send";
import AttachFileIcon from "@material-ui/icons/AttachFile";

import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";


//COMPONENTS
import ChatPageList from "./ChatPageList";

import Samplepic from "../../images/bg.jpg"

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
          <Grid container spacing={2} style={{ height: "800px", maxHeight: "700px" }}>
            <Grid item md={3} xs={4}>
              <ChatPageList />
            </Grid>

            <Grid item md={6} xs={8} style={{ height: "800px", maxHeight: "800px" }}>
              {/* CHATBOX HEADER*/}
              <Paper >
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
                    minHeight: "628px",
                    height: "auto",
                    maxHeight: "620px",
                    padding: 17,
                    overflowY: "auto",
                    overflowX:"none"
                  }}
                  className={classes.scrollBar}
                >
                  {/* SENDER */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      marginBottom: 13
                    }}
                  >
                    <Avatar style={{ marginRight: "10px" }}>TL</Avatar>
                    <Box
                      style={{
                        maxWidth: "40%",
                        padding: 12,
                        background: "#f5f5f5",
                        color: "#263238",
                        borderRadius: 5
                      }}
                    >
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Morbi ante urna, suscipit eu tincidunt non, dictum quis
                      arcu.
                      <Typography
                        variant="caption"
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          marginTop: "10px"
                          // fontSize: ".8em"
                        }}
                      >
                        Sept. 12, 2019 10:30 AM
                      </Typography>
                    </Box>
                  </div>
                  {/* END SENDER */}

                  {/* RECEIVER */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-end",
                      marginBottom: 13
                    }}
                  >
                    <Box
                      style={{
                        maxWidth: "40%",
                        padding: 12,
                        background: "#983cac",
                        color: "#fff",
                        borderRadius: 5
                      }}
                    >
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Morbi ante urna, suscipit eu tincidunt non, dictum quis
                      arcu.
                      <Typography
                        variant="caption"
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          marginTop: "10px"
                        }}
                      >
                        Sept. 12, 2019 10:30 AM
                      </Typography>
                    </Box>
                  </div>
                  {/* RECEIVER */}
                
                </div>
                {/* END CHAT BOX */}
                <Divider />
                <div
                  style={{
                    padding: 5,
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    height: "auto"
                  }}
                >
                  <IconButton>
                    <AttachFileIcon />
                  </IconButton>

                  <TextField
                    variant="outlined"
                    multiline
                    rowsMax='3'
                    fullWidth
                    placeholder="Send Message"
                    color="primary"
                    // autoFocus
                  />
                  <IconButton>
                    <SendIcon />
                  </IconButton>
                </div>
              </Paper>
            </Grid>

            <Grid item md={3} xs={12} style={{ height: "800px", maxHeight: "800px" }}>
              <Paper >
                <div
                  style={{
                    padding: 15,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                  }}
                >
                  <Avatar style={{ width: 100, height: 100, marginBottom: 10 }}>
                    TL
                  </Avatar>
                  <Typography variant="h6">Trizha Kate Longaza</Typography>
                  <Typography variant="subtitle2">
                    trizha.longaza@boom.camp
                  </Typography>
                </div>
                <Divider />
                <span style={{padding: 5, display: 'flex', justifyContent: 'center'}}>
                <Typography variant="overline">SHARED PHOTOS</Typography>
                </span>
                <Divider />
                <div style={{height: 556, overflowY:"auto", padding:5}} className={classes.scrollBar}>
                <div style={
                  {
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-around',
                    overflow: 'hidden',
                  }
                }>
                  <GridList
                    cellHeight={160}
                    style={{
                        width: 500,
                      }}
                    cols={3}
                  >
                    <GridListTile cols={1}>
                      <img src={Samplepic}/>
                    </GridListTile>
                    <GridListTile cols={1}>
                      <img src={Samplepic}/>
                    </GridListTile>
                    <GridListTile cols={1}>
                      <img src={Samplepic}/>
                    </GridListTile>
                    <GridListTile cols={1}>
                      <img src={Samplepic}/>
                    </GridListTile>
                    <GridListTile cols={1}>
                      <img src={Samplepic}/>
                    </GridListTile>
                    <GridListTile cols={1}>
                      <img src={Samplepic}/>
                    </GridListTile>
                    <GridListTile cols={1}>
                      <img src={Samplepic}/>
                    </GridListTile>
                    <GridListTile cols={1}>
                      <img src={Samplepic}/>
                    </GridListTile>
                    <GridListTile cols={1}>
                      <img src={Samplepic}/>
                    </GridListTile>
                    <GridListTile cols={1}>
                      <img src={Samplepic}/>
                    </GridListTile>
                    <GridListTile cols={1}>
                      <img src={Samplepic}/>
                    </GridListTile>
                    <GridListTile cols={1}>
                      <img src={Samplepic}/>
                    </GridListTile>
                    <GridListTile cols={1}>
                      <img src={Samplepic}/>
                    </GridListTile>
                  </GridList>
                </div>
              </div>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </div>

    );
  }
}

export default withStyles(styles)(ChatPage);
