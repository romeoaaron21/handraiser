function getChatUsersInfo(req, res) {
  const db = req.app.get("db");
  const { userSub, chatmateSub } = req.params;

  db.query(
    `select * from users where sub = '${userSub}' or sub = '${chatmateSub}'`
  ).then(chatUser => {
    res.status(200).json([...chatUser]);
  });
}

function sendStudentChat(req, res) {
  const db = req.app.get("db");
  const { message, sender_sub, chatmate_sub, time, type, link } = req.body
  db.chat
    .insert({
      message: message,
      sender_id: sender_sub,
      chatmate_id: chatmate_sub,
      cohort_id: "all",
      time: time,
      seen: 0,
      chat_type: type,
      link: link
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
  db.query(
    `SELECT chatSub, id from (SELECT sender_id as chatSub, id FROM chat WHERE chatmate_id = '${userSub}' AND cohort_id='all'
  UNION
  SELECT chatmate_id as chatSub, id FROM chat WHERE sender_id = '${userSub}' AND cohort_id='all') as sub order by id DESC`
  ).then(chatSub => {
    res.status(200).json([...chatSub]);
  });
}

function getChatListInformation(req, res) {
  const db = req.app.get("db");
  const { chatListSub } = req.params;
  var ChatSub = chatListSub.split(",");
  let users = [];
  let x = 0;

  if (ChatSub.length !== 0) {
    ChatSub.map((sub, i) => {
      db.users.findOne({ sub: sub }).then(chatListInfo => {
        if (i === x) {
          users.push(chatListInfo);
          x++;
        }
        if (users.length === ChatSub.length) {
          res.status(200).json([...users]);
        }
        if (x - 1 !== i) {
          res.status(500).send("error");
        }
      });
    });
  }
}

function seenNormalChat(req, res) {
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

function getGroupList(req, res) {
  const db = req.app.get("db");
  const { userSub } = req.params;

  db.query(
    `SELECT groupchat.id as id, name as name, member_sub as sub FROM groupchat, groupmembers WHERE groupchat.id = groupmembers.groupchat_id AND member_sub = '${userSub}'`
  )
    .then(groupchat => {
      res.status(200).json(groupchat);
    })
    .catch(() => {
      res.statis(500).end();
    });
}

function getGroupChatInfo(req, res) {
  const db = req.app.get("db");
  const { gc_id } = req.params;

  db.groupchat.findOne({ id: gc_id }).then(groupchat => {
    res.status(200).json(groupchat);
  });
}

function getGroupChat(req, res) {
  const db = req.app.get("db");

  db.query(
    `SELECT groupmessage.*, users.avatar FROM groupmessage, users WHERE sender_sub = users.sub ORDER BY id`
  ).then(chats => {
    res.status(201).json(chats);
  });
}

function getAllUsers(req, res) {
  const db = req.app.get("db");

  db.query(`SELECT * from users order by first_name ASC`)
    .then(users => {
      res.status(200).json(users);
    })
    .catch(() => {
      res.status(500).end();
    });
}

function sendGroupChat(req, res) {
  const db = req.app.get("db");
  const { sender_sub, groupchat_id, message, time } = req.body;

  db.query(
    `INSERT INTO groupmessage(sender_sub, groupchat_id, message, time, seen) VALUES('${sender_sub}', ${groupchat_id}, '${message}', '${time}', ${sender_sub})`
  ).then(() => {
    db.query(
      `SELECT groupmessage.*, users.avatar FROM groupmessage, users WHERE sender_sub = users.sub ORDER BY id`
    ).then(conversation => {
      res.status(201).json(conversation);
    });
  });
}

function createGroupChat(req, res) {
  const db = req.app.get("db");
  db.groupchat
  .insert(
    {
      user_sub: req.body.creatorId,
      name: req.body.groupName
    }
  ).then(data => {
    // map user Id
    req.body.userId.map(value => {
      db.query(
        `INSERT INTO groupmembers(member_sub,groupchat_id) Values('${value}',${data.id}) `
      )
      .then((data)=>res.status(201).json(data))
    })
  })
}

function getAllGroupName(req, res) {
  const db = req.app.get("db");
  db.query(`SELECT * FROM groupchat`)
  .then(data => {
    res.status(200).json(data)
  })
}

function seenNormalGroupChat(req, res) {
  const db = req.app.get("db");
  const user_id = req.body.chatmate;
  const groupchat_id = req.body.groupchat_id;

  db.query(`SELECT * from groupmessage`)
    .then(gc => {
      gc.map(group => {
        if (group.groupchat_id === groupchat_id) {
          let x = 0;
          group.seen.split(",").map(seen => {
            if (seen === user_id) { 
              x++;
            }
          });
          if (x === 0) {
            db.query(`UPDATE groupmessage SET seen = '${user_id},' || seen WHERE id = ${group.id}`);
          }
        }
      });
    })
    .then(() => {
      db.query(
        `SELECT groupmessage.*, users.avatar FROM groupmessage, users WHERE sender_sub = users.sub ORDER BY id`
      ).then(chats => {
        res.status(201).json(chats);
      });
    });

  // db.query(
  //   `UPDATE groupmessage SET seen = '${user_id},' || seen WHERE groupchat_id = ${groupchat_id}`
  // ).then(() => {
  //   db.query(
  //     `SELECT groupmessage.*, users.avatar FROM groupmessage, users WHERE sender_sub = users.sub ORDER BY id`
  //   ).then(chats => {
  //     res.status(201).json(chats);
  //   });
  // });
}

module.exports = {
  getChatUsersInfo,
  sendStudentChat,
  getChatList,
  getChatListInformation,
  seenNormalChat,

  getGroupList,
  getGroupChatInfo,
  getGroupChat,

  getAllUsers,
  sendGroupChat,
  seenNormalGroupChat,
  createGroupChat,
  getAllGroupName
};
