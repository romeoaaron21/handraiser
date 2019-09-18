import React, { PureComponent } from "react";
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
import { Socket } from "net";
import io from "socket.io-client";

const socketUrl = "http://boom-handraiser.com:3001/";
const socket = io("http://boom-handraiser.com:3001/");

class ChatPage extends PureComponent {
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

      chatListInfo: []

    };
  }

  handleDrawerOpen = () => this.setState({ open: true });
  handleDrawerClose = () => this.setState({ open: false });

  UNSAFE_componentWillMount() {
    const socket = io(socketUrl);

    socket.on("getNormalChat", (conversation) => {
      this.setState({ conversation: conversation[0] });

      if (conversation[1] === this.props.match.params.userSub) {
        this.setState({ senderText: "" })
      }
      else if (conversation[1] === this.state.chatmateSub) {
        this.setState({ chatmateText: "" })
      }

    });

    socket.on("setStudentChatText", (chatText) => {
      if (chatText[2] === this.props.match.params.userSub && chatText[1] === this.state.chatmateSub) {
        this.setState({ senderText: chatText[0] });
      }
      else if (chatText[1] === this.props.match.params.userSub && chatText[2] === this.state.chatmateSub) {
        this.setState({ chatmateText: chatText[0] });
      }
    })
  }


  componentDidMount() {
    this.setState({ chatmateSub: this.props.match.params.chatmateSub })
    this.selectChatmate();
  }

  displayChatList = () => {
    let sub = [];
    let UniqueSub = [];
    const data = api.fetch(`/api/getChatList/${this.props.match.params.userSub}`, "get")
    data.then(res => {
      res.data.map(chatListSub => {
        sub.push(chatListSub.chatsub)
      })
    })
    .then(() => {
      UniqueSub = [...new Set(sub)];
    })
    .then(() => {
        api.fetch(`/api/getChatListInformation/${UniqueSub}`, "get")
          .then(res => {
            this.setState({ chatListInfo: [...res.data] })
          })
      })
  }

  componentDidUpdate() {
    this.selectChatmate();
  }


  selectChatmate = () => {
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
        .then(() => this.getConversation())
        .then(() => this.displayChatList());
    }
  }

  getConversation = () => {
    const data = api.fetch(`/api/getChat`, "get");
    data.then(res => {
      this.setState({ conversation: [...res.data] })
    });
  }

  setChatText = (val) => {
    let textVal = [val, this.state.chatmateSub, this.props.match.params.userSub];
    
    socket.emit('setStudentChatText', textVal)

  };

  sendChat = () => {
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
    let convo = {
      message: this.state.senderText,
      sender_sub: this.props.match.params.userSub,
      chatmate_sub: this.state.chatmateSub,
      time: datetime
    };
    const data = api.fetch(`/api/sendStudentChat`, "post", convo);
    data.then(res => {
      const chat = [res.data, this.props.match.params.userSub]
      socket.emit('getNormalChat', chat)
      this.displayChatList();
    });
  };



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

            <ChatPageList chatListInfo={this.state.chatListInfo} conversation={this.state.conversation} sub={this.props.match.params.userSub} />
            <ChatPageBox userInfo={this.state.userInfo} chatmateInfo={this.state.chatmateInfo} senderText={this.state.senderText} setChatText={this.setChatText} sendChat={this.sendChat} conversation={this.state.conversation} chatmateText={this.state.chatmateText} />
            <ChatPageInfo />
          </Grid>
        </Container>
      </div>
    );
  }
}

export default withStyles(styles)(ChatPage);
