const express = require('express')
const router = express.Router()
const request = require('request-promise-native')
const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${process.env.WEATHER_API_KEY}&`
const City = require('../models/City')

router.get('/city/', (req, res)=>{
    const {lat, long, q} = req.query
    const query = `q=${q}` || `lat=${lat}&lon=${long}`
    request.get(weatherApiUrl + query).then(weatherData =>{
        res.send(JSON.parse(weatherData))
    }).catch(error => res.send({failed: true, error}))
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
    const cityName = req.body.cityName
    const isSaved = req.body.isSaved == 'false' ? false : true
    request.get(weatherApiUrl + cityName).then(weatherData =>{
        weatherData = JSON.parse(weatherData)
        const updatedCityData = {
            name: weatherData.location.name,
            updatedAt: weatherData.current.last_updated,
            temp: weatherData.current.temp_c,
            condition: weatherData.current.condition.text,
            conditionPic: weatherData.current.condition.icon,
            isSaved
        }
        if(!isSaved){
            res.send(updatedCityData)
        } else {
            City.findOneAndUpdate({name: cityName}, {...updatedCityData}, {new: true}).then(doc => res.send(doc))
        }
    }).catch(err => res.send(err))
})

module.exports = router