const express = require('express')
const router = express.Router()
const request = require('request-promise-native')
const apixuKey = '1977f5ea55e247c7bf194254191707'
const apixuUrl = `http://api.apixu.com/v1/current.json?key=${apixuKey}&q=`
const City = require('../models/City')

router.get('/city/:cityName', (req, res)=>{
    const city = req.params.cityName
    request.get(apixuUrl + city, (err, weatherData)=>{
        res.send(JSON.parse(weatherData.body))
    })
})

router.get('/cities', (req, res)=>{
    City.find({}).sort('name').then(cities=>res.send(cities))
})

router.post('/city', (req, res)=>{
    const newCity = new City({...req.body})
    newCity.save()
    res.send(newCity.name + ' was saved to the DB')
})

router.delete('/city/:cityName', (req, res)=>{
    const cityName = req.params.cityName
    City.findOneAndDelete({name: cityName}).then(city=>res.send(city.name + ' was deleted from DB'))
})

module.exports = router