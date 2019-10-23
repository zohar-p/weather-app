const express = require('express')
const router = express.Router()
const request = require('request-promise-native')
const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${process.env.WEATHER_API_KEY}&`
const City = require('../models/City')
const moment = require('moment')

const extractData = (data, isCurrentLocation) => {
    return {
        id: data.id,
        name: data.name,
        updatedAt: moment.unix(data.dt),
        temp: Math.round(data.main.temp * 10) / 10,
        condition: data.weather[0].description,
        conditionPic: `https://openweathermap.org/img/wn/${data.weather[0].icon}`,
        isSaved: false
    }
}

router.get('/city/', (req, res)=>{
    const {lat, long, q} = req.query
    const isCurrentLocation = !q
    const query = isCurrentLocation ? `lat=${lat}&lon=${long}` : `q=${q}`
    request.get(weatherApiUrl + query)
        .then(weatherData =>{
            weatherData = JSON.parse(weatherData)
            const locationWeather = extractData(weatherData)
            locationWeather.isCurrentLocation = isCurrentLocation
            res.send(locationWeather)        
    })
        .catch(error => res.send({failed: true, errorMessage: "Couldn't find city", error}))
})

router.get('/cities', (req, res)=>{
    City.find({}).sort('name').then(cities=>res.send(cities))
})

router.post('/city',async  (req, res)=>{
    const newCity = new City({...req.body})
    await newCity.save()
    res.send(newCity.name + ' was saved to the DB')
})

router.delete('/city/:cityName', async (req, res)=>{
    const cityName = req.params.cityName
    await City.findOneAndDelete({name: cityName})
    res.send(city.name + ' was deleted from DB')
})

router.put('/city', (req, res) => {
    const city = req.body
    City.findOneAndUpdate({name: city.name}, {...city}, {new: true})
        .then(doc => res.send(doc))
        .catch(err => res.send(err))
})

module.exports = router