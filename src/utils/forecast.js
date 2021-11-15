const request = require("postman-request")
const forecast = (latitude,longitude,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=d06f74e80b6f27f247c93589877c11f1&query=' + latitude + ',' + longitude + '&units=f'
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback("unable to connect",undefined)
        }else if(response.body.error){
            callback("location not found",undefined)
        }else{
            callback(undefined, response.body.current.weather_descriptions[0] + ". it is currently " + response.body.current.temperature + " degrees out. it feels like " + response.body.current.feelslike + " degrees out. The humidity is " + response.body.current.humidity + "%. ")
              
            }
        
    })
}
module.exports = forecast