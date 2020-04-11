
exports.up = function(knex) {
  return knex.schema.createTable('address', function(table){
      table.increments();
      table.string('cep', 9).notNullable();
      table.string('street').notNullable();
      table.integer('number');
      table.string('district');
      table.string('complement');
      table.integer('city_id').unsigned();
      table.integer('user_id').unsigned();

      table.foreign('city_id').references('id').inTable('cities');
      table.foreign('user_id').references('id').inTable('users');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('address');
};
