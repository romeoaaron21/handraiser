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
import { Redirect } from "react-router-dom";


import AuthService from "../../auth/AuthService";


const socketUrl = "http://boom-handraiser.com:3001/";
const socket = io("http://boom-handraiser.com:3001/");

class ChatPage extends PureComponent {
  constructor(props) {
    super(props);
    this.Auth = new AuthService();
    this.fetch = this.Auth.getFetchedTokenAPI();
    this.state = {
      open: false,
      conversation: [],
      sub: "",

      chatmateSub: "",

      userInfo: [],
      chatmateInfo: [],

      senderText: "",
      chatmateText: "",

      chatListInfo: [],

      newChatmateSub: "",

    };
  }

  handleDrawerOpen = () => this.setState({ open: true });
  handleDrawerClose = () => this.setState({ open: false });

  UNSAFE_componentWillMount() {
    const socket = io(socketUrl);

    socket.on("getNormalChat", (conversation) => {
      this.setState({ conversation: conversation[0] });

      if (conversation[1] === this.state.sub) {
        this.displayChatList();
        this.setState({ senderText: "" })
      }
      else if (conversation[1] === this.state.chatmateSub) {
        this.displayChatList();
        this.setState({ chatmateText: "" })
      }
      if (conversation[2] === this.state.sub) {
        this.displayChatList();
      }

    });

    socket.on("setStudentChatText", (chatText) => {
      if (chatText[2] === this.state.sub && chatText[1] === this.state.chatmateSub) {
        this.setState({ senderText: chatText[0] });
      }
      else if (chatText[1] === this.state.sub && chatText[2] === this.state.chatmateSub) {
        this.setState({ chatmateText: chatText[0] });
      }
    })

    socket.on("seenNormalChat", chat => {
      this.setState({
        conversation: [...chat]
      });
    });
  }


  componentDidMount() {
    this.fetch.then(fetch => {
      this.setState({ sub: fetch.data.user[0].sub })
    })
      .then(() => {
        if (this.props.match.params.chatmateSub === 'allMessages') {
          this.displayChatList('allMessages');
        }
        else{
          this.setState({ chatmateSub: this.props.match.params.chatmateSub, newChatmateSub: this.props.match.params.chatmateSub })
          this.selectChatmate();
          //fix component didmount after allmessages
        }
      })
  }

  displayChatList = (view) => {
    let sub = [];
    let UniqueSub = [];
    const data = api.fetch(`/api/getChatList/${this.state.sub}`, "get")
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
      .then(() => {
        if(view === 'allMessages' && UniqueSub.length > 0){
          this.componentDidUpdate(UniqueSub[0]);
        }
      })
  }

  componentDidUpdate(sub) {
    if(this.props.match.params.chatmateSub == 'allMessages'){
      if(sub.length > 0){
        this.setState({ chatmateSub: sub, newChatmateSub: sub })
      this.selectChatmate(sub); 
      }
    }
    else{
      this.setState({ chatmateSub: this.props.match.params.chatmateSub, newChatmateSub: this.props.match.params.chatmateSub })
      this.selectChatmate(this.props.match.params.chatmateSub); 
    }
    
  }

  changeChatmate = (chatmate) => {
    this.setState({ newChatmateSub: chatmate })
  }

  selectChatmate = (chatmateSub) => {
    if (this.state.chatmateSub !== this.props.match.params.chatmateSub) {
      const data = api.fetch(`/api/getChatUsersInfo/${this.state.sub}/${chatmateSub}`, "get")
      data.then(res => {
        this.setState({ chatmateSub: chatmateSub })
        res.data.map(chatUser => {
          if (chatUser.sub === this.state.sub) {
            this.setState({ userInfo: chatUser })
          } else { this.setState({ chatmateInfo: chatUser }) }
        })
      })
        .then(() => this.getConversation())
        .then(() => this.displayChatList())
    }
  }

  getConversation = () => {
    const data = api.fetch(`/api/getChat`, "get");
    data.then(res => {
      this.setState({ conversation: [...res.data] })
    });
  }

  setChatText = (val) => {
    let textVal = [val, this.state.chatmateSub, this.state.sub];
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
      sender_sub: this.state.sub,
      chatmate_sub: this.state.chatmateSub,
      time: datetime
    };
    const data = api.fetch(`/api/sendStudentChat`, "post", convo);
    data.then(res => {
      this.displayBadge();
      const chat = [res.data, this.state.sub, this.state.chatmateSub]
      socket.emit('getNormalChat', chat)
    });
  };


  displayBadge = (chatmate) => {
    let sub = { chatmate: this.state.sub, sender: chatmate };
    const data = api.fetch(
      `/api/seenNormalChat`,
      "patch",
      sub
    );
    data.then(res => {
      socket.emit("seenNormalChat", res.data);
    });
  }



  render() {
    console.log(this.state.chatmateSub)
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

            <ChatPageList chatListInfo={this.state.chatListInfo} conversation={this.state.conversation} sub={this.state.sub} userInfo={this.state.userInfo} changeChatmate={this.changeChatmate} displayBadge={this.displayBadge} selectChatmate={this.selectChatmate}/>

            <ChatPageBox userInfo={this.state.userInfo} chatmateInfo={this.state.chatmateInfo} senderText={this.state.senderText} setChatText={this.setChatText} sendChat={this.sendChat} conversation={this.state.conversation} chatmateText={this.state.chatmateText} displayBadge={this.displayBadge} />

            <ChatPageInfo chatmateInfo={this.state.chatmateInfo} />
          </Grid>
        </Container>


        {
          this.state.newChatmateSub !== this.state.chatmateSub ?
            <Redirect
              to={{
                pathname: `/chat/${this.state.newChatmateSub}`
              }}
            />
            :
            null
        }


      </div>
    );
  }
}

export default withStyles(styles)(ChatPage);
