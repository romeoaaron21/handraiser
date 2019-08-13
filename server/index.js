const express = require('express');
const massive = require('massive');
const cors = require("cors");
const bodyParser = require('body-parser');

massive({
    host: 'localhost',
    port: 5432,
    database: 'handraiser',
    user: 'postgres',
    password: 'handraiser',
})
.then(db => {
    const cohorts = require('./controller/cohorts.js')
    const PORT = 3001;
    const app = express();

    app.set('db', db);
    app.use(cors());
    app.use(express.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    app.get('/api/cohorts/', cohorts.getAll);
    app.get('/api/cohorts/mentor/:id', cohorts.getByMentorID);
    app.get('/api/cohorts/:id', cohorts.deleteCohort);

    app.post('/api/cohorts/mentor/:id/add', cohorts.addCohort);

    app.listen(PORT, () => {
        console.log(`Running on port ${PORT}`)
    })
})