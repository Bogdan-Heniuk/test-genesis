const {incrementCityQueryCounter} = require('../db/model/helper')

async function trackCityWeatherMiddleware(req, res, next){
    await incrementCityQueryCounter(req.query.city)
    await next()
}

module.exports = {
    trackCityWeatherMiddleware
}

