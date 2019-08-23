exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('history', {
    id: {
      type: 'serial',
      primaryKey: true
    },
    member_id: {
      type: 'integer',
      notNull: true
    },
    cohort_id:{
      type: 'integer',
      notNull: true
    },
    reason: {
      type: "text",
      notNull: true
    }
  })
};

exports.down = (pgm) => {

};
