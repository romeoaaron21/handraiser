import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import styles from "./ChatPageStyle";

//NAVIGATION
import NavBar from "../common-components/nav-bar/navBar";
import SideNav from "../common-components/side-nav/sideNav";

//MAIN
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

//COMPONENTS
import ChatPageList from "./ChatPageList";
import ChatPageBox from "./ChatPageBox";
import ChatPageInfo from "./ChatPageInfo";


import api from "../../services/fetchApi";

class ChatPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      conversation: [],

      chatmateSub: "",

      userInfo: [],
      chatmateInfo: [],

      senderText: "",
      chatmateText: "",
    };
  }

  handleDrawerOpen = () => this.setState({ open: true });
  handleDrawerClose = () => this.setState({ open: false });

  componentDidMount() {
    this.setState({ chatmateSub: this.props.match.params.chatmateSub })
    this.selectChatmate()
  }

  componentDidUpdate() {
    this.selectChatmate()
  }

  selectChatmate() {
    if (this.state.chatmateSub !== this.props.match.params.chatmateSub) {
      const data = api.fetch(`/api/getChatUsersInfo/${this.props.match.params.userSub}/${this.props.match.params.chatmateSub}`, "get")
      data.then(res => {
        this.setState({ chatmateSub: this.props.match.params.chatmateSub })
        res.data.map(chatUser => {
          if (chatUser.sub === this.props.match.params.userSub) {
            this.setState({ userInfo: chatUser })
          } else { this.setState({ chatmateInfo: chatUser }) }
        })
      })
    }
  }



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
          <Grid
            container
            spacing={2}
            style={{ height: "800px", maxHeight: "700px" }}
          >
            <ChatPageList />
            <ChatPageBox chatmateInfo={this.state.chatmateInfo}/>
            <ChatPageInfo />
          </Grid>
        </Container>
      </div>
    );
  }
}

export default withStyles(styles)(ChatPage);
