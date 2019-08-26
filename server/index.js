const http = require("http");
const socketIO = require("socket.io");

const express = require("express");
const massive = require("massive");
const bodyParser = require("body-parser");
const cors = require("cors");

const admin = require("./controllers/admin.js");
const list = require("./controllers/list.js");
const user = require("./controllers/user.js");
const cohorts = require("./controllers/cohorts.js");
const mentor = require("./controllers/mentor");
const students = require("./controllers/students");

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

  //WEBSOCKET START
  const server = http.Server(app);
  const io = socketIO(server);

  io.on("connection", socket => {
    socket.on("requestHelp", students => {
      io.emit("requestHelping", [...students]);
    });

    socket.on("deleteRequest", students => {
      io.emit("deleteRequest", [...students]);
    });

    socket.on("helpStudent", students => {
      io.emit("helpStudent", students);
    });
    socket.on("close", students => {
      io.emit("close", students);
    });

    socket.on("displayStudents", students => {
      // console.log(students);
      io.emit("displayStudents", students);
    });

    socket.on("displayCohorts", cohorts => {
      io.emit("displayCohorts", cohorts);
    });
    socket.on("displayMember", member => {
      io.emit("displayMember", member);
    });
    socket.on("sendChat", chat => {
      // console.log(chat)
      io.emit("sendChat", chat);
    });
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

  app.get("/api/users/:id", user.getFromSub);

  // Cohorts Start
  app.get("/api/cohorts/api", cohorts.getAll);
  app.get("/api/student/:id/cohorts/", cohorts.getCohortsByStudentID);
  app.get("/api/mentor/:id/cohorts/", cohorts.getByMentorID);
  app.get("/api/cohorts/:id", cohorts.deleteCohort);
  app.get("/api/cohorts/:cid/students/:sid", cohorts.leave);
  app.get("/api/mentors/", cohorts.getAllMentors);
  app.get(
    "/api/cohorts/:value/search/mentor/:id",
    cohorts.getMentorCohortsByName
  );
  app.get("/api/cohorts/:value/search", cohorts.getAllCohortsByName);
  app.get("/api/cohorts/:id/students", cohorts.getStudentsByClass);

  app.post("/api/cohorts/mentor/:id/add", cohorts.addCohort);
  app.post("/api/cohorts/:id/students", cohorts.enroll);
  // Cohorts End

  app.patch("/api/helpStudent/:memberid/:cohort_id", mentor.helpStudent);
  app.get("/api/removebeinghelped/:memberid/:cohort_id", mentor.movebacktoqueu);
  app.get("/api/doneHelp/:memberid/:cohort_id", mentor.doneHelp);

  app.get("/api/displayUserInfo/:sub/:cohort_id", students.displayUserInfo);
  app.get("/api/displayStudents/", students.displayStudents);
  app.post("/api/requestHelp/:sub/:cohort_id", students.requestHelp);
  app.delete(
    "/api/deleteRequest/:student_id/:cohort_id",
    students.deleteRequest
  );

  app.get(
    "/api/displayChatUserInfo/:student_sub/:mentor_sub",
    students.displayChatUserInfo
  );
  app.post("/api/sendChat", students.sendChat);
  app.get("/api/getChat/:sender_id/:chatmate_id", students.getChat);
  app.get("/api/displayMentor/:cohort_id", students.displayMentor);

  app.get("/api/cohort/:id/members/list", list.getAllStudents);

  server.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
  });
});