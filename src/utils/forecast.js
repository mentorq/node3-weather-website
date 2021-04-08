const request = require('request')

const forecast = ((longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=a039a4a39222f6a2c9ac8bcd57e2bd3d&query=' + latitude + ',' + longitude

    // console.log('LOG: '+ longitude + ' LAT: ' + latitude)
    request ({url, json:true}, (error, { body }) => {
        if(error){
            callback('Unable to connect to weather service!', undefined)
        } else if(body.error){
           callback('Unable to find location!', undefined) 
        } else{
            const temperature = body.current.temperature
            const feelslike = body.current.feelslike
            const weather_descriptions = body.current.weather_descriptions[0]
            const pressure = body.current.pressure
            const humidity = body.current.humidity
            callback(undefined, weather_descriptions + ". It's currently " + temperature + " degress out. It feels like " + feelslike + " degress out. Pressure is equal to " + pressure + " and humidity is equal to: " + humidity)
            
        }
    })

})

module.exports = forecast