
exports.up = function(knex) {
    return knex.schema.table('cities', (table) => {
        table.bigInteger('quantity_of_queries').defaultTo(0)
    })
};

exports.down = function(knex) {
    return knex.schema.table('cities', (table) => {
        table.dropColumn('quantity_of_queries')
    })
};
