const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address)+ '.json?access_token=pk.eyJ1IjoiZWVvbmVpbGwyMyIsImEiOiJjazhxM3FjeGowMDhmM3NxbnZydnQ2eGR0In0.C3bjVtZ3b0CRB3w8HJHkBQ'

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback (' unable to connect to services', undefined)
        } else if (body.features.length === 0) {
            callback('unable to find location. try another search', undefined)
        } else {
            callback (undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
