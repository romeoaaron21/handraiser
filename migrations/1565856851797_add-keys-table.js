exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('keys', {
    id: {
      type: 'serial',
      primaryKey: true
    },
    sign_in_key: {
      type: 'text',
      notNull: true,
    },
    user_id: {
      type: 'integer',
      notNull: false,
      references: '"users"'
    },
  })
};

exports.down = (pgm) => {

};
