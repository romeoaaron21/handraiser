function getAll(req, res){
  const db = req.app.get('db');

  db
    .query(`SELECT cohorts.id, cohorts.mentor_id, cohorts.name, cohorts.password, users.first_name, users.last_name, users.avatar, (SELECT COUNT(*) FROM member WHERE member.cohort_id = cohorts.id ) AS members FROM cohorts LEFT JOIN users ON cohorts.mentor_id = users.id`)
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
    .query(`SELECT cohorts.id, cohorts.mentor_id, cohorts.name, cohorts.password, users.first_name, users.last_name, users.avatar, (SELECT COUNT(*) FROM member WHERE member.cohort_id = cohorts.id ) AS members FROM cohorts LEFT JOIN users ON users.id = cohorts.mentor_id WHERE mentor_id = ${id}`)
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
    .query(`INSERT INTO cohorts (mentor_id, name, password) VALUES (${id}, '${name}', '${password}')`)
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
    `DELETE FROM member WHERE cohort_id = ${id};
    DELETE FROM cohorts WHERE id = ${id};`
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
    `SELECT * from member WHERE student_id = ${id}`
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
  const { student_id, password } = req.body;

  db.cohorts.findOne({
    id,
    password
  }).then(cohort => {
    if(!cohort){
      throw new Error('Wrong Password!');
    }else{
      db.member.insert({
        student_id: student_id,
        cohort_id: id
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
    .query(`DELETE FROM member WHERE student_id = ${sid} AND cohort_id = ${cid}`)
    .then(member => {
      res.status(201).json({member});
    })
    .catch(err => {
      console.log(err);
      res.status(500).end()
    })
}

function getAllMentors(req, res){
  const db = req.app.get('db');

  db
    .query(`SELECT * FROM users WHERE privilege = 'mentor'`)
    .then(mentor => {
      res.status(201).json({mentor});
    })
    .catch(err => {
      console.log(err);
      res.status(500).end()
    })
}

function getMentorCohortsByName(req, res){
  const db = req.app.get('db');
  const { value, id } = req.params;

  db
    .query(`SELECT cohorts.id, cohorts.mentor_id, cohorts.name, cohorts.password, users.first_name, users.last_name, users.avatar, (SELECT COUNT(*) FROM member WHERE member.cohort_id = cohorts.id ) AS members FROM cohorts LEFT JOIN users ON users.id = cohorts.mentor_id WHERE mentor_id = ${id} AND LOWER(cohorts.name) LIKE LOWER('%${value}%')`)
    .then(cohorts => {
      res.status(201).json({cohorts});
    })
    .catch(err => {
      console.log(err);
      res.status(500).end()
    })
}

function getAllCohortsByName(req, res){
  const db = req.app.get('db');
  const { value } = req.params;

  db
    .query(`SELECT cohorts.id, cohorts.mentor_id, cohorts.name, cohorts.password, users.first_name, users.last_name, users.avatar, (SELECT COUNT(*) FROM member WHERE member.cohort_id = cohorts.id ) AS members FROM cohorts LEFT JOIN users ON cohorts.mentor_id = users.id WHERE LOWER(cohorts.name) LIKE LOWER('%${value}%')`)
    .then(cohorts => {
      res.status(201).json({cohorts});
    })
    .catch(err => {
      console.log(err);
      res.status(500).end()
    })
}

function getStudentsByClass(req, res){
  const db = req.app.get('db');
  const { id } = req.params;

  db
    .query(`SELECT member.student_id, member.cohort_id, users.first_name, users.last_name, users.avatar FROM member, users WHERE member.student_id = users.id AND cohort_id = ${id} ORDER BY users.last_name ASC;`)
    .then(students => {
      res.status(201).json({students});
    })
    .catch(err => {
      console.log(err);
      res.status(500).end();
    })
}

module.exports = {
  getAll, 
  getByMentorID, 
  addCohort, 
  deleteCohort, 
  getCohortsByStudentID, 
  enroll, 
  leave, 
  getAllMentors, 
  getMentorCohortsByName, 
  getAllCohortsByName,
  getStudentsByClass
}