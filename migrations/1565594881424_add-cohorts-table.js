exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('cohorts', {
    id: {
      type: 'serial',
      primaryKey: true
    },
    mentorid: {
      type: 'integer',
      notNull: true,
      references: '"users"'
    },
    name: {
      type: 'text',
      notNull: true
    },
    password: {
      type: 'text',
      notNull: true
    }
  })
};

exports.down = (pgm) => {

};
