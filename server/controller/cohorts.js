function getAll(req, res){
  const db = req.app.get('db');

  db
    .query(`SELECT * FROM cohorts`)
    .then(cohorts => {
      res.status(201).json({cohorts});
    })
    .catch(err => {
      console.log(err)
      res.status(500).end()
    })
}

function getByMentorID(req, res){
  const db = req.app.get('db');
  const { id } = req.params
  db
    .query(`SELECT * FROM cohorts WHERE mentorid = ${id}`)
    .then(cohorts => {
      res.status(201).json({cohorts});
    })
    .catch(err => {
      console.log(err)
      res.status(500).end()
    })
}

function addCohort(req, res){
  const db = req.app.get('db');
  const { id } = req.params;
  const { name, password } = req.body; 

  db
    .query(`INSERT INTO cohorts (mentorid, name, password) VALUES (${id}, '${name}', '${password}')`)
    .then(cohort => {
      res.status(201).json({cohort});
    })
    .catch(err => {
      console.log(err)
      res.status(500).end()
    })
}

function deleteCohort(req, res) {
  const db = req.app.get('db');
  const { id } = req.params

  db.query(
    `DELETE FROM cohorts WHERE id = ${id}`
  ).then(cohort => {
    res.status(201).json({cohort});
  }).catch(err => {
    console.log(err);
    res.status(500).end();
  })
}

module.exports = {
  getAll, getByMentorID, addCohort, deleteCohort
}