exports.up = function(knex) {
  return knex.schema.createTableIfNotExists('weather_forecast', (table) => {
    table.integer('city_id').references('id').inTable('cities')
        .onDelete('CASCADE').onUpdate('CASCADE')
    table.date('calendar_date')
    table.text('conditions')
    table.float('temp')
    table.float('max_temp')
    table.float('min_temp')
    table.float('humidity')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('weather_forecast')
};
