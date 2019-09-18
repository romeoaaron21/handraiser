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

  // db.query(`SELECT distinct sender_id, chatmate_id, message, time FROM chat where chatmate_id = '${userSub}' and cohort_id='all' or sender_id = '${userSub}' and cohort_id='all' order by time DESC`)
  db.query(`SELECT chatSub, id from (SELECT sender_id as chatSub, id FROM chat WHERE chatmate_id = '${userSub}'
  UNION
  SELECT chatmate_id as chatSub, id FROM chat WHERE sender_id = '${userSub}') as sub order by id DESC`)
    .then(chatSub => {
        res.status(200).json([...chatSub]);
    })

}

function getChatListInformation(req, res) {
  const db = req.app.get("db");
  const { chatListSub } = req.params;
  var ChatSub = chatListSub.split(',');
  let users = []

  ChatSub.map(sub => {
    db.users
      .findOne({ sub: sub })
      .then(chatListInfo => {
        users.push(chatListInfo)
        if (ChatSub[ChatSub.length-1] === chatListInfo.sub) {
          setTimeout(() => {
            res.status(200).json([...users])
          }, 100)
        }
        
      }).then(()=> {
        console.log(users)
      })
  })
}


module.exports = {
  getChatUsersInfo,
  sendStudentChat,
  getChatList,
  getChatListInformation,
}