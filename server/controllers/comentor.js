function addCoMentor(req, res) {
  const db = req.app.get("db");
  req.body.mentor_id.map(data => {
    db.comentor
      .insert({
        mentor_id: data,
        cohort_id: req.params.cohort_id
      })
      .then(data => {
        res.status(201).json(data);
      });
  });
}
function fetchCoMentor(req, res) {
  const db = req.app.get("db");
  db.query(
    `SELECT comentor.cohort_id,cohorts.id,cohorts.mentor_id AS cohort_owner_id,cohorts.name,users.id AS mentor_id,users.first_name, users.last_name, users.avatar,(SELECT COUNT(*) FROM member WHERE member.cohort_id = cohorts.id ) AS members FROM cohorts,comentor,users WHERE comentor.mentor_id = users.id AND comentor.cohort_id = cohorts.id AND comentor.cohort_id = ${req.params.cohort_id}`
  )
    .then(data => {
      res.status(201).json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).end();
    });
}

function fetchMentors(req, res) {
  const db = req.app.get("db");
  db.query(
    `SELECT * FROM users WHERE privilege = 'mentor' and id !=${req.params.mentor_id}`
  )
    .then(data => {
      res.status(201).json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).end();
    });
}
function fetchCoMentorCohorts(req, res) {
  const db = req.app.get("db");
  db.query(
    `SELECT cohorts.id,cohorts.name, cohorts.password, cohorts.status,users.id AS user_id,users.first_name, users.last_name, users.avatar,(SELECT COUNT(*) FROM member WHERE member.cohort_id = cohorts.id ) AS members FROM cohorts,comentor,users WHERE comentor.mentor_id = users.id AND comentor.cohort_id = cohorts.id `
  )
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).end();
    });
}
function fetchCohorts(req, res) {
  const db = req.app.get("db");
  const { id } = req.params;

  db.query(`SELECT * FROM cohorts WHERE id = ${id}`)
    .then(data => {
      res.status(201).json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).end();
    });
}

function availableMentor(req, res) {
  const db = req.app.get("db");
  db.query(
    `select * from users WHERE id NOT IN(SELECT mentor_id from comentor WHERE cohort_id = ${req.params.cohort_id} ) AND id !=${req.params.mentor_id} AND privilege = 'mentor' ;`
  )
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).end();
    })
}

function fetchAssist(req, res) {
  const db = req.app.get("db");
  // SELECT requests.*,users.id as user_id from requests,users,member WHERE member.student_id=users.id AND member.id = requests.member_id AND users.id= 4 AND requests.assist_id=1
  // SELECT *,users.id from requests,users,member WHERE member.student_id=users.id AND member.id = requests.member_id AND requests.member_id=${req.params.student_id} AND requests.assist_id=${req.params.mentor_id}
  db.query(`SELECT requests.*,users.sub,users.id as user_id from requests,users,member WHERE member.student_id=users.id AND member.id = requests.member_id AND users.id= ${req.params.student_id} AND requests.assist_id=${req.params.mentor_id}`)
    .then(data => {
      res.status(200).json(data)
    })
    .catch(err => {
      console.log(err);
      res.status(500).end();
    })
}

function studentBeingHelped(req,res){
  const db = req.app.get("db")

  db.query(
    `SELECT users.*, requests.status,requests.assist_id, member.cohort_id FROM users, member, requests WHERE users.id = member.student_id AND member.id = requests.member_id AND users.privilege='student' AND member.cohort_id=${req.params.cohort_id} and requests.status = 'inprogress'`
  ).then(student => {
    return res.status(200).send(student);
  });
}

module.exports = {
  addCoMentor,
  fetchCoMentor,
  fetchMentors,
  fetchCoMentorCohorts,
  fetchCohorts,
  availableMentor,
  fetchAssist,
  studentBeingHelped
};
