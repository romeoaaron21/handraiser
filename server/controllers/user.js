function signIn(req, res) {
  const db = req.app.get('db');

  const { givenName, familyName, sub, privilege, avatar } = req.body;

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
            firstname: givenName,
            lastname: familyName,
            sub,
            privilege,
            avatar
          })
          .then(user => {
            res.sent(201).send({ user })
          })
          .catch(err => {
            res.send(500).end();
          })
      }
    })
    .catch(err => {
      res.send(501).end();
    });
}

module.exports = {
  signIn
}
