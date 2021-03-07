const fetch = require('node-fetch')
const dateFormat = require("dateformat");
const {seedWeather,getCities, truncate, db} = require('./db/model/helper')
const SEVEN_DAYS_IN_MS = 604800000

async function getCityWeather(city) {
    const startDate = dateFormat(new Date(Date.now() - SEVEN_DAYS_IN_MS), "yyyy-m-dd'T'H:M:s")
    const endDate = dateFormat(new Date(), "yyyy-m-dd'T'H:M:s")
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/history?&aggregateHours=24&startDateTime=${startDate}&endDateTime=${endDate}&unitGroup=us&contentType=json&dayStartTime=0:0:00&dayEndTime=0:0:00&location=${city.name}&key=UTF3T2872Q64CKMKLS7PPDUFQ`
    const response = await fetch(url)
    return response.json()
}


async function seedData() {
    await truncate()
    const cities = await getCities()
    const weatherData = await Promise.all(cities.map(city => getCityWeather(city)))
    const cityWeatherValues = weatherData.flatMap((data, index) => {
        const city = cities[index]
        return data.locations[city.name].values.map(weather => ({
            weather,
            city
        }))
    })
    await Promise.all(cityWeatherValues.map(data => seedWeather(data.weather, data.city.id)))
    await db.destroy()
}

seedData()




