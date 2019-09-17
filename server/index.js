const http = require("http");
const socketIO = require("socket.io");

const express = require("express");
const massive = require("massive");
const bodyParser = require("body-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const admin = require("./controllers/admin.js");
const list = require("./controllers/list.js");
const user = require("./controllers/user.js");
const cohorts = require("./controllers/cohorts.js");
const mentor = require("./controllers/mentor");
const students = require("./controllers/students");
const comentor = require("./controllers/comentor");
const upload = require("./controllers/upload");
const chat = require("./controllers/chat");

massive({
  host: "boom-handraiser.com",
  port: 5432,
  database: "handraiser",
  user: "postgres",
  password: "handraiser"
}).then(db => {
  const PORT = 3001;
  const app = express();

  app.set("db", db);
  app.use(cors());
  app.use(express.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  //UPLOAD IMAGES
  app.use(fileUpload());

  //WEBSOCKET START
  const server = http.Server(app);
  const io = socketIO(server);

  io.on("connection", socket => {
    socket.on("requestHelp", students => {
      io.emit("requestHelping", [...students]);
    });

    socket.on("deleteRequest", students => {
      io.emit("deleteRequest", students);
    });

    socket.on("helpStudent", students => {
      io.emit("helpStudent", students);
    });
    socket.on("close", students => {
      io.emit("close", students);
    });

    socket.on("displayStudents", students => {
      io.emit("displayStudents", students);
    });

    socket.on("displayEnrolledClasses", cohorts => {
      io.emit("displayEnrolledClasses", cohorts);
    });

    socket.on("displayCohortsSideNav", cohorts => {
      io.emit("displayCohortsSideNav", cohorts);
    });

    socket.on("displayMember", member => {
      io.emit("displayMember", member);
    });
    socket.on("sendChat", chat => {
      io.emit("sendChat", chat);
    });

    socket.on("sendChatM", chat => {
      io.emit("sendChatM", chat);
    });

    socket.on("initialConversation", chat => {
      io.emit("initialConversation", chat);
    });

    /*BADGE*/ socket.on("displayBadge", () => {
      io.emit("displayBadge");
    });
    socket.on("handleChat", priv => {
      io.emit("handleChat", priv);
    });
    socket.on("handleChatM", priv => {
      io.emit("handleChatM", priv);
    });

    socket.on("seenChat", chat => {
      io.emit("seenChat", chat);
    });
    // active attempt
    socket.on("active", user => {
      io.emit("active", user);
    });
    socket.on("inactive", user => {
      io.emit("inactive", user);
    });

    //START of Normal Student Chat
    socket.on("getNormalChat", conversation => {
      io.emit("getNormalChat", conversation);
    });
    socket.on("setStudentChatText", chatText => {
      io.emit("setStudentChatText", chatText);
    });
    //END of Normal Student Chat
  });
  //WEBSOCKETS END

  // ADMIN START
  app.post("/admin-sign-in", admin.signIn);
  app.post("/generate-key", admin.generateNewKey);
  app.get("/keys", admin.generatedKeys);
  app.get("/keys/:status", admin.filterByStatus);
  app.get("/mentors", admin.mentors);
  app.get("/cohorts/mentors/:sortMentor", admin.sortByMentor);
  app.get("/cohorts", admin.cohorts);
  app.get("/students", admin.students);
  app.get("/:mentorId/cohorts", admin.cohortList);
  app.get("/:mentorId/cohorts", admin.cohortList);
  app.get("/:cohortId/students", admin.studentList);
  // ADMIN END

  //USERS
  app.post("/validate", user.validate);
  app.post("/sign-in", user.signIn);
  //logout
  app.patch("/status/:sub/:status", user.updateStatus);
  //getonline
  app.get("/online", user.getOnline);
  app.get("/api/users/:id", user.getFromSub);

  // Cohorts Start
  app.get("/api/cohorts/api", cohorts.getAll);
  app.get("/api/student/:id/cohorts/", cohorts.getCohortsByStudentID);
  app.get("/api/mentor/:id/cohorts/", cohorts.getByMentorID);
  app.get("/api/cohorts/:id/:classHeader/delete", cohorts.deleteCohort);
  app.get("/api/cohorts/:cid/students/:sid", cohorts.leave);
  app.get("/api/mentors/", cohorts.getAllMentors);
  app.get(
    "/api/cohorts/:value/search/mentor/:id",
    cohorts.getMentorCohortsByName
  );
  app.get("/api/cohorts/:value/search", cohorts.getAllCohortsByName);
  app.get("/api/cohorts/:id/students", cohorts.getStudentsByClass);
  app.get("/api/cohorts/:id/status/:status", cohorts.changeStatus);
  app.get("/api/cohort/:id/details", cohorts.getCohortDetails);
  app.get("/api/cohorts/enrolled/:studentId", cohorts.getEnrolledClasses);
  app.post("/api/cohorts/mentor/:id/add", cohorts.addCohort);
  app.post("/api/cohorts/:id/students", cohorts.enroll);
  app.post("/api/cohort/:id/editDetails", cohorts.updateCohortDetails);
  app.get("/api/cohorts/navigation/side-nav", cohorts.getAllSideNav);
  //History
  app.get("/api/history/:id", cohorts.getHistory);
  //History Details
  app.get("/api/history/details/:id", cohorts.getHistoryDetails);
  //Mentor Details
  app.get("/api/helpedby/:id", cohorts.getHelpedBy);
  //History by user id
  app.get("/api/history/:cohort/:student", cohorts.getHistoryById);
  // Cohorts End

  //STUDENTS START
  app.get("/api/cohort/:id/members/list", list.getAllStudents);
  app.patch("/api/helpStudent/:memberid/:cohort_id/:assistid", mentor.helpStudent);
  app.get("/api/removebeinghelped/:memberid/:cohort_id", mentor.movebacktoqueu);
  app.post("/api/doneHelp/:memberid/:cohort_id/:mentor_id", mentor.doneHelp);

  app.get("/api/displayUserInfo/:sub/:cohort_id", students.displayUserInfo);
  app.get("/api/displayStudents/", students.displayStudents);
  app.post("/api/requestHelp/:sub/:cohort_id", students.requestHelp);
  app.delete(
    "/api/deleteRequest/:student_id/:cohort_id",
    students.deleteRequest
  );
  //STUDENTS END

  //CHAT START
  app.get(
    "/api/displayChatUserInfo/:student_sub/:mentor_sub",
    students.displayChatUserInfo
  );
  app.post("/api/sendChat", students.sendChat);
  app.get("/api/getChat", students.getChat);
  app.get("/api/displayMentor/:cohort_id", students.displayMentor);
  app.get("/api/cohort/:id/members/list", list.getAllStudents);
  app.patch("/api/seenChat/:priv", students.seenChat);

  //CHAT END

  //UPLOAD IMAGE START
      //image chat try
  app.post("/api/sendChat/image/:fileName", upload.imageChat);
  app.post("/upload/:cohortId", upload.image);
  app.get("/setToDeFault/:cohortId", upload.setToDefault);
  app.get("/specific/:cohortId", upload.cohort);
  //UPLOAD IMAGE END

  //UPLOAD IMAGE START
  app.post("/upload/:cohortId", upload.image);
  app.get("/setToDeFault/:cohortId", upload.setToDefault);
  app.get("/specific/:cohortId", upload.cohort);
  //UPLOAD IMAGE END

  //comentors
  app.post("/api/addCoMentor/:cohort_id", comentor.addCoMentor);
  app.get("/api/fetchCoMentor/:cohort_id", comentor.fetchCoMentor);
  app.get("/api/fetchCoMentorCohorts", comentor.fetchCoMentorCohorts);
  app.get("/api/:id/fetchCohorts", comentor.fetchCohorts);
  app.get(
    "/api/availableMentor/:cohort_id/:mentor_id",
    comentor.availableMentor
  );
  app.get("/api/fetchMentors/:mentor_id", comentor.fetchMentors);


  //START of Normal Chatting

  app.get("/api/getChatUsersInfo/:userSub/:chatmateSub", chat.getChatUsersInfo);
  app.post("/api/sendStudentChat", chat.sendStudentChat);

  //END of Normal Chatting

  server.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
  });
});
