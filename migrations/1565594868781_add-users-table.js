exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('users', {
    id: {
      type: 'serial',
      primaryKey: true
    },
    email: {
      type: 'text',
      notNull: true
    },
    privilege: {
      type: 'text',
      notNull: true
    }
  })
};

exports.down = (pgm) => {

};
