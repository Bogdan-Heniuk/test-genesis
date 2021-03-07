const knex = require('knex')
const dateFormat = require("dateformat");
const config = require('../../knexfile')
const db = knex(config.development)

function getCities() {
    return db('cities').select( 'id', 'name')
}

function seedWeather(weatherData, id) {
    return db('weather_forecast').insert({
        city_id: id,
        calendar_date: dateFormat(Date.parse(weatherData.datetimeStr), "yyyy-mm-dd"),
        conditions: weatherData.conditions,
        temp: weatherData.temp,
        max_temp: weatherData.maxt,
        min_temp: weatherData.mint,
        humidity: weatherData.humidity
    })
}

function getWeather(city, date) {
    switch (date.toLowerCase()) {
        case 'today' :
            date = dateFormat(Date.now(), "yyyy-mm-dd")
            break
        case 'yesterday' :
            date = dateFormat(Date.now() - 86400000, "yyyy-mm-dd")
            break
    }

    return db('weather_forecast').join('cities', 'cities.id', 'weather_forecast.city_id')
        .select(
            'city_id', 'calendar_date', 'conditions', 'temp',
                'max_temp', 'min_temp', 'humidity'
        )
        .from('weather_forecast')
        .where({name : city, calendar_date : date})
}

function incrementQueries(city) {
    return db('cities').where('name', '=', city).increment({quantity_of_queries: 1})
}

function getMaxQueries() {
    const max = db('cities').max('quantity_of_queries').first()
    return db('cities').select('name').where('quantity_of_queries', '=', max)
}

function getAverageTemp(city) {
    return db('weather_forecast').join('cities', 'cities.id', 'weather_forecast.city_id')
        .avg('temp as temp')
        .where({name: city}).first()
}

module.exports = {
    db,
    seedWeather,
    getWeather,
    getAverageTemp,
    getCities,
    incrementQueries,
    getHighestRaw: getMaxQueries
}