function getChatUsersInfo(req, res) {
    const db = req.app.get("db");
    const {userSub, chatmateSub} = req.params

    db.query(`select * from users where sub = '${userSub}' or sub = '${chatmateSub}'`)
    .then( chatUser => {
        res.status(200).json([...chatUser])
    })

   
}


module.exports = {
    getChatUsersInfo
}