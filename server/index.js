const express = require('express');
const massive = require('massive');
const bodyParser = require('body-parser');
const cors = require('cors');

const admin = require('./controllers/admin.js');

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
    app.use(cors());
    app.use(express.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    // ADMIN START
    app.post('/admin/sign-in', admin.signIn);
    // ADMIN END

    app.listen(PORT, () => {
        console.log(`Running on port ${PORT}`)
    })
})
