
exports.up = function(knex) {
  return knex.schema.createTable('cities', function(table){
      table.increments();
      table.string('name');
      table.integer('state_id').unsigned();

      table.foreign('state_id').references('id').inTable('states');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('cities');
};
