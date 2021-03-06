const cities = require('../task1/cities.json')

exports.seed = async function (knex) {
    await knex('cities').del()
    await knex('cities').insert(cities)
}