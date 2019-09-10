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
      chatBox: false,
      mentor_sub: "",
      chat: "",
      conversation: [],
      senderInfo: [],
      chatmateInfo: [],
      chatM: "",
      mentorInfo: [],
      /*end of added for chatBox state*/

      badge: false,
    };
  }

  displayBadge = priv => {
    if (priv === "mentor") {
      socket.emit("displayBadge");
    } else if (priv === "student") {
      let sub = { student: this.state.sub, mentor: this.state.mentor_sub };
      const data = api.fetch(`/api/seenChat`, "patch", sub);
      data.then(res => {
        socket.emit("seenChat", res.data);
        this.setState({badge:true})
      });
    }
  };

  //start of methods for chat websockets

  viewChatBox = () => {
    this.setState({ chatBox: false });
  };

  handleChat = val => {
    socket.emit("handleChat", val);
  };

  handleChatM = val => {
    socket.emit("handleChatM", val);
  };

  sendChatSub = () => {
    const data = api.fetch(
      `/api/displayChatUserInfo/${this.state.sub}/${this.state.mentor_sub}`,
      "get"
    );
    data.then(res => {
      res.data.map(user => {
        if (user.sub === this.state.sub) {
          this.setState({
            senderInfo: user,
            chatBox: true
          });
        } else {
          this.setState({
            chatmateInfo: user,
            chatBox: true
          });
        }
        return null;
      });
    });
  };

  sendChatSubM = chatmate_sub => {
    const data = api.fetch(
      `/api/displayChatUserInfo/${this.state.sub}/${chatmate_sub}`,
      "get"
    );
    data.then(res => {
      res.data.map(user => {
        if (user.sub === this.state.sub) {
          this.setState({
            senderInfo: user,
            chatBox: true,
            chatmate_sub: chatmate_sub
          });
        } else {
          this.setState({
            chatmateInfo: user,
            chatBox: true,
            chatmate_sub: chatmate_sub
          });
        }
        return null;
      });
    });
  };

  messagesEndRef = React.createRef();

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
      message: this.state.chat,
      sender_sub: this.state.sub,
      chatmate_sub: this.state.mentor_sub,
      cohort_id: this.props.cohort_id,
      time: datetime
    };
    const data = api.fetch(`/api/sendChat`, "post", convo);
    data.then(res => {
      socket.emit("sendChat", res.data);
    });
  };

  sendChatM = chatmate => {
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
      message: this.state.chatM,
      sender_sub: this.state.sub,
      chatmate_sub: chatmate,
      cohort_id: this.props.cohort_id,
      time: datetime
    };
    const data = api.fetch(`/api/sendChat`, "post", convo);
    data.then(res => {
      socket.emit("sendChatM", res.data);
    });
  };

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
    socket.on("connect", () => {});
    this.setState({ socket });

    //START OF BADGE
    socket.on("displayBadge", () => {
      this.setState({ badge: false });
    });

    socket.on("handleChat", priv => {
      this.setState({ chat: priv });
    });
    socket.on("handleChatM", priv => {
      this.setState({ chatM: priv });
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
        chat: ""
      });
    });
    socket.on("sendChatM", chat => {
      this.setState({
        conversation: [...chat],
        chatM: ""
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
        helpStudentModal: false,
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
            this.setState({ mentor_sub: mentor.sub });
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
        console.log(res)
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
                        chatM={this.state.chatM}
                        handleChatM={this.handleChatM}
                        sendChatM={this.sendChatM}
                        conversation={this.state.conversation}
                        senderInfo={this.state.senderInfo}
                        chatmateInfo={this.state.chatmateInfo}
                        previledge={this.state.previledge}
                        sendChatSubM={this.sendChatSubM}
                        /*BADGE*/ displayBadge={this.displayBadge}
                        chat={this.state.chat}
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
                          sendChatSub={this.sendChatSub}
                          mentor={this.state.mentorInfo}
                          conversation={this.state.conversation}
                          sub={this.state.sub}
                          priv={this.state.previledge}
                          /*BADGE*/ badge={this.state.badge}
                          /*BADGE*/ displayBadge={this.displayBadge}
                          cohort_id={this.props.cohort_id}
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
                {!this.state.chatBox ? (
                  <Grid item xs={12} sm={8} className={classes.requestQue}>
                    <RequestQueue
                      sendChatSubM={this.sendChatSubM}
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
                ) : this.state.previledge === "student" ? (
                  <Grid
                    item
                    xs={12}
                    sm={this.state.previledge === "mentor" ? 12 : 8}
                  >
                    <ChatBox
                      cohort_id={this.props.cohort_id}
                      sendChat={this.sendChat}
                      handleChat={this.handleChat}
                      chat={this.state.chat}
                      chatM={this.state.chatM}
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
                ) : (
                  <Grid item xs={12} sm={8}>
                    <RequestQueue
                      sendChatSubM={this.sendChatSubM}
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
