const express = require('express');
const massive = require('massive');
const cors = require('cors');
const bodyParser = require('body-parser');

const user = require('./controllers/user.js');

massive({
    host: 'localhost',
    port: 5432,
    database: 'handraiser',
    user: 'postgres',
    password: 'handraiser',
})
.then(db => {
    const PORT = 3001;
    const app = express();

    app.set('db', db);
    app.use(express.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json())
    app.use(cors());

    //USERS
    app.post('/validate', user.validate);
    app.post('/sign-in', user.signIn);

    app.listen(PORT, () => {
        console.log(`Running on port ${PORT}`)
    })
})
