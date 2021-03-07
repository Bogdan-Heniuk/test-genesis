const express = require('express')
const PORT = 8000
const {trackCityWeatherMiddleware} = require('./middlewares')
const {getCities, getWeather, getAverageTemp, getCityWithMaxQueries} = require('./db/model/helper')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.urlencoded({extended :true}))
app.use(cors())

app.get('/weather', trackCityWeatherMiddleware, async (req, res)=>{
    const weather = await getWeather(req.query.city, req.query.date)
    res.json(weather)
})

app.get('/cities', async (req, res) => {
    const cities = await getCities()
    res.json(cities)
})

app.get('/cities/max', async (req, res) => {
    const max = await getCityWithMaxQueries()
    res.json(max)
})


app.get('/weather/temp', trackCityWeatherMiddleware, async (req, res)=>{
    const averageTemp = await getAverageTemp(req.query.city)
    res.json(averageTemp)
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})