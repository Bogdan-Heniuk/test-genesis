const fetch = require('node-fetch')
const cities = require('./task1/cities.json')
const dateFormat = require("dateformat");
const {seedWeather} = require('./model/helper')
const SEVEN_DAYS_IN_MS = 604800000

async function seedData(city){
    const startDate = dateFormat(new Date(Date.now() - SEVEN_DAYS_IN_MS), "yyyy-m-dd'T'H:M:s")
    const endDate = dateFormat(new Date(), "yyyy-m-dd'T'H:M:s")
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/history?&aggregateHours=24&startDateTime=${startDate}&endDateTime=${endDate}&unitGroup=us&contentType=json&dayStartTime=0:0:00&dayEndTime=0:0:00&location=${city.name}&key=UTF3T2872Q64CKMKLS7PPDUFQ`
    const response = await fetch(url)
    return response.json()
}

cities.map(city => {
    seedData(city).then(weatherData => weatherData.locations[city.name].values)
        .then(values => values.map(async (data) => {
            await seedWeather(data, city.id)
        }))

})


