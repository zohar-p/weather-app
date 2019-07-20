const express = require('express')
const router = express.Router()
const request = require('request-promise-native')
const apixuKey = '1977f5ea55e247c7bf194254191707'
const apixuUrl = `http://api.apixu.com/v1/current.json?key=${apixuKey}&q=`
const City = require('../models/City')

router.get('/city/:cityName', (req, res)=>{
    const cityName = req.params.cityName
    request.get(apixuUrl + cityName).then(weatherData =>{
        res.send(JSON.parse(weatherData))
    }).catch(err => res.send(err))
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
    request.get(apixuUrl + cityName).then(weatherData =>{
        weatherData = JSON.parse(weatherData)
        const updatedCityData = {
            name: weatherData.location.name,
            updatedAt: weatherData.current.last_updated,
            temp: weatherData.current.temp_c,
            condition: weatherData.current.condition.text,
            conditionPic: weatherData.current.condition.icon,
            isSaved
        }
        console.log(isSaved)
        if(!isSaved){
            console.log('city not saved')
            res.send(updatedCityData)
        } else {
            console.log('city is saved')
            City.findOneAndUpdate({name: cityName}, {...updatedCityData}, {new: true}).then(doc => res.send(doc))
        }
    }).catch(err => res.send(err))
})

module.exports = router