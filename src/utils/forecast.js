
const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=ee1650b27f02c67163ae58f5c16971ad&query=' + latitude + ',' + longitude

    request({ url, json: true }, (error, response) => {
        if (error) {
            callback('unable to fetch internet issue ', undefined)
        }

        else if (response.body.error) {
            callback('missing values try another data', undefined)
        }

        else {
            callback(undefined, ' The climate is ' + response.body.current.weather_descriptions + ' The temperature is ' + response.body.current.temperature + '  and feels like ' + response.body.current.feelslike + ' and humidity is  ' + response.body.current.humidity)
        }
    })

}


module.exports = forecast






