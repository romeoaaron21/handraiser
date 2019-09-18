function getChatUsersInfo(req, res) {
  const db = req.app.get("db");
  const { userSub, chatmateSub } = req.params

  db.query(`select * from users where sub = '${userSub}' or sub = '${chatmateSub}'`)
    .then(chatUser => {
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
      cohort_id: 'all',
      time: time,
      seen: 0
    })
    .then(() => {
      db.query(`SELECT * from chat ORDER BY id ASC`).then(chats => {
        res.status(201).json(chats);
      });
    });
}

function getChatList(req, res) {
  const db = req.app.get("db");
  const { userSub } = req.params;

  db.query(`SELECT distinct sender_id FROM chat where chatmate_id = '${userSub}' and cohort_id='all' UNION SELECT distinct chatmate_id FROM chat where sender_id = '${userSub}' and cohort_id='all'`)
  .then(chatSub => {
    res.status(200).json([...chatSub]);
  })
  
}

function getChatListInformation(req, res) {
  const db = req.app.get("db");
  const { chatListSub } = req.params;

  db.users
    .findOne({ sub: chatListSub })
    .then((user) => {
      res.status(200).json(user);
    })

}


module.exports = {
  getChatUsersInfo,
  sendStudentChat,
  getChatList,
  getChatListInformation,
}