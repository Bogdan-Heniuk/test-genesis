const knex = require('knex')
const config = require('../knexfile')
const db = knex(config.development)

function getUsers(){
    return db('users').select("*")
}

function updateUser(id, userData){
    return db('users').where({id}).update(userData)
}

function deleteUser(id){
    return db('users').where({id}).delete()
}

function seedWeather(weatherData, id){
    return db('weather_forecast').insert({
        city_id : id,
        calendar_date : weatherData.datetimeStr,
        conditions : weatherData.conditions,
        temp : weatherData.temp,
        max_temp : weatherData.maxt,
        min_temp : weatherData.mint,
        humidity : weatherData.humidity
    })
}
function addUsersStatistic(userStatistic){
    return db('users_statistic').insert(userStatistic)
}

function getUserStatistic(date, id){
    return db('users_statistic')
        .join('users', 'users.id', 'users_statistic.user_id')
        .select("*")
        .where({date : date, user_id : id})
}

module.exports = {
   seedWeather
}