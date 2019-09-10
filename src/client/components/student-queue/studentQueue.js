import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import Box from "@material-ui/core/Box";

import BeingHelped from "../being-helped/BeingHelped";
import BeingHelpedModal from "../being-helped/beingHelpedModal";
import RemoveRequest from "../being-helped/removeRequestModal";
import StudentHeader from "./studentHeader";
import RequestQueue from "./requestQueue";
import StudentNavHeader from "./navHeader";
import StudentsList from "./studentsList";
import MentorProfile from "./mentorProfile";

import io from "socket.io-client";
import api from "../../services/fetchApi";

//LOADER
import Loader from "../common-components/loader/loader";

//AUTH
import AuthService from "../../auth/AuthService";

//added chatBox
// import ChatBox from "./chatBox";
import ClassroomBg from "../../images/classroomBg.jpg";
import ChatList from "../chat-box/chatList";
import ChatBox from "../chat-box/chatBox";

//end of added chatBox
const styles = theme => ({
  root: {
    height: "100%",
    maxWidth: "1200px",
    margin: "0 auto"
  },
  header: {
    padding: theme.spacing(3, 2),
    marginTop: "25px",
    maxWidth: "1200px",
    margin: "0 auto",
    boxShadow:
      "0 1px 2px 0 rgba(60,64,67,0.302), 0 2px 6px 2px rgba(60,64,67,0.149)",
    backgroundImage: `radial-gradient(25rem 18.75rem ellipse at bottom right, #883dca, transparent), url(${ClassroomBg})`
  },
  main: {
    marginTop: 4,
    "@media (max-width: 425px)": {
      display: "flex",
      flexFlow: "column"
    }
  },
  beingHelpMobile: {
    display: "none",
    "@media (max-width: 425px)": {
      order: "1",
      display: "block"
    }
  },
  beingHelp: {
    "@media (max-width: 425px)": {
      display: "none"
    }
  },
  chatList: {
    "@media (max-width: 425px)": {
      order: "3"
    }
  },
  requestQue: {
    "@media (max-width: 425px)": {
      order: "2"
    }
  },
  navHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  headerSpacer: {
    marginTop: 100,
    "@media (max-width: 425px)": {
      marginTop: 10
    }
  }
});

const socketUrl = "http://boom-handraiser.com:3001/";
const socket = io("http://boom-handraiser.com:3001/");

class Student extends Component {
  constructor(props) {
    super(props);

    this.Auth = new AuthService();
    this.fetch = this.Auth.getFetchedTokenAPI();

    this.state = {
      loader: true,
      previledge: "",
      helpStudentModal: false,
      removeStudentReqModal: false,
      user: [],
      members: [],
      button: true,
      btntext: "Raise Hand",
      socket: null,
      member: "",
      helpingStudent: "",
      sub: "",
      requested: false,
      studentsReason: "",
      value: 0,
      open: false,

      /*start of dded for chatBox state*/
      //chatBox: false, deleted
      //mentor_sub: "", deleted
      // chat: "",

      // senderInfo: [],
      // chatmateInfo: [],
      // chatM: "",
      // mentorInfo: [],
      /*end of added for chatBox state*/

      badge: false,








      //added dh

      conversation: [],

      chatmateSub: "",

      mentorChatBox: false,
      studentChatBox: false,

      studentChatText: "",
      mentorChatText: [],

      senderInfo: [],
      chatmateInfo: [],


      //end added dh
    };
  }

  //added dh

  viewChatBox = () => {
    if (this.state.previledge === "student") {
      this.setState({ studentChatBox: false });
    } else {
      this.setState({ mentorChatBox: false });
    }
  };


  selectChatmate = (chatmate_sub) => {
    const data = api.fetch(
      `/api/displayChatUserInfo/${this.state.sub}/${chatmate_sub}`,
      "get"
    );
    data.then(res => {
      res.data.map(user => {
        if (user.sub === this.state.sub) {
          this.setState({ senderInfo: user });
        } else {
          this.setState({ chatmateInfo: user });
        }
        return null;
      });
    });
    if (this.state.previledge === 'mentor') {
      this.setState({ mentorChatBox: true, chatmateSub: chatmate_sub })
    } else {
      this.setState({ studentChatBox: true, chatmateSub: chatmate_sub })
    }
  };


  setChatText = (val, sub) => {
    let textVal = [val, sub];
    if (this.state.previledge === 'student') {
      socket.emit("handleChat", textVal);
    }
    else {
      socket.emit("handleChatM", textVal);
    }
  }

  sendChat = () => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let current_datetime = new Date();
    let formatted_date = months[current_datetime.getMonth()] + " " + current_datetime.getDate() + ", " + current_datetime.getFullYear();
    var time = current_datetime.toLocaleString("en-US", { hour: "numeric", minute: "numeric", hour12: true });
    var datetime = formatted_date + " " + time;
    let convo = {
      message: this.state.previledge === 'student' ? this.state.studentChatText : this.state.mentorChatText,
      sender_sub: this.state.sub,
      chatmate_sub: this.state.chatmateSub,
      cohort_id: this.props.cohort_id,
      time: datetime
    };
    const data = api.fetch(`/api/sendChat`, "post", convo);
    data.then(res => {
      if (this.state.previledge === 'student') { socket.emit("sendChat", res.data) }
      else { socket.emit("sendChatM", res.data) }
    });
  }

  //end added dh


  displayBadge = priv => {
    if (priv === "mentor") {
      socket.emit("displayBadge");
    } else if (priv === "student") {
      let sub = { student: this.state.sub, mentor: this.state.chatmateSub };
      const data = api.fetch(`/api/seenChat`, "patch", sub);
      data.then(res => {
        socket.emit("seenChat", res.data);
        this.setState({ badge: true })
      });
    }
  };



  //start of methods for chat websockets

  //end of methods for chat websockets

  handleChange = () => {
    this.setState({
      newValue: 1
    });
  };

  handleClick = event => {
    event.preventDefault();
    alert("You clicked a breadcrumb.");
  };

  helpStudent = memberid => {
    const data = api.fetch(
      `/api/helpStudent/${memberid}/${this.props.cohort_id}`,
      "patch"
    );
    data.then(res => {
      this.fetchStudents();
      socket.emit("helpStudent", res.data[0]);
    });
  };

  helpStudentClose = () => {
    socket.emit("close", "1");
    this.setState({ mentorChatBox: false, })
  };

  removeStudentRequest = id => {
    this.setState({ removeStudentReqModal: true, member: id });
  };

  removeStudentReqClose = () => [
    this.setState({ removeStudentReqModal: false })
  ];


  UNSAFE_componentWillMount() {
    this.initSocket();
  }


  initSocket = () => {
    const socket = io(socketUrl);
    socket.on("connect", () => { });
    this.setState({ socket });

    //START OF BADGE
     
    socket.on("displayBadge", () => {
      this.setState({ badge: false });
    });

    socket.on("handleChat", priv => {
      this.setState({ studentChatText: priv });
    });

    socket.on("handleChatM", priv => {
      let mentorText = [{ text: priv[0], userSub: priv[1] }]

      if(this.state.mentorChatText.length === 0){
        this.setState({ mentorChatText: mentorText })
      } else{
        let index = this.state.mentorChatText.findIndex(obj => obj.userSub === this.state.sub)
        if(index >= 0){
          console.log('sam')
          // let mentorChatText = [...this.state.mentorChatText];
          // let chat = {...mentorChatText[index]};
          // chat.text = priv[0];
          // chat[index] = chat;
          // this.setState({mentorChatText});
        }else if(index < 0){
          this.setState(prevState => ({
           mentorChatText: [...prevState.mentorChatText, priv]
          }))
        }
        console.log(this.state.mentorChatText)
      }

      // if (this.state.mentorChatText.length === 0) {
      //   this.setState({ mentorChatText: mentorText })
      // } else if(this.state.mentorChatText.findIndex(obj => obj.userSub === this.state.sub) === -1){
      //   console.log(mentorText)
      //   // this.setState(prevState => ({
      //   //   mentorChatText: [...prevState.mentorChatText, priv]
      //   // }))
      // } 
      // else{
      //   let index = this.state.mentorChatText.findIndex(obj => obj.userSub === priv[1]);
      //   console.log(index)
      //   // let mentorChatText = [...this.state.mentorChatText];
      //   // let chat = {...mentorChatText[index]};
      //   // chat.text = priv[0];
      //   // chat[index] = chat;
      //   // this.setState({mentorChatText});
      // }
    // //    this.setState(prevState => ({
    // //     mentorChatText: {
    // //         ...prevState.mentorChatText,
    // //         [prevState.mentorChatText[index].text]: priv,
    // //     },
    // // }));
       
    //     let mentorChatText = [...this.state.mentorChatText];
    //     let chat = {...mentorChatText[index]};
    //     chat.text = priv[0];
    //     chat[index] = chat;
    //     this.setState({mentorChatText});
      
    });
    // END OF BADGE

    //start of socket chat
    socket.on("seenChat", chat => {
      this.setState({
        conversation: [...chat]
      });
    });
    socket.on("sendChat", chat => {
      this.setState({
        conversation: [...chat],
        studentChatText: ""
      });
    });
    socket.on("sendChatM", chat => {
      this.setState({
        conversation: [...chat],
        mentorChatText: ""
      });
    });
    //end of socket chat

    socket.on("requestHelping", students => {
      this.setState({ members: students });
      if (students.length === 0) {
        this.setState({
          button: true,
          btntext: "Waiting for help",
          requested: true
        });
      }
      students.map(student => {
        if (student.sub === this.state.sub) {
          return this.setState({
            button: true,
            btntext: "Waiting for help",
            requested: true
          });
        } else {
          return null;
        }
      });
    });

    socket.on("deleteRequest", students => {
      this.setState({ members: students });
      if (students.length === 0) {
        this.setState({
          btntext: "Raise Hand",
          requested: false
        });
      }
      students.map(student => {
        if (student.sub !== this.state.sub) {
          return this.setState({
            btntext: "Raise Hand",
            requested: false
          });
        } else {
          return null;
        }
      });
    });

    socket.on("helpStudent", students => {
      this.setState({
        helpStudentModal: true,
        helpingStudent: students
      });
    });

    socket.on("close", cohort_id => {
      this.setState({
        helpingStudent: "",
        // helpStudentModal: false,
        button: true,
        requested: false,
        btntext: "Raise Hand",
        cohort_id: cohort_id,
      });
      if (this.state.helpingStudent === "") {
        this.setState({
          helpStudentModal: false
        });
      }
      this.fetchStudents();
    });

    socket.on("displayStudents", students => {
      this.setState({
        members: students
      });
      if (this.state.members) {
        this.state.members.map(member => {
          if (parseInt(member.cohort_id) === parseInt(this.props.cohort_id)) {
            if (
              member.sub === this.state.sub &&
              member.status === "inprogress"
            ) {
              return this.setState({
                helpingStudent: member,
                button: true,
                btntext: "Currently Helping"
              });
            } else if (member.sub === this.state.sub) {
              return this.setState({
                button: true,
                btntext: "Waiting for help",
              });
            } else if (member.status === "inprogress") {
              return this.setState({
                helpingStudent: member
              });
            } else {
              return null;
            }
          } else {
            return null;
          }
        });
      }
    });
  };

  fetchStudents = () => {
    const data = api.fetch(`/api/displayStudents/`, "get");
    data
      .then(res => {
        socket.emit("displayStudents", res.data);
      })
      .then(() => {
        const data1 = api.fetch(
          `/api/displayMentor/${this.props.cohort_id}`,
          "get"
        );
        data1.then(res => {
          this.setState({ mentorInfo: res.data });

          res.data.map(mentor => {
            this.setState({ chatmateSub: mentor.sub });
            return null;
          });
        });
      })
      .then(() => {
        const data2 = api.fetch(`/api/getChat`, "get");
        data2.then(res => {
          socket.emit("sendChat", res.data);
        });
      });
  };

  componentDidMount() {
    this.fetch.then(fetch => {
      const user = fetch.data.user[0];
      this.setState({ sub: user.sub });
      const data = api.fetch(
        `/api/displayUserInfo/${user.sub}/${this.props.cohort_id}`,
        "get"
      );
      data.then(res => {
        this.setState({
          user: res.data[0],
          previledge: res.data[0][0].privilege
        });
        data.then(() => {
          this.fetchStudents();
          setTimeout(() => {
            this.setState({ loader: false });
          }, 1000);
        });
      });
    });
  }

  requestHelp = () => {
    const data = api.fetch(
      `/api/requestHelp/${this.state.sub}/${this.props.cohort_id}`,
      "post",
      { reason: this.state.studentsReason }
    );
    data
      .then(res => {
        socket.emit("requestHelp", res.data);
      })
      .then(() => {
        this.fetchStudents();
      });
  };

  moveToQueue = sub => {
    const data = api.fetch(
      `/api/requestHelp/${sub}/${this.props.cohort_id}`,
      "post",
      { reason: "" }
    );
    data
      .then(res => {
        socket.emit("requestHelp", res.data);
      })
      .then(() => {
        this.fetchStudents();
      });
  };

  deleteRequest = id => {
    const data = api.fetch(
      `/api/deleteRequest/${id}/${this.props.cohort_id}`,
      "delete"
    );
    data
      .then(res => {
        socket.emit("deleteRequest", res.data);
      })
      .then(() => {
        this.fetchStudents();
      });
  };

  handleChangeReasons = e => {
    const reasonValue = e.target.value.replace(/^\s+/, "").replace(/\s+$/, "");
    if (reasonValue !== "") {
      this.setState({
        button: false,
        studentsReason: e.target.value
      });
    } else {
      this.setState({
        button: true
      });
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        {this.state.loader ? (
          <Loader content="Loading Queue..." />
        ) : (
            <div>
              <div className={classes.root}>
                {this.state.user.length !== 0 ? (
                  <React.Fragment>
                    {this.state.previledge === "mentor" ? (
                      <Paper className={classes.header}>
                        <StudentHeader user={this.state.user[0]} />
                      </Paper>
                    ) : (
                        <Paper className={classes.header}>
                          <StudentHeader
                            user={this.state.user[0]}
                            raise={this.state.btntext}
                            btn={this.state.button}
                            requestHelp={this.requestHelp}
                            privilege={this.state.previledge}
                          />
                        </Paper>
                      )}
                    <Grid container className={classes.navHeader}>
                      {this.state.previledge === "mentor" ? null : (
                        <StudentNavHeader
                          raise={this.state.btntext}
                          requested={this.state.requested}
                          handleChangeReasons={this.handleChangeReasons}
                        />
                      )}
                    </Grid>
                  </React.Fragment>
                ) : (
                    <React.Fragment />
                  )}

                <Grid container className={classes.main} spacing={1}>
                  <Grid item xs={12} sm={4} className={classes.beingHelpMobile}>
                    {this.state.previledge === "mentor" ? null : (
                      <React.Fragment>
                        <Box order={1}>
                          <BeingHelped
                            helpingStudent={this.state.helpingStudent}
                            cohort_id={this.props.cohort_id}
                          />
                        </Box>
                      </React.Fragment>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={4} className={classes.chatList}>
                    {this.state.previledge === "mentor" ? (
                      <div>
                        <BeingHelpedModal
                          fetchStudents={this.fetchStudents}
                          helpStudentModal={this.state.helpStudentModal}
                          helpStudentClose={this.helpStudentClose}
                          helpingStudent={this.state.helpingStudent}
                          cohort_id={this.props.cohort_id}
                          chatM={this.state.mentorChatText}
                          handleChatM={this.setChatText}
                          sendChatM={this.sendChat}
                          conversation={this.state.conversation}
                          senderInfo={this.state.senderInfo}
                          chatmateInfo={this.state.chatmateInfo}
                          previledge={this.state.previledge}
                          sendChatSubM={this.selectChatmate}
                        /*BADGE*/ displayBadge={this.displayBadge}
                          chat={this.state.studentChatText}
                        />
                        <MentorProfile
                          user={this.state.user[0]}
                          members={this.state.members}
                          cohort_id={this.props.cohort_id}
                        />
                        <StudentsList
                          cohort_id={this.props.cohort_id}
                          members={this.state.members}
                          moveToQueue={this.moveToQueue}

                          sendChatSub={this.selectChatmate}
                        />

                        <RemoveRequest
                          deleteRequest={this.deleteRequest}
                          member={this.state.member}
                          removeStudentReqModal={this.state.removeStudentReqModal}
                          removeStudentReqClose={this.removeStudentReqClose}
                        />
                      </div>
                    ) : (
                        <React.Fragment>
                          <Box order={1}>
                            <div className={classes.beingHelp}>
                              <BeingHelped
                                helpingStudent={this.state.helpingStudent}
                                cohort_id={this.props.cohort_id}
                              />
                            </div>

                            <ChatList
                              sendChatSub={this.selectChatmate}
                              mentor={this.state.mentorInfo}
                              conversation={this.state.conversation}
                              sub={this.state.sub}
                              priv={this.state.previledge}
                          /*BADGE*/ badge={this.state.badge}
                          /*BADGE*/ displayBadge={this.displayBadge}
                              cohort_id={this.props.cohort_id}

                              sendChatSub={this.selectChatmate}

                            />
                          </Box>
                        </React.Fragment>
                      )}

                    {this.state.previledge === "student" ? (
                      <RemoveRequest
                        member={this.state.member}
                        removeStudentReqModal={this.state.removeStudentReqModal}
                        removeStudentReqClose={this.removeStudentReqClose}
                        deleteRequest={this.deleteRequest}
                      />
                    ) : null}
                  </Grid>
                  {/* start of chatBox */}
                  {this.state.studentChatBox && this.state.previledge === "student" ? (
                    <Grid item xs={12} sm={8}>
                      <ChatBox
                        cohort_id={this.props.cohort_id}
                        sendChat={this.sendChat}
                        handleChat={this.setChatText}
                        chat={this.state.studentChatText}
                        chatM={this.state.mentorChatText}
                        conversation={this.state.conversation}
                        senderInfo={this.state.senderInfo}
                        chatmateInfo={this.state.chatmateInfo}
                        privileged={this.state.previledge}
                        viewChatBox={this.viewChatBox}
                    /*BADGE*/ displayBadge={this.displayBadge}
                        allowChat={
                          this.state.btntext === "Currently Helping"
                            ? true
                            : false
                        }
                      />
                    </Grid>
                  ) : this.state.mentorChatBox && this.state.previledge === "mentor" ? (
                    <Grid item xs={12} sm={8}>
                      <ChatBox
                        viewChatBox={this.viewChatBox}
                        sendChatM={this.sendChat}
                        handleChatM={this.setChatText}
                        chatM={this.state.mentorChatText}
                        conversation={this.state.conversation}
                        senderInfo={this.state.senderInfo}
                        chatmateInfo={this.state.chatmateInfo}
                        privileged={this.state.previledge}
                        helpingStudent_sub={this.state.helpingStudent.sub}
                        cohort_id={this.props.cohort_id}
                        chat={this.state.studentChatText}
                        displayBadge={this.displayBadge}

                        helpStudentClose={this.helpStudentClose}
                        helpingStudent={this.state.helpingStudent}

                      />
                    </Grid>
                  ) : (
                        <Grid item xs={12} sm={8}>
                          <RequestQueue
                            sendChatSub={this.selectChatmate}
                            cohort_id={this.props.cohort_id}
                            sub={this.state.sub}
                            priv={this.state.previledge}
                            helpStudentModal={this.state.helpStudentModal}
                            helpStudentClose={this.helpStudentClose}
                            helpStudent={this.helpStudent}
                            removeStudentRequest={this.removeStudentRequest}
                            removeStudentReqModal={this.state.removeStudentReqModal}
                            removeStudentReqClose={this.removeStudentReqClose}
                            members={this.state.members}
                          />
                        </Grid>
                      )}
                  {/* end of chatBox */}
                </Grid>
              </div>
            </div>
          )}
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Student);
