const request = require('request')
const geocode = (address, callback) => {


    const geourl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?limit=2&access_token=pk.eyJ1Ijoic3JpZGhhcmphdGxhIiwiYSI6ImNrZmRlbW16NzFveGgydW84aDJ4eHZsdGsifQ.Zxy979o98V-lYE_-jmPqig&limit=1'

    request({ url: geourl, json: true }, (error, response) => {

        if (error) {
            callback('internet issue ', undefined)
        }

        else if (response.body.message) {
            callback('missing values', undefined)

        }

        else {
            callback(undefined, {
                location: response.body.features[0].place_name,
                longitude: response.body.features[0].center[0],
                latitude: response.body.features[0].center[1]

            }
            )
        }



    })

}

module.exports = geocode