const express = require('express')
const router = express.Router()
const request = require('request-promise-native')
const apixuKey = '1977f5ea55e247c7bf194254191707'
const apixuUrl = `http://api.apixu.com/v1/current.json?key=${apixuKey}&q=`
const City = require('../models/City')

router.get('/weather', (req, res)=>{
    const location = req.query.location
    request.get(apixuUrl + location, (err, weatherData)=>{
        res.send(JSON.parse(weatherData.body))
    })
})

module.exports = router