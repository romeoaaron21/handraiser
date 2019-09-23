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
  const { message, sender_sub, chatmate_sub, time, type } = req.body
  db.chat
    .insert({
      message: message,
      sender_id: sender_sub,
      chatmate_id: chatmate_sub,
      cohort_id: 'all',
      time: time,
      seen: 0,
      chat_type: type
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
  db.query(`SELECT chatSub, id from (SELECT sender_id as chatSub, id FROM chat WHERE chatmate_id = '${userSub}' AND cohort_id='all'
  UNION
  SELECT chatmate_id as chatSub, id FROM chat WHERE sender_id = '${userSub}' AND cohort_id='all') as sub order by id DESC`)
    .then(chatSub => {
        res.status(200).json([...chatSub]);
    })

}

function getChatListInformation(req, res) {
  const db = req.app.get("db");
  const { chatListSub } = req.params;
  var ChatSub = chatListSub.split(',');
  let users = [];
  let x = 0;

if(ChatSub.length !== 0){
  ChatSub.map((sub, i) => {
    db.users
      .findOne({ sub: sub })
      .then(chatListInfo => {
        if(i === x){
          users.push(chatListInfo)
          x++
        }
        if (users.length === ChatSub.length) {
            res.status(200).json([...users])
        }
      })
  })
}
  
}

function seenNormalChat(req, res){
    const db = req.app.get("db");
    const sender_id = req.body.sender;
    const chatmate_id = req.body.chatmate;
  
      db.query(
        `UPDATE chat SET seen=1 WHERE chatmate_id='${chatmate_id}' AND sender_id='${sender_id}'`
      ).then(() => {
        db.query(`SELECT * from chat ORDER BY id ASC`).then(chats => {
          res.status(201).json(chats);
        });
      });
}


module.exports = {
  getChatUsersInfo,
  sendStudentChat,
  getChatList,
  getChatListInformation,
  seenNormalChat
}