exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable("chat", {
    id: {
      type: "serial",
      primaryKey: true
    },
    message: {
      type: "text",
      notNull: true
    },
    sender_id: {
      type: "text",
      notNull: true
    },
    chatmate_id: {
      type: "text",
      notNull: false
    },
    time: {
      type: "timestamp",
      default: pgm.func("current_timestamp")
    }
  });
};

exports.down = pgm => {};
