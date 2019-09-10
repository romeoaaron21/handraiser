exports.shorthands = undefined;

exports.up = pgm => {
    pgm.addColumns("users", {
      status: { type: "text", notNull: true, default: "inactive"}
    });
};

exports.down = (pgm) => {

};
