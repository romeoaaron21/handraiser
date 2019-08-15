function validate(req, res) {
  const db = req.app.get('db');

  const { key } = req.body;

  db.keys
    .findOne(
      {
        sign_in_key: key
      }
    )
    .then(key => {
      res.status(201).send({ key });
    })
    .catch(err => {
      console.log(err);
      res.status(501).end();
    });
}

function signIn(req, res) {
  const db = req.app.get('db');

  const { first_name, last_name, sub, privilege, avatar } = req.body;

  db.users
    .findOne(
      {
        avatar
      }
    )
    .then(user => {
      if (!user) {
        db.users
          .insert({
            first_name,
            last_name,
            sub,
            privilege,
            avatar
          })
          .then(user => {
            res.status(201).send(user.privilege)
          })
          .catch(err => {
            console.log(err);
            res.status(501).end();
          })
      } else {
        res.status(201).send(user.privilege)
      }
    })
    .catch(err => {
      console.log(err);
      res.status(501).end();
    });
}

module.exports = {
  validate,
  signIn
}
