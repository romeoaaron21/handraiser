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
      type: "text",
      notNull: "true"
    },
    cohort_id: {
      type: "integer",
      notNull: true,
      references: '"cohorts"',
      onDelete: "cascade"
    },
    seen: {
      type: "integer",
      notNull: true
    },
    chat_type: {
      type: "text",
      default: "text",
      notNull: true
    }
  });
};

exports.down = pgm => {};
