exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable("groupmessage", {
        id: {
            type: "serial",
            primaryKey: true
        },
        sender_sub: {
            type: "text",
            notNull: true
        },
        groupchat_id: {
            type: "integer",
            notNull: true,
            references: '"groupchat"',
        },
        message: {
            type: "text",
            notNull: true
        },
        time: {
            type: "text",
            notNull: "true"
        },
        seen: {
            type: "integer",
            notNull: true
        },
    })
};

exports.down = (pgm) => {

};
