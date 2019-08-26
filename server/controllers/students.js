function displayUserInfo(req, res) {
  const db = req.app.get("db");
  const { sub, cohort_id } = req.params;

  db.query(
    `SELECT users.*, cohorts.name FROM users, member, cohorts WHERE users.id=member.student_id AND cohorts.id=member.cohort_id AND users.sub = '${sub}' and cohorts.id = ${cohort_id}`
  ).then(user => {
    if (user.length > 0) {
      res.status(200).json([user]);
    } else {
      db.query(
        `SELECT users.*, cohorts.name FROM users, cohorts WHERE users.id=cohorts.mentor_id  AND users.sub = '${sub}' and cohorts.id = ${cohort_id}`
      ).then(mentor => {
        res.status(200).json([mentor]);
      });
    }
  });

  // db.users
  //     .findOne({sub:sub})
  //     .then(user => {
  //         res.status(200).json([user])
  //     })
}

function displayStudents(req, res) {
  const db = req.app.get("db");

  db.query(
    `SELECT users.*, requests.status,reasons.reason, member.cohort_id FROM reasons, users, member, requests WHERE requests.id = reasons.request_id AND users.id = member.student_id AND member.id = requests.member_id AND users.privilege='student' order by requests.id asc`
  ).then(members => {
    res.status(200).json([...members]);
  });
}

function requestHelp(req, res) {
  const db = req.app.get("db");
  const { sub, cohort_id } = req.params;
  const { reason } = req.body;
  db.users
    .findOne({ sub: sub })
    .then(function(data) {
      db.member
        .findOne({ student_id: data.id, cohort_id: cohort_id })
        .then(function(member) {
          db.requests
            .insert({
              member_id: member.id,
              status: "waiting"
            })
            .then(user => {
              db.reasons
                .insert({
                  request_id: user.id,
                  reason
                })
                .then(() => {
                  db.requests
                    .findOne({ member_id: user.member_id })
                    .then(mem => {
                      db.member.findOne({ id: mem.member_id }).then(memb => {
                        db.query(
                          `SELECT users.*, requests.status,reasons.reason, member.cohort_id FROM reasons, users, member, requests WHERE users.id = member.student_id AND member.id = requests.member_id AND users.privilege='student' AND requests.id = reasons.request_id AND member.cohort_id=${
                            memb.cohort_id
                          }  order by requests.id asc`
                        ).then(result => {
                          res.status(201).json([...result]);
                        });
                      });
                    });
                });
            });
        });
    })
    .catch(() => {
      res.status(500).end();
    });
}

function deleteRequest(req, res) {
  const db = req.app.get("db");
  const { student_id, cohort_id } = req.params;

  db.member
    .findOne({ student_id: student_id, cohort_id: cohort_id })
    .then(student => {
      db.query(`DELETE from requests WHERE member_id = ${student.id}`).then(
        () => {
          db.query(
            `SELECT users.*, requests.status FROM users, member, requests WHERE users.id = member.student_id AND member.id = requests.member_id AND users.privilege='student' AND member.cohort_id=${cohort_id}  order by requests.id asc`
          ).then(result => {
            res.status(201).json([...result]);
          });
        }
      );
    })
    .catch(() => {
      res.status(500).end();
    });
}

function displayChatUserInfo(req, res) {
  const db = req.app.get("db");
  const { student_sub, mentor_sub } = req.params;

  db.query(
    `SELECT * FROM users WHERE users.sub = '${student_sub}' OR users.sub='${mentor_sub}'`
  ).then(user => {
    res.status(200).json([...user]);
  });
}

function sendChat(req, res) {
  const db = req.app.get("db");
  const message = req.body.message;
  const sender_id = req.body.sender_sub;
  const chatmate_id = req.body.chatmate_sub;
  const cohort_id = req.body.cohort_id;

  db.chat
    .insert({
      message: message,
      sender_id: sender_id,
      chatmate_id: chatmate_id,
      cohort_id: cohort_id
    })
    .then(() => {
      db.query(
        `SELECT * from chat`
      ).then(chats => {
        res.status(201).json(chats);
      });
    });
}

function getChat(req, res) {
  const db = req.app.get("db");

  db.query(
    `SELECT * from chat`
  ).then(chats => {
    res.status(201).json(chats);
  });
}

function displayMentor(req, res) {
  const db = req.app.get("db");
  const { cohort_id } = req.params;

  db.cohorts.findOne({ id: cohort_id }).then(cohort => {
    db.users.findOne({ id: cohort.mentor_id }).then(mentor => {
      res.status(200).json([mentor]);
    });
  });
}

module.exports = {
  displayUserInfo,
  displayStudents,
  requestHelp,
  deleteRequest,
  displayChatUserInfo,
  sendChat,
  getChat,
  displayMentor
};
