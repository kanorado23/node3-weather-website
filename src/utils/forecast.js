const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=a193cb17c5ff1ce60769d50a441d7161&query=' + latitude + ',' + longitude

    request({ url, json: true }, (error, {body }) => {
        if (error) {
            callback('unable to connect to services', undefined)
        } else if (body.error) {  
            callback('unable to find location', undefined)
        } else {
            callback (undefined, 
                (body.current.weather_descriptions[0]+ ' it is currently  ' +  body.current.temperature + ' degrees out. And it feels like  ')
            )
    }
    })
}

module.exports = forecast
