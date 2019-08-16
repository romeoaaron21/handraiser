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

  const { key, first_name, last_name, sub, privilege, avatar } = req.body;

  db.query(
    `SELECT * FROM keys WHERE sub IN (SELECT sub FROM keys WHERE sub = '${sub}')`
    )
    .then(validatedKey => {
      if (validatedKey.length === 0) {
        db.query(
          `UPDATE keys SET sub = '${sub}' WHERE sign_in_key = '${key}'`
          )
          .then(keys => {
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
                      res.status(201).send({ user })
                    })
                    .catch(err => {
                      console.log(err);
                      res.status(501).end();
                    })
                } else {
                  res.status(201).send({ user })
                }
              })
              .catch(err => {
                console.log(err);
                res.status(501).end();
              });
          })
      } else {
        if (validatedKey[0].sub === sub) {
          console.log('12323');
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
                    res.status(201).send({ user })
                  })
                  .catch(err => {
                    console.log(err);
                    res.status(501).end();
                  })
              } else {
                user.key = validatedKey[0].sign_in_key;
                res.status(201).send({ user })
              }
            })
            .catch(err => {
              console.log(err);
              res.status(501).end();
            });
        } else {
          const user = { sub: null };
          res.status(201).send({ user });
        }
      }
    })
    .catch(err => {
      console.log(err);
      res.status(501).end();
    })
}

module.exports = {
  validate,
  signIn
}
