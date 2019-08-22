const express = require("express");
const massive = require("massive");
const bodyParser = require("body-parser");
const cors = require("cors");

const admin = require("./controllers/admin.js");

massive({
  host: "localhost",
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

  // ADMIN START
  app.post("/sign-in", admin.signIn);
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

  app.listen(PORT, () => {
    console.log(`Running on port ${PORT}`);
  });
});
