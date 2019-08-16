const express = require('express');
const massive = require('massive');
const bodyParser = require('body-parser');
const cors = require('cors');

const user = require('./controllers/user.js');
const cohorts = require('./controllers/cohorts.js')

massive({
    host: 'localhost',
    port: 5432,
    database: 'handraiser',
    user: 'postgres',
    password: 'handraiser',
})
.then(db => {
    const cohorts = require('./controllers/cohorts.js')
    const PORT = 3001;
    const app = express();

    app.set('db', db);
    app.use(cors());
    app.use(express.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    //USERS
    app.post('/validate', user.validate);
    app.post('/sign-in', user.signIn);

    // Cohorts Start
    app.get('/api/cohorts/', cohorts.getAll);
    app.get('/api/student/:id/cohorts/', cohorts.getCohortsByStudentID)
    app.get('/api/mentor/:id/cohorts/', cohorts.getByMentorID);
    app.get('/api/cohorts/:id', cohorts.deleteCohort);
    app.get('/api/cohorts/:cid/students/:sid', cohorts.leave);
    app.get('/api/mentors/', cohorts.getAllMentors);

    app.post('/api/cohorts/mentor/:id/add', cohorts.addCohort);
    app.post('/api/cohorts/:id/students', cohorts.enroll);
    // Cohorts End

    app.listen(PORT, () => {
        console.log(`Running on port ${PORT}`)
    })
})
