const forecast = require('../fixtures/fixture_forecast.json')
exports.seed = async function (knex) {
    await knex('weather_forecast').del()
    await knex('weather_forecast').insert(forecast)
}