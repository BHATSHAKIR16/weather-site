const request = require("postman-request")
const geocode = (address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYmhhdHNoYWtpciIsImEiOiJja2l5bzlsaW8xMDlsMzBueHg1d3NhZnIzIn0.T4CMYz79FfHn4xdtEeEmuw&limit=1'
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback("network not available",undefined)
        }else if(response.body.features.length===0){
            callback("location not reachable",undefined)
        }else{
            callback(undefined,{
                latitude:response.body.features[0].center[0],
                longitude:response.body.features[0].center[1],
                location:response.body.features[0].place_name
            })
        }
    })
}
// geocode("New York",(error,data)=>{
//   console.log('error',error)
//   console.log("data",data)
// })
module.exports = geocode