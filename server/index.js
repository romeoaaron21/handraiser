const express = require('express');
const massive = require('massive');

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

    app.listen(PORT, () => {
        console.log(`Running on port ${PORT}`)
    })
})