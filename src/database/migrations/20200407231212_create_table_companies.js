
exports.up = function(knex) {
  return knex.schema.createTable('companies', function(table){
    table.increments();
    table.string('name').notNullable();
    table.string('logo');
    table.string('razao_social');
    table.string('nome_fantasia');
    table.string('cnpj');
    table.string('ie');
    table.string('im');
    table.string('email').notNullable();
    table.string('phone');
    table.string('about');
    table.string('cancel_policies');
    table.boolean('has_pub').notNullable().defaultTo(0);
    table.boolean('has_wifi').notNullable().defaultTo(0);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('companies');
};
