exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('keys', {
    id: {
      type: 'serial',
      primaryKey: true
    },
    sign_in_key: {
      type: 'integer',
      notNull: true,
      references: '"users"'
    },
    user_id: {
      type: 'text',
      notNull: true,
      references: '"users"'
    },
  })
};

exports.down = (pgm) => {

};
