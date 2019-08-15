exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('requests', {
    id: {
      type: 'serial',
      primaryKey: true
    },
    member_id: {
      type: 'integer',
      notNull: true,
      references: '"member"'
    },
    status: {
      type: 'text',
      notNull: true
    }
  })
};

exports.down = (pgm) => {

};
