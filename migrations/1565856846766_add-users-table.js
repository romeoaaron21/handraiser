exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('users', {
    id: {
      type: 'serial',
      primaryKey: true
    },
    first_name: {
      type: 'text',
      notNull: true,
    },
    last_name: {
      type: 'text',
      notNull: true
    },
    sub: {
      type: 'text',
      notNull: true
    },
    privilege: {
      type: 'text',
      notNull: true
    },
    avatar: {
      type: 'text',
      notNull: true
    }
  })
};

exports.down = (pgm) => {

};
