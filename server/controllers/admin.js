const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const secret = require('../../secret.js');

function signIn(req, res) {
  const db = res.app.get('db');

  const { username, password } = req.body;

  db.admin
    .findOne(
      {
        username,
        password
      }
    )
    .then(admin => {
      if (!admin) {
        console.log(admin);
        res.status(201).send({ token : null });
      }
      const token = jwt.sign({ adminId: admin.id }, secret);
      delete admin.password;
      res.status(201).send({ token });
    })
    .catch(err => {
      if (['Invalid username', 'Incorrect password'].includes(err.message)) {
        console.error(err);
        res.status(400).send({ error: err.message });
      } else {
        res.status(500).end();
      }
    });
}

module.exports = {
  signIn,
}
