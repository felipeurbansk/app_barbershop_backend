
exports.up = function(knex) {
  return knex.schema.createTable('users', function(table){
    table.increments();
    table.string('name').notNullable();
    table.string('email').notNullable().unique();
    table.string('password').notNullable();
    table.string('reset_password');
    table.boolean('is_manager');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
