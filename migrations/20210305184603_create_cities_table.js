exports.up = function(knex) {
  return knex.schema.createTableIfNotExists('cities', (table) => {
      table.increments()
      table.text('name')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('cities')
};
