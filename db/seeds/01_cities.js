const cities = require('../fixtures/fixture_cities.json')

exports.seed = async function (knex) {
    await knex('cities').del()
    await knex('cities').insert(cities)
}