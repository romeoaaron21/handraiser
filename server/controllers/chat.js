function getChatUsersInfo(req, res) {
    const db = req.app.get("db");
    const {userSub, chatmateSub} = req.params

    db.query(`select * from users where sub = '${userSub}' or sub = '${chatmateSub}'`)
    .then( chatUser => {
        res.status(200).json([...chatUser])
    })
}

function sendStudentChat(req, res) {
    const db = req.app.get("db");
    const { message, sender_sub, chatmate_sub, time } = req.body
  
    db.chat
      .insert({
        message: message,
        sender_id: sender_sub,
        chatmate_id: chatmate_sub,
        cohort_id: 001,
        time: time,
        seen: 0
      })
      .then(() => {
        db.query(`SELECT * from chat ORDER BY id ASC`).then(chats => {
          res.status(201).json(chats);
        });
      });
}


module.exports = {
    getChatUsersInfo,
    sendStudentChat
}