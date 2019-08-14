function getAll(req, res){
  const db = req.app.get('db');
  const { id } = req.params;

  db
    .query(`SELECT cohorts.id, cohorts.mentorid, cohorts.name, cohorts.password, users.firstname, users.lastname FROM cohorts LEFT JOIN users ON cohorts.mentorid = users.id`)
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

function getCohortsByStudentID(req, res) {
  const db = req.app.get('db');
  const { id } = req.params

  db.query(
    `SELECT * from member WHERE studentid = ${id}`
  ).then(member => {
    res.status(201).json({member})
  }).catch(err => {
    console.log(err)
    res.status(500).end();
  })
}

function enroll(req, res) {
  const db = req.app.get('db');
  const { id } = req.params;
  const { studentid, password } = req.body;

  db.cohorts.findOne({
    id,
    password
  }).then(cohort => {
    if(!cohort){
      throw new Error('Wrong Password!');
    }else{
      db.member.insert({
        studentid: studentid,
        cohortid: id
      }).then(member => {
        res.status(201).json({member});
      })
    }
  }).catch(err => {
    console.log(err);
    res.status(500).end()
  })
}

function leave(req, res){
  const db = req.app.get('db');
  const { cid, sid } = req.params;

  db
    .query(
    `DELETE FROM member WHERE studentid = ${sid} AND cohortid = ${cid}`
    )
    .then(member => {
      res.status(201).json({member});
    })
    .catch(err => {
      console.log(err);
      res.status(500).end()
    })
}

module.exports = {
  getAll, getByMentorID, addCohort, deleteCohort, getCohortsByStudentID, enroll, leave
}