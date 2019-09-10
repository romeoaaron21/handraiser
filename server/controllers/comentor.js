function addCoMentor (req, res){
    const db = req.app.get("db");
    db.query(`INSERT INTO comentor(mentor_id,cohort_id) Values(${req.body.mentor_id},${req.body.cohorts_id})`)
    .then(data => {
      res.status(201).json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).end();
    });
}
function fetchCoMentor (req, res){
  const db = req.app.get("db");
  db.query(`SELECT cohorts.*,users.first_name, users.last_name, users.avatar,(SELECT COUNT(*) FROM member WHERE member.cohort_id = cohorts.id ) AS members FROM cohorts,comentor,users WHERE comentor.mentor_id = users.id AND comentor.cohort_id = cohorts.id AND comentor.cohort_id = ${req.params.cohort_id}`)
  .then(data => {
    res.status(201).json(data);
  })
  .catch(err =>{
    console.log(err);
    res.status(500).end();
  })
}

function fetchMentors(req, res){
  const db = req.app.get("db");
  db.query(`SELECT * FROM users WHERE privilege = 'mentor'`)
  .then(data => {
    res.status(201).json(data);
  })
  .catch(err =>{
    console.log(err);
    res.status(500).end();
  })
}
function fetchCoMentorCohorts(req,res){
  const db = req.app.get("db");
  db.query(`SELECT cohorts.id,cohorts.name, cohorts.password, cohorts.status,users.id AS user_id,users.first_name, users.last_name, users.avatar,(SELECT COUNT(*) FROM member WHERE member.cohort_id = cohorts.id ) AS members FROM cohorts,comentor,users WHERE comentor.mentor_id = users.id AND comentor.cohort_id = cohorts.id `)
  .then(data=>{
    res.status(200).json(data);
  })
  .catch(err =>{
    console.log(err);
    res.status(500).end();
  })
}

module.exports = {
  addCoMentor,
  fetchCoMentor,
  fetchMentors,
  fetchCoMentorCohorts
};
