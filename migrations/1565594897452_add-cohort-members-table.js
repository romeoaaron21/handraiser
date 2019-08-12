exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('member', {
    id: {
      type: 'serial',
      primaryKey: true
    },
    studentid: {
      type: 'integer',
      notNull: true,
      references: '"users"'
    },
    cohortid: {
      type: 'integer',
      notNull: true,
      references: '"cohorts"'
    }
  })
};

exports.down = (pgm) => {

};
