const express = require('express')
const {getCities, getWeather, getAverageTemp, incrementQueries, getHighestRaw} = require('./model/helper')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.urlencoded({extended :true}))
app.use(cors())

app.get('/', (req, res)=>{
    res.send(req.params)
})

app.get('/weather', async (req, res)=>{
    await incrementQueries(req.query.city)
    const weather = await getWeather(req.query.city, req.query.date)
    res.json(weather)
})

app.get('/cities', async (req, res) => {
    const cities = await getCities()
    res.json(cities)
})

app.get('/cities/max', async (req, res) => {
    const max = await getHighestRaw()
    res.json(max)
})



app.get('/weather/temp', async (req, res)=>{
    const averageTemp = await getAverageTemp(req.query.city)
    res.json(averageTemp)
})

app.listen(8000, () => {
    console.log("I'm Alive")
})