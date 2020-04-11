
exports.up = function(knex) {
    return knex.schema.createTable('employees', function(table){
        table.increments();
        table.string('phone').notNullable();
        table.string('d_nasc').notNullable();
        table.string('photo');
        table.boolean('is_active').defaultTo(1);
        table.boolean('is_manager').defaultTo(0);

        table.integer('user_id').unsigned();
        table.integer('social_id').unsigned();
        table.integer('employee_type_contract_id').unsigned();
        table.integer('sex_id').unsigned();
        table.integer('category_services').unsigned();
        
        table.foreign('user_id').references('users.id');
    });
};

exports.down = function(knex) {
  return knex.schema.dropTable('employees');
};
